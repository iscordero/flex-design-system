const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1440,height:1000}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/EventCalendar.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const cal=p.locator('.q-cal').first();
// measurements vs Figma
console.log(JSON.stringify(await p.evaluate(()=>{const c=document.querySelector('.q-cal');const R=c.getBoundingClientRect();const g=s=>{const e=c.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return [Math.round(r.x-R.x),Math.round(r.y-R.y),Math.round(r.width),Math.round(r.height)]};
return {tools:g('.q-cal__tools'),search:g('.q-cal__search'),filters:g('.q-cal__filters--desk'),head:g('.q-cal__head'),title:g('.q-cal__title'),nav:g('.q-cal__nav'),today:g('.q-cal__today'),toggle:g('.q-cal__toggle'),legend:g('.q-cal__legend'),month:g('.q-cal__month'),week1:g('.q-cal__week'),day:g('.q-cal__day'),ev:g('.q-cal__stack .q-cal__event'),multi:g('.q-cal__event--multi'),compact:g('.q-cal__event--compact'),total:[Math.round(R.width),Math.round(R.height)]}})));
// hover popover
const bar=cal.locator('.q-cal__event--multi').first();await bar.hover();await p.waitForTimeout(300);
console.log('pop',JSON.stringify(await p.evaluate(()=>{const e=document.querySelector('.q-cal__pop');if(!e)return null;const r=e.getBoundingClientRect();const m=document.querySelector('.q-cal__month').getBoundingClientRect();return {x:Math.round(r.x-m.x),y:Math.round(r.y-m.y),w:Math.round(r.width),h:Math.round(r.height),hidden:e.getAttribute('aria-hidden'),text:e.innerText.replace(/\n+/g,' | ')}})));
await p.screenshot({path:'cal_pop.png',clip:{x:0,y:180,width:1440,height:900}});
await p.mouse.move(5,5);await p.waitForTimeout(400);console.log('pop after leave',await p.locator('.q-cal__pop').count());
// keyboard focus
await bar.focus();await p.waitForTimeout(100);console.log('pop on focus',await p.locator('.q-cal__pop').count(),'label:',await bar.getAttribute('aria-label'));await p.keyboard.press('Escape');await p.waitForTimeout(50);console.log('after esc',await p.locator('.q-cal__pop').count());
// month nav
await cal.locator('.q-cal__arrow--next').click();console.log('next →',await cal.locator('.q-cal__title').innerText(),'events',await cal.locator('.q-cal__event').count(),'weeks',await cal.locator('.q-cal__week').count());
await cal.locator('.q-cal__arrow--prev').click();await cal.locator('.q-cal__arrow--prev').click();console.log('prev×2 →',await cal.locator('.q-cal__title').innerText(),'events',await cal.locator('.q-cal__event').count());
await cal.locator('.q-cal__today').first().click();console.log('current →',await cal.locator('.q-cal__title').innerText(),'today cells',await cal.locator('.q-cal__day.is-today').count());
// search
await cal.locator('.q-search__input').fill('qsc');console.log('search qsc →',await cal.locator('.q-cal__event').count());
await cal.locator('.q-search__input').fill('');
// filter: open Event Type and tick Webinar
await cal.locator('.q-cal__filters--desk .q-filter__trigger').first().click();await p.waitForTimeout(100);
const opts=await cal.locator('.q-cal__filters--desk .q-menu__row').allInnerTexts();console.log('type options',opts.join(' / '));
await cal.locator('.q-cal__filters--desk .q-menu__row',{hasText:'Webinar'}).locator('input').check();await p.waitForTimeout(100);
console.log('webinar only →',await cal.locator('.q-cal__event').count(),'classes ok',await cal.locator('.q-cal__event:not(.q-cal__event--webinar)').count());
await p.mouse.click(700,300);
await cal.locator('.q-cal__filters--desk .q-textlink').click();console.log('reset →',await cal.locator('.q-cal__event').count());
// views
await cal.locator('.q-cal__viewbtn').nth(0).click();console.log('list →',await cal.getAttribute('class'),await cal.locator('.q-cal__row').count(),'groups',await cal.locator('.q-cal__group').count());
await cal.locator('.q-cal__viewbtn').nth(2).click();console.log('grid →',await cal.locator('.q-cal__title').innerText(),await cal.locator('.q-cal__tile').count(),'more',await cal.locator('.q-cal__more').count());
await cal.locator('.q-cal__more button').click();console.log('load more →',await cal.locator('.q-cal__tile').count());
await cal.locator('.q-search__input').fill('zzzz');console.log('empty →',await cal.locator('.q-cal__empty').innerText());
// grid hover scale
const g3=p.locator('.q-cal').nth(2);const t=g3.locator('.q-cal__tile > a').first();await t.scrollIntoViewIfNeeded();const b0=await t.boundingBox();await t.hover();await p.waitForTimeout(500);const b1=await t.boundingBox();console.log('hover scale',(b1.width/b0.width).toFixed(3));
console.log('errs',errs);await b.close();
// touch
const b2=await chromium.launch();const ctx=await b2.newContext({viewport:{width:1440,height:1000},hasTouch:true});const q=await ctx.newPage();
await q.goto('file://'+process.cwd()+'/EventCalendar.html');await q.waitForLoadState('networkidle');await q.waitForTimeout(300);
const ph=q.locator('.phone .q-cal').first();const ev=ph.locator('.q-cal__event').first();await ev.scrollIntoViewIfNeeded();await ev.tap();await q.waitForTimeout(300);
console.log('tap →',JSON.stringify(await q.evaluate(()=>{const e=document.querySelector('.phone .q-cal__pop');if(!e)return null;const r=e.getBoundingClientRect();const m=e.parentElement.getBoundingClientRect();return {x:Math.round(r.x-m.x),w:Math.round(r.width),mw:Math.round(m.width),hidden:e.getAttribute('aria-hidden'),url:location.hash}})));
await q.screenshot({path:'cal_tap.png',clip:{x:0,y:(await ph.boundingBox()).y,width:420,height:1000}});
await q.touchscreen.tap(700,(await ph.boundingBox()).y+900);await q.waitForTimeout(300);console.log('tap outside →',await q.locator('.phone .q-cal__pop').count());
await b2.close()})();
