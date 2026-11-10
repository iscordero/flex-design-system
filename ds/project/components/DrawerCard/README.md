# DrawerCard


The card drawer from the Figma Drawers page, built for event agendas: a white card with a time, a session title and a chevron that opens to show the description, with zero to many speaker profiles and an optional call to action.

**Provide:** `title`; optionally `time` (the overline), a description as children, `speakers` (`{ name, designation, company, image }`) and `cta` (a secondary Button such as "Register"). `defaultOpen`, or `open` + `onToggle`, set the state.

- **Card:** white, `radius-lg`, `shadow-drawer`, 24px padding (16px on mobile). Time in IBM Plex Sans Medium 16px `text-secondary`; 10px; title in Wix Madefor Text SemiBold 24px, line height 1.3, −2% (under 180 characters, clamped at two lines). A 30px chevron sits top right, level with the time.
- **Open:** the description (Regular 16px, under 500 characters) appears 10px under the title; profiles follow 20px below.
- **Profile:** 40px round headshot (or the `avatar-bg` placeholder), 16px, then name (SemiBold 16px), designation (Regular 16px `text-secondary`) and company (Medium 16px `text-secondary`).

**The profile rule.** How much each profile shows depends on how many there are. A closed card always keeps its profiles on one row.

| Profiles | Closed: each profile shows | Closed: layout | With a button |
| --- | --- | --- | --- |
| None | — | Time and title only | The button sits beside the title |
| 1 | First and last name, role, company | The profile is as wide as its content | Button at the right end of the row |
| 2 | Name, role, company | Each profile as wide as its content, 20px apart | Same |
| 3 | Name, role (two lines at most, then "…"), company | Same | Same |
| 4 | Name and company | Same | Same |
| 5 | Name and company | One row | Same |
| 6 | First name over surname, and company | One row | Four are named; the fifth and sixth stack as headshots with "+2" |
| More than 6 | The first four: first name over surname, and company | The rest stack as headshots overlapping by 15px, four circles at most | The last circle shows "+N" |

