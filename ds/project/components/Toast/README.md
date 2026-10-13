# Toast

A short message that appears over the page without taking focus. Use ToastStack to place and time them.

**Provide:** `status` and the `message`. `onClose` adds the dismiss button.

- **Status:** `success` (green, tick), `warning` (amber), `error` (red, cross in a circle), `info` (blue, the default).
- 400px wide and at least 80px tall, white, `radius-rg`, `shadow-modal`, with a 4px stripe in the status colour down the left edge.
- **Icon:** a 30px rounded tile on a 10% tint of the status colour.
- **Message:** IBM Plex Sans Regular 14px, `text-secondary`. One or two lines; it wraps and the toast grows.
- **Dismiss:** a 16px cross with a 44px tap area.
- **Motion:** a toast fades in over 300ms when it appears. In a ToastStack it also rises 12px as it fades. It appears at once for people who prefer reduced motion.
- **Accessibility:** success and info are `role="status"` and read out politely; warning and error are `role="alert"` and read out at once.
- The colour is never the only signal: the icon changes with the status too.
- Don't put the only route to an action in a toast, since it goes away by itself.
