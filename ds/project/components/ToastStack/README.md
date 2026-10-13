# ToastStack

Where toasts live: a corner of the screen, three at most, each leaving by itself.

**Provide:** `items` (`{ id, status, message }`) and `onDismiss(id)`, which you answer by removing that item from your list.

- **Place:** bottom left by default, 36px from the bottom and in line with the page margin; `position` also takes `bottom-right`, `top-left` and `top-right`. On mobile it spans the screen with 12px margins.
- **Order:** the newest sits at the bottom, 12px apart.
- **Three at most** (`max`). With more, the newest three show and the older ones return as space frees up.
- **Timing:** success and info leave after 5 seconds, warnings after 8, errors stay until dismissed. Set `duration` on an item to change it (0 keeps it).
- The timer pauses while the pointer is over a toast.
- **Motion:** each one fades in and rises 12px over 300ms; no motion under reduced-motion settings.
- Sits at `z-toast`, above every modal.
- **Accessibility:** the stack is a region named "Notifications" and never takes focus. Each toast announces itself.
- `inline` draws the stack in the page flow, for documentation.
- Figma draws toasts bottom left while its notes say they "stack from top"; this follows the drawing.
