# Colour

Use the semantic tokens (surface, brand, text, stroke, button, icon, link, utility); the palette names behind them are for reference.

- **Surfaces.** Default page background `surface-neutral-200` (Warm Off White); alternate sections with `surface-neutral-300` (Ecru) and `surface-neutral-100` (White). Cards and the nav are white. Light blue sections and CTA form containers use `surface-blue-100` (Polar Blue); blue sections `surface-blue-300`; dark sections, dark heroes, the footer and dark cards `surface-neutral-600` (Charcoal). Text fields, form dropdowns and menus are white; filter dropdowns use `filter-bg` and contained search bars `search-bg`.
- **Text.** `text-primary` (Charcoal) for headings and body on any light ground; `text-secondary` (Asphalt) for disclaimers, placeholders and metadata; `text-inverted` on charcoal and blue. `text-accent-primary` (Qualys Blue) for emphasis in cards and drawers; `text-accent-secondary` (Qualys Red) for button text links.
- **Actions.** Primary buttons are Qualys Red (`button-bg-primary-default`), Crimson on hover, Pepper when pressed. Page links are Qualys Blue, Cobalt on hover; breadcrumb links are Qualys Blue too (Cobalt when pressed), with the current page in `text-primary`; inline body-copy links use `hyperlink-default`. Button text links are red, Crimson on hover.
- **Strokes.** `stroke-neutral-400` (Ash) for text-field and form-dropdown borders (1.5px) and card, nav and divider lines on white; `stroke-neutral-500` (Rhino) for checkboxes, radios and the search-bar line; `stroke-neutral-100` (White) for outlines on blue.
- **Icons.** `icon-default` on light grounds, `icon-inverted` on dark, `icon-feature` for feature icons; interactive icon containers use `icon-bg-default` → `icon-bg-hover` → `icon-bg-pressed`.
- **Utility.** `utility-warning-default` and `utility-success-default` for alert and status accents only (toasts, alert dialogs, the notification bar), always with a word or icon. Red is the error and destructive accent, blue the info one. Their soft grounds are a 10% tint of the same colour. `warning-strong` is for the session countdown figures alone.
- **Overlays.** `overlay-light` (black at 25%) behind modals; `overlay-dark` (black at 50%) when the page behind is busy.
- **Tags.** Badges use nine tones (`tag-purple`, `qualys-blue`, `pepper`, `tag-red`, `tag-green`, `tag-orange`, `tag-yellow`, `asphalt`, `tag-slate`); flags `flag-tier-1`–`3`; markers `marker-1`–`3`, which are the same three colours as the flags, plus `marker-blue` (Qualys Blue) for an active item; filter chips `chip-bg` / `chip-bg-active`. These colours are for tags only, not surfaces or text.
- **Gradient.** `blue-gradient-start` → `blue-gradient-end`, light to dark from the top left (124°, starting at 30%), is one token in CSS, `--surface-promo-gradient` (set in `bundle.css`). It is the ground of the blue inline promo cards (white heading and short copy, a Qualys Red button) and a background for feature sections — never behind long body copy.

Contrast notes that change what you pick:
- Qualys Blue measures 3.78:1 on white and 3.65:1 on warm off-white: right for headings 24px+, large figures, icons and borders. Where small blue text must pass 4.5:1, use `brand-blue-600` (Cobalt, 8.9:1) or `hyperlink-default` (4.69:1).
- Qualys Red with white measures 4.18:1 — the brand's primary button pair, kept as designed and flagged for accessibility review.
- `success` (2.57:1) and `warning` (2.03:1) are accents, never text colours. `warning-strong` (2.98:1) is for the 32px countdown only — flagged.
- Yellow, orange, green and blue badges, tier 2 and 3 flags and markers, the blue marker and the selected filter chip are under 4.5:1 for their text (1.7–3.8:1) — as designed, flagged; never let a tag's colour carry meaning its word doesn't.
- Field edges are below the 3:1 WCAG asks for (Ash 1.26:1, Rhino 2.05:1), and the red error text is 4.18:1 — kept as designed, flagged for review.
