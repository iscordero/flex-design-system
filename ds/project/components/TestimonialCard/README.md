# TestimonialCard


A customer quote from the Figma Testimonials page: the customer's logo, the quote, who said it and a link to the story.

**Provide:** `quote`, `name`, `company`, `logo` and `logoAlt`; optionally `avatar`, `link`, `size`, `image` or `video`.

| Figma name | Props | What it shows |
|---|---|---|
| Large Testimonial Card | default | 939 × 500px, the quote in `quote-lg` (32px) |
| Full Image Background Large Testimonial Card | `image` | The same over a photo, with the quote on a white panel |
| Small Testimonial Card | `size="sm"` | 500px wide, the quote in `quote-md` (24px) |
| Video Testimonial Card | `video` | The small card with a portrait clip on the right |

- White, `radius-lg`, `shadow-drawer`. Padding is 36px (large) or 24px (small).
- **Logo:** up to 60px tall, at the top left; 24px below it, the quote.
- **Foot,** pinned to the bottom: a 40px Avatar with the name (Wix Madefor Text SemiBold 16px) over the company (`text-secondary`), and on the right a blue TextLink with the arrow, "Read the Story".
- **On a photo:** the picture fills the card with a hairline edge; the content sits on a panel 62% wide, white at 90%, `radius-md`, 24px padding.
- **With a video:** the clip is 312px wide with `radius-rg`, 24px from the copy, with the play button. The person shows without an avatar. With no video, leave `video` out and the quote takes the full width.
- **On its own:** place the card in a section (`.q-section` › `.q-section__inner`), centered at up to 939px, the Large card's Figma width.
- **Mobile (in TestimonialCarousel or on its own in a section):** the same card as on desktop (white, `radius-lg`, `shadow-drawer`, no outline, the small card's 24px padding), 300px wide in the carousel; the quote drops to 16px; the link moves under the person. A video moves to the top at 16:9.

Video behavior, from the Figma usage notes:

- Use one aspect ratio for every clip, preferably 9:16, with a clear, uncluttered thumbnail.
- On hover the thumbnail may play silently; pressing play opens the video in a modal that dims the page, with the usual controls and a close button. Handle that with `video={{ video: true, poster, onPlay }}`.
- Video cards and small cards can share one carousel.

Do / Don't:

- Do keep quotes under about 200 characters, in the customer's words, inside quotation marks.
- Do give the logo `logoAlt` text (the company name).
- Don't use a busy photo behind the panel.

Notes:

- The large card is drawn with a different shadow (0 4px 24px at 10%) from the others; all use `shadow-drawer`.
- The Figma usage notes for the non-video cards are still placeholders.
