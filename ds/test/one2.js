const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:960,height:320},deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/Cover.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
await p.screenshot({path:'cover2x.png'});
console.log(await p.evaluate(()=>{const r=s=>{const b=document.querySelector(s).getBoundingClientRect();return [Math.round(b.x),Math.round(b.y),Math.round(b.width),Math.round(b.height)]};return {logo:r('.logo'),tag:r('.q-tag'),name:r('.name'),tagline:r('.tagline'),site:r('.site')}}), errs);
await p.mouse.move(600,170);await p.waitForTimeout(450);await p.screenshot({path:'cover2x_h.png'});
await b.close();})();
