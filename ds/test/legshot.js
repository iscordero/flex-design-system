const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1280,height:900}});
await p.goto('file://'+process.cwd()+'/EventCalendar.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const c=p.locator('.q-cal').first();
for(const [i,n] of [[0,'list'],[1,'month']]){await c.locator('.q-cal__viewbtn').nth(i).click();await p.waitForTimeout(200);await p.mouse.move(5,5);const bb=await c.locator('.q-cal__body').boundingBox();await p.screenshot({path:'leg_'+n+'.png',clip:{x:0,y:bb.y,width:1280,height:230}});}
const m=await b.newPage({viewport:{width:375,height:900}});await m.goto('file://'+process.cwd()+'/EventCalendar.html');await m.waitForLoadState('networkidle');await m.evaluate(()=>document.fonts.ready);
const c2=m.locator('.q-cal').first();await c2.locator('.q-cal__viewbtn').nth(1).click();await m.waitForTimeout(200);const lg=c2.locator('.q-cal__legend');await lg.scrollIntoViewIfNeeded();const lb=await lg.boundingBox();await m.screenshot({path:'leg_mob.png',clip:{x:0,y:Math.max(0,lb.y-90),width:375,height:260}});
await b.close()})();
