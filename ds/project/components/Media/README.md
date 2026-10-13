# Media

The image or video slot the block modules share: Hero, GeneralContent, TabModule, AccordionModule and CtaModule all take a `media` prop and draw it with this.

**Provide:** `src` and `alt` for an image; `video` and `poster` for a video. With neither it shows the Figma placeholder.

- `radius-lg`, and the picture always covers the box. Set the shape with `ratio` (for example `"16 / 9"`); inside a module the module sets it.
- **Video:** the poster with a 64px white play button, its triangle in Asphalt. If `video` is a file address, pressing play swaps the poster for the player with its controls. Pass `video={true}` and handle `onPlay` to open a modal instead.
- **Placeholder:** `surface-neutral-400` with the image glyph in Rhino; a video placeholder is Asphalt.
- Give the play button a name with `playLabel` when "Play video" isn't specific enough.
- Write `alt` text that says what the picture shows; leave it empty for decoration.
