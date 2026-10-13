const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];const p=await b.newPage({viewport:{width:1100,height:400}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/FilterDropdown.html');await p.waitForLoadState('networkidle');
const sel=()=>p.evaluate(()=>{const m=[...document.querySelectorAll('.q-filter__menu')].find(x=>x.querySelector('input[type=radio]'));return [m.querySelectorAll('input[type=radio]').length,[...m.querySelectorAll('input')].map(i=>i.checked?1:0).join(''),m.getBoundingClientRect().width]});
console.log('radio menu',await sel());await p.click('.q-filter__menu >> nth=1 >> .q-radio >> nth=0');console.log('after pick first',await sel());
// keyboard: open first dropdown with Enter, Esc closes
await p.focus('.q-filter__trigger >> nth=0');await p.keyboard.press('Enter');console.log('open',await p.evaluate(()=>document.querySelectorAll('.q-filter__trigger')[0].getAttribute('aria-expanded')),'rows',await p.evaluate(()=>document.querySelectorAll('.q-filter')[0].querySelectorAll('li').length));
await p.keyboard.press('Escape');console.log('closed',await p.evaluate(()=>document.querySelectorAll('.q-filter__trigger')[0].getAttribute('aria-expanded')));
await p.screenshot({path:'fdd.png'});console.log(errs);await b.close()})();
