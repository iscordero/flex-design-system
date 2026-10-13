# Footer

The site footer from the Figma Footer file: Charcoal, with the Qualys shield in a raised notch, a lead block with a URL form and social links, three link columns and a centred legal line.

**Provide:** `logoSrc` (the shield from Logos), `heading`, `body`, `form` (`{ placeholder, buttonLabel, action or onSubmit }`), `social` (`{ network, href, label }`), `columns` (`{ title, links }`), `copyright` and `legal` links.

- **Ground:** `surface-neutral-600`. A 402 × 40px notch rises from the top edge, centred; the shield (75px wide) sits 15px below it. Content is 1140px wide.
- **Rules:** a 1px `stroke-neutral-500` rule under the shield (48px below it, `spacing-4xl`) and another above the legal line.
- **Lead block (left, up to 512px):** the heading in `h3` (SemiBold 24px, `text-inverted`); 24px; the body in `paragraph-md` (18px) Rhino; 36px; the form; 36px; the social links.
- **Form:** 472 × 54px, `radius-rg`, white at 20%, placeholder in white 16px. The submit button is 56 × 42px, `button-bg-primary-default`, `radius-media` (8px) corners, a chevron and a soft shadow; give it a `buttonLabel` for screen readers.
- **Social links:** plain SocialButtons, 25px glyphs in Rhino, 44px touch targets 8px apart, white on hover. LinkedIn, X, Facebook, Vimeo and YouTube are in the Social Icons.
- **Link columns (right):** 56px apart (`spacing-5xl`). Titles in IBM Plex Sans SemiBold 16px `text-inverted`; links in Medium 16px Rhino, 16px apart, white on hover.
- **Legal line:** centred, `paragraph-sm` (14px) Rhino: the copyright, then each legal link followed by a full stop.
- **Tablet:** the lead block stacks above the columns.
- **Mobile:** a 303 × 31px notch with a 39px shield; 24px side margins (`spacing-xl`); the body drops to 16px; the form spans the width; the columns sit two across (12px between links) with a rule above them.
- The footer follows its own width, so it also adapts inside a narrow container.

Where Figma's desktop and mobile frames disagree, one value is used for both:

- Links, body copy and social glyphs are #BDBDBD on desktop and #B5B5B5, white and #D9DCE0 on mobile; all use Rhino.
- The heading is Regular on desktop and SemiBold on mobile; it uses `h3` (SemiBold).
- The first mobile rule is drawn in #6A778B; it uses `stroke-neutral-500` like the others.
- In the mobile frame the heading overlaps the paragraph (its text box wasn't resized); here it takes the room it needs.
