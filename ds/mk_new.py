# Retired: the READMEs and previews this script once generated are now edited directly, so running it would undo later changes.
# Kept for history only.
raise SystemExit("Retired: edit project/components/<Name>/README.md and preview.html directly.")
import os
C = 'project/components'
FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Wix+Madefor+Text:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600&display=swap">'
BASE = "html,body{margin:0}body{font-family:var(--font-body);color:var(--text-primary);background:%s}.cap{padding:var(--spacing-xl) var(--spacing-xl) var(--spacing-xs);font-family:var(--font-heading);font-weight:600;font-size:12px;letter-spacing:.05em;text-transform:uppercase;color:var(--text-secondary)}.phones{display:flex;align-items:flex-start;gap:var(--spacing-xl);padding:0 var(--spacing-xl) var(--spacing-xl)}.phone{flex:none;width:375px;box-shadow:var(--shadow-card)}.phone.w390{width:390px}.row{display:flex;flex-wrap:wrap;align-items:flex-start;gap:var(--spacing-xl);padding:0 var(--spacing-xl) var(--spacing-xl)}"
def page(name, group, height, width, subtitle, css, js, bg='var(--surface-neutral-100)'):
    assert len(subtitle) <= 120, (name, len(subtitle))
    html = '<!-- @dsCard group="%s" height=%d width=%d subtitle="%s" -->\n<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>%s — preview</title>\n%s\n<style>%s%s</style>\n</head>\n<body>\n<div id="root"></div>\n<script>\nvar Q = window.Qualys, h = React.createElement;\nfunction cap(t) { return h(\'div\', {className: \'cap\'}, t); }\n%s\n</script>\n</body>\n</html>\n' % (group, height, width, subtitle, name, FONTS, BASE % bg, css, js.strip())
    os.makedirs(os.path.join(C, name), exist_ok=True)
    open(os.path.join(C, name, 'preview.html'), 'w').write(html)
def readme(name, text):
    os.makedirs(os.path.join(C, name), exist_ok=True)
    open(os.path.join(C, name, 'README.md'), 'w').write(text.strip() + '\n')

LOGOFN = r"""
function logo(n) {
  var marks = ['<circle cx="20" cy="20" r="14"/>', '<rect x="6" y="6" width="28" height="28" rx="6"/>', '<path d="M20 4L36 34H4Z"/>', '<path d="M20 4L36 20L20 36L4 20Z"/>', '<rect x="4" y="12" width="32" height="16" rx="8"/>', '<path d="M6 6H34V20A14 14 0 0 1 6 20Z"/>'];
  var names = ['Company', 'Customer', 'Partner', 'Sponsor', 'Client', 'Brand'];
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 190 40" width="190" height="40"><g fill="%23575757">' + marks[n % 6] + '</g><text x="48" y="27" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="20" fill="%23575757">' + names[n % 6] + ' ' + (n + 1) + '</text></svg>';
  return 'data:image/svg+xml;utf8,' + svg.replace(/</g, '%3C').replace(/>/g, '%3E').replace(/"/g, "'");
}
var NAMES = ['Company', 'Customer', 'Partner', 'Sponsor', 'Client', 'Brand'];
"""

