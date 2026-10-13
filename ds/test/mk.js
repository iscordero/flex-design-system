const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for(const n of ['Marker','Flag','Tabs']){const p=await b.newPage({viewport:{width:1100,height:400},deviceScaleFactor:2});
await p.goto('file://'+process.cwd()+'/'+n+'.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(200);await p.screenshot({path:'mk_'+n+'.png',fullPage:true});await p.close()}
await b.close()})();
