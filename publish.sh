#!/bin/sh
# Rebuilds the reference site into site/index.html. Cloudflare Pages serves the site/ folder as it is.
# Usage: ./publish.sh            (uses today's date as "Updated")
set -e
cd "$(dirname "$0")/standalone"
# The Change Log entry this unpublished work will get, so it can be checked before publishing (with screenshots when Playwright is installed)
if [ -n "$FLEX_NO_DRAFT" ]; then :; elif python3 -c "import playwright, PIL" 2>/dev/null; then python3 ../tools/changelog.py draft --shots || true; else python3 ../tools/changelog.py draft || true; fi
FLEX_DATE="${FLEX_DATE:-$(date +%Y-%m-%d)}" python3 build.py ../ds ../families.json out
python3 - <<'PY'
s = open('out/flex-design-system.html').read()
m = '<meta charset="utf-8">'
assert m in s
s = s.replace(m, m + '<meta name="robots" content="noindex, nofollow">', 1)
open('../site/index.html', 'w').write(s)
import shutil
shutil.copy('out/example.html', '../site/example.html')
PY
rm -rf out
echo "site/index.html and site/example.html updated. Commit and push to publish."
