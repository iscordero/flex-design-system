const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
 for (const f of ['Typography','TypographyInline']) {
 const p=await b.newPage({viewport:{width:1200,height:600}});
 const errs=[]; p.on('pageerror',e=>errs.push(e.message)); p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('file://'+__dirname+'/'+f+'.html'); await p.waitForTimeout(1200);
 await p.click('text=Mobile'); await p.waitForTimeout(300);
 const src=await p.evaluate(()=>document.styleSheets.length);
 const rows=await p.evaluate(()=>[...document.querySelectorAll('.row')].map(r=>r.innerText.split('\n').slice(0,6).join(' | ')));
 console.log('==',f,'sheets',src,'errors',errs);
 console.log(rows.filter((_,i)=>[0,2,3,10,12,14,15,21,30].includes(i)).join('\n'));
 await p.click('text=Desktop'); await p.waitForTimeout(200);
 console.log('desktop h1:', await p.evaluate(()=>document.querySelectorAll('.row')[2].innerText.split('\n').slice(0,6).join(' | ')));
 await p.close(); }
 await b.close();})();
