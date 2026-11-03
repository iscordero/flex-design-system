# TestimonialCarousel


The testimonial modules from the Figma Testimonials page: TestimonialCards in a Carousel.

**Provide:** `items` (TestimonialCard props) and `size`.

| Size | Figma name | Card width |
|---|---|---|
| `lg` (default) | Large Testimonial Card Carousel | 939px; add `image` to each item for the photo version |
| `sm` | Small Testimonial Card Carousel | 500px, two and a bit across |
| `video` | Video Testimonial Card Carousel | 836px, with `video` on each item |

- Section on `surface-neutral-200` with 100px above and below (the other carousels use 48px).
- Cards 24px apart, starting on the content column (up to 1440px) and running off the right edge; the next card peeks in.
- Progress bar and buttons as in Carousel, right-aligned, 36px under the cards.
- **Tablet:** large and video cards become as wide as the column and the large quote drops to 24px.
- **Mobile:** 24px × 20px padding; every card is 300px wide, 16px apart; controls stack and center.

## Fewer than three quotes: no carousel

With one or two items there is nothing to scroll to, so the module drops the carousel. The cards share one row and fill the content column (two at half width each, 24px apart; one at the full width), with no progress bar or buttons, and 100px above and below. Each card keeps its size (`lg`, `sm` or `video`) and its height matches the tallest. On phones the cards stack, 16px apart. Three or more quotes always use the carousel.

Use it once per page. A single quote can also be a TestimonialCard on its own in a section.

The logos in the preview are placeholders; use each customer's own logo file as they supply it.
