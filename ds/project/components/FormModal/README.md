# FormModal


A lead-capture Form inside a modal: an eyebrow, title and subtitle above, the form on its warm ground below.

**Provide:** `open`, `onClose`, `title`, and `form` with the props of Form (`variant`, `title`, `fields`, `submitLabel`, `onSubmit`…). Optionally `eyebrow` and `subtitle`.

- 600px wide. The header is the Modal header with the eyebrow (SemiBold 12px uppercase, blue) and a 14px subtitle; the line under it runs edge to edge.
- The form fills the body on `surface-neutral-200` with 24px padding, and scrolls when it is taller than the screen.
- **Variants drawn in Figma:** full lead capture (logo, heading, four fields, opt-in), minimal (one field) and content gate (a resource download). All three are the Form variants; pick with `form.variant`.
- The form's own heading is one level below the modal title.
- Closes and behaves like Modal: cross, Esc, backdrop; focus stays inside and returns on close.
- **Mobile:** 12px from the screen edges, 16px padding, the form in one column.
- Keep the header short. If the form already has a heading that says the same thing, drop one of them.
