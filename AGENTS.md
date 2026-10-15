# Instructions for AI agents working on Flex

Flex is the design system for the Qualys marketing website. This repository is its single source of truth; the site at https://flex-design-system.pages.dev is built from it. The people asking you for changes are usually designers, not developers: explain what you did in plain language, and do any git or terminal work for them rather than asking them to run commands.

Read `README.md` for the folder layout and commands, and `ds/project/guide-10-change-management.md` for the process people follow.

## How to work

1. **Start from the latest version.** Pull `main` before starting.
2. **One change, one branch.** Never commit to `main` directly. Name the branch after the change in lowercase with hyphens (for example `pricing-card`), so its preview link reads well.
3. **Make the change in the source**, never in `site/` by hand:
   - Tokens: `ds/project/tokens.json`
   - Guides and overview: `ds/project/guide-*.md`, `ds/project/README.md`
   - Components: `ds/bundle.src.js`, `ds/project/components/bundle.css`, `ds/project/components/index.d.ts`, and each component's `README.md` and `preview.html`
   - Site grouping: `families.json`; site shell: `standalone/`
4. **Rebuild and check** (commands in `README.md`): build the bundle if components changed, build the test pages, run `regress.js`, update preview heights you changed, and run the type check.
5. **Preview locally.** Run `./publish.sh`, then open `site/index.html` (and `site/example.html` for the Example page) in the browser. Show desktop and mobile widths. Iterate until the person is happy.
6. **Share for approval** when asked. Commit with a short, plain message, push the branch and open a pull request with a summary, before and after screenshots, and the preview link `https://<branch>.flex-design-system.pages.dev` (Cloudflare Pages builds it from the pushed branch). Give the person both links.
7. **Publish only when the person says it's approved.** Merge the pull request into `main`; Cloudflare updates the live site within a minute or two.

The change log writes itself (`.github/workflows/changelog.yml` and `tools/changelog.py`): it comments a summary on each pull request, and records each change that reaches `main` in `site/changes.json`, with screenshots in `site/changes/`. Give pull requests and commits a clear, plain title: it becomes the entry's summary. Never edit `site/changes.json` or `site/changes/` by hand. The job commits to `main`, so pull before pushing. `./publish.sh` also writes the draft entry for unpublished work (`site/changes-draft.json`, shown under Not published yet on the Change Log page; with screenshots when Python Playwright and Pillow are installed). Before sharing or publishing, show the person that draft and confirm it lists what they meant to change. `python3 tools/changelog.py diff` prints it as text.

If you can't push to GitHub, say so plainly and suggest GitHub Desktop's Push origin button, or a teammate.

## Rules

- **Tokens only.** Colors, type, spacing, radius, shadows and layout values come from `tokens.json`. A value without a token is a bug, or a new token to agree on first.
- **Every component** has a README (what it is, provide, sizes, states, behavior, mobile, accessibility, notes) and a `preview.html` with desktop and mobile.
- **American English** and the Content guide (`guide-1-content.md`) for all text.
- **No third-party logos drawn by hand**: use placeholders or approved files from Bynder.
- **Known problems** go under Notes in the component's README.
- Keep the site out of search engines (`noindex`, `robots.txt`); don't remove them.
- Don't delete history or force-push.

## Claude only

Claude users also keep a copy of Flex as the "Qualys" design system in the Qualys Design System project. When publishing from Claude with access to it, update that design system from `ds/project/` too (`merge_index.py` updates its index). Other agents can ignore this; the repository is always right.
