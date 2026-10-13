const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const w of [900,600]){const p=await b.newPage({viewport:{width:w,height:900}});
await p.goto('file://'+process.cwd()+'/cmpcards.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
await p.evaluate((w)=>{document.querySelector('#root > div').style.width='auto';for(const id of ['e320','w320','b320','p269','p184']){document.getElementById(id).style.width=(w>700?'600px':'331px');}; for(const d of [...document.querySelectorAll('#root > div > div')]) if(!['e320','w320','p269','p184'].includes(d.id)) d.style.display='none';},w);
await p.screenshot({path:'resp'+w+'.png',fullPage:true});
console.log(w, await p.evaluate(()=>['e320','w320','p269','p184'].map(id=>id+'='+Math.round(document.getElementById(id).firstElementChild.getBoundingClientRect().height))));await p.close();}
const p=await b.newPage({viewport:{width:1300,height:900}});await p.goto('file://'+process.cwd()+'/EventCard.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
await p.hover('a.q-card');await p.waitForTimeout(500);await p.screenshot({path:'hovercard.png',clip:{x:0,y:30,width:780,height:440}});
await b.close();})();
