# Icon

**Status:** Ready

Inline SVG icons in five preset sizes and three approved colors. Two sources: **Hugeicons** (free, stroke rounded, MIT), the general stroke icon library, and the **Qualys utility icons**, the filled glyphs drawn for specific components.

**Provide:** `name` or `icon`, a `size` and, when the icon is not simply the color of the text beside it, a `tone`. Add `title` when the icon carries meaning on its own; otherwise it is hidden from assistive tech.

- `name="hi:<name>"` draws a bundled Hugeicon: the **Arrows**, **Alert**, **AI**, **Bookmarks** and **Add and remove** sets (336 icons). Names are the Hugeicons names in kebab case: `Alert01Icon` is `hi:alert-01`, `ArrowRight02Icon` is `hi:arrow-right-02`.
- `icon={Alert01Icon}` draws any other free Hugeicon, imported from `@hugeicons/core-free-icons`. Designers pick from the same library in the Hugeicons Figma plugin (Free, Stroke rounded).
- `name="download"` (no prefix) draws a Qualys utility icon (listed below).

## Sizes

Each size sets the box and the stroke weight together. The stroke is drawn at that weight whatever the scale, so lines stay even across a page.

| Size | Box | Stroke | Use it for | Used in the system today |
| --- | --- | --- | --- | --- |
| `xs` | 12px | 1px | Next to 12px text and in tight spots | Breadcrumb separators, the small Checkbox tick, the close cross on small chips |
| `sm` | 16px | 1.25px | The default, next to 14–16px text | Button and link arrows, inputs, dropdown chevrons, search, filter, menu, the nav menu arrows, card times, comparison ticks, toast and notification icons, the small social glyphs |
| `md` | 20px | 1.5px | Controls that stand alone, next to 18–20px text | Card download and outlink icons, calendar view switches, SocialButton small |
| `lg` | 24px | 1.5px | Standalone UI icons. The size Hugeicons are drawn at | Close buttons on dialogs and drawers, status icons in dialogs, event-type icons, the cookie icon, SocialButton |
| `xl` | 32px | 2px | Feature lists, empty states, section markers | The tick in SuccessConfirmation |

- Match the icon to the text beside it: `xs` for 12px text, `sm` for 14–16px, `md` for 18–20px.
- Keep one size per row or list. Don't mix weights in one group.
- Above 32px, use a Feature Icon (the illustrated, two-tone set), not a scaled-up stroke icon.
- **Outside this scale, on purpose:** Feature Icons (30–56px in drawers, accordion modules and solution cards, 87.5px in Stats) and the 56 × 43 `general-*` promo icons are illustrations, not UI icons. Everything else in the system uses the five sizes.
- A number still works as `size` (px) for the utility icons and special cases; it scales the stroke with the box, so prefer the presets.
- Touch targets: an icon that is a control sits in at least a 44px target on touch screens, whatever its size.

## Colors

| Tone | Token | Use it for |
| --- | --- | --- |
| `black` | `icon-default` (Charcoal) | The default on light grounds |
| `blue` | `icon-feature` (Qualys Blue) | To draw the eye: features, links, active states. Not for small icons in running text |
| `white` | `icon-inverted` | On Charcoal, the blue gradients and photos |

- Without `tone` the icon takes the color of the text around it (`currentColor`), which is right inside buttons and links.
- One color per icon. No two-tone stroke icons, gradients or opacity changes.
- Status icons (alerts, toasts, the notification bar) take their status color instead, as Toast and AlertDialog set it: `qualys-red` for errors and destructive actions, `utility-warning-default`, `utility-success-default`, and `qualys-blue` for information.
- Contrast: black and white pass on their grounds; blue on white is 3.78:1, enough for icons (3:1) but keep it off icons that carry meaning without a label.

## Qualys utility icons

`download`, `arrow-right`, `arrow-left`, `outlink`, `search`, `check`, `filter`, `menu`, `time`, `chevron-right|left|up|down`, `plus`, `cross`, `view-list|month|grid`, the status icons `alert-triangle`, `alert-circle`, `check-circle`, `x-circle`, `file`, `party` and `cookie`, the five `event-*` icons, the three `general-*` icons and the `social-*` icons.

- Components that name these (Button, TextLink, cards, events, SocialButton) keep using them. For anything new, use Hugeicons.
- `general-events`, `general-webinar` and `general-resource` are 56 × 43 line icons for hub promo cards: `size` sets their height (43 there).
- `social-*` are the 24px social glyphs; use them through SocialButton. `menu` is 20 × 16: `size` sets its height.
- `outlink` marks links that leave qualys.com; `arrow-right` marks links that stay.

## Accessibility

- Decorative icons are hidden from screen readers. An icon alone in a button needs the button's `aria-label`; an icon that carries meaning on its own takes `title`.
- Never rely on an icon alone for a status: pair it with text.
