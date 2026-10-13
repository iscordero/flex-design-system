const {chromium}=require('playwright');const fs=require('fs');(async()=>{const b=await chromium.launch();const comps=process.argv.slice(2);
for(const c of comps){const f='../project/components/'+c+'/preview.html';let s=fs.readFileSync(f,'utf8');const m=/height=(\d+)(?: width=(\d+))?/.exec(s.split('\n')[0]);const w=+(m[2]||1100);
const p=await b.newPage({viewport:{width:w,height:200}});await p.goto('file://'+process.cwd()+'/'+c+'.html');await p.waitForLoadState('networkidle');await p.waitForTimeout(400);
const h=await p.evaluate(()=>Math.ceil(Math.max(document.body.scrollHeight,document.body.getBoundingClientRect().height)));await p.close();
if(Math.abs(h-+m[1])>2){s=s.replace(/height=\d+/,'height='+h);fs.writeFileSync(f,s);console.log(c,m[1],'->',h,'w',w)}else console.log(c,'ok',h)}
await b.close()})();