# ── HoverCard ──
page('HoverCard', 'Components · Overlays and messages', 1069, 1100, 'Component · A small card on hover, click or tap: a logo card and a profile card. The last row is live.',
 ".slot{display:flex;align-items:center;justify-content:center;width:44px;height:44px;box-sizing:border-box;border:1px dashed var(--stroke-neutral-500);border-radius:50%;font-family:var(--font-heading);font-weight:600;font-size:10px;color:var(--text-secondary)}.pv{background:var(--surface-neutral-300);padding-bottom:var(--spacing-xl)}.row{padding-bottom:var(--spacing-rg)}.live{align-items:center;gap:var(--spacing-4xl);min-height:330px;align-items:flex-start}.tile{display:flex;align-items:center;justify-content:center;width:200px;height:80px;padding:16px;box-sizing:border-box;border:0;border-radius:var(--radius-md);background:var(--surface-neutral-100);cursor:pointer}.tile img{display:block;max-width:100%;max-height:100%}.tile:focus-visible{outline:none;box-shadow:var(--focus-ring)}",
 LOGOFN + r"""
var BODY = 'A short line on what this partner brings to Qualys customers. Two or three lines at most.';
function badge() { return h('span', {className: 'slot'}, 'Badge'); }
function partner(n, extra) { return Object.assign({kind: 'logo', logo: logo(n), logoAlt: NAMES[n] + ' ' + (n + 1), badge: badge(), title: NAMES[n] + ' ' + (n + 1), body: BODY, link: {label: 'View Partner', href: '#'}}, extra); }
var QLOGO = '/_blob/a0d4062abbce2ceb87d5be08d326359f';
var JORDAN = {kind: 'profile', name: 'Jordan Rivera', designation: 'Director of Product Security, Qualys', company: 'Qualys', logo: QLOGO, logoAlt: 'Qualys', link: {href: '#'}};
var ALEX = {kind: 'profile', name: 'Alexandra Montgomery-Whitfield', designation: 'CISO and SVP Security Solution Architecture, Qualys', company: 'Qualys', logo: QLOGO, logoAlt: 'Qualys', link: {href: '#'}};
ReactDOM.createRoot(document.getElementById('root')).render(h('div', {className: 'pv'},
  cap('Logo card: logo, badge, name, copy, one link'), h('div', {className: 'row'},
    h(Q.HoverCard, partner(2, {inline: true})),
    h(Q.HoverCard, partner(0, {inline: true, badge: null})),
    h(Q.HoverCard, partner(4, {inline: true, badge: null, link: null}))),
  cap('Profile card: headshot, name, role; company logo and LinkedIn button in the foot; close icon top right'), h('div', {className: 'row'},
    h(Q.HoverCard, Object.assign({inline: true}, JORDAN)),
    h(Q.HoverCard, Object.assign({inline: true}, ALEX)),
    h(Q.HoverCard, {inline: true, kind: 'profile', name: 'Sam Okafor', designation: 'Security Architect', company: 'Qualys'})),
  cap('Live: point at, click or tab to these. A clicked profile card stays open, and the other headshot waits until it is closed'), h('div', {className: 'row live'},
    h(Q.HoverCard, partner(2), h('button', {type: 'button', className: 'tile', 'aria-label': 'Partner 3: details'}, h('img', {src: logo(2), alt: ''}))),
    h(Q.HoverCard, partner(0, {badge: null}), h('button', {type: 'button', className: 'tile', 'aria-label': 'Company 1: details'}, h('img', {src: logo(0), alt: ''}))),
    h(Q.HoverCard, JORDAN, h(Q.Avatar, {size: 'md'})),
    h(Q.HoverCard, Object.assign({align: 'start'}, ALEX), h(Q.Avatar, null)))));
""")
readme('HoverCard', r"""
# HoverCard

A small card that opens beside the thing it describes. Use it where a logo or a headshot stands for something that needs a line of explanation and one link. Two kinds: the **logo card** (Figma: Hover card) and the **profile card**.

**Provide:** `kind` (`logo` or `profile`), the content for that kind, and the trigger as the child.

- **Logo card** (`kind="logo"`): `logo` (and `logoAlt`), optional `badge` (an image address or your own node, for a partner or certification badge), `title`, `body` and `link` (`{ label, href }`). The link is a neutral TextLink with the blue arrow. One link only.
- **Profile card** (`kind="profile"`, Figma: Profile Modal - Alternate): `name` (the full name), `image` (falls back to the avatar silhouette), `designation` (the role), `company`, `logo` (the company logo, with `logoAlt`) and `link` (`{ href }`). Layout: the 56px headshot (Avatar `md`) on the left, 16px from the text; the name, then the role 4px under it; a foot row 16px below with the company logo on the left (28px tall, up to 140px wide; the company name in Medium when there is no logo) and the LinkedIn button on the right (SocialButton `size="sm"`: 36px, `radius-sm`, a 20px white glyph on `icon-bg-default`). The close icon (24px in a 32px target, `icon-default`) sits 8px from the top and right (`spacing-3xs`), so its glyph lines up with the 16px padding. The link opens in a new tab.
- **Size:** logo card 242px wide; profile card 400px wide; both 16px padding (`spacing-rg`), `radius-lg`, white, `shadow-modal`. Never wider than the screen less 16px each side. Height follows the content: keep the copy to three lines.
- **Type:** logo card: name `h4` (20px SemiBold), copy `paragraph-rg` `text-secondary`. Profile card: the profile text used everywhere (see Avatar): name `title-sm` (SemiBold 16px), role `paragraph-rg` `text-secondary`, company in Medium. Long names wrap; nothing is cut off.
- **Opens:** a mouse opens it on hover after 150ms and it stays open while the pointer is on the trigger or the card. A click, a tap or Enter opens it and keeps it open. Focus alone does not open it, so tabbing through a row of logos stays quiet.
- **Closes:** when the pointer leaves (200ms grace) if hover opened it; on a click outside, on Esc, on the close icon, or on a second click of the trigger. Opened from the keyboard, focus moves into the card and returns to the trigger when it closes; Tab past the last control closes it.
- **One profile card at a time:** a profile card opened with a click, a tap or the keyboard is pinned. It stays open when people click elsewhere, and the other headshots don't open theirs (no hover, no click, default cursor) until it is closed with the close icon, Esc or a second click of its own headshot.
- **Position:** 8px below the trigger, centred on it (`align="start"` or `"end"` lines it up with an edge). It moves above when there is no room below (`position="top"` asks for that first) and is kept 16px inside the screen. It sits at `z-tooltip`.
- **Cursor:** pointer on the trigger. The trigger is a button; if the child is not a button or link, HoverCard wraps it in one and names it "<name>: details" (`triggerLabel` overrides).
- **Mobile:** the same card, opened by a tap; a tap outside or the close icon closes it. Set `closable` on a logo card that will be used on touch screens.
- **In the logo modules:** give a logo a `card` in LogoCarousel or LogoHierarchy and the logo becomes the trigger. The carousel waits while a card is open.
- **On headshots:** DrawerCard takes `profileCards` to give every speaker headshot a profile card.
- **Accessibility:** the trigger has `aria-haspopup="dialog"` and `aria-expanded`; the card is a dialog labelled by its name. A tooltip is for a few words of plain text; a hover card is for content with a link.
- `inline` draws the card in the page flow without a trigger, for documentation.
- Partner logos and badges in the preview are placeholders.
""")

