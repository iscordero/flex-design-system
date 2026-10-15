# IntegrationCard


The Integration card from the Figma Cards page: a partner integration with its thumbnail and name (or its logo) above a short list of labeled facts.

**Provide:** `name`, and either `image` (a square thumbnail) or `logo` (a wide logo, which replaces the thumbnail and name). Then `type`, `worksWith` (a list), `dataFetched` and `category`; `href` makes the card a link. `maxTags` sets how many "works with" tags show (default 2); `labels` renames the four labels.

- **Shell:** White, `radius-lg`, `shadow-card`, 16px padding. With `href` the whole card is the link: on hover a 6px `qualys-blue` bar slides in along the bottom edge and the arrow nudges forward; the shadow does not change. 260px wide in the Figma frames.
- **Top:** 56px thumbnail with `radius-md` (the `avatar-bg` tile shows until an image loads), 16px, then the name in SemiBold 18px. The logo variant shows the logo at 37px tall instead.
- **Rule:** 1px `stroke-neutral-400`, 16px above and below.
- **Facts:** label in SemiBold 12px uppercase, +5%, `text-secondary`; 4px; value in IBM Plex Sans Medium 16px `text-primary`. 20px between facts, in this order: Type, Works With, Data Fetched, Category.
- **Works With:** small outline badges, 8px apart; tags past `maxTags` fold into a "+N" badge.
- Figma's usage note for this card repeats the Standard card's; the layout rules there (stack on mobile, load more past eight) apply here too.
