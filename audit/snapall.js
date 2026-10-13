/* Full-page screenshots of every component test page at the given widths. usage: node snapall.js <outdir> [w,w] */
const { chromium } = require('playwright'); const fs = require('fs'); const path = require('path');
const DIR = '/tmp/claude-0/-home-claude/b60ded0a-9c9c-53c2-a600-4425949131a3/scratchpad/ds/test';
(async () => {
  const out = process.argv[2]; const widths = (process.argv[3] || '1440,390').split(',').map(Number);
  const only = process.argv[4] ? process.argv[4].split(',') : null;
  const b = await chromium.launch();
  let pages = fs.readdirSync(DIR).filter(f => /^[A-Z]\w+\.html$/.test(f));
  if (only) pages = pages.filter(f => only.includes(f.replace('.html', '')));
  for (const w of widths) {
    fs.mkdirSync(path.join(out, String(w)), { recursive: true });
    const ctx = await b.newContext({ viewport: { width: w, height: 900 }, reducedMotion: 'reduce' });
    let i = 0;
    async function worker() {
      while (i < pages.length) {
        const f = pages[i++]; const p = await ctx.newPage();
        try {
          await p.goto('file://' + DIR + '/' + f); await p.waitForLoadState('networkidle'); await p.waitForTimeout(250);
          const h = await p.evaluate(() => Math.min(Math.ceil(Math.max(document.body.scrollHeight, document.body.getBoundingClientRect().height, document.documentElement.scrollHeight)), 14000));
          await p.setViewportSize({ width: w, height: Math.max(900, h) }); await p.waitForTimeout(120); await p.screenshot({ path: path.join(out, String(w), f.replace('.html', '.png')) });
        } catch (e) { console.log('ERR', f, w, e.message.slice(0, 80)); }
        await p.close();
      }
    }
    await Promise.all([worker(), worker(), worker(), worker()]);
    await ctx.close();
  }
  await b.close(); console.log('done', pages.length);
})();
