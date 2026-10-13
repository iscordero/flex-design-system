/* ───────── Guide 3: Typography ───────── */
function famcol(font, weight, name, token, uses) { return col({gap: 6},
  h('div', {style: {fontFamily: font, fontWeight: weight, fontSize: 52, lineHeight: 1, letterSpacing: '-.02em'}}, 'Aa'),
  h('div', {style: {marginTop: 6}}, t('k', name), t('s', token)), t('s', uses, {color: 'var(--text-primary)'})); }
viz('g3-families', {display: 'grid', gridTemplateColumns: '1fr 1px 1fr', columnGap: 20},
  famcol('var(--font-heading)', 700, 'Wix Madefor Text', 'font-heading', 'Display, headings, titles, tags, eyebrows, stats, button labels'),
  h('span', {style: {background: 'var(--stroke-neutral-400)'}}),
  famcol('var(--font-body)', 400, 'IBM Plex Sans', 'font-body', 'Paragraphs, labels, quotes'));

function ladder(rows, gap) { return h('div', {className: 'grid2', style: {gridTemplateColumns: '1fr auto', rowGap: gap || 10, alignItems: 'baseline'}}, rows.map(function (r, i) { return [h('span', {key: 'a' + i, style: {minWidth: 0, whiteSpace: 'nowrap'}}, r[0]), h('span', {key: 'b' + i, className: 's', style: {whiteSpace: 'nowrap', textAlign: 'right'}}, sp('mono', r[1]), r[2] ? '  ' + r[2] : null)]; })); }
viz('g3-display', null, ladder([
  [ty('display-xl', 'Cut Risk'), 'display-xl', '64 Bold'],
  [ty('display-lg', 'Cut Risk'), 'display-lg', '56 Bold']], 12));
viz('g3-headings', null, ladder([
  [ty('h1', 'Reduce Risk'), 'h1', '44 Bold'], [ty('h2', 'Reduce Risk'), 'h2', '38 SemiBold'], [ty('h3', 'Reduce Risk'), 'h3', '24 SemiBold'], [ty('h4', 'Reduce Risk'), 'h4', '20 SemiBold'], [ty('h5', 'Reduce Risk'), 'h5', '18 SemiBold']], 8));
viz('g3-paragraphs', null, ladder([
  [ty('paragraph-lg', 'A single source of truth.'), 'paragraph-lg', '24'], [ty('paragraph-md', 'A single source of truth.'), 'paragraph-md', '18'], [ty('paragraph-rg', 'A single source of truth.'), 'paragraph-rg', '16'], [ty('paragraph-sm', 'A single source of truth.'), 'paragraph-sm', '14'], [ty('paragraph-xs', 'A single source of truth.'), 'paragraph-xs', '12']], 8));
viz('g3-titles', null, ladder([
  [ty('title-md', 'Profile Name'), 'title-md', '20 SemiBold'], [ty('title-rg', 'Profile Name'), 'title-rg', '18 SemiBold'], [ty('title-sm', 'Profile Name'), 'title-sm', '16 SemiBold']], 8));
viz('g3-tags', null, h('div', {className: 'grid2', style: {gridTemplateColumns: '1fr auto', rowGap: 12}},
  h(Q.Tag, {variant: 'text'}, 'Vulnerability Management'), h('span', {className: 's'}, sp('mono', 'tag-md'), '  18 Medium, text tags'),
  h('span', null, h(Q.Flag, {tone: 'tier-1'}, 'Upcoming')), h('span', {className: 's'}, sp('mono', 'tag-rg'), '  16 Medium, flags'),
  h('span', null, h(Q.Tag, {tone: 'blue'}, 'New')), h('span', {className: 's'}, sp('mono', 'tag-sm'), '  14 Bold, badges'),
  h('span', null, h(Q.Tag, {tone: 'blue', size: 'sm'}, 'New')), h('span', {className: 's'}, sp('mono', 'tag-xs'), '  12 Bold, small badges')));
function eb(name, upper) { return ty(name, upper ? 'Cloud Platform' : 'Cloud Platform', {textTransform: upper ? 'uppercase' : 'none', color: 'var(--text-accent-primary)'}); }
viz('g3-eyebrows', null, ladder([
  [eb('eyebrow-xl', false), 'eyebrow-xl', '22, Title Case'], [eb('eyebrow-lg', true), 'eyebrow-lg', '18'], [eb('eyebrow-md', true), 'eyebrow-md', '16'], [eb('eyebrow-sm', true), 'eyebrow-sm', '14'], [eb('eyebrow-xs', true), 'eyebrow-xs', '12']], 10));
function wrow(font, w, name, uses) { return [h('span', {key: w, style: {fontFamily: font, fontWeight: w, fontSize: 22, lineHeight: 1.1, letterSpacing: '-.01em', whiteSpace: 'nowrap'}}, name + ' ' + w), sp('s', uses, {key: w + 'u'})]; }
viz('g3-weights', null, h('div', {className: 'grid2', style: {gridTemplateColumns: '150px 1fr', rowGap: 10}},
  wrow('var(--font-body)', 400, 'Regular', 'Paragraphs, supporting text, field text'),
  wrow('var(--font-body)', 500, 'Medium', 'UI labels, flags, dates and times'),
  wrow('var(--font-heading)', 600, 'SemiBold', 'Links, button text, emphasis, names, eyebrows'),
  wrow('var(--font-heading)', 700, 'Bold', 'Display, h1, stats, small tags')));
viz('g3-misc', {display: 'grid', gridTemplateColumns: 'auto auto 1fr', columnGap: 16, alignItems: 'end'},
  col({gap: 6}, ty('stat-lg', '98%'), h('span', {className: 's'}, sp('mono', 'stat-lg'), '  86')),
  col({gap: 6}, ty('stat-md', '98%'), h('span', {className: 's'}, sp('mono', 'stat-md'), '  64')),
  col({gap: 4, alignItems: 'flex-end', textAlign: 'right'}, ty('quote-lg', '“Aa”'), ty('quote-md', '“Aa”'), ty('quote-sm', '“Aa”'), h('span', {className: 's', style: {whiteSpace: 'nowrap'}}, sp('mono', 'quote'), '  32, 24, 20')));
