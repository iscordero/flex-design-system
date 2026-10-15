# CookieBanner

**Status:** Ready

Cookie consent in two forms: a compact bar along the bottom of the screen, and a panel with a switch for each category.

**Provide:** for the bar, `onAccept` and `onDecline`, plus `link` for the policy and `onManage` to open the panel. For the panel, `variant="expanded"`, `categories` (`{ id, label, description, required }`), `onSave(prefs)` and `onAccept(prefs)`.

- **Compact:** fixed to the bottom at full width, white with `shadow-modal`. A 24px cookie icon, the message in 14px `text-secondary` with a "Learn more" link, then Decline (secondary) and Accept All (primary), both small. It slides up over 400ms.
- **Expanded:** a 600px panel on an Overlay: "Cookie Preferences" (`h4`, SemiBold 20px), a line of copy, then one Toggle per category with its name (Medium 14px) and description, and Save Preferences and Accept All at the bottom left.
- A `required` category is switched on and can't be changed.
- `onSave` gets the choices as `{ id: true | false }`; `onAccept` gets every category as true.
- **It stays until answered.** Neither form has a close button, and Esc and the backdrop do nothing.
- The bar doesn't block the page; the panel does, and keeps focus inside.
- **Mobile:** the bar stacks with full-width buttons; the panel becomes a sheet from the bottom with its buttons stacked.
- Sits at `z-cookie`: above the page and tooltips, below modals.
- **Accessibility:** the bar is a region named "Cookie consent"; the panel is a `dialog` named by its title.
- Figma's notes say Accept All and Decline "must be equally prominent", but both drawings show a secondary and a primary button. This follows the drawings.
