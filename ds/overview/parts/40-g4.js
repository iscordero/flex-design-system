/* ───────── Guide 4: Layout, spacing and radius ───────── */
function seg(flex, bg, name, range, inv) { return h('div', {key: name, style: {flex: flex, minWidth: 0, padding: '10px 10px', background: bg, borderRight: '2px solid var(--surface-neutral-200)'}},
  h('div', {className: 'k', style: {fontSize: 12, color: inv ? '#fff' : undefined, whiteSpace: 'nowrap'}}, name), h('div', {className: 's', style: {color: inv ? 'rgba(255,255,255,.85)' : undefined, whiteSpace: 'nowrap'}}, range)); }
viz('g4-breakpoints', null, h('div', {className: 'row', style: {alignItems: 'stretch', borderRadius: 'var(--radius-rg)', overflow: 'hidden'}},
  seg(3, 'var(--misty-blue)', 'Mobile', 'under 768'), seg(3, '#cfe3fa', 'Tablet', '768–1023'), seg(4, 'var(--qualys-blue)', 'Desktop', '1024–1439', true), seg(3.4, 'var(--cobalt)', 'Large desktop', 'from 1440', true)));

function frame(w, m, name) { var mm = Math.max(4, Math.round(m / 3)); return col({gap: 6, alignItems: 'center'},
  h('div', {style: {width: w, height: 64, display: 'flex', background: 'var(--surface-neutral-100)', border: '1px solid var(--stroke-neutral-400)', borderRadius: 6, overflow: 'hidden'}},
    h('span', {style: {width: mm, background: 'var(--red-tint)'}}), h('span', {style: {flex: 1, margin: '8px 0', background: 'var(--misty-blue)', borderRadius: 3}}), h('span', {style: {width: mm, background: 'var(--red-tint)'}})),
  h('div', {style: {textAlign: 'center'}}, t('k', m + 'px', {fontSize: 13}), t('s', name))); }
viz('g4-margins', null, row({gap: 16, alignItems: 'flex-end', justifyContent: 'space-between'},
  frame(64, 20, 'Mobile'), frame(110, 36, 'Tablet'), frame(160, 56, 'Desktop'),
  col({gap: 6, alignItems: 'center'}, row({gap: 8, height: 64}, h('span', {style: {width: 22, height: 48, background: 'var(--misty-blue)', borderRadius: 3}}), h('span', {style: {width: 22, height: 48, background: 'var(--misty-blue)', borderRadius: 3}})), h('div', {style: {textAlign: 'center'}}, t('k', '24px', {fontSize: 13}), t('s', 'Gutter')))));

/* A screen as a band: page margins in red, the content well filling what is between them. w = the well's width, or null to fill the screen. */
function well(w, label) { var m = w == null ? 17 : 13; return h('div', {style: {display: 'flex', justifyContent: 'center', alignItems: 'stretch', height: 84, boxSizing: 'border-box', background: 'var(--surface-neutral-300)', border: '1px solid var(--stroke-neutral-400)', borderRadius: 6, overflow: 'hidden'}},
  h('span', {style: {flex: 'none', width: m, background: 'var(--red-tint)'}}),
  h('div', {className: 'blueb', style: {flex: w == null ? 1 : 'none', width: w == null ? undefined : w, minWidth: 0, margin: '10px 0', display: 'flex', alignItems: 'center', justifyContent: 'center'}}, t('k', label, {fontSize: 12, color: 'var(--cobalt)'})),
  h('span', {style: {flex: 'none', width: m, background: 'var(--red-tint)'}})); }
viz('g4-content', null, col({gap: 16},
  col({gap: 8},
    t('k', 'Screens up to 1440px', {fontSize: 12}),
    well(null, 'Content well'),
    row({justifyContent: 'space-between'}, sp('s', '56px page margin'), sp('s', 'Fills the screen between the margins'))),
  col({gap: 8},
    t('k', 'Screens wider than 1440px', {fontSize: 12}),
    /* A 1920px screen at the same scale: the well stops at 1440px and sits in the middle. */
    well(328, '1440px content well'),
    row({justifyContent: 'space-between'}, sp('s', '56px page margin'), sp('s', 'Max width 1440px, centered')))));

