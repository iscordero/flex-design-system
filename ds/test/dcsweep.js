const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
  const read = () => p.evaluate(() => [...document.querySelectorAll('[data-k]')].map(d => { const c = d.querySelector('.q-dcard'); const persons = [...c.querySelectorAll('.q-person')].filter(x => x.offsetWidth > 0); const stack = c.querySelector('.q-dcard__stack'); const list = c.querySelector('.q-dcard__list');
    const tops = new Set(persons.map(x => Math.round(x.getBoundingClientRect().top)));
    const role = persons.some(x => { const r = x.querySelector('.q-person__role'); return r && r.offsetHeight > 0; });
    const cta = c.querySelector('.q-dcard__cta'); const ctaR = cta ? cta.getBoundingClientRect() : null; const titleR = c.querySelector('.q-dcard__title').getBoundingClientRect();
    return [d.getAttribute('data-k'), persons.length, c.classList.contains('is-two') ? 'two' : '', stack && stack.offsetWidth > 0 ? 'stack' + stack.querySelectorAll('.q-dcard__stackitem').length + (stack.querySelector('.q-dcard__more') ? '+' : '') : '', 'rows' + tops.size, role ? 'role' : '', list && list.scrollWidth > list.clientWidth + 1 ? 'OVERFLOW' : '', ctaR ? 'cta' + Math.round(ctaR.width) + (ctaR.top > titleR.bottom + 4 ? 'below' : 'beside') : '', 'h' + c.offsetHeight].filter(Boolean).join(' '); }));
  const out = {};
  for (let w = 1140; w >= 320; w -= 20) {
    await p.goto('file://' + __dirname + '/DCsweep.html?w=' + w); await p.waitForLoadState('networkidle'); await p.waitForTimeout(250);
    out[w] = await read();
  }
  // print transitions per card
  const keys = out[1140].map(x => x.split(' ')[0]);
  keys.forEach((k, i) => { let prev = null; const line = []; for (let w = 1140; w >= 320; w -= 20) { const v = out[w][i].replace(/ h\d+/, '').split(' ').slice(1).join(' '); if (v !== prev) { line.push(w + ': ' + v); prev = v; } } console.log(k.padEnd(3), '|', line.join('  ||  ')); });
  await b.close();
})();
