const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1200,height:900},deviceScaleFactor:2});
await p.goto('file://'+process.cwd()+'/EventCard.html');await p.waitForLoadState('networkidle');await p.waitForTimeout(200);
const card=p.locator('a.q-card').first();const out=card.locator('.q-card__out');
const b0=await out.boundingBox();await card.hover();await p.waitForTimeout(350);const b1=await out.boundingBox();
console.log('moved',(b1.x-b0.x).toFixed(1),(b1.y-b0.y).toFixed(1),await out.evaluate(e=>getComputedStyle(e).transitionDuration));
const cb=await card.boundingBox();await p.screenshot({path:'outl.png',clip:{x:cb.x,y:cb.y+cb.height-90,width:cb.width,height:100}});
await b.close()})();
