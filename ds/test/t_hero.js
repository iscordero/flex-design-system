const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const out=process.argv[2]||'t_hero';
for (const w of [1440,390]) { const p=await b.newPage({viewport:{width:w,height:900}});
await p.goto('file://'+process.cwd()+'/Hero.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const els=await p.$$('.q-hero__panel--light'); console.log(w,'light panels',els.length);
let i=0; for(const el of els){ const sec=await el.evaluateHandle(e=>e.closest('section')); await sec.asElement().screenshot({path:out+'_'+w+'_'+(i++)+'.png'}); console.log(await sec.asElement().evaluate(e=>e.className+' '+Math.round(e.getBoundingClientRect().width)+'x'+Math.round(e.getBoundingClientRect().height)+' copy w='+Math.round(e.querySelector('.q-copy').getBoundingClientRect().width)+' x='+Math.round(e.querySelector('.q-copy').getBoundingClientRect().left))); }
await p.close(); }
await b.close()})();
