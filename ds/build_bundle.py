import json,sys
src=open(sys.argv[1]).read()
ic=json.load(open('icons-live.json')); fi=json.load(open(sys.argv[2] if len(sys.argv)>2 else 'icons-figma.json'))
out=src.replace('__ICONS__',json.dumps(ic,separators=(',',':'))).replace('__FIGMA_ICONS__',json.dumps(fi,separators=(',',':'))).replace('__HUGEICONS__',open('hugeicons-subset.json').read())
assert '</script' not in out and '<!--' not in out
open(sys.argv[3] if len(sys.argv)>3 else 'project/components/bundle.js','w').write(out)
