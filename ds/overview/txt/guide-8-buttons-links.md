# Buttons and Links

Every button belongs to a tier, and the tier sets how much it stands out. As a rule: the tier decides priority, colour decides emphasis, and an icon adds clarity. Buttons start an action; links take the reader somewhere. The Button, TextLink and Hyperlink pages list every configuration with its name, tokens and use.

## Buttons

- **Tiers:** three tiers, from most to least important. Tier 1, primary, drives business outcomes: form fills, trials, demos and sign-ups. Tier 2, secondary, helps people explore, compare or keep learning. Tier 3, utility, covers navigation, small actions and states. A higher tier stands out more, so people take the important action first.

### Tier 1: primary (conversion)

Red filled: `primary`, or `primary-inverted` on dark and photo grounds. A darker red on hover, grey when disabled. Large or small, never next to another primary. An icon is optional and only for a universal action, such as Download or Book a Meeting.

| Label | Icon |
| --- | --- |
| Try Now | No |
| Register Now / Register | No |
| Book Now / Book a Meeting | Yes |
| Sign Up | No |
| Get a Demo / Schedule a Demo | Yes |
| Start Free Trial (in a hero too) | No |
| Speak to an Expert | Yes |
| Download | Yes |
| Join Us / Join the Event | No |
| Subscribe Now | Yes |
| Get Your Free Report | Yes |
| Read Whitepaper | Yes |
| Contact Us | Yes |
| Save | Yes |
| Request a Call / Email | Yes |

### Tier 2: secondary (supportive)

Outlined in red, blue or white, depending on the ground: `secondary`, `secondary-alt` and `secondary-inverted`. Filled on hover, grey when disabled. Usually small or large inside modules. An icon is recommended when it makes the action clearer.

| Label | Colour | Icon |
| --- | --- | --- |
| Learn More | Blue | Yes |
| Discover More | Blue | Yes |
| View All Events | Blue | Yes |
| See All Solutions | Blue | Yes |
| View Case Study | Blue | Yes |
| Watch the Video | Blue | Yes |
| Start Learning Now / Start Learning | Blue | Yes |
| Start Exam | Blue | Yes |
| Self Paced | Blue | No |
| Instructor Led | Blue | No |
| Submit | Blue | No |
| Submit a Session | Blue | Yes |
| Add to Calendar | Blue | Yes |
| Read the Report | Blue | Yes |
| Get the Guide | Blue | Yes |
| Learn How | Blue | Yes |

### Tier 3: utility (navigation, information and status)

For navigation, small actions and states that matter less. Usually a blue text link; small or large. An icon is highly recommended: it makes the action instant to read. In Flex, a text action is a blue TextLink (or a Hyperlink inside a sentence). Flex has no grey or black outlined button, so an outlined utility action uses the small blue outline (`secondary-alt`, `sm`).

| Label | Colour | Style | Hover | Icon |
| --- | --- | --- | --- | --- |
| Next | Grey or blue | Text, underlined | Darker underline | Yes |
| Previous | Grey or blue | Text, underlined | Darker underline | Yes |
| Show All | Blue | Grey outline, or text | Blue fill | No |
| FAQs / Frequently Asked Questions | Blue | Text, underlined | Blue fill | Yes |
| Sold Out | Blue | Grey fill, or disabled | Blue fill | Yes |
| Search | Blue | Text, underlined | Blue fill | Yes, by exception |
| Look for These Signs | Blue | Text, underlined | Blue fill | Yes |
| Join Waitlist | Blue | Grey outline | Blue fill | Yes, by exception |
| Login | Blue | Text, underlined | Blue fill | Yes |
| Logout | Blue | Text, underlined | Blue fill | Yes |
| Retry / Refresh | Blue | Grey outline | Blue fill | Yes |
| Apply | Grey or red | Outline | Blue fill | No, or optional |

## Do's and don'ts

- **Title Case:** use Title Case for every button label; don't mix cases.
- **Space between a pair:** 8px (`spacing-3xs`) between two buttons side by side; don't spread them apart.
- **Short labels:** keep a label under 20 characters; don't write a sentence when a few words will do.
- **One primary:** pair a primary with a secondary button or a text link, never with another primary.
- **Two at most:** no more than two buttons in one row.
- **Verbs:** start with a verb that says what happens ("View Data Sheet"); don't use a passive label or a noun ("Datasheet").
- **Hierarchy on the page:** keep the primary for the main conversion; repeated actions, such as "Read More" on a row of cards, use the secondary button or a text link.

## Mobile sizing

- **Tier 1 on mobile:** always full width: it spans its container, label centred.
- **Tier 2 on mobile:** as wide as its label, not stretched by default; centred or left-aligned, following the layout.

## Links

### Inline hyperlinks

Inline hyperlinks sit inside a sentence or paragraph. They take the reader to related reference material or another page without breaking the flow of reading. A hyperlink is blue (`hyperlink-default`), SemiBold (at least two weights heavier than the copy around it) and always underlined; it turns a darker blue on hover.

- **Underline:** don't rely on colour alone; the underline tells the link apart from the copy, including for people with colour blindness.
- **Sources:** source lines and URLs are blue and underlined, like any other link.
- **Dark grounds:** on a dark or blue ground use the inverted (white) hyperlink, still underlined.
- **Clean URLs:** when a URL is shown, keep it short; drop tracking strings and extra characters.
- **Say where it goes:** link the words that describe the destination, never "click here" or "read more"; keep arrows and icons out of a wrapping paragraph, where they upset the line height.
- **Links as navigation:** a list of links that works as navigation may show an arrow on hover.

### Text link buttons

A text link button (also called a ghost, naked or tertiary button) looks like a link but acts like a button. It stands on its own, outside a paragraph: at the foot of a card, under a section, or beside a primary button.

- **Outside the paragraph:** don't put a text link button, with its arrow, inside running copy; place it at the end of the block.
