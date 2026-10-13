const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/Nav.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(600);
console.log(await p.evaluate(()=>[...document.querySelectorAll('.stage')].map(s=>{const pb=s.querySelector('.q-nav__panelbox');const r=s.getBoundingClientRect();return s.className+' stageH='+Math.round(r.height)+(pb?' panelBottom='+Math.round(pb.getBoundingClientRect().bottom-r.top)+' panelW='+Math.round(pb.getBoundingClientRect().width):'')}).join('\n')));
console.log('doc h', await p.evaluate(()=>document.documentElement.scrollHeight), errs);
await p.screenshot({path:'Nav.png',fullPage:true}); await b.close()})();
