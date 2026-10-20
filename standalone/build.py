"""Build the standalone (no sign-in) copy of the design system as one HTML page.

usage: python3 build.py <ds dir> <families.json> <out dir>
Writes <out>/body.html (artifact page, no document skeleton) and <out>/flex-design-system.html (full document).
"""
import base64, html, io, json, os, re, sys
import xml.etree.ElementTree as ET
import markdown
from PIL import Image

DS, FAM, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
P = DS + '/project'
HERE = os.path.dirname(os.path.abspath(__file__))
esc = html.escape

idx = json.load(open(P + '/design-system.json'))
tok = json.load(open(P + '/tokens.json'))
fam = json.load(open(FAM))
LEVEL = fam['levels']
# The site is arranged in two groups: components (single pieces and the patterns built from them) and the page modules (block modules) a page is assembled from.
SECTIONS = fam['sections']
FAMILIES = fam['families']
LEVEL.update({'Grid': 'Foundation', 'Typography': 'Foundation'})


def slug(s):
    return re.sub(r'[^a-z0-9]+', '-', s.lower()).strip('-')


# ---------- tokens ----------
cmap = {x['name']: x['value']['light'] for x in tok['color']['tokens']}


def resolve(v):
    while True:
        m = re.match(r'^\{(.+)\}$', v)
        if not m:
            return v
        v = cmap[m.group(1)]


def cssval(v):
    if isinstance(v, dict):
        v = v['light']
    m = re.match(r'^\{(.+)\}$', v)
    return 'var(--%s)' % m.group(1) if m else v


root = [':root{']
for f in ('color', 'shadow'):
    for x in tok[f]['tokens']:
        root.append('--%s:%s;' % (x['name'], cssval(x['value'])))
for f in ('spacing', 'radius', 'layout', 'zIndex'):
    for x in tok[f]['tokens']:
        root.append('--%s:%s;' % (x['name'], x['value']))
for k, v in tok['type']['families'].items():
    root.append('--font-%s:%s;' % (k, v))
root.append('}')
classes = []
for g in tok['type']['groups']:
    for st in g['styles']:
        ff = tok['type']['families'][st.get('family') or g['family']]
        r = ['font-family:' + ff, 'font-size:' + st['fontSize'], 'font-weight:' + st['fontWeight']]
        if st.get('lineHeight'):
            r.append('line-height:' + st['lineHeight'])
        if st.get('letterSpacing'):
            r.append('letter-spacing:' + st['letterSpacing'])
        classes.append('.%s{%s}' % (st['name'], ';'.join(r)))
TOKEN_CSS = '\n'.join(root + classes)

# ---------- lookups for the Specs view ----------
KINDS = {}
for f, kind in (('color', 'color'), ('shadow', 'shadow'), ('spacing', 'spacing'), ('radius', 'radius'), ('layout', 'layout'), ('zIndex', 'layer')):
    for x in tok[f]['tokens']:
        KINDS[x['name']] = kind
for k in tok['type']['families']:
    KINDS['font-' + k] = 'font'
KINDS['surface-promo-gradient'] = 'color'


def norm_color(v):
    v = v.strip().lower()
    m = re.match(r'^#([0-9a-f]{6})$', v)
    if m:
        return '#' + m.group(1)
    m = re.match(r'^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$', v)
    if m:
        hx = '#%02x%02x%02x' % (int(m.group(1)), int(m.group(2)), int(m.group(3)))
        a = m.group(4)
        return hx if a is None or float(a) == 1 else '%s/%g' % (hx, float(a))
    return None


LOOK = {'color': {}, 'spacing': {}, 'radius': {}, 'shadow': {}}
for x in tok['color']['tokens']:
    c = norm_color(resolve(x['value']['light']))
    if c:
        LOOK['color'].setdefault(c, []).append(x['name'])
for x in tok['spacing']['tokens']:
    LOOK['spacing'][x['value']] = x['name']
for x in tok['radius']['tokens']:
    LOOK['radius'][x['value']] = x['name']
# Layout tokens that are used as spacing (page margins and the gutter): on the scale too.
LOOK['layout'] = sorted({x['value'] for x in tok['layout']['tokens'] if x['name'].startswith('margin') or x['name'] == 'gutter'})
TYPE_STYLES = []
for g in tok['type']['groups']:
    for st in g['styles']:
        TYPE_STYLES.append({'n': st['name'], 'fs': st['fontSize'], 'fw': st['fontWeight'], 'lh': st.get('lineHeight') or '', 'ff': tok['type']['families'][st.get('family') or g['family']].split(',')[0].strip('"'), 'ls': st.get('letterSpacing') or '0'})

# ---------- assets ----------
assets = {}
for g in idx['assetGroups'].values():
    for n, f in g['files'].items():
        data = open('%s/assets/%s/%s' % (P, g['name'], n), 'rb').read()
        assets[f['blob']] = 'data:%s;base64,%s' % (f['type'], base64.b64encode(data).decode())
LOGO = idx['assetGroups']['Logos']['files']['qualys-logo-full-rgb.svg']['blob']


# ---------- markdown ----------
def sized(m):
    """Diagrams are rendered at 2x; show them at half their pixel size."""
    tag = m.group(0)
    src = re.search(r'src="data:image/\w+;base64,([^"]*)"', tag)
    if not src:
        return tag
    try:
        w, h = Image.open(io.BytesIO(base64.b64decode(src.group(1)))).size
    except Exception:
        return tag
    return tag.rstrip('>').rstrip('/').rstrip() + ' width="%d" height="%d" decoding="async">' % (round(w / 2), round(h / 2))


