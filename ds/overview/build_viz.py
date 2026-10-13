import glob,sys
s=open('../test/Modal.html').read()
i=s.index('<script>\nvar Q = window.Qualys'); head=s[:i]
css=''.join(open(f).read() for f in sorted(glob.glob('parts/*.css')))
only=sys.argv[1:] 
js=''.join(open(f).read()+'\n' for f in sorted(glob.glob('parts/*.js')) if not only or f.split('/')[-1][:2] in ('00','01','02') or any(o in f for o in only))
tail="\nReactDOM.createRoot(document.getElementById('root')).render(h(React.Fragment, null, V));\n"
open('gviz.html','w').write(head+'<style>'+css+'</style>\n<script>\n'+js+tail+'</script>\n</body>\n</html>\n')
print('ok',len(js))
