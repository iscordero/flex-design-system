/* ───────── Guide 1: Content ───────── */
viz('g1-address', {display: 'flex', flexDirection: 'column', gap: 10},
  dd(true, 'The Qualys Cloud Platform gives ', hl('your team'), ' a single source of truth across ', hl('your'), ' environment.'),
  dd(false, bad('We'), ' give ', bad('users'), ' a single source of truth across ', bad('their'), ' environment.'));

viz('g1-casing', null, h('div', {className: 'grid2', style: {gridTemplateColumns: '104px 1fr', rowGap: 14}},
  t('cap', 'Title Case'), ty('h5', 'Detect, Prioritize, and Eliminate Risk', {whiteSpace: 'nowrap'}),
  t('cap', 'Sentence case'), ty('paragraph-rg', 'A single source of truth for your team.', {color: 'var(--text-secondary)'}),
  t('cap', 'All caps'), row({gap: 12}, h(Q.Tag, {tone: 'blue', size: 'sm'}, 'New'), ty('eyebrow-sm', 'Cloud Platform', {textTransform: 'uppercase', color: 'var(--text-accent-primary)'}))));

viz('g1-length', null, h('div', {className: 'vo', style: {gridTemplateColumns: '1fr 140px'}},
  ty('h5', 'Detect, Prioritize, and Eliminate Risk', {whiteSpace: 'nowrap', fontSize: 16}),
  t('note cap', 'Under ten words'),
  ty('paragraph-sm', 'The Qualys Cloud Platform gives your team a single source of truth across your entire hybrid IT environment.', {color: 'var(--text-secondary)'}),
  t('note cap', '1 to 3 sentences')));

viz('g1-ctas', {display: 'flex', flexDirection: 'column', gap: 14},
  h('div', {className: 'row nowrap', style: {gap: 10}}, h(Q.Button, {size: 'sm'}, 'Get a Demo'), h(Q.Button, {size: 'sm', variant: 'secondary'}, 'Get Started'), h(Q.Button, {size: 'sm', variant: 'secondary'}, 'Register Now')),
  h('div', {className: 'row nowrap', style: {gap: 20}}, h(Q.TextLink, {size: 'sm', arrow: true}, 'Learn More'), h(Q.TextLink, {size: 'sm', arrow: true}, 'Explore the Platform'), h(Q.TextLink, {size: 'sm', arrow: true}, 'Download Report')),
  h('div', {style: {borderTop: '1px solid var(--stroke-neutral-400)', paddingTop: 12}}, dd(false, 'Passive labels: ', bad('More Information'), ', ', bad('Demo Request'))));

viz('g1-numbers', {display: 'grid', gridTemplateColumns: '1fr 1px 1fr', columnGap: 20, alignItems: 'center'},
  col({gap: 8}, t('cap', 'Running copy'), ty('paragraph-rg', ['Set up in ', hl('three'), ' steps.'])),
  h('span', {style: {alignSelf: 'stretch', background: 'var(--stroke-neutral-400)'}}),
  col({gap: 6}, t('cap', 'Stats, data, UI labels'), row({gap: 8, alignItems: 'baseline'}, ty('h1', '3,847', {lineHeight: 1}), ty('paragraph-rg', 'patched', {color: 'var(--text-secondary)'}))));

viz('g1-punct', {display: 'flex', flexDirection: 'column', gap: 12},
  h('div', {className: 'grid2', style: {gridTemplateColumns: '104px 1fr', rowGap: 12}},
    t('cap', 'Oxford comma'), ty('paragraph-rg', ['Detect, Prioritize', hl(','), ' and Eliminate Risk']),
    t('cap', 'Em dash'), ty('paragraph-rg', ['One platform ', hl('—'), ' every asset.'])),
  h('div', {style: {borderTop: '1px solid var(--stroke-neutral-400)', paddingTop: 12}}, dd(false, 'One platform ', bad('-'), ' every asset.')));

viz('g1-dates', null, h('div', {className: 'grid2', style: {gridTemplateColumns: '112px 1fr', rowGap: 10}},
  [['Long date', 'Mon Dec 9, 2024'], ['Short date', 'Dec 9, 2024'], ['Date and time', 'Mon Dec 9, 2024  10:00 – 11:00a PST'], ['Time range', '8:00 AM – 12:00 PM'], ['Event card', 'Dec 10, 2026 • 11a PST']].map(function (r) {
    return [t('cap', r[0], {key: r[0] + 'l'}), h('span', {key: r[0], style: {fontFamily: 'var(--font-body)', fontWeight: 500, fontSize: 15, lineHeight: 1.3, letterSpacing: '-.01em', whiteSpace: 'pre'}}, r[1])]; })));