def pair(src):
    """Put each diagram beside the text that explains it, so a section fills the column edge to edge."""
    root = ET.fromstring('<root>' + src + '</root>')
    out = []

    def is_img(e):
        return e.tag == 'p' and len(e) == 1 and e[0].tag == 'img' and not (e.text or '').strip() and not (e[0].tail or '').strip()

    def is_text(e):
        return e.tag in ('p', 'ul', 'ol') and not is_img(e)

    def make(fig, copy, after):
        box = ET.Element('div', {'class': 'ds-pair'})
        f = ET.Element('figure', {'class': 'ds-fig'})
        f.append(fig[0])
        c = ET.Element('div', {'class': 'ds-copy'})
        for x in copy:
            c.append(x)
        for x in ([c, f] if after else [f, c]):
            box.append(x)
        return box

    kids = list(root)
    i = 0
    while i < len(kids):
        e = kids[i]
        if is_img(e):
            run = []
            j = i + 1
            while j < len(kids) and is_text(kids[j]):
                run.append(kids[j])
                j += 1
            if run:
                out.append(make(e, run, False))
                i = j
                continue
            prev = []
            while out and out[-1].tag in ('p', 'ul', 'ol'):
                prev.insert(0, out.pop())
            if prev:
                out.append(make(e, prev, True))
                i += 1
                continue
        out.append(e)
        i += 1
    for e in out:
        e.tail = '\n'
    return ''.join(ET.tostring(e, encoding='unicode', method='html') for e in out)


def md(text, prefix, paired=False):
    conv = markdown.Markdown(extensions=['tables', 'sane_lists', 'toc', 'fenced_code'], extension_configs={'toc': {'slugify': lambda v, s: prefix + '-' + slug(v)}})
    out = conv.convert(text)
    if paired:
        out = pair(out)
    out = re.sub(r'<img [^>]*>', sized, out)
    # fenced blocks in the guides are prompts to copy into an AI agent: a box with a Copy button
    out = re.sub(r'<pre><code[^>]*>(.*?)</code></pre>', lambda m: '<div class="ds-prompt"><div class="ds-prompt-head"><span>%s</span>' % ('Project instructions' if 'language-instructions' in m.group(0)[:60] else 'Prompt') + '<button type="button" class="ds-copybtn">Copy</button></div><pre tabindex="0">%s</pre></div>' % m.group(1).rstrip('\n'), out, flags=re.S)
    out = out.replace('<table>', '<div class="ds-table"><table>').replace('</table>', '</table></div>')
    return out, conv.toc_tokens


def strip_h1(h):
    m = re.match(r'\s*<h1[^>]*>(.*?)</h1>', h, re.S)
    return (re.sub(r'<[^>]+>', '', m.group(1)), h[m.end():]) if m else (None, h)


# ---------- views ----------
views = []  # (view id, html)
last = os.environ.get('FLEX_DATE') or idx['lastChange']['at'][:10]
y, mo, d = last.split('-')
MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
SNAP = '%s %d, %s' % (MONTHS[int(mo) - 1], int(d), y)  # American date order
ncomp = sum(len(m) for n, m in fam['families'])

# overview
over, _ = md(open(P + '/README.md').read(), 'ov', True)
guides = []
for path in idx['docs']['sections']:
    if 'guide-7' in path:  # Patterns and Components: retired from the site; patterns have their own section
        continue
    gid = re.search(r'guide-(\d+)', path).group(0)
    body, toc = md(open(DS + '/' + path).read(), gid, True)
    title, body = strip_h1(body)
    guides.append((gid, title, body, toc))
for gid, title, _, _ in guides:
    n = gid.split('-')[1]
    over = re.sub(r'<li><strong>%s</strong> \(<code>guide-%s-[^<]*</code>\)' % (re.escape(esc(title)), n), '<li><a href="#%s"><strong>%s</strong></a>' % (gid, esc(title)), over)
assert over.count('<a href="#guide-') == len(guides), over.count('<a href="#guide-')
lede, rest = re.match(r'\s*<p>(.*?)</p>(.*)', over, re.S).groups()
views.append(('overview', '''<div class="ds-stage" data-c="Cover"></div>
<header class="ds-head"><h1 class="ds-sr">Flex Design System</h1>
<p class="ds-lede">%s</p>
<ul class="ds-facts"><li><b>%d</b> components, patterns and page modules in <b>%d</b> families</li><li><b>%d</b> guides</li><li><b>%d</b> color tokens</li><li>Updated <b>%s</b></li></ul></header>
<article class="ds-prose">%s</article>''' % (lede, ncomp, len(fam['families']), len(guides), len(tok['color']['tokens']), SNAP, rest)))

START_GUIDES = {g for g, t, _, _ in guides if t == 'Change Management'}  # shown under Start, not numbered with the guidelines
_num = [g for g, _, _, _ in guides if g not in START_GUIDES]
for gi, (gid, title, body, toc) in enumerate(guides):
    links = []

    def walk(items):
        for s in items:
            if s['level'] in (2, 3):
                links.append('<li><a href="#%s" data-jump="%s">%s</a></li>' % (gid, s['id'], esc(s['name'])))
            walk(s.get('children', []))
    walk(toc)
    eyebrow = 'Start' if gid in START_GUIDES else 'Guideline %d of %d' % (_num.index(gid) + 1, len(_num))
    views.append((gid, '''<header class="ds-head"><p class="ds-eyebrow">%s</p><h1>%s</h1></header>
<ul class="ds-toc" aria-label="In this guide">%s</ul>
<article class="ds-prose">%s</article><!--EXTRA:%s-->''' % (eyebrow, esc(title), ''.join(links), body, gid)))

