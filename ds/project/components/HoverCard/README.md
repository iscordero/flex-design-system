# HoverCard


A small card that opens beside the thing it describes. Use it where a logo or a headshot stands for something that needs a line of explanation and one link. Two kinds: the **logo card** (Figma: Hover card) and the **profile card**.

**Provide:** `kind` (`logo` or `profile`), the content for that kind, and the trigger as the child.

- **Logo card** (`kind="logo"`): `logo` (and `logoAlt`), optional `badge` (an image address or your own node, for a partner or certification badge), `title`, `body` and `link` (`{ label, href }`). The link is a neutral TextLink with the blue arrow. One link only.
- **Profile card** (`kind="profile"`, Figma: Profile Modal - Alternate): `name` (the full name), `image` (falls back to the avatar silhouette), `designation` (the role), `company`, `logo` (the company logo, with `logoAlt`) and `link` (`{ href }`). Layout: the 56px headshot (Avatar `md`) on the left, 16px from the text; the name, then the role 4px under it; a foot row 16px below with the company logo on the left (28px tall, up to 140px wide; the company name in Medium when there is no logo) and the LinkedIn button on the right (SocialButton `size="sm"`: 36px, `radius-sm`, a 20px white glyph on `icon-bg-default`). The close icon (24px in a 32px target, `icon-default`) sits 8px from the top and right (`spacing-3xs`), so its glyph lines up with the 16px padding. The link opens in a new tab.
- **Size:** logo card 242px wide; profile card 400px wide; both 16px padding (`spacing-rg`), `radius-lg`, white, `shadow-modal`. Never wider than the screen less 16px each side. Height follows the content: keep the copy to three lines.
- **Type:** logo card: name `h4` (20px SemiBold), copy `paragraph-rg` `text-secondary`. Profile card: the profile text used everywhere (see Avatar): name `title-sm` (SemiBold 16px), role `paragraph-rg` `text-secondary`, company in Medium. Long names wrap; nothing is cut off.
- **Opens:** a mouse opens it on hover after 150ms and it stays open while the pointer is on the trigger or the card. A click, a tap or Enter opens it and keeps it open. Focus alone does not open it, so tabbing through a row of logos stays quiet.
- **Closes:** when the pointer leaves (200ms grace) if hover opened it; on a click outside, on Esc, on the close icon, or on a second click of the trigger. Opened from the keyboard, focus moves into the card and returns to the trigger when it closes; Tab past the last control closes it.
- **One profile card at a time:** a profile card opened with a click, a tap or the keyboard is pinned. It stays open when people click elsewhere, and the other headshots don't open theirs (no hover, no click, default cursor) until it is closed with the close icon, Esc or a second click of its own headshot.
- **Position:** 8px below the trigger, centered on it (`align="start"` or `"end"` lines it up with an edge). It moves above when there is no room below (`position="top"` asks for that first) and is kept 16px inside the screen. It sits at `z-tooltip`.
- **Cursor:** pointer on the trigger. The trigger is a button; if the child is not a button or link, HoverCard wraps it in one and names it "<name>: details" (`triggerLabel` overrides).
- **Mobile:** the same card, opened by a tap; a tap outside or the close icon closes it. Set `closable` on a logo card that will be used on touch screens.
- **In the logo modules:** give a logo a `card` in LogoCarousel or LogoHierarchy and the logo becomes the trigger. The carousel waits while a card is open.
- **On headshots:** DrawerCard takes `profileCards` to give every speaker headshot a profile card.
- **Accessibility:** the trigger has `aria-haspopup="dialog"` and `aria-expanded`; the card is a dialog labeled by its name. A tooltip is for a few words of plain text; a hover card is for content with a link.
- `inline` draws the card in the page flow without a trigger, for documentation.
- Partner logos and badges in the preview are placeholders.
