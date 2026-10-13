# InlinePromoCard

The Inline Promo card from the Figma Cards page: a promotion on Charcoal or the blue gradient with a white heading, one line of copy and one call to action, in a vertical, wide or banner layout.

**Provide:** `title`, `description`, `cta` (the label) and `href`. Choose `color` (`light` is the blue gradient, `dark` is Charcoal) and `layout`. Optional: `logo` (the reversed Qualys logo URL), `image` (a product image), `icon` (`general-events`, `general-webinar` or `general-resource`) and `button` (`primary` or `tertiary`).

| Figma name | Props | Size in Figma | Approved button |
| --- | --- | --- | --- |
| Inline Promo, Product | `layout="vertical"`, `logo`, `image` | 331 × 510 | Primary |
| Inline Promo Wide, Product | `layout="horizontal"`, `logo`, `image` | 752 × 269 | Primary |
| Inline Promo Banner, Product | `layout="banner"`, `image` | 752 × 184 | Tertiary |
| Inline Promo / Resource Hub Center with Icon | `color="dark"`, `logo`, `icon` | 331 × 400, three in a row | Primary |

- **Surface:** `radius-lg`, `shadow-drawer`. `light` is `blue-gradient-start` to `blue-gradient-end`; `dark` is `surface-neutral-600`.
- **Heading:** `h2` (Wix Madefor Text SemiBold 38px, line height 1.1, −2%), `text-inverted`. **Copy:** IBM Plex Sans Regular 16px, `text-inverted`, 16px under the heading.
- **Logo:** the reversed logo (red shield, white wordmark) at 37px tall, top left. **Icon:** a general icon, 43px tall, in `icon-inverted`, 16px above the heading.
- **CTA:** `primary` is a small Qualys Red button; `tertiary` is the inverted text link with an arrow. The whole card is the link.
- **Vertical:** 16px padding; the image sits between the logo and the heading. With a logo or icon and no image the card is at least 400px tall and the button sits at the bottom.
- **Wide and banner:** 24px padding (`spacing-xl`); copy on the left 60%, the image bleeding off the right edge. The banner has no logo.
- **Mobile (under 768px):** wide and banner stack like the vertical card, image above the heading. On tablet the vertical card just grows wider.
- Red on the blue gradient is the Figma pairing for these cards; don't swap in other button colours.
