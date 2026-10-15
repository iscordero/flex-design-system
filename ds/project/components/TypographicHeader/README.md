# TypographicHeader

**Status:** Ready

The section opener from the Figma Typographic Headers page (Ready for Dev): an eyebrow, a heading, a short paragraph and up to two buttons, with no media.

**Provide:** `title`, and optionally `eyebrow`, `body`, `actions` and `align="center"`.

- Section on `surface-neutral-200`, 48px top and bottom. The copy sits in a 1000px block, centered in the page.
- **Eyebrow:** `eyebrow-lg` (Wix Madefor Text SemiBold 18px, 5% letter spacing), `text-secondary`.
- **Heading:** `h2` (Wix Madefor Text SemiBold 38px, line height 1.1, −2%), 6px under the eyebrow. It is an `h2` unless you pass `titleLevel`.
- **Body:** `paragraph-rg` (16px), 800px at most, 12px under the heading.
- **Actions:** 32px under the body, 8px apart: a primary Button, then a secondary one.
- `align="center"` centers the text, the paragraph block and the buttons.
- **Mobile:** 24px × 20px padding; eyebrow 14px, heading 24px (`h2` on mobile); the buttons stack full width, 24px under the body.

Use it to open a group of modules or cards. For the first heading on a page use Hero.

Notes:

- Figma draws the heading Bold; it uses the closest heading style, `h2` (SemiBold), like the General Content and Tab modules.
- The left-aligned block is a 1000px block centered in the content column, as Figma draws it. Say if it should line up with the column edge instead.
- The mobile eyebrow is uppercase in Figma and mixed case on desktop; it is left as typed on both.
- The Figma usage notes are still placeholders ("Used for…").
