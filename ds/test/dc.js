const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const a of process.argv.slice(2)){const [n,w]=a.split(':');const p=await b.newPage({viewport:{width:+w,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/'+n+'.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(400);
await p.screenshot({path:n+'_'+w+'.png',fullPage:true});console.log(n,w,errs,await p.evaluate(()=>document.documentElement.scrollHeight));await p.close();}
await b.close()})();
