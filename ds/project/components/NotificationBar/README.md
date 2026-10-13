# NotificationBar

One line across the top of the page for something everyone should know: maintenance, a release, an expiring licence, an event.

**Provide:** `type` and the `message`. Optionally `link` (`{ label, href }`) and `onClose` for the dismiss button.

- **Types:** `info` (blue circle), `success` (green tick), `warning` (amber triangle), `promo` (party icon, usually with a link).
- A white bar, `radius-rg`, at least 44px tall, set 16px in from the top and sides of the page, with a hairline in `surface-neutral-300`.
- **Message:** IBM Plex Sans Medium 14px, `text-primary`, with a 16px icon before it. The link is a small blue TextLink with its arrow.
- **Dismiss:** a 16px cross on the right, 44px tap area.
- **Mobile:** 12px from the edges, 12px text; the message wraps and the link drops under it.
- Place it above the Nav. It stays in the page flow and scrolls away with the page.
- **Accessibility:** `role="status"`; a warning is `role="alert"` so it is read out at once.
- One bar at a time. If it is dismissed, remember that for the visit.
- NavBanner is the older announcement strip inside the Nav; use one or the other, not both.
- The hairline isn't in Figma: it keeps the white bar visible on a white page.
