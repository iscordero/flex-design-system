#!/usr/bin/env python3
"""Flex change log: works out what a change did to the design system, and records published changes.

Nobody writes the change log by hand. This script compares two versions of the repository and lists what was
added, changed or removed: components, tokens, guide sections and the reference site. Small wording edits are
grouped into one line. The entries live in site/changes.json (with before and after screenshots in site/changes/),
and the site's Change Log page shows them.

  python3 tools/changelog.py diff [BASE] [HEAD]   what a change does, as text. Defaults: origin/main and the
                                                  working folder (HEAD "." means files on disk, not yet committed)
  python3 tools/changelog.py comment BASE HEAD BRANCH
                                                  posts or updates the summary comment on a pull request
                                                  (GitHub Action; needs GITHUB_TOKEN, GITHUB_REPOSITORY, PR_NUMBER)
  python3 tools/changelog.py record BEFORE AFTER  adds an entry for each change published to main between two
                                                  commits, with screenshots (GitHub Action)
  python3 tools/changelog.py draft [--shots]      writes the entry this unpublished work will get (site/changes-draft.json),
                                                  so it can be checked on the Change Log before publishing.
                                                  publish.sh runs it. Compares with what's published (origin/main)
  python3 tools/changelog.py backfill [UNTIL]     rewrites entries for published history (to origin/main), one per day,
                                                  without screenshots; keeps what GitHub recorded
  python3 tools/changelog.py upgrade              redoes entries written in an older format (GitHub Action)

Each entry says what changed in plain words: tokens with their values and where they're used, and for components
and guides the statements their docs added, changed or removed. A line starting "Why:" in a commit message or the
pull request description is shown as the reason ("Why: DrawerCard: ..." is shown with DrawerCard). A reason can be
given later: "Why: DrawerCard: ..." in a later commit is shown with the newest published entry that changed DrawerCard.
Changes to the reference site or these tools alone don't make an entry.

Needs Python 3 (and Pillow and Playwright for screenshots in "record").
"""
import datetime, difflib, hashlib, json, os, re, shutil, subprocess, sys, tempfile, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'site', 'changes.json')
DRAFT = os.path.join(ROOT, 'site', 'changes-draft.json')
SHOTS = os.path.join(ROOT, 'site', 'changes')
P = 'ds/project/'
MAX_SHOTS = 10         # components with before/after screenshots per entry
MAX_SECTIONS = 3       # changed parts of one component's preview shown before and after
MAX_NOTES = 6          # documented changes listed per component or guide section
FORMAT = 2             # entries older than this are redone by "upgrade"
WORDING_RATIO = 0.85   # text this similar, with no image or structure change, is a wording edit
BOT = 'github-actions[bot]'


# ---------- reading a version of the repository ----------
def git(*args, check=True):
    r = subprocess.run(['git', '-C', ROOT] + list(args), capture_output=True)
    if check and r.returncode:
        raise SystemExit('git %s failed: %s' % (' '.join(args), r.stderr.decode()))
    return r.stdout.decode('utf-8', 'replace')


class Version:
    """Files at a git ref, or on disk when ref is '.', or nothing when ref is None (before the first commit)."""
    def __init__(self, ref):
        self.ref = ref
        if ref is None:
            self.files = set()
        elif ref == '.':
            self.files = set(git('ls-files', '--cached', '--others', '--exclude-standard').split('\n')) - {''}
            self.files = {f for f in self.files if os.path.exists(os.path.join(ROOT, f))}
        else:
            self.files = set(git('ls-tree', '-r', '--name-only', ref).split('\n')) - {''}

    def read(self, path):
        if path not in self.files:
            return None
        if self.ref == '.':
            with open(os.path.join(ROOT, path), encoding='utf-8', errors='replace') as f:
                return f.read()
        return git('show', '%s:%s' % (self.ref, path))


def no_images(text):
    """Swap embedded images for a short fingerprint, so a changed picture shows as a change but not as text."""
    return re.sub(r'data:[a-z]+/[a-z0-9.+-]+;base64,[A-Za-z0-9+/=]+',
                  lambda m: 'img:' + hashlib.sha1(m.group(0).encode()).hexdigest()[:10], text or '')


# British and American spellings of the same word. A change that only swaps these is a spelling edit, not a design change.
SPELLING = [('colour', 'color'), ('grey', 'gray'), ('centre', 'center'), ('behaviour', 'behavior'), ('favourite', 'favorite'),
            ('licence', 'license'), ('catalogue', 'catalog'), ('artefact', 'artifact'), ('analyse', 'analyze'),
            ('cancelled', 'canceled'), ('labelled', 'labeled'), ('modelling', 'modeling'), ('travelling', 'traveling'),
            ('organis', 'organiz'), ('recognis', 'recogniz'), ('prioritis', 'prioritiz'), ('optimis', 'optimiz'),
            ('customis', 'customiz'), ('minimis', 'minimiz'), ('maximis', 'maximiz'), ('visualis', 'visualiz'),
            ('emphasis', 'emphasiz'), ('summaris', 'summariz'), ('standardis', 'standardiz'), ('categoris', 'categoriz'),
            ('authoris', 'authoriz'), ('normalis', 'normaliz'), ('personalis', 'personaliz'), ('centralis', 'centraliz')]


def card(preview):
    """A preview without its card line (height, width, group), which the site's tools adjust on their own."""
    return us(re.sub(r'<!--\s*@dsCard[^>]*-->', '', preview or ''))


def us(text):
    t = (text or '').lower()
    for b, a in SPELLING:
        t = t.replace(b, a)
    return t


def similar(a, b):
    a, b = (a or '').split(), (b or '').split()
    return difflib.SequenceMatcher(None, a, b, autojunk=False).ratio()


def is_wording(a, b):
    """True when only words changed: no pictures, tables or headings changed and the text is mostly the same."""
    a, b = no_images(a), no_images(b)
    if re.findall(r'img:\w+', a) != re.findall(r'img:\w+', b):
        return False
    if a.count('|') != b.count('|') or a.count('\n#') != b.count('\n#'):
        return False
    if abs(len(a.split()) - len(b.split())) > 10:   # a new sentence or more is a change, not a wording edit
        return False
    return similar(a, b) >= WORDING_RATIO


# ---------- what the design system holds ----------
def components(v):
    out = {}
    for f in v.files:
        m = re.match(re.escape(P) + r'components/([A-Za-z0-9]+)/(?:README\.md|preview\.html)$', f)
        if m and m.group(1) not in out:
            n = m.group(1)
            out[n] = {'readme': v.read(P + 'components/%s/README.md' % n) or '', 'preview': v.read(P + 'components/%s/preview.html' % n) or ''}
    return out


def js_blocks(v):
    """Top-level functions and variables of the component source, by name."""
    src = v.read('ds/bundle.src.js') or ''
    blocks, cur, name = {}, [], None
    for line in src.split('\n'):
        m = re.match(r'^  (?:function (\w+)\(|var (\w+)\b)', line)
        if m:
            if name:
                blocks[name] = '\n'.join(cur)
            name, cur = m.group(1) or m.group(2), []
        if name:
            cur.append(line)
    if name:
        blocks[name] = '\n'.join(cur)
    return blocks


def css_blocks(v):
    """CSS rules grouped by their q- class (q-mtable__check belongs to q-mtable)."""
    css = re.sub(r'/\*.*?\*/', '', v.read(P + 'components/bundle.css') or '', flags=re.S)
    out = {}

    def add(sel, body, ctx):
        for pre in set(re.findall(r'\.q-([a-z0-9]+(?:-[a-z0-9]+)*?)(?=__|--|[^a-z0-9-]|$)', sel)):
            out.setdefault(pre, []).append('%s %s{%s}' % (ctx, sel.strip(), body.strip()))

    i, n = 0, len(css)
    while i < n:
        j = css.find('{', i)
        if j < 0:
            break
        sel = css[i:j].strip()
        if sel.startswith('@') and not sel.startswith(('@font-face', '@keyframes')):
            depth, k = 1, j + 1
            while k < n and depth:
                depth += {'{': 1, '}': -1}.get(css[k], 0)
                k += 1
            inner = css[j + 1:k - 1]
            for m in re.finditer(r'([^{}]+)\{([^{}]*)\}', inner):
                add(m.group(1), m.group(2), sel)
            i = k
        else:
            k = css.find('}', j)
            k = n if k < 0 else k
            add(sel, css[j + 1:k], '')
            i = k + 1
    return {k: '\n'.join(sorted(x)) for k, x in out.items()}


