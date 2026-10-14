/* ───────── Guide 2: Colour ───────── */
function band(bg, token, name, use, inv) { return h('div', {key: token, className: 'row', style: {justifyContent: 'space-between', gap: 12, height: 30, padding: '0 12px', background: bg}},
  h('span', {style: {fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 12, color: inv ? '#fff' : 'var(--text-primary)', whiteSpace: 'nowrap'}}, name),
  h('span', {style: {fontSize: 12, color: inv ? 'rgba(255,255,255,.85)' : 'var(--text-secondary)', whiteSpace: 'nowrap'}}, use)); }
viz('g2-surfaces', null, h('div', {style: {borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--stroke-neutral-400)'}},
  band('var(--surface-neutral-200)', 'n200', 'Warm Off White', 'Page background'),
  band('var(--surface-neutral-300)', 'n300', 'Ecru', 'Alternate sections'),
  band('var(--surface-neutral-100)', 'n100', 'White', 'Alternate sections, cards, nav'),
  band('var(--surface-blue-100)', 'b100', 'Polar Blue', 'Light blue sections, form containers'),
  band('var(--surface-blue-300)', 'b300', 'Qualys Blue', 'Blue sections', true),
  band('var(--surface-neutral-600)', 'n600', 'Charcoal', 'Dark sections, footer, dark cards', true)));

function trow(sample, style, token, ground) { return [h('span', {key: token, style: Object.assign({fontSize: 15, lineHeight: 1.3, letterSpacing: '-.01em', padding: ground ? '4px 8px' : 0, borderRadius: 6, background: ground, justifySelf: 'start'}, style)}, sample), sp('s', token, {key: token + 't', whiteSpace: 'nowrap'})]; }
viz('g2-text', null, h('div', {className: 'grid2', style: {gridTemplateColumns: '1fr auto', rowGap: 10}},
  trow('Headings and body copy', {fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--text-primary)'}, 'text-primary'),
  trow('Disclaimers, placeholders, metadata', {color: 'var(--text-secondary)'}, 'text-secondary'),
  trow('Text on charcoal and blue', {color: 'var(--text-inverted)'}, 'text-inverted', 'var(--surface-neutral-600)'),
  trow('Emphasis in cards and drawers', {fontWeight: 500, color: 'var(--text-accent-primary)'}, 'text-accent-primary'),
  trow('Button text links', {fontFamily: 'var(--font-heading)', fontWeight: 600, color: 'var(--text-accent-secondary)'}, 'text-accent-secondary')));

function st(node, name, sub) { return col({gap: 6, alignItems: 'flex-start'}, node, h('div', null, t('cap', name), sub ? t('s', sub, {marginTop: 2}) : null)); }
viz('g2-actions', {display: 'flex', flexDirection: 'column', gap: 16},
  h('div', {className: 'row nowrap', style: {gap: 16, alignItems: 'flex-start'}},
    st(h(Q.Button, {size: 'sm'}, 'Get a Demo'), 'Default', 'Qualys Red'),
    st(h(Q.Button, {size: 'sm', style: {background: 'var(--button-bg-primary-hover)'}}, 'Get a Demo'), 'Hover', 'Crimson'),
    st(h(Q.Button, {size: 'sm', style: {background: 'var(--button-bg-primary-pressed)'}}, 'Get a Demo'), 'Pressed', 'Pepper')),
  h('div', {className: 'row nowrap', style: {gap: 16, alignItems: 'flex-start', borderTop: '1px solid var(--stroke-neutral-400)', paddingTop: 14}},
    st(h(Q.TextLink, {tone: 'blue', size: 'sm', arrow: true}, 'Page Link'), 'Default', 'Qualys Blue'),
    st(h(Q.TextLink, {tone: 'blue', size: 'sm', arrow: true, style: {color: 'var(--link-primary-hover)'}}, 'Page Link'), 'Hover', 'Cobalt'),
    st(h(Q.Hyperlink, {href: '#', style: {fontSize: 14}}, 'inline link'), 'In body copy', 'hyperlink-default'),
    st(h(Q.TextLink, {size: 'sm', arrow: true}, 'Text Link'), 'Button text link', 'Red, Crimson on hover')));

viz('g2-strokes', {display: 'grid', gridTemplateColumns: '1.3fr 1fr 1fr', columnGap: 16, alignItems: 'start'},
  st(h('div', {style: {width: '100%'}}, h(Q.TextField, {label: 'Work Email'})), 'Ash', 'Fields, cards, dividers'),
  st(row({gap: 14, height: 56}, h(Q.Checkbox, {'aria-label': 'x'}), h(Q.Radio, {'aria-label': 'y', name: 'g2r'})), 'Rhino', 'Checkboxes, radios, search line'),
  st(h('div', {className: 'tile', style: {width: '100%', height: 56, background: 'var(--surface-blue-300)'}}, h(Q.Button, {size: 'sm', variant: 'secondary-inverted'}, 'Learn More')), 'White', 'Outlines on blue'));

function itile(bg, color, name, sub, node) { return st(h('div', {className: 'tile', style: {width: 48, height: 48, background: bg, color: color, border: bg === 'var(--surface-neutral-100)' ? '1px solid var(--stroke-neutral-400)' : 0}}, node || h(Q.Icon, {name: 'search', size: 24})), name, sub); }
viz('g2-icons', {display: 'flex', flexDirection: 'column', gap: 14},
  h('div', {className: 'row', style: {gap: 20, alignItems: 'flex-start'}},
    itile('var(--surface-neutral-100)', 'var(--icon-default)', 'icon-default', 'Light grounds'),
    itile('var(--surface-neutral-600)', 'var(--icon-inverted)', 'icon-inverted', 'Dark grounds'),
    itile('var(--surface-neutral-100)', null, 'icon-feature', 'Feature icons', asset('Feature%20Icons/feature-detect.svg', {width: 32, height: 32}))),
  h('div', {className: 'row', style: {gap: 20, alignItems: 'flex-start', borderTop: '1px solid var(--stroke-neutral-400)', paddingTop: 14}},
    itile('var(--icon-bg-default)', '#fff', 'Default', 'icon-bg-default', h(Q.Icon, {name: 'arrow-right', size: 20})),
    itile('var(--icon-bg-hover)', '#fff', 'Hover', 'icon-bg-hover', h(Q.Icon, {name: 'arrow-right', size: 20})),
    itile('var(--icon-bg-pressed)', '#fff', 'Pressed', 'icon-bg-pressed', h(Q.Icon, {name: 'arrow-right', size: 20}))));

function disc(tone, icon, name, sub) { return st(h('span', {className: 'q-sdisc q-sdisc--' + tone, 'aria-hidden': 'true'}, h(Q.Icon, {name: icon, size: 24})), name, sub); }
viz('g2-utility', null, h('div', {className: 'row', style: {gap: 24, alignItems: 'flex-start'}},
  disc('success', 'check-circle', 'Success', 'success'), disc('warning', 'alert-circle', 'Warning', 'warning'), disc('error', 'x-circle', 'Error', 'qualys-red'), disc('info', 'alert-circle', 'Info', 'qualys-blue')));

function ovl(tone, name, sub) { return col({gap: 6, flex: 1}, h('div', {style: {position: 'relative', height: 76, borderRadius: 'var(--radius-rg)', overflow: 'hidden', background: 'var(--surface-neutral-100)', padding: 12}},
  col({gap: 6}, ph(110, 10, {background: 'var(--charcoal)'}), ph(150, 6), ph(120, 6), h('span', {style: {display: 'block', width: 64, height: 20, marginTop: 4, borderRadius: 6, background: 'var(--qualys-red)'}})),
  h('div', {style: {position: 'absolute', inset: 0, background: 'var(--overlay-' + tone + ')'}})), h('div', null, t('cap', name), t('s', sub, {marginTop: 2}))); }
viz('g2-overlays', null, row({gap: 16, alignItems: 'flex-start'}, ovl('light', 'overlay-light · 25%', 'Behind modals'), ovl('dark', 'overlay-dark · 50%', 'When the page behind is busy')));

viz('g2-tags', null, h('div', {className: 'grid2', style: {gridTemplateColumns: '84px 1fr', rowGap: 12}},
  t('cap', 'Badges'), row({gap: 6, flexWrap: 'wrap'}, [['critical', 'Critical'], ['high', 'High'], ['medium', 'Medium'], ['low', 'Low'], ['informational', 'Info'], ['fixed', 'Fixed'], ['accepted-risk', 'Accepted Risk'], ['neutral', 'Neutral'], ['blue', 'New']].map(function (x) { return h(Q.Tag, {key: x[0], tone: x[0], size: 'sm'}, x[1]); })),
  t('cap', 'Flags'), row({gap: 8}, h(Q.Flag, {tone: 'tier-1'}, 'Tier 1'), h(Q.Flag, {tone: 'tier-2'}, 'Tier 2'), h(Q.Flag, {tone: 'tier-3'}, 'Tier 3')),
  t('cap', 'Markers'), row({gap: 10, height: 30}, h(Q.Marker, {tone: 1, count: 3}), h(Q.Marker, {tone: 2, count: 5}), h(Q.Marker, {tone: 3, count: 8}), h(Q.Marker, {tone: 'blue', count: 2})),
  t('cap', 'Events'), row({columnGap: 16, rowGap: 6, flexWrap: 'wrap'}, ['qualys', 'webinar', 'industry', 'speaking', 'training'].map(function (e) { return h(Q.EventType, {key: e, type: e}); })),
  t('cap', 'Filter chips'), row({gap: 6}, h(Q.FilterChip, {size: 'sm'}, 'Cloud'), h(Q.FilterChip, {size: 'sm', active: true}, 'Risk'))));

viz('g2-gradient', {display: 'flex', flexDirection: 'column', gap: 8},
  h('div', {className: 'row nowrap', style: {justifyContent: 'space-between', gap: 12, height: 72, padding: '0 16px', borderRadius: 'var(--radius-md)', background: 'linear-gradient(90deg, var(--blue-gradient-start), var(--blue-gradient-end))'}},
    ty('h4', 'Try Qualys for Free', {color: '#fff'}), h(Q.Button, {size: 'sm'}, 'Get Started')),
  row({justifyContent: 'space-between'}, sp('s', 'blue-gradient-start'), sp('s', 'blue-gradient-end')));

function cx2(fg, bg, ratio, name, verdict, good) { return h('div', {key: name, style: {display: 'flex', flexDirection: 'column', gap: 6}},
  h('div', {className: 'tile', style: {height: 44, background: bg, color: fg, border: bg === '#ffffff' ? '1px solid var(--stroke-neutral-400)' : 0, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 16}}, ratio),
  h('div', null, t('k', name, {fontSize: 12}), h('div', {className: 'act', style: {marginTop: 3}}, h('span', {className: good ? 'ok' : 'warn', style: {display: 'flex'}}, h(Q.Icon, {name: good ? 'check-circle' : 'alert-circle', size: 14})), verdict))); }
viz('g2-contrast', null, h('div', {style: {display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 12, rowGap: 14}},
  cx2('#2683ed', '#ffffff', '3.78:1', 'Qualys Blue on white', '24px and larger', false),
  cx2('#194c7a', '#ffffff', '8.9:1', 'Cobalt on white', 'Small text', true),
  cx2('#1c76c8', '#ffffff', '4.69:1', 'Hyperlink on white', 'Small text', true),
  cx2('#ffffff', '#ed2e26', '4.18:1', 'White on Qualys Red', 'Flagged', false),
  cx2('#21b873', '#ffffff', '2.57:1', 'Success on white', 'Accent only', false),
  cx2('#f5a624', '#ffffff', '2.03:1', 'Warning on white', 'Accent only', false)));
