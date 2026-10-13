"""Rewrite literal values in bundle.css to design tokens. usage: fix.py in.css out.css  (prints a change log)"""
import json, re, sys, collections
ROOT = '/tmp/claude-0/-home-claude/b60ded0a-9c9c-53c2-a600-4425949131a3/scratchpad/ds/project'
T = json.load(open(ROOT + '/tokens.json'))
src = open(sys.argv[1]).read()
SP = {float(x['value'][:-2]): x['name'] for x in T['spacing']['tokens']}
STEP = {24.0, 32.0, 36.0, 48.0, 56.0, 100.0}
RA = {x['value']: x['name'] for x in T['radius']['tokens']}
SPACE_P = re.compile(r'^(padding|margin)(-(top|right|bottom|left|inline|block)(-(start|end))?)?$|^(gap|row-gap|column-gap)$')
OFF_P = re.compile(r'^(top|right|bottom|left|inset|inset-(inline|block)(-(start|end))?)$')
# Off-scale layout spacing within 4px of a token: snapped to that token.
SNAP = {60: 'spacing-5xl', 50: 'spacing-4xl', 46: 'spacing-4xl', 44: 'spacing-4xl', 40: 'spacing-3xl', 30: 'spacing-2xl', 29: 'spacing-2xl', 28: 'spacing-xl',
        26: 'spacing-xl', 25: 'spacing-xl', 23: 'spacing-xl', 21: 'spacing-lg', 19: 'spacing-lg', 13: 'spacing-xs', 7: 'spacing-3xs', 5: 'spacing-5xs'}
TOKVAL = {x['name']: float(x['value'][:-2]) for x in T['spacing']['tokens']}
# A value that is a token less a border, so the box still adds up to the token: written as that sum.
SPECIAL = [
    (r'\.q-drawer__head', 15, 'calc(var(--spacing-rg) - 1px)'), (r'\.q-drawer__head', 11, 'calc(var(--spacing-xs) - 1px)'),
    (r'\.q-footer__inner', 15, 'calc(var(--spacing-rg) - 1px)'),
    (r'\.q-promo--horizontal, \.q-promo--banner', 22, 'calc(var(--spacing-xl) - 2px)'),
    (r'\.q-form__consent \.q-field__msg', 26, 'calc(var(--spacing-rg) + var(--spacing-2xs))'),
]
# Structural sizes that only look like spacing (room for a shadow, an icon's width, a trigger's height): left alone.
KEEP = [(r'\.q-carousel__viewport', 56), (r'\.q-dd', 24), (r'\.q-menu$', 56), (r'\.q-filter__menu', 56), (r'\.q-nbar__bar', 64), (r'\.q-nbar__bar', 48), (r'\.q-navbanner', 72), (r'\.q-navbanner', 56), (r'\.q-pmodal__label', 44)]
RADIUS = {}   # 8px corners (card images, marker, menu row, footer button) are a written rule with no token: left for a decision
log = collections.Counter(); detail = []

def split_vars(v):
    """Yield (text, is_var) chunks; var(...) with balanced parentheses is passed through untouched."""
    out = []; i = 0
    while i < len(v):
        j = v.find('var(', i)
        if j < 0: out.append((v[i:], False)); break
        if j > i: out.append((v[i:j], False))
        d = 0; k = j
        while k < len(v):
            if v[k] == '(': d += 1
            elif v[k] == ')':
                d -= 1
                if d == 0: break
            k += 1
        out.append((v[j:k + 1], True)); i = k + 1
    return out

def spacing(sel, media, prop, v, narrow, offset):
    def one(m):
        raw = m.group(0); n = float(m.group(1)); a = abs(n); neg = n < 0
        if a == 0: return raw
        def tok(name):
            log['-> ' + name] += 1
            return 'calc(-1 * var(--%s))' % name if neg else 'var(--%s)' % name
        for pat, val, _ in [(p, x, None) for p, x in KEEP]:
            if a == val and re.search(pat, sel): log['kept: structural'] += 1; return raw
        for pat, val, rep in SPECIAL:
            if a == val and not neg and re.search(pat, sel): log['token less a border'] += 1; detail.append((sel, prop, raw, rep)); return rep
        name = SP.get(a)
        if name:
            if a in STEP and narrow: log['kept: phone rule'] += 1; return raw
            return tok(name)
        if offset or neg or a <= 3 or a != int(a): log['kept: optical or position'] += 1; return raw
        name = SNAP.get(int(a))
        if name:
            if TOKVAL[name] in STEP and narrow: log['kept: phone rule'] += 1; return raw
            detail.append((sel, prop, raw, name + (' [phone rule]' if narrow else ''))); log['snapped'] += 1
            return tok(name)
        log['kept: no token near'] += 1; detail.append((sel, prop, raw, 'NO TOKEN' + (' [phone rule]' if narrow else '')))
        return raw
    return ''.join(c if isv else re.sub(r'(?<![\w.#-])(-?\d*\.?\d+)px', one, c) for c, isv in split_vars(v))

