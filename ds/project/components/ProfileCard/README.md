# ProfileCard


The profile card from the Figma Avatars page: a large square photo with a profile-link chip, the name, the designation and the company logo. With a bio, hovering shows "Read Bio" and a click opens the ProfileModal.

**Provide:** `name`; optionally `designation`, `image`, `logo`, `link` (`{ href, network }`) and `onOpen`. For a row of people, use ProfileGrid, which wires up the modal for you.

- **Card:** `surface-neutral-300` (Ecru), `radius-lg`, no shadow. Padding 24px on desktop, 16px on tablet and mobile.
- **Photo:** full card width, 300px tall (303 × 287 on mobile), `radius-md`. Without a photo, or if it fails to load, the default avatar shows (see Avatar for cropping and background rules).
- **Chip:** a SocialButton (52px, `radius-rg`, `icon-bg-default`) 16px in from the photo's top right corner; it opens the person's profile in a new tab. It shows the LinkedIn glyph by default; `link.network` switches it to `x`, `facebook`, `instagram` or `url`. Screen readers hear "Jonathan Doe on LinkedIn".
- **Text:** 16px under the photo, the profile text used everywhere: the name in `title-sm` (Wix Madefor Text SemiBold 16px, line height 1.3), the role in `paragraph-rg` `text-secondary`, 4px under it (see Avatar); 20px; the logo at 40px tall.
- **Interactive** (`onOpen` set): hover or keyboard focus covers the photo with `charcoal` at 85% and an outlined white "Read Bio" button; clicking anywhere on the card calls `onOpen`. The chip stays a separate link. Change the wording with `bioLabel`.
- **Not interactive** (no `onOpen`): default cursor, no hover effect.
- `bare` drops the card ground and padding; ProfileGrid uses it for the combined container.
- Figma's "Read Bio" button measures about 111 × 54px; this uses the system's large inverted secondary Button (50px tall).
