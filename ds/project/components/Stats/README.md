# Stats


The stats module from the Figma Stats page: three figures in one panel, or three or four StatCards in a row.

**Provide:** `items` — each with `value`, `label`, and optionally `suffix`, `prefix`, `icon`, `description` — plus `layout` and `tone`.

| Layout | Figma name | Use it for |
|---|---|---|
| `block` (default) | Stats Block | Industry benchmarks, adoption rates and high-level facts that set the context |
| `cards`, three items | Stats Card – 3 in a row | Impact you enable: reductions, time saved, efficiency gains |
| `cards`, four items | Stats Card – 4 in a row | Mixed figures: counts, capabilities, rankings |

- Section on `surface-neutral-200`, 48px top and bottom, content in the content column (up to 1440px).
- **Block:** one `radius-lg` panel with 56px padding (`spacing-5xl`) and the figures 48px apart. `tone="solid"` (default) is the blue gradient (`blue-gradient-start` to `blue-gradient-end`) with white figures; `tone="outline"` is a 1px `qualys-blue` outline with blue figures.
- **Cards:** StatCards 24px apart, large for three and medium for four. Solid cards are flat `qualys-blue`.
- Each figure: a Feature Icon (56px), the number with its unit, the label and one line of description. See StatCard for the sizes.
- **Count up:** every figure runs from 0 to its value once, when it first scrolls into view (1.2 seconds, easing out; not for people who prefer reduced motion). `countUp={false}` turns it off for the module. See StatCard.
- **Tablet:** the panel tightens to 36px padding; cards wrap to two across.
- **Mobile:** everything stacks, 24px apart, with 24px padding; numbers drop to 48px (38px for four).

Content, from the Figma usage notes:

- **Block:** neutral and factual. Metric, then a brief descriptor: "70% of enterprises…". Avoid prescriptive language.
- **Three in a row:** impactful and benefit-driven. Metric, then an action verb and the value: "Reduce", "Cut", "Accelerate".
- **Four in a row:** balanced and clear; may mix counts ("50+ scripts"), speed ("50% faster") and platform figures ("1 agent").
- Keep each figure's text under 120 characters.

Don't:

- Don't mix solid and outlined cards in one row.
- Don't use more than four figures in one module.
