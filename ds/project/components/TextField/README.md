# TextField

**Status:** Ready

The form text field from the Figma Inputs sheet: a white 56px box whose label sits inside as the placeholder, then floats up small when the field is focused or filled.

**Provide:** `label` (Title Case, short) and, when needed, `error` or `hint`. Use `labelMode="static"` for the variant where the small label always shows. Any other input attribute (`type`, `name`, `required`, `value` / `onChange`) passes through.

- Box: 56px tall, `surface-neutral-100` (white), 1.5px `stroke-neutral-400` border, `radius-rg` (10px), `spacing-rg` (16px) side padding.
- Empty: label in `paragraph-rg` 16px, `text-secondary`, centered. Focused or filled: label 12px `text-primary` at the top, typed text 16px `text-primary` below it.
- States: focused — `qualys-blue` border. Error — `qualys-red` border and the message 14px `qualys-red` under the field, `spacing-5xs` (4px) below it, indented 16px; sets `aria-invalid`. Disabled (not drawn in Figma) — 50% opacity.
- Stack fields `spacing-rg` apart; pair with a full-width primary Button.
- Accessibility: the Ash border is 1.26:1 on white, below the 3:1 WCAG asks for field edges; the error text is 4.18:1. Both match Figma and are flagged for review.
