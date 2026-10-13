/* ───────── Guide 7: Patterns and components ───────── */
viz('g7-avatars', null, row({gap: 28, alignItems: 'flex-end'},
  col({gap: 8, alignItems: 'center'}, h(Q.Avatar, {size: 'sm'}), h('div', {style: {textAlign: 'center'}}, t('k', '40px', {fontSize: 13}), t('s', 'Small, circle'))),
  col({gap: 8, alignItems: 'center'}, h(Q.Avatar, {size: 'md'}), h('div', {style: {textAlign: 'center'}}, t('k', '56px', {fontSize: 13}), t('s', 'Medium, circle'))),
  col({gap: 8, alignItems: 'center'}, h('div', {className: 'tile', style: {position: 'relative', width: 96, height: 96, borderRadius: 12, background: 'var(--avatar-bg)', overflow: 'hidden'}},
    h('span', {style: {position: 'absolute', left: '50%', top: 20, width: 34, height: 34, marginLeft: -17, borderRadius: 17, background: 'var(--avatar-icon)'}}), h('span', {style: {position: 'absolute', left: '50%', top: 60, width: 70, height: 60, marginLeft: -35, borderRadius: '35px 35px 0 0', background: 'var(--avatar-icon)'}})),
    h('div', {style: {textAlign: 'center'}}, t('k', '300px', {fontSize: 13}), t('s', 'Large, square (shown smaller)')))));

function navpart(node, name) { return col({gap: 6, alignItems: 'center'}, node, sp('s', name, {fontSize: 10.5, whiteSpace: 'nowrap'})); }
viz('g7-nav', null, col({gap: 12},
  h('div', {className: 'row', style: {gap: 10, height: 40, padding: '0 12px', borderRadius: 8, background: 'var(--surface-neutral-100)', boxShadow: 'var(--shadow-nav)'}},
    ph(46, 14, {background: 'var(--qualys-red)', borderRadius: 3}), row({gap: 8, flex: 1}, [0, 1, 2, 3, 4, 5].map(function (i) { return ph(26, 6, {key: i, background: 'var(--charcoal)'}); })), row({gap: 6}, ph(22, 5), ph(22, 5)), ic('search', 14, 'var(--icon-default)'), h('span', {style: {width: 52, height: 20, borderRadius: 6, background: 'var(--qualys-red)'}})),
  h('div', {className: 'row', style: {justifyContent: 'space-between', padding: '0 4px'}}, sp('s', 'Logo'), sp('s', 'Up to six items'), sp('s', 'Utility links'), sp('s', 'Search'), sp('s', 'One CTA')),
  h('div', {className: 'row', style: {gap: 6, padding: '0 12px', height: 24}}, sp('k', 'Home', {fontSize: 11, color: 'var(--qualys-blue)'}), ic('chevron-right', 9, 'var(--rhino)'), sp('k', 'Blog', {fontSize: 11, color: 'var(--qualys-blue)'}), ic('chevron-right', 9, 'var(--rhino)'), sp('s', 'Current Page', {fontSize: 11, color: 'var(--text-primary)'}), h('span', {style: {flex: 1}}), sp('s', 'Breadcrumbs sit under the Nav')),
  h('div', {className: 'row', style: {gap: 12, borderTop: '1px solid var(--stroke-neutral-400)', paddingTop: 12}},
    h('div', {className: 'row', style: {justifyContent: 'space-between', width: 96, height: 30, padding: '0 8px', borderRadius: 6, background: 'var(--surface-neutral-100)', boxShadow: 'var(--shadow-nav)'}}, ph(30, 10, {background: 'var(--qualys-red)', borderRadius: 2}), ic('menu', 12, 'var(--icon-default)')),
    lab('Below 1200px', 'A menu button and a full-screen, drill-down menu'))));

function pmod(name, bg, hh, inv, dash) { return h('div', {key: name, className: 'row', style: {justifyContent: 'space-between', height: hh, padding: '0 12px', background: bg, borderBottom: dash ? '1px solid var(--stroke-neutral-400)' : 0}}, sp('k', name, {fontSize: 12, color: inv ? '#fff' : undefined}), null); }
viz('g7-modules', {display: 'grid', gridTemplateColumns: '210px 1fr', columnGap: 16, alignItems: 'center'},
  h('div', {style: {borderRadius: 8, overflow: 'hidden', border: '1px solid var(--stroke-neutral-400)'}},
    pmod('Nav', 'var(--surface-neutral-100)', 22, false, true), pmod('Hero', 'var(--surface-neutral-600)', 44, true), pmod('TypographicHeader', 'var(--surface-neutral-200)', 26, false, true), pmod('GeneralContent', 'var(--surface-neutral-100)', 34, false, true), pmod('TabModule', 'var(--surface-neutral-300)', 34, false, true), pmod('CtaModule', 'var(--surface-blue-100)', 30), pmod('Footer', 'var(--surface-neutral-600)', 26, true)),
  col({gap: 10}, lab('A page is a stack', 'Full-width modules on the 1140px column'), lab('One Hero', 'It carries the page’s only h1'), lab('One primary CTA', 'Per module')));

