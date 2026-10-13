const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1440,height:1000}});p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/Nav.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const st=()=>p.evaluate(()=>{const nav=document.querySelectorAll('.q-nav')[0];return [...nav.querySelectorAll('.q-nav__panel')].map(pn=>{const bx=pn.querySelector('.q-nav__panelbox');const cs=getComputedStyle(bx);const r=bx.getBoundingClientRect();return {cls:pn.className.replace(/q-nav__panel(--\w+)?/g,'').trim(),op:(+cs.opacity).toFixed(2),tf:cs.transform,clip:cs.clipPath,y:+r.y.toFixed(1),own:pn.parentElement.querySelector('.q-nav__link').textContent}})});
console.log('load',JSON.stringify(await st()));
const links=p.locator('.q-nav').nth(0).locator('.q-nav__left .q-nav__link');
await links.nth(0).click();await p.waitForTimeout(80);console.log('closing@80',JSON.stringify(await st()));await p.screenshot({path:'na1.png',clip:{x:0,y:40,width:1440,height:420}});
await p.waitForTimeout(400);console.log('closed',JSON.stringify(await st()));
await links.nth(0).click();await p.waitForTimeout(120);console.log('opening@120',JSON.stringify(await st()));await p.screenshot({path:'na2.png',clip:{x:0,y:40,width:1440,height:420}});
await p.waitForTimeout(400);console.log('open',JSON.stringify(await st()));
await links.nth(1).click();await p.waitForTimeout(60);console.log('switch@60',JSON.stringify(await st()));await p.waitForTimeout(300);console.log('switched',JSON.stringify(await st()));
await p.keyboard.press('Escape');await p.waitForTimeout(400);console.log('esc',JSON.stringify(await st()));
// phones
const ph=p.locator('.phone--tall').nth(0);
const pst=()=>p.evaluate(()=>{const ph=document.querySelectorAll('.phone--tall')[0];const pn=ph.querySelector('.q-navpanel');const bar=ph.querySelector('.q-nav__mobilebar');const body=ph.querySelector('.q-navpanel__body');const R=ph.getBoundingClientRect();return {panel:pn?{cls:pn.className,x:+(pn.getBoundingClientRect().x-R.x).toFixed(1)}:null,bar:!!bar,body:body?{cls:body.className,x:+(body.getBoundingClientRect().x-R.x).toFixed(1),op:(+getComputedStyle(body).opacity).toFixed(2)}:null,focus:document.activeElement.className, h:R.height}});
await ph.scrollIntoViewIfNeeded();
console.log('phone start',JSON.stringify(await pst()));
await ph.locator('.q-navpanel__row').nth(0).click();await p.waitForTimeout(100);console.log('drill@100',JSON.stringify(await pst()));await p.waitForTimeout(350);console.log('drilled',JSON.stringify(await pst()));
await ph.locator('.q-navpanel__back').click();await p.waitForTimeout(100);console.log('back@100',JSON.stringify(await pst()));await p.waitForTimeout(350);console.log('back done',JSON.stringify(await pst()));
await ph.locator('.q-navpanel__close').click();await p.waitForTimeout(120);console.log('close@120',JSON.stringify(await pst()));await ph.screenshot({path:'na3.png'});await p.waitForTimeout(350);console.log('closed',JSON.stringify(await pst()));
await ph.locator('.q-nav__menubtn').click();await p.waitForTimeout(120);console.log('open@120',JSON.stringify(await pst()));await p.waitForTimeout(350);console.log('opened',JSON.stringify(await pst()));
// the real (portal) mobile menu at phone width
const m=await b.newPage({viewport:{width:390,height:844}});m.on('pageerror',e=>errs.push(e.message));
await m.setContent('<!doctype html><html><head>'+ (await p.evaluate(()=>[...document.querySelectorAll('style,link[rel=stylesheet]')].map(e=>e.outerHTML).join('')))+'</head><body><div id="root"></div><p style="height:1500px">page</p></body></html>');
await m.addScriptTag({content:await p.evaluate(()=>[...document.querySelectorAll('script')].filter(s=>!s.src).slice(0,-1).map(s=>s.textContent).join(';\n'))}).catch(e=>console.log('script err',e.message.slice(0,200)));
const ok=await m.evaluate(()=>!!(window.React&&window.Qualys));console.log('real page has bundle',ok);
if(ok){await m.evaluate(()=>{const h=React.createElement;ReactDOM.createRoot(document.getElementById('root')).render(h(Qualys.Nav,{items:[{label:'Platform',menu:{columns:[{title:'A',links:['One','Two']}]}},{label:'Customers',href:'#'}],utility:['Login'],cta:{label:'Get Started',href:'#'}}));});await m.waitForTimeout(200);
const ms=()=>m.evaluate(()=>{const pn=document.querySelector('.q-navpanel');return pn?{cls:pn.className,x:+pn.getBoundingClientRect().x.toFixed(1),sw:document.documentElement.scrollWidth,of:document.body.style.overflow}:null});
await m.locator('.q-nav__menubtn').click();await m.waitForTimeout(100);console.log('real open@100',JSON.stringify(await ms()));await m.waitForTimeout(350);console.log('real opened',JSON.stringify(await ms()));
await m.keyboard.press('Escape');await m.waitForTimeout(100);console.log('real esc@100',JSON.stringify(await ms()));await m.waitForTimeout(350);console.log('real closed',JSON.stringify(await ms()), 'focus', await m.evaluate(()=>document.activeElement.className));}
console.log('errs',errs);await b.close()})();
