# ExitIntent


A last offer shown as someone moves to leave the page: one field and one button.

**Provide:** `open`, `onClose`, `title`, `subtitle` and `onSubmit(value)`. `type="offer"` (default) takes an `image`; `type="content"` takes an `icon`.

- **Offer:** 600px wide, a 220px image down the left and the content on the right: title `h4` (SemiBold 20px), subtitle 14px, the field, a full-width primary button, then the "No Thanks" text link, without an arrow (it closes the offer rather than going anywhere).
- **Content:** 480px wide and centered, with a 64px icon tile (`radius-md`, 10% blue) above the title, for a report or guide.
- The field is Work Email by default; change it with `field` (`{ name, label, type }`). An empty or malformed address shows the error under the field and keeps the modal open.
- **Dismissing:** the cross, Esc, the backdrop or the "No Thanks" link (`onDismiss`, otherwise `onClose`).
- **Mobile:** 12px from the screen edges; the image is dropped and the text is centered.
- **Accessibility:** `role="dialog"`. Focus starts on the close button, so leaving is always one key away.
- This component only draws the modal. Decide when to open it yourself, show it once per visit, and never over another modal.
- `submitLabel` and `dismissLabel` replace the default wording.
- **Ground:** the panel sits on the form ground, `surface-neutral-200`, the same as Form; the field stays white.
