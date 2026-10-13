# FilterDrawer

The mobile filter panel from the Figma Filters page: the filters grouped in sections of checkboxes, overlaying the page. People change several at once and nothing updates until they press "Apply Filters".

**Provide:** `open`, `onClose`, `sections` (`{ id, title, options, limit }`), `value` (`{ sectionId: [values] }`) and `onApply(value)`. Options are strings or `{ value, label, count }`.

- **Panel:** white, `radius-rg`, 20px from the screen edges, over the dark overlay (`overlay-dark`, black at 50%). It rises in over 300ms. The list scrolls; the footer stays in view.
- **Close:** the cross top right, Esc or the backdrop. Closing without applying drops the changes. In the divided style the cross sits on its own white bar, 44px tall, that stays in place; the list scrolls away under it, so a title or "Clear all" never runs behind the cross.
- **Divided** (default, from the filter chips page): section titles in SemiBold 16px with a `stroke-neutral-500` rule; 42px rows split by `stroke-neutral-400` rules; 16px checkboxes, 14px labels and the result count on the right in `text-secondary`. A full-width "Apply Filters" (outlined blue Button).
- **Plain** (`variant="plain"`, from the filter dropdowns page): titles level with the close button, 20px checkboxes with 16px labels, 16px apart, 32px between sections, no rules. The footer has "Reset Filters" on the left and "Apply Filters" on the right.
- **Clear all:** in the divided style each section with a selection shows a "Clear all" link in its header, so one group can be reset without losing the others. `sectionClear` turns it on or off.
- **Reset Filters:** clears every section in the panel; it takes effect when "Apply Filters" is pressed. `reset` turns it on or off.
- **Show fewer first:** give a section a `limit` to show its most used options and tuck the rest behind "11 more"; it expands in place and becomes "Show less". The link sits 12px under the last row (16px in the plain style).
- **One choice only:** `single: true` on a section swaps the checkboxes for radios.
- **Accessibility:** a modal dialog; focus moves in, stays inside and returns to the control that opened it. Each section is a labelled group. The page behind doesn't scroll.
- `inline` shows the panel in the page flow, for documentation.
- Figma's note calls this a drawer that enters from the bottom; the frames draw a floating panel with 20px margins, which is what this follows. The apply button is the system's 50px Button (48px in Figma). The header rule is drawn in #B4BBC6, which isn't in the palette; this uses `stroke-neutral-500`.
