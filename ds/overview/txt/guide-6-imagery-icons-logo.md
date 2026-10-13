# Imagery, Iconography and Logo

## Imagery and video

- Photography is professional and enterprise-oriented, cool to neutral in tone. Abstract tech and data visuals may sit behind sections as decoration. No hand-drawn illustration or playful artwork.
- Heroes on key landing pages are full-bleed with a dark overlay under white text. Video banners always get an overlay; their play button is an Asphalt glyph on a white disc.
- Aspect ratios: 16:9 for heroes and for card images (Event, Webinar, Resource and Blog cards). Media beside copy in block modules is 16:9 on desktop and tablet; video testimonials are 9:16 with a clear, uncluttered thumbnail.
- Photo heroes use a wide photo with a calm area behind the copy (`hero-bg-building.jpg` for white text, `hero-bg-office.jpg` for charcoal text, both in the Images group). The lead-form hero may carry the star visual behind its form (`visual-star.svg`).
- **Customer, partner and sponsor logos:** use each company's own logo file as it supplies it, on a clear ground, at a similar visual size to its neighbours and with the company name as its text alternative. Never redraw, recolour or crop one. The previews in this system use neutral placeholders.
- Product images on inline promo cards sit on the blue gradient or Charcoal with a transparent ground (`promo-laptop.png` in the Images group).
- Form headers use a 30:11 photo (600 × 220px) of people at work, cropped so faces stay clear of the edges (`form-header-meeting.jpg` in the Images group).
- People photos (avatars and profile cards): clean, simple, professional backgrounds — solid colours, subtle gradients, a soft-focus office or a neutral indoor setting; no busy patterns, high contrast, uneven lighting or heavy shadows. Square crops keep the face at 60 to 70% of the frame; circular crops keep it centred with nothing cut off. A missing photo shows the default avatar (`avatar-bg` with the `avatar-icon` silhouette), never a broken image.

## Iconography

- Custom SVG icons, inline, monochrome, drawn in `currentColor` — no icon font, no CDN icon library. Use the `Icon` component or the files in the Icons group.
- **Utility icons** (this system): download, arrow-right / arrow-left, outlink, search, check, filter, menu, time, chevrons in four directions, plus, cross, the calendar's three view icons (list, month, grid), and the status set for dialogs and notifications (alert-triangle, alert-circle, check-circle, x-circle, file, party, cookie). 16px in buttons, text links and fields, with a 4px gap from button labels.
- **Event icons** (this system, Event Icons group and `event-*` in Icon): Qualys Event, Webinar, Industry Event, Speaking Engagement, Training — 24px, each in its own colour, always beside its label (EventType).
- **General icons** (this system, General Icons group and `general-*` in Icon): Events, Webinar, Resource — 56 × 43 line icons in `icon-inverted` on the Charcoal hub promo cards.
- **Social icons** (this system, Social Icons group and `social-*` in Icon): LinkedIn, X, Facebook, Instagram, Vimeo, YouTube and URL — 24px in the 52px blue SocialButton, 15px in `text-secondary` for plain rows, 25px in Rhino in the footer. They are the networks' own marks: use them as supplied, and only to link to that network.
- **Feature icons** (this system, Feature Icons group): 19 two-tone blue illustrations — AI, Agentic AI, Application, Applications, Assets, Cloud, Communication, Compliance, Configure, Detect, Eliminate, Measure, Prioritize, Remediation, Response, Risk, Threat, Vulnerability, Web Application. They keep their own colours; show them at 32px beside a Drawer title, 56px on a Card, never recoloured. **Social icons** live in the Figma file.
- `outlink` marks links that leave qualys.com; `arrow-right` marks links that stay; `download` leads download buttons.

## Logo

- Use the full-colour logo (`qualys-logo-full-rgb.svg`: Qualys Red shield, charcoal wordmark) on white and warm off-white. On charcoal or blue grounds render it all-white (`filter: brightness(0) invert(1)`); inline promo cards use the reversed logo instead (`qualys-logo-reversed.svg`: red shield, white wordmark).
- The shield alone (`qualys-shield.svg`) is for square or tight spaces. Never redraw, recolour or re-letter the mark.
- Nav logo height 37px. The footer shows the shield alone, 75px wide (39px on mobile), in its notch.