function statv(v, suf, label) { return col({key: label, gap: 4, flex: 1, alignItems: 'flex-start'}, h('div', {style: {fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 34, lineHeight: 1, letterSpacing: '-.005em', whiteSpace: 'nowrap'}}, v, sp('', suf, {color: 'var(--qualys-blue)'})), t('k', label, {fontSize: 12}), ph(88, 5, {marginTop: 2})); }
viz('g7-stats', null, col({gap: 10}, h('div', {className: 'white row', style: {gap: 16, padding: 16, alignItems: 'flex-start'}}, statv('150', '%', 'Faster Detection'), statv('10', 'x', 'Less Zero-day Threats'), statv('99.99', '%', 'More Accurate Scanning')),
  t('s', 'A number, a short label and one line of support. Three in a panel, or three to four as cards.')));

function mini(w) { return h('div', {style: {flex: 'none', width: w || 62, height: 44, borderRadius: 8, background: 'var(--surface-neutral-100)', border: '1px solid var(--stroke-neutral-400)', padding: 8}}, ph('70%', 6, {background: 'var(--charcoal)'}), ph('90%', 4, {marginTop: 5})); }
viz('g7-carousel', {display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 1px minmax(0,1fr)', columnGap: 18},
  col({gap: 8}, row({gap: 6}, mini(), mini(), mini()), lab('Three or fewer', 'A grid')),
  h('span', {style: {background: 'var(--stroke-neutral-400)'}}),
  col({gap: 8, minWidth: 0, overflow: 'hidden'}, h('div', {style: {display: 'flex', gap: 6, overflow: 'hidden'}}, mini(56), mini(56), mini(56), mini(56)), row({gap: 8}, h('div', {style: {flex: 1, height: 4, borderRadius: 2, background: 'var(--surface-neutral-400)'}}, h('span', {style: {display: 'block', width: '40%', height: 4, borderRadius: 2, background: 'var(--qualys-blue)'}})), ic('chevron-left', 12, 'var(--icon-default)'), ic('chevron-right', 12, 'var(--icon-default)')), lab('Four or more', 'A Carousel, moved by hand')));

function lph(w, hh) { return h('div', {className: 'logo-ph', style: {width: w, height: hh, flex: 'none', fontSize: 9}}, 'Logo'); }
viz('g7-logos', {display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 1px minmax(0,1fr)', columnGap: 18},
  col({gap: 8, minWidth: 0, overflow: 'hidden'}, h('div', {style: {display: 'flex', gap: 8, overflow: 'hidden', alignItems: 'center'}}, lph(46, 26), lph(46, 26), lph(46, 26), lph(46, 26), lph(46, 26)), row({gap: 6}, h('span', {className: 'tile', style: {width: 22, height: 22, borderRadius: 11, border: '1px solid var(--stroke-neutral-500)', gap: 3}}, h('i', {style: {width: 2.5, height: 8, background: 'var(--charcoal)'}}), h('i', {style: {width: 2.5, height: 8, background: 'var(--charcoal)'}})), sp('s', 'Pause button')), lab('LogoCarousel', 'Five or more customer logos, moving')),
  h('span', {style: {background: 'var(--stroke-neutral-400)'}}),
  col({gap: 6, alignItems: 'center'}, lph(84, 34), row({gap: 6}, lph(60, 26), lph(60, 26)), row({gap: 6}, lph(42, 20), lph(42, 20), lph(42, 20)), h('div', {style: {alignSelf: 'flex-start', marginTop: 2}}, lab('LogoHierarchy', 'Sponsors in tiers, highest first'))));

function vthumb(icon, name, body) { return col({gap: 6, flex: 1}, h('div', {style: {height: 72, padding: 6, borderRadius: 8, background: 'var(--surface-neutral-100)', border: '1px solid var(--stroke-neutral-400)', overflow: 'hidden'}}, body), row({gap: 6}, ic(icon, 14, 'var(--qualys-blue)'), sp('k', name, {fontSize: 13}))); }
viz('g7-calendar', null, row({gap: 12, alignItems: 'flex-start'},
  vthumb('view-month', 'Month', h('div', {style: {display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 2, height: '100%'}}, Array.apply(null, Array(21)).map(function (_, i) { return h('span', {key: i, style: {background: 'var(--surface-neutral-300)', borderRadius: 2, position: 'relative'}}, (i === 2 || i === 9 || i === 10 || i === 17) ? h('i', {style: {position: 'absolute', left: i === 10 ? 0 : 2, right: i === 9 ? 0 : 2, bottom: 3, height: 5, borderRadius: 2, background: i === 2 ? 'var(--qualys-red)' : i === 17 ? 'var(--event-speaking)' : 'var(--qualys-blue)'}}) : null); }))),
  vthumb('view-list', 'List', col({gap: 4}, ph(40, 5, {background: 'var(--charcoal)'}), h('div', {style: {height: 12, borderRadius: 3, border: '1px solid var(--stroke-neutral-400)'}}), h('div', {style: {height: 12, borderRadius: 3, border: '1px solid var(--stroke-neutral-400)'}}), ph(40, 5, {background: 'var(--charcoal)', marginTop: 2}), h('div', {style: {height: 12, borderRadius: 3, border: '1px solid var(--stroke-neutral-400)'}}))),
  vthumb('view-grid', 'Grid', h('div', {style: {display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 4, height: '100%'}}, [0, 1, 2, 3, 4, 5].map(function (i) { return h('span', {key: i, style: {borderRadius: 3, border: '1px solid var(--stroke-neutral-400)', background: i === 5 ? 'var(--charcoal)' : 'var(--surface-neutral-200)'}}); })))));

viz('g7-modals', {display: 'grid', gridTemplateColumns: '210px 1fr', columnGap: 0, alignItems: 'center'},
  h('div', {style: {padding: 12, borderRadius: 12, background: 'var(--surface-neutral-100)', boxShadow: 'var(--shadow-modal)'}},
    row({justifyContent: 'space-between'}, ph(84, 9, {background: 'var(--charcoal)'}), ic('cross', 14, 'var(--icon-default)')), h('div', {style: {margin: '10px 0', borderTop: '1px solid var(--stroke-neutral-400)'}}), ph('100%', 5), ph('80%', 5, {marginTop: 5}),
    row({gap: 6, justifyContent: 'flex-end', marginTop: 14}, h('span', {style: {width: 46, height: 18, borderRadius: 5, border: '1.5px solid var(--qualys-red)'}}), h('span', {style: {width: 46, height: 18, borderRadius: 5, background: 'var(--qualys-red)'}}))),
  h('div', {style: {display: 'grid', rowGap: 15, paddingLeft: 0}}, t('note cap', 'Title and close'), t('note cap', 'Body'), t('note cap', 'Buttons right, primary last')));

function ntf(node, name, sub) { return col({gap: 6, flex: 1, alignItems: 'flex-start'}, h('div', {className: 'row', style: {height: 46, width: '100%', justifyContent: 'center'}}, node), h('div', null, t('k', name, {fontSize: 12}), t('s', sub, {fontSize: 11}))); }
viz('g7-notifications', null, col({gap: 10},
  row({gap: 10, alignItems: 'flex-start'},
    ntf(h('span', {style: {padding: '4px 8px', borderRadius: 6, background: 'var(--surface-neutral-600)', color: '#fff', fontSize: 10, fontWeight: 500}}, 'A few words'), 'Tooltip', 'About one control'),
    ntf(h('div', {className: 'row', style: {gap: 5, width: 84, height: 26, paddingLeft: 8, borderRadius: 6, background: '#fff', boxShadow: 'var(--shadow-dropdown)', borderLeft: '3px solid var(--utility-success-default)'}}, ic('check-circle', 11, 'var(--utility-success-default)'), ph(40, 4)), 'Toast', 'Result of an action'),
    ntf(h('div', {className: 'row', style: {gap: 5, width: 96, height: 18, padding: '0 6px', borderRadius: 5, background: '#fff', border: '1px solid var(--stroke-neutral-400)'}}, ic('alert-circle', 10, 'var(--qualys-blue)'), ph(54, 4)), 'NotificationBar', 'News for the whole site'),
    ntf(h('div', {style: {width: 70, padding: 6, borderRadius: 6, background: '#fff', boxShadow: 'var(--shadow-dropdown)'}}, ph(36, 5, {background: 'var(--charcoal)'}), ph(54, 3, {marginTop: 4}), row({gap: 3, justifyContent: 'flex-end', marginTop: 5}, h('span', {style: {width: 16, height: 7, borderRadius: 2, background: 'var(--qualys-red)'}}))), 'Dialog', 'Needs an answer')),
  row({gap: 8}, sp('cap', 'Interrupts less'), h('span', {style: {flex: 1, height: 4, borderRadius: 2, background: 'linear-gradient(90deg, var(--misty-blue), var(--qualys-blue))'}}), sp('cap', 'More'))));

viz('g7-cookie', null, row({gap: 10},
  col({gap: 6, flex: 1}, h('div', {className: 'row', style: {gap: 6, height: 30, padding: '0 8px', borderRadius: 6, background: '#fff', boxShadow: 'var(--shadow-dropdown)'}}, ic('cookie', 12, 'var(--icon-default)'), ph(54, 4, {flex: 1}), h('span', {style: {width: 22, height: 10, borderRadius: 3, border: '1px solid var(--qualys-red)'}}), h('span', {style: {width: 22, height: 10, borderRadius: 3, background: 'var(--qualys-red)'}})), lab('Compact bar', 'On the first visit')),
  col({gap: 4, alignItems: 'center', width: 96}, arrow(), sp('s', 'Manage Preferences', {fontSize: 10.5, textAlign: 'center'})),
  col({gap: 6, flex: 1}, h('div', {style: {padding: 8, borderRadius: 8, background: '#fff', boxShadow: 'var(--shadow-dropdown)'}}, ph(60, 6, {background: 'var(--charcoal)'}), [true, false, false].map(function (on, i) { return row({key: i, gap: 6, marginTop: 6}, h('span', {style: {width: 18, height: 10, borderRadius: 5, background: on ? 'var(--qualys-blue)' : 'var(--surface-neutral-400)'}}), ph(60, 4)); })), lab('Preferences panel', 'A switch per category'))));

viz('g7-forms', null, col({gap: 12}, h('div', {style: {display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: 10, alignItems: 'start'}},
  col({gap: 6}, h(Q.TextField, {label: 'Work Email'}), t('cap', 'Empty')),
  col({gap: 6}, h(Q.TextField, {label: 'Work Email', defaultValue: 'a@acme.com'}), t('cap', 'Filled: label floats')),
  col({gap: 6}, h(Q.TextField, {label: 'Work Email', defaultValue: 'ada@', error: 'Enter a valid email'}), t('cap', 'Error'))),
  row({gap: 12}, h(Q.Button, {size: 'sm'}, 'Sign Up'), sp('s', 'One primary button per form'))));

viz('g7-filters', {display: 'flex', flexDirection: 'column', gap: 12},
  col({gap: 6}, t('cap', 'Filter cloud: every filter as a chip with its count'), row({gap: 6, flexWrap: 'wrap'}, h(Q.FilterChip, {size: 'sm', count: 24, active: true}, 'Cloud'), h(Q.FilterChip, {size: 'sm', count: 12}, 'Compliance'), h(Q.FilterChip, {size: 'sm', count: 1250}, 'Vulnerability'), h(Q.FilterChip, {size: 'sm', count: 0, disabled: true}, 'Risk'))),
  col({gap: 6, borderTop: '1px solid var(--stroke-neutral-400)', paddingTop: 12}, t('cap', 'Filter dropdowns: five categories at most'), h('div', {className: 'row nowrap', style: {gap: 12, zoom: 0.7}}, h(Q.FilterDropdown, {label: 'Event Type', options: ['Webinar']}), h(Q.FilterDropdown, {label: 'Format', options: ['Online']}), h(Q.TextLink, {tone: 'blue'}, 'Reset Filters'))),
  t('s', 'On mobile both move into the FilterDrawer and apply together.'));

function lvl(name, sub, node, bg) { return h('div', {key: name, className: 'row', style: {gap: 12, padding: '10px 12px', borderRadius: 8, background: bg, border: '1px solid var(--stroke-neutral-400)'}}, h('div', {className: 'row', style: {width: 150, flex: 'none', gap: 6}}, node), lab(name, sub)); }
viz('g7-levels', null, col({gap: 6},
  lvl('Block modules', 'Full-width page sections. Reach for these first.', h('div', {style: {width: 140, height: 30, borderRadius: 4, background: 'var(--surface-neutral-600)', padding: 6}}, ph(50, 6, {background: '#fff'}), ph(26, 7, {background: 'var(--qualys-red)', marginTop: 5})), 'var(--surface-neutral-100)'),
  lvl('Patterns', 'Components combined for one task.', h('div', {style: {width: 96, padding: 6, borderRadius: 6, background: 'var(--surface-neutral-200)', border: '1px solid var(--stroke-neutral-400)'}}, h('div', {style: {height: 9, borderRadius: 3, background: '#fff', border: '1px solid var(--stroke-neutral-400)'}}), h('div', {style: {height: 9, marginTop: 3, borderRadius: 3, background: '#fff', border: '1px solid var(--stroke-neutral-400)'}}), ph(30, 7, {background: 'var(--qualys-red)', marginTop: 4})), 'var(--surface-neutral-100)'),
  lvl('Components', 'Single parts. Fill what is left.', [h('span', {key: 1, style: {width: 40, height: 16, borderRadius: 5, background: 'var(--qualys-red)'}}), h('span', {key: 2, style: {width: 26, height: 12, borderRadius: 3, background: 'var(--qualys-blue)'}}), h('span', {key: 3, style: {width: 14, height: 14, borderRadius: 3, border: '1.5px solid var(--stroke-neutral-500)'}})], 'var(--surface-neutral-100)')));