def colour(sel, prop, v):
    def white(m):
        a = float(m.group(1)); log['-> colour mix'] += 1
        return 'color-mix(in srgb, var(--surface-neutral-100) %s%%, transparent)' % (('%g' % (a * 100)))
    def char(m):
        a = float(m.group(1)); log['-> colour mix'] += 1
        return 'color-mix(in srgb, var(--surface-neutral-600) %s%%, transparent)' % (('%g' % (a * 100)))
    v2 = re.sub(r'rgba\(255, 255, 255, ([\d.]+)\)', white, v)
    v2 = re.sub(r'rgba\(38, 38, 38, ([\d.]+)\)', char, v2)
    if 'rgba(0, 0, 0, 0.5)' in v2: v2 = v2.replace('rgba(0, 0, 0, 0.5)', 'var(--overlay-dark)'); log['-> overlay-dark'] += 1
    return v2

s = re.sub(r'/\*.*?\*/', lambda m: ' ' * len(m.group(0)), src, flags=re.S)
edits = []; stack = []; i = 0; bs = 0
while i < len(s):
    c = s[i]
    if c == '{': stack.append(s[bs:i].strip()); bs = i + 1
    elif c == '}':
        if stack and not stack[-1].startswith('@'):
            sel = stack[-1]; media = ' / '.join(stack[:-1]); off = bs
            narrow = bool(re.search(r'max-width: (767|4\d\d|5\d\d|6\d\d)px', media)) or '--mobile' in sel
            for d in s[bs:i].split(';'):
                if ':' in d:
                    p, v = d.split(':', 1); prop = p.strip(); vs = off + len(p) + 1; val = v
                    new = val
                    if prop.startswith('--'): pass
                    elif SPACE_P.match(prop): new = spacing(sel, media, prop, val, narrow, False)
                    elif OFF_P.match(prop) and sel.startswith('.q-toasts'): new = spacing(sel, media, prop, val, narrow, False)
                    elif 'radius' in prop:
                        def rad(m):
                            x = m.group(0)
                            if x in RA: log['-> ' + RA[x]] += 1; return 'var(--%s)' % RA[x]
                            if x == '8px':
                                log['kept: 8px radius'] += 1; detail.append((sel, prop, x, 'NO TOKEN'))
                                for k, name in RADIUS.items():
                                    if sel.strip() == k or sel.strip().startswith(k + ' ') or k in [q.strip() for q in sel.split(',')]:
                                        log['radius snapped'] += 1; detail.append((sel, prop, x, name)); return 'var(--%s)' % name
                            return x
                        new = ''.join(c2 if isv else re.sub(r'(?<![\w.#-])\d+px', rad, c2) for c2, isv in split_vars(val))
                    elif prop == 'z-index' and val.strip() == '1000':
                        name = 'z-modal' if 'pmodal' in sel else 'z-panel'
                        new = val.replace('1000', 'var(--%s)' % name); log['-> ' + name] += 1; detail.append((sel, prop, '1000', name))
                    elif prop in ('background', 'background-color', 'color', 'border-color', 'box-shadow') and 'rgba(' in val and 'mask' not in prop:
                        if prop == 'box-shadow' and sel == '.q-hero__form .q-form' and '0 16px 32px rgba(0, 0, 0, 0.10)' in val:
                            new = val.replace('0 16px 32px rgba(0, 0, 0, 0.10)', 'var(--shadow-card)'); log['-> shadow-card'] += 1; detail.append((sel, prop, val.strip(), 'shadow-card'))
                        elif prop == 'box-shadow' and sel == '.q-footer__submit':
                            new = val.replace('0 6px 18px rgba(20, 20, 43, 0.2)', 'var(--shadow-dropdown)'); log['-> shadow-dropdown'] += 1; detail.append((sel, prop, val.strip(), 'shadow-dropdown'))
                        else: new = colour(sel, prop, val)
                    if new != val: edits.append((vs, vs + len(val), new))
                off += len(d) + 1
        if stack: stack.pop()
        bs = i + 1
    elif c == ';' and not stack: bs = i + 1
    i += 1
out = src
for a, b, new in sorted(edits, reverse=True): out = out[:a] + new + out[b:]
open(sys.argv[2], 'w').write(out)
print(len(edits), 'declarations changed')
for k in sorted(log): print(' ', k, log[k])
json.dump(detail, open('fix-detail.json', 'w'), indent=0)
