# FormBanner

**Status:** Ready

A lead form with a banner on top: a short heading on a colored or photo band, and the Form attached under it in one card. Use it in the middle or at the foot of a page where the form needs its own headline. For a form at the top of the page use the Hero with a form; beside copy, use the CTA module.

**Provide:** `title` and `form` (the props of a Form, or a Form of your own). Optionally `subtitle`, `background`, `tone` and `image`.

- **Band background:** `gradient` (the promo gradient, the default), `light` (`surface-blue-200`, Misty Blue) or a photo as `{ src }`. A photo covers the band and is cropped from the center; pick a dark, quiet one.
- **Heading color (`tone`):** `inverted` (white, the default on the gradient and on photos) or `blue` (`text-accent-primary`, the default on the light band). The heading is `h3`, 24px SemiBold, two lines at most; the optional subtitle is `paragraph-rg`.
- **Artwork:** `image` sits on the right of the band, up to 460px wide and 150px tall, scaled to fit. Decorative, so it has no alt text unless `imageAlt` is given. Hidden on mobile.
- **Size:** the card fills the content column (up to 1440px); the band is at least 154px tall with 56px side padding (`spacing-5xl`) and grows with its text. `radius-lg`, `shadow-card`.
- **Form:** sits on the form ground (`surface-neutral-200`) with 36px padding (`spacing-3xl`). It is the `extended` Form by default: its own 24px heading and subtitle, fields, one primary Button, the consent line. Mark fields `half: true` to pair them in a row.
- **Mobile (the module narrower than 768px):** the band keeps its heading with 16px side padding, the artwork goes, fields stack in one column and the button fills the width.
- **States, validation and messages** are the Form's own. One primary Button in the module.
- **Accessibility:** the banner heading is an `h2` by default (`titleLevel` changes it) and the form heading is one level below it.
- From the test site's Form Banner. The test site draws the form with the old Marketo skin; Flex uses the Flex Form.
