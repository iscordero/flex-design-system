const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1440,height:1000}});p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/EventCalendar.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const l=p.locator('.q-cal').nth(1);
console.log(JSON.stringify(await l.evaluate(c=>[...c.querySelectorAll('.q-cal__group')].map(g=>g.querySelector('.q-cal__dayname').innerText+': '+[...g.querySelectorAll('.q-cal__row')].map(r=>r.querySelector('.q-cal__time').innerText+' / '+r.querySelector('.q-cal__rowtitle').innerText.slice(0,22)).join(' | '))),null,1));
// month switch on list keeps multi-day spill from previous month
await l.locator('.q-cal__arrow--next').click();console.log('feb',JSON.stringify(await l.evaluate(c=>[...c.querySelectorAll('.q-cal__group')].map(g=>g.querySelector('.q-cal__dayname').innerText+':'+g.querySelectorAll('.q-cal__row').length))));
await l.locator('.q-cal__arrow--prev').click();
const bb=await l.boundingBox();await p.screenshot({path:'callist.png',fullPage:true,clip:{x:0,y:bb.y+150,width:1440,height:1000}});
// grid hover: no scale
const g3=p.locator('.q-cal').nth(2);const t=g3.locator('.q-cal__tile > a').first();await t.scrollIntoViewIfNeeded();const b0=await t.boundingBox();await t.hover();await p.waitForTimeout(450);const b1=await t.boundingBox();console.log('hover scale',(b1.width/b0.width).toFixed(3));
console.log('errs',errs);await b.close()})();