def props(v):
    src = v.read(P + 'components/index.d.ts') or ''
    return {m.group(1): m.group(0) for m in re.finditer(r'(?ms)^export interface (\w+)Props\b.*?^}', src)}


def tokens(v):
    try:
        t = json.loads(v.read(P + 'tokens.json') or '{}')
    except ValueError:
        return {}
    out = {}
    for fam in ('color', 'shadow', 'spacing', 'radius', 'layout', 'zIndex'):
        for x in (t.get(fam) or {}).get('tokens', []):
            val = x.get('value')
            out[x['name']] = {'family': fam, 'value': val.get('light') if isinstance(val, dict) else val, 'usage': x.get('usage') or ''}
    for g in (t.get('type') or {}).get('groups', []):
        for st in g.get('styles', []):
            out[st['name']] = {'family': 'type', 'value': '%s %s' % (st.get('fontSize', ''), st.get('fontWeight', ''))}
    for k, val in ((t.get('type') or {}).get('families') or {}).items():
        out['font-' + k] = {'family': 'type', 'value': val}
    return out


def resolve(toks, val, depth=0):
    m = re.match(r'^\{(.+)\}$', str(val or ''))
    if m and depth < 6 and m.group(1) in toks:
        return resolve(toks, toks[m.group(1)]['value'], depth + 1)
    return val


def guides(v):
    """Guides (and the Overview) by title, each split into sections by heading."""
    out = {}
    for f in sorted(v.files):
        m = re.match(re.escape(P) + r'(guide-(\d+)-[a-z0-9-]+|README)\.md$', f)
        if not m or m.group(2) == '7':   # guide 7 (Patterns and Components) is retired and not on the site
            continue
        text = v.read(f) or ''
        h1 = re.search(r'(?m)^# (.+)$', text)
        title = 'Overview' if m.group(1) == 'README' else (h1.group(1).strip() if h1 else m.group(1))
        gid = 'overview' if m.group(1) == 'README' else 'guide-' + m.group(2)
        secs, cur, buf = {}, '', []
        for line in text.split('\n'):
            hm = re.match(r'^(##|###) (.+)$', line)
            if hm:
                secs[cur] = '\n'.join(buf)
                cur, buf = hm.group(2).strip(), []
            elif not line.startswith('# '):
                buf.append(line)
        secs[cur] = '\n'.join(buf)
        out[title] = {'gid': gid, 'sections': secs}
    return out


def assets(v):
    """Logos, icons and images, by folder and file name, with a fingerprint of their content."""
    out = {}
    pre = P + 'assets/'
    if v.ref is None:
        return out
    if v.ref == '.':
        for f in v.files:
            if f.startswith(pre) and not f.endswith('.md'):
                with open(os.path.join(ROOT, f), 'rb') as fh:
                    data = fh.read()
                out[f[len(pre):]] = hashlib.sha1(b'blob %d\0' % len(data) + data).hexdigest()
    else:
        for line in git('ls-tree', '-r', v.ref, '--', pre).split('\n'):
            m = re.match(r'^\d+ blob ([0-9a-f]+)\t(.+)$', line)
            if m and not m.group(2).endswith('.md'):   # the folders' READMEs are notes, not assets
                out[m.group(2)[len(pre):]] = m.group(1)
    return out


def site(v):
    h = hashlib.sha1()
    for f in sorted(x for x in v.files if x.startswith('standalone/') or x == 'families.json'):
        h.update(f.encode())
        h.update((v.read(f) or '').encode())
    return h.hexdigest()


# ---------- what changed in the words ----------
def md_blocks(md):
    """A README or guide section as separate statements: bullets, paragraphs and table rows (each row read with its headings)."""
    out, para, head, in_table, in_code, prev = [], [], None, False, False, []

    def flush():
        if para:
            out.append(' '.join(para).strip())
            del para[:]
    for line in no_images(md).split('\n'):
        s = line.strip()
        if s.startswith('```'):
            flush()
            in_code = not in_code
            continue
        if in_code:
            continue
        if not s.startswith('|'):
            in_table = False
        if not s or s.startswith('#') or s.startswith('<!--') or s.startswith('!['):
            flush()
            continue
        if s.startswith('|'):
            flush()
            cells = [c.strip() for c in s.strip('|').split('|')]
            if all(re.match(r'^:?-{2,}:?$', c) for c in cells if c):
                continue
            if not in_table:
                head, in_table, prev = cells, True, []
                continue
            # "Same" in a cell means the row above's value: say it, so the row reads on its own
            cells = [prev[k] if re.match(r'^(same|same as above|as above)\.?$', c, re.I) and k < len(prev) else c for k, c in enumerate(cells)]
            prev = cells
            out.append(' · '.join(('%s: %s' % (h, c)) if h else c for h, c in zip(head or [], cells) if c))
            continue
        if re.match(r'^([-*]|\d+\.)\s', s):
            flush()
            para.append(re.sub(r'^([-*]|\d+\.)\s+', '', s))
            continue
        para.append(s)
    flush()
    return [b for b in out if b and not re.match(r'^\*\*[^*]+\*\*:?$', b)]   # a bold line on its own is a heading


def doc_notes(a, b):
    """What the words say now that they didn't before: statements added, changed (with what they said) and removed,
    in the order they appear. Spelling and a word or two of rewording are left out."""
    A, B = md_blocks(a), md_blocks(b)
    ka, kb = {us(x) for x in A}, {us(x) for x in B}
    added = [x for x in B if us(x) not in ka]
    removed = [x for x in A if us(x) not in kb]
    notes = []
    row = lambda x: x.split(' · ') if ' · ' in x and ': ' in x.split(' · ')[0] else None   # a table row: "Cards: 5 · Desktop: …"
    for x in added:
        best, score = None, 0
        rx = row(x)
        for r in removed:
            rr = row(r)
            lx, lr = re.match(r'^\*\*([^*]+)\*\*', x), re.match(r'^\*\*([^*]+)\*\*', r)
            if rx and rr:   # table rows pair up by their first cell (the row's name), not by how alike they read
                sc = 1.0 if us(rx[0]) == us(rr[0]) else 0
            elif lx and lr and us(lx.group(1)) == us(lr.group(1)):   # "**Columns:** …" is the same statement rewritten
                sc = 0.99
            else:
                sc = similar(us(x), us(r))
            if sc > score:
                best, score = r, sc
        if best is not None and score >= 0.45:
            removed.remove(best)
            rb = row(best)
            if rx and rb and us(rx[0]) == us(rb[0]):   # show only the cells that changed
                old = dict(c.split(': ', 1) if ': ' in c else ('', c) for c in rb[1:])
                new = [c for c in rx[1:] if us(c) not in {us(o) for o in rb[1:]}]
                was = [c for c in rb[1:] if us(c) not in {us(n) for n in rx[1:]}]
                if new or was:
                    notes.append({'kind': 'changed', 'text': ' · '.join([rx[0]] + new), 'was': ' · '.join(was)})
                continue
            names_new = set(re.findall(r'`[^`]+`', x)) - set(re.findall(r'`[^`]+`', best))
            nums = set(re.findall(r'\d+(?:\.\d+)?', x)) != set(re.findall(r'\d+(?:\.\d+)?', best))
            if words_changed(best, x) <= 2 and not names_new and not nums:   # a word or two reworded: not a change to note
                continue
            notes.append({'kind': 'changed', 'text': x, 'was': best})
        else:
            notes.append({'kind': 'added', 'text': x})
    notes += [{'kind': 'removed', 'text': r} for r in removed]
    pa = re.findall(r'!\[([^\]]*)\]\((img:\w+)\)', no_images(a))
    pb = re.findall(r'!\[([^\]]*)\]\((img:\w+)\)', no_images(b))
    if [p[1] for p in pa] != [p[1] for p in pb]:
        old = {p[1] for p in pa}
        for alt, _ in [p for p in pb if p[1] not in old][:2]:
            notes.append({'kind': 'changed' if pa else 'added', 'text': 'Picture: ' + (alt or 'a new picture')})
    return notes


