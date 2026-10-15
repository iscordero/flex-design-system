# Flag

**Status:** Ready

The flag-style tag from the Figma Tagging System: a high-priority notice or promotion anchored to a container edge — "Upcoming", "New" or "Featured".

**Provide:** a word or two as children and a `tone`. Position it yourself, flush with the top left corner of the card or image (`position: absolute; left: 0; top: 0`).

- Shape: top-left and bottom-right corners `radius-rg` (10px), the other two square, so it sits in a corner.
- **Size:** large (the default) is 32px tall, 12px side padding, `tag-rg` 16px Medium; small (`size="sm"`) is 26px tall, 12px side padding, `tag-sm` 14px SemiBold, for small cards and tiles. Both have white text on `flag-tier-1` (purple), `flag-tier-2` (orange) or `flag-tier-3` (teal).
- Figma doesn't say which tier means what; keep the meaning consistent across a page.
- White on tier 2 (3.54:1) and tier 3 (3.34:1) is under 4.5:1 — kept as designed, flagged. Tier 1 passes.
