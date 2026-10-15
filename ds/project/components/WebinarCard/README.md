# WebinarCard


The Webinar card from the Figma Cards page: an image, "Webinar | format | duration", a title, the speaker and the date.

**Provide:** `title`, `format`, `duration`, `date`, `href`; optionally `image`, `flag`, `speakers` (`{ name, company, image }`) and, for the featured layout, a `description`. `category` defaults to "Webinar".

- **Shell:** White, `radius-lg`, `shadow-card`, 16px padding, at least 400px tall, so footers line up across a row. With `href` the whole card is the link: on hover a 6px `qualys-blue` bar slides in along the bottom edge and the outlink icon nudges up and to the right.
- **Image:** 16:9, `radius-media` (8px) corners; `flag` puts a Flag on its top left corner (`flagTone` picks the tier). Without an image the `ecru` ground shows.
- **Meta row:** "Webinar" in Medium 16px `text-accent-primary`, then the format and the duration in IBM Plex Sans Medium 16px `text-secondary`, separated by a `rhino` "|". The duration has a 14px `qualys-blue` clock (`time` icon).
- **Title:** SemiBold 20px, line height 1.3, −1%.
- **Speaker:** 40px avatar (photo or the `avatar-bg` placeholder), 8px, name in SemiBold 16px (two lines at most).
- **The speaker rule.** Speakers sit on one row that never wraps, so cards in a row keep the same height. Named speakers come first; the rest stack as headshots overlapping by 15px, three circles at most. When more people are unnamed than fit, the third circle shows "+N", where N counts every speaker who isn't named.

| Speakers | Default card | Featured card |
| --- | --- | --- |
| None | No speaker row | No speaker row |
| 1 | Avatar and name | Avatar, name and company |
| 2 | First named, 1 headshot | Both named, with company |
| 3 | First named, 2 headshots | Two named, 1 headshot |
| 4 | First named, 3 headshots | Two named, 2 headshots |
| 5 | First named, 2 headshots and "+4" | Two named, 3 headshots |
| 6 | First named, 2 headshots and "+5" | Two named, 2 headshots and "+4" |
| More than 6 | First named, 2 headshots and "+N" | Two named, 2 headshots and "+N" |
- **Footer:** the date in Medium 16px `text-secondary` ("Tue Dec 10, 2026") and the outlink icon.
- **Approved button type:** the outlink icon, the same as the other content cards. Figma's usage note also lists a primary button; it is not used on this card (review decision).
- **Featured** (`layout="featured"`): one card across the full width, 320px tall, image on the left (47%, `radius-md`), copy on the right. It applies from 1024px; on tablet and mobile the card stacks like the default. It names the first two speakers with their company (Regular 16px `text-secondary`), then the description; see the speaker rule. Once it has stacked, the speaker row may wrap.
- Figma's default webinar card has no bar track (409px); this one keeps the track every card has, so it runs 6px taller.
- The speaker rule was set in review: Figma draws one speaker on the default card and gives no layout for more. "+N" means the same here as on DrawerCard.
