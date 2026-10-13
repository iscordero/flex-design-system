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