# ── FormBanner ──
page('FormBanner', 'Page modules · Calls to action', 1900, 1440, 'Block module · A heading band over a lead form: gradient, light or photo, with optional artwork on the right.',
 "", r"""
var LAPTOP = '/_blob/161a64f365cbddf79c8287b5d78440df', BUILDING = '/_blob/030f664385156a91a5802ce5e6424bd4';
var EMAIL = {name: 'email', label: 'Work Email', type: 'email', required: true, autoComplete: 'email'};
var FIRST = {name: 'firstName', label: 'First Name', required: true, autoComplete: 'given-name', half: true};
var LAST = {name: 'lastName', label: 'Last Name', required: true, autoComplete: 'family-name', half: true};
var COMPANY = {name: 'company', label: 'Company Name', required: true, autoComplete: 'organization', half: true};
var FORM = {title: 'Get Started Today', subtitle: 'Enter your details to start your free trial', fields: [FIRST, LAST, Object.assign({half: true}, EMAIL), COMPANY], submitLabel: 'Start Free Trial', legal: 'By submitting this form, you consent to Qualys’ privacy policy.'};
function fb(extra) { return h(Q.FormBanner, Object.assign({title: 'De-Risk Your Business', form: FORM}, extra)); }
ReactDOM.createRoot(document.getElementById('root')).render(h('div', null,
  cap('Gradient band, white heading, artwork on the right'), fb({image: LAPTOP}),
  cap('Light band, blue heading'), fb({background: 'light', title: 'Patch Less, but With Higher Impact'}),
  cap('Photo band'), fb({background: {src: BUILDING}, subtitle: 'One platform to measure, communicate and eliminate cyber risk.'}),
  cap('Mobile'), h('div', {className: 'phones'}, h('div', {className: 'phone'}, fb({image: LAPTOP})), h('div', {className: 'phone'}, fb({background: 'light', title: 'Patch Less, but With Higher Impact'})))));
""")
readme('FormBanner', r"""
# FormBanner

A lead form with a banner on top: a short heading on a coloured or photo band, and the Form attached under it in one card. Use it in the middle or at the foot of a page where the form needs its own headline. For a form at the top of the page use the Hero with a form; beside copy, use the CTA module.

**Provide:** `title` and `form` (the props of a Form, or a Form of your own). Optionally `subtitle`, `background`, `tone` and `image`.

- **Band background:** `gradient` (the promo gradient, the default), `light` (`surface-blue-200`, Misty Blue) or a photo as `{ src }`. A photo covers the band and is cropped from the centre; pick a dark, quiet one.
- **Heading colour (`tone`):** `inverted` (white, the default on the gradient and on photos) or `blue` (`text-accent-primary`, the default on the light band). The heading is `h3`, 24px SemiBold, two lines at most; the optional subtitle is `paragraph-rg`.
- **Artwork:** `image` sits on the right of the band, up to 460px wide and 150px tall, scaled to fit. Decorative, so it has no alt text unless `imageAlt` is given. Hidden on mobile.
- **Size:** the card fills the 1140px content column; the band is at least 154px tall with 64px side padding and grows with its text. `radius-lg`, `shadow-card`.
- **Form:** sits on the form ground (`surface-neutral-200`) with 36px padding (`spacing-3xl`). It is the `extended` Form by default: its own 24px heading and subtitle, fields, one primary Button, the consent line. Mark fields `half: true` to pair them in a row.
- **Mobile (the module narrower than 768px):** the band keeps its heading with 16px side padding, the artwork goes, fields stack in one column and the button fills the width.
- **States, validation and messages** are the Form's own. One primary Button in the module.
- **Accessibility:** the banner heading is an `h2` by default (`titleLevel` changes it) and the form heading is one level below it.
- From the test site's Form Banner. The test site draws the form with the old Marketo skin; Flex uses the Flex Form.
""")

