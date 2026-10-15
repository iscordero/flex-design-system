/* Guide 8: Buttons and links. Every example uses the real components. */
function stage(node, style) { return h('div', {className: 'white row', style: Object.assign({justifyContent: 'center', minHeight: 72, padding: 16, gap: 8, flexWrap: 'wrap'}, style)}, node); }
function pairDD(good, goodText, bad, badText, gs, bs) {
  return col({gap: 12}, col({gap: 6}, stage(good, gs), dd(true, goodText)), col({gap: 6}, stage(bad, bs), dd(false, badText)));
}
function B(text, variant, extra) { return h(Q.Button, Object.assign({key: text + (variant || ''), size: 'sm', variant: variant || 'primary', tabIndex: -1}, extra), text); }
function frag() { return h.apply(null, [React.Fragment, null].concat(kids(arguments, 0))); }
function tierRow(name, sub, node) { return h('div', {className: 'row', style: {gap: 14, padding: '12px 14px', borderTop: '1px solid var(--stroke-neutral-400)'}}, h('div', {style: {width: 128, flex: 'none'}}, t('k', name), t('s', sub)), row({gap: 8, flex: 1, flexWrap: 'nowrap'}, node)); }
viz('g8-tiers', null, h('div', {className: 'white', style: {overflow: 'hidden'}},
  h('div', {style: {padding: '10px 14px'}}, t('s', 'Tier decides priority · color decides emphasis · icon decides clarity')),
  tierRow('Tier 1 · Primary', 'Conversion', frag(B('Get a Demo'), B('Download', 'primary', {iconLeft: 'download'}))),
  tierRow('Tier 2 · Secondary', 'Supportive', frag(B('Learn More', 'secondary'), B('Join Waitlist', 'secondary-alt'))),
  tierRow('Tier 3 · Utility', 'Navigation and status', frag(h(Q.TextLink, {tone: 'blue', size: 'sm', href: '#'}, 'Show All'), h(Q.TextLink, {tone: 'blue', size: 'sm', arrow: true, href: '#'}, 'Next')))));
viz('g8-case', null, pairDD(frag(B('Try Now'), B('Speak to an Expert', 'secondary')), 'Title Case for every label.', frag(B('Try now'), B('speak to an expert', 'secondary')), 'Mixed cases.'));
viz('g8-gap', null, pairDD(frag(B('Try Now'), B('Speak to an Expert', 'secondary')), '8px (spacing-3xs) between a pair.', row({gap: 96}, B('Try Now'), B('Speak to an Expert', 'secondary')), 'Spread too far apart.'));
viz('g8-length', null, pairDD(B('Sign Up for Access'), 'Under 20 characters.', B('sign up to our newsletter for exclusive access'), 'A sentence where a few words will do.'));
viz('g8-pair', null, pairDD(frag(B('Large Button'), B('Large Button', 'secondary')), 'A primary with a less prominent button or link.', frag(B('Large Button'), B('Large Button')), 'Two primaries side by side.'));
viz('g8-count', null, pairDD(frag(B('Speak to an Expert'), B('View Data Sheet', 'secondary')), 'Two buttons at most in a row.', frag(B('Try Now'), B('Contact Us', 'secondary'), B('View Data Sheet')), 'Three buttons, two of them primary.', null, {flexWrap: 'nowrap'}));
viz('g8-verbs', null, pairDD(B('View Data Sheet', 'secondary'), 'A verb that says what happens.', B('Datasheet', 'secondary'), 'A noun or a passive label.'));
function pill(filled, w) { return h('span', {style: {display: 'block', width: w || 44, height: 14, borderRadius: 5, boxSizing: 'border-box', background: filled ? 'var(--qualys-red)' : 'transparent', border: filled ? 0 : '1.5px solid var(--qualys-red)'}}); }
function wire(manyPrimary) {
  return h('div', {className: 'white', style: {flex: 1, padding: 10}},
    row({gap: 6, justifyContent: 'space-between'}, ph(18, 12), row({gap: 4}, ph(18, 4), ph(18, 4), ph(18, 4)), pill(true, 34)),
    col({gap: 4, alignItems: 'center', marginTop: 14}, ph(110, 5), ph(90, 5), h('div', {style: {marginTop: 8}}, pill(true, 60))),
    col({gap: 4, alignItems: 'center', marginTop: 14}, ph(110, 4), ph(110, 4)),
    row({gap: 8, justifyContent: 'center', marginTop: 12}, pill(manyPrimary, 40), pill(manyPrimary, 40), pill(manyPrimary, 40)));
}
viz('g8-hierarchy', {display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 14},
  col({gap: 6}, wire(false), dd(true, 'One primary for the conversion; "Read More" as secondaries.')),
  col({gap: 6}, wire(true), dd(false, 'Primaries on every action compete with each other.')));
function phone(children) { return h('div', {style: {width: 190, padding: 12, borderRadius: 14, border: '1px solid var(--stroke-neutral-400)', background: 'var(--surface-neutral-200)'}}, children); }
viz('g8-mobile', {display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 14, justifyItems: 'center'},
  col({gap: 8, alignItems: 'center'}, phone(col({gap: 7},
      h('div', {className: 'k', style: {fontSize: 12, textAlign: 'center'}}, 'Try Qualys for Free'),
      ph('100%', 22, {background: '#fff', border: '1px solid var(--stroke-neutral-400)'}), ph('100%', 22, {background: '#fff', border: '1px solid var(--stroke-neutral-400)'}), ph('100%', 22, {background: '#fff', border: '1px solid var(--stroke-neutral-400)'}),
      h('div', {style: {display: 'flex'}}, h(Q.Button, {size: 'sm', tabIndex: -1, style: {width: '100%'}}, 'Sign Up')))), lab('Tier 1', 'Full width, label centered', {textAlign: 'center'})),
  col({gap: 8, alignItems: 'center'}, phone(col({gap: 7},
      h('div', {className: 'white', style: {padding: 8}}, ph('80%', 6, {background: 'var(--charcoal)'}), ph('60%', 5, {marginTop: 6})),
      h('div', {className: 'white', style: {padding: 8}}, ph('100%', 34), ph('70%', 6, {marginTop: 6, background: 'var(--charcoal)'})),
      h('div', {style: {display: 'flex', justifyContent: 'center'}}, B('Load More', 'secondary')))), lab('Tier 2', 'As wide as its label', {textAlign: 'center'})));
