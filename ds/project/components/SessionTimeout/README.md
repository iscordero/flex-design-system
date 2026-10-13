# SessionTimeout

The warning before someone is signed out, with a live countdown, and the notice once they have been.

**Provide:** `open`, `onStay`, `onSignOut` and `onSignIn` (or `signInHref`). Give `defaultSeconds` and it counts down by itself and calls `onExpire`; or pass `seconds` to drive the clock yourself.

- **Warning:** 56px amber disc, "Session Expiring Soon", one line of copy, the time left, then Log Out (secondary) and Stay Signed In (primary) side by side.
- **Clock:** IBM Plex Sans Medium 32px in `warning-strong`, on an 8% amber tint, `radius-rg`. It updates every second.
- **Expired:** a grey disc, "Session Expired" and one full-width Sign In Again button. It switches to this at zero, or straight away with `state="expired"`.
- 440px wide, 24px padding, everything centred.
- **It can't be dismissed.** No close button, no Esc, no backdrop click.
- Show it five minutes before the session ends (300 seconds is the default).
- **Mobile:** 12px from the screen edges, 16px padding; buttons stack with Stay Signed In on top.
- **Accessibility:** `role="alertdialog"`. The clock is a `timer`, so it isn't read out every second. Focus starts on Stay Signed In, so Enter never signs anyone out by accident.
- Every label and line of copy can be replaced: `title`, `message`, `expiredTitle`, `expiredMessage`, `stayLabel`, `signOutLabel`, `signInLabel`.
- Figma's mobile drawing puts the secondary button on top; here the primary is on top, as in the other mobile dialogs.
