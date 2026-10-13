from PIL import Image
import io,glob,os,sys,json
LOSSY={'g6-photo','g6-heroes','g6-photoheroes','g6-product','g6-formheader'}
MORE={'g4-elevation':128,'g6-logo-colours':128,'g2-gradient':128,'g7-notifications':96,'g5-toasts':96,'g2-overlays':96,'g5-reduced':96,'g7-modals':96}
def enc(f,name):
    im=Image.open(f).convert('RGBA')
    if name in LOSSY:
        b=io.BytesIO(); im.save(b,'AVIF',quality=40,speed=6); return b.getvalue(),'avif'
    a=im.getchannel('A'); flat=Image.new('RGB',im.size,(252,251,247)); flat.paste(im,(0,0),im)
    q=flat.quantize(MORE.get(name,48 if name.startswith('g6') else 64),method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE).convert('RGBA'); q.putalpha(a)
    b=io.BytesIO(); q.save(b,'WEBP',lossless=True,quality=100,method=6); return b.getvalue(),'webp'
os.makedirs('gimg',exist_ok=True); tot={}; man={}
for f in sorted(glob.glob('gpng/g*.png')):
    name=os.path.basename(f)[:-4]; data,ext=enc(f,name); open('gimg/%s.%s'%(name,ext),'wb').write(data); man[name]=[ext,len(data),Image.open(f).size]
    g=name[:2]; tot[g]=tot.get(g,0)+len(data)
    if len(data)>13000: print('big',name,len(data))
json.dump(man,open('gimg/manifest.json','w'))
print({k:(v,round(v*4/3/1000)) for k,v in tot.items()}, sum(tot.values()), round(sum(tot.values())*4/3/1000), len(man))
