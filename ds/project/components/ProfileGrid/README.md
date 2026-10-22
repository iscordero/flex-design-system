# ProfileGrid


Speakers or people in one Ecru container, in centered rows, from the Figma Avatars page. Each profile opens its bio.

**Provide:** `items` (`{ name, designation, image, logo, link, bio, links }`) and `size`. A person with a `bio` gets the "Read Bio" hover and opens a ProfileModal; a person without one is not interactive. `maxPerRow` lowers the most profiles in a row.

**Sizes**

| `size` | Profile | Name and role | Most in a row |
| --- | --- | --- | --- |
| `keynote` | 384px wide, square photo | `title-md` 20px and `paragraph-md` 18px | 3 |
| `featured` (default) | 200px wide, square photo | `title-sm` 16px and `paragraph-rg` 16px | 5 |

- Use `keynote` for the few headline speakers, then a `featured` grid for everyone else, one grid under the other.
- **Container:** `avatar-container-bg` (Linen, #F1F0E9), `radius-lg`, 24px padding and gaps (16px under 1024px of browser width), up to 1440px wide (`content-max`), centered. Five featured profiles take 1096px and three keynote profiles 1200px, so both fit with room to spare.

**How many in a row**

- **Rows are centered.** A row with fewer profiles than the most sits in the middle, and a shorter last row sits centered under the one above.
- **Never one alone on a row.** When the last row would hold a single profile, the row above gives it one.
- **The row holds as many as fit** the container, up to the most for the size. Profiles keep their width; they never stretch or shrink to fill a row.

| Profiles | Featured, 1440px | Featured, 720px (3 fit) | Keynote, 1440px |
| --- | --- | --- | --- |
| 1 | 1 | 1 | 1 |
| 2 | 2 | 2 | 2 |
| 3 | 3 | 3 | 3 |
| 4 | 4 | 2 + 2 | 2 + 2 |
| 5 | 5 | 3 + 2 | 3 + 2 |
| 6 | 4 + 2 | 3 + 3 | 3 + 3 |
| 7 | 5 + 2 | 3 + 2 + 2 | 3 + 2 + 2 |
| 8 | 5 + 3 | 3 + 3 + 2 | 3 + 3 + 2 |
| 11 | 5 + 4 + 2 | 3 + 3 + 3 + 2 | 3 + 3 + 3 + 2 |

**Mobile and narrow containers**

- When fewer than two profiles fit side by side (a phone, or a very narrow column), they stack in one column, each at its own width and centered, never wider than the container.
- The count follows the container's width, not the browser's, so a grid in a narrow column behaves like a phone one.

**Content**

- Names and roles wrap; keep roles to two lines (about 25 characters a line in a featured profile, 45 in a keynote one). Logos line up along each row even when a role runs longer.
- Use square photos, cropped to head and shoulders, so faces line up.

**Notes**

- `bioLabel`, `aboutLabel` and `closeLabel` change the wording of "Read Bio", "About" and the close button.
- The separate-card layout (`layout="individual"`) is retired: every grid is one container. For a single person on their own card, use ProfileCard.
