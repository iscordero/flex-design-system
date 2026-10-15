# FilterBar


The filter dropdown pattern from the Figma Filters page: a row of filter dropdowns with a "Reset Filters" link. On mobile it becomes one "Filter" control that opens every category in a FilterDrawer.

**Provide:** `filters` (`{ id, label, options }`) and `value` + `onChange` (`{ filterId: [values] }`), or `defaultValue`.

- **Desktop (768px and up):** FilterDropdowns 16px apart, then "Reset Filters" (blue TextLink) 16px after the last one. Each choice applies as soon as it is ticked. The row wraps if it runs out of room.
- **Mobile:** a single "Filter" dropdown trigger. It opens the plain FilterDrawer with one section per filter, "Reset Filters" and "Apply Filters"; choices apply together on "Apply Filters".
- **Reset Filters** clears every filter; it is disabled while nothing is selected.
- **How many:** keep to five filter categories at most.
- **Use filters when** the list, table, gallery or catalog is large, people need to narrow it by several attributes (type, date, category), and the goal is selection, comparison or discovery.
- **Avoid filters when** there are fewer than about ten items, or the results wouldn't meaningfully change.
- **One choice or several:** checkboxes for several; add `single: true` to a filter for radios. A root "All" row (`allLabel`) can select everything or stand for "no filters applied"; keep it the same across all filters.
- `layout="desktop"` or `"mobile"` forces one layout; by default it follows the screen width.
