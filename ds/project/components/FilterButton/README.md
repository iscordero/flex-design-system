# FilterButton

**Status:** Ready

The "Filter" control from the Figma Filters page (mobile): a filter icon and label beside the search field, opening the filter drawer.

**Provide:** `onClick`; the label defaults to "Filter".

- 16px `filter` icon, 6px, label in `button-label` (Wix Madefor Text SemiBold 16px) `text-primary`. No fill or border; a 44px tall touch target.
- Sits to the right of a line SearchBar, level with its text.
- It announces that it opens a dialog (`aria-haspopup`). Pair it with FilterDrawer.
