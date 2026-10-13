const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1440,height:1000}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/Nav.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(200);
const info=(n)=>p.evaluate((n)=>{const nav=document.querySelectorAll('.q-nav')[n];const bar=nav.querySelector('.q-nav__bar');const d=nav.querySelector('.q-nav__desktop').getBoundingClientRect();const B=bar.getBoundingClientRect();const open=nav.querySelector('.q-nav__link.is-open');const cur=nav.querySelector('.q-nav__left .q-nav__link.is-current');const L=cur?cur.getBoundingClientRect():null;return {cls:bar.className,op:getComputedStyle(bar).opacity,bar:[+(B.x-d.x).toFixed(1),+(B.y-d.y).toFixed(1),+B.width.toFixed(1),B.height],link:L?[+(L.x-d.x).toFixed(1),+(L.bottom-d.y).toFixed(1),+L.width.toFixed(1)]:null,open:open?open.textContent:null,deskH:d.height}},n);
const count=3;
for(let n=0;n<count;n++)console.log(n,JSON.stringify(await info(n)));
// interact with the first nav: hover each item in turn
const links=p.locator('.q-nav').nth(0).locator('.q-nav__left .q-nav__link');const k=await links.count();
for(let i=0;i<k;i++){await links.nth(i).hover();await p.waitForTimeout(60);const mid=await info(0);await p.waitForTimeout(400);const end=await info(0);console.log('hover',i,'mid',JSON.stringify(mid.bar),mid.cls,'end',JSON.stringify(end.bar),JSON.stringify(end.link),end.open);}
// click keeps it; leave the bar
await links.nth(2).click();await p.waitForTimeout(400);console.log('click2',JSON.stringify(await info(0)));
await p.mouse.move(700,900);await p.waitForTimeout(500);console.log('left',JSON.stringify(await info(0)));
await links.nth(4).hover();await p.waitForTimeout(40);console.log('re-enter mid',JSON.stringify(await info(0)));await p.waitForTimeout(400);console.log('re-enter end',JSON.stringify(await info(0)));
await p.screenshot({path:'navbar.png',clip:{x:0,y:0,width:1440,height:200}});
// keyboard
await p.mouse.move(700,900);await p.waitForTimeout(300);await links.nth(1).focus();await p.keyboard.press('Enter');await p.waitForTimeout(400);console.log('kbd open',JSON.stringify(await info(0)));await p.keyboard.press('Escape');await p.waitForTimeout(300);console.log('kbd esc',JSON.stringify(await info(0)));
console.log('errs',errs);await b.close()})();
