/* Runs the site's own Specs inspector in every preview and collects what it flags. */
const { chromium } = require('playwright'); const fs = require('fs');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1500, height: 1000 } });
  await p.goto('file://' + process.argv[2]); await p.waitForTimeout(1500);
  await p.evaluate(() => { window.__sum = {}; window.addEventListener('message', e => { const d = e.data; if (d && d.summary && typeof d.ds === 'string') window.__sum[d.ds] = d.summary; }); });
  const views = await p.evaluate(() => [...document.querySelectorAll('.ds-view')].filter(v => v.querySelector('.ds-stage[data-c]')).map(v => v.getAttribute('data-view')));
  for (const v of views) {
    await p.evaluate(v => { location.hash = v; }, v); await p.waitForTimeout(700);
    const names = await p.evaluate(v => [...document.querySelector('.ds-view[data-view="' + v + '"]').querySelectorAll('.ds-stage[data-c]')].map(e => e.getAttribute('data-c')), v);
    for (const n of names) {
      await p.evaluate(n => document.querySelector('.ds-stage[data-c="' + n + '"]').scrollIntoView(), n); await p.waitForTimeout(900);
      await p.evaluate(n => { const f = document.querySelector('.ds-stage[data-c="' + n + '"] iframe'); if (f) f.contentWindow.postMessage({ dsSpecs: n, on: true, scale: 1, mode: 'measure' }, '*'); }, n);
      await p.waitForTimeout(700);
      await p.evaluate(n => { const f = document.querySelector('.ds-stage[data-c="' + n + '"] iframe'); if (f) f.contentWindow.postMessage({ dsSpecs: n, on: false, scale: 1 }, '*'); }, n);
    }
  }
  const out = await p.evaluate(() => ({ sum: window.__sum, D: (function () { const d = JSON.parse(document.getElementById('ds-data').textContent); return { look: d.look, typeStyles: d.typeStyles }; })() }));
  fs.writeFileSync(process.argv[3], JSON.stringify(out)); console.log('components', Object.keys(out.sum).length); await b.close();
})();
