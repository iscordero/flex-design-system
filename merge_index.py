import json,datetime,sys
live=json.load(open('artifact-files/38430544-23a0-463e-93e5-6a28679aea80/project/design-system.json'))
pend=json.load(open('ds/pending-assets.json'))
keyof={'Images':'Images','Logos':'Logos','Icons':'Icons'}
for grp,files in pend.items():
    g=live['assetGroups'][keyof.get(grp,grp)]
    for name,(blob,size,typ) in files.items():
        g['files'][name]={'blob':blob,'name':name,'size':size,'type':typ}
        if name not in g['order']: g['order'].append(name)
note=sys.argv[1]; via=sys.argv[2] if len(sys.argv)>2 else 'Claude (Cowork)'
assert len(note)<=280, len(note)
live['lastChange']={'at':datetime.datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),'by':'Isabel','note':note,'via':via}
json.dump(live,open('ds/project/design-system.json','w'),indent=2,ensure_ascii=False)
print('ok',live['lastChange']['at'], list(live['assetGroups']['Images']['files'].keys()))