# ── Tables ──
TABLE_DATA = r"""
var LOGO = '/_blob/a0d4062abbce2ceb87d5be08d326359f';
var COLS = [{id: 'qualys', name: 'Qualys', logo: LOGO, subtitle: 'Optional Subheading'}, {id: 'wiz', name: 'Wiz', subtitle: 'Optional Subheading'}, {id: 'crowdstrike', name: 'CrowdStrike', subtitle: 'Optional Subheading'}, {id: 'paloalto', name: 'Palo Alto', subtitle: 'Optional Subheading'}, {id: 'rapid7', name: 'Rapid7', subtitle: 'Optional Subheading'}];
"""
page('FeatureMatrix', 'Page modules · Tables', 2330, 1440, 'Block module · Yes/no feature comparison with Qualys highlighted; on mobile, one competitor at a time. Sample data.',
 "", TABLE_DATA + r"""
var SECTIONS = [
  {title: 'Asset Coverage', open: true, rows: [['IT Assets', 1, 1, 1, 0, 1], ['Cloud Assets', 1, 1, 1, 0, 1], ['Containers', 1, 1, 1, 1, 0], ['Mobile Devices', 1, 1, 0, 1, 0], ['Real-time IoT Discovery', 1, 1, 0, 1, 0], ['Web Applications', 1, 1, 1, 0, 0], ['EASM', 1, 0, 0, 0, 1], ['Attribution and Confidence Scoring', 1, 0, 1, 1, 1]]},
  {title: '[Section Title]', rows: [['[Feature Name]', 1, 1, 0, 1, 1], ['[Feature Name]', 1, 0, 1, 1, 0], ['[Feature Name]', 1, 1, 1, 0, 0]]},
  {title: '[Section Title]', rows: [['[Feature Name]', 1, 0, 1, 1, 1], ['[Feature Name]', 1, 1, 1, 0, 1], ['[Feature Name]', 1, 1, 0, 0, 1]]},
  {title: '[Section Title]', rows: [['[Feature Name]', 1, 1, 1, 1, 0], ['[Feature Name]', 1, 0, 0, 1, 1], ['[Feature Name]', 1, 1, 0, 1, 0]]}];
function fm(extra) { return h(Q.FeatureMatrix, Object.assign({title: 'Heading', subtitle: 'Optional Subheading', columns: COLS, sections: SECTIONS}, extra)); }
ReactDOM.createRoot(document.getElementById('root')).render(h('div', null,
  cap('Desktop: muted "no" marks'), fm(),
  cap('Red "no" marks'), fm({noMark: 'red', sections: SECTIONS.slice(0, 1)}),
  cap('Mobile: pick a competitor; show differences only'), h('div', {className: 'phones'},
    h('div', {className: 'phone w390'}, fm()),
    h('div', {className: 'phone w390'}, fm({defaultCompare: 'paloalto', defaultDiffOnly: true})))));
""")
readme('FeatureMatrix', r"""
# FeatureMatrix

A yes/no comparison table: Qualys in the first, highlighted column, competitors beside it, and features grouped into topics that open and close. Use it when the claim is "we cover this, they don't" across many features. When each cell needs a sentence, use DetailComparison; for a short list of statements, MarketingTable.

**Provide:** `columns` (the first is Qualys), `sections` and optionally `title`, `subtitle`, `noMark`.

- **Columns:** `[{ id, name, logo, subtitle }]`. Give every column its `logo`; without one a dashed slot holds the name (as in the preview, where competitor logos are placeholders). Two to five competitors read well on desktop.
- **Sections:** `[{ title, open, rows }]`. Each is a Drawer; set `open` on the ones that start open. A row is `[label, 1, 0, 1, …]` or `{ label, values }`, one value per column.
- **Marks:** yes is a white tick on `success`, 24px circle. No is a cross on `chip-bg` in `text-secondary` (`noMark="muted"`, the default) or white on `crimson` (`noMark="red"`). Colour is never the only signal: the tick and cross differ, and each mark is read as "Wiz: No".
- **Totals:** the last row of each section counts the yes marks ("6 of 8") under the label "Supported". `totalLabel` renames it, `formatTotal(n, total)` reformats it, `totals={false}` removes it.
- **Highlight:** an Ecru band (`surface-neutral-300`, `radius-md`) runs behind the first column from header to last row.
- **Size:** a white card (`radius-lg`, `shadow-card`, 32px padding) in the 1140px content column. The label column is 2.2 parts and every vendor column one part. Rows are at least 53px tall and grow with a wrapping label; the heading is `h3`.
- **Overflow:** the table keeps a minimum width (280px plus 128px per column) and scrolls sideways inside the card rather than squeezing. Labels wrap; vendor names in a logo slot end in an ellipsis.
- **Hover:** a row takes a 3% Charcoal tint. Cursor: pointer on a section heading, default elsewhere.
- **Mobile (the table narrower than 768px):** no card, white ground, 20px side padding. Qualys is compared with one competitor at a time, picked with Tabs ("Compare Qualys With"); the "Show Differences Only" Toggle hides the rows where both agree, and a section with none says "No differences in this section." Columns are 96px each.
- **Accessibility:** each section's rows are a table for screen readers, labels are row headers, marks carry the vendor name. Section headings are buttons (`aria-expanded`).
- **Content:** comparison claims must be current and checked before they go live. The data in the preview is sample data.
- From the Claude Design file "Comparison Table" (Feature Matrix, desktop and mobile).
""")

