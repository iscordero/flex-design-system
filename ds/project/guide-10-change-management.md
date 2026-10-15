# Change Management

How to look after Flex: where it lives, how to get set up, how to work with Claude to change it, and how a change goes live. You don't need to write code; Claude does the building, and you decide, check and publish.

## Where Flex lives

| What | Where | What it's for |
| --- | --- | --- |
| The site | [flex-design-system.pages.dev](https://flex-design-system.pages.dev) | What everyone reads and builds from |
| The design system in Claude | The **Qualys Design System** project in Claude, and its "Qualys" design system | Where changes are made, with Claude's help |
| The source files | The `flex-design-system` repository on GitHub | The saved history of every change; the site is published from here |
| Images and assets | Bynder (see Media) | Approved photos, video, logos and icons |

The site, the design system in Claude and the GitHub repository always hold the same thing. Claude keeps them in step when you publish.

## Getting set up

Do this once. Ask whoever manages Flex today to give you access to the first two.

1. **Claude:** an invitation to the Qualys Design System project.
2. **GitHub:** access to the `flex-design-system` repository.
3. **Install** the Claude desktop app and GitHub Desktop.
4. **Get the files:** in GitHub Desktop, choose Clone Repository, pick `flex-design-system` and save it in your Documents folder.
5. **Connect the folder:** in the Claude desktop app, open the Qualys Design System project, start a task and add the `flex-design-system` folder, so Claude can save changes there.

That's all. Everything else is done by asking Claude.

## Working with Claude

Claude knows how Flex is built: the tokens, the components, the guides and how to publish. Talk to it as you would to a designer and developer on your team. Be specific about what and where, attach a screenshot when something looks wrong, and ask to see it before it's published.

### What to ask

| You want to | Say something like |
| --- | --- |
| Find the right part | "Which component should I use for a gated whitepaper download?" |
| Fix something | "The tag sections on the Tag page look cramped; add more space between them." (attach a screenshot) |
| Change a rule | "Change the heading limit on cards to 50 characters and update the README." |
| Add a component | "Add a Pricing Card: plan name, price, a list of features with checks and a primary button. Use our tokens, write its README and preview with desktop and mobile, and put it with the Cards." |
| Try out ideas | "Show me three versions of a stats banner on the Example page as drafts. Don't publish." |
| Pick an idea | "Go with version B, clean it up and publish." |
| Check something | "Does anything on the site use a color that isn't a token?" |
| Publish | "Publish." |

### Experimenting safely

- Ask for **drafts**. Claude shows them to you without touching the site.
- Compare options side by side on the Example page or a component's card, at desktop and mobile widths.
- Nothing reaches the site until you say "publish".

### Publishing

1. Say **"Publish"** to Claude. It updates the design system, rebuilds the site and saves the change in your folder with a short description.
2. Open **GitHub Desktop** and press **Push origin**. The site updates within a minute.

## Making a change

### Before you start

- Search Flex for what you need; reuse or extend something before adding something new.
- Note why it's needed: the page, the content, a screenshot of the problem.

### Before you publish

Check the change on its card and on the Example page, at desktop and mobile widths:

- It uses Flex's colors, type and spacing, and nothing new without a reason.
- It works at every width, and no text overflows or breaks badly.
- Hover, focus and disabled states look right, and it can be used with the keyboard.
- The README says what it's for, what to provide, its sizes and how it behaves on mobile.
- The words follow the Content guide, in American English.

If you can, ask a colleague to look before you publish. A second pair of eyes catches most problems.

### Adding back something built outside Flex

When a page on qualys.com has something Flex doesn't (a new layout, a variant, a one-off color):

1. Take a screenshot and note the page.
2. Ask Claude whether it's a variant of an existing component, a new component, or a one-off that shouldn't be repeated.
3. Variant or new component: have Claude add it to Flex, built from Flex's tokens, and publish.
4. One-off: have Claude note it in the closest component's README, so it isn't copied.

### Retiring a component

Ask Claude to retire it and say what replaces it. It notes the replacement in the README, keeps the old name working until no page uses it, and removes it once it's gone from the site.

## Onboarding

### Everyone

1. Read the Overview, then Content, Color and Typography.
2. Open the Example page and switch between device sizes.
3. Use the search ("/" jumps to it) to find components, guides and tokens.

### Designers

- Design pages from Flex components; start from the Example page's modules.
- Need something Flex doesn't have? Add it to Flex first, then use it in the page.

### Developers

- Build from the component READMEs; `index.d.ts` lists every component's props.
- The components ship as `bundle.js` and `bundle.css`, with the tokens as CSS variables.
- If the live site and Flex disagree, Flex is right. Fix the page, or report the difference.

### Content writers

- Follow the Content guide; READMEs give each component's character limits.
- Tags label and never ask (no "Learn", "Discover"); buttons start with a verb.

### Adding a collaborator

- Give them access to the Claude project and the GitHub repository, and send them this page.
- Pair on their first change: they ask Claude and publish, you look it over.

## Keeping it healthy

Once a month, or before a big launch, spend 15 minutes:

- Look through the recent changes in GitHub Desktop's History for anything unexpected.
- Compare one live qualys.com page with Flex, and add back anything missing.
- Check the Notes in the components you used most for problems that are still open.
