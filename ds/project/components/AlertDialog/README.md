# AlertDialog


A decision that has to be answered before anything else: delete, leave without saving, reload.

**Provide:** `open`, `title`, `message`, and either `onConfirm` and `onCancel` (with `confirmLabel` and `cancelLabel`) or your own `actions`. `tone` picks the color.

- **Tones:** `destructive` (red bar, warning triangle), `warning` (amber bar), `info` (blue bar). The icon sits in a 50px disc on a 10% tint of the same color.
- 440px wide, centered text: title `h4` (SemiBold 20px), message Regular 14px `text-secondary`, a full-width line, then the two buttons centered, secondary first.
- **It can't be dismissed.** No close button, Esc does nothing and the backdrop does nothing: one of the buttons must be pressed.
- **Mobile:** 12px from the screen edges; buttons stack full width, the primary on top.
- **Accessibility:** `role="alertdialog"`, named by the title and described by the message. Focus starts on the first button, which is the safe one (Cancel).
- Say what happens in the title and name the action on the button ("Delete", not "OK").
- The warning bar uses `utility-warning-default`. Figma draws it #f5a624 here and #f29912 elsewhere in the same file.
