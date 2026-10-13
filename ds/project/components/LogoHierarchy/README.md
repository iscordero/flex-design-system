# LogoHierarchy

The logo hierarchy from the Figma Logos page: logos grouped in tiers under a heading, such as event sponsors. The first tier (the signature sponsor) is drawn larger than the rest.

**Provide:** `title` and `tiers` — each with a `label` and `logos` (`{ src, alt, href, scale }`). Optional: a tier's `level` and `mobileColumns`, the module's `mobileColumns` and `optical`.

- Section on `surface-neutral-100`, 100px above and below, everything centred.
- **Heading:** `h2` (SemiBold 38px) in `text-secondary`.
- **Tier:** 36px under the heading or the tier before. The label is Wix Madefor Text Regular 20px `text-secondary`; 32px (`spacing-2xl`) below it, the logos.
- Put the highest tier first with the fewest logos: one signature sponsor, then the standard sponsors.

## Logo hierarchy

| Level | Desktop cell | Mobile cell | Use it for |
| --- | --- | --- | --- |
| `signature` | 320 × 84px | 240 × 64px | The lead sponsor: one logo, two at most |
| `standard` | 210 × 52px | 143 × 35px | Everyone else, four to a row on desktop, 32px apart (`spacing-2xl`), 48px between rows (`spacing-4xl`) |

- A first tier of one or two logos (with more tiers below) is the signature tier by default. Set `level` on a tier to override it.
- The signature logo is about 1.5× the standard logos, enough to read as the lead without crowding the tier below.
- Don't give a tier of three or more logos the signature level: it stops reading as a hierarchy.

## Mobile columns

Below 768px the section takes 20px padding, the heading 24px and the labels Medium 18px. Standard sponsors stack in one or two columns; the signature tier is always one column.

| Logos in the tier | `mobileColumns` | Why |
| --- | --- | --- |
| 1–4 | `1` | One per row, 143 × 35px, 32px apart. Each logo stays big enough to read |
| 5–12 | `2` | Two per row, 32px between rows. Keeps the list to six rows or fewer |
| More than 12 | `2`, or curate | The tier gets long on a phone: show the top 12, or use LogoCarousel |

- `auto` (the default) picks 1 for up to four logos and 2 from five.
- Set it per tier (`tiers[i].mobileColumns`) or for the module (`mobileColumns`).
- Keep the same column count for tiers of the same level, so the page doesn't change rhythm halfway down.

## Optical sizing

Logos come in very different shapes, so fitting each one to the full cell makes square and stacked marks look small and long wordmarks look loud. The module sizes them for **equal visual weight** instead.

1. **Equal area (automatic).** Each logo gets about the same area inside its cell: a long wordmark runs wide and short, a square mark stands taller and narrower. On by default; `optical={false}` turns it off and fits every logo to the cell.
2. **Weight adjustments (by hand).** Area doesn't account for ink. Use a logo's `scale` to correct it:
   - Dense, dark, filled or boxed logos (solid backgrounds, heavy type) look bigger: `scale` 0.85–0.95.
   - Thin, light or airy logos (hairline type, outlines, lots of white space) look smaller: `scale` 1.05–1.15.
   - Stay inside 0.8–1.2. If a logo needs more, the file has extra padding: ask for a tightly cropped version.
3. **Check against the neighbours.** Squint or blur the row: no logo should jump out or sink back. Compare cap heights of wordmarks and the visual mass of symbols, not their boxes.

Supplying logo files:

- Each logo is centred in its cell, both ways. A logo that looks off-centre has uneven padding in its file: crop it tight rather than nudging it.
- SVG, cropped tight to the artwork with no padding, one colour version per ground (full colour or one-colour charcoal on light grounds).
- Use the horizontal lockup where the brand has one; a stacked lockup only when there isn't.
- Never stretch, recolour, outline, add a shadow to or crop a sponsor's logo to make it fit. Change its `scale` instead.

## Do / Don't

- Do give every logo `alt` text (the company name).
- Do keep one signature sponsor where you can; two is the most the tier holds.
- Don't mix logos in different colour treatments (full colour next to one-colour) within a tier.

## Notes

- The Partner Pavilion design shows a blue "mROC" badge beside some sponsors. It isn't built yet; use the hover card's `badge` for partner status until it is.
- **Hover cards:** give a logo a `card` (`{ title, body, badge, link }`) and it becomes a button that opens a logo HoverCard with the logo, an optional partner badge, the name, a short text and one link. On hover with a mouse; on click, tap or Enter otherwise.
- The logos in the preview are placeholders.
