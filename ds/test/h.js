const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
 for (const [n,w] of [['Icon',960],['Tag',1100],['FilterChip',1100],['Flag',1100],['Marker',1100],['EventType',1100]]) {
  const p=await b.newPage({viewport:{width:w,height:100}}); await p.goto('file://'+__dirname+'/'+n+'.html'); await p.waitForTimeout(600);
  const h=await p.evaluate(()=>{let m=0;document.querySelectorAll('body *').forEach(e=>{const r=e.getBoundingClientRect();if(r.height)m=Math.max(m,r.bottom)});return Math.ceil(m)});
  console.log(n,h); await p.close(); }
 await b.close();})();
