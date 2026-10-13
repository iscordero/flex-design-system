# Tooltip

A short label for the thing it points at, shown on hover and on keyboard focus.

**Provide:** `label` and the element it describes as the child. Optionally `position` and `theme`.

- **Position:** `top` (default), `bottom`, `left`, `right`, with a small arrow pointing at the trigger, 8px away.
- **Theme:** `dark` (white text on `surface-neutral-600`, the default) or `light` (white with a hairline and `shadow-modal`), for dark backgrounds.
- 8px by 12px padding, `radius-sm`, IBM Plex Sans Medium 14px, up to 240px wide before it wraps.
- **Timing:** appears 300ms after the pointer arrives and at once on keyboard focus; fades over 150ms. `delay` changes the wait.
- Leaves when the pointer leaves, when focus moves on, or on Esc.
- Sits at `z-tooltip`.
- **Accessibility:** `role="tooltip"`, tied to the trigger with `aria-describedby`. Plain text as the child gets a dotted underline and a tab stop so the keyboard can reach it.
- A few words only, and never the only place something important is said: it can't be reached on touch screens. No links or buttons inside.
- `open` forces it on, for documentation.
- Figma sets the text at 13px; this uses 14px, the smallest size in the type scale. Figma's 8px corner uses `radius-sm`.
