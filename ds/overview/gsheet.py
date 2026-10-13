from PIL import Image
import glob,sys
pre=sys.argv[1]
fs=sorted(glob.glob('gpng/%s*.png'%pre))
ims=[Image.open(f).convert('RGBA') for f in fs]
W=960*2+60; sheet=Image.new('RGB',(W,9000),(255,255,255)); y=20; rowh=0
for i,im in enumerate(ims):
    if i%2==0 and i>0: y+=rowh+20; rowh=0
    sheet.paste(im,(20 if i%2==0 else 1000,y),im); rowh=max(rowh,im.height)
sheet=sheet.crop((0,0,W,y+rowh+20)); n=(sheet.height+1299)//1300
for k in range(n): sheet.crop((0,k*1300,W,min(sheet.height,(k+1)*1300))).save('gsheet%d.png'%(k+1))
print(sheet.size,n,[f.split('/')[-1] for f in fs])
