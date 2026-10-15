# Grid

**Status:** Ready

Page container and column grid from the Figma layout frames — CSS classes in `bundle.css`, no React component.

**Use:** wrap page content in `.q-container`, and lay out cards in `.q-grid` with `.q-grid--2`, `.q-grid--3` or `.q-grid--4`.

| Breakpoint | Page margin | Columns | Gutter |
| --- | --- | --- | --- |
| Mobile, < 768px | `margin-mobile` 20px | everything stacks to 1 | `gutter` 24px |
| Tablet, 768–1023px | `margin-tablet` 36px | 1–3; four become 2 × 2 | `gutter` 24px |
| Desktop, 1024–1439px | `margin-desktop` 56px | 1–4 | `gutter` 24px |
| Large, ≥ 1440px | `margin-desktop` 56px; the content well stops at `container-max` 1440px, centered | 1–4 | `gutter` 24px |

- The same breakpoint (768px) switches spacing and type to their mobile values.
- The gutter between stacked rows on mobile isn't marked in the frames; 24px is used until it is.
