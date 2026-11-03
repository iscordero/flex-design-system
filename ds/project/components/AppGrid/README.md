# AppGrid


The app suite: one card per product family, each with its icon and name over a blue rule and its apps listed as links. An optional centered copy block (title, paragraph, text link) sits above the cards.

**Provide:** `groups` (`{ title, icon, links }`, where each link is text or `{ label, href }`), and optionally `title`, `body`, `link`, `eyebrow` and `label`.

**Sizes**

- **Copy:** centered, 800px wide at most: the heading in `h2`, 16px, the body in `paragraph-rg`, then a neutral TextLink with an arrow, centered. 48px below it, the cards.
- **Cards:** as many 220px columns as fit, 24px (`gutter`) apart: five families fill a desktop row. Each card is `surface-neutral-100`, `radius-lg`, `shadow-card`, 24px padding, and cards in a row share the tallest height.
- **Card head:** an 80px Feature Icon centered over the family name in `h3` (SemiBold 24px), 16px apart. Names get three lines' room, so the rules line up across the row.
- **Rule:** 4px of `qualys-blue` across the card's full width, 24px above and below.
- **Apps:** IBM Plex Sans 16px, `text-primary`, 16px apart.

**States**

- **Hover and focus:** an app turns `hyperlink-default` with a 1px underline, like a Hyperlink.

**Mobile:** one card per row. The icon (48px) sits left of the family name, which is left-aligned; the copy's link stays centered.

**Accessibility**

- The cards are a list named by `label` ("Apps" by default); each family name is a heading one level below the section title; each app is a link.
- The icons are decoration.

Do / Don't:

- Do keep family names short (two lines at most) and list each app once.
- Don't add body copy inside the cards; link to the app's page instead.

Notes:

- First built for the homepage redesign ("A Powerful Suite of Apps on a Single, Unified Platform").