# change log: written by tools/changelog.py into site/changes.json; the page reads the newest copy when it can
try:
    CHANGES = json.load(open(os.path.join(os.path.dirname(os.path.abspath(DS)), 'site', 'changes.json')))
except (OSError, ValueError):
    CHANGES = {'version': 1, 'entries': []}
try:   # the entry unpublished work will get (tools/changelog.py draft, run by publish.sh)
    CHANGES['draft'] = json.load(open(os.path.join(os.path.dirname(os.path.abspath(DS)), 'site', 'changes-draft.json')))
except (OSError, ValueError):
    CHANGES.pop('draft', None)
views.append(('changelog', '''<header class="ds-head"><p class="ds-eyebrow">Start</p><h1>Change Log</h1><p class="ds-lede">The important changes to Flex, newest first: new and removed components, colors, logos and guides. Open an entry to see what changed, with before and after pictures. It's written automatically each time a change is published.</p></header>
<div class="ds-cl"><div class="ds-cl-bar"><div class="ds-cl-types" role="group" aria-label="Show changes to">%s</div><div class="ds-cl-opts"><label class="ds-cl-check"><input type="checkbox" id="ds-cl-small"><span>Show small edits</span></label><label class="ds-cl-who"><span>Made by</span><select id="ds-cl-person"><option value="">Everyone</option></select></label></div></div>
<p class="ds-cl-count" id="ds-cl-count" aria-live="polite"></p>
<div id="ds-changelog"></div></div>
<script type="application/json" id="ds-changes-data">%s</script>''' % (
    ''.join('<button type="button" class="ds-size ds-cl-type" data-type="%s" aria-pressed="%s">%s</button>' % (k, 'true' if k == '' else 'false', t)
            for k, t in (('', 'All'), ('component', 'Components'), ('token', 'Colors and tokens'), ('asset', 'Logos and assets'), ('guide', 'Guides'))),
    json.dumps(CHANGES, ensure_ascii=False, separators=(',', ':')).replace('</', '<\\/'))))

# tokens
COLOR_GROUPS = [
    ('Palette', lambda n: False),
    ('Surfaces', lambda n: n.startswith('surface-')),
    ('Text', lambda n: n.startswith('text-')),
    ('Strokes', lambda n: n.startswith('stroke-')),
    ('Buttons and links', lambda n: n.startswith(('button-', 'link-', 'hyperlink-'))),
    ('Icons and avatars', lambda n: n.startswith(('icon-', 'avatar-'))),
    ('Utility and overlays', lambda n: n.startswith(('utility-', 'overlay-'))),
    ('Filters and search', lambda n: n.startswith(('filter-', 'search-', 'chip-'))),
    ('Tags', lambda n: n.startswith('tag-')),
    ('Flags', lambda n: n.startswith('flag-')),
    ('Markers', lambda n: n.startswith('marker-')),
    ('Events', lambda n: n.startswith('event-')),
]
buckets = {g: [] for g, _ in COLOR_GROUPS}
for x in tok['color']['tokens']:
    for g, test in COLOR_GROUPS[1:]:
        if test(x['name']):
            buckets[g].append(x)
            break
    else:
        buckets['Palette'].append(x)
th = ['<header class="ds-head"><p class="ds-eyebrow">Tokens</p><h1>Design Tokens</h1><p class="ds-lede">Every value the components are built from. Use the token name, not the raw value, so a change to the token reaches everything that uses it.</p></header>',
      '<ul class="ds-toc" aria-label="Token sets">' + ''.join('<li><a href="#tokens" data-jump="tk-%s">%s</a></li>' % (slug(n), n) for n in ['Color', 'Type', 'Spacing', 'Radius', 'Shadow', 'Layout', 'Layers']) + '</ul>',
      '<section class="ds-group"><h2 id="tk-color">Color</h2>']
for g, _ in COLOR_GROUPS:
    if not buckets[g]:
        continue
    th.append('<h3>%s</h3><ul class="ds-swatches">' % g)
    for x in buckets[g]:
        # The Blue Gradient is one swatch: its two end tokens are only ever used together.
        if x['name'] == 'blue-gradient-end':
            continue
        if x['name'] == 'blue-gradient-start':
            th.append('<li id="tok-blue-gradient"><span class="ds-chip" style="background:linear-gradient(124deg, var(--blue-gradient-start) 30%%, var(--blue-gradient-end))"></span><span class="ds-name">Blue Gradient</span><span class="ds-val">%s → %s, 124°</span><span class="ds-use">%s</span></li>' % (
                esc(resolve(x['value']['light'])), esc(resolve(next(t for t in tok['color']['tokens'] if t['name'] == 'blue-gradient-end')['value']['light'])),
                esc('blue-gradient-start (from 30%) at the top left to blue-gradient-end at the bottom right, as in Figma\'s Blue Gradient style. In code: var(--surface-promo-gradient). The ground of the blue promo cards, the stats panel and the form banner. White text on it: 3.26:1 at the light end, 6.50:1 at the dark end.')))
            continue
        raw = x['value']['light']
        m = re.match(r'^\{(.+)\}$', raw)
        val = ('%s, same as %s' % (resolve(raw), m.group(1))) if m else raw
        th.append('<li id="tok-%s"><span class="ds-chip" style="background:var(--%s)"></span><span class="ds-name">%s</span><span class="ds-val">%s</span><span class="ds-use">%s</span></li>' % (x['name'], x['name'], esc(x['name']), esc(val), esc(x.get('usage', ''))))
    th.append('</ul>')
