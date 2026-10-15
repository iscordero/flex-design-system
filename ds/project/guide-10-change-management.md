# Change Management

How Flex stays accurate without a dedicated team: who can change what, how a change is checked and published, how new collaborators get started, and how to set up the files. Read it before your first change.

## How Flex is run

### Principles

- **Flex is the source of truth.** The live site ([flex-design-system.pages.dev](https://flex-design-system.pages.dev)) shows the design system as it is. Designs start here, and developers build from here.
- **Everyone shares it.** There is no design system team and no single owner. Whoever needs a change makes it, and someone else checks it.
- **One place to edit.** The site is generated from the design system files. Change the files, then publish; never edit the site by hand.
- **Nothing lives outside it.** Anything built for qualys.com without Flex is added back, so the next person finds it here.
- **Small and often.** Change one component or one rule at a time, with its status set, rather than saving changes up.

### Roles

Roles are hats, not job titles. One person can wear several, except that the reviewer should not be the author when someone else is available.

| Role | Who | What they do |
| --- | --- | --- |
| Contributor | Anyone designing or building pages | Proposes and makes changes; sets the component to In review |
| Reviewer | Any other contributor | Checks the change against the checklist; sets it to Ready |
| Publisher | Anyone with access to the repository | Publishes the site (one command, then a push) |
| Developer | Whoever builds qualys.com pages | Builds only what is Ready; flags differences as Needs fixes |

Claude, in the Qualys Design System project, can do most of the editing, checking and publishing when asked. It still needs a person to decide, review and push.

### Statuses

Each component's README starts with one status line, and the site shows it on the component's card, in the side menu and on the All page:

`**Status:** Needs fixes — the link wraps under the icon on mobile`

| Status | Set by | When | Next step |
| --- | --- | --- | --- |
| In review | The contributor | A component is added or changed | A reviewer checks it |
| Ready | The reviewer | The checklist passes | None: safe to build |
| Needs fixes | Anyone | A problem is found, in design or on the live site | A contributor fixes it and sets In review |
| Deprecated | A contributor, agreed with whoever uses it | A component is being replaced | Remove it once no page uses it |

- Guidelines and tokens have no status: they change with the components that use them and are checked with them.
- A component with no status line counts as Ready.
- If nobody else can review within a week, the author may check their own change against the checklist and say so in the reason (`Ready — self-checked`).

## Making a change

### Steps

1. **Check Flex first.** Search the site for what you need (try what it does: "dropdown", "badge", "banner"). Reuse or extend before adding something new.
2. **Make the change** in the design system files (see Updating this document), or ask Claude to make it.
3. **Set the status** of every component you touched to In review, with a few words on what changed.
4. **Check it** in the component's card and the Example page at desktop, tablet and mobile widths.
5. **Publish** the design system and the site.
6. **Ask for a review.** The reviewer runs the checklist and sets Ready, or Needs fixes with a reason.

### Review checklist

- Uses tokens only: no new colors, sizes, spacing or shadows without a token.
- Works at every width: 1440, 1024, 768 and 375px, with no text overflowing or breaking badly.
- States are drawn and documented: hover, focus, active, disabled and error where they apply.
- Keyboard and screen reader: it can be reached and used with the keyboard, focus is visible, and it has the right labels.
- Contrast is checked, and any shortfall is noted in the README.
- The README covers what to provide, sizes, states, mobile, accessibility and the status.
- The preview shows the main variants and the mobile version.
- Copy follows the Content guide, in American English.
- The Example page still looks right, and the tests pass (see Setup).

### Adding back something built outside Flex

When a page on qualys.com has something Flex doesn't (a new layout, a variant, a one-off color):

1. Screenshot it on the live page and note the URL.
2. Decide what it is: a variant of an existing component, a new component, or a one-off that shouldn't be repeated.
3. Variant or new component: add it to Flex as In review, built from existing tokens. If it needs a new token, add the token with a usage note.
4. One-off: add it to the closest component's README under "Don't" or "Notes", so it isn't copied.
5. Once it is Ready, the page should use the Flex version the next time it is edited.

### Deprecating and removing

- Mark the component Deprecated, with what to use instead.
- When a name changes, keep the old name working as an alias (as the Tag colors and the Marker's `blue` tone do) until no page uses it.
- Remove the component, its README, preview and family entry once no page uses it.

## Updating this document

### Where things live

All paths are in the repository `flex-design-system`.

| To change | Edit | Then |
| --- | --- | --- |
| The overview | `ds/project/README.md` | Publish |
| A guideline | `ds/project/guide-N-name.md` (diagrams: `ds/overview/parts/`) | Publish |
| A token | `ds/project/tokens.json`: name, value and a usage note | Rebuild the test pages, publish |
| A component's look | `ds/project/components/bundle.css` | Check the previews, publish |
| A component's behavior or props | `ds/bundle.src.js` and `ds/project/components/index.d.ts` | Rebuild the bundle, run the tests, publish |
| A component's documentation | `ds/project/components/Name/README.md` | Publish |
| A component's preview | `ds/project/components/Name/preview.html` | Update its height, publish |
| A new component | All of the above, plus its place in `families.json`, and its name in the component list at the top and the exports at the end of `ds/bundle.src.js` | Rebuild, test, publish |
| Icons, logos and images | `ds/project/assets/Group/` and that group's `README.md` | Publish |
| A status | The status line at the top of the README | Publish |

### Writing for this document

- Plain language, American English, short sentences. Say what to do, then why, in that order.
- Name tokens and props in code style (`qualys-blue`, `size="sm"`), and give sizes in px.
- Every component README follows the same order: what it is, what to provide, sizes and spacing, states, mobile, content, do and don't, accessibility, notes.
- Record where Flex differs from an older design under Notes, so nobody "fixes" it back.

### Publishing

A change is live when both copies are updated: the design system artifact in Claude and the website.

- **With Claude:** ask it to "publish". It updates the design system artifact, rebuilds the site, and commits the change to your copy of the repository. You then push (below).
- **By hand:** run `./publish.sh` from the repository folder, then commit and push.

```sh
cd ~/Documents/flex-design-system
./publish.sh                      # rebuilds site/index.html and site/example.html
git add -A && git commit -m "What changed"
git push                          # the site updates within a minute
```

Write the commit message as the change log: what changed and which components it touched. The site's "Last updated" date comes from the publish.

## Onboarding

### Everyone

1. Read the Overview, then Content, Color and Typography.
2. Open the Example page and switch between device sizes.
3. Try the search, and open the All page to see what is Ready.

### Designers

- Design pages from Flex components; start from the Example page's modules.
- Need something Flex doesn't have? Add it to Flex as In review first, then use it in the page design.
- Share designs as links to Flex components and the Example page, with notes on content.

### Developers

- Build only Ready components. Each card's README gives what to provide, sizes, states and mobile behavior; `index.d.ts` gives the props.
- The components ship as `components/bundle.js` (React 18, `window.Qualys`) and `components/bundle.css`, with the tokens as CSS variables.
- If the live site and Flex disagree, Flex is right. Fix the page, or set the component to Needs fixes with what you found.

### Content writers

- Follow the Content guide; READMEs give each component's character limits.
- Tags label and never ask (no "Learn", "Discover"); buttons start with a verb.

### Adding a collaborator

- Give them access to the GitHub repository and the Qualys Design System project in Claude.
- Send them the site link and this guide.
- Pair on their first change: they make it, you review it.

## Setup

### What you need

- A GitHub account with access to the `flex-design-system` repository.
- Git, and Python 3 with the `markdown` and `Pillow` packages, to build the site.
- Node.js 18 or later with Playwright, to run the tests and redraw guideline diagrams (optional for text-only changes).

### Get the files

```sh
git clone https://github.com/iscordero/flex-design-system.git
cd flex-design-system
python3 -m pip install markdown pillow
./publish.sh                      # builds the site into site/
open site/index.html              # look at it locally
```

### Build and test

Run these from the `ds` folder after changing components:

```sh
python3 build_bundle.py bundle.src.js icons-figma.json project/components/bundle.js
python3 test/build.py $(pwd)      # builds the test pages
cd test && node regress.js        # checks every preview renders
node heights.js Name              # updates a preview's height after you change it
```

### Hosting

The site is hosted on Cloudflare Pages, connected to the repository. There is no build step: Pages serves the `site/` folder as it is, so a push publishes. Settings: framework preset None, build command empty, output directory `site`. The site is kept out of search engines (`noindex` and `robots.txt`).

## Keeping it healthy

Once a month, or before a big launch, spend 15 minutes:

- Open the All page's Status list. Review anything In review, and fix or re-date anything that has needed fixes for more than two weeks.
- Compare one live qualys.com page with Flex, and add back anything missing.
- Publish if anything changed.
