const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const w of [834,600]){const p=await b.newPage({viewport:{width:w,height:900}});
await p.goto('file://'+process.cwd()+'/EventCalendar.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(200);
const c=p.locator('.q-cal').first();await c.screenshot({path:'cal_w'+w+'.png'});
const l=p.locator('.q-cal').nth(1);const bb=await l.boundingBox();await p.screenshot({path:'cal_l'+w+'.png',fullPage:true,clip:{x:0,y:bb.y,width:w,height:700}});
const g=p.locator('.q-cal').nth(2);const gb=await g.boundingBox();await p.screenshot({path:'cal_g'+w+'.png',fullPage:true,clip:{x:0,y:gb.y,width:w,height:900}});
console.log(w,await p.evaluate(()=>document.documentElement.scrollWidth));await p.close()}
await b.close()})();
