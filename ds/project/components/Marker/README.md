# Marker

The marker from the Figma Tagging System: a vertical bar on the edge of a tab or menu item that marks it unread or active; it can open into a pill with a count.

**Provide:** `tone` (1, 2, 3 or `"default"`); `count` to show the open pill; `label` with the meaning in words ("88 unread") when it isn't said elsewhere.

- Closed: 6 × 36px bar in `marker-1`, `marker-2` or `marker-3`. These are the flag colours: each marker token points at `flag-tier-1`, `-2` or `-3`, so a marker and a flag of the same number always match. The left edge is flat and the two right corners are rounded `radius-xs` (4px), so it sits flush against the left edge of the item.
- **Default** (`tone="default"`, `marker-default`, which is `qualys-blue`; `tone="blue"` still works): for the active item where the three flag tiers don't apply, such as the open row in AccordionModule's list, where it slides from row to row. Added in review; Figma has three tones.
- Open: 34px tall, at least 27px wide, flat on the left with the two right corners rounded `radius-media` (8px); the count in white, 14px Medium, +5% tracking.
- **Side:** `side="left"` (the default) rounds the right corners, for a left edge; `side="right"` rounds the left corners, for a right edge.
- **Active rows:** the default (blue) marker is how every list of tabs and menu rows shows the active one, together with a Misty Blue ground. See States and Motion.
- Without `label` it is hidden from screen readers — make sure the active or unread state is also in the text or `aria-current`.
- The white count is 8.1:1 on marker 1; on marker 2 (3.54:1) and marker 3 (3.34:1) it is under 4.5:1, the same as the flags, flagged. On the default (blue) marker it is 3.78:1, also flagged. The bars themselves pass 3:1.
- Figma draws the markers in their own darker shades (#80458A, #CB5602, #2F7F7B); they use the flag colours here, as asked in review.
