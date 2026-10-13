const fs=require('fs');const src=fs.readFileSync('parser.js','utf8').split("const fs=require('fs')")[0];
eval(src+';globalThis.hM0=hM0;globalThis.nM0=nM0;');
const md=fs.readFileSync('../project/README.md','utf8');const r=hM0(nM0(md));
const esc=t=>t.replace(/&/g,'&amp;').replace(/</g,'&lt;');
const inl=t=>esc(t).replace(/\*\*([^*]+)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>');
let h='';for(const b of r.blocks){
 if(b.type==='img')h+=`<img src="${b.src}" alt="${esc(b.alt)}" style="max-width:480px">`;
 else if(b.type==='ul')h+='<ul>'+b.items.map(i=>'<li>'+inl(i)+'</li>').join('')+'</ul>';
 else if(b.type==='table')h+='<table>'+b.rows.map((row,i)=>'<tr>'+row.map(c=>(i===0&&b.header?'<th>':'<td>')+inl(c)).join('')+'</tr>').join('')+'</table>';
 else h+=`<${b.type}>${inl(b.text)}</${b.type}>`;}
const page=t=>`<!doctype html><meta charset=utf-8><style>body{margin:0;padding:32px 40px;background:${t==='dark'?'#1f1e1d':'#fff'};color:${t==='dark'?'#ddd':'#3d3d3a'};font:16px/1.6 ui-sans-serif,system-ui,sans-serif}article{max-width:46rem}h2,h3{font-size:1rem;font-weight:600;color:${t==='dark'?'#fff':'#141413'};line-height:1.4}h2{margin:2.25rem 0 .5rem}h3{margin:1.5rem 0 .5rem}p,ul{margin:.75rem 0}img{display:block;max-width:100%;height:auto;margin:.75rem 0}table{border-collapse:collapse;font-size:14px}td,th{border-bottom:1px solid #8884;padding:8px 12px 8px 0;text-align:left;vertical-align:top}code{font-size:.875em}</style><article>${h}</article>`;
fs.writeFileSync('mock-light.html',page('light'));fs.writeFileSync('mock-dark.html',page('dark'));
