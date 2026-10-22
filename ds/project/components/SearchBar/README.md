# SearchBar


The search input from the Figma Inputs sheet, in two styles: **line** (an underline, for search on a page or in the nav) and **contained** (a soft gray box, for search inside cards, panels and filter rows).

**Provide:** `placeholder` (e.g. "Search"), `variant` (`line` default, or `contained`), and `value` + `onChange` or `onKeyDown` for submit. Pass `label` if the accessible name should differ from the placeholder.

- Both: 16px text; placeholder `text-secondary`. **No search icon for now:** the placeholder and the field say what it is. `icon` brings back the 16px search icon, 8px from the text, turning `qualys-blue` on focus.
- Line: 12px above and 16px below the text, 1.5px `stroke-neutral-500` underline, `qualys-blue` on focus.
- Contained: 56px tall, `search-bg` (Asphalt at 5%), `radius-rg`, 16px side padding, no visible border — a 1.5px `qualys-blue` border on focus.
- Wrapped in `role="search"`; the input is `type="search"`.