th.append('</section><section class="ds-group"><h2 id="tk-type">Type</h2><p>Families: %s.</p>' % esc('; '.join('%s is %s' % (k, v.split(',')[0].strip('"')) for k, v in tok['type']['families'].items())))
# Every weight a type style comes in: its default plus the style-weight classes in bundle.css (paragraph-rg-500).
_WCLS = {}
for _m in re.finditer(r'\.([a-z0-9-]+?)-([1-9]00)\s*[{,]', open(P + '/components/bundle.css').read()):
    _WCLS.setdefault(_m.group(1), set()).add(_m.group(2))
def weights_of(st):
    return ', '.join(sorted(_WCLS.get(st['name'], set()) | {str(st['fontWeight'])}))
for g in tok['type']['groups']:
    th.append('<h3>%s</h3>%s<ul class="ds-rows">' % (esc(g['name']), '<p>%s</p>' % esc(g['note']) if g.get('note') else ''))
    for st in g['styles']:
        spec = ' / '.join(v for v in [st['fontSize'], st.get('lineHeight') or '', ('weights ' if ',' in weights_of(st) else 'weight ') + weights_of(st), st.get('letterSpacing') or ''] if v)
        th.append('<li id="tok-%s"><span class="ds-meta"><span class="ds-name">%s</span><span class="ds-val">%s</span></span><span class="ds-demo"><span class="ds-spec %s">%s</span><span class="ds-use">%s</span></span></li>' % (st['name'], esc(st['name']), esc(spec), 'ts-' + st['name'], esc(st.get('sample') or 'Detect, Prioritize, Eliminate'), esc(st.get('usage', ''))))
    th.append('</ul>')
th.append('</section>')


def rows(key, title, demo):
    sec = tok[key]
    out = ['<section class="ds-group"><h2 id="tk-%s">%s</h2>' % (slug(title), title)]
    if sec.get('note'):
        out.append('<p>%s</p>' % esc(sec['note']))
    out.append('<ul class="ds-rows">')
    for x in sec['tokens']:
        v = x['value']['light'] if isinstance(x['value'], dict) else x['value']
        out.append('<li id="tok-%s"><span class="ds-meta"><span class="ds-name">%s</span><span class="ds-val">%s</span></span><span class="ds-demo">%s<span class="ds-use">%s</span></span></li>' % (x['name'], esc(x['name']), esc(str(v)), demo(x), esc(x.get('usage', ''))))
    out.append('</ul></section>')
    return ''.join(out)


th.append(rows('spacing', 'Spacing', lambda x: '<span class="ds-bar" style="width:var(--%s)"></span>' % x['name']))
th.append(rows('radius', 'Radius', lambda x: '<span class="ds-box" style="border-radius:var(--%s)"></span>' % x['name']))
th.append(rows('shadow', 'Shadow', lambda x: '<span class="ds-lift" style="box-shadow:var(--%s)"></span>' % x['name']))
th.append(rows('layout', 'Layout', lambda x: ''))
th.append(rows('zIndex', 'Layers', lambda x: ''))
views.append(('tokens', ''.join(th)))
SPEC_CSS = '\n'.join('.ds-spec.ts-' + c[1:] for c in classes)

# ---------- code for the Code view: each component's props, with the types they name ----------
DTS = open(P + '/components/index.d.ts').read()


def declaration(kind_name):
    """One exported interface or type, whole."""
    m = re.search(r'^export (?:interface|type) %s\b[^\n]*' % re.escape(kind_name), DTS, re.M)
    if not m:
        return ''
    first = m.group(0)
    if first.startswith('export type') or first.rstrip().endswith('}'):
        return first
    end = DTS.find('\n}', m.start())
    return DTS[m.start():end + 2]


def types_for(name):
    block = declaration(name + 'Props')
    fn = re.search(r'^export declare function %s\([^\n]*' % re.escape(name), DTS, re.M)
    if not block and not fn:
        return ''
    # A component without its own Props interface (Checkbox, Radio, Toggle) is described by its function line and the types that names.
    out = [block] if block else []
    if fn:
        out.append(fn.group(0))
    seen = {name + 'Props', name}
    for ref in re.findall(r'\b([A-Z][A-Za-z0-9]+)\b', block or fn.group(0)):
        if ref in seen or ref == 'React' or len(seen) > 7:
            continue
        d = declaration(ref)
        if d:
            seen.add(ref)
            out.append(d)
    return '\n\n'.join(out)


TYPES = {}

# components
comps = []
# Page chrome that runs edge to edge on the site is shown with square corners.
SQUARE = {'Nav', 'NavBanner', 'Footer'}
# A ruler: Specs is about measurements.
SPECS_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><rect x="2.5" y="7" width="19" height="10" rx="1.5"/><path d="M6.5 7v4M10.25 7v2.5M14 7v4M17.75 7v2.5"/></svg>'
CODE_ICON = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M8.5 7L3.5 12l5 5"/><path d="M15.5 7l5 5-5 5"/><path d="M13.5 4.5l-3 15"/></svg>'


def card_meta(name):
    src = open('%s/components/%s/preview.html' % (P, name)).read()
    first, body = src.split('\n', 1)
    assert first.startswith('<!-- @dsCard'), name
    h = re.search(r'height=(\d+)', first)
    w = re.search(r'width=(\d+)', first)
    sub = re.search(r'subtitle="([^"]*)"', first)
    sub = sub.group(1) if sub else ''
    sub = re.sub(r'^(Component|Pattern|Block module) · ', '', sub)
    return body, int(h.group(1)) if h else 300, int(w.group(1)) if w else 0, sub


