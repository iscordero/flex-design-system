# Avatar

**Status:** Ready

The avatar from the Figma Avatars page: a person's photo, or the default silhouette when there is none.

**Provide:** `image` and `size` (`sm`, `md` or `lg`); add `alt` with the person's name only when the avatar stands alone. Beside a written name, leave `alt` out so the name isn't read twice.

| Size | Shape | Use it for |
| --- | --- | --- |
| Small, 40px | Circle | Event, standard and testimonial cards, compact lists, tables, drawers and accordions |
| Medium, 56px | Circle | Figma leaves this usage blank; use it where 40px reads too small, such as an author line |
| Large, 300px | Square, `radius-md` | Featured speakers and profile cards |

- **Shape follows size:** circles are for small, inline avatars; the square is for large, profile contexts (over 56px). Never mix shapes at the same size. The default avatar takes the same shape.
- **Default avatar:** an `avatar-bg` ground with the `avatar-icon` silhouette (15px, 24px and 80px wide). It shows when no photo was uploaded, the data is missing or anonymised, the image fails to load, or it was removed. Never show a broken-image icon, and always keep the space reserved.
- **Cropping:** square photos keep the face at 60 to 70% of the frame (never over 80% or under 50%). Circular photos keep the face centered with no features cut off.
- **Backgrounds:** clean, simple and professional. Solid colors, subtle gradients, a soft-focus office or a neutral indoor setting are fine. Avoid busy patterns, high contrast, distracting elements, uneven lighting and heavy shadows.
- **Use avatars** for authors, review and testimonial quotes, user, team and member lists, and speaker profiles and bios: wherever a person speaks, acts or contributes.
- **Don't** use avatars as decoration, mix crops or shapes in one list, use random colors for the default, or leave a blank space where a photo is missing. Keep the spacing between avatars equal.
- **Profile text beside an avatar, the same everywhere** (cards, drawers, hover cards, profile cards and the modal): the name in `title-sm` (Wix Madefor Text SemiBold 16px, line height 1.3, `text-primary`); 4px; the role in `paragraph-rg` (IBM Plex Sans Regular 16px, `text-secondary`); the company in the same style at Medium (500), or as its logo. Never set a person's name larger than 16px.
- Avatars that link to nothing keep the default cursor and have no hover state.
- Figma's usage note lists an Extra Large (320px) size for keynote speakers, but none is drawn and an earlier review ruled out extra-large avatars, so there is no `xl`. The note also gives #D9CFC1 and #888888 for the default avatar; the drawn avatars use `avatar-bg` (#E6DDCB) and `avatar-icon` (#A6A094), which is what this uses.
