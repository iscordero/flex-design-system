"""Writes the Button, TextLink and Hyperlink previews as reference tables: every configuration, each state, its name, its tokens and its usage."""
import os
C = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'project/components')
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Text:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600&display=swap">'
CSS = '''html,body{margin:0}body{font-family:var(--font-body);color:var(--text-primary);background:var(--surface-neutral-200)}
.pv{padding:var(--spacing-2xl) var(--spacing-4xl) var(--spacing-4xl)}
.sec{margin-top:var(--spacing-5xl)}.sec:first-child{margin-top:0}
.sec__title{margin:0;font-family:var(--font-heading);font-weight:600;font-size:38px;line-height:1.1;letter-spacing:-0.02em}
.sec__lede{margin:var(--spacing-xs) 0 0;max-width:760px;font-size:18px;line-height:1.3;letter-spacing:-0.01em;color:var(--text-secondary)}
.sizes{margin-top:var(--spacing-xl);border:1px solid var(--stroke-neutral-400);border-radius:var(--radius-md);background:var(--surface-neutral-100);overflow:hidden}
.sizes table{width:100%;border-collapse:collapse;font-size:14px;line-height:1.3}
.sizes th{padding:var(--spacing-xs) var(--spacing-rg);text-align:left;font-family:var(--font-heading);font-weight:600;font-size:13px;color:var(--text-secondary);background:var(--surface-neutral-300)}
.sizes td{padding:var(--spacing-xs) var(--spacing-rg);border-top:1px solid var(--stroke-neutral-400);vertical-align:top}
.sizes td:first-child{font-family:var(--font-heading);font-weight:600}
.sizes code,.tk code,.nm{font-family:ui-monospace,SFMono-Regular,Menlo,Consolas,monospace}
.sizes code{font-size:12.5px;color:var(--cobalt)}
.mx{margin-top:var(--spacing-2xl);border:1px solid var(--stroke-neutral-400);border-radius:var(--radius-md);background:var(--surface-neutral-100);overflow:hidden}
.mx__head{padding:var(--spacing-xl) var(--spacing-xl) var(--spacing-rg)}
.mx__title{margin:0;font-family:var(--font-heading);font-weight:600;font-size:24px;line-height:1.1;letter-spacing:-0.02em}
.mx__use{margin:var(--spacing-3xs) 0 0;max-width:820px;font-size:16px;line-height:1.3;letter-spacing:-0.01em;color:var(--text-secondary)}
.mx__grid{display:grid;grid-template-columns:var(--mx-label,220px) repeat(var(--mx-n,4),minmax(0,1fr))}
.mx__th{padding:var(--spacing-3xs) var(--spacing-rg);border-top:1px solid var(--stroke-neutral-400);background:var(--surface-neutral-300);font-family:var(--font-heading);font-weight:600;font-size:13px;line-height:1.3;color:var(--text-secondary)}
.mx__th+.mx__th,.mx__cell,.mx__tok{border-left:1px solid var(--stroke-neutral-400)}
.mx__lab,.mx__cell,.mx__tok,.mx__toklab{border-top:1px solid var(--stroke-neutral-400)}
.mx__lab,.mx__toklab{padding:var(--spacing-rg)}
.mx__toklab,.mx__tok{background:var(--surface-blue-100)}
.mx__lab b,.mx__toklab b{display:block;font-family:var(--font-heading);font-weight:600;font-size:16px;line-height:1.3}
.mx__lab span,.mx__toklab span{display:block;margin-top:var(--spacing-5xs);font-size:13px;line-height:1.3;color:var(--text-secondary)}
.mx__band{grid-column:1/-1;padding:var(--spacing-3xs) var(--spacing-rg);border-top:1px solid var(--stroke-neutral-400);background:var(--surface-neutral-200);font-family:var(--font-heading);font-weight:600;font-size:13px;line-height:1.3}
.mx__band span{font-family:var(--font-body);font-weight:400;color:var(--text-secondary)}
.mx__tok{padding:var(--spacing-rg)}
.mx__cell{display:flex;flex-direction:column;gap:var(--spacing-3xs);padding:var(--spacing-rg);min-width:0}
.spec{display:flex;align-items:center;justify-content:center;min-height:88px;padding:var(--spacing-rg);border-radius:var(--radius-xs);background:var(--surface-neutral-200);box-sizing:border-box}
.spec.is-dark{background:var(--surface-neutral-600)}
.nm{font-size:12.5px;font-weight:600;line-height:1.35;overflow-wrap:anywhere;color:var(--text-primary)}
.tk{display:flex;flex-direction:column;gap:var(--spacing-5xs);font-size:13px;line-height:1.3;color:var(--text-secondary)}
.tk span{display:flex;flex-direction:column}
.tk i{font-style:normal;font-size:12px}
.tk code{font-size:12.5px;color:var(--cobalt);overflow-wrap:anywhere}
.tk em{font-style:normal}
.demo{display:flex;flex-wrap:wrap;align-items:center;gap:var(--spacing-xl);margin-top:var(--spacing-rg);padding:var(--spacing-xl);border:1px solid var(--stroke-neutral-400);border-radius:var(--radius-md);background:var(--surface-neutral-100)}
.demo.is-dark{background:var(--surface-neutral-600)}
@media (max-width:900px){.pv{padding:var(--spacing-xl) var(--spacing-rg)}.mx{overflow-x:auto}.mx__grid{min-width:860px}}'''
LIB = r'''var Q = window.Qualys, h = React.createElement;
/* States in the order the matrices list them. Pressed is drawn with the hover class as well, as a press always happens under the pointer. */
var STATES = [['default', 'Default', ''], ['hover', 'Hover', 'is-hover'], ['active', 'Active (pressed)', 'is-hover is-pressed'], ['disabled', 'Disabled', '']];
function tokens(t) {
  var out = [];
  [['fill', 'Fill'], ['border', 'Outline'], ['text', 'Label'], ['arrow', 'Arrow'], ['line', 'Underline']].forEach(function (k) { if (t[k[0]]) out.push(h('span', {key: k[0]}, h('i', null, k[1]), h('code', null, t[k[0]]))); });
  if (t.note) out.push(h('span', {key: 'n'}, h('em', null, t.note)));
  return h('div', {className: 'tk'}, out);
}
/* One matrix per variant: columns are states; a blue row lists the tokens each state uses; then one row per configuration, grouped into bands (sizes). */
function matrix(m) {
  var states = m.states || STATES, kids = [];
  kids.push(h('div', {key: 'h0', className: 'mx__th'}, m.labelHead || 'Configuration'));
  states.forEach(function (s) { kids.push(h('div', {key: 'h' + s[0], className: 'mx__th'}, s[1])); });
  if (m.tokens) {
    kids.push(h('div', {key: 't0', className: 'mx__toklab'}, h('b', null, 'Tokens'), h('span', null, 'The same for every configuration below')));
    states.forEach(function (s) { kids.push(h('div', {key: 't' + s[0], className: 'mx__tok'}, tokens(m.tokens[s[0]] || {}))); });
  }
  m.rows.forEach(function (r, i) {
    if (r.band) { kids.push(h('div', {key: 'b' + i, className: 'mx__band'}, r.band, r.spec ? h('span', null, ' · ' + r.spec) : null)); return; }
    kids.push(h('div', {key: 'l' + i, className: 'mx__lab'}, h('b', null, r.label), r.use ? h('span', null, r.use) : null));
    states.forEach(function (s) {
      kids.push(h('div', {key: 'c' + i + s[0], className: 'mx__cell'},
        h('div', {className: 'spec' + (r.dark || m.dark ? ' is-dark' : '')}, r.render(s[0], s[2], s[0] === 'disabled')),
        h('code', {className: 'nm'}, r.name(s[0])),
        r.tokens ? tokens(r.tokens[s[0]] || {}) : null));
    });
  });
  return h('div', {className: 'mx', key: m.title},
    h('div', {className: 'mx__head'}, h('h3', {className: 'mx__title'}, m.title), m.use ? h('p', {className: 'mx__use'}, m.use) : null),
    h('div', {className: 'mx__grid', style: {'--mx-n': states.length, '--mx-label': m.labelWidth || '220px'}}, kids));
}
function sizes(rows) {
  return h('div', {className: 'sizes'}, h('table', null,
    h('thead', null, h('tr', null, rows[0].map(function (c, i) { return h('th', {key: i}, c); }))),
    h('tbody', null, rows.slice(1).map(function (r, i) { return h('tr', {key: i}, r.map(function (c, j) { return h('td', {key: j}, c); })); }))));
}
function code(t) { return h('code', null, t); }
function sec(title, lede) { return h('section', {className: 'sec'}, h('h2', {className: 'sec__title'}, title), lede ? h('p', {className: 'sec__lede'}, lede) : null, [].slice.call(arguments, 2)); }
'''
BUTTON = r'''
/* Tokens per variant and state. Inverted variants sit on charcoal. */
var BT = {
  'primary': {default: {fill: 'button-bg-primary-default', text: 'text-inverted'}, hover: {fill: 'button-bg-primary-hover', text: 'text-inverted'}, active: {fill: 'button-bg-primary-pressed', text: 'text-inverted'}, disabled: {fill: 'rhino', text: 'asphalt'}},
  'primary-inverted': {default: {fill: 'button-bg-secondary', text: 'qualys-red'}, hover: {fill: 'surface-neutral-300', text: 'qualys-red'}, active: {fill: 'surface-neutral-100', text: 'qualys-red'}, disabled: {fill: 'surface-neutral-100', text: 'qualys-red', note: 'At 50% opacity'}},
  'secondary': {default: {border: 'qualys-red', text: 'qualys-red'}, hover: {fill: 'button-bg-primary-default', border: 'button-bg-primary-default', text: 'text-inverted'}, active: {fill: 'button-bg-primary-pressed', border: 'button-bg-primary-pressed', text: 'text-inverted'}, disabled: {border: 'rhino', text: 'asphalt'}},
  'secondary-alt': {default: {border: 'qualys-blue', text: 'qualys-blue'}, hover: {fill: 'qualys-blue', border: 'qualys-blue', text: 'text-inverted'}, active: {fill: 'cobalt', border: 'cobalt', text: 'text-inverted'}, disabled: {border: 'rhino', text: 'asphalt'}},
  'secondary-inverted': {default: {border: 'stroke-neutral-100', text: 'text-inverted'}, hover: {fill: 'surface-neutral-100 at 10%', border: 'stroke-neutral-100', text: 'text-inverted'}, active: {border: 'stroke-neutral-100', text: 'text-inverted'}, disabled: {border: 'stroke-neutral-100', text: 'text-inverted', note: 'At 50% opacity'}}
};
var ICON = {standard: null, left: 'download', right: 'arrow-right'};
function btnRows(variant, uses) {
  var rows = [];
  [['lg', 'Large', '50px tall · padding 14px 20px'], ['sm', 'Small', '40px tall · padding 12px 16px']].forEach(function (z) {
    rows.push({band: z[1], spec: z[2]});
    [['standard', 'Standard'], ['left', 'Icon left'], ['right', 'Icon right']].forEach(function (c) {
      rows.push({label: c[1], use: uses[c[0]],
        name: function (s) { return 'btn-' + variant + '-' + z[0] + (c[0] !== 'standard' ? '-icon-' + c[0] : '') + '-' + s; },
        render: function (s, cls, dis) { return h(Q.Button, {variant: variant, size: z[0], className: cls || undefined, disabled: dis, iconLeft: c[0] === 'left' ? ICON.left : undefined, iconRight: c[0] === 'right' ? ICON.right : undefined, tabIndex: -1}, 'Button'); }});
    });
  });
  return rows;
}
function btnMatrix(variant, title, use, uses) { return matrix({title: title, use: use, dark: /inverted/.test(variant), tokens: BT[variant], rows: btnRows(variant, uses)}); }
var U = {standard: 'No icon: the default.', left: 'Context, or an action such as downloading.', right: 'Going to another page (arrow) or playing media.'};
var SIZES = sizes([
  ['Size', 'Height', 'Padding, from the outer edge', 'Corners', 'Label', 'Icon', 'Outline (secondary)', 'Use'],
  ['Large', '50px', ['14px 20px · ', code('spacing-sm'), ' ', code('spacing-lg')], [code('radius-md'), ' 12px'], [code('button-label'), ' Wix Madefor Text SemiBold 16px'], ['16px, 4px gap \u00b7 ', code('spacing-5xs')], '2px, drawn inside', 'Page-level calls to action'],
  ['Small', '40px', ['12px 16px · ', code('spacing-xs'), ' ', code('spacing-rg')], [code('radius-md'), ' 12px'], [code('button-label'), ' 16px'], ['16px, 4px gap \u00b7 ', code('spacing-5xs')], '2px, drawn inside', 'Inside cards and smaller modules, and on mobile']
]);
ReactDOM.createRoot(document.getElementById('root')).render(h('div', {className: 'pv'},
  sec('Sizes', 'Two sizes. The padding is measured from the outer edge, as in Figma; the 2px outline of a secondary button is drawn inside it, so outlined and filled buttons are the same size.', SIZES),
  sec('Primary', 'Tier 1: conversion calls to action. Red filled; darker red on hover; darkest when pressed; grey when disabled. One per view, never next to another primary.',
    btnMatrix('primary', 'Primary', 'For the most important call to action on the page: form fills, trials, demos, sign-ups. Small inside cards and smaller modules, and on mobile.', U),
    btnMatrix('primary-inverted', 'Primary inverted', 'The same call to action on dark or photo grounds: white fill, red label.', U)),
  sec('Secondary', 'Tier 2: supportive calls to action. Outlined in red, blue or white depending on the ground; filled on hover.',
    btnMatrix('secondary', 'Secondary', 'For lesser calls to action: explore, compare, keep learning. Often within smaller modules such as cards.', U),
    btnMatrix('secondary-alt', 'Secondary alternative (blue)', 'An alternative secondary call to action beside an equally important one, such as "Join Waitlist" next to "Register".', U),
    btnMatrix('secondary-inverted', 'Secondary inverted', 'Lesser calls to action on dark or photo grounds.', U))));
'''
TEXTLINK = r'''
var LT = {
  red: {default: {text: 'link-secondary-default'}, hover: {text: 'link-secondary-hover'}, active: {text: 'link-secondary-hover'}, disabled: {text: 'link-secondary-default', note: 'At 50% opacity'}},
  blue: {default: {text: 'link-primary-default'}, hover: {text: 'link-primary-hover'}, active: {text: 'link-primary-hover'}, disabled: {text: 'link-primary-default', note: 'At 50% opacity'}},
  neutral: {default: {text: 'text-primary', arrow: 'qualys-blue'}, hover: {text: 'text-primary', arrow: 'qualys-blue', note: 'Arrow moves 4px right (spacing-5xs)'}, active: {text: 'text-primary', arrow: 'qualys-blue', note: 'Arrow moves 4px right'}, disabled: {text: 'text-primary', note: 'At 50% opacity'}},
  inverted: {default: {text: 'text-inverted'}, hover: {text: 'text-inverted'}, active: {text: 'text-inverted'}, disabled: {text: 'text-inverted', note: 'At 50% opacity'}}
};
/* (arrow notes are written in the matrix band) */
function withArrow(t) { var o = {}; Object.keys(t).forEach(function (s) { o[s] = Object.assign({}, t[s]); if (s === 'hover' || s === 'active') o[s].note = o[s].note || 'Arrow moves 4px right (spacing-5xs)'; }); return o; }
function linkRows(tone, arrows) {
  var rows = [];
  arrows.forEach(function (arrow) {
    rows.push({band: arrow ? 'With arrow' : 'No arrow', spec: arrow ? 'the arrow moves 4px right on hover and press' : null});
    [['rg', 'Regular', '16px'], ['sm', 'Small', '14px']].forEach(function (z) {
      rows.push({label: z[1], use: z[2] + ' label',
        name: function (s) { return 'textlink' + (arrow ? '-arrow' : '') + (tone === 'neutral' ? '' : '-' + tone) + (z[0] === 'sm' ? '-sm' : '') + '-' + s; },
        render: function (s, cls, dis) { return h(Q.TextLink, {tone: tone, size: z[0], arrow: arrow, className: cls || undefined, disabled: dis, href: dis ? undefined : '#', tabIndex: -1, onClick: function (e) { e.preventDefault(); }}, 'Textlink'); }});
    });
  });
  return rows;
}
function linkMatrix(tone, title, use, arrows) { return matrix({title: title, use: use, dark: tone === 'inverted', tokens: LT[tone], rows: linkRows(tone, arrows)}); }
var RED = 'Lightweight call to action in red: navigation or secondary actions that should be found without competing with a primary button. Use in smaller modules such as cards, or where several items each need an action.';
var BLUE = 'Lightweight action in blue for functional, clickable elements inside modules, such as filters ("Clear all"). With the arrow, it reinforces direction.';
var INV = 'White text link on dark or photo grounds.';
var NEU = 'Charcoal text link with a blue arrow: the default "go there" link in cards and modules. The arrow reinforces direction and intent.';
var SIZES = sizes([
  ['Size', 'Label', 'Arrow or icon', 'Use'],
  ['Regular', 'Wix Madefor Text SemiBold 16px, line height 1', ['16px, 4px gap · ', code('spacing-5xs')], 'Cards and modules'],
  ['Small', 'Wix Madefor Text SemiBold 14px, line height 1', ['16px, 4px gap · ', code('spacing-5xs')], 'Dense lists, small cards and mobile']
]);
ReactDOM.createRoot(document.getElementById('root')).render(h('div', {className: 'pv'},
  sec('Text link buttons', 'Tier 3: a text link button looks like a link but acts as a button. It stands on its own, outside a paragraph (a link inside a sentence is a Hyperlink).', SIZES,
    linkMatrix('neutral', 'Standard (charcoal)', NEU, [true]),
    linkMatrix('red', 'Red', RED, [false]),
    linkMatrix('blue', 'Blue', BLUE, [false, true]),
    linkMatrix('inverted', 'Inverted', INV, [false, true])),
  sec('In use', null,
    h('div', {className: 'demo'}, h(Q.TextLink, {tone: 'neutral', arrow: true, href: '#'}, 'Learn More'), h(Q.TextLink, {tone: 'red', href: '#'}, 'View All Events'), h(Q.TextLink, {tone: 'blue', href: '#'}, 'Clear All'), h(Q.TextLink, {tone: 'neutral', iconLeft: 'download', href: '#'}, 'Download the Report')),
    h('div', {className: 'demo is-dark'}, h(Q.TextLink, {tone: 'inverted', arrow: true, href: '#'}, 'Learn More'), h(Q.TextLink, {tone: 'inverted', href: '#'}, 'Read the Story')))));
'''
HYPER = r'''
var HT = {default: {text: 'hyperlink-default', line: '1px, 3px below the text'}, hover: {text: 'hyperlink-hover', line: '1px'}, arrow: {text: 'hyperlink-hover', line: '1px', note: 'Arrow 14px, 4px gap, shown on hover'}, active: {text: 'hyperlink-active', line: '1px'}, disabled: {text: 'hyperlink-default', note: 'At 50% opacity, out of the tab order'}};
var HI = {default: {text: 'text-inverted', line: '1px, 3px below the text'}, hover: {text: 'text-inverted', line: '2px'}, arrow: {text: 'text-inverted', line: '2px', note: 'Arrow 14px, 4px gap, shown on hover'}, active: {text: 'text-inverted', line: '1px'}, disabled: {text: 'text-inverted', note: 'At 50% opacity, out of the tab order'}};
var HS = [['default', 'Default', ''], ['hover', 'Hover', 'is-hover'], ['arrow', 'Hover, with arrow', 'is-hover'], ['active', 'Active (pressed)', 'is-hover is-pressed'], ['disabled', 'Disabled', '']];
function hyperRow(tone, label, use, toks) {
  return {label: label, use: use, dark: tone === 'inverted', tokens: toks,
    name: function (s) { return 'hyperlink-' + (tone === 'inverted' ? 'inverted-' : '') + s.replace('arrow', 'arrow-hover'); },
    render: function (s, cls, dis) { return h('span', {className: 'paragraph-rg', style: tone === 'inverted' ? {color: 'var(--text-inverted)'} : undefined}, h(Q.Hyperlink, {tone: tone === 'inverted' ? 'inverted' : undefined, href: dis ? undefined : '#', className: cls || undefined, disabled: dis, arrow: s === 'arrow' ? true : undefined, tabIndex: -1, onClick: function (e) { e.preventDefault(); }}, 'Hyperlink')); }};
}
ReactDOM.createRoot(document.getElementById('root')).render(h('div', {className: 'pv'},
  sec('Links', 'A hyperlink sits inside a sentence. Blue, SemiBold (two weights heavier than the copy around it) and always underlined, so it never relies on colour alone.',
    sizes([['Part', 'Value'], ['Label', 'IBM Plex Sans SemiBold, the size of the surrounding copy'], ['Underline', '1px, 3px below the text; 2px on hover when inverted'], ['Arrow', '14px, 4px gap, shown on hover']]),
    matrix({title: 'Inline hyperlink', use: 'A subtle, navigational link that shows something is clickable: in body copy such as articles and blogs, and for sources and URLs.', states: HS, labelWidth: '180px',
      rows: [hyperRow('default', 'Blue', 'On white and light grounds', HT), hyperRow('inverted', 'Inverted', 'On dark or blue grounds: white, still underlined', HI)]})),
  sec('In body copy', null,
    h('div', {className: 'demo', style: {display: 'block'}},
      h('p', {className: 'paragraph-rg', style: {margin: 0, maxWidth: 640}},
        'Read the ', h(Q.Hyperlink, {href: '#'}, 'vulnerability report'), ' for the full methodology, or see the ',
        h(Q.Hyperlink, {href: '#', arrow: true}, 'patch schedule'), ' for this quarter.'),
      h('p', {className: 'paragraph-rg', style: {margin: '12px 0 0', maxWidth: 640}},
        'The arrow can stay in view, as in the ', h(Q.Hyperlink, {href: '#', arrow: 'always'}, 'release notes'), '. A link that is not available yet is ',
        h(Q.Hyperlink, {href: '#', disabled: true}, 'disabled'), '.')))));
'''
def page(name, group, h_, w, sub, body):
    html = '''<!-- @dsCard group="%s" height=%d width=%d subtitle="%s" -->
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>%s — preview</title>
%s
<style>%s</style>
</head>
<body>
<div id="root"></div>
<script>
%s%s</script>
</body>
</html>
''' % (group, h_, w, sub, name, FONTS, CSS, LIB, body)
    open(os.path.join(C, name, 'preview.html'), 'w').write(html)
page('Button', 'Components · Buttons and links', 7265, 1440, 'Component · Primary and secondary in every size, icon and state, with names, tokens and usage', BUTTON)
page('TextLink', 'Components · Buttons and links', 3681, 1440, 'Component · Tertiary text link buttons: red, blue, charcoal with arrow, inverted; regular and small; every state', TEXTLINK)
page('Hyperlink', 'Components · Buttons and links', 1373, 1180, 'Component · Inline link in body copy, blue or inverted: every state with its name and tokens, and in a paragraph', HYPER)
print('ok')
