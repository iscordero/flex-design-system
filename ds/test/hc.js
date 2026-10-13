const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1100,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/HoverCard.html');await p.waitForLoadState('networkidle');
const tile=p.locator('.tile').first();await tile.hover();await p.waitForTimeout(500);
let n=await p.locator('.q-hcard__card[role=dialog]').count();console.log('after hover open:',n, await tile.getAttribute('aria-expanded'));
await p.screenshot({path:'/tmp/hc1.png',clip:{x:0,y:560,width:1100,height:430}});
// move into card, still open
const card=p.locator('.q-hcard__card[role=dialog]');await card.hover();await p.waitForTimeout(400);console.log('still open on card:',await card.count());
await p.mouse.move(900,100);await p.waitForTimeout(500);console.log('after leave:',await p.locator('.q-hcard__card[role=dialog]').count());
// click avatar
const av=p.locator('.q-hcard__trigger').first();await av.click();await p.waitForTimeout(300);console.log('click open:',await p.locator('.q-hcard__card[role=dialog]').count());
await p.mouse.move(900,100);await p.waitForTimeout(500);console.log('pinned after leave:',await p.locator('.q-hcard__card[role=dialog]').count());
await p.screenshot({path:'/tmp/hc2.png',clip:{x:0,y:560,width:1100,height:430}});
await p.keyboard.press('Escape');await p.waitForTimeout(200);console.log('after esc:',await p.locator('.q-hcard__card[role=dialog]').count());
// keyboard
await av.focus();await p.keyboard.press('Enter');await p.waitForTimeout(300);
console.log('kbd open:',await p.locator('.q-hcard__card[role=dialog]').count(),'focus in card:',await p.evaluate(()=>{const c=document.querySelector('.q-hcard__card[role=dialog]');return c&&c.contains(document.activeElement)?document.activeElement.className||document.activeElement.tagName:'no'}));
await p.keyboard.press('Tab');await p.waitForTimeout(100);await p.keyboard.press('Tab');await p.waitForTimeout(200);
console.log('after tabs:',await p.locator('.q-hcard__card[role=dialog]').count(),'focus:',await p.evaluate(()=>document.activeElement.className));
// click outside
await av.click();await p.waitForTimeout(200);await p.mouse.click(1000,50);await p.waitForTimeout(200);console.log('outside click:',await p.locator('.q-hcard__card[role=dialog]').count());
console.log(errs);await b.close()})();
