const {chromium}=require('playwright');(async()=>{const [c,w,hh,out,hoverSel,clickSel]=[process.argv[2],+process.argv[3],+process.argv[4],process.argv[5],process.argv[6],process.argv[7]];
const b=await chromium.launch();const p=await b.newPage({viewport:{width:w,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/'+c+'.html');await p.waitForLoadState('networkidle');await p.waitForTimeout(300);
if(clickSel&&clickSel!=='-'){await p.locator(clickSel).last().click();await p.waitForTimeout(400)}
if(hoverSel&&hoverSel!=='-'){await p.locator(hoverSel).last().hover();await p.waitForTimeout(500)}
const H=await p.evaluate(()=>document.documentElement.scrollHeight);console.log(c,H,errs);
await p.screenshot({path:out,fullPage:true,clip:{x:0,y:Math.max(0,H-hh),width:w,height:Math.min(hh,H)}});await b.close()})();
