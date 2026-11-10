# LogoCarousel


The logo carousel from the Figma Logos page: a heading over one row of customer logos that scrolls by itself.

**Provide:** `title` and `logos` (`{ src, alt, href, scale }`). Optional: `mobile`, `mobileMax`, `optical`, `duration`, `pauseButton`.

- Section on the page background, `surface-neutral-200`, 100px above and below.
- **Heading:** `h2` (SemiBold 38px), on the content column (up to 1440px), 740px wide at most. A 44px pause button sits at the right; `pauseButton={false}` hides it (see Pause button).
- **Logos,** 56px (`spacing-5xl`) under the heading: tiles 200 × 80px, `radius-md`, 56px apart, each logo sized inside with 16px to spare. The row runs edge to edge and loops.

## Mobile: stack or carousel

Below 768px the section takes 20px padding and the heading 24px. Choose what the logos do with `mobile`:

| `mobile` | What happens | Use it when |
| --- | --- | --- |
| `stack` (default) | A still two-column grid, 36px between rows. Shows the first `mobileMax` logos (default 8) | You have 8 logos or fewer, or a clear top 8 |
| `carousel` | The row keeps moving in smaller 144 × 56px tiles, 32px apart, with its pause button | You have 9 or more logos and all of them matter |

Stacking guidelines:

- **8 logos at most** (four rows of two). More than that pushes the content below too far down a phone screen.
- Order the logos so the first 8 are the ones to keep: the extras are hidden on phones, not reshuffled.
- Use an even number so the last row isn't half empty. `mobileMax` can be 4, 6 or 8.
- With 9 or more logos that all need showing, use `mobile="carousel"`.

## Optical sizing

Logos are sized for equal visual weight, not equal width, as in LogoHierarchy: each gets about the same area in its tile (`optical={false}` turns this off). Each logo is centered in its tile; supply files cropped tight to the artwork, or a logo with padding on one side will look off-center. Correct heavy or light logos with `scale`: 0.85–0.95 for dense, dark or boxed logos, 1.05–1.15 for thin or airy ones. See LogoHierarchy for the full guidance.

## Behavior

- The row moves slowly to the left (about four seconds per logo; set `duration` in seconds to change it).
- It pauses when the pointer is over it, when a logo link has focus, and when the pause button is pressed. The button then becomes play.
- With reduced motion it doesn't move; the row can be scrolled instead.

## Pause button

| `pauseButton` | What shows | Use it when |
| --- | --- | --- |
| `true` (default) | The 44px pause button at the right of the heading | Every page, unless the design calls for a clean heading row |
| `false` | No button. It comes into view only when it gets keyboard focus, so keyboard and screen reader users can still stop the row | The heading row must stay clear, such as a centered heading |

With the button hidden, the row still pauses under the pointer and when a logo link has focus, and it stays still for anyone who has reduced motion turned on.

## Do / Don't

- Do use each company's logo as supplied, on a clear ground.
- Do give every logo `alt` text (the company name).
- Don't use fewer than five logos; a short row has gaps as it loops.
- Don't alter, recolor or crop a customer's logo. Adjust `scale` instead.

## Notes

- The pause control is drawn in Figma as a gray placeholder square; it uses the Carousel button style with a pause or play glyph.
- **Hidden pause button (known problem):** WCAG 2.2.2 asks for a visible way to pause anything that moves on its own for more than five seconds. With `pauseButton={false}` the row pauses on hover and stays still with reduced motion, and keyboard users can reach the button, but a mouse user who only wants it to stop has to keep the pointer on it. Keep the button wherever you can.
- **Hover cards:** give a logo a `card` (`{ title, body, badge, link }`) and it becomes a button that opens a logo HoverCard: on hover with a mouse, on click, tap or Enter otherwise. The row waits while a card is open. A logo with a card does not also take `href`; the link lives in the card.
- The logos in the preview are placeholders.
