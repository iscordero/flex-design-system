const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
 for (const [n,w] of [['Drawer',1100],['DrawerCard',1180],['Accordion',1180]]) {
  const p=await b.newPage({viewport:{width:w,height:100}}); await p.goto('file://'+__dirname+'/'+n+'.html'); await p.waitForTimeout(700);
  console.log(n, await p.evaluate(()=>document.documentElement.scrollHeight)); await p.close(); }
 await b.close();})();
