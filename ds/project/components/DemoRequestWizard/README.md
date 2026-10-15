# DemoRequestWizard


A short form split into steps inside a modal, ending on a confirmation.

**Provide:** `open`, `onClose`, `steps` and `onSubmit(values)`. Each step is `{ title, description, fields, consent }`; a field is `{ name, label, type, required, options }`.

- 540px wide. **Header:** the step's title (`h3`, SemiBold 24px) with the close button, then "Step 1 of 3 — Contact Information" (14px `text-secondary`) and the dots.
- **Dots:** 8px, `stroke-neutral-400`; done and current ones are blue, and the current one is 32px wide. The confirmation counts as the last step.
- **Body:** the fields 16px apart with 24px padding. A field with `options` is a Select, anything else a TextField; `consent` adds a small checkbox under them.
- **Footer:** Back (secondary) and the primary button on the right: "Continue", then "Submit Request" on the last step.
- **Checking:** each step is checked before moving on. Required fields and email addresses show their error under the field, and focus goes to the first one.
- **Sending:** `onSubmit` gets every value when the last step passes. Return `false` to stay on the step (for example while a request fails).
- **Confirmation:** a 64px green tick, a thank-you line, a note in blue and a centered Done button. Replace the wording with `success` (`{ title, message, note, actionLabel }`).
- Going back keeps what was typed. Opened again after it finished, it starts over.
- **Mobile:** 12px from the screen edges, 16px padding, buttons stacked with the primary on top.
- **Accessibility:** `role="dialog"`, named by the step's title. Each new step moves focus to its first field. The dots are read as "Step 2 of 3".
- `step` and `onStepChange` let you control the step; `stepLabel(n, total)`, `nextLabel`, `backLabel` and `submitLabel` change the wording.
- Keep it to two steps of four fields or fewer. Longer than that, use a page.
- **Ground:** the whole panel sits on the form ground, `surface-neutral-200`, the same as Form; fields stay white.
