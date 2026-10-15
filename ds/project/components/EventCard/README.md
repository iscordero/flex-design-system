# EventCard

**Status:** Ready

The Event card from the Figma Cards page: an image, the event type and format, a title and the date, ending in an outlink icon.

**Provide:** `title`, `category` (the event type), `format`, `date`, `href`; optionally `image`, `flag`, and for the featured layout a `description`.

- **Shell:** White, `radius-lg`, `shadow-card`, 16px padding, at least 400px tall, so footers line up across a row. With `href` the whole card is the link: on hover a 6px `qualys-blue` bar slides in along the bottom edge and the outlink icon nudges up and to the right.
- **Image:** 16:9, `radius-media` (8px) corners; `flag` puts a Flag on its top left corner (`flagTone` picks the tier). Without an image the `ecru` ground shows.
- **Meta row:** event type in Wix Madefor Text Medium 16px `text-accent-primary`, a `rhino` "|", then the format in IBM Plex Sans Medium 16px `text-secondary`. 16px above the title.
- **Title:** SemiBold 20px, line height 1.3, −1%.
- **Footer**, pinned to the bottom: the date in Medium 16px `text-secondary` on the left, a 20px `qualys-blue` outlink icon on the right.
- **Date:** short date, a bullet, then the time: "Dec 10, 2026 • 11a PST".
- **Approved button type:** the outlink icon only. No text link or button.
- **Featured** (`layout="featured"`): one card across the full width, 320px tall, image on the left (47%, `radius-md`), copy on the right. It applies from 1024px; on tablet and mobile the card stacks like the default. The description (Regular 16px `text-secondary`) shows only here.
