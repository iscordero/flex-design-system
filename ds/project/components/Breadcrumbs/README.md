# Breadcrumbs

The trail above a page that shows where it sits in the site, from the Figma Breadcrumbs page: a link for each level above, then the page itself as plain text.

**Provide:** `items`, from the root to the current page. Each is `{ label, href }`; the last one is the current page and can be just its name.

- **Links:** IBM Plex Sans SemiBold 16px in `link-primary-default`, line height 1.3, −1%. Every item but the last is a link.
- **Current page:** IBM Plex Sans Regular 16px in `text-primary`. It is text only, with no hover or link styles.
- **Separator:** the 12px `chevron-right` in `stroke-neutral-500`, 6px from the labels either side.
- **Hover:** a 2px bar in the link's colour, 1px under the label, with a 2px radius. The row is 24px tall either way, so nothing moves.
- **Pressed:** the link darkens to `link-primary-hover`. **Focus:** the `focus-ring`.
- **Long names:** the trail stays on one line. The current page is cut with an ellipsis when it runs out of room; its full name stays available as a tooltip and to screen readers.
- **Deep trails:** with more than four levels the middle ones fold behind "…", leaving the root and the last two: Home › … › Category › Current. Pressing the dots opens the full trail. `maxItems` changes the limit; `0` never folds.
- **Mobile:** 14px, and only the level above and the current page show.
- **On the page:** `contained` puts it on the 1140px content column with 32px above and below (24px on mobile), under the Nav and above the page's first module.
- **Accessibility:** a `nav` named "Breadcrumb" holding an ordered list; the current page carries `aria-current="page"`; the chevrons are hidden from screen readers.

Use it when:

- The site has two or more levels under the page.
- People may need to place themselves in deep or layered content, or want a shortcut to a parent page.

Leave it out when:

- The hierarchy is one level deep.
- The page has no clear parent.
- It would only repeat the main navigation.

Naming:

- Keep labels short and easy to scan, in Title Case.
- Don't repeat words already in the page title.
- Never shorten the root ("Home").

Notes:

- Figma draws the hover bar with only its right corners rounded; it has a 2px radius on all four here, as asked in review.
- Figma's notes suggest start or middle truncation for the levels between the root and the page. Those levels are never cut here: keep their labels short, and let a deep trail fold instead.
- It answers to its own width, so place it where it can span the column. Inside a block module or with `contained` it follows that module's width.
- Blue links at 16px measure 3.78:1 on white, under the 4.5:1 asked of small text; kept as designed and flagged, like the system's other blue links.
