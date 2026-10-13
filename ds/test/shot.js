const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
 for (const [name,w] of process.argv.slice(2).map(a=>a.split(':'))) {
  const p=await b.newPage({viewport:{width:+w||960,height:300}});
  const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.goto('file://'+__dirname+'/'+name+'.html'); await p.waitForTimeout(1200);
  await p.screenshot({path:__dirname+'/'+name+'.png',fullPage:true});
  console.log(name, errs.length?errs.join(' | ').slice(0,300):'ok'); await p.close(); }
 await b.close();})();