def words_changed(a, b):
    """How many words differ between two statements (a replaced word counts once)."""
    wa, wb = us(a).split(), us(b).split()
    return sum(max(i2 - i1, j2 - j1) for tag, i1, i2, j1, j2 in
               difflib.SequenceMatcher(None, wa, wb, autojunk=False).get_opcodes() if tag != 'equal')


def keep_notes(it, notes, limit=MAX_NOTES):
    if notes:
        it['notes'] = notes[:limit]
        if len(notes) > limit:
            it['moreNotes'] = len(notes) - limit


def prop_docs(src):
    """A component's options (props), each with its one-line description."""
    out, doc = {}, ''
    for line in (src or '').split('\n'):
        m = re.match(r'^\s*/\*\*\s*(.*?)\s*\*/\s*$', line)
        if m:
            doc = m.group(1)
            continue
        m = re.match(r'^  (\w+)\??\s*:', line)
        if m:
            out[m.group(1)] = doc
            doc = ''
    return out


# ---------- comparing two versions ----------
def compare(a, b):
    """Items describing how version b differs from version a."""
    items = []
    ca, cb = components(a), components(b)
    ja, jb = js_blocks(a), js_blocks(b)
    sa, sb = css_blocks(a), css_blocks(b)
    pa, pb = props(a), props(b)

    # which components a piece of code or a CSS class belongs to
    names = set(cb) | set(ca)
    owner_of_class = {}
    for n in names:
        for pre in set(re.findall(r"['\" ]q-([a-z0-9]+(?:-[a-z0-9]+)*?)(?=__|--|['\" ])", jb.get(n, '') + ja.get(n, ''))):
            owner_of_class.setdefault(pre, set()).add(n)

    def users(helper):
        found = {n for n in names if n != helper and re.search(r'\b%s\b' % re.escape(helper), jb.get(n, '') or ja.get(n, ''))}
        return found if len(found) <= 3 else set()   # shared helpers used everywhere aren't pinned on anyone

    look = set()
    for k in set(ja) | set(jb):
        if us(ja.get(k)) != us(jb.get(k)):
            look |= {k} if k in names else users(k)
    sa = {us(k): us(v) for k, v in sa.items()}
    sb = {us(k): us(v) for k, v in sb.items()}
    for k in set(sa) | set(sb):
        if sa.get(k) != sb.get(k):
            look |= owner_of_class.get(k, set()) or {n for n in names if n.lower() == k.replace('-', '')}

    for n in sorted(names):
        if n not in ca:
            it = {'type': 'component', 'action': 'added', 'name': n}
            keep_notes(it, [{'kind': 'added', 'text': x} for x in md_blocks(cb[n]['readme'])[:1]])
            items.append(it)
            continue
        if n not in cb:
            items.append({'type': 'component', 'action': 'removed', 'name': n})
            continue
        what = []
        if n in look or card(ca[n]['preview']) != card(cb[n]['preview']):
            what.append('look')
        if us(pa.get(n)) != us(pb.get(n)):
            what.append('props')
        if ca[n]['readme'] != cb[n]['readme']:
            if not what and (us(ca[n]['readme']) == us(cb[n]['readme']) or is_wording(ca[n]['readme'], cb[n]['readme'])):
                it = {'type': 'component', 'action': 'changed', 'name': n, 'wording': True}
                keep_notes(it, doc_notes(ca[n]['readme'], cb[n]['readme']))
                items.append(it)
                continue
            what.append('docs')
        if what:
            # how much changed, roughly: lines that differ in its code, styles, preview and props
            def lines(x):
                return set(l.strip() for l in us(x).split('\n') if l.strip())
            own = [k for k, v in owner_of_class.items() if n in v]
            weight = (len(lines(ja.get(n)) ^ lines(jb.get(n))) + len(lines(card(ca[n]['preview'])) ^ lines(card(cb[n]['preview']))) +
                      len(lines(pa.get(n)) ^ lines(pb.get(n))) + sum(len(lines(sa.get(k)) ^ lines(sb.get(k))) for k in own))
            it = {'type': 'component', 'action': 'changed', 'name': n, 'what': what, 'weight': weight}
            keep_notes(it, doc_notes(ca[n]['readme'], cb[n]['readme']))
            if 'props' in what:
                da, db = prop_docs(pa.get(n)), prop_docs(pb.get(n))
                new = [{'name': k, 'doc': db[k]} for k in db if k not in da]
                gone = [k for k in da if k not in db]
                if new:
                    it['propsAdded'] = new
                if gone:
                    it['propsRemoved'] = gone
            items.append(it)

    # A component that changed without changes of its own to describe (no doc or option changes) usually shows
    # another component that did change: the Example page shows the Nav, NavBanner shows the Nav. Say which.
    told = {i['name'] for i in items if i['type'] == 'component' and (i.get('notes') or i.get('propsAdded') or i.get('propsRemoved') or i['action'] != 'changed')}
    for it in items:
        if it['type'] != 'component' or it['action'] != 'changed' or it['name'] in told or 'look' not in it.get('what', []):
            continue
        n = it['name']
        uses = set(re.findall(r'\bQ\.(\w+)', cb[n]['preview'])) | set(re.findall(r'\bh\((\w+)', jb.get(n, '')))
        follows = [m for m in sorted(told) if m in uses and m != n]
        if follows:
            it['follows'] = follows

    ta, tb = tokens(a), tokens(b)
    for n in sorted(set(ta) | set(tb)):
        x, y = ta.get(n), tb.get(n)
        if x and y and (x['family'], x['value']) == (y['family'], y['value']):
            continue
        it = {'type': 'token', 'name': n, 'family': (y or x)['family']}
        if (y or x).get('usage'):
            it['usage'] = (y or x)['usage']
        if x is None:
            it.update(action='added', to=y['value'])
        elif y is None:
            it.update(action='removed', **{'from': x['value']})
        else:
            it.update(action='changed', to=y['value'], **{'from': x['value']})
        if it['family'] == 'color':
            if x:
                it['fromColor'] = resolve(ta, x['value'])
            if y:
                it['toColor'] = resolve(tb, y['value'])
        items.append(it)

    ga, gb = guides(a), guides(b)
    # a guide whose title changed (Colour to Color) is the same guide: compare it under its new title
    old_by_gid = {g['gid']: t for t, g in ga.items()}
    for t in [t for t in gb if t not in ga]:
        o = old_by_gid.get(gb[t]['gid'])
        if o and o not in gb:
            ga[t] = ga.pop(o)
            items.append({'type': 'guide', 'action': 'changed', 'name': t, 'guide': t, 'gid': gb[t]['gid'],
                          'renamedFrom': o, 'wording': True})
    for t in sorted(set(ga) | set(gb)):
        if t not in ga:
            it = {'type': 'guide', 'action': 'added', 'name': t, 'guide': t, 'gid': gb[t]['gid']}
            first = [x for sec in gb[t]['sections'].values() for x in md_blocks(sec)][:1]
            keep_notes(it, [{'kind': 'added', 'text': x} for x in first])
            items.append(it)
            continue
        if t not in gb:
            items.append({'type': 'guide', 'action': 'removed', 'name': t, 'guide': t})
            continue
        xa, xb = dict(ga[t]['sections']), gb[t]['sections']
        for s in [s for s in xb if s not in xa]:   # a heading only respelled ("Colour versions") is the same section
            o = next((o for o in xa if o not in xb and us(o) == us(s)), None)
            if o is not None:
                xa[s] = xa.pop(o)
        for s in list(xb) + [s for s in xa if s not in xb]:
            if xa.get(s) == xb.get(s):
                continue
            it = {'type': 'guide', 'name': s or t, 'guide': t, 'gid': gb[t]['gid']}
            if s:
                it['section'] = s
            if s not in xa:
                it['action'] = 'added'
                keep_notes(it, [{'kind': 'added', 'text': x} for x in md_blocks(xb[s])[:2]], 2)
            elif s not in xb:
                it['action'] = 'removed'
            else:
                it['action'] = 'changed'
                if us(xa[s]) == us(xb[s]) or is_wording(xa[s], xb[s]):
                    it['wording'] = True
                elif similar(no_images(xa[s]), no_images(xb[s])) < 0.6 or re.findall(r'img:\w+', no_images(xa[s])) != re.findall(r'img:\w+', no_images(xb[s])):
                    it['big'] = True
                keep_notes(it, doc_notes(xa[s], xb[s]), 4)
            items.append(it)

    aa, ab = assets(a), assets(b)
    for f in sorted(set(aa) | set(ab)):
        if aa.get(f) == ab.get(f):
            continue
        folder, _, name = f.rpartition('/')
        items.append({'type': 'asset', 'action': 'added' if f not in aa else 'removed' if f not in ab else 'changed',
                      'name': name, 'group': folder.split('/')[0] if folder else 'Assets'})

    if site(a) != site(b):
        items.append({'type': 'site', 'action': 'changed', 'name': 'Reference site'})
    return classify(items)


