from PIL import Image
import io,glob,os
def enc(f,colors=64):
    im=Image.open(f).convert('RGBA'); a=im.getchannel('A')
    flat=Image.new('RGB',im.size,(252,251,247)); flat.paste(im,(0,0),im)
    q=flat.quantize(colors,method=Image.Quantize.MEDIANCUT,dither=Image.Dither.NONE).convert('RGBA'); q.putalpha(a)
    b=io.BytesIO(); q.save(b,'WEBP',lossless=True,quality=100,method=6); return b.getvalue()
os.makedirs('webp',exist_ok=True); tot=0; ims=[]
order=['colour','typography','spacing','components','shape','motion','voice','governance']
for n in order:
    data=enc('png/%s.png'%n); open('webp/%s.webp'%n,'wb').write(data); tot+=len(data); ims.append(Image.open('webp/%s.webp'%n).convert('RGBA')); print(n,ims[-1].size,len(data))
print('total',tot,'b64',round(tot*4/3/1000,1),'KB')
W=960*2+60; sheet=Image.new('RGB',(W,2800),(255,255,255)); y=20; rowh=0
for i,im in enumerate(ims):
    if i%2==0 and i>0: y+=rowh+20; rowh=0
    sheet.paste(im,(20 if i%2==0 else 1000,y),im); rowh=max(rowh,im.height)
sheet=sheet.crop((0,0,W,y+rowh+20)); print(sheet.size)
hh=sheet.height//3+20
for k in range(3): sheet.crop((0,k*(hh-20),W,min(sheet.height,k*(hh-20)+hh))).save('sheet%d.png'%(k+1))
