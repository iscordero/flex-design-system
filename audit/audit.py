"""Static token audit of bundle.css: every declaration whose value is a literal where the system has a token scale."""
import json, re, sys, collections
ROOT = '/tmp/claude-0/-home-claude/b60ded0a-9c9c-53c2-a600-4425949131a3/scratchpad/ds/project'
T = json.load(open(ROOT + '/tokens.json'))
css = open(sys.argv[1] if len(sys.argv) > 1 else ROOT + '/components/bundle.css').read()

def parse(css):
    """Yield (media, selector, prop, value, offset)."""
    s = re.sub(r'/\*.*?\*/', lambda m: ' ' * len(m.group(0)), css, flags=re.S)
    out = []; stack = []; i = 0; buf_start = 0
    n = len(s)
    while i < n:
        c = s[i]
        if c == '{':
            sel = s[buf_start:i].strip(); stack.append(sel); buf_start = i + 1
        elif c == '}':
            body = s[buf_start:i]
            if stack and not stack[-1].startswith('@media') and not stack[-1].startswith('@supports') and not stack[-1].startswith('@keyframes'):
                off = buf_start
                for d in body.split(';'):
                    if ':' in d:
                        p, v = d.split(':', 1)
                        media = ' / '.join(x for x in stack[:-1])
                        out.append((media, stack[-1], p.strip(), v.strip(), off + len(d) - len(d.lstrip())))
                    off += len(d) + 1
            if stack: stack.pop()
            buf_start = i + 1
        elif c == ';' and not stack: buf_start = i + 1
        i += 1
    return out

def hexnorm(v):
    v = v.lower()
    if re.fullmatch(r'#[0-9a-f]{3}', v): v = '#' + ''.join(c * 2 for c in v[1:])
    return v
def resolve(v, m, d=0):
    while isinstance(v, str) and v.startswith('{') and d < 9: v = m[v[1:-1]]; d += 1
    return v
raw = {x['name']: (x['value']['light'] if isinstance(x['value'], dict) else x['value']) for x in T['color']['tokens']}
COL = collections.defaultdict(list)
for k in raw:
    COL[re.sub(r'\s+', '', hexnorm(resolve(raw[k], raw)))].append(k)
SP = {x['value']: x['name'] for x in T['spacing']['tokens']}
RA = {x['value']: x['name'] for x in T['radius']['tokens']}
SH = {re.sub(r'\s+', '', x['value']['light']): x['name'] for x in T['shadow']['tokens']}
Z = {x['value']: x['name'] for x in T['zIndex']['tokens']}
STEP = {'24px', '32px', '36px', '48px', '56px', '100px'}

SPACE_P = re.compile(r'^(padding|margin)(-(top|right|bottom|left|inline|block)(-(start|end))?)?$|^(gap|row-gap|column-gap)$')
OFF_P = re.compile(r'^(top|right|bottom|left|inset|inset-(inline|block)(-(start|end))?)$')
COLOR_RE = re.compile(r'#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)')
def strip_vars(v):
    # remove var(...) including fallbacks, and calc wrappers stay
    prev = None
    while prev != v:
        prev = v; v = re.sub(r'var\([^()]*\)', 'VAR', v)
    return v
rows = []
for media, sel, p, v, off in parse(css):
    if p.startswith('--'):
        kind = 'custom'
        # custom properties defined in component css: report literals in them too
    lit = strip_vars(v)
    comp = re.search(r'\.q-([a-z0-9]+)', sel)
    comp = comp.group(1) if comp else sel[:20]
    mobile = bool(re.search(r'max-width: (767|4\d\d|5\d\d|6\d\d)px', media))
    def add(cat, val, tok, note=''):
        rows.append(dict(cat=cat, comp=comp, sel=sel, media=media, prop=p, value=v, lit=val, token=tok, note=note, off=off, mobile=mobile))
    for m in COLOR_RE.finditer(lit):
        c = re.sub(r'\s+', '', hexnorm(m.group(0)))
        add('color', m.group(0), (COL.get(c) or [None])[0])
    if SPACE_P.match(p):
        for m in re.finditer(r'(?<![\w.#-])(-?\d*\.?\d+)px', lit):
            val = m.group(0); a = val.lstrip('-')
            add('spacing', val, SP.get(a), 'steps down on mobile' if a in STEP else '')
    if OFF_P.match(p):
        for m in re.finditer(r'(?<![\w.#-])(-?\d*\.?\d+)px', lit):
            val = m.group(0); a = val.lstrip('-')
            add('offset', val, SP.get(a), 'steps down on mobile' if a in STEP else '')
    if 'radius' in p:
        for m in re.finditer(r'(?<![\w.#-])(\d*\.?\d+)(px|%)', lit):
            val = m.group(0)
            if val in ('50%', '999px', '9999px', '100%', '0px'): continue
            add('radius', val, RA.get(val))
    if p == 'box-shadow' and lit not in ('none', 'VAR') and 'VAR' != lit:
        if re.search(r'\d', lit) and not lit.startswith('inset') and 'VAR' not in lit.split(',')[0][:4]:
            add('shadow', lit, SH.get(re.sub(r'\s+', '', lit)))
    if p == 'z-index' and re.fullmatch(r'-?\d+', lit):
        add('z', lit, Z.get(lit))
    if p in ('font-size', 'line-height', 'font-weight', 'letter-spacing', 'font-family') and lit != 'VAR' and lit not in ('inherit', 'normal', '0', '1'):
        add('type', lit, None)
    if p in ('transition', 'animation', 'transition-duration', 'animation-duration') and re.search(r'\d+m?s', lit):
        add('motion', ' '.join(sorted(set(re.findall(r'[\d.]+m?s', lit)))), None)
json.dump(rows, open('audit.json', 'w'), indent=0)
by = collections.Counter((r['cat'], 'token exists' if r['token'] else 'no token') for r in rows)
for k in sorted(by): print(k, by[k])
for cat in ('spacing', 'radius', 'color', 'z', 'shadow'):
    c = collections.Counter(r['lit'] for r in rows if r['cat'] == cat and not r['token'])
    print('\n', cat, 'NO TOKEN:', c.most_common(60))
    c = collections.Counter((r['lit'], r['token']) for r in rows if r['cat'] == cat and r['token'])
    print(cat, 'HAS TOKEN:', c.most_common(60))
