# Accordion

A group of drawers from the Figma Accordion page: sections that expand and collapse so a page stays compact while the detail is one click away. Two kinds: **standard** (ruled rows) and **cards** (session cards).

**Provide:** `items` and a `variant`. Standard items take `{ id, title, icon, content, cta }`; card items take `{ id, time, title, content, speakers, cta }` (the same parts as Drawer and DrawerCard). `defaultOpen` names the item (id or index) to start open. Opening one closes the others; pass `multiple` to let several stay open, or `collapsible={false}` to keep one open at all times (the open row can't be closed, only swapped). For an accordion as a whole page section, use AccordionModule.

| Variant | Use it for | Looks like |
| --- | --- | --- |
| `standard` | Secondary information people read one section at a time: FAQs, legal disclaimers, technical specifications; many categories with little visual noise; nested information where cards would look bulky | Drawer rows stacked with shared rules |
| `cards` | Event or session lists where time and title come first; items with an action ("Register") people can take without opening; content that should feel like distinct entities | DrawerCards stacked 16px apart; every Register or Join Waitlist button is the same width (see DrawerCard) |

- **How many:** at least 4 drawers, at most 12.
- **Default state:** all collapsed; the first may start open when it holds the primary information.
- **Standard, icons:** give every item an icon or none — Figma has an "Icon + Text" type and a "Text" type, not a mix.
- **Width:** the accordion fills its container. In the Figma layouts that is the content width inside the page margins on mobile, tablet and desktop; session cards run up to 1144px wide, centred, on desktop and larger.
- **Mobile and tablet (under 1024px):** standard rows tighten to a 48px pitch with no side padding, a 24px icon and 16px above the CTA; cards keep their 16px gap and follow DrawerCard's mobile layout under 768px. `layout="mobile"` passes the phone layout to every row at any screen width.
- Each row or card keeps Drawer's and DrawerCard's own rules (headings, `aria-expanded`, motion, character limits).
- The session cards drawn on the Accordion page differ slightly from the Drawers page (18px names, no speaker shown while closed). That page points to the Drawers page for the cards, so this uses DrawerCard as is.
- Figma doesn't say whether several sections may be open at once; one at a time follows its "one section at a time" guidance.
