# SocialButton

**Status:** Ready

The social buttons from the Figma Social page: a link to a profile on LinkedIn, X, Facebook, Instagram, Vimeo or YouTube, or to any other website.

**Provide:** `network` (`linkedin`, `x`, `facebook`, `instagram`, `vimeo`, `youtube` or `url`) and `href`. The accessible name defaults to the network ("LinkedIn", "Website"); pass `label` to say whose profile it is ("Jonathan Doe on LinkedIn").

- **Button:** 52 × 52px, `radius-rg`, a 24px glyph in `icon-inverted`.
- **States:** `icon-bg-default` (Qualys Blue), `icon-bg-hover` on hover, `icon-bg-pressed` while pressed, and the focus ring on keyboard focus.
- **Plain** (`variant="plain"`): the glyph alone at 16px (icon size `sm`) in `text-secondary` (Asphalt), 16px apart in a row, turning `icon-default` on hover. Used for the row of social links in the profile modal; on mobile each takes a 44px touch target.
- Links open in a new tab; set `newTab={false}` to stay in the same one. Without `href` it renders a button and takes `onClick`.
- The profile chip on ProfileCard and ProfileModal is this button; the footer's social links are the plain version at 24px (`lg`) in Rhino. The Vimeo and YouTube glyphs come from the Figma Footer file.
- Keep the glyphs as supplied: one ink, no redrawing, stretching or rotating, and each only for a link to that network. For a network that isn't in the library, pass its official icon as `icon`.
- Figma labels the mid blue (#165C9D) "Active" and the darker blue (#134F86) "Hover". The icon tokens have it the other way round (hover, then a darker pressed), and this follows the tokens.
- Figma draws the plain glyphs in a slate gray (#69778A) that isn't in the palette; they use Asphalt instead, the same gray as the modal's close icon and "About" label.
