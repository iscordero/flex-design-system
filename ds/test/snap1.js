// usage: node snap1.js Comp [width] [out] [clipY clipH]
const {chromium}=require('playwright');(async()=>{const [c,w,out,y,hh]=[process.argv[2],+(process.argv[3]||1440),process.argv[4]||('/tmp/'+process.argv[2]+'.png'),process.argv[5],process.argv[6]];
const b=await chromium.launch();const p=await b.newPage({viewport:{width:w,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/'+c+'.html');await p.waitForLoadState('networkidle');await p.waitForTimeout(300);
const h=await p.evaluate(()=>document.documentElement.scrollHeight);console.log(c,'height',h,errs.slice(0,3));
if(y!==undefined)await p.screenshot({path:out,clip:{x:0,y:+y,width:w,height:+hh},fullPage:true});else await p.screenshot({path:out,fullPage:true});await b.close()})();
