const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage();
  const count = async (file) => { await p.setContent('<style>' + fs.readFileSync(file, 'utf8').replace(/<\/style/g, '') + '</style>'); return p.evaluate(() => { let rules = 0, decls = 0; const per = {}; const walk = l => { for (const r of l) { if (r.style) { rules++; decls += r.style.length; per[r.selectorText || r.cssText.slice(0, 30)] = (per[r.selectorText] || 0) + r.style.length; } if (r.cssRules) walk(r.cssRules); } }; walk(document.styleSheets[0].cssRules); return { rules, decls, per }; }); };
  const a = await count(process.argv[2]), c = await count(process.argv[3]);
  console.log('rules', a.rules, c.rules, 'declarations', a.decls, c.decls);
  for (const k of Object.keys(a.per)) if (a.per[k] !== c.per[k]) console.log('DIFF', k, a.per[k], c.per[k]);
  await b.close();
})();
