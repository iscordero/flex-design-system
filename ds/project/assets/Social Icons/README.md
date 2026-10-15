# Social Icons

The social glyphs, 24 × 24: five from the Figma Social page and two (Vimeo, YouTube) from the Figma Footer file, single ink in `currentColor` (in an `<img>` they render black). Use them through `SocialButton` or the `Icon` component (`social-linkedin`, `social-x`, `social-facebook`, `social-instagram`, `social-vimeo`, `social-youtube`, `social-url`).

- `icon-linkedin`, `icon-x`, `icon-facebook`, `icon-instagram`, `icon-vimeo`, `icon-youtube` — links to a person's or the company's profile on that network.
- `icon-url` — a link to any other website.
- Figma names the buttons `icon-{network}-default`, `-active` and `-hover`; here the glyph is one file and `SocialButton` supplies the three states.
- These are the networks' own marks: keep them as supplied — don't redraw, recolor beyond the single ink, stretch or rotate them — and use each only to link to that network.

The LinkedIn glyph is the standard one, with square-ended letters, as drawn on the Active and Hover buttons in the Figma Social library. The Default button there draws a rounded version; it isn't used.
