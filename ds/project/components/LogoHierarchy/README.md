# LogoHierarchy

The logo hierarchy from the Figma Logos page: logos grouped in tiers under a heading, such as event sponsors.

**Provide:** `title` and `tiers` — each with a `label` and `logos` (`{ src, alt, href }`).

- Section on `surface-neutral-100`, 100px above and below, everything centred.
- **Heading:** `h2` (SemiBold 38px) in `text-secondary`.
- **Tier:** 36px under the heading or the tier before. The label is Wix Madefor Text Regular 20px `text-secondary`; 32px (`spacing-2xl`) below it, the logos.
- **Logos:** each in a 210 × 52px cell, fitted inside; four to a row, 32px apart (`spacing-2xl`), with 48px between rows (`spacing-4xl`). A tier with one logo centres it.
- Put the highest tier first with the fewest logos: one signature sponsor, then the standard sponsors.
- **Mobile:** 20px padding; heading 24px (`h2` on mobile); labels Medium 18px; one logo per row in 143 × 35px cells, 32px apart.

Do / Don't:

- Do keep all logos in a tier at a similar visual size.
- Do give every logo `alt` text (the company name).
- Don't alter, recolour or crop a sponsor's logo.

Notes:

- Figma shows a small blue badge beside the signature sponsor; it has no documented meaning and is left out.
- **Hover cards:** give a logo a `card` (`{ title, body, badge, link }`) and it becomes a button that opens a logo HoverCard with the logo, an optional partner badge, the name, a short text and one link. On hover with a mouse; on click, tap or Enter otherwise.
- The logos in the preview are placeholders.
- The Figma usage notes are still placeholders ("Used for…").
