const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/accfig.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(200);
const st=()=>p.evaluate(()=>{const r=document.querySelector('#f7');const m=r.querySelector('.q-accmod__marker');if(!m)return 'no marker';const mb=m.getBoundingClientRect();const open=r.querySelector('.q-drawer.is-open > .q-drawer__heading').getBoundingClientRect();
 return {cls:m.className,bg:getComputedStyle(m).backgroundColor,x:Math.round(mb.x-open.x),dy:Math.round((mb.y+mb.height/2)-(open.y+open.height/2)),size:mb.width+'x'+mb.height,tr:getComputedStyle(m).transitionDuration,disp:getComputedStyle(m).display,hidden:m.getAttribute('aria-hidden')}});
console.log('initial',JSON.stringify(await st()));
const heads=await p.$$('#f7 .q-drawer__head');
await heads[3].click(); await p.waitForTimeout(60); console.log('60ms after click (mid-slide)',JSON.stringify(await st()));
await p.waitForTimeout(400); console.log('settled',JSON.stringify(await st()));
await p.screenshot({path:'t_marker.png',clip:{x:0,y:(await (await p.$('#f7')).boundingBox()).y,width:1440,height:440}});
// other layouts have no marker
console.log('markers elsewhere', await p.evaluate(()=>['f1','f2','f5','f6','m2'].map(id=>document.querySelectorAll('#'+id+' .q-marker').length).join(',')));
// narrow: hidden
await p.setViewportSize({width:800,height:1000}); await p.waitForTimeout(200); console.log('tablet',JSON.stringify(await st()));
console.log(errs);await b.close()})();
