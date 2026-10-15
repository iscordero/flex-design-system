# SuccessConfirmation

**Status:** Ready

The "it worked" notice after an action: a green tick, a line of copy and one button.

**Provide:** `open`, `onClose`. Optionally `title`, `message`, `actionLabel` and `onAction`; `type="download"` with `href` for a file.

- **General:** "Success!" with a Done button that closes it.
- **Download:** "Download Ready" with a Download Now button; with `href` the button is a download link.
- 440px wide, centered: a 64px disc on a 10% green tint with the tick in `utility-success-default`, title `h4` (SemiBold 20px), message 14px `text-secondary`, one full-width primary button.
- Closes with the button, Esc or the backdrop. There is no cross.
- **Mobile:** 12px from the screen edges, 16px padding.
- **Accessibility:** `role="dialog"`, named by the title and described by the message. Focus starts on the button.
- For something that needs no reply, use a success Toast instead; this one stops the page.
