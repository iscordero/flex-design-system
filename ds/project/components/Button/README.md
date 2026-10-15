# Button


Primary and secondary call-to-action buttons from the Figma Buttons sheet, in large (50px) and small (40px), with an optional icon left or right.

**Provide:** the label as children (Title Case, verb first: "Get a Demo", "Register Now", "Download Report"), a `variant`, a `size`, and `href` when it navigates (renders an `<a>`). `iconLeft="download"` for downloads; `iconRight="arrow-right"` for going to another page (or a play icon for media). `disabled` for the disabled state.

| Variant | Default | Hover | Active | Disabled | Use |
| --- | --- | --- | --- | --- | --- |
| `primary` | `button-bg-primary-default` (Qualys Red), white label | `button-bg-primary-hover` (Crimson) | `button-bg-primary-pressed` (Pepper) | `rhino` fill, `asphalt` label | The most important CTA on the page. |
| `primary-inverted` | `button-bg-secondary` (Off white), red label | `surface-neutral-300` (Ecru) | `surface-neutral-100` (White) | 50% opacity | The main CTA on charcoal, blue or image grounds. |
| `secondary` | 2px Qualys Red outline, red label | red fill, white label | Pepper fill | `rhino` outline, `asphalt` label | Lesser CTAs beside a primary, inside cards, on mobile. |
| `secondary-alt` | 2px Qualys Blue outline, blue label | blue fill, white label | `cobalt` fill | `rhino` outline, `asphalt` label | An alternative CTA of equal weight — "Register" with "Join Waitlist". |
| `secondary-inverted` | 2px white outline, white label | 10% white wash | as default | 50% opacity | Secondary CTA on dark grounds. |

Sizes: `lg` 50px tall with 14px 20px padding (`spacing-sm`, `spacing-lg`); `sm` 40px tall with 12px 16px padding (`spacing-xs`, `spacing-rg`), measured from the outer edge as in Figma — "usually within smaller modules, like cards, or on mobile". Both use `button-label` (Wix Madefor Text SemiBold 16px, −0.5%), `radius-md` (12px) corners, 16px icons with a `spacing-5xs` (4px) gap. The 2px outline is drawn inside the box (an inset shadow), so it takes no room: outlined and filled buttons are the same size and their labels sit in the same place.

- One primary per view; pair it with a secondary or a TextLink.
- On dark or blue surfaces use only the inverted variants.
- Keyboard focus shows `focus-ring` (Figma notes focus and loading states are still to design; focus is added here, loading is not).
- Contrast, as designed: white on Qualys Red 4.18:1, red on Off white 4.01:1, red outline label on warm off-white 4.04:1, blue outline label 3.65:1 — all under 4.5:1 for a 16px SemiBold label. Kept exact and flagged for the Qualys accessibility review. The primary's Crimson hover (6.5:1) and Pepper pressed (8.2:1) states pass.
- **Names:** every configuration has a name, `btn-{variant}-{size}[-icon-left | -icon-right]-{state}`, with the states `default`, `hover`, `active` and `disabled` (for example `btn-secondary-alt-sm-icon-right-hover`). The preview lists each one with its tokens and when to use it.
- **Showing a state without the pointer:** the classes `is-hover` and `is-pressed` draw the hover and pressed states, for documentation and screenshots only. Never use them on a live page.
- **Tiers, labels and do's and don'ts:** see the Buttons and links guide.
