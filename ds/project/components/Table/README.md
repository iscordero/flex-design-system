# Table


A plain table of copy: a header row, then rows of text, in a white card. Use it for information that reads across, such as module overviews, plan details, specifications and schedules. It has the same parts as MarketingTable (a header row group and a body row group, each cell labeled with its column on phones) without the photo header, row icons or featured column. To set requirements beside what Qualys offers, use MarketingTable; to compare Qualys with competitors, FeatureMatrix or DetailComparison.

**Provide:** `columns` (titles, or `{ title, width, align }`) and `rows` (one array of cells per row, in column order, or `{ cells }`). Optionally `size`, `striped`, `rowHeaders` and a `label` naming the table for screen readers.

| Variant | Props | Use it for |
| --- | --- | --- |
| Standard (default) | `size="standard"` | Copy: sentences or short phrases that wrap |
| Compact | `size="compact"` | Data: numbers, short values, many rows |
| Striped | `striped` (with either size) | Long tables, where a tint on every other row helps the eye follow a row across |

**Standard**

- **Card:** `surface-neutral-100` (white), `radius-lg`, `shadow-card`, in the content column (up to 1440px). 24px above the header and below the last row (16px of it inside the row).
- **Columns:** equal shares of the width by default; `width` gives a column a larger share (`2`) or a fixed track (`"200px"`). 24px between columns and 24px inside the card's left and right edges.
- **Header row:** Wix Madefor Text SemiBold 16px, line height 1.3, −1%, `text-primary`, Title Case; 24px below it, a 1px `stroke-neutral-500` rule.
- **Rows:** IBM Plex Sans Regular 16px, line height 1.3, −1%, `text-primary`, 16px above and below, 1px `stroke-neutral-400` rules between rows. Cells align to the top, so a long cell grows its row and the others stay at the top. Text wraps; nothing is cut off.
- **Row headers:** `rowHeaders` makes the first cell of each row its header (SemiBold, read as the row's name).
- **Alignment:** left by default; `align: 'right'` for columns of numbers so the digits line up.

**Compact**

- 14px type (header and rows), numbers in even widths (`tabular-nums`), 8px above and below each row, 12px under the header, 16px between columns and inside the card's edges.
- Each column is at least 96px wide; when they can't all fit, the table scrolls sideways inside the card (the card doesn't grow wider than the content column).

**Striped**

- Every other row, starting with the second, on Ecru (`surface-neutral-300`), edge to edge in the card; the rules between rows are dropped.

**Columns: minimum and maximum.** Standard: **2 to 6** columns, so each keeps about 200px for wrapping copy in the content column. Compact: **2 to 8**, because short values need less room and the table scrolls when it must. Columns past the maximum are left out (with a console warning). With one column, use a list instead. Split wider content into two tables.

**Mobile (the table narrower than 768px)**

- **Standard:** each row becomes a block: its first cell as a title (SemiBold 18px), then every other cell under its column name (SemiBold 14px `text-secondary`). The header row is kept for screen readers only. 16px between rows, with the same rules (or stripes) between them.
- **Compact:** the grid stays and scrolls sideways; columns are at least 120px, and the first column stays in place with a 1px rule on its right while the others scroll under it.

**Accessibility:** `role="table"` with header and body row groups, `columnheader` and `cell` (or `rowheader` with `rowHeaders`); name it with `label`. A compact table's scroll area is focusable, so it can be scrolled with the arrow keys, and is named "… scrolls sideways".

**Content:** keep cells short; a cell over about 200 characters belongs in body copy. Title Case for column titles, sentence case in cells.
