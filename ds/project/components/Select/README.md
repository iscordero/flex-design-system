# Select

The form dropdown from the Figma Inputs sheet ("Drop Down – Forms"): the same 56px box as TextField with a chevron, opening a white menu with a check beside the chosen row.

**Provide:** `label`, `options` (strings or `{value, label}`), and `value` + `onChange` (or `defaultValue`). Optional `placeholder` (default "Select"), `labelMode="static"`, `error`, `hint`, `disabled`. Give it a `name` to post the chosen value with a form.

- Closed and empty: the label sits inside as the placeholder, chevron-down on the right. Open or chosen: label floats up 12px and the value (or "Select") shows below it.
- Open: `qualys-blue` border, chevron-up, menu 4px below — white, `radius-rg`, `shadow-menu`, 8px top and bottom padding. Rows are 16px text with 8px × 16px padding; hover `misty-blue`; the chosen row shows a 16px check.
- Error: `qualys-red` border and message, as TextField.
- Keyboard: Enter, Space or ↓ opens; ↑ ↓ move; Enter picks; Esc or Tab closes. Clicking outside closes. Exposed as a listbox (`aria-haspopup`, `aria-expanded`, `aria-selected`).
- Use for one choice that submits with a form. For filtering lists use FilterDropdown.
- In Figma the closed field's value is grey and the open one charcoal; here both are `text-primary`.
