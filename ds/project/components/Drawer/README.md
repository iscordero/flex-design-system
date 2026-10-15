# Drawer

**Status:** Ready

The Standard drawer from the Figma Drawers page: a ruled row with a title that expands downward to show detail — the system's accordion row. Closed it is compact; open it reveals body copy and an optional call to action.

**Provide:** `title`, body copy as children, and optionally `icon` (a feature icon URL or node) and `cta` (a small Button or a TextLink). `defaultOpen` starts it open; or control it with `open` + `onToggle`. For a list of them, use Accordion.

- **Row:** 56px tall closed, between two 1px `stroke-neutral-400` rules (stacked drawers share a rule, so rows repeat every 56px). 16px above and below the title, 8px at the sides.
- **Title:** Wix Madefor Text SemiBold 18px, line height 1.3, −1%, `text-primary`; Title Case. Keep it under 180 characters and two lines.
- **Icon:** optional feature icon in a 32px box, 8px before the title (Feature Icons group).
- **Trigger:** a 16px chevron on the right — down when closed, rotating to up when open. The whole row is the button.
- **Body:** IBM Plex Sans Regular 16px, line height 1.3, `text-primary`; keep it under 500 characters so it doesn't run long on mobile. The CTA sits 24px below the copy; 16px closes the row.
- **Motion:** the panel animates its height over 300ms and the chevron turns over 200ms; neither moves for people who prefer reduced motion.
- **Mobile and tablet (under 1024px):** rows repeat every 48px, with no side padding, a 24px icon, 16px above the CTA and 12px closing the row. `layout="mobile"` shows this layout at any screen width (the preview uses it to show a phone screen).
- Exposed as a heading (level 3 by default, `headingLevel`) holding a button with `aria-expanded`; the panel is a labeled region. Keyboard focus shows `focus-ring`.
- For session cards with a time, speakers and a Register button, use DrawerCard.
