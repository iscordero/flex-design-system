# Radio

**Status:** Ready

From the Figma Inputs sheet: a 20px circle for picking one option from a short list.

**Provide:** `label`, the same `name` on every radio in the group, a `value`, and `checked` + `onChange` (or `defaultChecked`).

- Off: white with a 1.5px `stroke-neutral-500` border. On: a 2px `qualys-blue` ring with a 10px `qualys-blue` dot.
- Label 14px `text-primary`, 8px from the circle.
- Keyboard focus shows `focus-ring`; arrow keys move within the group. Disabled: 50% opacity.
- Figma draws the selected radio in two off-palette blues (#488FDF, #59A0F1); this uses `qualys-blue`.
- Use a Select instead when there are more than five options.
