const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
for(const w of [375,768]){const p=await b.newPage({viewport:{width:w,height:900}});p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/FormM.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(200);
const M=await p.evaluate(()=>[...document.querySelectorAll('.q-form')].slice(0,5).map(f=>{const F=f.getBoundingClientRect();const cs=getComputedStyle(f.querySelector('.q-form__body'));const t=getComputedStyle(f.querySelector('.q-form__title'));const btn=f.querySelector('.q-form__submit').getBoundingClientRect();return [Math.round(F.width),+F.height.toFixed(1),cs.padding,t.fontSize,Math.round(btn.width)].join(' / ')}));
console.log(w,M.join('\n   '),'scrollW',await p.evaluate(()=>document.documentElement.scrollWidth));
if(w===375)await p.screenshot({path:'formmob.png',clip:{x:0,y:0,width:375,height:900}});}
console.log('errs',errs);await b.close()})();
