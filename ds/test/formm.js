const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1440,height:3200}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/Form.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const M=await p.evaluate(()=>[...document.querySelectorAll('.q-form')].map(f=>{const F=f.getBoundingClientRect();const r=(s)=>{const e=f.querySelector(s);if(!e)return null;const b=e.getBoundingClientRect();return [+(b.x-F.x).toFixed(1),+(b.y-F.y).toFixed(1),+b.width.toFixed(1),+b.height.toFixed(1)]};return {cls:f.className.replace('q-form ',''),size:[F.width,+F.height.toFixed(1)],logo:r('.q-form__logo'),title:r('.q-form__title'),sub:r('.q-form__subtitle'),fields:r('.q-form__fields'),f0:r('.q-form__cell'),consent:r('.q-form__consent'),box:r('.q-check__box'),clabel:r('.q-check__label'),btn:r('.q-form__submit'),link:r('.q-form__link'),legal:r('.q-form__legal'),media:r('.q-form__media')}}));
const names=['full','extended','gate','minimal','photo','errors','m-full','m-gate','m-minimal'];
M.forEach((m,i)=>console.log(names[i],JSON.stringify(m)));
console.log('errs',errs);await b.close()})();
