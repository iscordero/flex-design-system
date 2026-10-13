const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1300,height:900}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'||m.type()==='warning')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/cmpcards.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
const r=await p.evaluate(()=>[...document.querySelectorAll('#root > div > div')].map(d=>d.id+'='+Math.round(d.firstElementChild.getBoundingClientRect().height*10)/10));
console.log(r.join('  '));console.log('errors',errs.slice(0,5));
await p.screenshot({path:'cmpcards.png',fullPage:true});await b.close();})();
