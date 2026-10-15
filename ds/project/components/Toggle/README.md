# Toggle


From the Figma Inputs sheet: an on/off switch for settings that take effect at once.

**Provide:** `label`, and `checked` + `onChange` (or `defaultChecked`).

- Track 44 × 24px, fully rounded. Off: `surface-neutral-400` (Ash). On: `qualys-blue`. A 20px white knob slides 20px in 200ms.
- Label 14px `text-primary`, `spacing-xs` (12px) from the track.
- Exposed as `role="switch"`; keyboard focus shows `focus-ring`. Disabled: 75% opacity (the faded toggle in Figma).
- Use a Checkbox instead when the choice only applies after a form is submitted.
