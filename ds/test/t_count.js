const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();
for (const reduced of [false,true]) {
const ctx=await b.newContext({viewport:{width:1440,height:800},reducedMotion:reduced?'reduce':'no-preference'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/Stats.html');await p.waitForLoadState('networkidle');
const nums=()=>p.evaluate(()=>[...document.querySelectorAll('.q-stat__num')].slice(0,8).map(n=>(n.querySelector('[aria-hidden]')||n).textContent+(n.classList.contains('is-counting')?'*':'')).join(' | '));
console.log(reduced?'REDUCED':'MOTION','t=0', await nums());
await p.waitForTimeout(300); console.log(' t=300', await nums());
await p.waitForTimeout(600); console.log(' t=900', await nums());
await p.waitForTimeout(700); console.log(' t=1600', await nums());
console.log(' sr text', await p.evaluate(()=>[...document.querySelectorAll('.q-stat__num .q-sr')].length), 'all nums', await p.evaluate(()=>document.querySelectorAll('.q-stat__num').length));
// below the fold: still at 0 until scrolled
const last=await p.evaluate(()=>{const a=[...document.querySelectorAll('.q-stat__num')];const n=a[a.length-1];return (n.querySelector('[aria-hidden]')||n).textContent+' y='+Math.round(n.getBoundingClientRect().top)});
console.log(' last before scroll', last);
await p.evaluate(()=>window.scrollTo(0,document.documentElement.scrollHeight)); await p.waitForTimeout(1500);
console.log(' last after scroll', await p.evaluate(()=>{const a=[...document.querySelectorAll('.q-stat__num')];const n=a[a.length-1];return n.textContent}));
console.log(errs); await ctx.close(); }
await b.close()})();
