# EventType

**Status:** Ready

The event-type label from the Figma Tagging System: a 24px icon and its name, for event listings and event cards.

**Provide:** `type` — `qualys`, `webinar`, `industry`, `speaking` or `training`. Children override the label only if the wording must change.

| type | Label | Icon color |
| --- | --- | --- |
| `qualys` | Qualys Event | `event-qualys` (Qualys Red, the shield) |
| `webinar` | Webinar | `event-webinar` (Qualys Blue) |
| `industry` | Industry Event | `event-industry` (Charcoal) |
| `speaking` | Speaking Engagement | `event-speaking` (#6C49D1) |
| `training` | Training | `event-training` (Asphalt) |

- Label Wix Madefor Text SemiBold 16px, line height 1.1, −1%, `text-primary`; 6px after the icon (4px for Qualys Event), as in Figma.
- Icons are copied from the Figma components: `event-*` in the Icon component and the Event Icons group.
- Use the type's own label and icon together; don't recolor the icons.
- The `event-*` tokens reuse palette colors (only Speaking Engagement has its own), and EventCalendar colors its bars and legend with the same tokens, so a type looks the same everywhere.