page('DetailComparison', 'Page modules · Tables', 1960, 1440, 'Block module · Written comparison of Qualys with up to three competitors; on mobile, one at a time. Sample data.',
 "", TABLE_DATA + r"""
var A = 'Covers the entire Hybrid IT landscape, on-premises servers (Windows, Linux, Mac), workstations, 25% of servers, workstations, network devices, web applications, cloud assets, cloud databases, network devices, containers, cloud instances, and containers, etc.';
var B = 'Covers servers, workstations, network devices, web applications, cloud assets, cloud databases, network devices, containers, cloud instances, and containers, cloud storage, smartphones, tablets, containers, and OT infrastructure.';
var P = '[One or two sentences on how this vendor handles the topic.]';
function all(v) { return {qualys: v, wiz: v, crowdstrike: v, paloalto: v, rapid7: v}; }
var SECTIONS = [{title: 'Asset Coverage', open: true, heading: 'Optional Heading', copy: {qualys: A, wiz: A, crowdstrike: B, paloalto: B, rapid7: A}},
  {title: '[Section Title]', heading: '[Optional Heading]', copy: all(P)}, {title: '[Section Title]', heading: '[Optional Heading]', copy: all(P)}, {title: '[Section Title]', heading: '[Optional Heading]', copy: all(P)}];
function dc(extra) { return h(Q.DetailComparison, Object.assign({title: 'Heading', subtitle: 'Optional Subheading', columns: COLS, sections: SECTIONS}, extra)); }
ReactDOM.createRoot(document.getElementById('root')).render(h('div', null,
  cap('Desktop: two competitors picked'), dc(),
  cap('Three competitors (the most)'), dc({defaultPicked: ['wiz', 'crowdstrike', 'rapid7'], sections: SECTIONS.slice(0, 2)}),
  cap('Mobile: one competitor at a time'), h('div', {className: 'phones'}, h('div', {className: 'phone w390'}, dc()))));
""")
readme('DetailComparison', r"""
# DetailComparison

A written comparison: Qualys beside up to three competitors the reader picks, one short text per vendor for each topic. Use it when yes or no is not enough and each difference needs a sentence. For a simple feature checklist use FeatureMatrix.

**Provide:** `columns` (the first is Qualys), `sections` and optionally `title`, `subtitle`.

- **Columns:** `[{ id, name, logo, subtitle }]`. Without a `logo` a dashed slot holds the name (competitor logos in the preview are placeholders).
- **Sections:** `[{ title, open, heading, copy }]`. `copy` is keyed by column id: a string, or `{ heading, body }` to give that vendor its own cell heading. Each section is a Drawer.
- **Picking competitors:** filter chips ("Compare Qualys With · Choose up to 3"). At least one stays picked; at three, the rest are disabled until one is released. `max` changes the limit, `defaultPicked` sets the starting ids (the first two by default), `picked` with `onChange` controls it.
- **Layout:** Qualys and the picked vendors share the width in equal columns, so two competitors give three columns and three give four. The Qualys cell sits on Ecru (`surface-neutral-300`, `radius-md`); the others are plain. 20px padding in every cell.
- **Type:** module heading `h3`; cell heading `title-sm` (16px SemiBold); copy `paragraph-rg`. Keep copy to about 250 characters so columns stay a similar height; longer copy wraps and the row grows.
- **Size:** a white card (`radius-lg`, `shadow-card`) in the 1140px content column. Below 240px per column the table scrolls sideways inside the card.
- **Heading and chips:** above the card, on the page ground, 24px (`spacing-xl`) over it: the heading on the left, the chips on the right, both lined up with the card's outer edges. On a narrow screen the chips wrap under the heading. The card holds only the table, starting with the vendor logos 24px from its top.
- **Mobile (the table narrower than 768px):** no card, white ground. Tabs pick one competitor; in each section the Qualys text (Ecru card) sits above the competitor's (outlined card), each under its logo.
- **Cursor:** pointer on section headings, chips and tabs.
- **Accessibility:** section headings are buttons (`aria-expanded`); each cell names its vendor for screen readers; chips are toggle buttons in a labelled group.
- **Content:** describe competitors fairly and keep claims current and checked. The copy in the preview is placeholder text.
- From the Claude Design file "Comparison Table" (Detail Comparison, desktop and mobile).
""")

# MarketingTable is kept as published from the other session (live copy); not generated here.
print('written')
