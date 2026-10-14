# EventCalendar

The events calendar from the Figma Calendar page: a search and filter bar over one of three views of the same events — a month grid, a day-by-day list or a grid of cards.

**Provide:** `events` and, optionally, `defaultView`, `defaultMonth` and a `promo` card for the grid.

Each event: `{ id, title, type, format, start, end, time, href, image, flag, speakers, action }`.

- `type` is `qualys`, `industry`, `webinar`, `speaking` or `training`.
- `start` and `end` are dates as `YYYY-MM-DD`; leave `end` out for a one-day event.
- `time` is the text to show, such as "10a – 11a PST".

| View | Figma name | What it shows |
|---|---|---|
| `month` (default) | Month View | A month grid with a coloured bar for each event |
| `list` | List View | The month's events grouped by day, each with a button |
| `grid` | Grid View | Every event as a card, newest first, with "Load More" |

Shared parts:

- **Toolbar,** on the page background (`surface-neutral-200`) with a `stroke-neutral-400` rule under it, 36px above and below (`spacing-3xl`): a line SearchBar (432px) on the left; on the right a FilterBar with "Event Type" and "Format" and "Reset Filters". Search and filters apply to all three views.
- **Body,** on the page background, 36px above and below, on the 1140px column.
- **Heading row:** the month in `h2` (Wix Madefor Text SemiBold 38px), then the previous / next buttons (48 × 50px, joined, white, `radius-rg`). On the right, "View" and the three-button toggle (list, month, grid); the chosen one is `qualys-blue` with a white icon.
- The grid view has no month; its heading is "Browse Events".

Month view:

- **"Current Month"** (white, 50px tall, IBM Plex Sans SemiBold 16px) sits after the arrows and returns to today's month.
- **Legend,** 36px under the heading and in line with it: a 16px `radius-xs` swatch and the type name, SemiBold 16px. It has the same place and spacing as the list view's legend (a 30px row, 24px between types, the swatch in the 24px slot an icon takes), so the names don't move when the view changes.
- **Calendar card,** 36px below: white, `radius-lg`, 16px padding, `shadow-drawer`. Weekday names SemiBold 16px; seven columns divided by 1px `stroke-neutral-400` lines; each week at least 180px tall.
- **Day:** the date in IBM Plex Sans Medium 16px `text-secondary`. Today is `misty-blue`; days from the months either side are `surface-neutral-200`.
- **Event bar:** `radius-xs`, 6px padding, white 14px text, 10px in from the column edges. A one-day event shows the type, the format and the title (Medium). An event of several days is one bar across its days: "Type | Format" over the title, 48px tall.
- **Compact bar:** 24px tall, the title only. Used when a day has more than one event.
- **Colours:** Qualys Event `qualys-red`, Industry Event `charcoal`, Webinar `qualys-blue`, Speaking Engagement `event-speaking`, Training `asphalt`.
- **Hover or focus** on a bar shows the event's card (364px wide) beside it. Pressing the bar opens the event.

List view:

- **Legend** uses the EventType icons, in the same position and with the same spacing as the month view's.
- **Day heading:** "Tuesday Jan 14", IBM Plex Sans Medium 16px, 20px in from the left. 8px below it, a white card (`radius-lg`, 24px padding) with one row per event; rows are divided by a `stroke-neutral-400` line.
- **Row:** the time (150px, Medium 16px `text-secondary`; "All day" when an event has none), the event type icon, the title (Wix Madefor Text SemiBold 18px, two lines at most) and a secondary Button, 140px wide.
- **Button:** "Register" by default. Set `action` on an event to change it, such as `{ label: 'Join Waitlist', variant: 'secondary-alt' }`, or `action: false` to leave it out.
- A row never shows a date, because it already sits under its day. An event of several days repeats under each of its days.

Grid view:

- Three cards across, 24px apart, 36px between rows; each at least 440px tall. Events use EventCard, or WebinarCard when they have `speakers`.
- `promo` (InlinePromoCard props) places a dark promo card as the sixth tile.
- "Load More" (secondary Button), centred 36px under the grid, adds another page. `pageSize` sets how many tiles a page has (9).
- **Hover:** the same as every card: the blue bar slides in and the outlink arrow nudges.

Responsive:

- **Tablet:** the search takes its own row above the filters; weekday names shorten to "Sun"; every bar is compact; the grid has two columns.
- **Mobile:** the filters become one "Filter" dropdown that opens the FilterDrawer. The month is centred between the two arrows (28px) and the toggle spans the width below it.
- **Mobile month:** the calendar runs edge to edge with weekday initials, 12px dates and 20px bars showing the start of the title; "Current Month" and the legend move below it. Tapping a bar shows its card; tapping the card opens the event.
- **Mobile list:** each row stacks: time, type icon and name, title, then a full-width button. The legend is hidden.
- **Mobile grid:** one column.

Usage, from the Figma notes:

- Keep event bars under the date. If a date has several events, use the compact bar with just the name.
- The list keeps the current content structure and carries the card styles through.

Do / Don't:

- Do keep titles short; a bar shows one line and a list row two.
- Do give every event a `type`; colour alone never tells types apart, so the type is also in each bar's label and card.
- Don't put more than about four events on one day in the month view; point people to the list instead.

Accessibility:

- Each bar is a link whose name gives the title, type, format, dates and time. The hover card repeats this and is hidden from screen readers.
- The view buttons are labelled "List view", "Month view" and "Grid view" and report which is pressed. The month heading announces itself when the month changes. Esc closes the card.
- White text on `qualys-blue` (3.78:1) and `qualys-red` (4.18:1) is under 4.5:1 at 14px; kept as designed.

Notes:

- Figma's examples mix full and compact bars on days with two events; this follows the written rule (`compact="auto"`). Set `compact={false}` to always show full bars or `compact` to always show compact ones.
- Day lines are drawn in #D9DCE0; they use `stroke-neutral-400`. List cards are drawn with a 2% shadow; they use `shadow-card`. The hover card uses `shadow-modal` so it stands out on the white calendar.
- The calendar file draws "Upcoming" flags in red and a blue "Multi-Day" flag, and colours each card's event type. Cards here stay as the Cards page defines them: flags in the tier colours and the type in `text-accent-primary`.
- Figma's mobile bars use 8px text; this uses 10px.
- Figma puts the mobile view toggle in the toolbar on the list and grid and under the month on the month view; here it is always under the heading.
- The search placeholder is "Search Resources" in Figma; here it is "Search Events" (`labels.search`).
- The Figma month frame shows the list button as selected; the toggle here follows the view in use.
- Figma's note asks for grid cards to grow 5% on hover. That was dropped so every card behaves the same.
