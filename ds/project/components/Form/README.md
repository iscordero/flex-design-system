# Form


The lead-capture card from the Figma Forms page (Ready for Dev): a heading, a short stack of fields, an opt-in checkbox, one primary Button and the consent line, on a warm card.

**Provide:** `variant`, `title`, `fields` (`{ name, label, type, required, half, options }`), `submitLabel`, and `onSubmit(values)` or `action`. Optional `subtitle`, `logoSrc` (the shield from Logos), `image` (a photo header), `consent` (the opt-in checkbox label), `link` (`{ label, href }`) and `legal`.

| Variant | Figma name | Use it for | What it shows |
|---|---|---|---|
| `full` | Lead Capture – Full | Free-trial and demo sign-up | Shield and centered heading; Work Email, First Name, Last Name, Company Name; opt-in; "Sign Up" |
| `extended` | Lead Capture – Extended | Offers that need qualifying | Left heading and subtitle; adds Phone Number and dropdowns such as Company Size; the "Have an account?" link sits under the button |
| `gate` | Content Gate – Basic | Gated reports and webinars | Left heading and subtitle; Work Email, First and Last Name, Company Name; the link sits beside the button |
| `minimal` | Email Capture – Minimal | One-field asks | Left heading and subtitle; one field and the opt-in; the link sits beside the button |

**Card**

- 600px at most, `surface-neutral-200`, `radius-lg`, `shadow-card`. Padding is 36px top and bottom and 24px at the sides (`full`, `extended`), or 24px all round (`gate`, `minimal`).
- **Heading:** `h2` (Wix Madefor Text SemiBold 38px, line height 1.1). In `full` it is centered, with the shield (54px tall) 10px above it. The subtitle is `paragraph-rg` (16px), 16px below.
- **Fields:** TextField and Select, 56px tall, 16px apart, starting 24px under the heading (22px in `full`). Mark two neighboring fields `half: true` to put them on one row, 16px apart — First Name and Last Name. A field with `options` is a Select.
- **Opt-in:** a small Checkbox (16px) with its label in IBM Plex Sans Medium 16px, 10px apart.
- **Button:** one primary Button, as wide as its label. Figma labels: "Sign Up", "See the Offer", "Check it Out", "Submit".
- **Link:** a red TextLink for people who already have an account.
- **Consent line:** `paragraph-sm` (14px) `text-primary`, last. Pass a node to link the privacy policy.
- **Photo header:** `image` adds a photo on top, cropped to 30:11 (600 × 220px), with the card's top corners. Use it without the shield.

**Submitted**

- `submitted` swaps the card's heading, fields, opt-in, button and consent line for an inline SuccessConfirmation: the green tick, the title, the message and one button. Any `banner` stays, so the card keeps its look before and after. Give the confirmation's text in `success` (`{ title, message, actionLabel, href }`; `type` is `download` unless you say `general`).
- The confirmation sits on the card's own ground, with no second panel or shadow, and the card keeps its width. It is announced to screen readers as a status.
- `submitted` is yours to set: show it from `onSubmit` once the request has gone through. For a popup instead, use SuccessConfirmation on its own.

**Banners**

Any form can open with a banner: `banner` on a Form, which also works for the form in a Hero, a CtaModule and a FormModal, and on the DemoRequestWizard. The banner spans the top of the card at 30:11 (600 × 220px in a full-width form), with the card's top corners. In a bare form, such as a CTA module's, it has all four corners rounded and 24px below it.

| Variant | Give it | Looks like |
| --- | --- | --- |
| Photo | `banner="photo.jpg"` (or `image`) | The photo fills the banner, cropped to fit |
| Headline on a color | `{ title }` | The headline on the left, on the background color (`gradient` by default) |
| Headline with an image | `{ title, image }` | The headline on the left (58% of the width), the image on the right (45%), whole and not cropped. White by default |
| Headline over a photo | `{ title, image, imagePosition: 'background' }` | The photo fills the banner, with a Charcoal wash from the left so the white headline reads on any photo |

- **Background:** `background` is `white`, `polar` (Polar Blue), `blue` (Qualys Blue), `gradient` (the blue gradient) or `dark` (Charcoal), or any color or `var(--token)`. The headline is white on `blue`, `gradient`, `dark` and over a photo, and Charcoal otherwise; set `inverted` for white text on a custom dark color.
- **Headline:** Wix Madefor Text Bold, 38px (24px when the banner is narrower than 480px, `container-banner-compact`), line height 1.1, three lines at most. Keep it to about 50 characters, such as "See Qualys in Action. Secure Your Enterprise."
- **Images:** for "with an image", use a product image or screenshot with a transparent or matching background; for the other two, a photo. Give `imageAlt` when the image says something the headline doesn't.
- The banner is decoration plus a headline: the form's own `title` still names the form for screen readers. Don't repeat the form's title in the banner.
- Use one banner per form, and leave out the shield (`logoSrc`) when there is a banner.

**Mobile (card narrower than 440px, `container-compact`)**

- 16px side padding; the heading drops to 24px (`h2` on mobile); paired fields stack; the button spans the width; the link moves under the button.
- The card follows its own width, not the screen's, so it also adapts in a narrow column.

**Behavior**

- Submitting checks the fields first. An empty required field shows "This field is required" (the Figma error text) and an email field must look like an address. The first field with a problem takes focus, and each message clears as soon as that field changes.
- With `onSubmit`, the page doesn't reload and you get the values by field name (the opt-in as `optIn`, true or false). Without it the form posts to `action`.
- Pass `error` on a field to show a message from the server. `children` adds extra content between the opt-in and the button, such as a reCAPTCHA.

**In a module**

- `appearance="bare"` drops the card (no ground, shadow or padding) and caps the form at 460px, for use inside CtaModule.
- `tone="inverted"` turns the heading, opt-in and consent line white, for a form over a dark picture.

**Do / Don't**

- Do ask only for what the offer needs; every extra field loses sign-ups.
- Do keep one primary Button per form.
- Don't put more than two fields on one row, and don't pair fields on mobile.
- Don't hide the consent line or move it above the button.

Where the Figma frames disagree, one value is used:

- Fields are 56px in the component and 50px in paired rows and the photo examples; all are 56px, as TextField.
- The opt-in box is drawn with an Ash outline; it uses the shared Checkbox outline (`stroke-neutral-500`), which is easier to see.
- "Have an account?" is a red text link everywhere except the mobile minimal form, where it is a blue hyperlink; it is the red TextLink throughout, centered on the button on desktop.
- Figma draws the mobile heading at 28px; it uses the type scale's mobile `h2` (24px).