- **"+N"** counts everyone in the stack (every profile that isn't named). It shows with a button, or when the stack holds more than four people.
- **Open (any number):** everyone is listed in two columns with name, role and company.

**Names, roles and companies**

- **Profiles hug their content.** Each profile is as wide as its longest line, with 20px to the next. There are no equal columns, so short names don't leave gaps. A role shrinks to its own text: one line when it fits under its cap, otherwise the narrowest width that holds it on two even lines; only a role too long for two lines at the cap fills the cap and ends in "…".
- **Names are never shortened.** A closed card shows every name on one line, or, when the row is too wide, every name on two lines: the same for the whole row, never a mix. A name splits where its two lines come out most even ("Maximiliano Alessandro" over "Fernández-Castellanos"); a one-word name stays on one line.
- **Roles and companies are limited** so a long one can't crowd the row:

| | Closed | Open and mobile |
| --- | --- | --- |
| Name | In full: one line, or two | In full |
| Role (one to three profiles) | Two lines at most, ending in "…": 480px wide with one profile, 320px with two, 240px with three | In full |
| Company | One line, 200px at most, ending in "…" | In full |

- Cut text shows in full as a tooltip, and screen readers always read all of it.
- **Content limits:** roles up to 60 characters and company names up to 25, so they show in full in most cards. Use the company's everyday name ("IBM", not "International Business Machines Corporation"). Names have no limit.

**How the layout changes with the browser size**

The card has one fixed breakpoint: 768px of browser width (`breakpoint-tablet`). There is no separate tablet layout. From 768px up, the card fits its profile row to its own width, so the same rules apply in the full content column, on a tablet and in a narrow column.

| Browser width | Card width | Padding | Closed card | Open card | Button |
| --- | --- | --- | --- | --- | --- |
| Desktop, 1024px and up | 912px at 1024px, growing to 1440px (`content-max`) from 1552px | 24px (`spacing-xl`) | Profiles on one row, by the profile rule | Everyone in two columns with name, role and company | At the right end of the profile row; beside the title when there are no profiles |
| Tablet, 768–1023px | 696–951px (the browser less the 36px page margins) | 24px | The same row. The card is narrower, so names go to two lines and profiles stack sooner (see below) | Two columns | The same |
| Mobile, under 768px | The browser less the 20px page margins | 16px (`spacing-rg`) | One column: every profile under the last, name and company only. No headshot stack and no "+N" | One column; roles are added | Full width, at the bottom of the card |

- The breakpoint follows the browser, not the card. A card in a narrow column on a desktop page keeps the row layout and fits it to that column.
- Time, title (24px, two lines at most) and chevron keep their size and place at every width.

**Between 768px and full width: how the row fits**

A closed card keeps its profiles on one row. When the row is too wide for the card, it changes in this order, and changes back as the card widens:

1. Every name on one line.
2. Every name on two lines.
3. Profiles move into the headshot stack one at a time, last first. "+N" keeps count. This applies to any number of profiles, so one to three profiles stack too when a narrow card can't fit them.
4. With one named profile left and still too little room (a very narrow card with a button), its name wraps onto more lines. It is never cut.

There are no fixed breakpoints: the card measures its row, so the widths depend on the names. Long names fill the row sooner, so profiles stack sooner. With the long sample names, a 1140px card names four profiles; six long profiles with a button name two at 950px and one at 700px.

**Sizes and usage**

- **Width:** the card fills its container; there is no maximum. It is designed for the content column (up to 1440px). Minimum 320px; with a button on a screen of 768px or wider, keep it at least 420px wide, or the row cannot fit one name, the stack and the button.
- **Height** follows the content. Closed, with the sample content: 105px with no profiles, 168 to 209px with profiles. On mobile a closed card grows by about 62px per profile (615px with eight).
- Use the full-width column for agendas where most sessions have four or more speakers. In a column under about 560px only one or two profiles are named.
- For long agendas on mobile, set `speakerVisibility="open-only"` so closed cards stay short, and let the open card list the speakers.
- When profiles are stacked, turn on `profileCards` so each headshot can still give its name.
- The row is fitted again whenever the card changes width and when the web fonts finish loading.


- **CTA:** closed, it sits at the right of the profile row, on its last line. Open, it takes the empty cell on the last row, or a row of its own at the right when the rows are full; with one or two profiles it stays beside them.
- **Button width:** every card button is at least 136px wide, the width of the longest standard label, **Join Waitlist** (133px). Register (red, `secondary`) and Join Waitlist (blue, `secondary-alt`) are then the same size and line up down a list. Keep card labels to two short words; a longer label makes its button wider than the rest.
- **Mobile CTA:** the button spans the card at the bottom. `layout="mobile"` shows the phone layout at any screen width (the preview uses it).
- The whole header is the toggle (a heading with a button, `aria-expanded`); the CTA is a separate control, so clicking it doesn't open the card. The headshot stack reads "and N more" to screen readers.
- For a list of sessions, use `Accordion variant="cards"`: it stacks the cards 16px apart and opens one at a time.
- From the review rounds: no extra-large avatars; names use the title styles with a tight gap to role and company. Equal-width columns for one to three profiles were replaced by profiles that hug their content.
- Figma's CTA here is a 48px outlined red button; the system's secondary Button is 50px, so cards with a CTA run 2px taller than the Figma frames.
- The profile rule was set in review: profiles sit at their own width, as in Figma, but the role stops at two lines so long roles don't add rows.
- **Shown only when open:** `ctaVisibility` and `speakerVisibility` are `"always"` (the default) or `"open-only"`. With `open-only` the closed card leaves that part out and it appears when the card opens. Use it to keep a long agenda compact.
- **Profile hover cards:** `profileCards` turns every headshot into a button that opens a profile HoverCard: headshot, name, role, the company logo (the speaker's `logo`) and the LinkedIn button (from the speaker's `link`), with the close icon top right. Pointing at a headshot peeks at its card; clicking pins it, and the other headshots wait until it is closed.
