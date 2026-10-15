# ProfileGrid

**Status:** Ready

The profile layouts from the Figma Avatars page: a row of profile cards that open a bio modal.

**Provide:** `items` (`{ name, designation, image, logo, link, bio, links }`) and `layout`. A person with a `bio` gets the "Read Bio" hover and opens a ProfileModal; a person without one is not interactive.

| Layout | Desktop (1024px and up) | Tablet (768px and up) | Mobile |
| --- | --- | --- | --- |
| `individual` (default) | 3 cards across, 24px gaps | 2 across, 16px gaps | 1 across, 16px gaps |
| `combined` | One Ecru container, 5 people across, 24px padding and gaps | 3 across, 16px | Stacked, 16px |

- **Individual:** each person is a ProfileCard. In the 1200px container the cards are 384 × 464px.
- **Combined:** one `surface-neutral-300` container with `radius-lg`; the photos are square (about 211px on desktop) and keep the LinkedIn chip, name, designation and logo. Up to five people in a row.
- Put the grid inside `.q-container` so it follows the page margins. Extra people wrap onto the next row.
- `bioLabel`, `aboutLabel` and `closeLabel` change the wording of "Read Bio", "About" and the close button.
