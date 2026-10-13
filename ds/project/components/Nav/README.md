# Nav

The global navigation from the Figma Navigation page: the logo, the primary items with their menus, utility links, search and one call to action. Below 1200px it becomes a bar with a menu button that opens a full-screen menu.

**Provide:** `logoSrc` (the full-colour logo from Logos), `items`, `utility` links, `search` and `cta` (`{ label, href }`). An item is a link (`{ label, href }`) or opens a menu (`{ label, menu }`).

| Menu | Give it | Looks like |
| --- | --- | --- |
| Mega menu | `menu: { overview, railLabel, groupsLabel, groups }` | A warm rail with the overview and a filter list, beside the groups of links in two columns |
| Column dropdown | `menu: { columns: [{ title, links }] }` | One or more titled columns of large links |

**Desktop bar (1200px and up)**

- White, 80px tall, `shadow-nav`. Content is 1140px wide and centred.
- Logo 37px tall, then 36px to the items. Items and utility links are IBM Plex Sans Medium 16px `text-primary`, 16px apart; they turn `text-accent-primary` on hover.
- The current or open item shows a 4px `qualys-blue` bar on the bottom edge of the nav. Set it with `current` (the item's label). It is one bar for the whole row: tapping another item slides it across (300ms ease-in-out, the same motion as Tabs), and closing a menu sends it back to the current page. With reduced motion it moves without sliding.
- Right side: a 16px search icon, the utility links ("Community", "Login", "Contact Us") and a small primary Button ("Get Started"), each 16px apart.
- Menus open on hover and on click, Enter or Space. Esc, a click outside or moving the pointer away closes them. `hover={false}` makes them click-only.
- Menus slide open downwards from under the bar (300ms ease-in-out) and slide shut the same way (250ms). Moving from one open menu to the next only fades, so the panel doesn't drop twice.

**Mega menu**

- 1249px wide, centred under the bar, `radius-lg`, `shadow-card`.
- **Rail:** 300px, `surface-neutral-200`. An eyebrow (`eyebrow-sm`, `text-secondary`), the overview title (SemiBold 18px) and one line of description (16px). Then a second eyebrow and the filter list: "All" plus one row per group, 42px tall, 12px apart; the selected row has a `hyperlink-default` tint at 15% and 8px corners. Choosing a row shows only that group.
- **Groups:** an eyebrow over a `stroke-neutral-500` rule, then two columns 32px apart. Each group has a heading (SemiBold 18px) and links in IBM Plex Sans Medium 16px `text-secondary`, 12px apart, with 48px between groups. On hover a link turns `text-accent-primary` and a `qualys-blue` arrow slides in beside it.
- `badge: true` on a group or link adds a small blue "New" Tag; pass a string for other wording.

**Hover, everywhere in the Nav:** the label turns `text-accent-primary`. Links inside a menu (group links, linked group headings, the overview title, column links) also get the blue arrow sliding in from the left over 150ms. The filter rows in the rail are buttons, not links, so they tint instead.

**Column dropdown**

- `radius-lg`, `shadow-card`, 36px × 48px padding. Each column is 340px: an eyebrow over a rule, then links in Wix Madefor Text SemiBold 18px, 24px apart. They hover like the mega menu's links: blue label, blue arrow.

**Mobile and tablet (below 1200px)**

- A 64px bar with the logo and a menu button. It opens a full-screen white menu with the logo and a close button on top.
- **First level:** a contained SearchBar, then one row per item (Medium 16px, a `qualys-blue` arrow, `stroke-neutral-500` rules). The utility links (`text-secondary`) and a full-width primary Button sit at the bottom.
- **Drilling in:** an item with a menu opens its own level. A mega menu shows the overview and the filter list as rows; choosing "All" or a group shows its links. The blue link at the top names the current level and goes back one step.
- The menu slides in from the right edge and slides back out when it closes (300ms ease-in-out). Each level slides in from the side it came from: from the right when drilling in, from the left when going back.
- Esc or the close button closes the menu and returns focus to the menu button; focus stays inside while it is open, and moves to the back link after each step.
- With reduced motion, menus and levels appear and disappear without sliding.

**Community**

- `label="COMMUNITY"` adds the site name beside the logo (Wix Madefor Text Medium 18px) and `align="center"` centres the items in the remaining space. No utility links or call to action.

**Notes**

- The Figma page is marked Pending Review and its usage notes are still "TBD", so expect changes.
- Figma draws menus for Platform and Solutions only. The preview's Customers, Resources, Support and More menus use the column dropdown with links and addresses from qualys.com's sitemap and footer. Partners and Company share the "More" item. The site's own header menus are drawn by script and could not be read, so the grouping of these four menus is provisional.
- Figma draws the hamburger bar for tablet (760px) and mobile; the switch is set at 1200px, where the full row stops fitting.
- The Community bar has no tablet or mobile design; it uses the same mobile menu.
- Mobile link text is drawn in #4D4D4D and desktop in Asphalt; both use `text-secondary`.
- `layout="desktop"` or `"mobile"` forces one layout, and `inlinePanel` shows the mobile menu in the page flow, for documentation.
- **Shape:** the bar runs edge to edge with square corners; only its menu panels are rounded (`radius-lg`).
- **Hover and active rows:** in the mega menu's rail, hover is a neutral tint (`chip-bg`, 5% Charcoal) and the active row is Misty Blue (`surface-blue-200`) with the blue marker on its left edge. The same rule as the list AccordionModule and every list of tabs.