function mod(name, bg, hh, inv) { return h('div', {key: name, className: 'row', style: {justifyContent: 'center', height: hh, background: bg}}, h('div', {className: 'row', style: {justifyContent: 'center', width: 260, height: hh - 16, borderRadius: 3, border: '1px dashed ' + (inv ? 'rgba(255,255,255,.6)' : 'var(--qualys-blue)')}}, sp('k', name, {fontSize: 12, color: inv ? '#fff' : undefined}))); }
viz('g4-modules', {display: 'grid', gridTemplateColumns: '1fr 132px', columnGap: 16, alignItems: 'center'},
  h('div', {style: {borderRadius: 6, overflow: 'hidden', border: '1px solid var(--stroke-neutral-400)'}},
    mod('Hero', 'var(--surface-neutral-600)', 46, true), mod('GeneralContent', 'var(--surface-neutral-100)', 40), mod('Stats', 'var(--surface-neutral-300)', 40), mod('CtaModule', 'var(--surface-blue-100)', 40)),
  col({gap: 8}, lab('No gap between', 'Modules stack edge to edge'), lab('48px', 'Each brings its own top and bottom space')));

function grid(cols, n, w, hh, name) { return col({gap: 6, alignItems: 'center'}, h('div', {style: {display: 'grid', gridTemplateColumns: 'repeat(' + cols + ', 1fr)', gap: 4, width: w, padding: 6, background: 'var(--surface-neutral-100)', border: '1px solid var(--stroke-neutral-400)', borderRadius: 6}},
  Array.apply(null, Array(n)).map(function (_, i) { return h('span', {key: i, style: {height: hh, background: 'var(--misty-blue)', borderRadius: 3}}); })), h('div', {style: {textAlign: 'center'}}, t('k', name, {fontSize: 13}))); }
viz('g4-columns', null, row({gap: 16, alignItems: 'flex-start', justifyContent: 'space-between'},
  grid(4, 4, 188, 44, 'Desktop: up to four'), grid(2, 4, 110, 20, 'Tablet: 2 × 2'), grid(1, 4, 60, 8, 'Mobile: one')));

viz('g4-spacing', null, h('div', {className: 'row', style: {alignItems: 'flex-end', gap: 10}},
  [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 32, 36, 48, 56, 100].map(function (n) { return h('div', {key: n, className: 'col', style: {alignItems: 'center', gap: 6, width: 18}}, h('i', {style: {display: 'block', width: 14, height: n, background: 'var(--qualys-blue)', borderRadius: 2}}), sp('s', String(n), {fontSize: 10})); })));

function gapRow(name, tok, px) { return [sp('s', name, {key: name, color: 'var(--text-primary)'}), h('div', {key: name + 'g', className: 'row'}, ph(28, 14, {background: 'var(--stroke-neutral-500)'}), h('span', {style: {width: px, height: 14, background: 'var(--red-tint)', borderTop: '1px solid var(--qualys-red)', borderBottom: '1px solid var(--qualys-red)'}}), ph(28, 14, {background: 'var(--stroke-neutral-500)'})), sp('mono', tok, {key: name + 't', whiteSpace: 'nowrap', textAlign: 'right'})]; }
viz('g4-spacing-use', null, h('div', {style: {display: 'grid', gridTemplateColumns: '150px 1fr auto', columnGap: 12, rowGap: 9, alignItems: 'center'}},
  gapRow('Text and chips', '6–10', 10), gapRow('Between text blocks', '16–20', 20), gapRow('Text to buttons', '24–32', 32), gapRow('Buttons, headers, body', '36', 36), gapRow('Between buttons', '48', 48), gapRow('Between sections', '56 or 100', 100)));

