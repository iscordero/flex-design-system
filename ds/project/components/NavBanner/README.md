# NavBanner


The event promotion bar from the Figma Navigation page ("Event"): one line above the navigation announcing an event, with a link and a close button.

**Provide:** `title` ("Join your peers at ROCon"), optionally `meta` (the date and place, e.g. `['November 18-20', 'Mumbai']`) and `cta` (`{ label, href }`).

- 52px tall, full width, on the blue gradient (`blue-gradient-end` to `blue-gradient-start` and back). All text is `text-inverted`.
- **One text size:** title, date and place in Wix Madefor Text Medium 16px, the title, date and place separated by "|"; 24px; then an inverted TextLink with an arrow, SemiBold 16px. Everything sits on one baseline. (Figma draws the date and place at 18px; one size reads cleaner on a single line.)
- The copy is centered. A 24px cross sits 36px from the right edge and dismisses the bar; `dismissible={false}` hides it and `onClose` tells you when it was closed.
- **Shape:** the banner and the navigation run edge to edge with square corners. Neither is ever drawn as a rounded card.
- Use it for event promotion only, one at a time, placed directly above Nav.
- On narrow screens the copy wraps and aligns left; Figma has no tablet or mobile design for this yet.
- In Figma the navigation under the banner is an older mock (gray labels, a "Try Now" button); the standard Nav is used here.
