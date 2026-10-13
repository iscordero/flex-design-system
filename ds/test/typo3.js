const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch(); const p=await b.newPage();
 // break the fallback to prove the stylesheet path is used
 const fs=require('fs'); let h=fs.readFileSync(__dirname+'/TypographyInline.html','utf8').replace(/var FALLBACK = \{[^\n]*\};/,'var FALLBACK = {};'); fs.writeFileSync(__dirname+'/TypographyNoFB.html',h);
 await p.goto('file://'+__dirname+'/TypographyNoFB.html'); await p.waitForTimeout(800); await p.click('text=Mobile'); await p.waitForTimeout(200);
 console.log(await p.evaluate(()=>document.querySelectorAll('.row')[2].innerText.split('\n').slice(0,4).join(' | ')));
 await b.close();})();
