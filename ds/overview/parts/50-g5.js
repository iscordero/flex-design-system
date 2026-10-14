/* ───────── Guide 5: States and motion ───────── */
viz('g5-buttons', {display: 'flex', flexDirection: 'column', gap: 14},
  h('div', {className: 'row nowrap', style: {gap: 12, alignItems: 'flex-start'}},
    st(h(Q.Button, {size: 'sm'}, 'Sign Up'), 'Default'), st(h(Q.Button, {size: 'sm', style: {background: 'var(--button-bg-primary-hover)'}}, 'Sign Up'), 'Hover'),
    st(h(Q.Button, {size: 'sm', style: {background: 'var(--button-bg-primary-pressed)'}}, 'Sign Up'), 'Pressed'), st(h(Q.Button, {size: 'sm', disabled: true}, 'Sign Up'), 'Disabled')),
  h('div', {className: 'row nowrap', style: {gap: 12, alignItems: 'flex-start', borderTop: '1px solid var(--stroke-neutral-400)', paddingTop: 14}},
    st(h(Q.Button, {size: 'sm', variant: 'secondary'}, 'Sign Up'), 'Secondary'),
    st(h(Q.Button, {size: 'sm', variant: 'secondary', style: {background: 'var(--button-bg-primary-default)', borderColor: 'var(--button-bg-primary-default)', color: 'var(--text-inverted)'}}, 'Sign Up'), 'Hover: fills'),
    st(h(Q.Button, {size: 'sm', variant: 'secondary-alt', style: {background: 'var(--qualys-blue)', borderColor: 'var(--qualys-blue)', color: 'var(--text-inverted)'}}, 'Sign Up'), 'Alt hover: blue')));

viz('g5-links', null, h('div', {className: 'row nowrap', style: {gap: 28, alignItems: 'flex-start'}},
  st(h(Q.TextLink, {arrow: true}, 'Learn More'), 'Default'),
  st(h('span', {className: 'f-hover'}, h(Q.TextLink, {arrow: true, style: {color: 'var(--link-secondary-hover)'}}, 'Learn More')), 'Hover', 'Arrow moves 4px, darker'),
  st(h(Q.TextLink, {arrow: true, disabled: true}, 'Learn More'), 'Disabled', '50% opacity')));

function lrow(state) { return h('div', {style: {position: 'relative', display: 'flex', alignItems: 'center', width: 136, height: 44, padding: '0 14px', boxSizing: 'border-box', borderTop: '1px solid var(--stroke-neutral-400)', borderBottom: '1px solid var(--stroke-neutral-400)', background: state === 'hover' ? 'var(--chip-bg)' : (state === 'active' ? 'var(--surface-blue-200)' : 'transparent'), fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14, whiteSpace: 'nowrap'}},
  state === 'active' ? h(Q.Marker, {tone: 'default', style: {position: 'absolute', left: 0, top: 3}}) : null, 'Cloud Security'); }
viz('g5-rows', null, h('div', {className: 'row nowrap', style: {gap: 12, alignItems: 'flex-start'}},
  st(lrow(), 'Default'), st(lrow('hover'), 'Hover', '5% Charcoal tint'), st(lrow('active'), 'Active', 'Misty Blue, blue marker')));

