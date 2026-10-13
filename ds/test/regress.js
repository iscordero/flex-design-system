const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch();
const pages=fs.readdirSync('.').filter(f=>/^[A-Z]\w+\.html$/.test(f));let bad=0;
for(const f of pages){const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/'+f);await p.waitForLoadState('networkidle');await p.waitForTimeout(150);
const r=await p.evaluate(()=>({h:document.documentElement.scrollHeight,sw:document.documentElement.scrollWidth,n:document.body.querySelectorAll('*').length}));
if(errs.length||r.n<10||r.sw>1440){bad++;console.log('!!',f,JSON.stringify(r),errs.slice(0,2))}await p.close()}
console.log('pages',pages.length,'bad',bad);await b.close()})();
