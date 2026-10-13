# MarketingTable

A branded comparison table as a page section: a Qualys Blue header row with a photo, row headings with Feature Icons, and one featured column for the Qualys point of view. It reworks the Figma component "Marketing Table With Image in Header Row".

**Provide:** `columns` and `rows`. The first column heads the rows; each further column takes a `title` or a `logo` (the reversed Qualys logo), a one-word `subtitle`, and `featured` on the one to draw attention to. Each row takes a `title`, an optional `icon` (a Feature Icons URL or a node) and `cells`: one for each column after the first, in column order. Optional: `image` (the header photo, as a URL or `{ src, size, focus }`), `tone` (`blue`, the default, or `dark`) and `label` (the table's accessible name).

Use it to set a standard, a directive or a list of requirements beside what Qualys offers, a row at a time. The sample maps the CISA BOD 26-04 requirements to Qualys advantages and ROC capabilities.

- Section on `surface-neutral-200`, 48px top and bottom, content in the 1140px column.
- **Card:** White, `radius-lg`, `shadow-card`. The header row and the columns run to its edges.
- **Columns:** the row headings take 1.25 parts and every other column 1 part. Drawn with two columns after the row headings.
- **Header row:** 140px tall, with 32px padding and the copy at the bottom; 1px white rules at 30% divide the columns. The ground is `qualys-blue` across the top, easing to `blue-gradient-end` at the foot, or Charcoal (`tone="dark"`). The heading is `h2` (SemiBold 38px, line height 1.1, −2%), 8px above the subtitle in `paragraph-rg` Medium; both `text-inverted`. A column with a `logo` shows it in place of the heading: the reversed Qualys logo, 37px tall.
- **Header photo:** sits in the middle of the row at 72% of its width, drawn in greys and blended into the header colour, with both ends fading out. On blue it is multiplied in at 50%, so it can only darken the ground under the white copy; on Charcoal it is screened in at 16%. `size` changes the width and `focus` says how far down the photo the row is centred (`header-capitol.jpg` in the Images group, with `focus: '54%'`). Without a photo the header is the plain ground.
- **Rows:** 104px tall or more, with 1px `stroke-neutral-400` rules between them. Cells have 24px × 32px padding and centre their content vertically.
- **Row heading:** an optional Feature Icon at 56px, 16px before the heading in `h4` (SemiBold 20px, line height 1.3, −1%), `text-primary`, Title Case.
- **Cells:** `paragraph-rg` (16px) in `text-secondary`.
- **Featured column:** a `surface-neutral-300` ground from under the header to the foot of the card. Its cells are Medium in `text-primary`, behind a 16px `check` icon in `icon-feature`, 10px before the text.
- **Tablet (768–1023px):** still a table, with 20px padding, a 120px header, 48px icons, 18px row headings and a 30px logo. Column headings scale down with the section's width, to 24px at the least.
- **Mobile (under 768px):** the columns stack. The header shows the first column's heading only, over the whole photo. Each row is its heading (40px icon, 18px) followed by one block per column, labelled with that column's name in the `eyebrow-xs` style ("QUALYS ADVANTAGES"). The featured block keeps its `surface-neutral-300` ground, with `radius-md` and 12px padding.
- Built as an ARIA table (`role="table"` with column and row headers), so each cell is announced with its headings; give it a `label`. The photo, icons and checks are decorative and hidden from assistive technology.
- **Contrast:** white on flat `qualys-blue` is 3.78:1, enough for the headings (24px or larger) and too little for the 16px subtitles. That is why the ground deepens toward the foot: the subtitles have 4.5:1 or more at every width (4.6:1 on desktop), and the headings 3.8:1 or more. On Charcoal both are 9:1 or more. `text-secondary` on `surface-neutral-300` is 6.7:1. The blue check is 3.5:1 on that ground, enough for an icon; the cell's words carry the meaning.

Content:

- **Column headings:** one to three words, about 14 characters at most; subtitles one word.
- **Row headings:** Title Case, about 30 characters, two lines at most.
- **Cells:** one phrase, about 70 characters (three lines) at most, with no full stop.
- Four to eight rows.

Do / Don't:

- Do feature one column, the Qualys one, and place it beside the row headings.
- Do give every row a Feature Icon or none.
- Do pick a photo with one clear subject in its middle (a building, a skyline) and set `focus` on it.
- Don't feature the first column, or more than one column.
- Don't flatten the blue ground to plain `qualys-blue`: the subtitles would drop to 3.78:1.

Where this differs from the Figma component (its desktop frame):

- The blue deepens from top to foot, under the subtitles. In Figma it deepens from left to right, which leaves the first column's subtitle on plain Qualys Blue.
- Rows carry Feature Icons; the Figma rows have none.
- The Qualys column sits in the middle and is the highlighted one. In Figma it comes last and the ROC column is highlighted.
- Featured cells are Medium in `text-primary` behind a check; in Figma both columns are plain grey text.
- Row headings are Title Case throughout; the Figma sample mixes Title Case and sentence case.
- The tablet and mobile layouts are not from Figma: this was built from the desktop frame alone, and they are new here.
