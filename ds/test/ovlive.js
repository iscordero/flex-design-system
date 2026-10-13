const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1280,height:800}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/ovlive.html');await p.waitForLoadState('networkidle');
const st=()=>p.evaluate(()=>{const m=[...document.querySelectorAll('.q-modal')].filter(e=>!e.classList.contains('q-modal--inline'));const a=document.activeElement;return {modals:m.length,cls:m.map(e=>e.className).join(' | '),role:m.map(e=>{const r=e.querySelector('[role]');return r&&r.getAttribute('role')+'/'+r.getAttribute('aria-modal')+'/'+!!r.getAttribute('aria-labelledby')}).join(','),active:a?(a.id||a.className||a.tagName)+':'+(a.textContent||a.getAttribute('aria-label')||'').slice(0,20):null,inside:!!(a&&a.closest('.q-modal')),overflow:document.body.style.overflow||getComputedStyle(document.documentElement).overflow,log:window.LOG.slice()}});
const T=async(name,f)=>{try{const r=await f();console.log(name,JSON.stringify(r))}catch(e){console.log(name,'ERR',e.message.split('\n')[0])}};
// Modal
await p.click('#modal');await p.waitForTimeout(350);await T('modal open',st);
for(let i=0;i<6;i++)await p.keyboard.press('Tab');await T('modal after 6 tabs',st);
await p.keyboard.press('Shift+Tab');await T('modal shift-tab',st);
await p.keyboard.press('Escape');await p.waitForTimeout(350);await T('modal after esc',st);
await p.click('#modal');await p.waitForTimeout(350);await p.mouse.click(10,10);await p.waitForTimeout(350);await T('modal after overlay click',st);
await p.click('#modalLocked');await p.waitForTimeout(350);await p.keyboard.press('Escape');await p.mouse.click(10,10);await p.waitForTimeout(350);await T('locked after esc+overlay',st);
await p.evaluate(()=>{const c=document.querySelector('.q-modal:not(.q-modal--inline) .q-modal__close');return !!c}).then(v=>console.log('locked has close?',v));
await p.click('.q-modal:not(.q-modal--inline) .q-btn');await p.waitForTimeout(350);
// Alert
await p.click('#alert');await p.waitForTimeout(350);await T('alert open',st);await p.keyboard.press('Escape');await p.mouse.click(10,10);await p.waitForTimeout(300);await T('alert after esc+overlay',st);
await p.click('.q-modal:not(.q-modal--inline) .q-btn--primary');await p.waitForTimeout(350);await T('alert confirmed',st);
// Session
await p.click('#session');await p.waitForTimeout(300);console.log('clock',await p.textContent('.q-notice__clock'));await p.waitForTimeout(1100);console.log('clock+1s',await p.textContent('.q-notice__clock'));await p.keyboard.press('Escape');await p.waitForTimeout(2600);await T('session after expiry',st);console.log('title',await p.textContent('.q-modal:not(.q-modal--inline) .q-modal__title'));
await p.click('.q-modal:not(.q-modal--inline) .q-btn');await p.waitForTimeout(350);await T('session closed',st);
// Success
await p.click('#success');await p.waitForTimeout(350);await T('success open',st);await p.keyboard.press('Escape');await p.waitForTimeout(350);await T('success after esc',st);
// Exit
await p.click('#exit');await p.waitForTimeout(350);await T('exit open',st);await p.click('.q-modal:not(.q-modal--inline) .q-btn--primary');await p.waitForTimeout(150);console.log('exit empty submit -> still open',await p.$$eval('.q-exit',e=>e.length), 'invalid', await p.$$eval('.q-exit [aria-invalid="true"]',e=>e.length));await p.focus('.q-modal:not(.q-modal--inline) input');await p.keyboard.type('a@b.co');await p.keyboard.press('Enter');await p.waitForTimeout(350);await T('exit submitted',st);
// Wizard
await p.click('#wizard');await p.waitForTimeout(350);await T('wizard open',st);
await p.click('.q-wizard__foot .q-btn--primary');await p.waitForTimeout(200);console.log('wizard step after empty continue:',await p.textContent('.q-wizard__info'),'| invalid:',await p.evaluate(()=>document.querySelectorAll('.q-modal:not(.q-modal--inline) [aria-invalid="true"], .q-modal:not(.q-modal--inline) .is-error, .q-modal:not(.q-modal--inline) .is-invalid').length));
const ins=await p.$$('.q-modal:not(.q-modal--inline) input');await ins[0].fill('Ada');await ins[1].fill('ada@x.com');
await p.click('.q-wizard__foot .q-btn--primary');await p.waitForTimeout(250);console.log('wizard step 2:',await p.textContent('.q-wizard__info'));await T('wizard step2 focus',st);
await p.click('.q-wizard__foot .q-btn--secondary');await p.waitForTimeout(200);console.log('back:',await p.textContent('.q-wizard__info'),'| kept value:',await p.inputValue('.q-modal:not(.q-modal--inline) input'));
await p.click('.q-wizard__foot .q-btn--primary');await p.waitForTimeout(200);
await p.fill('.q-modal:not(.q-modal--inline) input','Acme');await p.click('.q-wizard__foot .q-btn--primary');await p.waitForTimeout(300);
console.log('wizard done title:',await p.textContent('.q-modal:not(.q-modal--inline) .q-modal__title'));await T('wizard done',st);
await p.click('.q-wizard__foot .q-btn');await p.waitForTimeout(350);await T('wizard closed',st);await p.click('#wizard');await p.waitForTimeout(350);console.log('wizard reopened at:',await p.textContent('.q-modal:not(.q-modal--inline) .q-modal__title'),'| value:',JSON.stringify(await p.inputValue('.q-modal:not(.q-modal--inline) input')));await p.keyboard.press('Escape');await p.waitForTimeout(300);
// Form modal
await p.click('#form');await p.waitForTimeout(350);await T('form open',st);await p.keyboard.press('Escape');await p.waitForTimeout(300);
// Cookie
await p.click('#cookie');await p.waitForTimeout(500);console.log('cookie',await p.evaluate(()=>{const c=document.querySelector('.q-cookie');const r=c&&c.getBoundingClientRect();return c?{role:c.getAttribute('role'),label:c.getAttribute('aria-label'),bottom:Math.round(innerHeight-r.bottom),h:Math.round(r.height),pos:getComputedStyle(c).position,z:getComputedStyle(c).zIndex}:null}));
await p.keyboard.press('Escape');await p.waitForTimeout(200);console.log('cookie still there after esc',await p.$$eval('.q-cookie',e=>e.length));
await p.click('.q-cookie .q-btn--secondary');await p.waitForTimeout(300);await T('cookie declined',st);
await p.click('#cookieX');await p.waitForTimeout(350);await T('cookie panel open',st);await p.keyboard.press('Escape');await p.mouse.click(10,10);await p.waitForTimeout(300);await T('cookie panel after esc+overlay',st);
await p.click('.q-cookiepanel .q-toggle >> nth=1');await p.click('.q-cookiepanel__foot .q-btn--secondary');await p.waitForTimeout(300);await T('cookie saved',st);
// Toasts
await p.click('#tE');await p.click('#tS');await p.click('#tI');await p.click('#tS');await p.waitForTimeout(400);
console.log('toasts',await p.evaluate(()=>{const s=document.querySelector('.q-toasts');const r=s.getBoundingClientRect();return {n:s.querySelectorAll('.q-toast').length,roles:[...s.querySelectorAll('.q-toast')].map(t=>t.getAttribute('role')+':'+t.textContent),left:Math.round(r.left),bottom:Math.round(innerHeight-r.bottom),z:getComputedStyle(s).zIndex}}));
await p.waitForTimeout(2200);console.log('toasts after 2.2s',await p.$$eval('.q-toasts .q-toast',e=>e.map(t=>t.textContent)));
await p.waitForTimeout(2000);console.log('toasts after 4.2s',await p.$$eval('.q-toasts .q-toast',e=>e.map(t=>t.textContent)));
await p.click('.q-toast__close');await p.waitForTimeout(300);console.log('toasts after close',await p.$$eval('.q-toasts .q-toast',e=>e.length),(await st()).log.filter(x=>x.startsWith('dis')));
// Tooltip
const vis=()=>p.evaluate(()=>{const t=document.querySelector('.q-tip__bubble');if(!t)return null;const c=getComputedStyle(t);return {op:c.opacity,vis:c.visibility,role:t.getAttribute('role'),id:t.id,desc:document.getElementById('tipbtn').getAttribute('aria-describedby'),cls:t.parentElement.className}});
console.log('tip idle',await vis());await p.hover('#tipbtn');await p.waitForTimeout(100);console.log('tip 100ms',await vis());await p.waitForTimeout(500);console.log('tip 600ms',await vis());
await p.keyboard.press('Escape');await p.waitForTimeout(250);console.log('tip after esc',await vis());
await p.mouse.move(5,5);await p.waitForTimeout(300);await p.focus('#tipbtn');await p.waitForTimeout(500);console.log('tip on focus',await vis());
console.log('errors',errs);
await b.close()})();
