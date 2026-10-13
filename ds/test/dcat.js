const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  for (const w of process.argv.slice(2).map(Number)) {
    await p.goto('file://' + __dirname + '/DCsweep.html?w=' + w); await p.waitForLoadState('networkidle'); await p.waitForTimeout(300);
    const r = await p.evaluate(() => [...document.querySelectorAll('[data-k]')].map(d => { const c = d.querySelector('.q-dcard'); const persons = [...c.querySelectorAll('.q-person')].filter(x => x.offsetWidth > 0); const stack = c.querySelector('.q-dcard__stack'); const more = stack && stack.querySelector('.q-dcard__more');
      return d.getAttribute('data-k') + ':' + persons.length + (c.classList.contains('is-two') ? 'two' : '') + (stack && stack.offsetWidth > 0 ? '+st' + stack.querySelectorAll('.q-dcard__stackitem').length + (more ? '(' + more.textContent + ')' : '') : '') + ' h' + c.offsetHeight; }));
    console.log(w, r.join(' | '));
  }
  // mobile viewport
  const m = await b.newPage({ viewport: { width: 390, height: 900 } });
  await m.goto('file://' + __dirname + '/DCsweep.html?w=350'); await m.waitForLoadState('networkidle'); await m.waitForTimeout(300);
  console.log('mobile closed', (await m.evaluate(() => [...document.querySelectorAll('[data-k]')].map(d => { const c = d.querySelector('.q-dcard'); const cs = getComputedStyle(c); const cta = c.querySelector('.q-dcard__cta'); return d.getAttribute('data-k') + ':h' + c.offsetHeight + ' pad' + cs.paddingTop + (cta ? ' cta' + Math.round(cta.getBoundingClientRect().width) : ''); }))).join(' | '));
  await m.screenshot({ path: '/tmp/claude-0/-home-claude/b60ded0a-9c9c-53c2-a600-4425949131a3/scratchpad/dc_mobile.png', clip: { x: 0, y: 0, width: 390, height: 1500 } });
  await b.close();
})();
