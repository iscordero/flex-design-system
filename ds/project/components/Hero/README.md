# Hero


The top-of-page module from the Figma Hero page (Ready for Dev): an eyebrow, a display heading, a short paragraph and up to two actions, on its own, beside media, over a photo or video, or beside a lead form.

**Provide:** `layout`, `size`, `eyebrow`, `title`, `body`, `actions`, and for the layout: `media` (split), `background` (photo or video behind the copy), or `form` (a Form) with an optional `visual`.

| Figma name | Props | Use it for |
|---|---|---|
| Split Media Impact / Standard Hero | `layout="split"`, `media={{ src, alt }}` or `media={{ video, poster }}` | Product feature pages and service overviews, with a UI screenshot, lifestyle photo or demo video |
| Left-Aligned Text Impact / Standard Hero | `layout="left"` | Landing, category and index pages, where the message is text-heavy |
| Center-Aligned Impact / Standard Hero | `layout="center"` | Campaign, event and lead-generation pages, with brief, punchy copy |
| Left-Aligned Image Background Hero | `layout="left"`, `background={{ src }}` | The same, over a photo on a rounded card as wide as the content column |
| Center-Aligned Image Background Hero | `layout="center"`, `background={{ src }}` | The same, on a contained photo card |
| … Animation / Video | `background={{ video, src }}` (src is the poster) | A looping, silent background video |
| Lead Form Hero | `layout="form"`, `form={{ … }}`, `visual` | Competitive and campaign pages that open with a sign-up |
| Hero with background visual | `layout="split"` or `"left"`, `visual` | Campaign and product launch pages that want the Lead Form hero's look without a form |

`size="lg"` is Impact (64px heading); `size="rg"` is Standard (56px).

**Layout**

- Section on `surface-neutral-200`, 48px top and bottom, content in the content column (`content-max`, up to 1440px).
- **Copy:** eyebrow in `eyebrow-xl` (22px, `text-secondary`), 12px; the heading in `display-xl` (Impact) or `display-lg` (Standard), `text-primary`; 24px (Impact) or 16px (Standard); the body; 36px; the actions, 8px apart.
- **Body size:** 24px (`paragraph-lg`) in the left-aligned and centered Impact heroes; 18px beside media or a form and in the centered Standard hero; 16px in the split Standard hero.
- **Split:** copy up to 600px (at every width above mobile), 56px (`spacing-5xl`), media. Images are 14:9 (560 × 360) and videos 16:9, both `radius-lg`. Impact centers the copy on the media; Standard aligns both to the top.
- **Left and center:** the copy block is 1000px at most; centered heroes center everything.
- **On a photo or video:** `radius-lg`. `tone: 'dark'` (default) puts black at 50% over the picture, with white copy; `tone: 'light'` puts a white veil over it, with `text-primary` copy: 82% under centered copy; under left-aligned copy 92% fading to 30% at the far side, so the photo still shows there (a flat 86% on mobile). Every photo and video sits in a rounded card as wide as the content column (up to 1440px), with its edges lined up with the Nav and the other modules. Left-aligned copy is 56px from the top and bottom and 36px (`spacing-3xl`) from the sides inside the card; centered copy has 36px all round; 24px × 20px on phones. `background.contained: false` gives the older card instead, inset 16px (`spacing-rg`) from the window on every side (8px on phones). Actions are a primary Button and an inverted TextLink with an arrow, 16px apart.
- **Lead form:** copy on the left, the Form (`variant="gate"`) on the right on `surface-blue-100` with a deeper shadow. `visual` places a decorative graphic behind the form (see Background visual).

**Tablet (768–1023px):** split heroes stay side by side, copy 60% and media 40%, and the heading scales down. The lead form drops under the copy.

**Mobile (under 768px):** 24px × 20px padding. Media moves above the copy, 20px apart. Eyebrow 16px, heading 36px, body 18px (16px beside media or a form). Buttons stack full width, 8px apart. On a photo they keep their own width and stack 16px apart.

