# FilterChip


The filter-style tag from the Figma Tagging System: a pill people click to filter a list, selected or not, often with a result count.

**Provide:** the filter name as children, `active` and `onClick` (you hold the selection), optional `count`, and `onRemove` if a selected chip should show a remove (cross) button. `size` is `lg`, `rg` (default) or `sm`. `removable` turns it into an applied-filter chip.

- Pill (`radius` 999px), 12px side padding, 4px between label and count. `lg` 45px tall with 16px text (the filter cloud on the Figma Filters page); `rg` 36px with 16px; `sm` 30px with 14px. IBM Plex Sans Medium, line height 1.3, −1%.
- **Removable** (`removable` + `onRemove`): a gray chip that isn't a toggle, with a 24px cross button; it shows a filter that is in force (see AppliedFilters).
- Counts over 999 shorten to "1k+". Labels never wrap; they truncate with an ellipsis. Disable a chip that would return no results.
- Rest: `chip-bg` (Charcoal at 5%), charcoal text. Selected: `chip-bg-active` (Qualys Blue at 10%), Qualys Blue text; exposed as `aria-pressed`.
- Hover (`chip-bg-hover`, `chip-bg-active-hover`) and the remove button aren't drawn in Figma; the doc says chips are "often removable (✕) when active", so the cross is offered, not required.
- Keyboard focus shows `focus-ring`. Disabled: 50% opacity.
- Lay chips in a wrapping row, or use FilterChipGroup, which handles the selection. For a dropdown of checkboxes use FilterDropdown.
- Selected blue text on its tint is 3.37:1 — under 4.5:1; kept as designed, flagged.
