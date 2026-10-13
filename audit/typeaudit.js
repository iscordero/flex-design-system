const { chromium } = require('playwright'); const fs = require('fs');
const DIR = '/tmp/claude-0/-home-claude/b60ded0a-9c9c-53c2-a600-4425949131a3/scratchpad/ds/test';
(async () => {
  const b = await chromium.launch(); const out = {};
  const pages = fs.readdirSync(DIR).filter(f => /^[A-Z]\w+\.html$/.test(f));
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  for (const f of pages) {
    const p = await ctx.newPage();
    await p.goto('file://' + DIR + '/' + f); await p.waitForLoadState('networkidle'); await p.waitForTimeout(150);
    out[f.replace('.html', '')] = await p.evaluate(() => {
      const res = {};
      for (const el of document.body.querySelectorAll('*')) {
        if (!el.closest('[class^="q-"], [class*=" q-"]')) continue;
        const txt = [].some.call(el.childNodes, n => n.nodeType === 3 && n.textContent.trim());
        if (!txt && !/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) continue;
        const r = el.getBoundingClientRect(); if (!r.width || !r.height) continue;
        const cs = getComputedStyle(el); const fs = parseFloat(cs.fontSize); const ls = cs.letterSpacing === 'normal' ? 0 : parseFloat(cs.letterSpacing);
        const lh = cs.lineHeight === 'normal' ? 0 : parseFloat(cs.lineHeight);
        const k = [cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(), Math.round(fs * 100) / 100, cs.fontWeight, lh ? Math.round(lh / fs * 100) / 100 : 'normal', Math.round(ls / fs * 1000) / 10].join('|');
        const cls = (String(el.getAttribute('class') || '').split(/\s+/).find(c => c.startsWith('q-')) || (el.closest('[class^="q-"], [class*=" q-"]').getAttribute('class').split(/\s+/).find(c => c.startsWith('q-')) + ' ' + el.tagName.toLowerCase()));
        (res[k] = res[k] || {})[cls] = ((res[k] || {})[cls] || 0) + 1;
      }
      return res;
    });
    await p.close();
  }
  fs.writeFileSync('type-runtime.json', JSON.stringify(out)); await b.close(); console.log('done', pages.length);
})();
