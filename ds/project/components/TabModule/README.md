# TabModule


The tab module from the Figma Tab Modules page: a white card with Tabs across the top, and under them a heading, copy, actions and media that change with the tab.

**Provide:** `items` — one per tab, each with `label`, `title`, `body`, `actions` and `media` — and optionally `align="center"` and `label` (what the tabs are, for screen readers).

- Section on `surface-neutral-200`, 48px top and bottom. The card is the content column (up to 1440px): `surface-neutral-100`, `radius-lg`, `shadow-card`, 36px padding.
- **Tabs:** the Tabs component, at the top left, or centered with `align="center"`. Use up to eight short labels; longer sets scroll sideways.
- **Content,** 48px under the tabs: copy and media in two equal columns, 48px apart, centered on each other.
- **Copy:** the heading in `h2` (SemiBold 38px), 24px, the body in `paragraph-rg`, 24px, the actions, 8px apart. The Figma sets: a primary Button; primary and secondary; primary and a TextLink (`tone="neutral"`, with the arrow).
- **Media:** 16:9, `radius-lg`; an image, or a video with the play button.
- **Mobile:** 24px card padding, 24px between the parts. The copy comes first and the media follows at 287:250. Buttons keep their own width and stack.
- Switching tabs slides the blue bar and swaps the content. Arrow keys move between tabs.

Do / Don't:

- Do keep every tab to the same structure, so the card doesn't jump in height.
- **Autoplay:** `autoplay` passes straight to Tabs: the tabs advance every six seconds (or the time given), wait on hover and focus and stop when the reader picks a tab. There is no pause button.
- Don't put more than one primary Button in a tab.

The Figma usage notes are still placeholders ("Used for…").