function rtile(r, name, use, extra) { return col({gap: 6, alignItems: 'center', width: 60}, h('span', {style: Object.assign({display: 'block', width: 48, height: 48, background: 'var(--surface-neutral-100)', border: '2px solid var(--qualys-blue)', borderRadius: r}, extra)}), h('div', {style: {textAlign: 'center'}}, t('k', name, {fontSize: 13}), t('s', use, {fontSize: 10.5}))); }
viz('g4-radius', null, row({gap: 0, alignItems: 'flex-start', justifyContent: 'space-between'},
  rtile(16, '16', 'Cards, modals'), rtile(12, '12', 'Buttons'), rtile(10, '10', 'Inputs, menus'), rtile(8, '8', 'Card images'), rtile(6, '6', 'Badges'), rtile(4, '4', 'Checkboxes'), rtile('10px 0 10px 0', '10', 'Flags: two corners')));

function shtile(tok, use) { return col({gap: 8}, h('div', {style: {height: 52, borderRadius: 'var(--radius-md)', background: 'var(--surface-neutral-100)', boxShadow: 'var(--' + tok + ')'}}), h('div', null, t('mono', tok), t('s', use))); }
viz('g4-elevation', {background: 'var(--surface-neutral-300)'}, h('div', {style: {display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 20, rowGap: 18}},
  shtile('shadow-card', 'Cards'), shtile('shadow-menu', 'Dropdown menus'), shtile('shadow-tabs', 'Tab bar'), shtile('shadow-drawer', 'Card drawers, promo cards'), shtile('shadow-dropdown', 'Small popovers'), shtile('shadow-modal', 'Modals, toasts, nav menus')));

viz('g4-layers', null, col({gap: 3},
  t('cap', 'Sits on top', {marginBottom: 3}),
  [['z-toast', 9000, 'Toasts'], ['z-session', 8500, 'Session timeout'], ['z-alert', 8000, 'Alert dialogs'], ['z-modal', 7000, 'Modals'], ['z-panel', 6000, 'Slide-in panels'], ['z-cookie', 5500, 'Cookie banner'], ['z-notification', 5000, 'Notification bar'], ['z-tooltip', 4000, 'Tooltips'], ['z-overlay', 3000, 'Overlay']].map(function (r, i) {
    return h('div', {key: r[0], className: 'row', style: {justifyContent: 'space-between', gap: 8, height: 22, marginLeft: i * 10, padding: '0 10px', borderRadius: 4, background: 'var(--surface-neutral-100)', border: '1px solid var(--stroke-neutral-400)'}}, h('span', {className: 'mono', style: {whiteSpace: 'nowrap'}}, r[0], sp('s', '  ' + r[2])), sp('s', String(r[1]))); }),
  t('cap', 'Sits lowest', {marginTop: 3, textAlign: 'right'})));

viz('g4-modals', null, row({gap: 20, alignItems: 'flex-start'},
  col({gap: 6, flex: 1}, h('div', {className: 'row', style: {justifyContent: 'center', height: 104, borderRadius: 6, background: 'rgba(0,0,0,.25)'}},
    h('div', {style: {width: 150, padding: 10, borderRadius: 8, background: '#fff'}}, col({gap: 5}, ph(70, 8, {background: 'var(--charcoal)'}), ph(120, 5), ph(96, 5), row({gap: 4, justifyContent: 'flex-end', marginTop: 4}, h('span', {style: {width: 30, height: 12, borderRadius: 3, border: '1px solid var(--qualys-red)'}}), h('span', {style: {width: 30, height: 12, borderRadius: 3, background: 'var(--qualys-red)'}}))))),
    lab('440 to 600px wide', 'Centered on the overlay')),
  col({gap: 6, alignItems: 'center'}, h('div', {className: 'row', style: {justifyContent: 'center', width: 74, height: 104, borderRadius: 8, background: 'rgba(0,0,0,.25)'}},
    h('div', {style: {width: 66, padding: 6, borderRadius: 6, background: '#fff'}}, col({gap: 4}, ph(34, 6, {background: 'var(--charcoal)'}), ph(50, 4), ph(42, 4), h('span', {style: {height: 9, marginTop: 2, borderRadius: 3, background: 'var(--qualys-red)'}}), h('span', {style: {height: 9, borderRadius: 3, border: '1px solid var(--qualys-red)'}})))),
    h('div', {style: {textAlign: 'center'}}, t('k', '12px from the edges'), t('s', 'Buttons stack full width')))));
