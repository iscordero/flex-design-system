const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
// accordion list
let p=await b.newPage({viewport:{width:1440,height:900}});await p.goto('file://'+process.cwd()+'/AccordionModule.html');await p.waitForLoadState('networkidle');
const list=p.locator('.q-accmod--list').first();await list.scrollIntoViewIfNeeded();
const heads=list.locator('.q-drawer__head');console.log('rows',await heads.count());await heads.nth(3).hover();await p.waitForTimeout(400);
const bb=await list.boundingBox();await p.screenshot({path:'/tmp/st_acc.png',clip:{x:0,y:bb.y,width:1440,height:Math.min(bb.height,520)}});
console.log('open bg',await heads.nth(0).evaluate(e=>getComputedStyle(e).backgroundColor),'hover bg',await heads.nth(3).evaluate(e=>getComputedStyle(e).backgroundColor));
await p.close();
// nav mega
p=await b.newPage({viewport:{width:1440,height:900}});await p.goto('file://'+process.cwd()+'/Nav.html');await p.waitForLoadState('networkidle');
const items=p.locator('.q-mega__item');console.log('mega items',await items.count());
if(await items.count()){const it=items.nth(2);await it.scrollIntoViewIfNeeded();await it.hover();await p.waitForTimeout(300);const r=await items.nth(0).boundingBox();
await p.screenshot({path:'/tmp/st_nav.png',clip:{x:Math.max(0,r.x-40),y:r.y-60,width:520,height:420}});}
await p.close();
p=await b.newPage({viewport:{width:1440,height:900}});await p.goto('file://'+process.cwd()+'/DemoRequestWizard.html');await p.waitForLoadState('networkidle');
console.log('wizard bg',await p.locator('.q-wizard').first().evaluate(e=>getComputedStyle(e).backgroundColor));await p.screenshot({path:'/tmp/st_wiz.png',clip:{x:0,y:0,width:1440,height:620}});await p.close();
p=await b.newPage({viewport:{width:1440,height:900}});await p.goto('file://'+process.cwd()+'/ExitIntent.html');await p.waitForLoadState('networkidle');
console.log('exit bg',await p.locator('.q-exit').first().evaluate(e=>getComputedStyle(e).backgroundColor));await p.screenshot({path:'/tmp/st_exit.png',clip:{x:0,y:0,width:1440,height:520}});await p.close();
await b.close()})();
