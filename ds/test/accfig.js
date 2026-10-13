const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const vw=+process.argv[2]||1440;
const p=await b.newPage({viewport:{width:vw,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/accfig.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
for(const id of process.argv.slice(3)){const el=await p.$('#'+id);const bb=await el.boundingBox();await el.screenshot({path:'accfig_'+id+'.png'});console.log(id,Math.round(bb.width),Math.round(bb.height));}
console.log(errs);await b.close()})();
