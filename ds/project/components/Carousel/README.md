# Carousel


The carousel module from the Figma Carousel Modules page: a row of cards you scroll sideways, with a progress bar and previous / next buttons.

**Provide:** the cards as children, a `label` that names the set ("Latest resources"), and optionally `variant="single"` or `slideWidth`.

| Variant | Figma name | What it shows |
|---|---|---|
| `multi` (default) | Multi Card Carousel | Cards 350px wide, 24px apart; three fit the column and the next one peeks in |
| `single` | Single Card Carousel | One card as wide as the content column (up to 1440px), such as a featured EventCard |

- Section on `surface-neutral-200`, 48px top and bottom. The first card starts on the content column (up to 1440px) and the row runs off the right edge of the page.
- **Controls,** 36px under the cards and right-aligned to the column: the progress bar, 48px, then the two buttons.
- **Progress bar:** 377 × 4px, Charcoal at 20% with a `qualys-blue` fill that grows as you move through the set.
- **Buttons:** 48px, `radius-rg`, white with a hairline and a soft shadow, a 16px chevron each. The one that can't go further fades to 40%.
- Cards in a row share the tallest height.
- **Mobile:** cards 300px wide, 16px apart, starting 20px from the edge; the progress bar spans the width and the buttons sit centered, 24px below it.

Behavior:

- Swipe, drag the trackpad, or use the buttons; each press moves one card and cards snap into place.
- The row can take keyboard focus and then scrolls with the arrow keys. Links inside cards stay reachable by Tab.
- It never moves by itself.

Do / Don't:

- Do use it for four or more cards of one kind. For three or fewer, use a grid.
- Don't mix card types in one row.
- Don't hide anything essential past the first screen; a carousel is for browsing.

Notes:

- Figma's mobile "single" frame reuses the multi-card frame; here single cards stay one per screen on mobile too.
- The buttons use `shadow-dropdown` and `stroke-neutral-400`, the closest tokens to the drawn hairline and shadow.
- The Figma usage notes are still placeholders ("Used for…").
