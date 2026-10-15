# Typography

**Status:** Ready

Every type style in one place, with a Desktop / Mobile toggle that sets each sample at the size it takes on that screen.

**Provide:** nothing; the card reads the type styles from the tokens and the mobile sizes from `bundle.css`, so it updates when either changes.

- Desktop shows each style class (`h1`, `paragraph-lg` …) at full size. Mobile applies the sizes `bundle.css` sets under 768px and narrows the samples to a phone's 335px content width.
- Each row lists size, line height, letter spacing (in percent) and weight as they render; in Mobile, any value that changes also shows its desktop value.
- On live pages the same classes switch to their mobile size at 768px by themselves; there is nothing to pick by hand.
- Eyebrows (except `eyebrow-xl`) and the small tags are shown in capitals, as in the Figma type sheet.
