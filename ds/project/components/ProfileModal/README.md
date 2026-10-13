# ProfileModal

The bio modal from the Figma Avatars page. It opens when a profile card is clicked: the photo, name, designation and logo on the left, an "About" text on the right.

**Provide:** `open`, `onClose`, `name` and the bio as children (a string or paragraphs); optionally `designation`, `image`, `logo`, `link` and `links` (`{ network, href }`). ProfileGrid does this for you.

- **Backdrop:** the dark overlay (`overlay-dark`, black at 50%). Clicking it closes the modal.
- **Panel:** white, `radius-lg`, `shadow-drawer`, 24px padding, up to 1128px wide and centred; the height follows the bio up to 80% of the viewport, then the panel scrolls.
- **Left:** 320px square photo (`radius-md`) with the same 52px chip as the card; the profile text used everywhere: name `title-sm` (SemiBold 16px), designation `paragraph-rg` `text-secondary` (see Avatar), and the logo at 40px.
- **Right:** 56px from the photo. "About" in SemiBold 16px uppercase, +5%, `text-secondary`; 24px; the bio in IBM Plex Sans Regular 18px, line height 1.3, −1%.
- **Close:** a cross top right with a 44px hit area. Esc and the backdrop close it too.
- **Motion:** fades and rises in over 300ms; no motion with reduced-motion settings.
- **Tablet:** 300px photo, 36px gap. **Mobile:** a bottom sheet up to 95% of the viewport height, 16px padding, photo on top; the name stays at 16px and the bio is 16px.
- **Accessibility:** `role="dialog"` named by the person's name; focus moves to the close button, stays inside the modal, and returns to the card on close. The page behind doesn't scroll while it is open.
- `links` adds a row of social links bottom right: plain SocialButtons (15px glyphs in `text-secondary`, 16px apart) in the order LinkedIn, X, Facebook, Instagram, URL. A link with no `network` or `icon` shows as a text label.
- `inline` shows the panel in the page flow with no backdrop or close button, as in Figma's second drawing.
- Figma's usage note says "max-width 600px"; every drawn modal is 1128px wide (809px on tablet), so this follows the drawings.
