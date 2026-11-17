# Typography


Every type style in one place, with a Desktop / Mobile toggle that sets each sample at the size it takes on that screen.

**Provide:** nothing; the card reads the type styles from the tokens and the mobile sizes from `bundle.css`, so it updates when either changes.

- Desktop shows each style class (`h1`, `paragraph-lg` …) at full size. Mobile applies the sizes `bundle.css` sets under 768px and narrows the samples to a phone's 335px content width.
- Each row lists size, line height, letter spacing (in percent) and weight as they render; in Mobile, any value that changes also shows its desktop value.
- On live pages the same classes switch to their mobile size at 768px by themselves; there is nothing to pick by hand.
- Eyebrows (except `eyebrow-xl`) and the small tags are shown in capitals, as in the Figma type sheet.
- **Trademark (TM):** a last section shows `<sup class="q-tm">TM</sup>` after a sample in each display, heading and paragraph style, with the text size, the TM size and the ratio read back from the page. TM is 50% of headings, display text and stats, 60% of body text (8px at least), with its top on the text's cap height. See the Typography guide.
