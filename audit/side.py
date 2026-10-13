import sys
from PIL import Image, ImageDraw
a, b, w, out = sys.argv[1], sys.argv[2], sys.argv[3], sys.argv[4]
tiles = []
for spec in sys.argv[5:]:
    name, y, h = (spec.split(':') + ['0', '700'])[:3]
    A = Image.open(f'{a}/{w}/{name}.png').convert('RGB'); B = Image.open(f'{b}/{w}/{name}.png').convert('RGB')
    y = int(y); h = int(h)
    A = A.crop((0, y, A.size[0], min(A.size[1], y + h))); B = B.crop((0, y, B.size[0], min(B.size[1], y + h)))
    t = Image.new('RGB', (A.size[0] + B.size[0] + 12, max(A.size[1], B.size[1])), (255, 0, 255)); t.paste(A, (0, 0)); t.paste(B, (A.size[0] + 12, 0)); tiles.append(t)
W = sum(t.size[0] for t in tiles) + 24 * (len(tiles) - 1); H = max(t.size[1] for t in tiles)
img = Image.new('RGB', (W, H), (40, 40, 40)); x = 0
for t in tiles: img.paste(t, (x, 0)); x += t.size[0] + 24
if img.size[0] > 1900: img = img.resize((1900, int(img.size[1] * 1900 / img.size[0])))
img.save(out)
