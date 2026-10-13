# AccordionModule

The accordion module from the Figma Accordion Modules page: an Accordion as a page section — under a heading, beside a copy block, beside media, or as a list with the open row's content beside it.

**Provide:** `items` (the same rows as Accordion: `{ id, title, icon, content, cta }`) and a `layout`. Add `title` for the heading; `eyebrow`, `body` and `actions` for the copy block; `media` for the image or video. `defaultOpen` names the row that starts open. Give a row's `cta` as `{ label, href }` and the module draws the right control (see Row CTA).

| Layout | Figma name | Looks like |
| --- | --- | --- |
| `full` | Accordion Module, Full Width | The heading, then the accordion across the 1140px column |
| `split` | Split Content, CTA + Content Block | Copy block on the left (eyebrow, heading, copy, up to two actions); accordion on the right |
| `media-left` | Split Media Left | Media on the left; accordion on the right. No heading |
| `media-right` | Split Media Right | Accordion on the left; media on the right. No heading |
| `list` | The last frame (also labelled "Split Media Right") | Rows on the left; the open row's content on the right |

- Section on `surface-neutral-200`, 48px top and bottom, content in the 1140px column. Two-column layouts are two equal columns (546px), 48px apart, aligned at the top.
- **Heading:** `h2`, SemiBold 38px, 36px above the accordion.
- **Copy block (`split`):** eyebrow, 4px, heading, 16px, body in `paragraph-rg`, 32px, actions 8px apart. The Figma sets: a primary and a secondary Button; a primary Button and a TextLink (`tone="neutral"`, with the arrow).
- **Rows:** the standard Accordion (Drawer rows): Feature Icon, title, chevron; the open row shows its copy and a call to action. See Accordion and Drawer for sizes and limits (4 to 12 rows; every row has an icon or none).
- **Row CTA:** a small primary Button. When the copy block already has a primary Button, and always in `list`, it is a TextLink instead (`tone="neutral"`, with the arrow: charcoal label, blue arrow), so the module keeps one primary action. The module does this itself: a `{ label, href }` CTA is drawn as whichever applies, and a primary Button passed as a node is redrawn as the TextLink. Other nodes are left as given.
- **Media:** 546 × 460 with `radius-lg`; an image or a video. Supply images no wider than 560px (the one usage note Figma gives).
- **List:** rows 56px tall in a 558px column, each with a 36px icon box 16px from the left edge. The open (active) row carries the blue Marker on its left edge and a chevron pointing at its content. There is one Marker for the list: it slides to the row you open, over 300ms, like the bar under the Nav links (it jumps for people who prefer reduced motion). `marker={1}`, `{2}` or `{3}` picks a flag-tier colour instead and `marker={false}` hides it; a row under the pointer is tinted (`hyperlink-default` at 15%). The content sits 56px to the right: body copy, then a TextLink 24px below. One row is always open — the first unless `defaultOpen` says otherwise — and opening another swaps the content.
- **Tablet and mobile (under 1024px):** everything stacks 24px apart, in reading order: copy then accordion; `media-left` keeps the media first and `media-right` puts it last; under 768px the media is 67:50. `list` becomes an ordinary accordion. Rows follow Drawer's 48px mobile rows, and buttons in the copy block go full width under 768px.
- Each row is a heading (one level below the module heading) holding a button with `aria-expanded`. In `list` the open row's button is `aria-disabled`, because it can't be closed.

Do / Don't:

- Do use `list` when each row has more to say (two or three short paragraphs) and people will compare rows.
- Do keep one primary Button in the module: with one in the copy block, rows end in a TextLink.
- Don't put an accordion module directly after another one, or use it for fewer than four rows.

Where this differs from the Figma frames:

- The split frames draw the accordion 561px wide, 15px past the column; here it fills its 546px column.
- The full-width desktop frame leaves 32px under the last row where the others leave 48px; 48px is used.
- Split media (`media-left`, `media-right`) has no heading, as in the Figma frames: leave out `title`, and let the media and the row titles carry the section. The mobile frame for full width drops the heading too; it is kept there.
- Mobile row titles are 16px in these frames and 18px on the Accordion page; 18px is used, as in Accordion.
- The split frames draw a small red Button inside the accordion next to the copy block's primary Button; here the row uses a TextLink, as asked in review.
- In the list frame, one row has the chevron and another has the tint. Read as: chevron = the open row, tint = hover. The tint (#D9E7EF) is not on the colour sheets; `hyperlink-default` at 15% matches it within one step.
- The Marker on the open list row is not in the Figma frame (added in review, in blue, sliding between rows); rows start 16px in rather than 8px to make room for it.
- The list content ends in a TextLink on desktop and a small Button on mobile; here it is a TextLink at both sizes.
- **List rows, hover and active:** hover is a neutral tint (`chip-bg`, 5% Charcoal). The open row is Misty Blue (`surface-blue-200`) with the blue marker on its left edge, which slides to the row over 300ms. The same rule as the navigation menu.
- There are no tablet frames; the module stacks under 1024px like GeneralContent.

The Figma usage notes are still placeholders ("Used for…", "Page types: product", "Character count: Heading, supporting copy").