def add(name):
    body, h, w, sub = card_meta(name)
    if name == 'Nav':
        a = body.index('/* Links to qualys.com open in a new tab')
        b = body.index('var COMMON')
        body = body[:a] + body[b:]
    comps.append({'n': name, 'h': h, 'w': w, 'html': body})
    return sub


add('Cover')
# Example page: the modules put together as one page, shown in a device frame at real size
add('ExamplePage')
DEVICES = [('desktop', 'Desktop', 1440, 900), ('laptop', 'Laptop', 1280, 800), ('tablet', 'Tablet', 768, 1024), ('mobile', 'Mobile', 375, 812)]
views.append(('example', '''<header class="ds-head"><p class="ds-eyebrow">Start</p><h1>Example page</h1><p class="ds-lede">A page built only from the system's modules: banner, nav, hero, logos, stats, content, resources, customer stories, a form and the footer. It is drawn at each device's real width, so the modules respond as they would on qualys.com; it is only scaled down when the device is wider than this column. Scroll inside the frame, open the menus, try the search.</p></header>
<div class="ds-devbar" role="group" aria-label="Device size">%s<a class="ds-size ds-devopen" href="example.html" target="_blank" rel="noopener">Open in a new tab</a></div>
<p class="ds-devnote" id="ds-devnote"></p>
<div class="ds-devstage" data-ex="ExamplePage"><div class="ds-devfit"></div></div>''' % ''.join('<button type="button" class="ds-size ds-dev" data-w="%d" data-h="%d" aria-pressed="%s">%s <span>%d × %d</span></button>' % (w, hh, 'true' if k == 'desktop' else 'false', label, w, hh) for k, label, w, hh in DEVICES)))
LEVEL_NAME = {'Component': 'Component', 'Pattern': 'Pattern', 'Block module': 'Page module', 'Foundation': 'Foundation'}
def family_view(fid, fname, members, eyebrow):
    cards = []
    for name in members:
        sub = add(name)
        rp = '%s/components/%s/README.md' % (P, name)
        notes = ''
        if os.path.exists(rp):
            _, rh = strip_h1(md(open(rp).read(), 'r-' + name)[0])
            notes = '<details class="ds-notes"><summary>Usage notes</summary><div class="ds-prose">%s</div></details>' % rh
            README_TEXT[name] = rh
        # No Code button on the cards: props and types live in the component's README and index.d.ts.
        code_btn = ''
        cards.append('''<article class="ds-card" id="c-%s"><div class="ds-card-head"><h2>%s</h2><span class="ds-level">%s</span><span class="ds-tools"><button type="button" class="ds-specs" aria-expanded="false" aria-controls="ds-drawer" aria-haspopup="dialog" data-sp="sp-%s" title="Sizes, spacing, color, type and tokens">%s<span>Specs</span></button>%s<button type="button" class="ds-size" aria-pressed="false" hidden>Actual size</button><button type="button" class="ds-size ds-open" title="Open this preview on a page of its own, at full size">Open in page</button></span></div>
<p class="ds-sub">%s</p><div class="ds-stage%s" data-c="%s"></div><div class="ds-specpanel" id="sp-%s" hidden></div>%s</article>''' % (name, name, LEVEL_NAME.get(LEVEL[name], LEVEL[name]), name, SPECS_ICON, code_btn, esc(sub), ' is-square' if name in SQUARE else '', name, name, notes))
    views.append((fid, '<header class="ds-head"><p class="ds-eyebrow">%s</p><h1>%s</h1></header><div class="ds-family">%s</div>' % (esc(eyebrow), esc(fname), ''.join(cards))))

README_TEXT = {}
FAMILY_OF = {}

# Foundations: Typography and Grid each have their own page, next to the tokens and assets.
for fname in ('Typography', 'Grid'):
    family_view(slug(fname), fname, [fname], 'Foundations')
# The Icon card and the asset files sit at the end of their guidelines: icons and logos together, images under Media.
family_view('icons', 'Icons', ['Icon'], 'Guidelines')
_icon_view = views.pop()
ICON_CARD = re.search(r'<div class="ds-family">.*</div>$', _icon_view[1], re.S).group(0)


def asset_html(keys):
    out = []
    for key in keys:
        g = idx['assetGroups'][key]
        big = g.get('tile') == 'l'
        out.append('<section class="ds-group" id="as-%s"><h2>%s</h2><ul class="ds-assets %s">' % (slug(g['name']), esc(g['name']), 'is-l' if big else 'is-s'))
        for n in g['order']:
            f = g['files'][n]
            dark = 'reversed' in n
            out.append('<li><span class="ds-tile%s"><img data-blob="%s" alt="%s"></span><span class="ds-name">%s</span></li>' % (' is-dark' if dark else '', f['blob'], esc(n.rsplit('.', 1)[0].replace('-', ' ')), esc(n)))
        out.append('</ul></section>')
    return ''.join(out)


EXTRAS = {}
for gp in idx['docs']['sections']:
    gid = re.search(r'guide-(\d+)', gp).group(0)
    if 'icons-logos' in gp:
        EXTRAS[gid] = ('<section class="ds-group" id="icons"><h2>The Icon component</h2>%s</section>' % ICON_CARD) + asset_html([k for k in idx['groups'] if k != 'Images'])
    elif 'media' in gp:
        EXTRAS[gid] = asset_html(['Images'])
