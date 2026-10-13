const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
 for (const n of ['Select','FilterDropdown','TextField','SearchBar','Icon','Checkbox','Radio','Toggle']) {
  const p=await b.newPage({viewport:{width:1100,height:200}});
  await p.goto('file://'+__dirname+'/'+n+'.html'); await p.waitForTimeout(800);
  const h=await p.evaluate(()=>{let m=0;document.querySelectorAll('body *').forEach(e=>{const r=e.getBoundingClientRect();if(r.height)m=Math.max(m,r.bottom)});return Math.ceil(m)});
  console.log(n,h); await p.close(); }
 await b.close();})();
