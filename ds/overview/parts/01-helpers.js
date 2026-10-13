var Q = window.Qualys, h = React.createElement, V = [];
function kids(a, n) { return Array.prototype.slice.call(a, n); }
function el(tag, props) { return h.apply(null, [tag, props].concat(kids(arguments, 2))); }
function viz(id, style) { var v = h.apply(null, ['div', {className: 'viz', id: id, key: id, style: style}].concat(kids(arguments, 2))); V.push(v); return v; }
function t(cls, text, style) { return h('div', {className: cls, style: style}, text); }
function sp(cls, text, style) { return h('span', {className: cls, style: style}, text); }
function row(style) { return h.apply(null, ['div', {className: 'row', style: style}].concat(kids(arguments, 1))); }
function col(style) { return h.apply(null, ['div', {className: 'col', style: style}].concat(kids(arguments, 1))); }
function ty(name, text, extra) { var s = TY[name]; return h('span', {style: Object.assign({display: 'block', fontFamily: s.ff, fontSize: s.fs, lineHeight: s.lh, fontWeight: s.fw, letterSpacing: s.ls, color: 'var(--text-primary)'}, extra)}, text); }
function pill(text, tone) { return h(Q.Tag, {variant: 'outline', tone: tone || 'gray', size: 'sm'}, text); }
function arrow() { return h('span', {className: 'arrow'}, h(Q.Icon, {name: 'arrow-right', size: 16})); }
function ic(name, size, color) { return h('span', {style: {display: 'flex', flex: 'none', color: color}}, h(Q.Icon, {name: name, size: size || 16})); }
function act(icon, cls, text) { return h('div', {className: 'act'}, h('span', {className: cls, style: {display: 'flex'}}, h(Q.Icon, {name: icon, size: 14})), text); }
function dd(good) { return h.apply(null, ['div', {className: 'dd'}, h('span', {className: good ? 'ok' : 'no'}, h(Q.Icon, {name: good ? 'check-circle' : 'x-circle', size: 16}))].concat([h.apply(null, ['span', null].concat(kids(arguments, 1)))])); }
function hl(text) { return h('span', {className: 'hl'}, text); }
function bad(text) { return h('span', {className: 'bad'}, text); }
function lab(k, s, style) { return h('div', {style: style}, k ? t('k', k) : null, s ? t('s', s) : null); }
function asset(path, style, alt) { return h('img', {src: '../project/assets/' + path, alt: alt || '', style: style}); }
function ph(w, hh, style) { return h('span', {className: 'ph', style: Object.assign({display: 'block', width: w, height: hh}, style)}); }
