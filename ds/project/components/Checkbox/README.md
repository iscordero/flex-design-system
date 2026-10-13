# Checkbox

From the Figma Inputs sheet: a 20px box with `radius-xs` (4px) corners.

**Provide:** `label` (or children) and `checked` + `onChange`, or `defaultChecked`. Other input attributes pass through.

- Off: white with a 1.5px `stroke-neutral-500` (Rhino) border. On: `qualys-blue` fill with a white check.
- Label 14px `text-primary`, `spacing-3xs` (8px) from the box. In filter menus the label is 16px.
- `size="sm"`: a 16px box, used in the divided filter drawer.
- Keyboard focus shows `focus-ring` on the box. Disabled: 50% opacity.
- A real `<input type="checkbox">` sits under the box, so forms and screen readers work as normal.
- The Rhino border is 2.05:1 on white, under the 3:1 WCAG asks for — flagged for review.