views[:] = [(v, re.sub(r'<!--EXTRA:(guide-\d+)-->', lambda m: EXTRAS.get(m.group(1), ''), h)) for v, h in views]
ncount = sum(len(m) for _, fams in SECTIONS for _, m in fams)
index = ['<header class="ds-head"><p class="ds-eyebrow">Library</p><h1>All</h1><p class="ds-lede">%d parts in two groups. <b>Components</b> are the pieces a page uses, from a single button or field to a whole form or filter bar. <b>Page modules</b> are the full-width sections a page is built from (a hero, a footer). Each card says whether it is a component or a pattern made of several.</p></header>' % ncount]
nav_secs = []
for sname, fams in SECTIONS:
    index.append('<section class="ds-group"><h2 id="ix-%s">%s</h2><div class="ds-index">' % (slug(sname), esc(sname)))
    nav_fams = []
    for fname, members in fams:
        fid = 'f-' + slug(fname)
        family_view(fid, fname, members, sname)
        index.append('<section><h2><a href="#%s">%s</a></h2><ul>%s</ul></section>' % (fid, esc(fname), ''.join('<li><a href="#c-%s">%s</a></li>' % (n, n) for n in members)))
        nav_fams.append((fid, fname, members))
        for n in members:
            FAMILY_OF[n] = (fid, fname, sname)
    index.append('</div></section>')
    nav_secs.append((sname, nav_fams))
views.append(('components', ''.join(index)))



# ---------- rail ----------
nav = ['<div><h2>Start</h2><ul><li><a href="#overview">Overview</a></li>%s<li><a href="#changelog">Change Log</a></li><li><a href="#example">Example page</a></li></ul></div>' % ''.join('<li><a href="#%s">%s</a></li>' % (gid, esc(t)) for gid, t, _, _ in guides if gid in START_GUIDES),
       '<div><h2>Guidelines</h2><ul>%s</ul></div>' % ''.join('<li><a href="#%s">%s</a></li>' % (gid, esc(t)) for gid, t, _, _ in guides if gid not in START_GUIDES),
       '<div><h2>Foundations</h2><ul><li><a href="#tokens">Design tokens</a></li><li><a href="#typography">Typography</a></li><li><a href="#grid">Grid</a></li></ul></div>']
for k, (sname, nav_fams) in enumerate(nav_secs):
    part = ['<div class="ds-navsec"><h2>%s</h2>' % esc(sname)]
    if k == 0:
        part.append('<ul><li><a href="#components">All</a></li></ul>')
    for fid, fname, names in nav_fams:
        part.append('<details data-family data-view="%s"><summary>%s</summary><ul><li><a href="#%s">Whole family</a></li>%s</ul></details>' % (fid, esc(fname), fid, ''.join('<li><a href="#c-%s">%s</a></li>' % (n, n) for n in names)))
    part.append('</div>')
    nav.append(''.join(part))
# (Search results replace the rail while a query is typed; see shell.js.)

# ---------- search index ----------
def plain(h):
    h = re.sub(r'<img[^>]*>', ' ', h)
    h = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', h, flags=re.S)
    h = re.sub(r'<[^>]+>', ' ', h)
    return re.sub(r'\s+', ' ', html.unescape(h)).strip()


def sections_of(h):
    """Split rendered guide HTML at its h2/h3 headings: [(id, heading, text)]."""
    out = []
    parts = re.split(r'(<h[23] id="[^"]+">.*?</h[23]>)', h, flags=re.S)
    cur = None
    for part in parts:
        m = re.match(r'<h([23]) id="([^"]+)">(.*?)</h[23]>', part, re.S)
        if m:
            cur = [m.group(2), plain(m.group(3)), '', int(m.group(1))]
            out.append(cur)
        elif cur is not None:
            cur[2] += ' ' + plain(part)
    return [(i, t, x.strip(), lv) for i, t, x, lv in out]


