# ProfileGrid


The profile layouts from the Figma Avatars page: rows of profile cards that open a bio modal.

**Provide:** `items` (`{ name, designation, image, logo, link, bio, links }`) and `layout`. A person with a `bio` gets the "Read Bio" hover and opens a ProfileModal; a person without one is not interactive. `maxPerRow` (1 to 5) lowers the most profiles in a row.

| Layout | Looks like |
| --- | --- |
| `individual` (default) | Each person is a ProfileCard on its own Ecru card |
| `combined` | One `surface-neutral-300` container with `radius-lg`; square photos with the LinkedIn chip, name, designation and logo |

**How many in a row**

- **Up to five in a row** in a grid 880px wide or more. Every profile keeps the same width, a fifth of the row, whatever the count.
- **Rows are centered.** One to three profiles sit in the middle of the row, and a shorter last row sits centered under the one above.
- **Never one alone on a row.** When the last row would hold a single profile, the row above gives it one: six become four and two, eleven become five, four and two.

| Profiles | Rows (desktop) | Rows (540–879px) |
| --- | --- | --- |
| 1 | 1, centered | 1, centered |
| 2 | 2, centered | 2, centered |
| 3 | 3, centered | 3 |
| 4 | 4, centered | 2 + 2 |
| 5 | 5 | 3 + 2 |
| 6 | 4 + 2 | 3 + 3 |
| 7 | 5 + 2 | 3 + 2 + 2 |
| 8 | 5 + 3 | 3 + 3 + 2 |
| 9 | 5 + 4 | 3 + 3 + 3 |
| 10 | 5 + 5 | 3 + 3 + 2 + 2 |
| 11 | 5 + 4 + 2 | 3 + 3 + 3 + 2 |

**Sizes and responsiveness**

- The row count follows the grid's own width, not the browser's, so a grid in a narrow column behaves like a tablet one. **880px and up:** five a row. **540 to 879px:** three. **Under 540px:** one per row, full width.
- In the 1200px content column each profile is about 221px wide (24px gaps; 16px gaps under 1024px of browser width). The combined container adds 24px padding (16px on smaller screens).
- Photos keep their shape at any width: square in `combined`, 303 × 287 in `individual`.
- Logos line up along each row, even when a role runs to two lines. Keep roles to two lines (about 40 characters).
- Put the grid inside `.q-container` so it follows the page margins.

**Notes**

- `bioLabel`, `aboutLabel` and `closeLabel` change the wording of "Read Bio", "About" and the close button.
- Earlier versions put three individual cards in a row; both layouts now follow the same five-a-row rule, so a page's profiles line up whichever layout it uses.
