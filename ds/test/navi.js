const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
async function page(w,h,f){const p=await b.newPage({viewport:{width:w,height:h}});p.on('pageerror',e=>errs.push(f+': '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(f+': '+m.text())});await p.goto('file://'+process.cwd()+'/'+f);await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);return p;}
// Desktop interactions on NavBanner preview (auto? it's layout desktop, hover false)
let p=await page(1440,900,'NavBanner.html');
const st=()=>p.evaluate(()=>({open:[...document.querySelectorAll('.q-nav__link[aria-expanded]')].map(b=>b.getAttribute('aria-expanded')).join(','),panel:!!document.querySelector('.q-nav__panel'),kind:document.querySelector('.q-nav__panel')?.className,focus:(document.activeElement.textContent||'').slice(0,20)}));
console.log('start',await st());
await p.click('.q-nav__link >> text=Platform');console.log('click Platform',await st());
await p.click('.q-mega__item >> text=Compliance');console.log('filter Compliance → groups',await p.evaluate(()=>[...document.querySelectorAll('.q-mega__heading')].map(e=>e.textContent)),await p.evaluate(()=>document.querySelector('.q-mega__item.is-active').textContent));
await p.click('.q-mega__item >> text=All');console.log('All → groups',await p.evaluate(()=>document.querySelectorAll('.q-mega__group').length));
await p.hover('.q-mega__link >> nth=5');await p.waitForTimeout(250);console.log('link hover arrow opacity',await p.evaluate(()=>getComputedStyle(document.querySelectorAll('.q-mega__link')[5].querySelector('.q-mega__arrow')).opacity));
await p.keyboard.press('Escape');console.log('esc',await st());
await p.click('.q-nav__link >> text=Solutions');console.log('click Solutions',await st());
await p.click('.q-nav__link >> text=Platform');console.log('switch to Platform',await st());
await p.mouse.click(700,850);console.log('outside click',await st());
// keyboard: Tab to Platform, Enter, Tab goes into panel
await p.focus('.q-nav__link >> text=Platform');await p.keyboard.press('Enter');await p.keyboard.press('Tab');console.log('tab into panel →',await p.evaluate(()=>document.activeElement.className+' | '+document.activeElement.textContent.slice(0,30)));
await p.keyboard.press('Escape');
// banner close
await p.click('.q-navbanner__close');console.log('banner gone',await p.evaluate(()=>!document.querySelector('.q-navbanner')));
await p.close();
// hover mode: default (hover true) with auto layout at 1440 — build a quick page from Nav preview: use first nav? it has hover:false. Skip.
// Mobile: auto layout below 1200
p=await page(390,844,'NavBanner.html');
console.log('at 390: desktop display',await p.evaluate(()=>getComputedStyle(document.querySelector('.q-nav__desktop')||document.body).display),'(layout forced desktop in this preview)');
await p.close();
p=await page(1440,2900,'Nav.html');
// closed mobile bar is 4th nav
const bar=await p.$$('.q-nav__menubtn');console.log('menu buttons',bar.length);
await bar[0].click();await p.waitForTimeout(200);
console.log('panel open',await p.evaluate(()=>{const d=document.querySelector('body > .q-navpanel');return d?[d.getAttribute('role'),d.getAttribute('aria-modal'),document.activeElement.className,document.body.style.overflow]:null}));
await p.click('body > .q-navpanel .q-navpanel__row >> text=Platform');console.log('level2',await p.evaluate(()=>{const d=document.querySelector('body > .q-navpanel');return [d.querySelector('.q-navpanel__back').textContent,d.querySelectorAll('.q-navpanel__row').length]}));
await p.click('body > .q-navpanel .q-navpanel__row >> text=Compliance');console.log('level3',await p.evaluate(()=>{const d=document.querySelector('body > .q-navpanel');return [d.querySelector('.q-navpanel__back').textContent,[...d.querySelectorAll('.q-mega__heading')].map(e=>e.textContent),d.querySelectorAll('.q-mega__link').length]}));
await p.click('body > .q-navpanel .q-navpanel__back');console.log('back →',await p.evaluate(()=>document.querySelector('body > .q-navpanel .q-navpanel__back').textContent));
await p.click('body > .q-navpanel .q-navpanel__back');console.log('root rows',await p.evaluate(()=>document.querySelectorAll('body > .q-navpanel .q-navpanel__row').length));
await p.click('body > .q-navpanel .q-navpanel__row >> text=Solutions');console.log('solutions level',await p.evaluate(()=>{const d=document.querySelector('body > .q-navpanel');return [d.querySelector('.q-navpanel__back').textContent,[...d.querySelectorAll('.q-nav__eyebrow')].map(e=>e.textContent),d.querySelectorAll('.q-navpanel__row').length]}));
await p.keyboard.press('Escape');await p.waitForTimeout(100);console.log('esc closes',await p.evaluate(()=>!document.querySelector('body > .q-navpanel')),'focus back',await p.evaluate(()=>document.activeElement.className),'overflow',JSON.stringify(await p.evaluate(()=>document.body.style.overflow)));
console.log('errs',errs);await b.close()})();