# Words people search with that aren't in a component's name.
ALIASES = {
    'Button': 'cta call to action primary secondary btn', 'TextLink': 'link arrow tertiary text button', 'Hyperlink': 'inline link anchor underline url',
    'Select': 'dropdown picker combobox options', 'FilterDropdown': 'dropdown filter menu', 'FilterBar': 'filters toolbar', 'FilterDrawer': 'filters mobile panel',
    'FilterChip': 'chip pill filter toggle', 'FilterChipGroup': 'chips pills filters', 'AppliedFilters': 'active filters chips clear',
    'Modal': 'dialog popup overlay lightbox window', 'AlertDialog': 'confirm dialog warning popup', 'FormModal': 'popup form dialog gated',
    'Tag': 'badge pill label chip status severity', 'Flag': 'ribbon label corner new upcoming featured', 'Marker': 'indicator active bar unread count',
    'EventType': 'event icon webinar training', 'Nav': 'header navigation navbar menu mega menu top bar search',
    'NavBanner': 'announcement bar top banner promo', 'NotificationBar': 'alert banner announcement message', 'CookieBanner': 'consent gdpr privacy',
    'Toast': 'snackbar notification message alert', 'ToastStack': 'notifications snackbars', 'Tooltip': 'hint popover info help',
    'HoverCard': 'popover hover preview', 'Tabs': 'tab switcher segmented', 'TabModule': 'tabs section', 'Accordion': 'collapse expand faq disclosure',
    'Drawer': 'collapse expand row disclosure', 'DrawerCard': 'collapse expand card', 'AccordionModule': 'faq collapse expand',
    'Carousel': 'slider swiper scroller', 'LogoCarousel': 'logos marquee customers trust bar', 'LogoHierarchy': 'sponsors partners logos tiers pavilion',
    'TestimonialCard': 'quote review customer story', 'TestimonialCarousel': 'quotes reviews customer stories', 'Hero': 'banner header masthead top',
    'TypographicHeader': 'page header title', 'Footer': 'bottom links legal sitemap', 'GeneralContent': 'content block media text image video banner',
    'Stats': 'numbers metrics figures counters', 'StatCard': 'number metric figure', 'TextField': 'input text box field email',
    'Form': 'form fields signup lead', 'Checkbox': 'check tick consent', 'Radio': 'option choice', 'Toggle': 'switch on off',
    'SearchBar': 'search input find', 'Breadcrumbs': 'path trail navigation', 'Avatar': 'profile picture headshot photo',
    'ProfileCard': 'person speaker bio team', 'ProfileGrid': 'people team speakers', 'ProfileModal': 'bio popup person',
    'EventCalendar': 'calendar events schedule month', 'EventCard': 'event card', 'WebinarCard': 'webinar card speakers', 'BlogCard': 'blog post article card',
    'ResourceCard': 'whitepaper report datasheet content card', 'IntegrationCard': 'partner integration card', 'InlinePromoCard': 'promo banner ad',
    'FeatureMatrix': 'comparison table compare checkmarks competitors', 'DetailComparison': 'comparison table compare', 'MarketingTable': 'table pricing comparison',
    'CtaModule': 'call to action form signup', 'Card': 'tile feature card', 'CardModule': 'cards grid row features',
    'Media': 'image video placeholder', 'Icon': 'icons glyph svg hugeicons', 'Grid': 'columns layout breakpoints container gutter margins',
    'Typography': 'type fonts text styles headings', 'Overlay': 'scrim backdrop', 'SessionTimeout': 'timeout warning logout', 'ExitIntent': 'popup leave exit',
    'SuccessConfirmation': 'thank you success message', 'DemoRequestWizard': 'multi step form wizard demo', 'Cover': '',
}
SEARCH = []
for i, t, x, lv in sections_of(over):
    SEARCH.append({'k': 'Guideline', 't': t, 'g': 'Overview', 'h': 'overview', 'j': i, 'x': x[:1500]})
for gid, title, body, toc in guides:
    secs = sections_of(body)
    SEARCH.append({'k': 'Guideline', 't': title, 'g': 'Guideline', 'h': gid, 'x': plain(body)[:400], 'top': 1})
    parent = title
    for i, t, x, lv in secs:
        if lv == 2:
            parent = t
        ctx = title if lv == 2 or parent == t else title + ' › ' + parent
        SEARCH.append({'k': 'Guideline', 't': t, 'g': ctx, 'h': gid, 'j': i, 'x': x[:1500]})
for name, (fid, fname, sname) in FAMILY_OF.items():
    lvl = LEVEL_NAME.get(LEVEL.get(name, ''), LEVEL.get(name, ''))
    sub = card_meta(name)[3]
    words = re.sub(r'(?<=[a-z])(?=[A-Z])', ' ', name)
    SEARCH.append({'k': 'Component', 't': name, 'g': '%s · %s' % (lvl, fname), 'h': 'c-' + name, 'd': sub, 'a': (words + ' ' + ALIASES.get(name, '')).lower(), 'x': plain(README_TEXT.get(name, ''))[:4000]})
for n, label in (('Typography', 'Foundations'), ('Grid', 'Foundations'), ('Icon', 'Icons and Logos')):
    if n not in FAMILY_OF:
        h = 'c-' + n
        SEARCH.append({'k': 'Component', 't': n, 'g': label, 'h': h, 'd': card_meta(n)[3], 'a': ALIASES.get(n, '').lower(), 'x': plain(README_TEXT.get(n, ''))[:4000]})
for t, h, d in (('Overview', 'overview', 'What Flex is, governance and how to use it'), ('Example page', 'example', 'A page built from the modules, at each device size'), ('Change Log', 'changelog', 'Every published change: what changed, who made it and who approved it'),
                ('Design tokens', 'tokens', 'Every color, type, spacing, radius, shadow, layout and layer value'), ('All components', 'components', 'Every component, pattern and page module')):
    SEARCH.append({'k': 'Page', 't': t, 'g': 'Page', 'h': h, 'd': d, 'x': ''})
for gname, test in COLOR_GROUPS:
    for x in buckets[gname]:
        if x['name'] == 'blue-gradient-end':
            continue
        nm = 'blue-gradient' if x['name'] == 'blue-gradient-start' else x['name']
        SEARCH.append({'k': 'Token', 't': nm, 'g': 'Color · ' + gname, 'h': 'tokens', 'j': 'tok-' + nm, 'd': resolve(x['value']['light']), 'x': x.get('usage', '')})
for g in tok['type']['groups']:
    for st in g['styles']:
        SEARCH.append({'k': 'Token', 't': st['name'], 'g': 'Type · ' + g['name'], 'h': 'tokens', 'j': 'tok-' + st['name'], 'd': '%s %s' % (st['fontSize'], st['fontWeight']), 'x': st.get('usage', '')})
for key, title in (('spacing', 'Spacing'), ('radius', 'Radius'), ('shadow', 'Shadow'), ('layout', 'Layout'), ('zIndex', 'Layers')):
    for x in tok[key]['tokens']:
        v = x['value']['light'] if isinstance(x['value'], dict) else x['value']
        SEARCH.append({'k': 'Token', 't': x['name'], 'g': title, 'h': 'tokens', 'j': 'tok-' + x['name'], 'd': str(v)[:40], 'x': x.get('usage', '')})
