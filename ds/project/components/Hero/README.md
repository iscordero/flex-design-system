# Hero


The top-of-page module from the Figma Hero page (Ready for Dev): an eyebrow, a display heading, a short paragraph and up to two actions, on its own, beside media, over a photo or video, or beside a lead form.

**Provide:** `layout`, `size`, `eyebrow`, `title`, `body`, `actions`, and for the layout: `media` (split), `background` (photo or video behind the copy), or `form` (a Form) with an optional `visual`.

| Figma name | Props | Use it for |
|---|---|---|
| Split Media Impact / Standard Hero | `layout="split"`, `media={{ src, alt }}` or `media={{ video, poster }}` | Product feature pages and service overviews, with a UI screenshot, lifestyle photo or demo video |
| Left-Aligned Text Impact / Standard Hero | `layout="left"` | Landing, category and index pages, where the message is text-heavy |
| Center-Aligned Impact / Standard Hero | `layout="center"` | Campaign, event and lead-generation pages, with brief, punchy copy |
| Left-Aligned Image Background Hero | `layout="left"`, `background={{ src }}` | The same, over a photo on a rounded card inset from the window |
| Center-Aligned Image Background Hero | `layout="center"`, `background={{ src }}` | The same, on a contained photo card |
| … Animation / Video | `background={{ video, src }}` (src is the poster) | A looping, silent background video |
| Lead Form Hero | `layout="form"`, `form={{ … }}`, `visual` | Competitive and campaign pages that open with a sign-up |

`size="lg"` is Impact (64px heading); `size="rg"` is Standard (56px).

**Layout**

- Section on `surface-neutral-200`, 48px top and bottom, content in the content column (`content-max`, up to 1440px).
- **Copy:** eyebrow in `eyebrow-xl` (22px, `text-secondary`), 12px; the heading in `display-xl` (Impact) or `display-lg` (Standard), `text-primary`; 24px (Impact) or 16px (Standard); the body; 36px; the actions, 8px apart.
- **Body size:** 24px (`paragraph-lg`) in the left-aligned and centered Impact heroes; 18px beside media or a form and in the centered Standard hero; 16px in the split Standard hero.
- **Split:** copy up to 520px, 56px (`spacing-5xl`), media. Images are 14:9 (560 × 360) and videos 16:9, both `radius-lg`. Impact centers the copy on the media; Standard aligns both to the top.
- **Left and center:** the copy block is 1000px at most; centered heroes center everything.
- **On a photo or video:** `radius-lg`. `tone: 'dark'` (default) puts black at 50% over the picture, with white copy; `tone: 'light'` puts a white veil over it, with `text-primary` copy: 82% under centered copy; under left-aligned copy 92% fading to 30% at the far side, so the photo still shows there (a flat 86% on mobile). The left-aligned photo is a rounded card (`radius-lg`) inset 16px (`spacing-rg`) from the window on every side, 8px on phones, on the module's own `surface-neutral-200` ground, with its copy on the page's content column (up to 1440px) at every width: 56px top and bottom inside the card, and 24px × 20px on phones; centered photos and all videos sit in a card as wide as the content column, with 36px padding. Actions are a primary Button and an inverted TextLink with an arrow, 16px apart.
- **Lead form:** copy on the left, the Form (`variant="gate"`) on the right on `surface-blue-100` with a deeper shadow. `visual` places a decorative graphic behind the form.

**Tablet (768–1023px):** split heroes stay side by side, copy 60% and media 40%, and the heading scales down. The lead form drops under the copy.

**Mobile (under 768px):** 24px × 20px padding. Media moves above the copy, 20px apart. Eyebrow 16px, heading 36px, body 18px (16px beside media or a form). Buttons stack full width, 8px apart. On a photo they keep their own width and stack 16px apart.

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

- The left-aligned photo hero follows the Layout Implementation frames (mobile, tablet, desktop and large desktop): an inset rounded card with the copy on the content column.
- In the Lead Form hero the star visual is drawn on top of the form; here it sits behind, so the form stays usable.
- The mobile Standard split hero is drawn with a 32px heading; every mobile hero uses 36px.
- The tablet frames squeeze the media to a sliver; here copy and media share the row 60/40.

- **Banner:** the form can open with a banner (`form.banner`): a photo, a headline on a color, a headline with an image, or a headline over a photo. See Form for the variants.
