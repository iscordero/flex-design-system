const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const scale=+(process.argv[2]||2);
const p=await b.newPage({viewport:{width:560,height:900},deviceScaleFactor:scale});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/viz.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
const ids=await p.$$eval('.viz',e=>e.map(x=>x.id));
for(const id of ids){const el=await p.$('#'+id);const bb=await el.boundingBox();await el.screenshot({path:'t15/'+id+'.png',omitBackground:true});console.log(id,Math.round(bb.width)+'x'+Math.round(bb.height));}
await p.screenshot({path:'all.png',fullPage:true});console.log('errs',errs);await b.close()})();
