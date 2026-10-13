# NavBanner

The event promotion bar from the Figma Navigation page ("Event"): one line above the navigation announcing an event, with a link and a close button.

**Provide:** `title` ("Join your peers at ROCon"), optionally `meta` (the date and place, e.g. `['November 18-20', 'Mumbai']`) and `cta` (`{ label, href }`).

- 52px tall, full width, on the blue gradient (`blue-gradient-end` to `blue-gradient-start` and back). All text is `text-inverted`.
- Title in Wix Madefor Text Medium 16px; the date and place in Medium 18px, separated by "|"; 36px; then an inverted TextLink with an arrow.
- The copy is centred. A 24px cross sits 36px from the right edge and dismisses the bar; `dismissible={false}` hides it and `onClose` tells you when it was closed.
- **Shape:** the banner and the navigation run edge to edge with square corners. Neither is ever drawn as a rounded card.
- Use it for event promotion only, one at a time, placed directly above Nav.
- On narrow screens the copy wraps and aligns left; Figma has no tablet or mobile design for this yet.
- In Figma the navigation under the banner is an older mock (grey labels, a "Try Now" button); the standard Nav is used here.
