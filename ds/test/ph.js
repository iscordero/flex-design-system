const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch(); const p=await b.newPage({viewport:{width:1180,height:400}});
 await p.goto('file://'+__dirname+'/DrawerCard.html'); await p.waitForTimeout(900);
 console.log(await p.evaluate(()=>[...document.querySelectorAll('.q-dcard')].map(c=>Math.round(c.getBoundingClientRect().height)+':'+[...c.querySelectorAll('.q-person')].filter(x=>x.offsetParent).map(x=>Math.round(x.getBoundingClientRect().height)).join('/')).join('  ')));
 await b.close();})();
