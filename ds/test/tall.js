const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const a of process.argv.slice(2)){const [n,w,hh]=a.split(':');const p=await b.newPage({viewport:{width:+w,height:+(hh||3000)}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/'+n+'.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.screenshot({path:n+'.png',fullPage:true});console.log(n,errs.length?errs:'ok',await p.evaluate(()=>document.documentElement.scrollHeight));await p.close();}
await b.close()})();
