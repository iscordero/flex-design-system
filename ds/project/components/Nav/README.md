# Nav

The global navigation from the Figma Navigation page: the logo, the primary items with their menus, utility links, search and one call to action. Below 1200px it becomes a bar with a menu button that opens a full-screen menu.

**Provide:** `logoSrc` (the full-colour logo from Logos), `items`, `utility` links, `search` and `cta` (`{ label, href }`). An item is a link (`{ label, href }`) or opens a menu (`{ label, menu }`).

| Menu | Give it | Looks like |
| --- | --- | --- |
| Mega menu | `menu: { overview, railLabel, groupsLabel, groups }` | A warm rail with the overview and a filter list, beside the groups of links in three columns |
| Column dropdown | `menu: { columns: [{ title, links }] }` | One or more titled columns of large links |

**Desktop bar (1200px and up)**

- White, 80px tall, `shadow-nav`. Content is 1140px wide and centred.
- Logo 37px tall, then 36px to the items. Items and utility links are IBM Plex Sans Medium 16px `text-primary`, 16px apart; they turn `text-accent-primary` on hover.
- The current or open item shows a 4px `qualys-blue` bar on the bottom edge of the nav. Set it with `current` (the item's label). It is one bar for the whole row: tapping another item slides it across (300ms ease-in-out, the same motion as Tabs), and closing a menu sends it back to the current page. With reduced motion it moves without sliding.
- Right side: a 16px search icon (see **Search panel**), the utility links ("Community", "Login", "Contact Us") and a small primary Button ("Get Started"), each 16px apart.
- **Narrow desktop (1200–1365px):** utility links marked `collapse: true` hide, so the row keeps its spacing. On qualys.com mark Community and Contact Us; Login, search and Get Started always stay. Both stay in the mobile menu and the footer.
- Menus open on hover and on click, Enter or Space. Esc, a click outside or moving the pointer away closes them. `hover={false}` makes them click-only.
- Menus slide open downwards from under the bar (300ms ease-in-out) and slide shut the same way (250ms). Moving from one open menu to the next only fades, so the panel doesn't drop twice.

**Desktop menus: one type and spacing scale**

Both menu kinds use the same sizes, so moving between Platform, Solutions and the rest feels like one menu:

| Role | Style | Spacing |
| --- | --- | --- |
| Eyebrow ("PLATFORM APPS", "PARTNERS") | `eyebrow-xs` 12px, `text-secondary` | 12px down to its `stroke-neutral-500` rule, 20px from the rule to the content |
| Overview title, group headings, capability filter rows, column-dropdown links | Wix Madefor Text SemiBold 16px | 12px from a heading to its links |
| Group links | IBM Plex Sans Medium 16px, `text-secondary` | 16px (`spacing-rg`) between links; 32px between groups |
| Description | IBM Plex Sans Regular 16px | 4px under the overview title |
| New and other badges | Tag `sm` (`tag-xs` 12px Bold, 25px tall) | 8px after the last word. A badge labels, it never asks: "New", not "Discover" or "Try" |
| Panel | `radius-lg`, `shadow-card` | 24px top and bottom, 36px at the sides (24px in the rail) |

**Mega menu**

- 1249px wide, centred under the bar.
- **Rail:** 300px, `surface-neutral-200`. The overview eyebrow, title and description; 24px below, a second eyebrow and the filter list: "All" plus one row per group, at least 44px tall (10px × 12px padding), **with no gap between rows**, so a hovered row sits right against the active one. Choosing a row shows only that group.
- **Groups:** an eyebrow over a rule, then three columns 32px apart, filled in order down each column (Risk Operations Center, Vulnerability & Configuration Management and Compliance first). `groupColumns: 2` gives two columns for a menu with fewer, longer groups. On hover a link turns `text-accent-primary` and a 16px `qualys-blue` arrow slides in beside it.
- **Long labels:** a link that wraps onto two lines keeps its arrow (and its New badge) after the last word, not beside the whole block. The last word, badge and arrow never break apart.
- `badge: true` on a group or link adds a small blue "New" Tag; pass a string for other wording.

**Hover, everywhere in the Nav:** the label turns `text-accent-primary`. Links inside a menu (group links, linked group headings, the overview title, column links) also get the blue arrow sliding in from the left over 150ms. The filter rows in the rail are buttons, not links, so they tint instead.

**Column dropdown**

- Each column is 340px: an eyebrow over a rule, then links 16px apart. They hover like the mega menu's links: blue label, blue arrow.

**Search panel**

- With `search` set and no `href` or `onClick`, the search icon opens a panel under the bar, like a menu: the width of the bar's content (1140px), `radius-lg`, `shadow-card`, 24px × 36px padding.
- Inside: a contained SearchBar (56px) that takes focus as the panel opens, and optional `suggestions` below it under a "Popular searches" eyebrow, as tag chips (the FilterChip style, 36px, 8px apart) that link to their results.
- While it is open the icon becomes a cross and the blue bar sits under it. The cross, Esc or a click outside closes it, and focus returns to the icon. Pressing Enter calls `onSearch` with the query.
- Unlike the menus, it doesn't close when the pointer leaves, and hovering an item doesn't swap it for that item's menu: someone may be typing.
- Mobile: the menu panel already starts with the search field, so there is no separate panel.

**Mobile and tablet (below 1200px)**

- A 64px bar with the logo and a menu button. It opens a full-screen white menu with the logo and a close button on top.
- **First level:** a contained SearchBar, then one row per item (Medium 16px, a `qualys-blue` arrow, `stroke-neutral-500` rules). The utility links (`text-secondary`) and a full-width primary Button sit at the bottom.
- **Drilling in:** an item with a menu opens its own level. A mega menu shows the overview and the filter list as rows; choosing "All" or a group shows its links. The blue link at the top names the current level and goes back one step.
- The menu slides in from the right edge and slides back out when it closes (300ms ease-in-out). Each level slides in from the side it came from: from the right when drilling in, from the left when going back.
- Esc or the close button closes the menu and returns focus to the menu button; focus stays inside while it is open, and moves to the back link after each step.
- With reduced motion, menus and levels appear and disappear without sliding.

**Spacing, minimum and maximum**

- Don't tighten the menus further: 16px between links and 44px filter rows are the minimum for comfortable pointing, and the menus never use text below 16px, apart from eyebrows and badges. Keep group and link labels short: in three columns each is about 270px wide.
- The panel is never taller than the window less 120px; past that it scrolls inside. The rail's warm ground always runs to the panel's bottom edge, including while it scrolls.

**Community**

- `label="COMMUNITY"` adds the site name beside the logo (Wix Madefor Text Medium 18px) and `align="center"` centres the items in the remaining space. No utility links or call to action.

**Notes**

- The Figma page is marked Pending Review and its usage notes are still "TBD", so expect changes.
- The items and the Platform menu's names follow qualys.com: Platform, Solutions, Customers, Resources, Support, Partners, Company. Figma draws menus for Platform and Solutions only; the preview's other menus use the column dropdown with links and addresses from qualys.com's sitemap and footer, so their grouping is provisional.
- Figma draws the hamburger bar for tablet (760px) and mobile; the switch is set at 1200px, where the full row stops fitting.
- The Community bar has no tablet or mobile design; it uses the same mobile menu.
- Mobile link text is drawn in #4D4D4D and desktop in Asphalt; both use `text-secondary`.
- `layout="desktop"` or `"mobile"` forces one layout, and `inlinePanel` shows the mobile menu in the page flow, for documentation.
- **Shape:** the bar runs edge to edge with square corners; only its menu panels are rounded (`radius-lg`).
- **Hover and active rows:** in the mega menu's rail, hover is a neutral tint (`chip-bg`, 5% Charcoal) and the active row is Misty Blue (`surface-blue-200`) with the blue marker on its left edge. The same rule as the list AccordionModule and every list of tabs.
