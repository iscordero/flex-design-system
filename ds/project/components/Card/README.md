# Card


The Standard card from the Figma Cards page: a heading and short copy, with an optional feature icon, eyebrow or tag name, tags or a badge, and a text-link call to action.

**Provide:** `title` and usually `description`. Optional: `icon` (a Feature Icons URL or a node), `eyebrow` or `tagName` (one or the other), `tags` (a list) or `badge` (one word), `cta` (the text-link label) and `href`.

- **Shell:** White, `radius-lg`, `shadow-card`, 16px padding. With `href` the whole card is the link: on hover a 6px `qualys-blue` bar slides in along the bottom edge and the arrow nudges forward; the shadow does not change. Below the padding sits the 6px bar track, so the card ends 22px under its last line.
- **Icon:** a feature icon at 56px, 16px above the text.
- **Eyebrow:** Wix Madefor Text SemiBold 14px, uppercase, +5%, `text-secondary`. **Tag name:** Medium 16px, `text-accent-primary`. Either sits 10px above the heading.
- **Heading:** SemiBold 24px, line height 1.1, −2%; Title Case, at most 60 characters.
- **Copy:** IBM Plex Sans Regular 16px, `text-secondary`, 16px under the heading; at most 120 characters, so the icon stays the focal point.
- **Tags:** light blue small badges, 8px apart, 16px under the copy. **Badge:** one fill badge, 24px under the copy; with no icon it moves to the top of the card.
- **CTA:** the neutral text link (charcoal label, blue arrow), 24px under the content (16px on a card with no icon and no badge).
- Icon and CTA are optional. Use tags or a badge, not both.
- **Layout:** 350px wide in the Figma desktop frames, 512px on tablet; cards fill their grid column. On mobile they stack at full width.
- **Many cards:** when a section has more than eight, mobile shows the first five and a "Load More" button reveals the next set.
