# LogoCarousel

The logo carousel from the Figma Logos page: a heading over one row of customer logos that scrolls by itself.

**Provide:** `title` and `logos` (`{ src, alt, href }`).

- Section on `surface-neutral-100`, 100px above and below.
- **Heading:** `h2` (SemiBold 38px), on the 1140px column, 740px wide at most. A 44px pause button sits at the right.
- **Logos,** 56px (`spacing-5xl`) under the heading: tiles 200 × 80px, `radius-md`, 56px apart, each logo fitted inside with 16px to spare. The row runs edge to edge and loops.
- **Mobile:** 20px padding, the heading at 24px (`h2` on mobile), and the logos in a two-column grid, 36px apart, with no movement.

Behaviour:

- The row moves slowly to the left (about four seconds per logo; set `duration` in seconds to change it).
- It pauses when the pointer is over it, when a logo link has focus, and when the pause button is pressed. The button then becomes play.
- With reduced motion it doesn't move; the row can be scrolled instead.

Do / Don't:

- Do use each company's logo as supplied, on a clear ground, all at a similar visual size.
- Do give every logo `alt` text (the company name).
- Don't use fewer than five logos; a short row has gaps as it loops.
- Don't alter, recolour or crop a customer's logo.

Notes:

- The pause control is drawn in Figma as a grey placeholder square; it uses the Carousel button style with a pause or play glyph.
- **Hover cards:** give a logo a `card` (`{ title, body, badge, link }`) and it becomes a button that opens a logo HoverCard: on hover with a mouse, on click, tap or Enter otherwise. The row waits while a card is open. A logo with a card does not also take `href`; the link lives in the card.
- The logos in the preview are placeholders.
- The Figma usage notes are still placeholders ("Used for…").
