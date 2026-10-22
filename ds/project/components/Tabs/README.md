# Tabs


Tabs from the Figma Tabs page: one white bar of labels for content at the same level of importance; selecting a tab swaps the content below.

**Provide:** `items` — 3 to 6 of `{ id, label, content }` — and a `label` naming the set for screen readers. `defaultValue` (an item's `id`) picks the starting tab; or control it with `value` + `onChange(id, index)`. Leave out `content` to render the bar alone.

- **Labels:** one or two words (about 15 characters), nouns or short verb phrases, Title Case. Put the most-used or default tab first, on the left. Never use tabs for sequential steps.
- **Bar:** 46px tall, white, `radius-rg` (10px), a 1px `stroke-neutral-400` outline and `shadow-tabs`. Tabs hug their labels: 20px padding at the outer ends, 10px between. Labels are centered top to bottom, with even space above and below (the 4px indicator overlaps the bottom edge). Left-aligned only.
- **Labels:** IBM Plex Sans SemiBold 16px, line height 1.3, −1%. Inactive `text-secondary`, no line; hover `text-primary` with a pointer; active `qualys-blue` with a 4px `qualys-blue` indicator as wide as the label, flat along the bar's bottom edge with 2px rounded top corners: the same bar as under the Nav links.
- **Animation:** one shared indicator slides from the old tab to the new one (300ms ease-in-out), rather than each tab fading its own line in; it stays still for people who prefer reduced motion.
- **Mobile:** the bar keeps its size and scrolls sideways inside its container; the right-most tab shows partly cut off as the cue that more exist. A selected tab scrolls into view.
- **Panel:** content sits `spacing-xl` below the bar (not set in Figma). From the review rounds: each panel shows a primary Button by default, with an optional secondary Button or TextLink beside it.
- **Keyboard:** ← → move between tabs and select, Home and End jump to the ends; only the active tab is in the tab order. Exposed as `tablist` / `tab` / `tabpanel`; focus shows an inset Qualys Blue ring.
- **Hover and active:** hover darkens the label from `text-secondary` to `text-primary`; the active tab is Qualys Blue over the 4px blue indicator. The same idea as every menu and list of tabs: a neutral hover, blue for the active one.
- **Autoplay:** `autoplay` (or a time in milliseconds, 3 seconds at least; 6 by default) opens the next tab by itself and loops. It waits while the pointer or the keyboard focus is on the tabs, stops for good once the reader picks a tab, and never starts when the reader has asked for reduced motion. There is no pause button: picking any tab stops it. Use it only for a short showcase; never for content the reader must read in full.
- Blue labels on white are 3.78:1, under 4.5:1 for 16px text — as designed, flagged.
- Figma places the label 10px from the top, which leaves more space below it than above; labels are centered in the bar instead.
- The review rounds asked for a `radius-lg` container; the Figma bar uses `radius-rg`, so the bar follows Figma.