_asset_home = {}
for gp in idx['docs']['sections']:
    gid = re.search(r'guide-(\d+)', gp).group(0)
    if 'icons-logos' in gp:
        for k in idx['groups']:
            if k != 'Images':
                _asset_home[k] = gid
    elif 'media' in gp:
        _asset_home['Images'] = gid
for key, gid in _asset_home.items():
    g = idx['assetGroups'][key]
    for n in g['order']:
        SEARCH.append({'k': 'Asset', 't': n, 'g': g['name'], 'h': gid, 'j': 'as-' + slug(g['name']), 'x': n.rsplit('.', 1)[0].replace('-', ' ')})

data = {'search': SEARCH, 'types': TYPES, 'kinds': KINDS, 'look': LOOK, 'typeStyles': TYPE_STYLES, 'react': open(P + '/components/lib/react.production.min.js').read(), 'reactDom': open(P + '/components/lib/react-dom.production.min.js').read(), 'tokenCss': TOKEN_CSS, 'bundleCss': open(P + '/components/bundle.css').read(), 'bundleJs': open(P + '/components/bundle.js').read(), 'assets': assets, 'components': comps}
blob = json.dumps(data, ensure_ascii=False, separators=(',', ':')).replace('<', '\\u003c').replace('\u2028', '\\u2028').replace('\u2029', '\\u2029')
js = open(HERE + '/shell.js').read()
assert '</script' not in js.lower()

def uri(path, mime):
    return 'data:%s;base64,%s' % (mime, base64.b64encode(open(path, 'rb').read()).decode())


# The tab icon is the shield from the Logos set: a PNG for browsers that skip SVG icons, then the SVG, then the home-screen icon.
ICONS = '<link rel="icon" type="image/png" sizes="32x32" href="%s">\n<link rel="icon" type="image/svg+xml" href="%s">\n<link rel="apple-touch-icon" href="%s">' % (
    uri(HERE + '/icons/icon-32.png', 'image/png'), uri(P + '/assets/Logos/qualys-shield.svg', 'image/svg+xml'), uri(HERE + '/icons/apple-180.png', 'image/png'))

body = '''<title>Flex Design System</title>
%(icons)s
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Text:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<style>
%(root)s
%(shell)s
%(spec)s
</style>
<div class="ds-app">
<header class="ds-top"><img data-logo="%(logo)s" alt="Qualys" width="92" height="28"><span>Flex Design System</span><button type="button" class="ds-menu" id="ds-menu" aria-expanded="false" aria-controls="ds-rail">Menu</button></header>
<nav class="ds-rail" id="ds-rail" aria-label="Sections">
<a class="ds-brand" href="#overview"><img data-logo="%(logo)s" alt="Qualys" width="116" height="35"><span>Flex Design System</span></a>
<div class="ds-find" role="search"><label class="ds-sr" for="ds-find">Search Flex</label><input type="search" id="ds-find" placeholder="Search Flex" autocomplete="off" spellcheck="false" role="combobox" aria-expanded="false" aria-controls="ds-results" aria-autocomplete="list"><kbd class="ds-kbd" aria-hidden="true">/</kbd></div>
<div class="ds-results" id="ds-results" role="listbox" aria-label="Search results" hidden></div>
<p class="ds-sr" id="ds-count" aria-live="polite"></p>
<div class="ds-nav">%(nav)s</div>
<p class="ds-snap">Flex is the source of truth for the Qualys website's design. Last updated %(snap)s.</p>
</nav>
<main class="ds-main" id="ds-main">
%(views)s
</main>
</div>
<script type="application/json" id="ds-data">%(data)s</script>
<script>
%(js)s
</script>
''' % {
    'icons': ICONS,
    'root': '\n'.join(root),
    'shell': open(HERE + '/shell.css').read(),
    'spec': '\n'.join('.ds-spec.ts-%s' % c[1:] for c in classes),
    'logo': LOGO,
    'nav': ''.join(nav),
    'snap': SNAP,
    'views': '\n'.join('<section class="ds-view" data-view="%s"%s>%s</section>' % (vid, '' if vid == 'overview' else ' hidden', h) for vid, h in views),
    'data': blob,
    'js': js,
}
os.makedirs(OUT, exist_ok=True)
open(OUT + '/body.html', 'w').write(body)
full = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<style>body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n' + body.replace('<div class="ds-app">', '</head>\n<body>\n<div class="ds-app">', 1) + '</body>\n</html>\n'
open(OUT + '/flex-design-system.html', 'w').write(full)
# The example page as its own file next to the site, so "Open in a new tab" is a plain link that works everywhere
def _blob(t):
    return re.sub(r'/_blob/([0-9a-f]{32})', lambda m: assets.get(m.group(1), m.group(0)), t)
_ex = card_meta('ExamplePage')[0]
_pre = ('<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><style>' + TOKEN_CSS + '</style><style>' + _blob(open(P + '/components/bundle.css').read()) + '</style>'
        '<script>' + open(P + '/components/lib/react.production.min.js').read() + '</script><script>' + open(P + '/components/lib/react-dom.production.min.js').read() + '</script>'
        '<script>' + _blob(open(P + '/components/bundle.js').read()) + '</script>')
_ex = _blob(_ex.replace('<head>', '<head>' + _pre, 1).replace('<title>Example page</title>', '<title>Example page · Flex Design System</title>'))
_ex = _ex.replace('</body>', '<script>document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest(\'a[href="#"]\');if(a)e.preventDefault();});</script></body>')
open(OUT + '/example.html', 'w').write(_ex)
print('views', len(views), 'components', len(comps), 'bytes', len(body.encode()))
