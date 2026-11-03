# EventBanner


A banner for an event or a series of them: the series name in spaced capitals beside a thin rule, then a blue Tag ("Live Virtual Event") and the title, with one Button at the right. It sits over a light picture or a silent, looping video.

**Provide:** `title`, and usually `series`, `tag`, `action` (`"Watch Now"` or `{ label, href }`) and `image` or `video` (with `image` as its poster). Optionally `tone`.

| Tone | What it shows |
|---|---|
| `light` (default) | `text-primary` type on the picture, with no wash. Use a light picture or video with calm space behind the copy |
| `dark` | Black at 50% over the picture, white type, the rule in white |

**Sizes**

- A `radius-lg` card on the content column, 230px tall at least, 24px padding, `shadow-card`. With no picture it is `surface-neutral-100` (Asphalt in `dark`).
- **Series:** Wix Madefor Text Medium 24px, uppercase, spaced 0.2em, one word per line, right-aligned against a 1px `stroke-neutral-500` rule, 32px before the copy.
- **Copy:** 600px wide at most: the Tag (blue fill), 16px, the title in `h2` (SemiBold 38px).
- **Button:** one primary Button at the right edge, centered on the copy.

**States**

- **Video:** silent and looped, hidden from screen readers. It stays on its poster when the reader asks for reduced motion, as in Hero.

**Behavior:** the picture covers the card and crops from the center.

**Mobile:** 16px padding, 220px tall at least. Everything stacks on the left: the series on one line (14px, spaced 0.15em, no rule), the Tag, the title (24px), then the Button.

**Accessibility**

- The title is a real heading (`titleLevel` to change it); the picture and video are decoration.
- Check the type against the picture: `light` needs a light ground behind the copy, otherwise use `dark`.
- A video that plays longer than five seconds needs a way to pause it (WCAG 2.2.2) on a live page.

Do / Don't:

- Do keep the title to two lines and the button to one short action.
- Don't put more than one button or a paragraph in it; use a GeneralContent banner for that.

Notes:

- First built for the Cyber Risk Series banner on the homepage redesign.
