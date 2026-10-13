# Icon

Inline SVG from the Qualys utility set, drawn in `currentColor` so it takes the surrounding text colour.

**Provide:** `name` (`download`, `arrow-right`, `arrow-left`, `outlink`, `search`, `check`, `filter`, `menu`, `time`, `chevron-right|left|up|down`, `plus`, `cross`, `view-list|month|grid`, the status icons `alert-triangle`, `alert-circle`, `check-circle`, `x-circle`, `file`, `party` and `cookie`, the five `event-*` icons, the three `general-*` icons and the five `social-*` icons), optional `size` (px, default 16) and `title` when the icon carries meaning on its own (otherwise it is hidden from assistive tech).

- 16px in buttons and text links; 20–24px in controls; 14px for the `time` clock in a card's meta row; 20px for the `outlink` icon in a card footer.
- `general-events`, `general-webinar` and `general-resource` are 56 × 43 line icons for hub promo cards: `size` sets their height (43 there).
- `social-linkedin`, `social-x`, `social-facebook`, `social-instagram`, `social-vimeo`, `social-youtube` and `social-url` are the 24px social glyphs; use them through SocialButton.
- `menu` is the 20 × 16 menu button glyph from the mobile navigation: `size` sets its height (16 there).
- Colour with CSS `color`: `icon-default` on light grounds, `icon-inverted` on dark, `icon-feature` for feature icons.
- `download` and `arrow-right` are the glyphs from the Figma Buttons sheet; `arrow-left` and `outlink` are the same arrow rotated.
- `outlink` marks links that leave qualys.com; `arrow-right` marks links that stay.
- The status icons are for dialogs, toasts and the notification bar, in the colour of their status: `alert-triangle` for destructive and warning, `alert-circle` for warning and info, `check-circle` for success, `x-circle` for errors.
