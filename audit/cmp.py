import sys, os
from PIL import Image, ImageChops
import numpy as np
a, b = sys.argv[1], sys.argv[2]
for w in sorted(os.listdir(a)):
    res = []
    for f in sorted(os.listdir(os.path.join(a, w))):
        pa, pb = os.path.join(a, w, f), os.path.join(b, w, f)
        if not os.path.exists(pb): res.append((f, 'missing', 0, 0)); continue
        A, B = Image.open(pa).convert('RGB'), Image.open(pb).convert('RGB')
        dh = B.size[1] - A.size[1]
        h = min(A.size[1], B.size[1]); A2, B2 = A.crop((0, 0, A.size[0], h)), B.crop((0, 0, B.size[0], h))
        d = np.asarray(ImageChops.difference(A2, B2)).max(axis=2) > 24
        pct = d.mean() * 100
        if pct > 0.02 or dh: res.append((f[:-4], '%.2f%%' % pct, dh, int(np.argmax(d.any(axis=1))) if d.any() else -1))
    print('==', w, len(res), 'changed')
    for r in res: print('  %-22s %8s  height %+d  first row %s' % r)
