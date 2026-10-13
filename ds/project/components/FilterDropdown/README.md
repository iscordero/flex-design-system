# FilterDropdown

The filter dropdown from the Figma Filters page: an Ash button with a bold label, opening a menu of checkboxes. Use it above resource, event and blog listings; FilterBar lays several out with a reset link.

**Provide:** `label` (the filter name, e.g. "Content Type"), `options`, and `value` + `onChange` (an array) or `defaultValue`. The first row, "All", checks or clears everything; rename it with `allLabel` or hide it with `allLabel={null}`. `single` makes it one choice with radios.

- **Trigger:** 56px tall, at least 212px wide, `filter-bg` (Ash), `radius-rg`, 20px side padding. Label in `button-label` (Wix Madefor Text SemiBold 16px) `text-primary`; a 16px chevron-down, chevron-up when open.
- **Open:** a 2px `qualys-blue` border on the trigger. The menu sits 2px below: white, `radius-rg`, `shadow-menu`, 8px top and bottom padding; rows hover `misty-blue`. Each row is a 20px Checkbox with a 16px label, 37px apart. The menu is as wide as the trigger and grows to fit longer labels (up to 320px).
- **Opening and closing:** click, Enter or Space opens; Esc or a click outside closes. Tab moves through the checkboxes.
- **Choices:** checkboxes select several; radios (`single`) select one. Keep the "All" behaviour the same across every filter on a page.
- Earlier versions followed the Inputs sheet (#F5F5F5 fill, IBM Plex Sans label, no open border). The Filters page draws Ash, the button label style and a blue border, which this now follows.
