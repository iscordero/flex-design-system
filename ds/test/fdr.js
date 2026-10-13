const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:900,height:900},deviceScaleFactor:2});p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/FilterDrawer.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(200);
const m=()=>p.evaluate(()=>[...document.querySelectorAll('.q-fdrawer__panel')].map(pn=>{const R=pn.getBoundingClientRect();const g=s=>{const e=pn.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.x-R.x),Math.round(r.y-R.y),Math.round(r.width),Math.round(r.height)]};const mo=pn.querySelector('.q-fdrawer__more');let gap=null;if(mo){const prev=mo.previousElementSibling.getBoundingClientRect();gap=Math.round(mo.getBoundingClientRect().y-prev.bottom)}return {top:g('.q-fdrawer__top'),close:g('.q-fdrawer__close'),body:g('.q-fdrawer__body'),title:g('.q-fdrawer__title'),moreGap:gap,h:Math.round(R.height)}}));
console.log(JSON.stringify(await m()));
await p.screenshot({path:'fdr_0.png',fullPage:true});
// expand and scroll the divided panel
await p.locator('.q-fdrawer__more').first().click();await p.waitForTimeout(100);
await p.evaluate(()=>{document.querySelector('.q-fdrawer__body').scrollTop=37});await p.waitForTimeout(100);
console.log(JSON.stringify((await m())[0]));
const pn=await p.locator('.q-fdrawer__panel').first().boundingBox();await p.screenshot({path:'fdr_1.png',clip:{x:pn.x-10,y:pn.y-10,width:pn.width+20,height:330}});
await p.evaluate(()=>{const b=document.querySelector('.q-fdrawer__body');b.scrollTop=b.scrollHeight});await p.waitForTimeout(100);
await p.screenshot({path:'fdr_2.png',clip:{x:pn.x-10,y:pn.y-10,width:pn.width+20,height:pn.height+20}});
console.log('errs',errs);await b.close()})();
