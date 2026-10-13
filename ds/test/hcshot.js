const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1100, height: 1000 }, deviceScaleFactor: 2 });
  await p.goto('file://' + __dirname + '/HoverCard.html'); await p.waitForLoadState('networkidle'); await p.waitForTimeout(300);
  const cards = await p.$$('.q-hcard__card--profile');
  const a = await cards[0].boundingBox(), c = await cards[2].boundingBox();
  await p.screenshot({ path: process.argv[2], clip: { x: a.x - 16, y: a.y - 16, width: c.x + c.width - a.x + 32, height: 170 } });
  const m = await p.evaluate(() => { const k = document.querySelector('.q-hcard__card--profile'); const r = e => { const q = k.querySelector(e).getBoundingClientRect(); return [q.left, q.top, q.width, q.height].map(v => Math.round(v * 10) / 10); }; return { card: (() => { const q = k.getBoundingClientRect(); return [q.left, q.top, q.width]; })(), av: r('.q-avatar'), name: r('.q-hcard__name'), soc: r('.q-hcard__social'), socsvg: r('.q-hcard__social svg'), x: r('.q-hcard__close'), xsvg: r('.q-hcard__close svg') }; });
  console.log(JSON.stringify(m)); await b.close();
})();
