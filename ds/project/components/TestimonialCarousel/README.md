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
- **Mobile:** 24px × 20px padding; every card is 300px wide, 16px apart; controls stack and centre.

Use it once per page. For a single quote, use a TestimonialCard on its own.

The logos in the preview are placeholders; use each customer's own logo file as they supply it.
