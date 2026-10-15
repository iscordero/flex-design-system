# StatCard

**Status:** Ready

One figure from the Figma Stats page: a feature icon, a large number with its unit, a short label and one line of description.

**Provide:** `value` and `label`; optionally `suffix` ("%", "x") or `prefix` ("#"), `icon` (a Feature Icon), `description`, `tone` and `size`.

- **Tone:** `solid` (default) is `qualys-blue` with white figures and a `misty-blue` description; `outline` is a 1px `qualys-blue` outline with blue figures and a `text-secondary` description.
- **Large (`lg`, three in a row):** 36px padding. The number is `stat-lg` (Bold 86px) with its unit at 48px on the same baseline; the label is Wix Madefor Text Medium 38px; the description is `paragraph-rg`, 16px below.
- **Medium (`md`, four in a row):** 16px top and 24px side and bottom padding. Number `stat-md` (64px) with a 38px unit; label Medium 24px.
- **Icon:** a Feature Icon in a 56px box, 8px above the number.
- `radius-lg`. Cards in a row share the tallest height.
- **Count up:** the number runs from 0 to its value once, when the card first scrolls into view: 1.2 seconds, easing out. The unit and label don't move. People who prefer reduced motion see the final number straight away, and so does a value that isn't one plain number ("24/7"). Screen readers get the final value only. `countUp={false}` turns it off.
- **Mobile (inside Stats):** 24px padding; the number and its unit are both 48px (38px and 36px in medium); the label is 24px (20px in medium).

Use Stats to lay out three or four of these with the right gaps and mobile sizes.

Content, from the Figma usage notes:

- Lead with the metric, then an action verb and the value: "150% Faster Detection". Keep the label and description under 120 characters together.
- Three in a row suits impact figures: reductions, time saved, efficiency gains. Four in a row suits mixed figures: counts, capabilities, rankings.

Watch out:

- White on `qualys-blue` is 3.8:1, which is enough for the large number and label but not for small text. Keep the description short and never put anything essential only there.
