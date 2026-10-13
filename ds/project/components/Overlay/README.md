# Overlay

The backdrop behind a modal, from the Figma Modals, Popups & Tooltips file. Every modal in this system draws its own, so you only need this one when you build a new kind of layer.

**Provide:** nothing for the default. `tone="dark"` for the stronger one; `onClick` to hear a press on the backdrop itself; `inline` to keep it inside a positioned box instead of covering the screen.

- **Light:** black at 25% (`overlay-light`), the default. **Dark:** black at 50% (`overlay-dark`), for a busy page or media behind.
- Fixed to the viewport at `z-overlay`; fades in over 200ms, with no motion under reduced-motion settings.
- The page behind stays visible but out of reach: it doesn't scroll and can't be clicked.
- Empty, it is hidden from assistive technology.
- Figma's layout frames use Charcoal at 25% instead of black; this follows the Overlay component itself.
- ProfileModal and FilterDrawer were drawn earlier with a 70% backdrop and keep it for now.
