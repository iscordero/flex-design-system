const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1248,height:1200}});await p.goto('file://'+process.cwd()+'/ProfileModal.html');await p.waitForLoadState('networkidle');
console.log(await p.evaluate(()=>{const a=document.querySelector('.q-pmodal__links .q-social--plain');return [getComputedStyle(a).color,getComputedStyle(document.querySelector('.q-pmodal__label')).color]}));
await p.hover('.q-pmodal__links .q-social--plain');await p.waitForTimeout(250);console.log('hover',await p.evaluate(()=>getComputedStyle(document.querySelector('.q-pmodal__links .q-social--plain')).color));
const el=await p.$$('.q-pmodal__panel');await el[1].screenshot({path:'grey_modal.png'});await b.close()})();
