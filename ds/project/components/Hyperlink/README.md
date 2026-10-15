# Hyperlink


Inline hyperlink for body copy, from the Figma Links sheet: a subtle, underlined navigational link.

**Provide:** the linked words as children and `href`.

- Color `hyperlink-default` (#1C76C8, 4.69:1 on white), `hyperlink-hover` and `hyperlink-active` (Cobalt) on hover and press.
- Always underlined, 1px, offset 3px so descenders stay clear of the line. SemiBold (600), per the Figma type sheet; takes the surrounding paragraph's font and size.
- Use inside articles, blogs and source citations. For calls to action use TextLink or Button.
- **No arrow:** a link in body copy never carries an arrow, on hover or otherwise. A link that needs an arrow stands on its own line as a TextLink.
- **Disabled:** `disabled` draws the link at 50% opacity with a not-allowed cursor, takes it out of the tab order and tells screen readers it is unavailable. Prefer removing a link that goes nowhere; use disabled only when the reader should know it is coming.
- **Inverted:** `tone="inverted"` draws the link white for dark or blue grounds. It stays underlined; the underline thickens to 2px on hover.
- **Names:** `hyperlink-{state}` and `hyperlink-inverted-{state}`. The preview lists each with its tokens.
- **Writing links:** link the words that say where the link goes, never "click here" or "read more"; keep URLs short and clean, without tracking strings; no icons inside a wrapping paragraph. See the Buttons and links guide.
