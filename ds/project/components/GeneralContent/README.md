# GeneralContent

**Status:** Ready

The general content module from the Figma General Content Modules page (Ready for Dev): copy beside an image or video, a full-width image or video, or a banner with the copy over the media.

**Provide:** `layout`, `media`, and for the copy `eyebrow`, `title`, `body`, `actions`.

| Layout | Figma name | What it shows |
|---|---|---|
| `media-right` (default) | Split Media Right | Copy on the left, image or video on the right |
| `media-left` | Split Media Left | The same, mirrored |
| `full` | Full width media / video | The media alone, across the column |
| `banner` | Full width … Type overlay | Heading, one paragraph and a Button over the media |

`media` is `{ src, alt }` for an image or `{ video, poster }` for a video; leave it empty to get the gray placeholder.

**Split**

- Two equal columns, 48px apart, aligned to the top. Images are 8:5 and videos 16:9, `radius-lg`.
- **Copy:** eyebrow in `eyebrow-lg` (`text-secondary`), 12px, the heading in `h2` (SemiBold 38px), 12px, the body in `paragraph-rg`, 32px, the actions.
- **Actions**, 8px apart, in any of the four Figma sets: a primary Button; primary and secondary; primary and a TextLink (`tone="neutral"`, with the arrow); or the TextLink alone.

**Full width**

- An image at 60:23 (1440 × 552 at full width) or a video at 16:9, `radius-lg`.

**Banner**

- A `radius-lg` panel, 230px tall at least, 24px padding. The copy is 600px wide at most: heading in `h2`, 12px, the body, 24px, one primary Button, all in `text-inverted`.
- A photo gets black at 50% over it. With no picture the panel is Asphalt.
- A video banner adds the play button in the space right of the copy. If `media.video` is a file address, pressing play swaps the banner for the video player; otherwise handle `media.onPlay`.

**Tablet (under 1024px):** the split stacks, media first, 20px apart.

**Mobile (under 768px):** 24px × 20px padding; images 67:50, videos 16:9; eyebrow 16px, heading 24px (`h2` on mobile); buttons stack full width with the TextLink centered under them. Banners get 16px padding and the play button moves to the bottom right corner.

Notes:

- Figma draws the split at 1200px wide in the component and at 1140px in the page layouts; it uses the content column like the other modules.
- In the video banner Figma centers the play button on the panel, where it covers the end of the paragraph; it is moved clear of the copy.
- The Figma usage notes are still placeholders ("Used for…", "Image max width: 560px").
