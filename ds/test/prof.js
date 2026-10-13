const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const errs=[];
async function page(w,h,f){const p=await b.newPage({viewport:{width:w,height:h}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});await p.goto('file://'+process.cwd()+'/'+f);await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);return p;}
const r=(p,sel,i=0)=>p.evaluate(([s,i])=>{const e=document.querySelectorAll(s)[i];if(!e)return null;const b=e.getBoundingClientRect();return [Math.round(b.x*10)/10,Math.round(b.y*10)/10,Math.round(b.width*10)/10,Math.round(b.height*10)/10]},[sel,i]);
// desktop
let p=await page(1248,1000,'ProfileGrid.html');
console.log('card (384x464)',await r(p,'.q-pgrid--individual .q-pcard'),'media (336x300)',await r(p,'.q-pgrid--individual .q-pcard__media'),'chip',await r(p,'.q-profile__chip'));
console.log('name',await r(p,'.q-pgrid--individual .q-profile__name'),'role',await r(p,'.q-pgrid--individual .q-profile__role'),'logo',await r(p,'.q-pgrid--individual .q-profile__logo'));
console.log('combined box',await r(p,'.q-pgrid--combined'),'tile media (211.2x209.6)',await r(p,'.q-pgrid--combined .q-pcard__media'));
await p.hover('.q-pgrid--individual .q-pcard');await p.waitForTimeout(350);
console.log('overlay opacity',await p.evaluate(()=>getComputedStyle(document.querySelector('.q-pcard__open')).opacity),'btn',await r(p,'.q-pcard__open .q-btn'));
await p.screenshot({path:'prof_hover.png',clip:{x:0,y:30,width:840,height:500}});
await p.click('.q-pgrid--individual .q-pcard .q-profile__name');await p.waitForTimeout(500);
console.log('modal open',await p.evaluate(()=>!!document.querySelector('.q-pmodal__panel')),'panel (1128x486)',await r(p,'.q-pmodal__panel'),'focus',await p.evaluate(()=>document.activeElement.className),'bodyOverflow',await p.evaluate(()=>document.body.style.overflow));
console.log('modal media (320)',await r(p,'.q-pmodal__media'),'label',await r(p,'.q-pmodal__label'),'bio',await r(p,'.q-pmodal__bio'),'close',await r(p,'.q-pmodal__close'),'close svg',await r(p,'.q-pmodal__close svg'));
console.log('modal name',await r(p,'.q-pmodal .q-profile__name'),'role',await r(p,'.q-pmodal .q-profile__role'),'logo',await r(p,'.q-pmodal .q-profile__logo'));
await p.screenshot({path:'prof_modal.png'});
// focus trap: tab through
const seq=[];for(let i=0;i<5;i++){await p.keyboard.press('Tab');seq.push(await p.evaluate(()=>document.activeElement.className.split(' ')[0]));}
console.log('tab order',seq.join(' > '));
await p.keyboard.press('Escape');await p.waitForTimeout(100);
console.log('after esc open?',await p.evaluate(()=>!!document.querySelector('.q-pmodal__panel')),'focus back',await p.evaluate(()=>document.activeElement.className),'bodyOverflow',JSON.stringify(await p.evaluate(()=>document.body.style.overflow)));
// backdrop click
await p.click('.q-pgrid--combined .q-pcard:nth-child(3) .q-profile__name');await p.waitForTimeout(400);
console.log('opened 3rd',await p.evaluate(()=>document.querySelector('.q-pmodal .q-profile__name').textContent));
await p.mouse.click(20,20);await p.waitForTimeout(100);console.log('after backdrop click open?',await p.evaluate(()=>!!document.querySelector('.q-pmodal__panel')));
// chip click shouldn't open
await p.evaluate(()=>{document.querySelector('.q-profile__chip').addEventListener('click',e=>e.preventDefault())});
await p.click('.q-profile__chip');await p.waitForTimeout(100);console.log('after chip click open?',await p.evaluate(()=>!!document.querySelector('.q-pmodal__panel')));
await p.close();
// tablet
p=await page(834,1100,'ProfileGrid.html');await p.evaluate(()=>{document.querySelector('.pv').style.padding='36px'});
console.log('TABLET card (373x448)',await r(p,'.q-pgrid--individual .q-pcard'),'media (341x300)',await r(p,'.q-pgrid--individual .q-pcard__media'),'combined (762x370)',await r(p,'.q-pgrid--combined'),'tile (232.7x222)',await r(p,'.q-pgrid--combined .q-pcard__media'));
await p.click('.q-pgrid--individual .q-pcard .q-profile__name');await p.waitForTimeout(500);
console.log('TABLET modal (809x579)',await r(p,'.q-pmodal__panel'),'media (300)',await r(p,'.q-pmodal__media'),'label x (360)',await r(p,'.q-pmodal__label'));
await p.screenshot({path:'prof_modal_t.png'});await p.close();
// mobile
p=await page(375,812,'ProfileGrid.html');await p.evaluate(()=>{document.querySelector('.pv').style.padding='20px'});
console.log('MOBILE card (335x435)',await r(p,'.q-pgrid--individual .q-pcard'),'media (303x287)',await r(p,'.q-pgrid--individual .q-pcard__media'),'combined w',await r(p,'.q-pgrid--combined'),'2nd tile top delta',(await r(p,'.q-pgrid--combined .q-pcard__media',1))[1]-(await r(p,'.q-pgrid--combined .q-pcard__media',0))[1]);
await p.click('.q-pgrid--individual .q-pcard .q-profile__name');await p.waitForTimeout(500);
console.log('MOBILE modal',await r(p,'.q-pmodal__panel'),'media (343)',await r(p,'.q-pmodal__media'),'name',await r(p,'.q-pmodal .q-profile__name'),'close',await r(p,'.q-pmodal__close'));
await p.screenshot({path:'prof_modal_m.png'});await p.close();
console.log('errors',errs);
await b.close();})();