**Background visual**

A decorative graphic behind the hero's content: the wireframe star from the Lead Form hero (`visual-star.svg` in Images). It adds depth to a hero that has no photo, and marks campaign and launch pages.

- **Where it works:** `layout="form"` (behind the form), `layout="split"` (behind the image or video) and `layout="left"` (filling the empty right side). Pass the image's address, or an inline SVG node, as `visual`. It is ignored on centered heroes (it would sit under the copy) and on heroes with a background photo or video (it would fight the picture).
- **The image:** use the supplied star. Any replacement must be a vector (SVG) or a transparent PNG at least 1840px wide, roughly square, light and airy (pale blues, thin lines, lots of empty space), with no text, logos or faces in it. Never recolor, rotate or crop the supplied file.
- **Layering:** the graphic always sits behind: under the form, under the media, and never under the copy. The form or media keeps its own background and shadow on top of it.
- **Size and position:**
  - Lead form: 165% of the form's width, starting 7.5% left of the form and 15% above it.
  - Split media: the same, measured from the image or video.
  - Left-aligned text: the copy keeps a 600px column; the graphic fills the right side at 110% of its width, centered top to bottom, starting 4% in from the side's left edge. That side is at least 360px tall.
- **Overflow:** the graphic is larger than its box on purpose. The hero section clips it at its own edges (`overflow: hidden`), so it can bleed off the top, bottom and right of the section but never into the next section or across the page.
- **Display:** shown in full color at full opacity, no blend mode, no shadow. It doesn't move: no parallax, animation or hover effect, so there is nothing to switch off for reduced motion.
- **Tablet (768–1023px):** split and left-aligned heroes keep their row, so the graphic keeps its place and scales with the narrower side. The lead form drops under the copy, and the graphic follows the form.
- **Mobile (under 768px):**
  - Split media: the image moves above the copy, and the graphic rises from behind the image's foot into the space above it (124% of the image's width, its bottom edge 4% below the image), so it never reaches the copy.
  - Lead form: the graphic sits behind the form at 184% of its width, starting 12% down and 27.5% to the left.
  - Left-aligned text: hidden, because there is no empty side to fill.
- **Accessibility:** decoration only. It is `aria-hidden`, its image has empty `alt`, and it takes no pointer events, so it can't be clicked or focused.
- **Use it once per page,** in the hero. Don't add it to other sections, and don't place text, buttons or badges over it.

**Character counts (from Figma)**

| Layout | Headline | Body |
|---|---|---|
| Split | 40–60, under two lines on desktop | 120–160 |
| Left-aligned | 50–75 | 150–200 |
| Centered | 30–50 | 100–140 |

Eyebrow: about 20 characters.

**Do / Don't**

- Do keep one primary action; add a secondary Button or a TextLink only when there is a second step.
- Do give every photo and poster `alt` text, or leave it empty when it is decoration.
- Don't center long headlines; use the left-aligned hero.
- Prefer a pale, quiet picture for the light tone. The veil keeps dark copy readable on a busier photo, but it also washes the photo out. Figma draws white at 25%, which left the copy hard to read; raised in review.
- Background video plays silent and looped, and stays on its poster when the reader asks for reduced motion.

Where the Figma frames disagree, one value is used:

- The Layout Implementation frames draw the left-aligned photo hero as a card inset 16px from the window, with its copy on the content column. From review, the card is the content column instead (up to 1440px), lined up with the Nav, with the copy 36px (`spacing-3xl`) inside it. The inset card is still available with `background.contained: false`.
- In the Lead Form hero the star visual is drawn on top of the form; here it sits behind, so the form stays usable.
- The mobile Standard split hero is drawn with a 32px heading; every mobile hero uses 36px.
- The tablet frames squeeze the media to a sliver; here copy and media share the row 60/40.

- **Banner:** the form can open with a banner (`form.banner`): a photo, a headline on a color, a headline with an image, or a headline over a photo. See Form for the variants.
