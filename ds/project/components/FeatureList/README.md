# FeatureList


A checklist of what a product or plan includes: a blue check before each item, in columns, usually on a white card beside a copy block ("More Than Just a License to Scan").

**Provide:** `items` (text, or `{ label, href, icon }`) and a `label` that names the list. Optionally `columns`, `card` and `icon`.

**Sizes**

- **Item:** a 24px blue Icon (`check` by default), 10px, then the text in IBM Plex Sans Medium 16px, `text-primary`. Long items wrap beside the icon.
- **Columns:** as many 250px columns as fit, 20px between rows and 24px between columns. `columns={2}` (or 3) fixes the number.
- **Card** (default): 24px padding, `surface-neutral-100`, `radius-lg`, `shadow-card`. `card={false}` sets the list straight on the section.

**States**

- An item with `href` is a link: the text keeps its color, underlined, and turns `hyperlink-default` on hover.

**Behavior:** static. Items read across, then down.

**Mobile:** one column; the card's padding drops to 20px.

**Accessibility**

- A real list (`ul` with `li`), named by `label`. The checks are decoration and hidden from screen readers.
- Keep each item to one idea, ideally one line on desktop.

Do / Don't:

- Do pair it with a copy block and one Button, as on a product page.
- Don't use it for steps in order (use a numbered list) or for comparisons (use FeatureMatrix).

Notes:

- First built for the VMDR product page redesign.
