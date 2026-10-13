const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/accfig.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
const st=()=>p.evaluate(()=>{const r=document.querySelector('#f7');const heads=[...r.querySelectorAll('.q-drawer__head')];
 return {exp:heads.map(h=>h.getAttribute('aria-expanded')).join(','), heights:heads.map(h=>Math.round(h.parentNode.getBoundingClientRect().height)).join(','),
  panels:[...r.querySelectorAll('.q-collapse')].map(c=>getComputedStyle(c).display+':'+(c.getAttribute('aria-hidden')||'shown')).join(','),
  chev:[...r.querySelectorAll('.q-drawer__chevron')].map(c=>getComputedStyle(c).visibility[0]).join(''),
  panelBox:(()=>{const c=r.querySelector('.q-collapse.is-open');const bb=c.getBoundingClientRect();return [Math.round(bb.x),Math.round(bb.y-r.getBoundingClientRect().y),Math.round(bb.width),Math.round(bb.height)]})(),
  listW:Math.round(heads[0].getBoundingClientRect().width), secH:Math.round(r.getBoundingClientRect().height)}});
console.log('initial',JSON.stringify(await st()));
const heads=await p.$$('#f7 .q-drawer__head');
await heads[2].click(); console.log('click 3rd',JSON.stringify(await st()));
await heads[2].click(); console.log('click 3rd again',JSON.stringify(await st()));
await heads[4].hover(); console.log('hover bg', await p.evaluate(()=>getComputedStyle(document.querySelectorAll('#f7 .q-drawer__head')[4]).backgroundColor));
await p.screenshot({path:'acclist_hover.png',clip:{x:0,y:(await (await p.$('#f7')).boundingBox()).y,width:1440,height:440}});
// keyboard
await heads[0].focus(); await p.keyboard.press('Enter'); console.log('enter on 1st',JSON.stringify((await st()).exp));
await p.keyboard.press('Tab'); console.log('tab ->', await p.evaluate(()=>document.activeElement.className+' | '+document.activeElement.textContent.slice(0,20)));
await p.keyboard.press('Tab'); console.log('tab ->', await p.evaluate(()=>document.activeElement.className+' | '+document.activeElement.textContent.slice(0,30)));
// tall content: make the open panel much taller
await p.evaluate(()=>{const t=document.querySelector('#f7 .q-collapse.is-open .q-drawer__text');t.innerHTML+=t.innerHTML+t.innerHTML;});
console.log('tall',JSON.stringify(await st()));
// accordion (non-list) can still close
const h1=await p.$('#f1 .q-drawer__head'); await h1.click(); console.log('f1 after close', await p.evaluate(()=>[...document.querySelectorAll('#f1 .q-drawer__head')].map(h=>h.getAttribute('aria-expanded')).join(',')));
console.log(errs);await b.close()})();
