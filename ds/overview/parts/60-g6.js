/* ───────── Guide 6: Imagery, iconography and logo ───────── */
function photo(file, w, hh, extra) { return asset('Images/' + file, Object.assign({width: w, height: hh}, extra), ''); }
viz('g6-photo', null, col({gap: 8}, row({gap: 12}, h('img', {className: 'photo', src: '../project/assets/Images/hero-bg-office.jpg', style: {width: 214, height: 120}}), h('img', {className: 'photo', src: '../project/assets/Images/form-header-meeting.jpg', style: {width: 214, height: 120}})),
  t('s', 'Professional and enterprise-oriented, cool to neutral in tone.')));

viz('g6-heroes', null, row({gap: 16, alignItems: 'flex-start'},
  col({gap: 6, flex: 1}, h('div', {style: {position: 'relative', height: 108, borderRadius: 8, overflow: 'hidden'}},
    h('img', {src: '../project/assets/Images/hero-bg-building.jpg', style: {position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}),
    h('div', {style: {position: 'absolute', inset: 0, background: 'rgba(0,0,0,.5)'}}),
    h('div', {style: {position: 'absolute', left: 14, top: 14, right: 14}}, ty('h4', 'Detect, Prioritize, and Eliminate Risk', {color: '#fff', fontSize: 15}), h('span', {style: {display: 'inline-flex', marginTop: 8, transform: 'scale(.85)', transformOrigin: 'left top'}}, h(Q.Button, {size: 'sm'}, 'Get a Demo')))),
    lab('Dark overlay under white text', 'Full-bleed heroes on key landing pages')),
  col({gap: 6, width: 150}, h('div', {className: 'row', style: {position: 'relative', justifyContent: 'center', height: 108, borderRadius: 8, overflow: 'hidden'}},
    h('img', {src: '../project/assets/Images/hero-bg-office.jpg', style: {position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}),
    h('div', {style: {position: 'absolute', inset: 0, background: 'rgba(0,0,0,.35)'}}),
    h('span', {className: 'tile', style: {position: 'relative', width: 40, height: 40, borderRadius: 20, background: '#fff'}}, h('span', {style: {marginLeft: 3, borderLeft: '12px solid var(--asphalt)', borderTop: '8px solid transparent', borderBottom: '8px solid transparent'}}))),
    lab('Video banner', 'Overlay, white play disc'))));

function ratio(w, hh, name, use) { return col({gap: 6, alignItems: 'flex-start'}, h('div', {className: 'blueb row', style: {width: w, height: hh, justifyContent: 'center'}}, sp('k', name, {color: 'var(--cobalt)'})), t('s', use, {maxWidth: Math.max(w, 150)})); }
viz('g6-ratios', null, row({gap: 24, alignItems: 'flex-end'}, ratio(192, 108, '16:9', 'Heroes, card images, media beside copy'), ratio(61, 108, '9:16', 'Video testimonials')));

function calm(file, dark, name) { return col({gap: 6, flex: 1}, h('div', {style: {position: 'relative', height: 100, borderRadius: 8, overflow: 'hidden'}},
  h('img', {src: '../project/assets/Images/' + file, style: {position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover'}}),
  h('div', {style: {position: 'absolute', left: 8, top: 8, bottom: 8, width: '50%', padding: 10, borderRadius: 6, border: '1.5px dashed ' + (dark ? '#fff' : 'var(--charcoal)')}}, col({gap: 6}, ph(74, 8, {background: dark ? '#fff' : 'var(--charcoal)'}), ph(86, 5, {background: dark ? 'rgba(255,255,255,.8)' : 'var(--asphalt)'}), ph(60, 5, {background: dark ? 'rgba(255,255,255,.8)' : 'var(--asphalt)'})))),
  h('div', null, t('mono', file), t('s', name))); }
viz('g6-photoheroes', null, row({gap: 16, alignItems: 'flex-start'}, calm('hero-bg-building.jpg', true, 'Calm area for white text'), calm('hero-bg-office.jpg', false, 'Calm area for charcoal text')));

viz('g6-logos', {display: 'flex', flexDirection: 'column', gap: 12},
  h('div', {className: 'white', style: {display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, padding: 14}}, ['Company', 'Company', 'Company', 'Company'].map(function (c, i) { return h('div', {key: i, className: 'logo-ph'}, c); })),
  dd(true, 'Each company’s own file, on a clear ground, at a similar visual size.'),
  dd(false, 'Redrawn, recoloured or cropped logos.'));

viz('g6-product', null, col({gap: 8}, h('div', {className: 'row', style: {position: 'relative', height: 104, padding: '0 16px', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'linear-gradient(90deg, var(--blue-gradient-start), var(--blue-gradient-end))'}},
  col({gap: 8, alignItems: 'flex-start'}, ty('h4', 'Try Qualys for Free', {color: '#fff'}), h(Q.Button, {size: 'sm'}, 'Get Started')),
  h('img', {'data-bleed': 1, src: '../project/assets/Images/promo-laptop.png', style: {position: 'absolute', right: -6, bottom: -18, height: 128}})),
  t('s', 'Transparent product image on the blue gradient or Charcoal.')));

viz('g6-formheader', null, col({gap: 8, alignItems: 'flex-start'}, h('div', {style: {position: 'relative'}}, h('img', {className: 'photo', src: '../project/assets/Images/form-header-meeting.jpg', style: {width: 330, height: 121, borderRadius: 8}})),
  h('div', {className: 'dimh', style: {width: 330}}, '30 : 11  ·  600 × 220px'), t('s', 'People at work, faces clear of the edges.')));

function face(round, name, sub) { return col({gap: 8, alignItems: 'center', flex: 1}, h('div', {className: 'tile', style: {position: 'relative', width: 84, height: 84, borderRadius: round ? 42 : 12, background: 'var(--avatar-bg)', overflow: 'hidden'}},
  h('span', {style: {position: 'absolute', left: '50%', top: 16, width: 30, height: 30, marginLeft: -15, borderRadius: 15, background: 'var(--avatar-icon)'}}), h('span', {style: {position: 'absolute', left: '50%', top: 52, width: 62, height: 60, marginLeft: -31, borderRadius: '31px 31px 0 0', background: 'var(--avatar-icon)'}}),
  round ? null : h('span', {style: {position: 'absolute', left: '17.5%', top: '10%', width: '65%', height: '65%', border: '1.5px dashed var(--qualys-blue)', borderRadius: 4}})), h('div', {style: {textAlign: 'center'}}, t('k', name, {fontSize: 13}), t('s', sub))); }
viz('g6-people', null, row({gap: 12, alignItems: 'flex-start'},
  face(false, 'Square crop', 'Face fills 60 to 70%'), face(true, 'Circle crop', 'Centred, nothing cut off'),
  col({gap: 8, alignItems: 'center', flex: 1}, h('div', {className: 'row', style: {height: 84}}, h(Q.Avatar, {size: 'md'})), h('div', {style: {textAlign: 'center'}}, t('k', 'No photo', {fontSize: 13}), t('s', 'The default avatar')))));

viz('g6-icons-custom', null, row({gap: 20, alignItems: 'flex-start'},
  itile('var(--surface-neutral-100)', 'var(--icon-default)', 'On light', 'icon-default'), itile('var(--surface-neutral-600)', 'var(--icon-inverted)', 'On dark', 'icon-inverted'), itile('var(--surface-neutral-100)', 'var(--qualys-blue)', 'Interactive', 'qualys-blue'),
  lab('One drawing, any colour', 'Inline SVG in currentColor: the icon takes the text colour around it.', {flex: 1})));

viz('g6-utility', null, h('div', {style: {display: 'grid', gridTemplateColumns: 'repeat(9, 1fr)', gap: 8}},
  ['download', 'arrow-right', 'arrow-left', 'outlink', 'search', 'check', 'filter', 'menu', 'time', 'chevron-right', 'chevron-left', 'chevron-up', 'chevron-down', 'plus', 'cross', 'view-list', 'view-month', 'view-grid', 'alert-triangle', 'alert-circle', 'check-circle', 'x-circle', 'file', 'party', 'cookie'].map(function (n) {
    return h('div', {key: n, className: 'tile', style: {height: 38, background: 'var(--surface-neutral-100)', border: '1px solid var(--stroke-neutral-400)', color: 'var(--icon-default)'}}, h(Q.Icon, {name: n, size: 18})); })));

viz('g6-event', null, row({gap: '10px 20px', flexWrap: 'wrap'}, ['qualys', 'webinar', 'industry', 'speaking', 'training'].map(function (e) { return h(Q.EventType, {key: e, type: e}); })));

viz('g6-general', null, h('div', {className: 'row', style: {gap: 28, padding: '16px 20px', borderRadius: 'var(--radius-md)', background: 'var(--surface-neutral-600)', color: 'var(--icon-inverted)'}},
  [['general-events', 'Events'], ['general-webinar', 'Webinar'], ['general-resource', 'Resource']].map(function (g) { return col({key: g[0], gap: 8, alignItems: 'flex-start'}, h(Q.Icon, {name: g[0], size: 43}), sp('k', g[1], {color: '#fff'})); })));

viz('g6-social', null, row({gap: 24, alignItems: 'flex-start'},
  st(h('div', {className: 'row', style: {height: 52}}, h(Q.SocialButton, {network: 'url', label: 'Website'})), '24px', 'In the 52px blue SocialButton'),
  st(h('div', {className: 'row', style: {height: 52, color: 'var(--text-secondary)'}}, h(Q.Icon, {name: 'social-url', size: 15})), '15px', 'Plain rows, text-secondary'),
  st(h('div', {className: 'tile', style: {width: 52, height: 52, background: 'var(--surface-neutral-600)', color: 'var(--rhino)'}}, h(Q.Icon, {name: 'social-url', size: 25})), '25px', 'Footer, in Rhino')));

viz('g6-feature', null, row({gap: 20, alignItems: 'flex-start'},
  st(row({gap: 10}, ['detect', 'cloud', 'risk', 'compliance'].map(function (f) { return asset('Feature%20Icons/feature-' + f + '.svg', {width: 56, height: 56}, ''); })), '56px', 'On a Card'),
  st(row({gap: 8, height: 56}, asset('Feature%20Icons/feature-assets.svg', {width: 32, height: 32}), ty('h4', 'Assets')), '32px', 'Beside a Drawer title')));

viz('g6-linkicons', null, h('div', {className: 'grid2', style: {gridTemplateColumns: 'auto 1fr', columnGap: 20, rowGap: 12}},
  h('span', {className: 'row', style: {gap: 6, color: 'var(--link-primary-default)', fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 14}}, 'Read the Report', h(Q.Icon, {name: 'outlink', size: 16})), lab('outlink', 'Leaves qualys.com'),
  h('span', null, h(Q.TextLink, {size: 'sm', tone: 'blue', arrow: true}, 'Learn More')), lab('arrow-right', 'Stays on the site'),
  h('span', null, h(Q.Button, {size: 'sm', variant: 'secondary', iconLeft: 'download'}, 'Download Report')), lab('download', 'Leads download buttons')));

function ltile(bg, node, name, sub, bd) { return col({gap: 6, flex: 1}, h('div', {className: 'tile', style: {height: 64, background: bg, border: bd ? '1px solid var(--stroke-neutral-400)' : 0}}, node), h('div', null, t('k', name, {fontSize: 13}), t('s', sub))); }
viz('g6-logo-colours', null, row({gap: 12, alignItems: 'flex-start'},
  ltile('var(--surface-neutral-100)', asset('Logos/qualys-logo-full-rgb.svg', {height: 26}, 'Qualys'), 'Full colour', 'White, warm off-white', true),
  ltile('var(--surface-neutral-600)', asset('Logos/qualys-logo-full-rgb.svg', {height: 26, filter: 'brightness(0) invert(1)'}, 'Qualys'), 'All white', 'Charcoal or blue grounds'),
  ltile('linear-gradient(90deg, var(--blue-gradient-start), var(--blue-gradient-end))', asset('Logos/qualys-logo-reversed.svg', {height: 26}, 'Qualys'), 'Reversed', 'Inline promo cards')));

viz('g6-shield', null, row({gap: 16},
  h('div', {className: 'tile white', style: {width: 64, height: 64, flex: 'none'}}, asset('Logos/qualys-shield.svg', {height: 36}, 'Qualys shield')),
  col({gap: 8, flex: 1}, dd(true, 'The shield alone, for square or tight spaces.'), dd(false, 'Redrawn, recoloured or re-lettered marks.'))));

viz('g6-logo-size', null, row({gap: 28, alignItems: 'flex-end'},
  col({gap: 8, alignItems: 'flex-start'}, row({gap: 8}, asset('Logos/qualys-logo-full-rgb.svg', {height: 37}, 'Qualys'), h('div', {style: {display: 'flex', alignItems: 'center', height: 37, borderLeft: '1px solid var(--qualys-red)', paddingLeft: 6, fontFamily: 'var(--font-heading)', fontWeight: 600, fontSize: 11, color: 'var(--qualys-red)'}}, '37px')), lab('Nav', 'Logo height 37px')),
  col({gap: 8, alignItems: 'flex-start'}, col({gap: 4}, asset('Logos/qualys-shield.svg', {width: 75}, 'Qualys shield'), h('div', {className: 'dimh', style: {width: 75}}, '75px')), lab('Footer', 'Shield 75px wide, 39px on mobile'))));
