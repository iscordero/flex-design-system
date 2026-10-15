# CtaModule

**Status:** Ready

The closing call to action from the Figma CTAs page: a sign-up form beside or over a picture, or a dark card with a heading and buttons.

**Provide:** `form` (Form props) and `media` with a `layout`; or, with no form, `title`, `body` and `actions`.

| Layout | Figma name | What it shows |
|---|---|---|
| `media-right` (default with a form) | CTA Form Module – Media Right | The form on the left, a 14:9 image on the right |
| `media-left` | CTA Form Module – Media Left | The same, mirrored |
| `bleed` | CTA Form Module – Media Bleed Right | The picture runs off the right edge behind a rounded, cloud-shaped edge |
| `background` | CTA Form Module – Media Full Bleed | The picture fills the section under black at 50%; the form turns white |
| `card` (default without a form) | CTA Module | A dark card: heading, one paragraph, buttons |

**With a form**

- Section on `surface-neutral-200`, 56px top and bottom (`spacing-5xl`), content in the content column (up to 1440px).
- The form is the Form component without its card (`variant="full"`, `appearance="bare"`): the shield, a centered `h2` heading, the fields, the opt-in, one primary Button and the consent line, 460px wide, centered in its half.
- The image is `radius-lg`, 56px (`spacing-5xl`) from the form. `media` is `{ src, alt }`; leave it empty for the placeholder.
- **Mobile:** only the form shows, with 36px × 24px padding and a full-width button. The `background` picture stays behind it.

**Card**

- The full content column (up to 1440px), `radius-lg`, Asphalt, 48px padding, 32px above and below it.
- Heading in `h2`, `text-inverted`; 16px; the body in `paragraph-md` (18px), 500px wide at most; 24px; the actions, 8px apart.
- **Mobile:** 24px padding, heading 24px (`h2` on mobile), body 16px, buttons stacked full width.

Do / Don't:

- Do use one CtaModule per page, near the end.
- Do give the picture `alt` text when it adds meaning; leave it empty when it is decoration.
- Don't use the `background` layout over a busy picture; the fields need a calm ground.

Where the Figma frames disagree, one value is used:

- The card's second button is drawn as a red outline on the gray card, which is hard to read (about 2:1). Use `variant="secondary-inverted"` (white outline) there.
- Fields are drawn 50px tall; they are 56px, as TextField.
- Every mobile frame shows the plain form; the `background` layout keeps its picture on mobile.
- The card is Asphalt in the documented example and Rhino in the component; Asphalt is used, because white text needs it.
- The Figma usage notes are still placeholders ("Used for…").