# ---------- what matters ----------
def classify(items):
    """Mark the small stuff (spelling and wording, the site's own layout, README-only edits, light guide edits)
    as minor, so the Change Log can lead with what changes how Flex looks or what it holds."""
    for it in items:
        minor = (it.get('wording') or it['type'] == 'site' or
                 (it['type'] == 'component' and it['action'] == 'changed' and not set(it.get('what', [])) & {'look', 'props'}) or
                 (it['type'] == 'guide' and it['action'] == 'changed' and not it.get('big')))
        if minor:
            it['minor'] = True
        else:
            it.pop('minor', None)
    return items


def major(items):
    return [i for i in items if not i.get('minor')]


def names(lst, noun, plural=None):
    lst = sorted(set(lst), key=lst.index)
    if len(lst) == 1:
        return lst[0]
    if len(lst) == 2:
        return '%s and %s' % (lst[0], lst[1])
    return '%d %s' % (len(lst), plural or noun + 's')


def headline(items):
    """One plain line for the entry, from its biggest changes."""
    big, parts = major(items), []
    if len(items) > 40 and all(i['action'] == 'added' for i in items if i['type'] != 'site'):   # the first publish
        c = counts(items)
        return 'Flex published: %d components, %d tokens, %d guides' % (
            len({i['name'] for i in items if i['type'] == 'component'}), c.get('token', 0),
            len({i['guide'] for i in items if i['type'] == 'guide'}))
    comp = lambda act: [i['name'] for i in big if i['type'] == 'component' and i['action'] == act]
    if comp('added'):
        parts.append('Added ' + names(comp('added'), 'component'))
    if comp('removed'):
        parts.append('Removed ' + names(comp('removed'), 'component'))
    gnew = [i['guide'] for i in big if i['type'] == 'guide' and i['action'] == 'added' and 'section' not in i]
    if gnew:
        parts.append(('New guide: ' + gnew[0]) if len(set(gnew)) == 1 else ('New guides: ' + names(gnew, 'guide')) if len(set(gnew)) == 2 else '%d new guides' % len(set(gnew)))
    toks = [i for i in big if i['type'] == 'token']
    if toks:
        fams = {i['family'] for i in toks}
        what = 'colors' if fams == {'color'} else 'type styles' if fams == {'type'} else 'tokens'
        acts = {i['action'] for i in toks}
        verb = {'added': 'New', 'removed': 'Removed'}.get(acts.pop(), 'Changed') if len(acts) == 1 else 'Updated'
        if len(toks) <= 2:
            parts.append('%s %s: %s' % (verb, what if len(toks) > 1 else what[:-1], ' and '.join(i['name'] for i in toks)))
        else:
            parts.append('%s %s (%d)' % (verb, what, len(toks)))
    groups = []
    for i in big:
        if i['type'] == 'asset' and i['group'] not in groups:
            groups.append(i['group'])
    if groups:
        parts.append('Updated ' + (groups[0].lower() if len(groups) == 1 else names([g.lower() for g in groups], 'asset group')))
    if comp('changed'):
        parts.append('Updated ' + names(comp('changed'), 'component'))
    gold = [i['guide'] for i in big if i['type'] == 'guide' and i['action'] == 'removed' and 'section' not in i]
    if gold:
        parts.append(('Removed guide: ' if len(set(gold)) == 1 else 'Removed guides: ') + names(gold, 'guide'))
    gchg = [i['guide'] for i in big if i['type'] == 'guide' and 'section' in i]
    gchg = [g for g in gchg if g not in gnew]
    if gchg:
        n = len(set(gchg))
        parts.append('Updated ' + names(gchg, 'guide') + (' guide' if n == 1 else ' guides' if n == 2 else ''))
    if not parts:
        return 'Small fixes and wording'
    return ' · '.join(parts[:3])   # the rest is in the entry's details


def listing(lst, limit=3):
    """'A', 'A and B', 'A, B and C', or '7, including A, B and C'."""
    lst = list(dict.fromkeys(lst))
    if len(lst) <= limit:
        return lst[0] if len(lst) == 1 else ', '.join(lst[:-1]) + ' and ' + lst[-1]
    return '%d, including %s' % (len(lst), ', '.join(lst[:limit - 1]) + ' and ' + lst[limit - 1])


def highlights(items):
    """The important updates in a few plain lines. Small edits are left out."""
    big, out = major(items), []
    def comps(act):
        sel = [i for i in big if i['type'] == 'component' and i['action'] == act]
        sel.sort(key=lambda i: -i.get('weight', 0))   # the biggest changes are named first
        return [i['name'] for i in sel]
    if comps('added'):
        out.append(('New component: ' if len(comps('added')) == 1 else 'New components: ') + listing(comps('added'), 5))
    if comps('removed'):
        out.append('Removed: ' + listing(comps('removed'), 5))
    toks = [i for i in big if i['type'] == 'token']
    for fam, one, many in (('color', 'Color', 'Colors'), ('type', 'Type style', 'Type styles'), ('spacing', 'Spacing token', 'Spacing tokens'),
                           ('radius', 'Corner radius', 'Corner radii'), ('shadow', 'Shadow', 'Shadows'), ('layout', 'Layout token', 'Layout tokens'),
                           ('zIndex', 'Layer', 'Layers')):
        for act in ('added', 'changed', 'removed'):
            sel = [i for i in toks if i['family'] == fam and i['action'] == act]
            if sel:
                out.append('%s %s: %s' % (one if len(sel) == 1 else many, act, listing([token_label(i) for i in sel], 4)))
    groups = {}
    for i in big:
        if i['type'] == 'asset':
            groups.setdefault(i['group'], {'added': 0, 'changed': 0, 'removed': 0})[i['action']] += 1
    for g, n in groups.items():
        out.append('%s: %s' % (g, ', '.join('%d %s' % (n[a], w) for a, w in (('added', 'added'), ('changed', 'updated'), ('removed', 'removed')) if n[a])))
    if comps('changed'):
        c = comps('changed')
        out.append(('Updated ' if len(c) <= 3 else 'Updated components: ') + listing(c))
    gnew = [i['guide'] for i in big if i['type'] == 'guide' and i['action'] == 'added' and 'section' not in i]
    gold = [i['guide'] for i in big if i['type'] == 'guide' and i['action'] == 'removed' and 'section' not in i]
    gchg = [i['guide'] for i in big if i['type'] == 'guide' and 'section' in i and i['guide'] not in gnew]
    gchg = sorted(set(gchg), key=lambda g: (-gchg.count(g), gchg.index(g)))   # the most-changed guides first
    if gnew:
        out.append(('New guide: ' if len(set(gnew)) == 1 else 'New guides: ') + listing(gnew, 4))
    if gold:
        out.append(('Removed guide: ' if len(set(gold)) == 1 else 'Removed guides: ') + listing(gold, 4))
    if gchg:
        out.append(('Updated guide: ' if len(set(gchg)) == 1 else 'Updated guides: ') + listing(gchg))
    return out


