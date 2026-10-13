const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1440,height:1000}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/Carousel.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const st=(n)=>p.evaluate((n)=>{const c=document.querySelectorAll('.q-carousel')[n];const v=c.querySelector('.q-carousel__viewport');const C=c.getBoundingClientRect();const s=[...c.querySelectorAll('.q-carousel__slide')].map(e=>Math.round(e.getBoundingClientRect().x-C.x));const bt=[...c.querySelectorAll('.q-carousel__btn')].map(e=>e.disabled);const pr=c.querySelector('.q-carousel__progress > span').getBoundingClientRect();const tr=c.querySelector('.q-carousel__progress').getBoundingClientRect();return {scroll:Math.round(v.scrollLeft),max:v.scrollWidth-v.clientWidth,slides:s.join(','),btns:bt,progress:(pr.width/tr.width).toFixed(2),track:[Math.round(tr.x-C.x),Math.round(tr.width)],h:Math.round(C.height),slideW:Math.round(c.querySelector('.q-carousel__slide').getBoundingClientRect().width)}},n);
console.log('multi start',JSON.stringify(await st(0)));
const next=p.locator('.q-carousel').nth(0).locator('.q-carousel__btn').nth(1);
await next.click();await p.waitForTimeout(700);console.log('after next',JSON.stringify(await st(0)));
for(let i=0;i<6;i++){if(await next.isDisabled())break;await next.click();await p.waitForTimeout(600);}console.log('at end',JSON.stringify(await st(0)));
await p.locator('.q-carousel').nth(0).locator('.q-carousel__btn').nth(0).click();await p.waitForTimeout(700);console.log('prev',JSON.stringify(await st(0)));
console.log('single',JSON.stringify(await st(1)));console.log('mobile',JSON.stringify(await st(2)));
// keyboard: focus viewport and press ArrowRight
await p.locator('.q-carousel').nth(1).locator('.q-carousel__viewport').focus();await p.keyboard.press('ArrowRight');await p.waitForTimeout(500);console.log('kbd',JSON.stringify(await st(1)));
// logos marquee
await p.goto('file://'+process.cwd()+'/LogoCarousel.html');await p.waitForLoadState('networkidle');await p.waitForTimeout(300);
const lg=()=>p.evaluate(()=>{const t=document.querySelector('.q-logos__track');const cs=getComputedStyle(t);return {tf:cs.transform,state:cs.animationPlayState,dur:cs.animationDuration,w:t.scrollWidth,label:document.querySelector('.q-logos__toggle').getAttribute('aria-label')}});
const a=await lg();await p.waitForTimeout(500);const b2=await lg();console.log('marquee',JSON.stringify(a),'→',b2.tf);
await p.locator('.q-logos__toggle').first().click();await p.waitForTimeout(100);const c1=await lg();await p.waitForTimeout(400);const c2=await lg();console.log('paused',c1.state,c1.label,c1.tf===c2.tf);
console.log('errs',errs);await b.close()})();
