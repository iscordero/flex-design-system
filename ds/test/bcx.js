const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[];
const p=await b.newPage({viewport:{width:1440,height:800}});p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/Breadcrumbs.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);
const navs=p.locator('.q-crumbs');
console.log('count',await navs.count());
console.log('default',await navs.nth(0).evaluate(n=>{const r=e=>e.getBoundingClientRect();const li=[...n.querySelectorAll('li')];const a=n.querySelector('a');const cs=getComputedStyle(a);const af=getComputedStyle(a,'::after');const cur=n.querySelector('[aria-current]');const sep=n.querySelector('.q-crumbs__sep svg');
 return {label:n.getAttribute('aria-label'),items:li.length,rowH:Math.round(r(n).height),linkH:Math.round(r(a).height),font:cs.fontSize+'/'+cs.fontWeight+'/'+cs.color,bar:af.height+' r'+af.borderRadius+' op'+af.opacity,gap:Math.round(r(li[1].querySelector('.q-crumbs__sep')).left-r(a).right),sepW:Math.round(r(sep).width),sepColor:getComputedStyle(sep.parentElement).color,current:cur.textContent.slice(0,20),curTag:cur.tagName,curWeight:getComputedStyle(cur).fontWeight,curColor:getComputedStyle(cur).color}}));
// hover
const a0=navs.nth(0).locator('a').nth(1);await a0.hover();await p.waitForTimeout(250);console.log('hover bar opacity',await a0.evaluate(a=>getComputedStyle(a,'::after').opacity));
await p.mouse.move(5,5);
// truncation
console.log('trunc',await navs.nth(2).evaluate(n=>{const c=n.querySelector('[aria-current]');return {clipped:c.scrollWidth>c.clientWidth,navW:Math.round(n.getBoundingClientRect().width),overflow:n.scrollWidth>n.clientWidth,title:c.title.length}}));
// deep
const deep=navs.nth(3);console.log('deep before',await deep.evaluate(n=>[...n.querySelectorAll('li')].map(li=>li.textContent)));
await deep.locator('.q-crumbs__more').focus();await p.keyboard.press('Enter');await p.waitForTimeout(100);
console.log('deep after',await deep.evaluate(n=>[...n.querySelectorAll('li')].map(li=>li.textContent)),'focus:',await p.evaluate(()=>document.activeElement.textContent));
// contained
console.log('contained',await navs.nth(4).evaluate(n=>{const r=n.getBoundingClientRect();const bar=n.closest('.q-crumbs-bar').getBoundingClientRect();return {left:Math.round(r.left-bar.left),top:Math.round(r.top-bar.top),bottom:Math.round(bar.bottom-r.bottom),w:Math.round(r.width),barW:Math.round(bar.width)}}));
// mobile
console.log('mobile',await navs.nth(5).evaluate(n=>{const vis=[...n.querySelectorAll('li')].filter(li=>getComputedStyle(li).display!=='none');const a=n.querySelector('.q-crumbs__item--prev a');const bar=n.closest('.q-crumbs-bar').getBoundingClientRect();const r=n.getBoundingClientRect();return {visible:vis.map(li=>li.textContent.slice(0,14)),firstSep:getComputedStyle(vis[0].querySelector('.q-crumbs__sep')).display,font:getComputedStyle(a).fontSize,rowH:Math.round(r.height),pad:[Math.round(r.left-bar.left),Math.round(r.top-bar.top)],clipped:(c=>c.scrollWidth>c.clientWidth)(n.querySelector('[aria-current]'))}}));
// keyboard focus ring
await p.keyboard.press('Tab');
console.log('errs',errs);await b.close()})();
