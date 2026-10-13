// node multi.js out.png Comp[:width[:y:h]] ...   stacks screenshots vertically
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const out=process.argv[2];const b=await chromium.launch();const shots=[];
for(const spec of process.argv.slice(3)){const [c,w,y,hh]=spec.split(':');const W=+(w||1100);const p=await b.newPage({viewport:{width:W,height:100}});
await p.goto('file://'+process.cwd()+'/'+c+'.html');await p.waitForLoadState('networkidle');await p.waitForTimeout(250);
const H=await p.evaluate(()=>Math.ceil(document.body.getBoundingClientRect().height)||document.documentElement.scrollHeight);
const buf=await p.screenshot({fullPage:true,clip:{x:0,y:+(y||0),width:W,height:Math.min(+(hh||H),H-(+(y||0)))}});shots.push({c,buf,H});console.log(c,H);await p.close()}
const p=await b.newPage({viewport:{width:1200,height:800}});
await p.setContent('<body style="margin:0;background:#888">'+shots.map(s=>`<div style="font:12px sans-serif;color:#fff;padding:2px 6px">${s.c} (h ${s.H})</div><img style="display:block;max-width:1200px" src="data:image/png;base64,${s.buf.toString('base64')}">`).join('')+'</body>');
await p.waitForTimeout(300);await p.screenshot({path:out,fullPage:true});await b.close()})();
