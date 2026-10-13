const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
 for (const a of process.argv.slice(2)) { const [n,w]=a.split(':');
  const p=await b.newPage({viewport:{width:+w,height:100}}); await p.goto('file://'+__dirname+'/'+n+'.html'); await p.waitForLoadState('networkidle'); await p.waitForTimeout(400);
  console.log(n, await p.evaluate(()=>document.documentElement.scrollHeight)); await p.close(); }
 await b.close();})();
