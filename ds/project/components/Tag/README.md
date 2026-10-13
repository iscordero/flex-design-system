# Tag

Badges and text tags from the Figma Tagging System: a badge signals status (recency, availability, urgency); a text tag names a category.

**Provide:** one or two words as children. Badge: `variant` (`fill`, `light` or `outline`), `tone`, `size`. Text tag: `variant="text"`, and `href` when it links.

| Figma type | Use | Interactive |
| --- | --- | --- |
| Badge (`fill` / `light` / `outline`) | Status: "New" on a mega-menu product heading, content type on a card image, severity | No |
| Text tag (`text`) | Categories: blog topics, labels in lists, "New" in the nav menu | Sometimes (`href`) |
| FilterChip | Filtering a list | Always |
| Flag | Notices anchored to a container edge | No |
| Marker | Unread or active item in a tab or menu | No |

- **Badge:** 26px tall (`rg`, `tag-sm` 14px) or 25px (`sm`, `tag-xs` 12px); 8px side padding inside a 1.5px stroke; `radius-sm` (6px); Wix Madefor Text Bold, uppercase, +5% / +3% tracking.
- **Fill:** white text on the tone. **Light:** the tone at 15% with tone-coloured text (gray uses `ash` with `asphalt`; slate uses `tag-slate-tint` with `asphalt`). **Outline:** 1.5px tone stroke and tone text (gray uses a `rhino` stroke).
- **Tones:** `purple` `tag-purple`, `blue` `qualys-blue`, `dark-red` `pepper`, `red` `tag-red` (light fill uses `qualys-red`), `green` `tag-green`, `orange` `tag-orange`, `yellow` `tag-yellow`, `gray` `asphalt`, `slate` `tag-slate`. Each tone has a fixed meaning in vulnerability metadata (below); always keep the word, never let the colour stand alone.
- **Text tag:** `tag-md` (18px, 16px on mobile) Medium in `text-accent-primary`, no fill; as a link it turns Cobalt on hover.
- **Label tag** (`variant="label"`): `label` at Regular weight, 16px IBM Plex Sans in `text-primary`. A plain descriptor beside a value or an icon.
- **Eyebrow tag** (`variant="eyebrow"`): `eyebrow-xs`, 12px SemiBold capitals with +5% letter spacing in `text-primary`. A small overline on a card or tile. Both take `href` to become links.
- **Contrast (as designed, flagged):** yellow (1.7:1), orange (2.8:1), green (3.3:1) and blue (3.8:1) badges fall below 4.5:1 for 12–14px text, in every variant; the red light fill is 3.8:1. Purple, dark red, red fill, gray and slate pass. The blue text tag is 3.8:1 at 18px Medium.
- The doc's table calls badges "pill-shaped", but every badge component uses `radius-sm`; this follows the components.

**Vulnerability metadata** (from the Chips & Badges Showcase). Each set uses badges (`rg`, uppercase); the tone carries the same meaning everywhere, and the word is always shown.

| Set | What it shows | Badges |
| --- | --- | --- |
| Severity | Classification by CVSS score | Critical: `fill` `dark-red` · High: `fill` `red` · Medium: `fill` `orange` · Low: `fill` `yellow` · Informational: `fill` `purple` |
| Status | Where remediation stands | Open: `fill` `orange` · In Progress: `fill` `yellow` · Fixed: `fill` `green` · Accepted Risk: `fill` `gray` |
| Impact | Whether live environments are affected | Affected: `light` `red` · Not Affected: `light` `green` |
| Exploitability | Public exploit code, or a confirmed weaponised exploit | Exploitable: `fill` `red` · Known Exploit: `fill` `orange` · No Known Exploit: `fill` `green` |
| Disclosure | How public the vulnerability details are | Publicly Disclosed (PUB): `outline` `orange` · Privately Disclosed (PVT): `outline` `blue` |

- Show one badge per set for an item, in this order: severity, status, impact, exploitability, disclosure.
- Keep the labels as written (Title Case in the source, drawn in capitals by the badge). Abbreviations (PUB, PVT) follow the full words.
- White text on the yellow Low and In Progress badges is 1.7:1 and on orange 2.8:1, under 4.5:1; kept as in the showcase and flagged for the accessibility review.