def token_label(t):
    """linen (#f1f0e9); a token that points at another shows both: avatar-container-bg (linen, #f1f0e9)."""
    val = t.get('to', t.get('from'))
    col = t.get('toColor', t.get('fromColor'))
    ref = re.match(r'^\{(.+)\}$', str(val or ''))
    if t['action'] == 'changed':
        return '%s (%s to %s)' % (t['name'], t.get('fromColor') or t.get('from'), t.get('toColor') or t.get('to'))
    if ref:
        return '%s (%s, %s)' % (t['name'], ref.group(1), col) if col else '%s (%s)' % (t['name'], ref.group(1))
    return '%s (%s)' % (t['name'], val) if val not in (None, '') else t['name']


def why_lines(text):
    """Reasons written for the change log: lines starting "Why:" in commit messages or the pull request description."""
    out = []
    for m in re.finditer(r'(?im)^\s*why:\s*(.+?)\s*$', text or ''):
        if m.group(1) not in out:
            out.append(m.group(1))
    return out


def attach_why(e, text):
    """"Why: DrawerCard: ..." is shown with DrawerCard; a reason without a name is shown for the whole entry."""
    known = {i['name'] for i in e['items']} | {i['guide'] for i in e['items'] if i.get('guide')}
    out = []
    for t in why_lines(text):
        m = re.match(r'^([^:]{2,60}):\s+(.+)$', t)
        if m and m.group(1).strip() in known:
            out.append({'about': m.group(1).strip(), 'text': m.group(2).strip()})
        else:
            out.append({'text': t})
    if out:
        e['why'] = out
    else:
        e.pop('why', None)


def late_reasons(d, commits):
    """A reason can be added after a change is published: a "Why: Name: ..." line in a later commit message is shown
    with the newest entry, up to that commit, that changed Name. Reasons already shown aren't added twice."""
    entries = d['entries']
    added = 0
    for c in commits:
        for t in why_lines(git('show', '-s', '--format=%B', c, check=False)):
            m = re.match(r'^([^:]{2,60}):\s+(.+)$', t)
            if not m:
                continue
            about, text = m.group(1).strip(), m.group(2).strip()
            for e in reversed(entries):
                if e.get('draft') or about not in ({i['name'] for i in e['items']} | {i.get('guide') for i in e['items']}):
                    continue
                if subprocess.run(['git', '-C', ROOT, 'merge-base', '--is-ancestor', e['sha'], c], capture_output=True).returncode:
                    continue   # that entry came later than the reason
                why = e.setdefault('why', [])
                if not any(w.get('text') == text for w in why):
                    why.append({'about': about, 'text': text})
                    added += 1
                break
    return added


def design_change(items):
    """Changes to the site's own pages or tools alone don't make an entry: the Change Log is about Flex."""
    return any(i['type'] != 'site' for i in items)


def describe_entry(e):
    e['headline'] = headline(e['items'])
    e['highlights'] = highlights(e['items'])
    e['minor'] = not major(e['items'])
    e.pop('summary', None)   # commit messages and pull request titles describe sessions, not Flex: left out
    return e


def counts(items):
    c = {}
    for it in items:
        c[it['type']] = c.get(it['type'], 0) + 1
    return c


# ---------- text and Markdown ----------
WHAT = {'look': 'look', 'props': 'props', 'docs': 'docs'}


def describe(it):
    if it['type'] == 'component':
        s = it['name']
        if it.get('what'):
            s += ' (%s)' % ', '.join(it['what'])
    elif it['type'] == 'token':
        s = it['name']
        if it['action'] == 'changed':
            s += ': %s → %s' % (it['from'], it['to'])
        elif it['action'] == 'added':
            s += ': %s' % it['to']
    elif it['type'] == 'guide':
        s = it['guide'] if it['name'] == it['guide'] else '%s › %s' % (it['guide'], it['name'])
    elif it['type'] == 'asset':
        s = '%s / %s' % (it['group'], it['name'])
    else:
        s = it['name']
    return s


def as_full_text(items, md=False):
    if not items:
        return 'No changes to components, tokens, guides or the site.'
    lines = []
    for act, label in (('added', 'Added'), ('changed', 'Changed'), ('removed', 'Removed')):
        sel = [i for i in items if i['action'] == act and not i.get('wording')]
        if sel:
            lines.append(('**%s**' if md else '%s') % label)
            for typ, tl in (('component', 'Component'), ('token', 'Token'), ('asset', 'Asset'), ('guide', 'Guide'), ('site', 'Site')):
                for i in (x for x in sel if x['type'] == typ):
                    lines.append('- %s: %s' % (tl, ('`%s`' % describe(i)) if md and typ == 'token' else describe(i)))
                    if i.get('usage'):
                        lines.append('  - Where: ' + i['usage'])
                    for nt in i.get('notes', [])[:4]:
                        lines.append('  - %s: %s' % ({'added': 'New', 'changed': 'Now', 'removed': 'Removed'}[nt['kind']], nt['text']))
    w = [describe(i) for i in items if i.get('wording')]
    if w:
        lines.append(('**%s**' if md else '%s') % 'Wording updates')
        lines.append('- ' + ', '.join(w))
    return '\n'.join(lines)


def as_text(items, md=False):
    """What the Change Log entry will say: its headline and the important updates."""
    if not items:
        return 'No changes to components, tokens, guides or the site.'
    hl = highlights(items)
    lines = [('**%s**' if md else '%s') % headline(items)]
    lines += ['- ' + h for h in hl] or ['- Small edits only (wording, spelling or the site\'s layout)']
    return '\n'.join(lines)


def preview_url(branch):
    alias = re.sub(r'[^a-z0-9]+', '-', branch.lower()).strip('-')[:28].strip('-')
    return 'https://%s.flex-design-system.pages.dev' % alias


