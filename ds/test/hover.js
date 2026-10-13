const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();
 let p=await b.newPage({viewport:{width:1200,height:300}}); await p.goto('file://'+__dirname+'/Nav.html'); await p.waitForTimeout(800);
 await p.hover('text=Platform'); await p.waitForTimeout(300); await p.screenshot({path:__dirname+'/nav-hover.png',clip:{x:0,y:0,width:700,height:300}});
 p=await b.newPage({viewport:{width:1200,height:500}}); await p.goto('file://'+__dirname+'/ContentCard.html'); await p.waitForTimeout(800);
 await p.hover('text=Qualys Security Conference'); await p.waitForTimeout(500); await p.screenshot({path:__dirname+'/card-hover.png',clip:{x:300,y:0,width:600,height:480}});
 await b.close();})();
