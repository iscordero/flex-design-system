# FilterChipGroup

**Status:** Ready

The desktop filter pattern from the Figma Filters page: every available filter shown upfront as a chip in a wrapping row, so people toggle criteria without opening a menu.

**Provide:** `options` (`{ value, label, count }`) and `value` + `onChange` (an array of the selected values), or `defaultValue`. `label` names the group for screen readers.

- **Chips:** large FilterChips (45px tall, 12px side padding), 10px apart in both directions; the row wraps as the screen narrows.
- **Toggle:** each chip works on its own. Clicking a gray chip turns it blue and updates the list straight away (or adds it to a pending search); clicking a blue chip takes the filter off.
- **Counts:** show the number of results beside the label so people can see the outcome before they click. Over 999 it shortens to "1k+".
- **Zero results:** a chip whose count is 0 is disabled, so nobody reaches a dead end. A selected chip stays clickable so it can be taken off.
- **Long labels:** never wrap inside a chip; they truncate with an ellipsis at the container width.
- **Copy:** one to three words, no sentences or verbs: "VMDR", not "Filter by VMDR".
- **Contrast:** the selected chip must stay clearly different from the rest, at least 3:1 against the background. The blue label on its tint is 3.37:1.
- **Mobile:** there is no room for the cloud. Use FilterButton beside the search, AppliedFilters under it and FilterDrawer for the choices.
