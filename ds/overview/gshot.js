const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:560,height:900},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/gviz.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(500);
const pre=process.argv[2]||'';const ids=(await p.$$eval('.viz',e=>e.map(x=>x.id))).filter(i=>i.startsWith(pre));const out=[];
for(const id of ids){const el=await p.$('#'+id);const bb=await el.boundingBox();await el.screenshot({path:'gpng/'+id+'.png',omitBackground:true});out.push(id+' '+Math.round(bb.height));
 const ov=await el.evaluate(e=>{const r=e.getBoundingClientRect();return [...e.querySelectorAll('*')].filter(c=>{const q=c.getBoundingClientRect();return q.width>0&&(q.right>r.right-19.5||q.left<r.left+19.5)&&!c.closest('[data-bleed]')}).length});if(ov)out.push('   !! '+id+' has '+ov+' elements past the padding');}
console.log(out.join('\n'));console.log('errs',errs.slice(0,6));await b.close()})();