var COPY = 'Organizations face millions of exposed assets. A ROC builds on the threats CTEM programs find with ';
viz('g8-underline', null, pairDD(h('p', {className: 'paragraph-sm', style: {margin: 0}}, COPY, h(Q.Hyperlink, {href: '#'}, 'cyber risk quantification (CRQ)'), '.'), 'Blue, SemiBold and underlined.',
  h('p', {className: 'paragraph-sm', style: {margin: 0}}, COPY, h('span', {style: {color: 'var(--hyperlink-default)', fontWeight: 600}}, 'cyber risk quantification (CRQ)'), '.'), 'Color alone, with no underline.', {justifyContent: 'flex-start'}, {justifyContent: 'flex-start'}));
viz('g8-sources', null, pairDD(h('span', {className: 'paragraph-sm'}, 'Source: ', h(Q.Hyperlink, {href: '#'}, 'https://cloudsec.com/blog')), 'Sources are links too: blue and underlined.',
  h('span', {className: 'paragraph-sm'}, 'Source: ', h('b', null, 'https://cloudsec.com/blog')), 'A bold URL that doesn’t look clickable.'));
var BLUE = {background: 'var(--qualys-blue)', border: 0};
viz('g8-inverted', null, pairDD(h('span', {className: 'paragraph-sm', style: {color: '#fff'}}, 'Source: ', h(Q.Hyperlink, {href: '#', tone: 'inverted'}, 'https://cloudsec.com/blog')), 'On blue or dark grounds: white and underlined.',
  h('span', {className: 'paragraph-sm', style: {color: '#fff'}}, 'Source: ', h('b', null, 'https://cloudsec.com/blog')), 'White with no underline.', BLUE, BLUE));
viz('g8-urls', null, pairDD(h('span', {className: 'paragraph-sm'}, h(Q.Hyperlink, {href: '#'}, 'https://cloudsec.com/blog/enterprise-risk-management-guide')), 'Short and clean.',
  h('span', {className: 'paragraph-sm', style: {overflowWrap: 'anywhere'}}, h(Q.Hyperlink, {href: '#'}, 'https://cloudsec.com/blog/enterprise-risk-management-guide/amkwga?3tgaAoTflHAag?MCMsg4lto3Q&source=agl5?KSH3aLA45w6t27890gAeHLfA')), 'Tracking strings and extra characters.'));
viz('g8-descriptive', null, pairDD(h('p', {className: 'paragraph-sm', style: {margin: 0}}, 'To expand its offering, ', h(Q.Hyperlink, {href: '#'}, 'Hero Group'), ' is driving an acquisitive growth strategy.'), 'The link names its destination.',
  h('p', {className: 'paragraph-sm', style: {margin: 0}}, 'Hero Group is driving an acquisitive growth strategy. To read more, ', h(Q.Hyperlink, {href: '#'}, 'click here'), '.'), '“Click here” says nothing about where it goes.', {justifyContent: 'flex-start'}, {justifyContent: 'flex-start'}));
function navlist(title, items, hot) { return col({gap: 8, alignItems: 'flex-start'}, t('k', title, {fontSize: 13}), items.map(function (x, i) { return h(Q.TextLink, {key: x, tone: 'neutral', size: 'sm', arrow: i === hot, className: i === hot ? 'is-hover' : undefined, href: '#', style: {fontFamily: 'var(--font-body)', fontWeight: 500, whiteSpace: 'nowrap'}}, x); })); }
viz('g8-navlinks', null, col({gap: 6}, stage(row({gap: 40, alignItems: 'flex-start'}, navlist('Compliance', ['Policy Audit', 'File Integrity Monitoring'], 1), navlist('Asset Management', ['Asset Inventory', 'Attack Surface'], -1))), dd(true, 'In a list that works as navigation, the hovered link shows an arrow.')));
viz('g8-textlink', null, pairDD(
  h('div', {className: 'white', style: {width: 220, padding: 14, boxShadow: 'var(--shadow-card)', border: 0}}, asset('Feature Icons/feature-cloud.svg', {display: 'block', width: 28, height: 28}), h('div', {className: 'k', style: {marginTop: 8, fontSize: 15}}, 'This Is a Heading'), h('p', {className: 's', style: {margin: '6px 0 12px'}}, 'Lorem ipsum dolor sit amet consectetur. Vel tincidunt nibh faucibus.'), h(Q.TextLink, {tone: 'neutral', size: 'sm', arrow: true, href: '#'}, 'Textlink Button')),
  'At the foot of the card, outside the copy.',
  h('p', {className: 'paragraph-sm', style: {margin: 0}}, 'To expand its offering, ', h(Q.TextLink, {tone: 'neutral', size: 'sm', arrow: true, href: '#'}, 'Hero Group'), ' is driving an acquisitive growth strategy.'),
  'A text link button with its arrow inside a sentence.', {background: 'var(--surface-neutral-300)'}, {justifyContent: 'flex-start'}));
