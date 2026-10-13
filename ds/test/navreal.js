const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const m=await b.newPage({viewport:{width:1440,height:900}});m.on('pageerror',e=>errs.push(e.message));m.on('console',x=>{if(x.type()==='error')errs.push(x.text())});
await m.goto('file://'+process.cwd()+'/Nav.html');await m.waitForLoadState('networkidle');await m.evaluate(()=>document.fonts.ready);await m.waitForTimeout(300);
const btn=m.locator('.phone:not(.phone--tall) .q-nav__menubtn');await btn.scrollIntoViewIfNeeded();
const ms=()=>m.evaluate(()=>{const pn=document.querySelector('body > .q-navpanel');return pn?{cls:pn.className,x:+pn.getBoundingClientRect().x.toFixed(1),w:pn.getBoundingClientRect().width,sw:document.documentElement.scrollWidth,of:document.body.style.overflow,focus:document.activeElement.className}:{none:true,of:document.body.style.overflow,focus:document.activeElement.className}});
await btn.click();await m.waitForTimeout(100);console.log('real open@100',JSON.stringify(await ms()));await m.screenshot({path:'nr1.png'});await m.waitForTimeout(350);console.log('real opened',JSON.stringify(await ms()));
await m.locator('body > .q-navpanel .q-navpanel__row').nth(1).click();await m.waitForTimeout(400);console.log('drilled',JSON.stringify(await ms()), await m.locator('body > .q-navpanel .q-navpanel__back').textContent());
await m.keyboard.press('Escape');await m.waitForTimeout(100);console.log('real esc@100',JSON.stringify(await ms()));await m.waitForTimeout(350);console.log('real closed',JSON.stringify(await ms()));
await btn.click();await m.waitForTimeout(450);console.log('reopened at root?',await m.locator('body > .q-navpanel .q-navpanel__back').count());
// inline phone: bar stays under the sliding panel
const info=await m.evaluate(()=>{const ph=document.querySelectorAll('.phone--tall')[1];const bar=ph.querySelector('.q-nav__mobilebar'),pn=ph.querySelector('.q-navpanel');const R=ph.getBoundingClientRect();return {bar:bar?[bar.getBoundingClientRect().y-R.y,bar.hasAttribute('inert')]:null,panel:[pn.getBoundingClientRect().y-R.y,pn.getBoundingClientRect().height],h:R.height}});console.log('inline',JSON.stringify(info));
console.log('errs',errs);await b.close()})();
