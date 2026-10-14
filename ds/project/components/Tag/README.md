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
- **Fill:** white text on the tone. **Light:** the tone at 15% with tone-coloured text (accepted-risk uses `ash` with `asphalt`). **Outline:** 1.5px tone stroke and tone text (accepted-risk uses a `rhino` stroke).
- **Tones are named for the status they carry**, not their colour:

| `tone` | Token | Colour | Used for |
| --- | --- | --- | --- |
| `critical` | `tag-critical` (Pepper) | Dark red | Critical |
| `high` | `tag-high` | Red | High, Exploitable, Affected (light fill uses `qualys-red`) |
| `medium` | `tag-medium` | Orange | Medium, Open, Known Exploit, Publicly Disclosed |
| `low` | `tag-low` | Yellow | Low, In Progress |
| `informational` | `tag-informational` | Purple | Informational |
| `fixed` | `tag-fixed` | Green | Fixed, Not Affected, No Known Exploit |
| `accepted-risk` | `tag-accepted-risk` (Asphalt) | Grey | Accepted Risk |
| `blue` (default) | `qualys-blue` | Blue | "New", Privately Disclosed, and other brand badges |

- Badges have one grey, `accepted-risk` (Asphalt); there is no second grey. The old colour names still work as aliases (`dark-red`, `red`, `orange`, `yellow`, `purple`, `green`, `gray`; `slate` now draws the accepted-risk grey), but use the status names in new work. Always keep the word; never let the colour stand alone.
- **Text tag:** `tag-md` (18px, 16px on mobile) Medium in `text-accent-primary`, no fill; as a link it turns Cobalt on hover.
- **Label tag** (`variant="label"`): `label` at Regular weight, 16px IBM Plex Sans in `text-primary`. A plain descriptor beside a value or an icon.
- **Eyebrow tag** (`variant="eyebrow"`): `eyebrow-xs`, 12px SemiBold capitals with +5% letter spacing in `text-primary`. A small overline on a card or tile. Both take `href` to become links.
- **Contrast (as designed, flagged):** low (1.7:1), medium (2.8:1), fixed (3.3:1) and blue (3.8:1) badges fall below 4.5:1 for 12–14px text, in every variant; the high light fill is 3.8:1. Informational, critical, high fill and accepted-risk pass. The blue text tag is 3.8:1 at 18px Medium.
- **Wording: tags label, they never ask.** A tag names a status, a category or a fact: "New", "Beta", "100+ Connectors", "Critical". No action words or calls to action ("Discover", "Learn", "Try", "Get", "See", "Register", "Download", "Join"). If the reader should do something, use a TextLink or Button beside the tag instead. One to three words, no full stops.
- **Which size:** `rg` on cards and in content; `sm` in tables, filters, the nav menus and next to 14–16px text. `sm` is the smallest; don't scale a badge down further.
- The doc's table calls badges "pill-shaped", but every badge component uses `radius-sm`; this follows the components.

**Vulnerability metadata** (from the Chips & Badges Showcase). Each set uses badges (`rg`, uppercase); the tone carries the same meaning everywhere, and the word is always shown.

| Set | What it shows | Badges |
| --- | --- | --- |
| Severity | Classification by CVSS score | Critical: `fill` `critical` · High: `fill` `high` · Medium: `fill` `medium` · Low: `fill` `low` · Informational: `fill` `informational` |
| Status | Where remediation stands | Open: `fill` `medium` · In Progress: `fill` `low` · Fixed: `fill` `fixed` · Accepted Risk: `fill` `accepted-risk` |
| Impact | Whether live environments are affected | Affected: `light` `high` · Not Affected: `light` `fixed` |
| Exploitability | Public exploit code, or a confirmed weaponised exploit | Exploitable: `fill` `high` · Known Exploit: `fill` `medium` · No Known Exploit: `fill` `fixed` |
| Disclosure | How public the vulnerability details are | Publicly Disclosed (PUB): `outline` `medium` · Privately Disclosed (PVT): `outline` `blue` |

- Show one badge per set for an item, in this order: severity, status, impact, exploitability, disclosure.
- Keep the labels as written (Title Case in the source, drawn in capitals by the badge). Abbreviations (PUB, PVT) follow the full words.
- White text on the Low and In Progress badges (`low`) is 1.7:1 and on `medium` 2.8:1, under 4.5:1; kept as in the showcase and flagged for the accessibility review.
