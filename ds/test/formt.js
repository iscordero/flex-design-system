const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const errs=[],logs=[];
const p=await b.newPage({viewport:{width:1440,height:3200}});p.on('pageerror',e=>errs.push(e.message));p.on('console',async m=>{if(m.type()==='error')errs.push(m.text());else if(m.text().startsWith('submitted'))logs.push(await m.args()[1].jsonValue())});
await p.goto('file://'+process.cwd()+'/Form.html');await p.waitForLoadState('networkidle');await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(300);
const f=p.locator('.q-form').nth(1); // extended
const msgs=()=>f.evaluate(el=>[...el.querySelectorAll('[data-field]')].map(c=>c.getAttribute('data-field')+':'+((c.querySelector('.q-field__msg')||{}).textContent||'')).join(' | '));
await f.locator('.q-form__submit').click();await p.waitForTimeout(100);
console.log('empty submit →',await msgs());console.log('focus',await p.evaluate(()=>document.activeElement.name+' '+document.activeElement.getAttribute('aria-invalid')+' '+document.activeElement.getAttribute('aria-describedby')));
console.log('submitted so far',logs.length);
await f.locator('input[name=email]').fill('alex');await f.locator('.q-form__submit').click();await p.waitForTimeout(50);console.log('bad email →',(await msgs()).split(' | ')[0]);
await f.locator('input[name=email]').fill('alex@qualys.com');console.log('after typing →',(await msgs()).split(' | ')[0]);
await f.locator('input[name=firstName]').fill('Alex');await f.locator('input[name=lastName]').fill('Morgan');await f.locator('input[name=company]').fill('Qualys');
// select
await f.locator('.q-dd__trigger').nth(1).click();await p.waitForTimeout(50);await f.locator('.q-menu__row').nth(2).click();
console.log('hidden size',await f.locator('input[name=size]').inputValue());
await f.locator('.q-check').click();
await f.locator('.q-form__submit').click();await p.waitForTimeout(100);console.log('valid submit →',JSON.stringify(logs));console.log('msgs',await msgs());
// keyboard: Enter in a field submits
const g=p.locator('.q-form').nth(3);await g.locator('input[name=username]').fill('amorgan');await g.locator('input[name=username]').press('Enter');await p.waitForTimeout(50);console.log('enter submit →',JSON.stringify(logs[logs.length-1]));
// native post without onSubmit: action respected? check form attrs
console.log('form attrs',await f.locator('form').evaluate(e=>[e.noValidate,e.getAttribute('aria-labelledby'),document.getElementById(e.getAttribute('aria-labelledby')).textContent]));
// select menu inside card not clipped
await f.locator('.q-dd__trigger').nth(0).click();await p.waitForTimeout(50);const mb=await f.locator('.q-menu').boundingBox();console.log('menu box',JSON.stringify(mb));await f.screenshot({path:'form_menu.png'});
console.log('errs',errs);await b.close()})();
