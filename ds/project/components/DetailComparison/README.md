# DetailComparison

A written comparison: Qualys beside up to three competitors the reader picks, one short text per vendor for each topic. Use it when yes or no is not enough and each difference needs a sentence. For a simple feature checklist use FeatureMatrix.

**Provide:** `columns` (the first is Qualys), `sections` and optionally `title`, `subtitle`.

- **Columns:** `[{ id, name, logo, subtitle }]`. Without a `logo` a dashed slot holds the name (competitor logos in the preview are placeholders).
- **Sections:** `[{ title, open, heading, copy }]`. `copy` is keyed by column id: a string, or `{ heading, body }` to give that vendor its own cell heading. Each section is a Drawer.
- **Picking competitors:** filter chips ("Compare Qualys With · Choose up to 3"). At least one stays picked; at three, the rest are disabled until one is released. `max` changes the limit, `defaultPicked` sets the starting ids (the first two by default), `picked` with `onChange` controls it.
- **Layout:** Qualys and the picked vendors share the width in equal columns, so two competitors give three columns and three give four. The Qualys cell sits on Ecru (`surface-neutral-300`, `radius-md`); the others are plain. 20px padding in every cell.
- **Type:** module heading `h3`; cell heading `title-sm` (16px SemiBold); copy `paragraph-rg`. Keep copy to about 250 characters so columns stay a similar height; longer copy wraps and the row grows.
- **Size:** a white card (`radius-lg`, `shadow-card`) in the 1140px content column. Below 240px per column the table scrolls sideways inside the card.
- **Heading and chips:** above the card, on the page ground, 24px (`spacing-xl`) over it: the heading on the left, the chips on the right, both lined up with the card's outer edges. On a narrow screen the chips wrap under the heading. The card holds only the table, starting with the vendor logos 24px from its top.
- **Mobile (the table narrower than 768px):** no card, white ground. Tabs pick one competitor; in each section the Qualys text (Ecru card) sits above the competitor's (outlined card), each under its logo.
- **Cursor:** pointer on section headings, chips and tabs.
- **Accessibility:** section headings are buttons (`aria-expanded`); each cell names its vendor for screen readers; chips are toggle buttons in a labelled group.
- **Content:** describe competitors fairly and keep claims current and checked. The copy in the preview is placeholder text.
- From the Claude Design file "Comparison Table" (Detail Comparison, desktop and mobile).
