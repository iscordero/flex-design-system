const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1440,height:1000}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/Nav.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const info=(n)=>p.evaluate((n)=>{const nav=document.querySelectorAll('.q-nav')[n];const bar=nav.querySelector('.q-nav__bar');const d=nav.querySelector('.q-nav__desktop').getBoundingClientRect();const B=bar.getBoundingClientRect();const open=nav.querySelector('.q-nav__link.is-open');return {cls:bar.className.replace('q-nav__bar','').trim(),op:(+getComputedStyle(bar).opacity).toFixed(2),bar:[+(B.x-d.x).toFixed(1),+B.width.toFixed(1)],links:[...nav.querySelectorAll('.q-nav__left .q-nav__link')].map(l=>{const L=l.getBoundingClientRect();return +(L.x-d.x).toFixed(1)+'/'+ +L.width.toFixed(1)}).join(' '),open:open?open.textContent:null}},n);
console.log('start',JSON.stringify(await info(0)));
const links=p.locator('.q-nav').nth(0).locator('.q-nav__left .q-nav__link');
for(const i of [1,3,5,0,2]){await links.nth(i).click();await p.waitForTimeout(100);const mid=await info(0);await p.waitForTimeout(400);const end=await info(0);console.log('click',i,'mid',JSON.stringify(mid.bar),'end',JSON.stringify(end.bar),end.cls,end.open);if(i===1)await p.screenshot({path:'navbar.png',clip:{x:0,y:0,width:1440,height:240}});}
// third nav (community, current=Discussions)
const c=p.locator('.q-nav').nth(2).locator('.q-nav__left .q-nav__link');console.log('comm start',JSON.stringify(await info(2)));
await c.nth(3).click();await p.waitForTimeout(100);console.log('comm mid',JSON.stringify((await info(2)).bar));await p.waitForTimeout(400);console.log('comm end',JSON.stringify(await info(2)));
// resize keeps it aligned
await p.setViewportSize({width:1280,height:1000});await p.waitForTimeout(500);console.log('1280',JSON.stringify(await info(0)));
console.log('errs',errs);await b.close()})();