# ---------- GitHub ----------
def gh(path, method='GET', body=None):
    token, repo = os.environ.get('GITHUB_TOKEN'), os.environ.get('GITHUB_REPOSITORY')
    if not token or not repo:
        return None
    url = 'https://api.github.com/repos/%s/%s' % (repo, path.lstrip('/')) if not path.startswith('/users') else 'https://api.github.com' + path
    req = urllib.request.Request(url, method=method, data=json.dumps(body).encode() if body is not None else None,
                                 headers={'Authorization': 'Bearer ' + token, 'Accept': 'application/vnd.github+json',
                                          'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'flex-changelog'})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.loads(r.read() or b'null')
    except Exception as e:  # the change log never blocks publishing
        print('GitHub API %s %s: %s' % (method, path, e), file=sys.stderr)
        return None


_names = {}


def person(login):
    if login not in _names:
        u = gh('/users/' + login) or {}
        _names[login] = u.get('name') or login
    return _names[login]


def pull_request(sha):
    prs = gh('commits/%s/pulls' % sha) or []
    prs = [p for p in prs if p.get('merged_at')]
    if not prs:
        return None
    p = prs[0]
    approved = {}
    for r in gh('pulls/%d/reviews?per_page=100' % p['number']) or []:
        if r.get('user'):
            approved[r['user']['login']] = r.get('state')
    return {'number': p['number'], 'url': p['html_url'], 'title': p['title'], 'body': p.get('body') or '', 'merged_at': p['merged_at'],
            'author': person(p['user']['login']),
            'approvedBy': [person(u) for u, s in approved.items() if s == 'APPROVED']}


# ---------- entries ----------
def coauthors(text):
    out = []
    for m in re.finditer(r'(?im)^co-authored-by:\s*([^<\n]+?)\s*<', text):
        n = m.group(1).strip()
        n = 'Claude' if n.lower().startswith('claude') else n
        if n not in out:
            out.append(n)
    return out


def subject(text):
    return (text.strip().split('\n') or [''])[0].strip()


def entry(sha, parent, date=None, pr=None, items=None):
    info = git('show', '-s', '--format=%an%x00%aI%x00%B', sha).split('\x00')
    author, when, body = info[0], info[1], info[2] if len(info) > 2 else ''
    merged = git('rev-list', '--no-merges', '%s..%s' % (parent, sha)) if parent else ''
    trailers = body + ''.join(git('show', '-s', '--format=%B', c) for c in merged.split()[:50])
    with_ = [n for n in coauthors(trailers) if n != author]
    e = {'id': sha[:7], 'sha': sha, 'date': (date or when)[:10], 'author': author, 'with': with_,
         'approvedBy': [], 'pr': None, 'items': items, 'shots': [], 'v': FORMAT}
    if pr:
        e.update(author=pr['author'], approvedBy=pr['approvedBy'], date=pr['merged_at'][:10],
                 pr={'number': pr['number'], 'url': pr['url']})
        e['with'] = [n for n in with_ if n != e['author']]
    attach_why(e, trailers + '\n' + ((pr or {}).get('body') or ''))
    return describe_entry(e)


def load():
    try:
        with open(DATA) as f:
            return json.load(f)
    except (OSError, ValueError):
        return {'version': 1, 'entries': []}


def save(d):
    d['entries'].sort(key=lambda e: (e['date'], e.get('order', 0)))
    os.makedirs(os.path.dirname(DATA), exist_ok=True)
    with open(DATA, 'w') as f:
        json.dump(d, f, ensure_ascii=False, indent=1)
        f.write('\n')


def published_commits(before, after):
    """Commits that landed on main, oldest first, following main's own line (a merged pull request is one step)."""
    rng = after if not before or set(before) == {'0'} else '%s..%s' % (before, after)
    return git('rev-list', '--first-parent', '--reverse', rng).split()


def skip(sha):
    an = git('show', '-s', '--format=%an', sha).strip()
    return an == BOT


# ---------- screenshots ----------
# A preview is split into its parts at each caption (".cap", "h2.h", ".rule"), and each part is pictured before and
# after on its own. Only the parts that look different are kept, so the pictures show what changed, wherever it is.
SECTIONS_JS = r"""() => {
  const H = document.documentElement.scrollHeight, marks = [];
  for (const el of document.querySelectorAll('.cap, h2.h, p.rule')) {
    const text = el.textContent.replace(/\s+/g, ' ').trim();
    if (!text || !el.getClientRects().length) continue;
    const top = Math.max(0, Math.floor(el.getBoundingClientRect().top + window.scrollY) - 8), last = marks[marks.length - 1];
    if (last && top - last.top < 48) { last.label += ' / ' + text.slice(0, 60); continue; }
    marks.push({ top: top, label: text.slice(0, 90) });
  }
  if (!marks.length || marks[0].top > 48) marks.unshift({ top: 0, label: '' });
  return marks.map((m, i) => ({ label: m.label, top: m.top, bottom: i + 1 < marks.length ? marks[i + 1].top : H }))
    .filter(m => m.bottom - m.top > 24);
}"""
PART_MAX = 2400   # tallest part pictured, in page pixels


def _diff_band(a, b):
    """Where two pictures of a part differ, or None when they look the same. Compared at half size, each pixel allowed
    to match anything within a pixel of it in the other picture, so anti-aliasing, rounding and a pixel or two of
    drift don't count. Two tests: strong differences (something new, gone, recolored or reshaped, down to a 16px
    icon), and a faint difference over a broad area, blurred so text doesn't count (a panel going from Ecru to Linen).
    Moves of 3 pixels or less don't show; the notes say what changed.
    Returns the box around the difference (left, top, right, bottom), in page pixels."""
    from PIL import ImageChops, ImageFilter
    h = min(a.height, b.height)
    taller = max(a.height, b.height) - h > 12   # one is taller: compare what they share, and the rest differs
    if taller:
        found = _diff_band(a.crop((0, 0, a.width, h)), b.crop((0, 0, b.width, h))) if h >= 32 else None
        return (found[0], found[1], found[2], max(a.height, b.height)) if found else (0, h, max(a.width, b.width), max(a.height, b.height))
    w2, h2 = a.width // 2, h // 2
    if h2 < 16:
        return None
    A, B = a.crop((0, 0, a.width, h)).resize((w2, h2)), b.crop((0, 0, b.width, h)).resize((w2, h2))

    def unmatched(x, y):
        best = None
        for dx in range(-1, 2):
            for dy in range(-1, 2):
                d = ImageChops.difference(x, ImageChops.offset(y, dx, dy))
                best = d if best is None else ImageChops.darker(best, d)
        r, g, bl = best.split()
        return ImageChops.lighter(ImageChops.lighter(r, g), bl)

    def both(x, y):
        return ImageChops.lighter(unmatched(x, y), unmatched(y, x)).crop((3, 3, w2 - 3, h2 - 3))
    strong = both(A.filter(ImageFilter.GaussianBlur(0.8)), B.filter(ImageFilter.GaussianBlur(0.8))).point(lambda v: 255 if v > 64 else 0)
    if sum(strong.histogram()[255:]) >= 15:
        box = strong.getbbox()
    else:
        broad = both(A.filter(ImageFilter.GaussianBlur(4)), B.filter(ImageFilter.GaussianBlur(4)))
        broad = broad.point(lambda v: 255 if v > 4 else 0).filter(ImageFilter.MinFilter(15))
        if sum(broad.histogram()[255:]) < 500:
            return None
        box = broad.getbbox()
    return ((box[0] + 3) * 2, (box[1] + 3) * 2, (box[2] + 3) * 2, (box[3] + 3) * 2) if box else (0, 0, a.width, h)


def _pair_parts(pa, pb):
    """Matches the parts of the old and new preview by their captions; a renamed caption still matches if it's close."""
    key = lambda x: re.sub(r'[^a-z0-9]+', ' ', us(x['label'])).strip()
    lead = lambda x: key({'label': x['label'].split(':')[0]}) if ':' in x['label'] else None   # "2 profiles: …"
    used, out = set(), []
    for x in pb:
        i = next((i for i, y in enumerate(pa) if i not in used and key(y) == key(x)), None)
        if i is None and lead(x):
            i = next((i for i, y in enumerate(pa) if i not in used and lead(y) == lead(x)), None)
        if i is None:
            cands = [(similar(key(y), key(x)), i) for i, y in enumerate(pa) if i not in used]
            if cands and max(cands)[0] >= 0.6:
                i = max(cands)[1]
        if i is not None:
            used.add(i)
        out.append((pa[i] if i is not None else None, x))
    gone = [y for i, y in enumerate(pa) if i not in used]
    return out, gone


def screenshots(sha, parent, names, out_dir):
    """Before and after pictures of the parts of each component's preview that changed.
    Returns (pictures, names of components whose preview looks the same)."""
    try:
        from playwright.sync_api import sync_playwright
        from PIL import Image
    except ImportError:
        print('Playwright or Pillow missing: no screenshots', file=sys.stderr)
        return [], set()
    import io
    tmp = tempfile.mkdtemp(prefix='flexshot-')
    shots, same = [], set()
    try:
        trees = {}
        for key, ref in (('before', parent), ('after', sha)):
            if not ref:
                continue
            if ref == '.':   # the files on disk, for a draft
                d = ROOT
            else:
                d = os.path.join(tmp, key)
                git('worktree', 'add', '--detach', '--force', d, ref)
            trees[key] = d
            subprocess.run([sys.executable, os.path.join(ROOT, 'ds', 'test', 'build.py'), os.path.join(d, 'ds')],
                           capture_output=True)
        os.makedirs(out_dir, exist_ok=True)
        with sync_playwright() as pw:
            br = pw.chromium.launch()
            page = br.new_page(viewport={'width': 1440, 'height': 900}, reduced_motion='reduce')   # no count-ups or autoplay mid-way

            def parts(key, n):
                html = os.path.join(trees[key], 'ds', 'test', n + '.html')
                if not os.path.exists(html):
                    return None
                try:
                    page.goto('file://' + html)
                    page.wait_for_load_state('networkidle', timeout=20000)
                    page.evaluate('document.fonts && document.fonts.ready')
                    try:   # every picture loaded and decoded, or a half-drawn icon reads as a change
                        page.wait_for_function('Array.from(document.images).every(i => i.complete)', timeout=10000)
                        page.evaluate('Promise.all(Array.from(document.images).map(i => i.decode ? i.decode().catch(() => 0) : 0))')
                    except Exception:
                        pass
                    page.wait_for_timeout(600)
                    out = []
                    for x in page.evaluate(SECTIONS_JS):
                        hgt = min(PART_MAX, x['bottom'] - x['top'])
                        png = page.screenshot(full_page=True, clip={'x': 0, 'y': x['top'], 'width': 1440, 'height': hgt})
                        x['img'] = Image.open(io.BytesIO(png)).convert('RGB')
                        out.append(x)
                    return out
                except Exception as e:
                    print('screenshot %s %s: %s' % (n, key, e), file=sys.stderr)
                    return None

            def right_edge(im):
                """Where the content ends on the right: a phone-sized part doesn't need the empty page beside it."""
                from PIL import ImageChops
                bg = Image.new('RGB', im.size, im.getpixel((im.width - 1, 0)))
                box = ImageChops.difference(im, bg).convert('L').point(lambda v: 255 if v > 6 else 0).getbbox()
                return box[2] if box else im.width

            def bottom_edge(im):
                """Where the content ends at the bottom, so a short preview part isn't followed by empty page."""
                from PIL import ImageChops
                bg = Image.new('RGB', im.size, im.getpixel((im.width - 1, im.height - 1)))
                box = ImageChops.difference(im, bg).convert('L').point(lambda v: 255 if v > 6 else 0).getbbox()
                return box[3] if box else im.height

            def save(im, n, k, key, band=None, width=1440, height=None):
                """Full size, so a small change stays visible. The area that changed is outlined, unless it's most of the picture."""
                from PIL import ImageDraw
                im = im.copy()
                if band:
                    x0, y0, x1, y1 = band
                    if (x1 - x0) * (y1 - y0) < 0.6 * im.width * min(im.height, y1) and y0 < im.height:
                        d = ImageDraw.Draw(im)
                        pad = 16
                        d.rounded_rectangle((max(2, x0 - pad), max(2, y0 - pad), min(im.width - 3, x1 + pad), min(im.height - 3, y1 + pad)),
                                            radius=8, outline=(214, 36, 159), width=4)
                top = 0
                if band and im.height > 1400:   # a tall part: frame the change, with some context
                    top = max(0, band[1] - 240)
                    im = im.crop((0, top, im.width, min(im.height, max(band[3] + 240, top + 700), top + 1400)))
                im = im.crop((0, 0, min(im.width, width), min(im.height, height - top) if height else im.height))
                name = '%s-%d-%s.webp' % (n, k, key)
                im.save(os.path.join(out_dir, name), 'WEBP', quality=80, method=6)
                return 'changes/%s/%s' % (os.path.basename(out_dir), name)

            for n in names:
                pb = parts('after', n) if 'after' in trees else None
                pa = parts('before', n) if 'before' in trees else None
                if pb is None:
                    continue
                if pa is None:   # a new component: its first parts
                    for k, x in enumerate(pb[:2]):
                        shots.append({'name': n, 'label': x['label'], 'after': save(x['img'], n, k, 'after'), 'new': True})
                    continue
                pairs, gone = _pair_parts(pa, pb)
                found = []
                for old, cur in pairs:
                    if old is None:
                        found.append((old, cur, None))
                        continue
                    band = _diff_band(old['img'], cur['img'])
                    if band:
                        found.append((old, cur, band))
                if not found and not gone:
                    same.add(n)
                    continue
                if len({x['name'] for x in shots}) >= MAX_SHOTS:
                    continue   # it does look different; there are pictures enough for one entry
                for k, (old, cur, band) in enumerate(found[:MAX_SECTIONS]):
                    pair = {'name': n, 'label': cur['label']}
                    w = max([right_edge(cur['img'])] + ([right_edge(old['img'])] if old else []))
                    w = min(1440, max(720, w + 32))
                    hb = max([bottom_edge(cur['img'])] + ([bottom_edge(old['img'])] if old else [])) + 32
                    if old is None and hb < 160:
                        continue   # a new part that's only a heading or caption: nothing to see
                    if old is None:
                        pair['new'] = True
                    else:
                        pair['before'] = save(old['img'], n, k, 'before', band, w, hb)
                    pair['after'] = save(cur['img'], n, k, 'after', band, w, hb)
                    shots.append(pair)
                extra = len(found) - MAX_SECTIONS
                if extra > 0 and shots:
                    shots[-1]['moreParts'] = extra
                for k, old in enumerate(gone[:1]):
                    shots.append({'name': n, 'label': old['label'], 'before': save(old['img'], n, 90 + k, 'before'), 'removed': True})
            br.close()
    finally:
        for d in (os.path.join(tmp, 'before'), os.path.join(tmp, 'after')):
            if os.path.exists(d):
                git('worktree', 'remove', '--force', d, check=False)
        shutil.rmtree(tmp, ignore_errors=True)
    return shots, same


def same_look(items, result):
    """Code shared between components can flag one that didn't change. If its preview looks the same before and
    after, drop the 'look' note."""
    shots, same = result
    for i in items:
        # a component whose docs describe a change keeps it: the change may only show at other widths
        if i['type'] == 'component' and i['name'] in same and 'what' in i and not i.get('notes'):
            i['what'] = [w for w in i['what'] if w != 'look']
            i.pop('follows', None)
            if not i['what']:
                del i['what']
    return shots


def visual(items):
    """Components to check and picture: new ones first, then the biggest changes. All of them are checked (up to 30),
    so one that only shares code with a changed one, and looks the same, drops out; MAX_SHOTS of them are pictured."""
    sel = [i for i in items if i['type'] == 'component' and (i['action'] == 'added' or 'look' in i.get('what', []))]
    sel.sort(key=lambda i: (i['action'] != 'added', not (i.get('notes') or i.get('propsAdded')), 'follows' in i, -i.get('weight', 0)))
    return [i['name'] for i in sel][:30]


# ---------- commands ----------
def cmd_diff(base='origin/main', head='.'):
    if base and not git('rev-parse', '--verify', '--quiet', base, check=False).strip():
        base = 'HEAD'
    print(as_text(compare(Version(base), Version(head))))


def cmd_comment(base, head, branch):
    items = compare(Version(base), Version(head))
    body = '<!-- flex-changelog -->\n### What this change does to Flex\n\n%s\n\n**Preview:** %s (ready a minute or two after each push)\n\n' \
           '_Written automatically. When this is merged, it becomes an entry in the Change Log, with before and after screenshots._' \
           % (as_text(items, md=True) + ('\n\n<details><summary>Every change, including small edits</summary>\n\n%s\n\n</details>' % as_full_text(items, md=True) if items else ''),
              preview_url(branch))
    print(body)
    num = os.environ.get('PR_NUMBER')
    if not num:
        return
    mine = [c for c in (gh('issues/%s/comments?per_page=100' % num) or []) if '<!-- flex-changelog -->' in (c.get('body') or '')]
    if mine:
        gh('issues/comments/%d' % mine[-1]['id'], 'PATCH', {'body': body})
    else:
        gh('issues/%s/comments' % num, 'POST', {'body': body})


def cmd_record(before, after):
    d = load()
    have = {e['sha'] for e in d['entries']} | {x for e in d['entries'] for x in e.get('shas', [])}
    today = datetime.datetime.now(datetime.timezone.utc).strftime('%Y-%m-%d')
    added = 0
    # A merged pull request is one entry. Commits pushed straight to main in one go are one entry too,
    # the same entry the draft showed before they were published.
    groups, cur = [], []
    for sha in published_commits(before, after):
        if sha in have or skip(sha):
            if cur:
                groups.append((cur, None))
            cur = []
            continue
        pr = pull_request(sha)
        if pr:
            if cur:
                groups.append((cur, None))
            cur = []
            groups.append(([sha], pr))
        else:
            cur.append(sha)
    if cur:
        groups.append((cur, None))
    for k, (shas, pr) in enumerate(groups):
        first, last = shas[0], shas[-1]
        parent = (git('rev-parse', '--verify', '--quiet', first + '^1', check=False).strip() or None)
        items = compare(Version(parent), Version(last))
        if not design_change(items):
            continue
        e = entry(last, parent, today, pr, items)
        if not pr and len(shas) > 1:
            e['shas'] = shas
        e['order'] = int(datetime.datetime.now().timestamp()) * 100 + k
        names = visual(items)
        if names:
            e['shots'] = same_look(items, screenshots(last, parent, names, os.path.join(SHOTS, last[:7])))
            e['items'] = classify([i for i in items if i['type'] != 'component' or i['action'] != 'changed' or i.get('what') or i.get('wording')])
            if not e['items']:
                shutil.rmtree(os.path.join(SHOTS, last[:7]), ignore_errors=True)
                continue
            describe_entry(e)
        d['entries'].append(e)
        added += 1
        print('recorded %s: %s (%d items)' % (last[:7], e['headline'], len(items)))
    late_reasons(d, [c for c in published_commits(before, after) if not skip(c)])
    save(d)
    # what's published is no longer a draft
    if os.path.exists(DRAFT):
        os.remove(DRAFT)
    shutil.rmtree(os.path.join(SHOTS, 'draft'), ignore_errors=True)
    print('%d new entries' % added)


def published_base():
    """The published version this work starts from: where it meets origin/main, or the newest recorded change."""
    for ref in ('origin/main', 'main'):
        if git('rev-parse', '--verify', '--quiet', ref, check=False).strip():
            mb = git('merge-base', 'HEAD', ref, check=False).strip()
            if mb:
                return mb
    for e in reversed(load()['entries']):
        if subprocess.run(['git', '-C', ROOT, 'cat-file', '-e', e['sha'] + '^{commit}'], capture_output=True).returncode == 0:
            return e['sha']
    return None


def cmd_draft(shots=False):
    base = published_base()
    items = compare(Version(base), Version('.'))
    shot_dir = os.path.join(SHOTS, 'draft')
    shutil.rmtree(shot_dir, ignore_errors=True)
    if not design_change(items):
        if os.path.exists(DRAFT):
            os.remove(DRAFT)
        print('Nothing unpublished: no draft entry')
        return
    unpub = git('rev-list', '--reverse', '%s..HEAD' % base).split() if base else []
    body = ''.join(git('show', '-s', '--format=%B', c) for c in unpub)
    me = git('config', 'user.name', check=False).strip() or (git('show', '-s', '--format=%an', 'HEAD').strip() if unpub else 'You')
    e = {'id': 'draft', 'sha': '', 'draft': True, 'date': datetime.date.today().isoformat(), 'author': me,
         'with': [n for n in coauthors(body) if n != me], 'approvedBy': [],
         'commits': len(unpub),
         'base': base or '', 'pr': None, 'items': items, 'shots': [], 'v': FORMAT}
    attach_why(e, body)
    describe_entry(e)
    if shots:
        names = visual(items)
        if names:
            e['shots'] = same_look(items, screenshots('.', base, names, shot_dir))
            e['items'] = classify([i for i in items if i['type'] != 'component' or i['action'] != 'changed' or i.get('what') or i.get('wording')])
            describe_entry(e)
    with open(DRAFT, 'w') as f:
        json.dump(e, f, ensure_ascii=False, indent=1)
        f.write('\n')
    print('Draft Change Log entry (not published yet):')
    print(as_text(e['items']))


def cmd_upgrade():
    """Redoes entries written in an older format: what changed and why, and pictures of the parts that changed.
    Who made a change, who approved it and when stay as they were. Run by the GitHub Action, which has Playwright."""
    d = load()
    try:
        import playwright, PIL   # noqa: F401
        can_shoot = True
    except ImportError:
        can_shoot = False
    done = 0
    for e in d['entries']:
        if e.get('v', 1) >= FORMAT:
            continue
        shas = e.get('shas') or [e['sha']]
        first, last = shas[0], shas[-1]
        if subprocess.run(['git', '-C', ROOT, 'cat-file', '-e', last + '^{commit}'], capture_output=True).returncode:
            e['v'] = FORMAT   # history that isn't here any more: keep the entry as it is
            continue
        parent = git('rev-parse', '--verify', '--quiet', first + '^1', check=False).strip() or None
        items = compare(Version(parent), Version(last))
        whole = (e.get('headline') or '').startswith('Flex published')
        if whole:   # the first publish lists everything; its details would be the whole of Flex
            for i in items:
                for k in ('notes', 'moreNotes', 'propsAdded', 'propsRemoved', 'usage'):
                    i.pop(k, None)
        e['items'] = items
        text = git('log', '--format=%B', (parent + '..' + last) if parent else last, check=False)
        attach_why(e, text)
        names = [] if whole else visual(items)
        if names and not can_shoot:
            describe_entry(e)
            continue   # pictures need Playwright: try again where it's installed
        old = os.path.join(SHOTS, e['id'])
        shutil.rmtree(old, ignore_errors=True)
        e['shots'] = []
        if names:
            e['shots'] = same_look(items, screenshots(last, parent, names, os.path.join(SHOTS, last[:7])))
            e['items'] = classify([i for i in items if i['type'] != 'component' or i['action'] != 'changed' or i.get('what') or i.get('wording')])
        describe_entry(e)
        e['v'] = FORMAT
        done += 1
        print('redid %s: %s' % (e['id'], e['headline']))
    if done:
        late_reasons(d, [c for c in git('rev-list', '--reverse', 'HEAD').split() if not skip(c)])
    save(d)
    print('%d entries brought up to date' % done)


def cmd_backfill(until=None):
    """Entries for history that is already published, one per day: a day's work is one entry, so something
    added and taken out again the same day doesn't show at all."""
    until = until or ('origin/main' if git('rev-parse', '--verify', '--quiet', 'origin/main', check=False).strip() else 'HEAD')
    d = load()
    keep = {e['sha']: e for e in d['entries'] if e.get('pr') or e.get('shots')}   # what GitHub recorded stays as it was
    days = []
    for sha in published_commits(None, until):
        if skip(sha):
            continue
        day = git('show', '-s', '--format=%aI', sha)[:10]
        if days and days[-1][0] == day:
            days[-1][1].append(sha)
        else:
            days.append((day, [sha]))
    out = []
    for k, (day, shas) in enumerate(days):
        if any(s in keep for s in shas):
            out.extend(keep[s] for s in shas if s in keep)
            continue
        first, last = shas[0], shas[-1]
        parent = git('rev-parse', '--verify', '--quiet', first + '^1', check=False).strip() or None
        items = compare(Version(parent), Version(last))
        if not items:
            continue
        e = entry(last, parent, day, None, items)
        e['shas'] = shas
        e['order'] = k
        out.append(e)
        print('%s %s %s' % (day, e['headline'], counts(major(items))))
    d['entries'] = out
    save(d)


if __name__ == '__main__':
    a = sys.argv[1:]
    if not a or a[0] in ('-h', '--help'):
        print(__doc__)
    elif a[0] == 'diff':
        cmd_diff(*a[1:3])
    elif a[0] == 'comment' and len(a) == 4:
        cmd_comment(*a[1:4])
    elif a[0] == 'record' and len(a) == 3:
        cmd_record(a[1], a[2])
    elif a[0] == 'draft':
        cmd_draft('--shots' in a)
    elif a[0] == 'upgrade':
        cmd_upgrade()
    elif a[0] == 'backfill':
        cmd_backfill(a[1] if len(a) > 1 else None)
    else:
        print(__doc__)
        sys.exit(2)
