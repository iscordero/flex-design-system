# BlogCard

**Status:** Ready

The Blog card from the Figma Cards page: an image, "Blog | reading time", a title, a short description and the author, ending in an outlink icon.

**Provide:** `title`, `duration` (reading time), `description`, `author` (`{ name, image }`), `href`; optionally `image` and `flag`. `category` defaults to "Blog".

- **Shell:** White, `radius-lg`, `shadow-card`, 16px padding, at least 400px tall, so footers line up across a row. With `href` the whole card is the link: on hover a 6px `qualys-blue` bar slides in along the bottom edge and the outlink icon nudges up and to the right. The Figma card is 483px tall with a three-line title.
- **Image:** 16:9, `radius-media` (8px) corners; `flag` puts a Flag on its top left corner (`flagTone` picks the tier). Without an image the `ecru` ground shows.
- **Meta row:** "Blog" in Medium 16px `text-accent-primary`, a `rhino` "|", then a 14px `qualys-blue` clock and the reading time in IBM Plex Sans Medium 16px `text-secondary`.
- **Title:** Wix Madefor Text Medium 20px, line height 1.3, −0.5%. Figma sets blog titles in Medium; the other content cards use SemiBold.
- **Description:** Regular 16px `text-secondary`, 16px under the title.
- **Footer:** the author (40px avatar and name in SemiBold 16px) on the left, the outlink icon on the right.
- **Approved button type:** the outlink icon only.
- **Featured** (`layout="featured"`): one card across the full width, 320px tall, image on the left (47%, `radius-md`), copy on the right. It applies from 1024px; on tablet and mobile the card stacks like the default. The title clamps at two lines there.
