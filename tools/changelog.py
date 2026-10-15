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

Needs Python 3 (and Pillow and Playwright for screenshots in "record").
"""
import datetime, difflib, hashlib, json, os, re, shutil, subprocess, sys, tempfile, urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(ROOT, 'site', 'changes.json')
DRAFT = os.path.join(ROOT, 'site', 'changes-draft.json')
SHOTS = os.path.join(ROOT, 'site', 'changes')
P = 'ds/project/'
MAX_SHOTS = 4          # components with before/after screenshots per entry
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
            out[x['name']] = {'family': fam, 'value': val.get('light') if isinstance(val, dict) else val}
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
        if not m:
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
            items.append({'type': 'component', 'action': 'added', 'name': n})
            continue
        if n not in cb:
            items.append({'type': 'component', 'action': 'removed', 'name': n})
            continue
        what = []
        if n in look or us(ca[n]['preview']) != us(cb[n]['preview']):
            what.append('look')
        if us(pa.get(n)) != us(pb.get(n)):
            what.append('props')
        if ca[n]['readme'] != cb[n]['readme']:
            if not what and (us(ca[n]['readme']) == us(cb[n]['readme']) or is_wording(ca[n]['readme'], cb[n]['readme'])):
                items.append({'type': 'component', 'action': 'changed', 'name': n, 'wording': True})
                continue
            what.append('docs')
        if what:
            items.append({'type': 'component', 'action': 'changed', 'name': n, 'what': what})

    ta, tb = tokens(a), tokens(b)
    for n in sorted(set(ta) | set(tb)):
        x, y = ta.get(n), tb.get(n)
        if x == y:
            continue
        it = {'type': 'token', 'name': n, 'family': (y or x)['family']}
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
            items.append({'type': 'guide', 'action': 'added', 'name': t, 'guide': t, 'gid': gb[t]['gid']})
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
            elif s not in xb:
                it['action'] = 'removed'
            else:
                it['action'] = 'changed'
                if us(xa[s]) == us(xb[s]) or is_wording(xa[s], xb[s]):
                    it['wording'] = True
                elif similar(no_images(xa[s]), no_images(xb[s])) < 0.6 or re.findall(r'img:\w+', no_images(xa[s])) != re.findall(r'img:\w+', no_images(xb[s])):
                    it['big'] = True
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
        parts.append('Updated %s (%d)' % (what, len(toks)))
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


def describe_entry(e):
    e['headline'] = headline(e['items'])
    e['minor'] = not major(e['items'])
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


def as_text(items, md=False):
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
    w = [describe(i) for i in items if i.get('wording')]
    if w:
        lines.append(('**%s**' if md else '%s') % 'Wording updates')
        lines.append('- ' + ', '.join(w))
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
    return {'number': p['number'], 'url': p['html_url'], 'title': p['title'], 'merged_at': p['merged_at'],
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
         'approvedBy': [], 'summary': subject(body), 'pr': None, 'items': items, 'shots': []}
    if pr:
        e.update(summary=pr['title'], author=pr['author'], approvedBy=pr['approvedBy'], date=pr['merged_at'][:10],
                 pr={'number': pr['number'], 'url': pr['url']})
        e['with'] = [n for n in with_ if n != e['author']]
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
def screenshots(sha, parent, names, out_dir):
    """Before and after pictures of each component's preview, from that commit and the one before it."""
    try:
        from playwright.sync_api import sync_playwright
        from PIL import Image, ImageChops
    except ImportError:
        print('Playwright or Pillow missing: no screenshots', file=sys.stderr)
        return []
    tmp = tempfile.mkdtemp(prefix='flexshot-')
    shots = []
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
            page = br.new_page(viewport={'width': 1440, 'height': 900})
            for n in names:
                pngs = {}
                for key, d in trees.items():
                    html = os.path.join(d, 'ds', 'test', n + '.html')
                    if not os.path.exists(html):
                        continue
                    try:
                        page.goto('file://' + html)
                        page.wait_for_load_state('networkidle', timeout=20000)
                        page.wait_for_timeout(500)
                        h = min(4000, page.evaluate('document.documentElement.scrollHeight'))
                        pngs[key] = os.path.join(tmp, '%s-%s.png' % (n, key))
                        page.screenshot(path=pngs[key], full_page=True, clip={'x': 0, 'y': 0, 'width': 1440, 'height': h})
                    except Exception as e:
                        print('screenshot %s %s: %s' % (n, key, e), file=sys.stderr)
                ims = {k: Image.open(f).convert('RGB') for k, f in pngs.items()}
                top, bottom = 0, 1400
                if len(ims) == 2:   # frame the part that changed, so a small change is easy to see
                    a, b = ims['before'], ims['after']
                    h = min(a.height, b.height)
                    box = ImageChops.difference(a.crop((0, 0, 1440, h)), b.crop((0, 0, 1440, h))).getbbox()
                    if box is None and a.height != b.height:
                        box = (0, h - 1, 1440, h)
                    if box:
                        top = max(0, box[1] - 200)
                        bottom = min(max(a.height, b.height), max(box[3] + 200, top + 700), top + 1400)
                pair = {'name': n}
                for key, im in ims.items():
                    im = im.crop((0, top, 1440, min(bottom, im.height))) if im.height > top else im.crop((0, 0, 1440, min(1400, im.height)))
                    im = im.resize((720, max(1, round(im.height / 2))), Image.LANCZOS)
                    name = '%s-%s.webp' % (n, key)
                    im.save(os.path.join(out_dir, name), 'WEBP', quality=80, method=6)
                    pair[key] = 'changes/%s/%s' % (os.path.basename(out_dir), name)
                if len(ims) == 2 and ImageChops.difference(ims['before'].crop((0, 0, 1440, min(ims['before'].height, ims['after'].height))),
                                                            ims['after'].crop((0, 0, 1440, min(ims['before'].height, ims['after'].height)))).getbbox() is None \
                        and ims['before'].height == ims['after'].height:
                    pair['same'] = True
                if len(pair) > 1:
                    shots.append(pair)
            br.close()
    finally:
        for d in (os.path.join(tmp, 'before'), os.path.join(tmp, 'after')):
            if os.path.exists(d):
                git('worktree', 'remove', '--force', d, check=False)
        shutil.rmtree(tmp, ignore_errors=True)
    return shots


