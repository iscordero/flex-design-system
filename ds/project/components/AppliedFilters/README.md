# AppliedFilters


The "applied filters" row from the Figma Filters page (mobile): a receipt of the filters in force, placed directly under the search field, with the number of results.

**Provide:** `items` (`{ value, label }`), `onRemove(value)` and `results` (a number, or your own text). Optionally `max` and `onMore` for the summary chip, and `onClearAll` to show a "Clear all" link.

- **Chips:** removable FilterChips (36px, Charcoal at 5%), 16px apart, wrapping. The cross removes that one filter and the results below refresh at once.
- **Too many filters:** set `max` to cap the row; the rest collapse into a "+4 more" chip. Point `onMore` at the filter drawer so people can review them there.
- **Result count:** always show the total ("640 results") next to the chips, in `paragraph-rg` `text-secondary`, so the effect of each combination is clear. It is announced to screen readers when it changes.
- **Clearing everything:** when people can apply a lot of filters, pass `onClearAll` so they don't have to remove chips one by one.
- Each cross is a 24px button named "Remove VMDR".
- Figma draws these chips 35px tall with 10px side padding in Wix Madefor Text; they use the system's regular FilterChip (36px, 12px, IBM Plex Sans Medium) so chips stay one style.
