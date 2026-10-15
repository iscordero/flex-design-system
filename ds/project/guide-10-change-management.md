# Change Management

How to look after Flex: where it is kept, how to get set up, how to work with an AI agent to change it, and how a change is previewed, approved and published. You don't need to write code or learn commands: the agent does the building, and you decide, check and approve.

## Where Flex lives

Flex is kept in one place, a GitHub repository. Everything else is made from it.

| What | Where | What it's for |
| --- | --- | --- |
| The source | [github.com/iscordero/flex-design-system](https://github.com/iscordero/flex-design-system) | The single source of truth: tokens, guides, components and the full history of every change |
| The site | [flex-design-system.pages.dev](https://flex-design-system.pages.dev) | What everyone reads and builds from. It updates by itself when a change is published to the repository |
| Preview links | `<change-name>.flex-design-system.pages.dev` | A copy of the site for each change that isn't published yet, to share for approval |
| Change Log | The **Change Log** page on the site, under Start | The important published changes (components, colors, logos, guides): who made them, who approved them, with before and after pictures |
| Images and assets | Bynder (see Media) | Approved photos, video, logos and icons |
| Claude project (optional) | A shared **Qualys Design System** project in the company's Claude account | A ready-made workspace for designers who use Claude, with Flex built in. See Setting up Claude for the team |

Because the repository is the source, anyone can work on Flex with the AI agent they prefer. The agent reads the repository's instructions (`AGENTS.md`), so it knows how Flex is built and what rules to follow.

If your team uses Claude, it can also keep a copy of Flex in a shared Claude project, so Claude designs pages with Flex's components. That copy is refreshed from the repository, so if the two ever differ, the repository is right.

## Getting set up

You need two things:

1. **Access to the repository.** Ask whoever manages Flex today to add your GitHub account to `flex-design-system`.
2. **An AI agent that can work with files and GitHub.** Use the one you already have, for example Claude (Cowork or Claude Code), ChatGPT Codex, Cursor, GitHub Copilot, Gemini CLI or Windsurf. Connect it to your GitHub account in its settings, or sign in when it asks.

Then copy this prompt into your agent:

```
Set me up to work on the Flex Design System.
1. Get the repository https://github.com/iscordero/flex-design-system and save it in my Documents folder. If it's already there, get the latest version instead.
2. Read AGENTS.md and README.md, and follow them whenever we work on Flex.
3. Install whatever the build and checks need.
4. Build the site and open site/index.html so I can see it works.
Explain what you did in plain language, and tell me if there's anything I need to do myself.
```

That's all. You don't need to install anything else yourself. GitHub Desktop is optional: some people like it for seeing changes, but the agent can do everything without it.

If your team has the shared Claude project, join it and start your tasks there instead: its instructions already point Claude to Flex.

### Setting up the repository

Done once, by whoever manages the repository on GitHub, so the Change Log can write itself:

1. In the repository's **Settings → Actions → General**, allow actions, and under **Workflow permissions** choose **Read and write permissions**.
2. If `main` is protected, allow GitHub Actions to push to it.
3. In Cloudflare Pages, check that preview deployments are on for all branches (**Settings → Builds → Branch control**).

### Setting up Claude for the team

Optional, and done once, by whoever manages the company's Claude account. It gives designers who use Claude a shared place to work on Flex, owned by Qualys rather than by one person, so it keeps working when people change roles.

1. **Check the plan.** Projects can be shared across a company on Claude's Team and Enterprise plans.
2. **Create the project.** Name it **Qualys Design System** and share it with the designers, with permission to edit.
3. **Add the instructions.** Paste these into the project's instructions:

```instructions
This project is for working on Flex, the design system for the Qualys marketing website.
- The source of truth is the GitHub repository https://github.com/iscordero/flex-design-system. The live site is https://flex-design-system.pages.dev.
- Before working on Flex, get the latest version of the repository and follow its AGENTS.md.
- When designing pages for qualys.com, use the Flex design system in this project: its components, tokens and guidelines. If Flex doesn't have something, say so and suggest adding it to Flex first.
- Make each change on its own branch, preview it locally, share it as a pull request with its preview link, and publish only once it's approved.
- After a change is published, refresh this project's Flex design system from the repository.
- The people here are mostly designers: explain things in plain language and do any git or terminal work for them.
```

4. **Build Flex in Claude.** Start a task in the project and paste:

```
Create a design system called Flex in this project from the repository https://github.com/iscordero/flex-design-system.
Use everything in ds/project: tokens.json, README.md, the guides, each component's README.md and preview.html, and components/bundle.js, bundle.css and index.d.ts.
Then show me its components and tell me if anything didn't come across.
```

5. **Invite the designers.** Send them this page. They join the project and paste the setup prompt above.

## Working with your AI agent

Talk to the agent as you would to a designer and developer on your team. Be specific about what and where, attach a screenshot when something looks wrong, and ask to see it before it's shared or published.

### What to ask

| You want to | Say something like |
| --- | --- |
| Find the right part | "Which Flex component should I use for a gated whitepaper download?" |
| Fix something | "The tag sections on the Tag page look cramped; add more space between them." (attach a screenshot) |
| Change a rule | "Change the heading limit on cards to 50 characters and update the README." |
| Add a component | "Add a Pricing Card to Flex: plan name, price, a list of features with checks and a primary button. Use our tokens, write its README and preview with desktop and mobile, and put it with the Cards." |
| Try out ideas | "Show me three versions of a stats banner on the Example page. Keep them as drafts." |
| Pick an idea | "Go with version B, clean it up and get it ready for review." |
| Check something | "Does anything in Flex use a color that isn't a token?" |
| See what changed | "What changed in Flex this month, and who changed it?" |

These are examples, not a script. Ask in your own words, about anything in Flex.

### Prompts to copy

**Start a change**

```
I want to change Flex: [describe the change, and attach screenshots if you have them].
Get the latest version from GitHub first, then make the change on its own branch, following AGENTS.md.
Show me a preview on my computer at desktop and mobile widths. Don't publish anything.
```

**Share it for approval**

```
This change is ready for review. Run the checks, push the branch and open a pull request with a short summary, before and after screenshots and the preview link.
Give me the pull request and preview links to share.
```

**Publish after approval**

```
The change is approved. Merge the pull request into main and tell me when the live site shows it.
```

## From idea to published

Every change goes through the same four steps. Nothing reaches the live site until the last one.

### 1. Make it on its own branch

The agent makes each change on a separate copy of Flex (a branch), named after the change, such as `pricing-card`. The live site and other people's work aren't affected.

### 2. Preview it on your computer

The agent rebuilds the site on your computer and opens it in your browser (`site/index.html`, with the Example page in `site/example.html`). Check it at desktop and mobile widths. Ask for changes until it's right.

Then open the **Change Log**. Your work shows at the top under **Not published yet**: the entry it will get when it's published, with what it adds, changes or removes and before and after pictures of components that look different. Check that it lists everything you meant to change, and nothing you didn't. If something is missing or unexpected, fix the change and preview again.

### 3. Share it for approval

When you're happy, ask the agent to share it. It pushes the branch to GitHub, and two things are made for you:

- **A preview link**, such as `pricing-card.flex-design-system.pages.dev`: the whole site with your change, for anyone to click through, including its draft Change Log entry. It updates each time the agent pushes a new version.
- **A pull request** on GitHub: a page with every change, where reviewers can comment and approve. A comment summarizing the important updates, the same as the draft Change Log entry, is added to it automatically.

Send both links to your reviewer. If they can't open GitHub, the preview link is enough, or send them the `site/index.html` file: it's the whole site in one file and opens in any browser.

### 4. Publish

Once it's approved, ask the agent to merge the pull request, or press **Merge** on the pull request page in GitHub. The live site updates within a minute or two.

A few minutes later, the draft becomes a published entry in the **Change Log** by itself: a one-line summary of the important changes, who made it and who approved it. Opening the entry shows a short list of the important updates, such as new or removed components, color and logo changes and new guides, with before and after pictures of any component that looks different. Small edits, such as wording, spelling and the layout of the site itself, are left out, and something added and taken out again before publishing doesn't show at all. Nobody needs to write it.

If your agent can't push to GitHub, it will say so. You can then push with GitHub Desktop's **Push origin** button, or ask a teammate whose agent can. The Change Log adds its own updates to GitHub, so get the latest version before you push: if GitHub Desktop says your copy is behind, press **Pull origin** first.

### Before you share

Check the change in the preview, at desktop and mobile widths:

- It uses Flex's colors, type and spacing, and nothing new without a reason.
- It works at every width, and no text overflows or breaks badly.
- Hover, focus and disabled states look right, and it can be used with the keyboard.
- The README says what it's for, what to provide, its sizes and how it behaves on mobile.
- The words follow the Content guide, in American English.

## Making a change

### Before you start

- Search Flex for what you need; reuse or extend something before adding something new.
- Note why it's needed: the page, the content, a screenshot of the problem.

### Adding back something built outside Flex

When a page on qualys.com has something Flex doesn't (a new layout, a variant, a one-off color):

1. Take a screenshot and note the page.
2. Ask your agent whether it's a variant of an existing component, a new component, or a one-off that shouldn't be repeated.
3. Variant or new component: have the agent add it to Flex, built from Flex's tokens, and share it for approval.
4. One-off: have the agent note it in the closest component's README, so it isn't copied.

### Retiring a component

Ask your agent to retire it and say what replaces it. It notes the replacement in the README, keeps the old name working until no page uses it, and removes it once it's gone from the site.

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

- Add their GitHub account to the repository and send them this page. If your team uses the shared Claude project, add them to it too.
- Pair on their first change: they make it with their agent and share it, you review and approve it.

## Keeping it healthy

Once a month, or before a big launch, spend 15 minutes:

- Read the Change Log for anything unexpected.
- Close or finish pull requests that have been waiting a long time.
- Compare one live qualys.com page with Flex, and add back anything missing.
- Check the Notes in the components you used most for problems that are still open.
