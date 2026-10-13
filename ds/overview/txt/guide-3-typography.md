# Typography

Two Google-hosted families. Base size 16px; every style has a desktop and a mobile size (mobile under 768px, applied by `bundle.css`). The Typography card (Foundations) has a Desktop / Mobile toggle that shows every style at both sizes.

- **Wix Madefor Text** (`font-heading`) for display, headings, titles, tags, eyebrows, stats and button labels. **IBM Plex Sans** (`font-body`) for paragraphs, labels and quotes. Gotham (`font-brand`) is a legacy brand face, not used on the web; its font files aren't in this system.
- **Display** `display-xl` 64 / `display-lg` 56, Bold, −3%, line height 1 — hero banners and large section headings (36 on mobile).
- **Headings** `h1` 44 Bold, `h2` 38, `h3` 24, `h4` 20, `h5` 18 SemiBold; −2% letter spacing to h3, −1% below. Title Case.
- **Paragraphs** `paragraph-lg` 24, `paragraph-md` 18 (hero body), `paragraph-rg` 16 (standard body, input text, dates, roles, company names), `paragraph-sm` 14 (supporting), `paragraph-xs` 12 (fine print); line height 1.3, −1%; Regular, with Medium or SemiBold for emphasis.
- **Titles** `title-md` 20 / `title-rg` 18 / `title-sm` 16 SemiBold for authors and profile names.
- **Tags** `tag-md` 18 Medium (text tags), `tag-rg` 16 Medium (flags), `tag-sm` 14 Bold (badges), `tag-xs` 12 Bold (small badges); badges are uppercase.
- **Eyebrows** `eyebrow-xl` 22 (above display text; Title Case, no letter spacing), `eyebrow-lg` 18 / `eyebrow-md` 16 (above headings, card headings), `eyebrow-sm` 14 / `eyebrow-xs` 12 (nav menu, card headings). SemiBold; all but xl are uppercase with +5% letter spacing; `text-accent-primary` on light grounds.
- **Letter spacing:** given in percent of the font size, as Figma gives it: −3% display and large quotes, −2% h1 to h3, −1% body, labels and small headings, −0.5% buttons and stats, +5% uppercase eyebrows and badges. In CSS write the percent value (`letter-spacing: -1%`) after the same value in em (`-0.01em`), which older browsers still need; `bundle.css` does this throughout.
- **Weight classes.** A style has one default weight; these may also use the others listed, as classes named style-weight (`paragraph-rg-500`): paragraphs 400, 500, 600 at every size; `tag-md` 500, 600; `tag-rg` 500, 600, 700; `tag-sm` and `tag-xs` 600, 700; `eyebrow-xl` and `eyebrow-lg` 600, 700; `label` 400, 600. No other weights.
- **Weights:** Regular (400) for paragraphs, long-form and supporting text, and field text and placeholders; Medium (500) for UI labels, flags, dates and times; SemiBold (600) for links (breadcrumb links included; the current page is Regular), button text, inline emphasis, names and eyebrows; Bold (700) for display, h1, stats and small tags.
- **Label** 16 (text tied to UI elements); **quotes** `quote-lg` 32 / `quote-md` 24 (standalone), `quote-sm` 20 (testimonial cards); **stats** `stat-lg` 86 (up to three in a row) and `stat-md` 64 (four in a row); **button label** 16 SemiBold, −0.5%.
