# Hyperlink

**Status:** Ready

Inline hyperlink for body copy, from the Figma Links sheet: a subtle, underlined navigational link.

**Provide:** the linked words as children and `href`. `arrow` adds an arrow that appears on hover (Figma `hyperlink-arrow-hover`).

- Color `hyperlink-default` (#1C76C8, 4.69:1 on white), `hyperlink-hover` and `hyperlink-active` (Cobalt) on hover and press.
- Always underlined, 1px, offset 3px so descenders stay clear of the line. SemiBold (600), per the Figma type sheet; takes the surrounding paragraph's font and size.
- Use inside articles, blogs and source citations. For calls to action use TextLink or Button.
- **Arrow:** `arrow` shows a 16px arrow (icon size `sm`) on hover; `arrow="always"` keeps it in view, for a link that leaves the page or closes a paragraph.
- **Disabled:** `disabled` draws the link at 50% opacity with a not-allowed cursor, takes it out of the tab order and tells screen readers it is unavailable. Prefer removing a link that goes nowhere; use disabled only when the reader should know it is coming.
- **Inverted:** `tone="inverted"` draws the link white for dark or blue grounds. It stays underlined; the underline thickens to 2px on hover.
- **Names:** `hyperlink-{state}` and `hyperlink-inverted-{state}`, with `hyperlink-arrow-hover` for the arrow. The preview lists each with its tokens.
- **Writing links:** link the words that say where the link goes, never "click here" or "read more"; keep URLs short and clean, without tracking strings; no icons inside a wrapping paragraph. See the Buttons and links guide.
