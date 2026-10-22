# CardModule


The Card Module from Figma: an optional copy block, then a row of standard Cards. Use it to explain a set of features, capabilities or benefits side by side.

**Provide:** `items` (Card props — usually `icon`, `title`, `description`, `cta`, `href`) and, optionally, `eyebrow`, `title`, `body`, `actions`, `columns` and `align`.

| Cards | Figma frame | Desktop | Tablet (< 1024px) | Mobile (< 768px) |
|---|---|---|---|---|
| 1 | Card Module 1x1 | One column of three | One column of two | Full width |
| 2 | Card Module 2x1 | 2 across | 2 across | 1 column |
| 3 | Card Module 3x1 | 3 across | 3 across | 1 column |
| 4 | Card Module 4x1 | 4 across | 2 × 2 | 1 column |
| 5 | — | 3 + 2, the 2 centered | 3 + 2, the 2 centered | 1 column |
| 6 | Card Module 3x2 | 3 × 2 | 3 × 2 | 1 column |

- Section on `surface-neutral-200`, 48px top and bottom, content in the content column (up to 1440px).
- **Copy block:** eyebrow, heading (h2), body and buttons, at most 800px wide; 48px above the cards (24px on mobile). `align="center"` centers it.
- **Cards:** the standard Card — a 56px Feature Icon, a 24px heading, 16px body copy and a TextLink with an arrow. 24px gutter (`gutter`).
- **Row height:** cards in a row share one height, and their text links line up along the bottom, however long each card's copy is.
- **Columns:** worked out from the count, so rows come out full and no card is left alone on a row when another count avoids it (five are 3 + 2, seven 4 + 3, eight 4 × 2). Set `columns` to override it on desktop.
- **Short rows are centered:** a last row with fewer cards sits in the middle, its cards the same width as the rows above. A single card on its own stays one column wide (of three, or of two on tablet), lined up with the copy block, or centered with `align="center"`.
- **Hover:** a linked card shows the Qualys Blue bar along its bottom and nudges its arrow (see Card). Cursor: pointer on the whole card.
- **Headings:** card titles are one level below the module heading (h3 under an h2), so the outline stays in order.
- **Line breaks:** headings balance their lines, so no card title ends on one short word.

Content:

- Title Case headings, at most 60 characters; body copy at most 120 characters.
- One idea per card, and keep the cards in a row about the same length.
- Text link labels say where they go: "Learn More", "Explore VMDR".

Don't:

- Don't put more than four cards in one row.
- Don't mix cards with and without icons in one module.
- Don't add a primary Button to every card; one primary Button goes in the copy block, if any.
