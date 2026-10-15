# Modal


The base dialog: a title with a close button, a body, and an optional footer of buttons. The other modals in this file are built on it.

**Provide:** `open`, `onClose`, `title` and the body as children. Optionally `actions` (a list of `{ label, onClick, variant, href }`, or your own buttons), `size`, `eyebrow`, `subtitle`.

- **Sizes:** `sm` 480px, `md` 540px (default), `lg` 600px. The height follows the content; past the viewport the body scrolls and the title and footer stay put.
- **Panel:** white, `radius-lg`, `shadow-modal`, 24px padding, centered on an Overlay.
- **Title:** `h4` (Wix Madefor Text SemiBold 20px; `h3`, 24px, on `lg`), `text-primary`. A 1px `stroke-neutral-400` line sits under it, inset 24px.
- **Body:** IBM Plex Sans Regular 16px, `text-secondary`.
- **Footer:** buttons on the right, 12px apart, the primary one last. In `actions` the last item is primary unless you set `variant`.
- **Close:** the cross top right (44px tap area), Esc, or a press on the backdrop. `closeOnOverlay={false}` keeps the backdrop from closing it; `dismissible={false}` removes all three, so the footer must offer a way out.
- **Mobile:** 12px from the screen edges; the buttons stack full width with the primary on top.
- **Motion:** fades in and grows from 95% over 200ms; no motion under reduced-motion settings.
- **Accessibility:** `role="dialog"` named by the title. Focus moves into the modal, stays inside, and returns to what opened it. The page behind doesn't scroll. `initialFocus` takes a selector when something other than the first control should get focus.
- `overlay="dark"` uses the 50% backdrop. `inline` draws the panel in the page flow with no backdrop, for documentation.
- Figma puts the primary button on the left in the small and medium modals and on the right in the large one; this puts it on the right everywhere.
- Figma's shadow is 0 16px 32px at 10%; this uses `shadow-modal`.
