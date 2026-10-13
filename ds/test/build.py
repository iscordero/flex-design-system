import json,re,os,sys,glob
S=sys.argv[1]; P=S+'/project'
t=json.load(open(P+'/tokens.json'))
def val(v):
    if isinstance(v,dict): v=v['light']
    m=re.match(r'^\{(.+)\}$',v)
    return f'var(--{m.group(1)})' if m else v
lines=[':root{']
for fam in ('color','shadow'):
    for x in t[fam]['tokens']: lines.append(f'--{x["name"]}:{val(x["value"])};')
for fam in ('spacing','radius','layout','zIndex'):
    for x in t[fam]['tokens']: lines.append(f'--{x["name"]}:{x["value"]};')
for k,v in t['type']['families'].items(): lines.append(f'--font-{k}:{v};')
lines.append('}')
for f in t['type']['fonts']:
    lines.append(f'@font-face{{font-family:"{f["family"]}";src:url("file://{P}/{f["file"]}");font-weight:{f["weight"]};font-style:{f["style"]}}}')
for g in t['type']['groups']:
    for st in g['styles']:
        fam=t['type']['families'][st.get('family') or g['family']]
        r=[f'font-family:{fam}',f'font-size:{st["fontSize"]}',f'font-weight:{st["fontWeight"]}']
        if 'lineHeight' in st: r.append(f'line-height:{st["lineHeight"]}')
        if 'letterSpacing' in st: r.append(f'letter-spacing:{st["letterSpacing"]}')
        lines.append(f'.{st["name"]}{{{";".join(r)}}}')
css='\n'.join(lines)
open(S+'/test/tokens.css','w').write(css)
blobs={'/_blob/a0d4062abbce2ceb87d5be08d326359f':f'file://{P}/assets/Logos/qualys-logo-full-rgb.svg','/_blob/1317004b4eea94a3648caf5ff41b1862':f'file://{P}/assets/Logos/qualys-shield.svg'}
import json as _j
for _n,_id in _j.load(open(S+'/feature-ids.json')).items(): blobs['/_blob/'+_id]=f'file://{P}/assets/Feature Icons/{_n}'
for _n,_id in _j.load(open(S+'/new-ids.json')).items(): blobs['/_blob/'+_id]=f'file://{P}/assets/{_n}'
pre=f'<style>{css}</style><link rel="stylesheet" href="file://{P}/components/bundle.css"><script src="file://{P}/components/lib/react.production.min.js"></script><script src="file://{P}/components/lib/react-dom.production.min.js"></script><script src="file://{P}/components/bundle.js"></script>'
for f in glob.glob(P+'/components/*/preview.html'):
    s=open(f).read()
    for k,v in blobs.items(): s=s.replace(k,v)
    s=s.replace('<head>','<head>'+pre,1).replace('<html lang="en">','<html lang="en" data-theme="light">',1)
    name=f.split('/')[-2]
    open(f'{S}/test/{name}.html','w').write(s)
print('ok')