def same_look(items, shots):
    """Code shared between components can flag one that didn't change. If its before and after pictures match,
    drop the picture and the 'look' note."""
    keep = []
    for sh in shots:
        if sh.pop('same', False):
            for k in ('before', 'after'):
                try:
                    os.remove(os.path.join(ROOT, 'site', sh[k]))
                except (KeyError, OSError):
                    pass
            for i in items:
                if i['type'] == 'component' and i['name'] == sh['name'] and 'what' in i:
                    i['what'] = [w for w in i['what'] if w != 'look']
                    if not i['what']:
                        del i['what']
            continue
        keep.append(sh)
    return keep


def visual(items):
    return [i['name'] for i in items if i['type'] == 'component' and
            (i['action'] == 'added' or 'look' in i.get('what', []))][:MAX_SHOTS]


# ---------- commands ----------
def cmd_diff(base='origin/main', head='.'):
    if base and not git('rev-parse', '--verify', '--quiet', base, check=False).strip():
        base = 'HEAD'
    print(as_text(compare(Version(base), Version(head))))


def cmd_comment(base, head, branch):
    items = compare(Version(base), Version(head))
    body = '<!-- flex-changelog -->\n### What this change does to Flex\n\n%s\n\n**Preview:** %s (ready a minute or two after each push)\n\n' \
           '_Written automatically. When this is merged, it becomes an entry in the Change Log, with before and after screenshots._' \
           % (as_text(items, md=True), preview_url(branch))
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
        if not items:
            continue
        e = entry(last, parent, today, pr, items)
        if not pr and len(shas) > 1:
            e['summary'] = ' · '.join(summaries(shas)) or e['summary']
            e['shas'] = shas
        e['order'] = int(datetime.datetime.now().timestamp()) * 100 + k
        names = visual(items)
        if names:
            e['shots'] = same_look(items, screenshots(last, parent, names, os.path.join(SHOTS, last[:7])))
            e['items'] = [i for i in items if i['type'] != 'component' or i['action'] != 'changed' or i.get('what') or i.get('wording')]
            if not e['items']:
                shutil.rmtree(os.path.join(SHOTS, last[:7]), ignore_errors=True)
                continue
            describe_entry(e)
        d['entries'].append(e)
        added += 1
        print('recorded %s: %s (%d items)' % (last[:7], e['summary'], len(items)))
    save(d)
    # what's published is no longer a draft
    if os.path.exists(DRAFT):
        os.remove(DRAFT)
    shutil.rmtree(os.path.join(SHOTS, 'draft'), ignore_errors=True)
    print('%d new entries' % added)


def summaries(shas):
    """The subjects of the commits that change something in Flex (a commit that only rebuilds the site doesn't)."""
    out = []
    for c in shas:
        par = git('rev-parse', '--verify', '--quiet', c + '^1', check=False).strip() or None
        if compare(Version(par), Version(c)):
            out.append(subject(git('show', '-s', '--format=%B', c)))
    return out


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
    if not items:
        if os.path.exists(DRAFT):
            os.remove(DRAFT)
        print('Nothing unpublished: no draft entry')
        return
    unpub = git('rev-list', '--reverse', '%s..HEAD' % base).split() if base else []
    subjects = summaries(unpub)
    body = ''.join(git('show', '-s', '--format=%B', c) for c in unpub)
    me = git('config', 'user.name', check=False).strip() or (git('show', '-s', '--format=%an', 'HEAD').strip() if unpub else 'You')
    e = {'id': 'draft', 'sha': '', 'draft': True, 'date': datetime.date.today().isoformat(), 'author': me,
         'with': [n for n in coauthors(body) if n != me], 'approvedBy': [],
         'summary': ' · '.join(subjects), 'commits': len(unpub),
         'base': base or '', 'pr': None, 'items': items, 'shots': []}
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
        e['summary'] = ' · '.join(summaries(shas)) or e['summary']
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
    elif a[0] == 'backfill':
        cmd_backfill(a[1] if len(a) > 1 else None)
    else:
        print(__doc__)
        sys.exit(2)
