# SpeakerList


Who is speaking at a webinar, briefing or event: a round photo, the person's name and their role, for each speaker. It sits in a Hero's body, an EventBanner, a DrawerCard or any copy block.

**Provide:** `speakers` (`{ name, role, image }`) and optionally `layout`, `size`, `tone` and `label`.

| Layout | What it shows | Use it when |
|---|---|---|
| `horizontal` (default) | Speakers side by side, 24px apart, wrapping onto a new line 16px down | Two or three speakers under a paragraph |
| `vertical` | One speaker per line, 16px apart | Four or more, or a narrow column |

**Sizes**

- **Photo:** Avatar `sm` (40px, default) or `md` (56px). Without an `image`, the Avatar placeholder shows.
- **Name:** `title-sm` (Wix Madefor Text SemiBold 16px), `text-primary`.
- **Role:** `paragraph-rg` (16px), `text-secondary`, under the name.
- 10px between the photo and the text, which is centered on the photo.

**States**

- `tone="inverted"` sets the name and role in white, for a dark photo or panel.

**Mobile:** the horizontal layout wraps, so on a phone each speaker usually takes a line of their own. Long roles wrap under the name.

**Accessibility**

- A list (`ul`) named "Speakers" (`label` to change it). The photo is decoration: the name is the text.
- Keep roles short enough to read in two lines at most.

Do / Don't:

- Do use real photos from Bynder, cropped square with the face centered.
- Don't add links or bios here; a ProfileCard or ProfileModal does that.

Notes:

- First built for the PHP2Shell Emergency Briefing hero on the homepage redesign.
