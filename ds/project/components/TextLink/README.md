# TextLink

**Status:** Ready

Tertiary text-link buttons from the Figma Tertiary sheet: a lightweight inline call to action, with or without an arrow.

**Provide:** the label, a `tone`, `size` (`rg` 16px or `sm` 14px), `arrow` when it moves the reader forward, and `href` (else it renders a `<button>`).

| Tone | Color | Use |
| --- | --- | --- |
| `red` | `link-secondary-default` → `link-secondary-hover` | Lesser CTAs or dismiss actions, in cards, standalone, or among several adjacent CTAs. |
| `blue` | `link-primary-default` → `link-primary-hover` | Functional clickable elements such as filters; with an arrow, CTAs in banners, modals and dense text. |
| `neutral` | `text-primary` label, `qualys-blue` arrow (use with `arrow`) | Lesser CTAs inside cards and other small modules. |
| `inverted` | `text-inverted` | On dark surfaces. |

- Label in Wix Madefor Text SemiBold (16 or 14px, −0.5%); arrow 16px, `spacing-5xs` gap.
- The arrow moves forward by `spacing-5xs` on hover and press — it reinforces direction.
- **Leading icon:** `iconLeft` takes an icon name (or your own node) and draws it 16px before the label, 4px away, in the link's color. Use it for an action with a familiar symbol, such as Download. Use either the leading icon or the arrow, not both.
- Disabled is 50% opacity.
- Never compete with a primary button: one TextLink beside a primary is the most a row should carry.
- **Names:** `textlink[-arrow][-tone][-sm]-{state}`, for example `textlink-red-sm-hover` or `textlink-arrow-blue-default`; the charcoal link with an arrow is plain `textlink-arrow-…`. The preview lists every configuration with its tokens and usage.
- A text link button lives outside a paragraph, for example at the foot of a card. Inside a sentence use Hyperlink.
- `is-hover` and `is-pressed` draw those states without the pointer, for documentation only.
