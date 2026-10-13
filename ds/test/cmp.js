const { chromium } = require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:420,height:400},deviceScaleFactor:4});
await p.goto('file://'+__dirname+'/cmp.html');await p.waitForTimeout(1500);await p.screenshot({path:__dirname+'/cmp.png'});await b.close();})();
