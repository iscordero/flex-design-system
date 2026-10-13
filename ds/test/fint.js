const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
async function page(w,h,f){const p=await b.newPage({viewport:{width:w,height:h}});p.on('pageerror',e=>errs.push(f+': '+e.message));p.on('console',m=>{if(m.type()==='error')errs.push(f+': '+m.text())});await p.goto('file://'+process.cwd()+'/'+f);await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);return p;}
const txt=(p,sel)=>p.evaluate(s=>[...document.querySelectorAll(s)].map(e=>e.textContent),sel);
let p=await page(415,700,'AppliedFilters.html');
console.log('chips',(await txt(p,'.q-applied__chips > *')).join(' | '),'|| results',await txt(p,'.q-applied__results'));
await p.click('.q-chip__x >> nth=1');
console.log('after remove 2nd',(await txt(p,'.q-applied__chips > *')).join(' | '),'||',await txt(p,'.q-applied__results'));
console.log('x aria',await p.evaluate(()=>document.querySelector('.q-chip__x').getAttribute('aria-label')),'more aria',await p.evaluate(()=>document.querySelector('.q-chip--more').getAttribute('aria-label')));
await p.click('.q-filterbtn');await p.waitForTimeout(450);
console.log('drawer open',await p.evaluate(()=>{const d=document.querySelector('.q-fdrawer [role=dialog]');const b=d.getBoundingClientRect();return [d.getAttribute('aria-label'),d.getAttribute('aria-modal'),b.x,b.y,b.width,b.height,document.activeElement.className,document.body.style.overflow]}));
await p.screenshot({path:'f_open.png'});
console.log('checked in drawer',await p.evaluate(()=>[...document.querySelectorAll('.q-fdrawer input:checked')].length));
// expand more
await p.click('.q-fdrawer__more >> nth=0');console.log('rows after more',await p.evaluate(()=>document.querySelectorAll('.q-fdrawer__section')[0].querySelectorAll('.q-fdrawer__row').length),await txt(p,'.q-fdrawer__more'));
// clear all section 1, then close without applying
await p.click('.q-fdrawer__head .q-textlink >> nth=0');console.log('checked after clear section',await p.evaluate(()=>[...document.querySelectorAll('.q-fdrawer input:checked')].length));
await p.keyboard.press('Escape');await p.waitForTimeout(100);
console.log('closed',await p.evaluate(()=>!document.querySelector('.q-fdrawer')),'chips unchanged',(await txt(p,'.q-applied__chips > *')).join(' | '),'focus back',await p.evaluate(()=>document.activeElement.className),'overflow',JSON.stringify(await p.evaluate(()=>document.body.style.overflow)));
// open via +more, tick one, apply
await p.click('.q-chip--more');await p.waitForTimeout(400);
await p.click('.q-fdrawer__row >> nth=1');   // Essential Learning toggles (was checked? it is in value) 
await p.click('.q-fdrawer__foot .q-btn');await p.waitForTimeout(150);
console.log('after apply closed',await p.evaluate(()=>!document.querySelector('.q-fdrawer')),(await txt(p,'.q-applied__chips > *')).join(' | '),'||',await txt(p,'.q-applied__results'));
// backdrop
await p.click('.q-filterbtn');await p.waitForTimeout(400);await p.mouse.click(5,5);await p.waitForTimeout(100);console.log('backdrop closes',await p.evaluate(()=>!document.querySelector('.q-fdrawer')));
// focus trap
await p.click('.q-filterbtn');await p.waitForTimeout(400);const seq=[];for(let i=0;i<4;i++){await p.keyboard.press('Shift+Tab');seq.push(await p.evaluate(()=>(document.activeElement.className||document.activeElement.tagName).split(' ')[0]));}console.log('shift-tab',seq.join(' > '),'inside',await p.evaluate(()=>!!document.activeElement.closest('.q-fdrawer')));
await p.close();
p=await page(1100,600,'FilterBar.html');
console.log('menu width now',await p.evaluate(()=>document.querySelector('.q-filter__menu').getBoundingClientRect().width),'reset disabled?',await p.evaluate(()=>document.querySelector('.q-filterbar__row .q-textlink').disabled));
await p.click('.q-filterbar__row .q-textlink');console.log('after reset checked',await p.evaluate(()=>document.querySelectorAll('.q-filter__menu input:checked').length),'reset disabled',await p.evaluate(()=>document.querySelector('.q-filterbar__row .q-textlink').disabled));
await p.keyboard.press('Escape');
await p.click('.q-filterbar__mobile .q-filter__trigger');await p.waitForTimeout(400);
console.log('mobile drawer',await p.evaluate(()=>{const d=document.querySelector('.q-fdrawer');return d?[d.className,d.querySelectorAll('.q-fdrawer__section').length,d.querySelectorAll('input:checked').length,d.querySelector('.q-fdrawer__foot .q-textlink').disabled]:null}));
await p.screenshot({path:'fb_open.png'});
await p.click('.q-fdrawer__foot .q-textlink');console.log('reset in drawer → checked',await p.evaluate(()=>document.querySelectorAll('.q-fdrawer input:checked').length));
await p.click('.q-fdrawer__close');await p.waitForTimeout(100);
await p.close();
// auto layout
p=await page(375,700,'FilterBar.html');await p.evaluate(()=>{});
console.log('errs',errs);await b.close()})();
