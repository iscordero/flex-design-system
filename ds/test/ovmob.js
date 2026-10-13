const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:375,height:700}});
await p.goto('file://'+process.cwd()+'/ovlive.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
const shots=[];
for(const k of ['modal','alert','wizard','cookie','cookieX']){await p.click('#'+k);await p.waitForTimeout(500);await p.screenshot({path:'m_'+k+'.png'});shots.push('m_'+k+'.png');
 const sel=k==='cookie'?'.q-cookie .q-btn--primary':k==='cookieX'?'.q-cookiepanel__foot .q-btn--primary':k==='alert'?'.q-modal:not(.q-modal--inline) .q-btn--primary':null;
 if(sel)await p.click(sel);else await p.keyboard.press('Escape');await p.waitForTimeout(350);}
await p.click('#tE');await p.click('#tS');await p.waitForTimeout(500);await p.screenshot({path:'m_toast.png'});
await b.close()})();