function mcard(hover, name, sub) { return col({gap: 8, flex: 1}, h('div', {className: 'mcard'},
  ph(96, 9, {background: 'var(--charcoal)'}), ph(150, 6), ph(120, 6),
  h('div', {className: 'row', style: {gap: 4, marginTop: 6, color: 'var(--qualys-red)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 13}}, 'Learn More', h('span', {style: {display: 'flex', transform: hover ? 'translateX(4px)' : 'none'}}, h(Q.Icon, {name: 'arrow-right', size: 14}))),
  h('span', {style: {position: 'absolute', left: 0, bottom: 0, height: 6, width: hover ? '100%' : 0, background: 'var(--qualys-blue)'}})), h('div', null, t('cap', name), t('s', sub, {marginTop: 2}))); }
viz('g5-cards', null, row({gap: 20, alignItems: 'flex-start'}, mcard(false, 'Rest', 'Shadow only'), mcard(true, 'Hover', '6px blue bar slides in, arrow nudges')));

viz('g5-focus', {display: 'grid', gridTemplateColumns: 'auto auto 1fr', columnGap: 24, alignItems: 'start'},
  st(h('div', {className: 'f-ring', style: {padding: 4}}, h(Q.Button, {size: 'sm'}, 'Get a Demo')), 'Focus ring', 'Buttons, links, cards'),
  st(h('div', {className: 'f-ring row', style: {height: 48, padding: '0 4px'}}, h(Q.Checkbox, {'aria-label': 'x', defaultChecked: true})), 'Focus ring', 'Checks, radios, toggles'),
  st(h('div', {className: 'f-focus', style: {width: '100%'}}, h(Q.TextField, {label: 'Work Email'})), 'Blue border', 'Fields, dropdowns, search'));

viz('g5-timing', {display: 'grid', gridTemplateColumns: '1fr 96px', columnGap: 16, alignItems: 'center'},
  h('div', {className: 'mo', style: {gridTemplateColumns: '132px 1fr'}},
    [['Colour changes', 150], ['Buttons, inputs, cards', 200], ['Larger moves, menus', 300]].map(function (r) { return [sp('s', r[0], {key: r[0]}), h('div', {className: 'bar', key: r[1]}, h('i', {style: {width: r[1] * 0.38}}), sp('k', r[1] + 'ms', {fontSize: 12}))]; })),
  col({gap: 4, alignItems: 'center'}, h('svg', {width: 72, height: 56, viewBox: '0 0 72 56', fill: 'none'}, h('path', {d: 'M4 52 C 30 52, 42 4, 68 4', stroke: 'var(--qualys-blue)', strokeWidth: 2.5, strokeLinecap: 'round'}), h('path', {d: 'M4 4 V52 H68', stroke: 'var(--stroke-neutral-500)', strokeWidth: 1})), t('cap', 'Ease-in-out')));

function trk(name, segs, end) { return [sp('s', name, {key: name, color: 'var(--text-primary)'}), h('div', {className: 'trk', key: name + 't'}, segs.map(function (s, i) { return h('i', {key: i, className: s[2] ? 'wait' : '', style: {left: s[0] * 0.5, width: (s[1] - s[0]) * 0.5}}); }), h('b', {style: {left: segs[segs.length - 1][1] * 0.5 + 8}}, end))]; }
viz('g5-overlays', null, h('div', {className: 'tl', style: {gridTemplateColumns: '76px 1fr'}},
  trk('Backdrop', [[0, 200]], '200ms fade'), trk('Modal', [[0, 200]], '200ms, grows from 95%'), trk('Toast', [[0, 300]], '300ms slide'), trk('Cookie bar', [[0, 400]], '400ms rise'), trk('Tooltip', [[0, 300, true], [300, 450]], '150ms after 300ms')));

function life(name, w, end, open) { return [h('span', {key: name, className: 'row', style: {gap: 6}}, name[1], sp('s', name[0], {color: 'var(--text-primary)'})), h('div', {className: 'trk', key: name[0] + 't'}, h('i', {style: {left: 0, width: w, background: name[2], borderRadius: open ? '6px 0 0 6px' : 6}}), open ? h('i', {style: {left: w, width: 40, background: 'linear-gradient(90deg,' + name[2] + ', transparent)', borderRadius: 0}}) : null, h('b', {style: {left: w + (open ? 48 : 8)}}, end))]; }
viz('g5-toasts', null, h('div', {className: 'tl', style: {gridTemplateColumns: '92px 1fr'}},
  life(['Success', ic('check-circle', 14, 'var(--utility-success-default)'), 'var(--utility-success-default)'], 110, '5 seconds'),
  life(['Info', ic('alert-circle', 14, 'var(--qualys-blue)'), 'var(--qualys-blue)'], 110, '5 seconds'),
  life(['Warning', ic('alert-circle', 14, 'var(--utility-warning-default)'), 'var(--utility-warning-default)'], 176, '8 seconds'),
  life(['Error', ic('x-circle', 14, 'var(--qualys-red)'), 'var(--qualys-red)'], 176, 'Until dismissed', true)));

function cbtn(icon) { return h('span', {className: 'tile', style: {width: 28, height: 28, borderRadius: 14, background: 'var(--surface-neutral-100)', border: '1px solid var(--stroke-neutral-400)', color: 'var(--icon-default)'}}, h(Q.Icon, {name: icon, size: 14})); }
viz('g5-carousel', null, col({gap: 10},
  h('div', {style: {display: 'flex', gap: 8, overflow: 'hidden', marginRight: -20}, 'data-bleed': 1}, [0, 1, 2, 3, 4].map(function (i) { return h('div', {key: i, 'data-bleed': 1, style: {flex: 'none', width: 104, height: 60, borderRadius: 10, background: 'var(--surface-neutral-100)', border: '1px solid var(--stroke-neutral-400)', padding: 10}}, ph(50, 7, {background: 'var(--charcoal)'}), ph(70, 5, {marginTop: 6})); })),
  row({gap: 12}, h('div', {style: {flex: 1, height: 4, borderRadius: 2, background: 'var(--surface-neutral-400)'}}, h('span', {style: {display: 'block', width: '30%', height: 4, borderRadius: 2, background: 'var(--qualys-blue)'}})), cbtn('chevron-left'), cbtn('chevron-right')),
  t('s', 'Moves one card at a time, only when asked: swipe, arrow keys or the buttons.')));

function ghost(still, name, sub) { return col({gap: 8, flex: 1}, h('div', {className: 'row', style: {height: 52, gap: 0, padding: '0 10px', borderRadius: 'var(--radius-rg)', background: 'var(--surface-neutral-100)', border: '1px solid var(--stroke-neutral-400)'}},
  still ? null : [0.15, 0.3, 0.55].map(function (o, i) { return h('span', {key: i, style: {width: 26, height: 30, marginRight: -8, borderRadius: 6, background: 'var(--qualys-blue)', opacity: o}}); }),
  still ? h('span', {style: {flex: 1}}) : null,
  h('span', {style: {width: 26, height: 30, borderRadius: 6, background: 'var(--qualys-blue)'}}),
  still ? null : h('span', {style: {marginLeft: 8, display: 'flex', color: 'var(--stroke-neutral-500)'}}, h(Q.Icon, {name: 'arrow-right', size: 16}))), h('div', null, t('cap', name), t('s', sub, {marginTop: 2}))); }
viz('g5-reduced', null, row({gap: 20, alignItems: 'flex-start'}, ghost(false, 'Default', 'Slides and fades into place'), ghost(true, 'Reduced motion', 'Appears in place, no movement')));
