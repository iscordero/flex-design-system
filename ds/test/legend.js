const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const w of [1440,900,375]){const p=await b.newPage({viewport:{width:w,height:1000}});
await p.goto('file://'+process.cwd()+'/EventCalendar.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const c=p.locator('.q-cal').first();
const m=async v=>{const btn=c.locator('.q-cal__viewbtn[aria-label]').nth(v);await btn.click();await p.waitForTimeout(150);
 return c.evaluate(el=>{const r=e=>e.getBoundingClientRect();const head=r(el.querySelector('.q-cal__head'));const t=r(el.querySelector('.q-cal__title'));const lg=el.querySelector('.q-cal__legend');if(!lg||getComputedStyle(lg).display==='none')return {legend:null};const L=r(lg);const nxt=el.querySelector('.q-cal__month, .q-cal__list');const N=r(nxt);
  const items=[...lg.children].map(li=>{const mark=li.querySelector('.q-cal__swatch, svg');const range=document.createRange();const tn=[...li.querySelectorAll('*')].reverse().find(x=>x.childNodes.length===1&&x.firstChild.nodeType===3)||li;const txt=document.createTreeWalker(li,NodeFilter.SHOW_TEXT).nextNode();range.selectNodeContents(txt);const tr=range.getBoundingClientRect();return {markX:Math.round(r(mark).left-t.left),markW:Math.round(r(mark).width),textX:Math.round(tr.left-t.left),textMidY:Math.round((tr.top+tr.bottom)/2-head.bottom)}});
  return {view:el.className.match(/q-cal--(\w+)/)[1],legendLeft:Math.round(L.left-t.left),legendTopFromHead:Math.round(L.top-head.bottom),legendH:Math.round(L.height),toContent:Math.round(N.top-L.bottom),contentTopFromHead:Math.round(N.top-head.bottom),order:getComputedStyle(lg).order,items}})};
console.log(w,'LIST ',JSON.stringify(await m(0)));console.log(w,'MONTH',JSON.stringify(await m(1)));await p.close();}
await b.close()})();
