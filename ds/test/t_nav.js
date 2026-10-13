const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
const p=await b.newPage({viewport:{width:1440,height:900}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/Nav.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
const links=await p.$$('.q-nav__link'); console.log('top links', links.length, await p.evaluate(()=>[...document.querySelectorAll('.q-nav__link')].slice(0,8).map(l=>l.textContent).join(',')));
// open first menu
await links[0].click(); await p.waitForTimeout(400);
console.log('mega links', await p.evaluate(()=>document.querySelectorAll('.q-mega__link').length), 'headings a', await p.evaluate(()=>document.querySelectorAll('a.q-mega__heading').length), 'title a', await p.evaluate(()=>document.querySelectorAll('a.q-mega__title').length));
const ml=await p.$('.q-mega__link'); if(ml){ await ml.hover(); await p.waitForTimeout(300);
 console.log('mega link hover', await p.evaluate(()=>{const l=document.querySelector('.q-mega__link:hover');const a=l.querySelector('.q-mega__arrow');return getComputedStyle(l).color+' arrow '+getComputedStyle(a).color+' op '+getComputedStyle(a).opacity}));
 const bb=await ml.boundingBox(); await p.screenshot({path:'t_nav_mega.png',clip:{x:Math.max(0,bb.x-60),y:Math.max(0,bb.y-90),width:700,height:260}}); }
const mh=await p.$('a.q-mega__heading'); if(mh){ await mh.hover(); await p.waitForTimeout(300); console.log('heading hover', await p.evaluate(()=>{const l=document.querySelector('a.q-mega__heading:hover');const a=l.querySelector('.q-mega__arrow');return getComputedStyle(l).color+' arrow op '+getComputedStyle(a).opacity+' h='+l.getBoundingClientRect().height}));
 const bb=await mh.boundingBox(); await p.screenshot({path:'t_nav_head.png',clip:{x:Math.max(0,bb.x-60),y:Math.max(0,bb.y-40),width:700,height:200}}); }
// find a dropdown menu
for (let i=1;i<links.length;i++){ await links[i].click().catch(()=>{}); await p.waitForTimeout(350); const dl=await p.$('.q-navdrop__link'); if(dl){ await dl.hover(); await p.waitForTimeout(300);
 console.log('navdrop hover at item',i, await p.evaluate(()=>{const l=document.querySelector('.q-navdrop__link:hover');const a=l.querySelector('.q-mega__arrow');return getComputedStyle(l).color+' arrow '+getComputedStyle(a).color+' op '+getComputedStyle(a).opacity}));
 const bb=await dl.boundingBox(); await p.screenshot({path:'t_nav_drop.png',clip:{x:Math.max(0,bb.x-60),y:Math.max(0,bb.y-60),width:700,height:220}}); break; } }
console.log(errs);await b.close()})();
