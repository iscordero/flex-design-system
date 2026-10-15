# Flex Design System — source

Everything needed to change, check and rebuild the Flex design system and its reference site.

Working with an AI agent? Start with `AGENTS.md`. The process people follow is **Change Management** on the site.

## What's here

| Folder / file | What it is |
| --- | --- |
| `ds/project/` | The design system itself: `tokens.json`, guides (`guide-*.md`), `README.md`, and every component's `README.md` and `preview.html`, plus the built `components/bundle.js`, `bundle.css` and `index.d.ts` |
| `ds/bundle.src.js` | Component source (React 18, no JSX). Edit this, then build the bundle |
| `ds/mk_btn.py`, `ds/mk_new.py` | Retired. They once generated some previews and READMEs; those files are now edited directly, and the scripts stop if run |
| `ds/overview/` | Guide pipeline: text in `txt/`, diagrams in `parts/`, encoded images in `gimg/` |
| `ds/test/` | Test page builder and checks (regression, preview heights, screenshots) |
| `ds/tscheck/` | Type check for `index.d.ts` |
| `standalone/` | Builds the one-file reference site (`build.py`, `shell.js`, `shell.css`, icons) |
| `site/` | The published site: `index.html` plus `_headers`, `robots.txt` and `favicon.ico`. Cloudflare Pages serves this folder as it is |
| `publish.sh` | Rebuilds `site/index.html` from the source |
| `AGENTS.md` | Instructions for any AI agent working on Flex (`CLAUDE.md` points to it) |
| `merge_index.py` | Used by Claude to update the Claude design system's index; not needed for the site |
| `families.json` | How the site groups components: Components and Page modules, by family |
| `audit/` | Token audits (some scripts still have old absolute paths) |

## Common tasks

Run these from the folder named.

```sh
# Rebuild the component bundle after editing bundle.src.js   (ds/)
python3 build_bundle.py bundle.src.js icons-figma.json project/components/bundle.js

# Build test pages, then run the visual regression           (ds/)
python3 test/build.py $(pwd)
cd test && node regress.js          # needs Node + Playwright

# Update a preview's height after changing it                (ds/test/)
node heights.js ComponentName

# Type check                                                 (ds/tscheck/)
npm install && cp ../project/components/index.d.ts qualys.d.ts
npx tsc --noEmit --jsx react --skipLibCheck --strict use.tsx use2.tsx use3.tsx qualys.d.ts

# Rebuild the reference site into site/index.html          (repository root)
./publish.sh
```

## Requirements

Python 3 with `markdown` and `Pillow` (`pip install markdown pillow`) to build the site; Node with Playwright and TypeScript for the checks.

## Publishing

The site is hosted on Cloudflare Pages, connected to this repository. Pages has no build step: it serves the `site/` folder of `main` as it is.

1. Make each change on its own branch and run `./publish.sh`. Open `site/index.html` to check it locally.
2. Push the branch. Cloudflare publishes a preview at `https://<branch>.flex-design-system.pages.dev`.
3. Open a pull request with the preview link for review.
4. Merge it once approved. The live site updates within a minute or two.

Cloudflare Pages settings: framework preset **None**, build command **empty**, build output directory **site**, preview deployments on for all non-production branches.

## How changes are managed

Read **Change Management** in the design system (`ds/project/guide-10-change-management.md`, or on the site): setup with any AI agent, previewing, approval, publishing and onboarding.

## Rules the system follows

- Tokens only: spacing, corners, colors, shadows and type come from `tokens.json`. A value with no token is a bug, or a new token to agree on first.
- One profile text style everywhere: name `title-sm` (16px SemiBold), role `paragraph-rg` in `text-secondary`, company in Medium or as its logo.
- Every component has a README (what it is, provide, sizes, states, behavior, mobile, accessibility, notes) and a preview with its mobile version.
- The site is kept out of search engines (`noindex` and `robots.txt`).
