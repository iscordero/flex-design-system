# ResourceCard


The Resource card from the Figma Cards page: an image, the resource type and a title, ending in one of three approved actions.

**Provide:** `title`, `resourceType`, `href` and an `action`; optionally `image` and `flag`.

| `action` | Footer | Also pass |
| --- | --- | --- |
| `link` (default) | The date on the left, a `qualys-blue` outlink icon on the right | `date` ("Dec 10, 2026") |
| `download` | A blue download text link with the download icon before it | `cta` ("Get the Report") |
| `cta` | The neutral text link with an arrow | `cta` ("Learn More"), and optionally `description` |

- **Shell:** White, `radius-lg`, `shadow-card`, 16px padding, at least 400px tall, so footers line up across a row. With `href` the whole card is the link: on hover a 6px `qualys-blue` bar slides in along the bottom edge and the outlink icon nudges up and to the right.
- **Image:** 318 × 174 in a 350px card (about 16:9), `radius-media` (8px) corners; `flag` puts a Flag on its top left corner. The Figma CTA variant has no flag.
- **Resource type:** IBM Plex Sans Medium 16px `text-secondary`, 16px above the title (not blue, unlike the event and webinar type).
- **Title:** SemiBold 20px, line height 1.3, −1%.
- **Description** (CTA action only): Regular 16px `text-secondary`, 16px under the title.
- **Approved button types:** outlink icon, download CTA, text link (tertiary). No primary button.
