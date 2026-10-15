(function () {
  'use strict';
  var D = JSON.parse(document.getElementById('ds-data').textContent);
  function blob(s) {
    return s.replace(/\/_blob\/([0-9a-f]{32})/g, function (m, h) { return D.assets[h] || m; });
  }
  var SC = 'script';
  var PRE = '<style>' + D.tokenCss + '</style><style>' + blob(D.bundleCss) + '</style>' +
    '<' + SC + '>' + D.react + '</' + SC + '><' + SC + '>' + D.reactDom + '</' + SC + '>' +
    '<' + SC + '>' + blob(D.bundleJs) + '</' + SC + '>';

  /* Each preview is its own small document, so its styles and breakpoints behave as they do on a real page. */
  function reporter(id) {
    return '<' + SC + '>(function(){var id=' + JSON.stringify(id) + ',last=0;function post(){var b=document.body,e=document.documentElement;if(!b)return;' +
      'var h=b.scrollHeight;if(e.scrollHeight>e.clientHeight+1)h=Math.max(h,e.scrollHeight);h=Math.ceil(h);if(h&&h!==last){last=h;parent.postMessage({ds:id,h:h},"*");}}' +
      'window.addEventListener("load",post);if(window.ResizeObserver){new ResizeObserver(post).observe(document.documentElement);if(document.body)new ResizeObserver(post).observe(document.body);}' +
      '[200,800,2000].forEach(function(t){setTimeout(post,t)});' +
      'document.addEventListener("click",function(ev){var a=ev.target&&ev.target.closest&&ev.target.closest("a[href]");if(!a)return;var u=a.getAttribute("href")||"";' +
      'if(/^https?:/i.test(u)){a.target="_blank";a.rel="noopener";}else if(u.charAt(0)==="#"){ev.preventDefault();}},true);})();</' + SC + '>';
  }
  /* Specs: runs inside a preview. While it is on, pointing at a part outlines it, shades its padding, margin and gaps, and reports its measurements and tokens to the page. */
  function inspector(cfg) {
    var on = false, pin = null, cur = null, scale = 1, layer = null, idx = null, mode = 'measure';
    var STATE = /:(hover|active|focus-visible|focus-within|focus|disabled|checked)/g;
    function px(v) { return Math.round(parseFloat(v) * 100) / 100 || 0; }
    function build() {
      idx = { byClass: {}, other: [] };
      function add(r) {
        var text = r.style && r.style.cssText;
        if (!text || text.indexOf('var(--') < 0) return;
        var entry = { sel: r.selectorText, text: text }, cls = r.selectorText.match(/\.[A-Za-z0-9_-]+/g);
        if (!cls) { idx.other.push(entry); return; }
        var seen = {};
        cls.forEach(function (c) { c = c.slice(1); if (seen[c]) return; seen[c] = 1; (idx.byClass[c] || (idx.byClass[c] = [])).push(entry); });
      }
      function walk(list) {
        for (var i = 0; i < list.length; i++) {
          var r = list[i];
          if (r.selectorText) { add(r); continue; }
          if (!r.cssRules) continue;
          /* Rules for other screen sizes are left out: the specs describe the preview as it is drawn. */
          if (r.media) { if (!window.matchMedia(r.media.mediaText).matches) continue; }
          else if (typeof r.containerQuery === 'string' || /^@container/.test(r.cssText)) continue;
          walk(r.cssRules);
        }
      }
      for (var s = 0; s < document.styleSheets.length; s++) { try { walk(document.styleSheets[s].cssRules); } catch (e) { /* a sheet from another origin */ } }
    }
    function tokensOf(el, into) {
      var out = into || {}, seen = {}, cands = idx.other.slice();
      String(el.getAttribute('class') || '').split(/\s+/).forEach(function (c) { if (c && idx.byClass[c]) cands = cands.concat(idx.byClass[c]); });
      cands.forEach(function (e) {
        var key = e.sel + '|' + e.text;
        if (seen[key]) return;
        seen[key] = 1;
        e.sel.split(',').forEach(function (one) {
          var st = one.match(STATE), state = st ? st[0].slice(1) : 'default';
          var base = one.replace(STATE, '').replace(/::?(before|after|placeholder|marker|selection|-webkit-[a-z-]+)/g, '').trim();
          if (!base) return;
          var ok = false;
          try { ok = el.matches(base); } catch (err) { ok = false; }
          if (!ok) return;
          var re = /(^|;)\s*([a-z-]+)\s*:\s*([^;]+)/g, m;
          while ((m = re.exec(e.text))) {
            var vars = m[3].match(/var\(--[a-z0-9-]+/g);
            if (!vars) continue;
            var bucket = out[state] || (out[state] = {}), list = bucket[m[2]] || (bucket[m[2]] = []);
            vars.forEach(function (v) { v = v.slice(6); if (cfg.kinds[v] && list.indexOf(v) < 0) list.push(v); });
            if (!list.length) delete bucket[m[2]];
          }
        });
      });
      return out;
    }
    /* Text color is usually set on a parent: find the nearest one that names a token for it. */
    /* One-offs: a plain pixel length that is not on the spacing or radius scale and that no rule ties to a token. Anything under 4px is an optical nudge and is let through. */
    function plain(el, prop) {
      if (!el.computedStyleMap) return /^margin/.test(prop) ? null : px(getComputedStyle(el).getPropertyValue(prop));
      try { var v = el.computedStyleMap().get(prop); return v && v.unit === 'px' ? Math.round(v.value * 100) / 100 : null; } catch (e) { return null; }
    }
    function tied(tok, family, kind) {
      var d = tok.default || {};
      return Object.keys(d).some(function (p) { return p.indexOf(family) === 0 && d[p].some(function (n) { return cfg.kinds[n] === kind || (kind === 'spacing' && cfg.kinds[n] === 'layout'); }); });
    }
    function offSpacing(el, tok) {
      var out = { pad: [], mar: [], gap: [] };
      if (!el.closest('[class^="q-"], [class*=" q-"]')) return out;
      [['pad', 'padding', ['padding-top', 'padding-right', 'padding-bottom', 'padding-left']], ['mar', 'margin', ['margin-top', 'margin-right', 'margin-bottom', 'margin-left']], ['gap', 'gap', ['row-gap', 'column-gap']]].forEach(function (g) {
        if (g[0] === 'gap' && !/flex|grid/.test(getComputedStyle(el).display)) return;
        /* A rule that names a token for this property may add or take off a border's width (a token less 1px, say): within 2px of the scale then counts as on it. */
        var loose = tied(tok, g[1], 'spacing') || (g[0] === 'gap' && (tied(tok, 'row-gap', 'spacing') || tied(tok, 'column-gap', 'spacing')));
        g[2].forEach(function (p) {
          var v = plain(el, p);
          /* Negative values are overlaps, fractions and anything under 4px are optical nudges, and over 100px is layout, not spacing. */
          if (v == null || v < 4 || v > 100 || v !== Math.round(v) || out[g[0]].indexOf(v) >= 0) return;
          if (cfg.scale.spacing.some(function (t) { return t === v || (loose && Math.abs(t - v) <= 2); })) return;
          out[g[0]].push(v);
        });
      });
      return out;
    }
    function offRadius(el, tok) {
      if (!el.closest('[class^="q-"], [class*=" q-"]') || tied(tok, 'border', 'radius')) return [];
      var out = [], cs = getComputedStyle(el), half = Math.min(el.offsetWidth, el.offsetHeight) / 2;
      ['borderTopLeftRadius', 'borderTopRightRadius', 'borderBottomRightRadius', 'borderBottomLeftRadius'].forEach(function (k) {
        var m = /^([\d.]+)px$/.exec(cs[k]), v = m ? +m[1] : 0;
        if (v >= 3 && (!half || v < half) && cfg.scale.radius.indexOf(v) < 0 && out.indexOf(v) < 0) out.push(v);
      });
      return out;
    }
    function inheritedColor(el) {
      for (var p = el, i = 0; p && p.nodeType === 1 && i < 12; p = p.parentElement, i++) {
        var t = (tokensOf(p).default || {}).color;
        if (t && t.length) return t;
      }
      return [];
    }
    /* Color: the colors a part is drawn with, and the contrast of its text on what lies behind it. */
    var SHAPES = /^(path|circle|rect|ellipse|line|polyline|polygon|text|use)$/i;
    function rgba(c) { var m = /rgba?\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\s*\)/.exec(c || ''); return m ? [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]] : null; }
    function visible(c) { var v = rgba(c); return v && v[3] > 0; }
    function colorsOf(el) {
      var cs = getComputedStyle(el), out = [], svg = el instanceof SVGElement;
      var hasText = [].some.call(el.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); });
      if (svg && SHAPES.test(el.tagName)) {
        if (cs.fill !== 'none' && visible(cs.fill)) out.push(['Fill', cs.fill, 'fill']);
        if (cs.stroke !== 'none' && visible(cs.stroke) && parseFloat(cs.strokeWidth) > 0) out.push(['Stroke', cs.stroke, 'stroke']);
        return out;
      }
      if (hasText || /^(input|textarea|select|button)$/i.test(el.tagName)) out.push(['Text', cs.color, 'color']);
      if (visible(cs.backgroundColor)) out.push(['Fill', cs.backgroundColor, 'background']);
      if (cs.backgroundImage !== 'none' && /gradient/.test(cs.backgroundImage)) out.push(['Gradient', cs.backgroundImage, 'background']);
      if (parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none' && visible(cs.borderTopColor)) out.push(['Border', cs.borderTopColor, 'border']);
      /* An icon inside: the color of its first drawn shape. */
      var shape = el.querySelector && el.querySelector('svg path, svg circle, svg rect, svg ellipse, svg line, svg polyline, svg polygon');
      if (shape && (svg || el.querySelectorAll('svg').length === 1)) {
        var ss = getComputedStyle(shape), ic = ss.fill !== 'none' && visible(ss.fill) ? ss.fill : (ss.stroke !== 'none' && visible(ss.stroke) ? ss.stroke : null);
        if (ic) out.push(['Icon', ic, 'fill']);
      }
      return out;
    }
    function lum(c) { return c.slice(0, 3).map(function (v) { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }).reduce(function (a, v, i) { return a + v * [0.2126, 0.7152, 0.0722][i]; }, 0); }
    /* What the text sits on: the nearest filled box behind it, see-through fills blended over the one below. A picture or gradient behind ends the search. */
    function behind(el) {
      var stack = [];
      for (var p = el; p && p.nodeType === 1; p = p.parentElement) {
        var cs = getComputedStyle(p);
        if (cs.backgroundImage !== 'none') return { over: /gradient/.test(cs.backgroundImage) ? 'gradient' : 'image' };
        var c = rgba(cs.backgroundColor);
        if (c && c[3] > 0) { stack.push(c); if (c[3] >= 1) break; }
      }
      var base = [255, 255, 255];
      for (var i = stack.length - 1; i >= 0; i--) { var a = stack[i][3]; base = [0, 1, 2].map(function (k) { return stack[i][k] * a + base[k] * (1 - a); }); }
      return { rgb: base };
    }
    function contrastOf(el) {
      var hasText = [].some.call(el.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); });
      if (!hasText) return null;
      var t = rgba(getComputedStyle(el).color), b = behind(el);
      if (!t) return null;
      if (b.over) return { over: b.over };
      var fg = [0, 1, 2].map(function (k) { return t[k] * t[3] + b.rgb[k] * (1 - t[3]); });
      var l1 = lum(fg), l2 = lum(b.rgb), r = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
      var cs = getComputedStyle(el), big = parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && +cs.fontWeight >= 700);
      return { ratio: Math.round(r * 100) / 100, big: big, bg: 'rgb(' + b.rgb.map(Math.round).join(', ') + ')' };
    }
    function specOf(el) {
      var cs = getComputedStyle(el), r = el.getBoundingClientRect();
      function four(a, b) { return ['Top', 'Right', 'Bottom', 'Left'].map(function (s) { return px(cs[a + s + (b || '')]); }); }
      var fs = parseFloat(cs.fontSize), raw = cs.letterSpacing, ls = raw === 'normal' ? 0 : parseFloat(raw);
      var hasText = [].some.call(el.childNodes, function (n) { return n.nodeType === 3 && n.textContent.trim(); });
      var flex = /flex|grid/.test(cs.display), tok = tokensOf(el);
      return {
        tag: el.tagName.toLowerCase(), cls: String(el.getAttribute('class') || '').split(/\s+/).filter(Boolean),
        w: px(r.width), h: px(r.height), pad: four('padding'), mar: four('margin'), bw: four('border', 'Width'),
        gap: flex ? [px(cs.rowGap), px(cs.columnGap)] : null, display: cs.display,
        radius: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius],
        borderColor: cs.borderTopColor, borderStyle: cs.borderTopStyle,
        color: cs.color, bg: cs.backgroundColor, bgImage: cs.backgroundImage !== 'none' ? cs.backgroundImage.slice(0, 60) : '',
        shadow: cs.boxShadow !== 'none' ? cs.boxShadow : '', opacity: cs.opacity,
        font: hasText || /^(input|textarea|select|button)$/i.test(el.tagName) ? { ff: cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(), fs: px(fs), fw: cs.fontWeight,
          lh: cs.lineHeight === 'normal' ? null : px(cs.lineHeight), ls: /%$/.test(raw) ? px(ls) : (fs ? Math.round(ls / fs * 1000) / 10 : 0), tt: cs.textTransform } : null,
        tokens: tok, inherited: inheritedColor(el), off: offSpacing(el, tok), offRadius: offRadius(el, tok), inKit: !!el.closest('[class^="q-"], [class*=" q-"]'),
        colors: colorsOf(el), contrast: contrastOf(el), mode: mode
      };
    }
    function draw(el) {
      if (!layer) {
        layer = document.createElement('div');
        layer.setAttribute('aria-hidden', 'true');
        layer.style.cssText = 'position:fixed;left:0;top:0;width:0;height:0;pointer-events:none;z-index:2147483646';
        document.documentElement.appendChild(layer);
      }
      layer.textContent = '';
      if (!el || !el.isConnected) return;
      var r = el.getBoundingClientRect(), cs = getComputedStyle(el), f = Math.max(1, 1 / (scale || 1));
      if (mode === 'color') { drawColor(el, r, f); return; }
      function n(k) { return parseFloat(cs[k]) || 0; }
      function box(x, y, w, h, bg, extra) {
        if (w <= 0 || h <= 0) return null;
        var d = document.createElement('div');
        d.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;width:' + w + 'px;height:' + h + 'px;box-sizing:border-box;background:' + bg + ';' + (extra || '');
        layer.appendChild(d);
        return d;
      }
      function label(x, y, text, bg, where) {
        var d = document.createElement('div');
        d.textContent = text;
        d.style.cssText = 'position:fixed;left:' + x + 'px;top:' + y + 'px;transform:translate(' + (where === 'above' ? '0,-100%' : '-50%,-50%') + ');padding:' + (1 * f) + 'px ' + (4 * f) + 'px;border-radius:' + (3 * f) + 'px;background:' + bg +
          ';color:#fff;font:500 ' + (11 * f) + 'px/1.2 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:nowrap';
        layer.appendChild(d);
      }
      var MAR = 'rgba(245,166,36,.38)', PAD = 'rgba(33,184,115,.34)', GAP = 'rgba(128,69,138,.30)', OFF = '#c42b1c';
      var off = offSpacing(el, tokensOf(el));
      function isOff(list, v) { return list.some(function (o) { return Math.abs(Math.abs(o) - v) < 0.6; }); }
      function mark(v, list, color) { return isOff(list, v) ? [num(v) + ' \u00b7 no token', OFF] : [num(v), color]; }
      var mt = n('marginTop'), mr = n('marginRight'), mb = n('marginBottom'), ml = n('marginLeft');
      box(r.left, r.top - mt, r.width, mt, MAR); box(r.left, r.bottom, r.width, mb, MAR); box(r.left - ml, r.top, ml, r.height, MAR); box(r.right, r.top, mr, r.height, MAR);
      var bt = n('borderTopWidth'), br = n('borderRightWidth'), bb = n('borderBottomWidth'), bl = n('borderLeftWidth');
      var pt = n('paddingTop'), pr = n('paddingRight'), pb = n('paddingBottom'), pl = n('paddingLeft');
      var ix = r.left + bl, iy = r.top + bt, iw = r.width - bl - br, ih = r.height - bt - bb;
      box(ix, iy, iw, pt, PAD); box(ix, iy + ih - pb, iw, pb, PAD); box(ix, iy + pt, pl, ih - pt - pb, PAD); box(ix + iw - pr, iy + pt, pr, ih - pt - pb, PAD);
      /* Gaps between the children of a flex or grid box */
      var kids = [].filter.call(el.children, function (k) { var q = k.getBoundingClientRect(); return q.width > 0 && q.height > 0 && getComputedStyle(k).position !== 'absolute' && getComputedStyle(k).position !== 'fixed'; }).slice(0, 40);
      var gaps = [];
      if (/flex|grid/.test(cs.display) && (n('rowGap') > 0 || n('columnGap') > 0)) {
        for (var i = 0; i + 1 < kids.length; i++) {
          var a = kids[i].getBoundingClientRect(), b = kids[i + 1].getBoundingClientRect();
          if (b.left >= a.right - 0.5 && b.left - a.right > 0.5) { var top = Math.min(a.top, b.top), bot = Math.max(a.bottom, b.bottom); box(a.right, top, b.left - a.right, bot - top, GAP); gaps.push([a.right + (b.left - a.right) / 2, (top + bot) / 2, b.left - a.right]); }
          else if (b.top >= a.bottom - 0.5 && b.top - a.bottom > 0.5) { var l = Math.min(a.left, b.left), rr = Math.max(a.right, b.right); box(l, a.bottom, rr - l, b.top - a.bottom, GAP); gaps.push([(l + rr) / 2, a.bottom + (b.top - a.bottom) / 2, b.top - a.bottom]); }
        }
      }
      box(r.left, r.top, r.width, r.height, 'transparent', 'outline:' + (1.5 * f) + 'px solid #2683ed;outline-offset:-' + (0.75 * f) + 'px');
      function num(v) { return String(Math.round(v * 10) / 10); }
      var min = 9 * f;
      function lab(x, y, v, list, color) { var m = mark(v, list, color); label(x, y, m[0], m[1]); }
      if (pt >= min) lab(ix + iw / 2, iy + pt / 2, pt, off.pad, '#16812c'); if (pb >= min) lab(ix + iw / 2, iy + ih - pb / 2, pb, off.pad, '#16812c');
      if (pl >= min) lab(ix + pl / 2, iy + ih / 2, pl, off.pad, '#16812c'); if (pr >= min) lab(ix + iw - pr / 2, iy + ih / 2, pr, off.pad, '#16812c');
      if (mt >= min) lab(r.left + r.width / 2, r.top - mt / 2, mt, off.mar, '#b86a00'); if (mb >= min) lab(r.left + r.width / 2, r.bottom + mb / 2, mb, off.mar, '#b86a00');
      if (ml >= min) lab(r.left - ml / 2, r.top + r.height / 2, ml, off.mar, '#b86a00'); if (mr >= min) lab(r.right + mr / 2, r.top + r.height / 2, mr, off.mar, '#b86a00');
      gaps.slice(0, 12).forEach(function (g) { if (g[2] >= min * 0.6) lab(g[0], g[1], g[2], off.gap, '#80458a'); });
      label(Math.max(0, r.left), Math.max(16 * f, r.top), num(r.width) + ' × ' + num(r.height), '#2683ed', 'above');
    }
    function hex(c) { var v = rgba(c); if (!v) return c; var hx = '#' + v.slice(0, 3).map(function (x) { return ('0' + Math.round(x).toString(16)).slice(-2); }).join(''); return v[3] < 1 ? hx + '/' + Math.round(v[3] * 100) / 100 : hx; }
    function nameOf(c) { var n = (cfg.colors || {})[hex(c)]; return n && n.length ? n[0] : null; }
    function drawColor(el, r, f) {
      var o = document.createElement('div');
      o.style.cssText = 'position:fixed;left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px;box-sizing:border-box;outline:' + (1.5 * f) + 'px solid #2683ed;outline-offset:-' + (0.75 * f) + 'px';
      layer.appendChild(o);
      var list = colorsOf(el);
      if (!list.length) return;
      var box = document.createElement('div');
      box.style.cssText = 'position:fixed;display:flex;flex-direction:column;gap:' + (3 * f) + 'px;padding:' + (5 * f) + 'px ' + (7 * f) + 'px;border-radius:' + (6 * f) + 'px;background:#262626;color:#fff;font:500 ' + (11 * f) + 'px/1.25 ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,.2)';
      list.forEach(function (c) {
        var row = document.createElement('div'), sw = document.createElement('span'), name = c[0] === 'Gradient' ? 'gradient' : hex(c[1]), tok = c[0] === 'Gradient' ? null : nameOf(c[1]);
        row.style.cssText = 'display:flex;align-items:center;gap:' + (6 * f) + 'px';
        sw.style.cssText = 'flex:none;width:' + (12 * f) + 'px;height:' + (12 * f) + 'px;border-radius:' + (3 * f) + 'px;box-shadow:0 0 0 1px rgba(255,255,255,.5);background:' + c[1];
        row.appendChild(sw);
        row.appendChild(document.createTextNode(c[0] + '  ' + name + (tok ? '  ' + tok : (c[0] === 'Gradient' ? '' : '  · no token'))));
        box.appendChild(row);
      });
      layer.appendChild(box);
      var bh = box.offsetHeight, vh = window.innerHeight, top = r.bottom + 6 * f;
      if (top + bh > vh - 4) top = Math.max(4, r.top - 6 * f - bh);
      box.style.left = Math.max(4, Math.min(r.left, window.innerWidth - box.offsetWidth - 4)) + 'px';
      box.style.top = top + 'px';
    }
    function pick(e) {
      var t = e.target;
      if (!t || t.nodeType !== 1 || t === document.documentElement || t === document.body || t.id === 'root' || (layer && layer.contains(t))) return null;
      return t;
    }
    function show(t) {
      cur = t;
      draw(t);
      parent.postMessage({ ds: cfg.name, spec: t ? specOf(t) : null, pinned: !!pin }, '*');
    }
    function summary() {
      var all = {}, fonts = {}, used = {}, offs = { spacing: {}, radius: {} }, els = document.body.querySelectorAll('*'), n = Math.min(els.length, 1500);
      for (var i = 0; i < n; i++) {
        var el = els[i];
        if (layer && layer.contains(el)) continue;
        tokensOf(el, all);
        var kit = el.closest('[class^="q-"], [class*=" q-"]'), q = kit ? el.getBoundingClientRect() : null;
        if (kit && q.width > 0 && q.height > 0) {
          var own = tokensOf(el), o = offSpacing(el, own);
          o.pad.concat(o.mar, o.gap).forEach(function (v) { v = Math.abs(v); offs.spacing[v] = (offs.spacing[v] || 0) + 1; });
          offRadius(el, own).forEach(function (v) { offs.radius[v] = (offs.radius[v] || 0) + 1; });
          colorsOf(el).forEach(function (c) { if (c[0] === 'Icon' || c[0] === 'Gradient') return; var k = hex(c[1]); used[k] = (used[k] || 0) + 1; });
        }
        if ([].some.call(el.childNodes, function (x) { return x.nodeType === 3 && x.textContent.trim(); })) {
          var cs = getComputedStyle(el), fs = parseFloat(cs.fontSize);
          var lsr = cs.letterSpacing, lsv = lsr === 'normal' ? 0 : parseFloat(lsr);
          var k = [cs.fontFamily.split(',')[0].replace(/["']/g, '').trim(), px(fs), cs.fontWeight, cs.lineHeight === 'normal' ? '' : px(cs.lineHeight), /%$/.test(lsr) ? px(lsv) : (fs ? Math.round(lsv / fs * 1000) / 10 : 0), kit ? 1 : 0].join('|');
          fonts[k] = (fonts[k] || 0) + 1;
        }
      }
      parent.postMessage({ ds: cfg.name, summary: { tokens: all, fonts: fonts, off: offs, colors: used } }, '*');
    }
    document.addEventListener('mousemove', function (e) { if (!on || pin) return; var t = pick(e); if (t !== cur) show(t); }, true);
    document.addEventListener('focusin', function (e) { if (!on || pin) return; var t = pick(e); if (t) show(t); }, true);
    document.addEventListener('click', function (e) {
      if (!on) return;
      e.preventDefault(); e.stopPropagation();
      var t = pick(e);
      pin = pin && pin === t ? null : t;
      show(t);
    }, true);
    document.addEventListener('submit', function (e) { if (on) e.preventDefault(); }, true);
    window.addEventListener('scroll', function () { if (on && cur) draw(cur); }, true);
    window.addEventListener('resize', function () { if (on && cur) draw(cur); });
    window.addEventListener('message', function (e) {
      var d = e.data;
      if (!d || d.dsSpecs !== cfg.name || e.source !== parent) return;
      scale = d.scale || 1;
      if (d.mode && d.mode !== mode) { mode = d.mode; if (on && cur) show(cur); }
      if (d.on === on) { if (on && cur) draw(cur); return; }
      on = !!d.on;
      document.documentElement.style.cursor = on ? 'crosshair' : '';
      if (on) { if (!idx) build(); setTimeout(summary, 30); }
      else { pin = cur = null; draw(null); }
    });
  }
  function compose(c) {
    var html = c.html.replace('<head>', function () { return '<head>' + PRE; })
      .replace('<html lang="en">', '<html lang="en" data-theme="light">');
    html = blob(html);
    var rep = reporter(c.n) + '<' + SC + '>(' + inspector.toString() + ')(' + JSON.stringify({ name: c.n, kinds: D.kinds, scale: SCALE, colors: D.look.color }).replace(/</g, '\\u003c') + ');</' + SC + '>', i = html.lastIndexOf('</body>');
    return i < 0 ? html + rep : html.slice(0, i) + rep + html.slice(i);
  }

  /* The pixel values that are on a scale: spacing (with the layout margins and gutter) and radius. */
  var SCALE = { spacing: Object.keys(D.look.spacing).concat(D.look.layout || []).map(parseFloat).filter(function (v, i, a) { return v > 0 && a.indexOf(v) === i; }), radius: Object.keys(D.look.radius).map(parseFloat) };
  var byName = {};
  D.components.forEach(function (c) { byName[c.n] = c; });
  var stages = {};

  function fit(st) {
    var cw = st.el.clientWidth;
    if (!cw) return;
    var nat = st.w ? (cw >= st.w ? cw : st.w) : Math.max(cw, 560);
    var scale = st.actual ? 1 : Math.min(1, cw / nat);
    st.scale = scale;
    /* The cover's text starts 36px in from its left edge (24px when the cover is drawn narrower than 768px); every page sets its content in by the same amount, so the two line up. */
    if (st.c.n === 'Cover') document.documentElement.style.setProperty('--ds-inset', Math.round((nat < 768 ? 24 : 36) * scale * 10) / 10 + 'px');
    st.wrap.style.width = Math.round(nat * scale) + 'px';
    st.wrap.style.height = Math.round(st.h * scale) + 'px';
    if (st.frame) {
      st.frame.style.width = nat + 'px';
      st.frame.style.height = st.h + 'px';
      st.frame.style.transform = scale === 1 ? 'none' : 'scale(' + scale + ')';
    }
    if (st.btn) st.btn.hidden = !(nat > cw + 1) && !st.actual;
    if (st.specs) sendSpecs(st);
  }
  function sendSpecs(st) {
    if (st.frame && st.frame.contentWindow) st.frame.contentWindow.postMessage({ dsSpecs: st.c.n, on: !!st.specs, scale: st.scale || 1, mode: st.mode || 'measure' }, '*');
  }
  function mount(st) {
    if (st.frame) return;
    var f = document.createElement('iframe');
    f.title = st.c.n + ' preview';
    f.setAttribute('scrolling', 'no');
    f.srcdoc = compose(st.c);
    f.addEventListener('load', function () { if (st.specs) sendSpecs(st); });
    st.frame = f;
    st.wrap.appendChild(f);
    fit(st);
    /* Every preview reports its height within a moment of loading; silence means the viewer blocked it. */
    setTimeout(function () {
      if (st.heard) return;
      if (!st.wait) { st.wait = document.createElement('p'); st.wait.className = 'ds-wait'; st.wrap.appendChild(st.wait); }
      st.wait.textContent = 'This preview could not load here.';
    }, 9000);
  }
  var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (e) { if (e.isIntersecting) { var st = stages[e.target.getAttribute('data-c')]; if (st) mount(st); io.unobserve(e.target); } });
  }, { rootMargin: '700px 0px' }) : null;
  var ro = 'ResizeObserver' in window ? new ResizeObserver(function (entries) {
    entries.forEach(function (e) { var st = stages[e.target.getAttribute('data-c')]; if (st) fit(st); });
  }) : null;

  Array.prototype.forEach.call(document.querySelectorAll('.ds-stage[data-c]'), function (el) {
    var c = byName[el.getAttribute('data-c')];
    if (!c) return;
    var wrap = document.createElement('div');
    wrap.className = 'ds-fit';
    var wait = document.createElement('p');
    wait.className = 'ds-wait';
    wait.textContent = 'Loading preview';
    el.appendChild(wrap);
    wrap.appendChild(wait);
    var st = { el: el, wrap: wrap, wait: wait, c: c, w: c.w || 0, h: c.h || 300, n: 0, actual: false, frame: null, btn: null };
    stages[c.n] = st;
    var card = el.closest('.ds-card');
    st.btn = card ? card.querySelector('.ds-size') : null;
    st.spec = card ? card.querySelector('.ds-specs') : null;
    st.panel = card ? card.querySelector('.ds-specpanel') : null;
    if (st.spec && st.panel) st.spec.addEventListener('click', function () { toggleDrawer(st, 'specs'); });
    st.codeBtn = card ? card.querySelector('.ds-code') : null;
    if (st.codeBtn) st.codeBtn.addEventListener('click', function () { toggleDrawer(st, 'code'); });
    if (st.btn) st.btn.addEventListener('click', function () {
      st.actual = !st.actual;
      el.classList.toggle('is-actual', st.actual);
      st.btn.textContent = st.actual ? 'Fit to width' : 'Actual size';
      st.btn.setAttribute('aria-pressed', st.actual ? 'true' : 'false');
      fit(st);
    });
    fit(st);
    if (ro) ro.observe(el);
    if (io) io.observe(el); else mount(st);
  });

  /* ── Code panel: the component's props and the code that draws its preview ── */
  /* Light coloring only: comments, strings, and the names a developer scans for. Built from text nodes, never markup. */
  function paint(pre, text) {
    var re = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*)|('(?:[^'\\\n]|\\.)*'|"(?:[^"\\\n]|\\.)*")|\b(Q\.[A-Za-z]+|export|interface|type|declare|function|var|return)\b/g, last = 0, m;
    while ((m = re.exec(text))) {
      if (m.index > last) pre.appendChild(document.createTextNode(text.slice(last, m.index)));
      pre.appendChild(mk('span', m[1] ? 'c' : (m[2] ? 's' : 'k'), m[0]));
      last = m.index + m[0].length;
    }
    if (last < text.length) pre.appendChild(document.createTextNode(text.slice(last)));
  }
  function exampleOf(c) {
    var a = c.html.lastIndexOf('<' + SC + '>'), b = c.html.lastIndexOf('</' + SC + '>');
    return a < 0 || b < a ? '' : c.html.slice(a + SC.length + 2, b).replace(/^\s*\n/, '').replace(/\s+$/, '');
  }
  function codeBlock(title, hint, text) {
    var box = mk('div', 'ds-codeblock'), head = mk('div', 'ds-codehead'), copy = mk('button', 'ds-copybtn', 'Copy'), pre = mk('pre');
    copy.type = 'button';
    head.appendChild(mk('h3', null, title));
    if (hint) head.appendChild(mk('span', null, hint));
    head.appendChild(copy);
    pre.tabIndex = 0;
    pre.setAttribute('aria-label', title + ' code');
    paint(pre, text);
    copy.addEventListener('click', function () {
      function done(msg) { copy.textContent = msg; setTimeout(function () { copy.textContent = 'Copy'; }, 2400); }
      function select() {
        var r = document.createRange(), sel = window.getSelection();
        r.selectNodeContents(pre); sel.removeAllRanges(); sel.addRange(r);
        done('Selected: press Ctrl or Cmd + C');
      }
      try { navigator.clipboard.writeText(text).then(function () { done('Copied'); }, select); } catch (err) { select(); }
    });
    box.appendChild(head); box.appendChild(pre);
    return box;
  }
  /* One side panel for the whole page. It slides in from the right and holds either the specs or the code of one component;
     opening one closes the other. On a wide screen the page makes room for it, so the preview stays in view beside it. */
  var drawer = null, drawerIcon = null, drawerTitle = null, drawerBody = null, drawerClose = null, open = null, app = document.querySelector('.ds-app');
  function buildDrawer() {
    drawer = mk('aside', 'ds-drawer');
    drawer.id = 'ds-drawer';
    drawer.setAttribute('role', 'dialog');
    drawer.setAttribute('aria-modal', 'false');
    drawer.setAttribute('aria-labelledby', 'ds-drawer-t');
    var head = mk('header', 'ds-drawer-head');
    drawerClose = mk('button', 'ds-drawer-close');
    drawerIcon = mk('span', 'ds-drawer-icon');
    head.appendChild(drawerIcon);
    drawerTitle = mk('h2'); drawerTitle.id = 'ds-drawer-t'; drawerTitle.tabIndex = -1;
    head.appendChild(drawerTitle);
    drawerClose.type = 'button';
    var x = document.createElementNS('http://www.w3.org/2000/svg', 'svg'), path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    x.setAttribute('viewBox', '0 0 24 24'); x.setAttribute('width', '20'); x.setAttribute('height', '20'); x.setAttribute('fill', 'none'); x.setAttribute('stroke', 'currentColor');
    x.setAttribute('stroke-width', '2'); x.setAttribute('stroke-linecap', 'round'); x.setAttribute('aria-hidden', 'true');
    path.setAttribute('d', 'M6 6l12 12M18 6L6 18');
    x.appendChild(path); drawerClose.appendChild(x);
    drawerClose.addEventListener('click', function () { closeDrawer(true); });
    head.appendChild(drawerClose);
    drawerBody = mk('div', 'ds-drawer-body');
    drawer.appendChild(head); drawer.appendChild(drawerBody);
    document.body.appendChild(drawer);
    drawer.addEventListener('keydown', function (e) { if (e.key === 'Escape') { e.stopPropagation(); closeDrawer(true); } });
  }
  function closeDrawer(refocus) {
    if (!open) return;
    var o = open, st = o.st;
    open = null;
    if (o.kind === 'code') st.codeBtn.setAttribute('aria-expanded', 'false');
    else {
      /* The specs go back to their card, hidden, and the preview stops inspecting. */
      st.specs = false;
      st.spec.setAttribute('aria-expanded', 'false');
      st.el.classList.remove('is-specs');
      st.panel.hidden = true;
      if (st.panelHome) st.panelHome.parent.insertBefore(st.panel, st.panelHome.next);
      sendSpecs(st);
    }
    drawer.classList.remove('is-open');
    if (app) app.classList.remove('has-drawer');
    if (refocus) (o.kind === 'code' ? st.codeBtn : st.spec).focus();
  }
  function openDrawer(st, kind) {
    closeDrawer(false);
    if (!drawer) { buildDrawer(); drawer.getBoundingClientRect(); /* so the first opening slides in too */ }
    var btn = kind === 'code' ? st.codeBtn : st.spec, icon = btn.querySelector('svg');
    drawerIcon.textContent = '';
    if (icon) drawerIcon.appendChild(icon.cloneNode(true));
    drawerTitle.textContent = st.c.n + (kind === 'code' ? ' code' : ' specs');
    drawerClose.setAttribute('aria-label', kind === 'code' ? 'Close code panel' : 'Close specs panel');
    drawerBody.textContent = '';
    drawerBody.scrollTop = 0;
    btn.setAttribute('aria-expanded', 'true');
    open = { st: st, kind: kind };
    if (kind === 'code') fillCode(st, drawerBody);
    else {
      panel(st);
      if (!st.panelHome) st.panelHome = { parent: st.panel.parentNode, next: st.panel.nextSibling };
      drawerBody.appendChild(st.panel);
      st.panel.hidden = false;
      st.specs = true;
      st.el.classList.add('is-specs');
      mount(st);
      sendSpecs(st);
    }
    drawer.classList.add('is-open');
    if (app) app.classList.add('has-drawer');
    drawerTitle.focus({ preventScroll: true });
    /* The page reflows when it makes room: keep the component the reader asked about in view. */
    var card = st.el.closest('.ds-card');
    [60, 420].forEach(function (t) { setTimeout(function () { if (open && open.st === st && card) { var r = card.getBoundingClientRect(); if (r.top < 0 || r.top > window.innerHeight * 0.6) card.scrollIntoView({ block: 'start' }); } }, t); });
  }
  function toggleDrawer(st, kind) { if (open && open.st === st && open.kind === kind) closeDrawer(false); else openDrawer(st, kind); }
  function fillCode(st, p) {
    var intro = mk('p');
    intro.appendChild(document.createTextNode('Load '));
    intro.appendChild(mk('code', null, 'components/bundle.css'));
    intro.appendChild(document.createTextNode(' and '));
    intro.appendChild(mk('code', null, 'components/bundle.js'));
    intro.appendChild(document.createTextNode(' (React 18); every component is then on '));
    intro.appendChild(mk('code', null, 'window.Qualys'));
    intro.appendChild(document.createTextNode('. Types are in '));
    intro.appendChild(mk('code', null, 'components/index.d.ts'));
    intro.appendChild(document.createTextNode('.'));
    p.appendChild(intro);
    var types = D.types[st.c.n], ex = exampleOf(st.c);
    if (types) p.appendChild(codeBlock('Props', 'TypeScript', types));
    if (ex) p.appendChild(codeBlock('Example', 'the code that draws the preview', ex));
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open && !e.defaultPrevented) closeDrawer(drawer.contains(document.activeElement)); });
  /* Moving to another page closes the panel: its component is no longer on screen. */
  window.addEventListener('hashchange', function () { setTimeout(function () { var v = open && open.st.el.closest('.ds-view'); if (v && v.hidden) closeDrawer(false); }, 0); });

  /* ── Specs panel: what the reader pointed at, and the tokens the whole component uses ── */
  function mk(tag, cls, text) { var e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; }
  function hexOf(c) {
    var m = /^rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\s*\)$/.exec(c || '');
    if (!m) return null;
    var a = m[4] === undefined ? 1 : +m[4];
    if (a === 0) return 'none';
    var h = '#' + [1, 2, 3].map(function (i) { return ('0' + (+m[i]).toString(16)).slice(-2); }).join('');
    return a === 1 ? h : h + '/' + a;
  }
  function colorText(h) { var p = h.split('/'); return p[1] ? p[0].toUpperCase() + ' at ' + Math.round(p[1] * 100) + '%' : p[0].toUpperCase(); }
  function token(name) {
    var t = mk('span', 'ds-tok');
    if (D.kinds[name] === 'color') { var dot = mk('span', 'ds-dot'); dot.style.background = 'var(--' + name + ')'; t.appendChild(dot); }
    t.appendChild(document.createTextNode(name));
    return t;
  }
  function declared(spec, props, state) {
    var d = (spec.tokens || {})[state || 'default'] || {}, out = [];
    props.forEach(function (p) { (d[p] || []).forEach(function (n) { if (out.indexOf(n) < 0) out.push(n); }); });
    return out;
  }
  function quad(a) {
    var t = a[0], r = a[1], b = a[2], l = a[3];
    var s = t === r && r === b && b === l ? [t] : (t === b && r === l ? [t, r] : (r === l ? [t, r, b] : [t, r, b, l]));
    return s.map(function (v) { return v ? v + 'px' : '0'; }).join(' ');
  }
  function fromValues(values, table) {
    var out = [];
    values.forEach(function (v) { var n = table[v]; if (n && out.indexOf(n) < 0) out.push(n); });
    return out;
  }
  function row(dl, label, value, toks) {
    dl.appendChild(mk('dt', null, label));
    var dd = mk('dd');
    if (value) dd.appendChild(typeof value === 'string' ? mk('span', null, value) : value);
    (toks || []).forEach(function (n) { dd.appendChild(token(n)); });
    dl.appendChild(dd);
    return dd;
  }
  function swatch(h, text) {
    var w = mk('span');
    w.style.cssText = 'display:inline-flex;align-items:center;gap:6px';
    var dot = mk('span', 'ds-dot'), p = h.split('/');
    dot.style.background = p[0]; if (p[1]) dot.style.opacity = p[1];
    w.appendChild(dot); w.appendChild(document.createTextNode(text));
    return w;
  }
  var SIDES = ['', '-top', '-right', '-bottom', '-left', '-inline', '-block', '-inline-start', '-inline-end', '-block-start', '-block-end'];
  function sides(p) { return SIDES.map(function (s) { return p + s; }); }
  var STATES = { hover: 'On hover', active: 'When pressed', 'focus-visible': 'On keyboard focus', focus: 'On focus', 'focus-within': 'With focus inside', disabled: 'Disabled', checked: 'Checked' };
  /* The type styles that match what is drawn: family, size and weight first, then line height and letter spacing to tell near-twins apart. */
  /* A style matches when family, size, weight, line height and letter spacing all agree. Paragraph styles also come in Medium and SemiBold, tags in Medium and Bold.
     When only the family and size agree, the nearest style is named along with what differs. No style of that size at all means the size is off the type scale. */
  function styleMatch(f) {
    var same = D.typeStyles.filter(function (t) { return parseFloat(t.fs) === f.fs && t.ff === f.ff; }), exact = [], near = null;
    same.forEach(function (t) {
      var fw = String(f.fw), w = fw === String(t.fw) || (/^paragraph/.test(t.n) && /^(400|500|600)$/.test(fw)) || (/^tag/.test(t.n) && /^(500|600|700)$/.test(fw));
      var l = !f.lh || Math.abs(parseFloat(t.lh) * f.fs - f.lh) < 0.6, sp = Math.abs((parseFloat(t.ls) || 0) - (f.ls || 0)) < 0.11;
      if (w && l && sp) { exact.push(t.n); return; }
      var diff = [];
      if (!w) diff.push('weight ' + t.fw);
      if (!l) diff.push('line height ' + t.lh);
      if (!sp) diff.push('letter spacing ' + t.ls);
      var score = diff.length * 100 + Math.abs((parseFloat(t.ls) || 0) - (f.ls || 0)) + (f.lh ? Math.abs(parseFloat(t.lh) - f.lh / f.fs) * 10 : 0);
      if (!near || score < near.score) near = { n: t.n, diff: diff, score: score };
    });
    return { exact: exact.slice(0, 3), near: exact.length ? null : near, none: !same.length };
  }
  function styleNames(f) { return styleMatch(f).exact; }
  function flag(text, cls) { return mk('span', 'ds-tok ' + (cls || 'is-off'), text); }
  function typeChips(f, into) {
    var m = styleMatch(f);
    m.exact.forEach(function (n) { into.appendChild(token(n)); });
    if (m.near) { into.appendChild(flag('\u2248 ' + m.near.n, 'is-near')); into.appendChild(mk('span', 'ds-why', 'the style has ' + m.near.diff.join(', '))); }
    if (m.none) into.appendChild(flag('no type style at ' + f.fs + 'px'));
    return m;
  }
  var HINT = {
    measure: 'Point at any part of the preview to see its size, spacing, type and tokens. Click a part to keep it selected; click it again to let go.',
    color: 'Point at any part of the preview to see the colors it is drawn with, their tokens and the contrast of its text. Click a part to keep it selected.'
  };
  function panel(st) {
    var p = st.panel;
    if (p.firstChild) return;
    st.mode = st.mode || 'measure';
    /* Two ways to inspect: measurements, or color. */
    var bar = mk('div', 'ds-modes'), group = mk('div', 'ds-seg');
    group.setAttribute('role', 'group');
    group.setAttribute('aria-label', 'Inspect');
    st.modeBtns = {};
    [['measure', 'Measure'], ['color', 'Color']].forEach(function (m) {
      var b = mk('button', null, m[1]);
      b.type = 'button';
      b.setAttribute('aria-pressed', st.mode === m[0] ? 'true' : 'false');
      b.addEventListener('click', function () { setMode(st, m[0]); });
      st.modeBtns[m[0]] = b;
      group.appendChild(b);
    });
    bar.appendChild(group);
    /* Chrome and Edge can pick any pixel on screen; the result is matched to the palette. */
    if (window.EyeDropper) {
      var pickBtn = mk('button', 'ds-pickbtn', 'Pick a color from the screen');
      pickBtn.type = 'button';
      pickBtn.hidden = st.mode !== 'color';
      pickBtn.addEventListener('click', function () {
        new window.EyeDropper().open().then(function (r) { showPicked(st, r.sRGBHex); }, function () {});
      });
      st.pickBtn = pickBtn;
      bar.appendChild(pickBtn);
    }
    p.appendChild(bar);
    st.hint = mk('p', 'ds-spechint', HINT[st.mode]);
    p.appendChild(st.hint);
    st.key = mk('ul', 'ds-key');
    [['#2683ed', 'Element', true], ['rgba(33,184,115,.5)', 'Padding'], ['rgba(245,166,36,.55)', 'Margin'], ['rgba(128,69,138,.45)', 'Space between items'], ['#c42b1c', 'Value with no token']].forEach(function (k) {
      var li = mk('li'), i = mk('i');
      if (k[2]) { i.style.border = '2px solid ' + k[0]; } else i.style.background = k[0];
      li.appendChild(i); li.appendChild(document.createTextNode(k[1])); st.key.appendChild(li);
    });
    st.key.hidden = st.mode !== 'measure';
    p.appendChild(st.key);
    st.picked = mk('div', 'ds-picked'); st.picked.hidden = true; st.picked.setAttribute('aria-live', 'polite'); p.appendChild(st.picked);
    st.specEl = mk('div', 'ds-specel'); st.specEl.hidden = true; st.specEl.setAttribute('aria-live', 'polite'); p.appendChild(st.specEl);
    st.specSum = mk('div', 'ds-specsum'); st.specSum.appendChild(mk('p', null, 'Reading the tokens this component uses…')); p.appendChild(st.specSum);
  }
  function setMode(st, m) {
    st.mode = m;
    Object.keys(st.modeBtns).forEach(function (k) { st.modeBtns[k].setAttribute('aria-pressed', k === m ? 'true' : 'false'); });
    st.hint.textContent = HINT[m];
    st.key.hidden = m !== 'measure';
    if (st.pickBtn) st.pickBtn.hidden = m !== 'color';
    if (m !== 'color') st.picked.hidden = true;
    sendSpecs(st);
  }
  /* The palette as numbers, for the nearest match to a picked pixel. */
  var PALETTE = null;
  function palette() {
    if (PALETTE) return PALETTE;
    PALETTE = Object.keys(D.look.color).filter(function (k) { return k.indexOf('/') < 0; }).map(function (k) { return { hex: k, rgb: [1, 3, 5].map(function (i) { return parseInt(k.substr(i, 2), 16); }), names: D.look.color[k] }; });
    return PALETTE;
  }
  function showPicked(st, hx) {
    hx = String(hx).toLowerCase();
    var box = st.picked, rgb = [1, 3, 5].map(function (i) { return parseInt(hx.substr(i, 2), 16); });
    box.textContent = '';
    box.hidden = false;
    box.appendChild(mk('h3', null, 'Picked from the screen'));
    var dl = mk('dl', 'ds-specrows'), exact = D.look.color[hx];
    var dd = row(dl, 'Color', swatch(hx, hx.toUpperCase()), exact ? exact.slice(0, 4) : []);
    if (!exact) {
      var best = null;
      palette().forEach(function (c) { var d = Math.sqrt(c.rgb.reduce(function (a, v, i) { return a + Math.pow(v - rgb[i], 2); }, 0)); if (!best || d < best.d) best = { c: c, d: d }; });
      dd.appendChild(flag('no token'));
      if (best) { var nd = row(dl, 'Nearest', swatch(best.c.hex, best.c.hex.toUpperCase()), best.c.names.slice(0, 3)); nd.appendChild(mk('span', 'ds-why', best.d < 12 ? 'almost the same: probably this token, blended or smoothed at an edge' : 'a different color')); }
    }
    box.appendChild(dl);
  }
  function ratioText(c) {
    if (!c) return null;
    if (c.over) return 'Text over a ' + c.over + ': check the contrast by eye at its lightest point.';
    var need = c.big ? 3 : 4.5, pass = c.ratio >= need;
    return c.ratio.toFixed(2) + ':1 \u00b7 ' + (pass ? 'passes' : 'fails') + ' WCAG AA for ' + (c.big ? 'large' : 'normal') + ' text (' + need + ':1)';
  }
  function renderColor(st, s, box) {
    var dl = mk('dl', 'ds-specrows'), PROPS = { color: ['color'], background: ['background', 'background-color', 'background-image'], border: sides('border').concat(['border-color', 'border-top-color', 'border-bottom-color', 'border-left-color', 'border-right-color']), fill: ['fill'], stroke: ['stroke'] };
    (s.colors || []).forEach(function (c) {
      if (c[0] === 'Gradient') { row(dl, 'Gradient', mk('span', 'ds-grad', ''), declared(s, PROPS.background)).firstChild.style.background = c[1]; return; }
      var hx = hexOf(c[1]) || c[1], toks = declared(s, PROPS[c[2]] || []), same = D.look.color[hx] || [];
      if (c[2] === 'color' && !toks.length) toks = s.inherited || [];
      /* Rules for other states name other tokens too: keep the ones that give the color drawn now. */
      var match = toks.filter(function (n) { return same.indexOf(n) >= 0; });
      if (match.length) toks = match;
      else if (toks.length && same.length) toks = same.slice(0, 3);
      if (!toks.length) toks = same.slice(0, 3);
      var dd = row(dl, c[0], swatch(hx, colorText(hx)), toks);
      if (s.inKit && !toks.length) dd.appendChild(flag('no token'));
    });
    if (s.contrast) {
      var t = ratioText(s.contrast), cd = row(dl, 'Contrast', t);
      if (s.contrast.bg) { var on = hexOf(s.contrast.bg); cd.appendChild(mk('span', 'ds-why', 'on ' + on.toUpperCase() + ((D.look.color[on] || [])[0] ? ' (' + D.look.color[on][0] + ')' : ''))); }
      if (s.contrast.ratio && s.contrast.ratio < (s.contrast.big ? 3 : 4.5)) cd.appendChild(flag('low contrast'));
    }
    if (!dl.firstChild) row(dl, 'Color', 'No color of its own: what shows here comes from the parts inside it or behind it.');
    box.appendChild(dl);
  }
  function renderSpec(st, s, pinned) {
    var box = st.specEl;
    box.textContent = '';
    box.hidden = !s;
    if (!s) return;
    var h = mk('h3'), name = s.tag + (s.cls.length ? '.' + s.cls.join('.') : '');
    h.appendChild(mk('code', null, name));
    h.appendChild(mk('span', null, s.w + ' × ' + s.h + 'px' + (pinned ? ' · selected' : '')));
    box.appendChild(h);
    if (s.mode === 'color') { renderColor(st, s, box); return; }
    var dl = mk('dl', 'ds-specrows');
    function px(a) { return a.filter(function (v) { return v; }).map(function (v) { return v + 'px'; }); }
    var off = s.off || { pad: [], mar: [], gap: [] };
    function offs(dd, list) { list.forEach(function (v) { dd.appendChild(flag(Math.abs(v) + 'px \u00b7 no token')); }); }
    if (s.pad.some(Boolean)) { var pt = declared(s, sides('padding')); offs(row(dl, 'Padding', quad(s.pad), pt.length ? pt : fromValues(px(s.pad), D.look.spacing)), off.pad); }
    if (s.mar.some(Boolean)) { var mt = declared(s, sides('margin')); offs(row(dl, 'Margin', quad(s.mar), mt.length ? mt : fromValues(px(s.mar), D.look.spacing)), off.mar); }
    if (s.gap && (s.gap[0] || s.gap[1])) { var gt = declared(s, ['gap', 'row-gap', 'column-gap']); offs(row(dl, 'Gap', s.gap[0] === s.gap[1] ? s.gap[0] + 'px' : s.gap[0] + 'px rows, ' + s.gap[1] + 'px columns', gt.length ? gt : fromValues(px(s.gap), D.look.spacing)), off.gap); }
    var rad = s.radius.filter(function (v, i, a) { return a.indexOf(v) === i; });
    if (rad.some(function (v) { return parseFloat(v) > 0; })) {
      var rt = declared(s, ['border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius']);
      offs(row(dl, 'Radius', s.radius.every(function (v) { return v === s.radius[0]; }) ? s.radius[0] : s.radius.join(' '), rt.length ? rt : fromValues(rad, D.look.radius)), s.offRadius || []);
    }
    if (s.bw.some(Boolean) && s.borderStyle !== 'none') {
      var bh = hexOf(s.borderColor), bt = declared(s, sides('border').concat(['border-color', 'border-top-color', 'border-bottom-color', 'border-left-color', 'border-right-color']));
      var bl = bt.length ? bt : (bh ? (D.look.color[bh] || []).slice(0, 3) : []), bd = row(dl, 'Border', swatch(bh && bh !== 'none' ? bh : '#000', quad(s.bw) + ' ' + s.borderStyle + (bh && bh !== 'none' ? ' ' + colorText(bh) : '')), bl);
      if (s.inKit && bh && bh !== 'none' && !bl.length) bd.appendChild(flag('no token'));
    }
    if (s.font) {
      var f = s.font, parts = [f.ff, f.fw, f.fs + 'px' + (f.lh ? ' / ' + f.lh + 'px' : '')];
      if (f.ls) parts.push((f.ls > 0 ? '+' : '−') + Math.abs(f.ls) + '% letter spacing');
      if (f.tt && f.tt !== 'none') parts.push(f.tt);
      var td = row(dl, 'Type', parts.join(' · '), []);
      if (s.inKit) typeChips(f, td); else styleNames(f).forEach(function (n) { td.appendChild(token(n)); });
      declared(s, ['font-family', 'font']).forEach(function (n) { td.appendChild(token(n)); });
      var ch = hexOf(s.color), ct = declared(s, ['color']);
      if (!ct.length) ct = s.inherited || [];
      if (ch && ch !== 'none') { var cl = ct.length ? ct : (D.look.color[ch] || []).slice(0, 3), cd = row(dl, 'Text color', swatch(ch, colorText(ch)), cl); if (s.inKit && !cl.length) cd.appendChild(flag('no token')); }
    }
    var gh = hexOf(s.bg), gt2 = declared(s, ['background', 'background-color', 'background-image']);
    if ((gh && gh !== 'none') || s.bgImage) {
      var gl = gt2.length ? gt2 : (gh ? (D.look.color[gh] || []).slice(0, 3) : []), gd = row(dl, 'Background', gh && gh !== 'none' ? swatch(gh, colorText(gh)) : (/gradient/.test(s.bgImage) ? 'Gradient' : 'Image'), gl);
      if (s.inKit && gh && gh !== 'none' && !gl.length) gd.appendChild(flag('no token'));
    }
    if (s.shadow) { var sh = declared(s, ['box-shadow']); row(dl, 'Shadow', sh.length ? '' : 'Set on the component', sh); }
    if (s.opacity && +s.opacity < 1) row(dl, 'Opacity', Math.round(s.opacity * 100) + '%');
    Object.keys(s.tokens || {}).forEach(function (state) {
      if (state === 'default') return;
      var list = [], d = s.tokens[state];
      Object.keys(d).forEach(function (prop) { d[prop].forEach(function (n) { if (list.indexOf(n) < 0) list.push(n); }); });
      if (list.length) row(dl, STATES[state] || state, '', list);
    });
    if (!dl.firstChild) row(dl, 'Box', 'No padding, border, text or fill of its own. It only lays out what is inside it.');
    box.appendChild(dl);
  }
  function renderSummary(st, sum) {
    var box = st.specSum, groups = { color: [], spacing: [], radius: [], shadow: [], font: [], layout: [], layer: [] };
    box.textContent = '';
    box.appendChild(mk('h3', null, 'Tokens this component uses'));
    Object.keys(sum.tokens || {}).forEach(function (state) {
      var d = sum.tokens[state];
      Object.keys(d).forEach(function (prop) { d[prop].forEach(function (n) { var g = groups[D.kinds[n]]; if (g && g.indexOf(n) < 0) g.push(n); }); });
    });
    var dl = mk('dl', 'ds-specrows');
    [['color', 'Color'], ['spacing', 'Spacing'], ['radius', 'Radius'], ['shadow', 'Shadow'], ['font', 'Font'], ['layout', 'Layout'], ['layer', 'Layer']].forEach(function (g) {
      if (groups[g[0]].length) row(dl, g[1], '', groups[g[0]].sort());
    });
    var fonts = Object.keys(sum.fonts || {}).sort(function (a, b) { return sum.fonts[b] - sum.fonts[a]; }), nearType = [], noType = [];
    function fontOf(k) { var p = k.split('|'); return { ff: p[0], fs: +p[1], fw: p[2], lh: p[3] ? +p[3] : null, ls: +p[4] || 0, kit: p[5] === '1', text: p[0] + ' · ' + p[2] + ' · ' + p[1] + 'px' + (p[3] ? ' / ' + p[3] + 'px' : '') }; }
    if (fonts.length) {
      var wrap = mk('span');
      wrap.style.cssText = 'display:flex;flex-direction:column;gap:4px';
      fonts.forEach(function (k, i) {
        var f = fontOf(k), m = styleMatch(f);
        if (f.kit && m.near) nearType.push([f, m]);
        if (f.kit && m.none && f.ff !== 'Arial') noType.push(f);
        if (i >= 8) return;
        var line = mk('span');
        line.style.cssText = 'display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px';
        line.appendChild(mk('span', null, f.text));
        m.exact.forEach(function (n) { line.appendChild(token(n)); });
        wrap.appendChild(line);
      });
      row(dl, 'Type', wrap);
    }
    if (!dl.firstChild) box.appendChild(mk('p', null, 'No tokens found in this preview.')); else box.appendChild(dl);
    box.appendChild(mk('p', null, 'Read from the styles of the preview as it is drawn here; rules for other screen sizes are not included.'));
    /* Every color the component draws with, most used first, each with its token or a flag. */
    var used = Object.keys(sum.colors || {}).sort(function (a, b) { return sum.colors[b] - sum.colors[a]; });
    if (used.length) {
      box.appendChild(mk('h3', null, 'Colors drawn'));
      var grid = mk('ul', 'ds-cused');
      used.slice(0, 24).forEach(function (hx) {
        var li = mk('li'), names = D.look.color[hx] || [];
        li.appendChild(swatch(hx, colorText(hx)));
        if (names.length) li.appendChild(token(names[0])); else li.appendChild(flag('no token'));
        li.appendChild(mk('span', 'ds-why', '\u00d7' + sum.colors[hx]));
        grid.appendChild(li);
      });
      box.appendChild(grid);
    }
    /* What is not on the system: spacing and corners that match no token, and text that matches no type style. */
    var o = sum.off || { spacing: {}, radius: {} }, sp = Object.keys(o.spacing).map(Number).sort(function (a, b) { return a - b; }), ra = Object.keys(o.radius).map(Number).sort(function (a, b) { return a - b; });
    box.appendChild(mk('h3', null, 'Values with no token'));
    if (!sp.length && !ra.length && !nearType.length && !noType.length) { box.appendChild(mk('p', null, 'None: every spacing, corner and text style drawn here is on the system.')); return; }
    var ol = mk('dl', 'ds-specrows');
    function many(label, list, unit, counts) { if (!list.length) return; var dd = row(ol, label, '', []); list.forEach(function (v) { dd.appendChild(flag(v + unit + (counts[v] > 1 ? ' \u00d7' + counts[v] : ''))); }); }
    many('Spacing', sp, 'px', o.spacing);
    many('Radius', ra, 'px', o.radius);
    if (noType.length) { var nd = row(ol, 'Type size', '', []); noType.forEach(function (f) { nd.appendChild(flag(f.text)); }); }
    if (nearType.length) {
      var nw = mk('span');
      nw.style.cssText = 'display:flex;flex-direction:column;gap:4px';
      nearType.slice(0, 10).forEach(function (x) {
        var line = mk('span');
        line.style.cssText = 'display:flex;flex-wrap:wrap;align-items:center;gap:4px 8px';
        line.appendChild(mk('span', null, x[0].text));
        line.appendChild(flag('\u2248 ' + x[1].near.n, 'is-near'));
        line.appendChild(mk('span', 'ds-why', 'the style has ' + x[1].near.diff.join(', ')));
        nw.appendChild(line);
      });
      row(ol, 'Type detail', nw);
    }
    box.appendChild(ol);
    box.appendChild(mk('p', null, 'Values under 4px (optical nudges), sizes and positions are not counted. Point at a part to see which value is its own.'));
  }

  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || typeof d.ds !== 'string') return;
    var st = stages[d.ds];
    if (!st || !st.frame || e.source !== st.frame.contentWindow) return;
    if (d.summary || d.spec !== undefined) {
      if (!st.specs) return;
      if (d.summary) renderSummary(st, d.summary); else renderSpec(st, d.spec, d.pinned);
      return;
    }
    if (typeof d.h !== 'number') return;
    if (!st.heard && st.specs) sendSpecs(st);
    st.heard = true;
    if (st.wait) { st.wait.remove(); st.wait = null; }
    if (d.h < 20 || d.h > 20000 || Math.abs(d.h - st.h) < 2 || st.n > 40) return;
    st.n += 1;
    st.h = d.h;
    fit(st);
  });

  /* Asset tiles take their pictures from the same store the previews use. */
  var assetsDone = false;
  function fillAssets() {
    if (assetsDone) return;
    assetsDone = true;
    Array.prototype.forEach.call(document.querySelectorAll('img[data-blob]'), function (img) {
      var u = D.assets[img.getAttribute('data-blob')];
      if (u) img.src = u;
    });
  }
  Array.prototype.forEach.call(document.querySelectorAll('img[data-logo]'), function (img) {
    var u = D.assets[img.getAttribute('data-logo')];
    if (u) img.src = u;
  });

  /* Example page: one frame at the chosen device's size. It scrolls inside, like a browser window; it is scaled down only to fit the column. */
  var ex = { frame: null, w: 1440, h: 900 };
  function fitExample() {
    var stage = document.querySelector('.ds-devstage'), box = stage && stage.querySelector('.ds-devfit');
    if (!box || !ex.frame) return;
    var cw = stage.clientWidth, sc = Math.min(1, cw / ex.w);
    box.style.width = Math.round(ex.w * sc) + 'px'; box.style.height = Math.round(ex.h * sc) + 'px';
    ex.frame.style.width = ex.w + 'px'; ex.frame.style.height = ex.h + 'px';
    ex.frame.style.transform = sc === 1 ? 'none' : 'scale(' + sc + ')';
    var note = document.getElementById('ds-devnote');
    if (note) note.textContent = sc < 1 ? 'Shown at ' + Math.round(sc * 100) + '% to fit this column. Open it in a new tab to see it at full size, and resize the window to watch it respond.' : 'Shown at actual size.';
  }
  function showExample() {
    var stage = document.querySelector('.ds-devstage'), c = byName.ExamplePage;
    if (!stage || !c) return;
    if (!ex.frame) {
      var f = document.createElement('iframe');
      f.title = 'Example page';
      f.srcdoc = compose(c);
      ex.frame = f;
      stage.querySelector('.ds-devfit').appendChild(f);
      Array.prototype.forEach.call(document.querySelectorAll('.ds-dev'), function (b) {
        b.addEventListener('click', function () {
          ex.w = +b.getAttribute('data-w'); ex.h = +b.getAttribute('data-h');
          Array.prototype.forEach.call(document.querySelectorAll('.ds-dev'), function (o) { o.setAttribute('aria-pressed', o === b ? 'true' : 'false'); });
          fitExample();
        });
      });
      window.addEventListener('resize', fitExample);
    }
    fitExample();
  }

  /* Views: one section shows at a time; the address keeps a plain token (#guide-2, #c-Button). */
  var views = Array.prototype.slice.call(document.querySelectorAll('.ds-view'));
  var rail = document.getElementById('ds-rail');
  var menu = document.getElementById('ds-menu');
  var find = document.getElementById('ds-find');
  function closeRail() { rail.classList.remove('is-open'); if (menu) { menu.setAttribute('aria-expanded', 'false'); menu.textContent = 'Menu'; } }
  function show(token, jump) {
    var card = null, viewId = token;
    if (token.indexOf('c-') === 0) {
      card = document.getElementById(token);
      viewId = card ? card.closest('.ds-view').getAttribute('data-view') : 'components';
    }
    var view = null;
    views.forEach(function (v) { if (v.getAttribute('data-view') === viewId) view = v; });
    if (!view) { viewId = 'overview'; view = views[0]; token = 'overview'; card = null; }
    views.forEach(function (v) { v.hidden = v !== view; });
    /* Size the stages now, so a jump to a card lands in the right place. */
    Array.prototype.forEach.call(view.querySelectorAll('.ds-stage[data-c]'), function (el) { var st = stages[el.getAttribute('data-c')]; if (st) fit(st); });
    if (view.querySelector('img[data-blob]')) fillAssets();
    if (viewId === 'example') showExample();
    Array.prototype.forEach.call(rail.querySelectorAll('a[href^="#"]'), function (a) {
      var t = a.getAttribute('href').slice(1);
      if (t === token || (t === viewId && !rail.querySelector('a[href="#' + token + '"]'))) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    Array.prototype.forEach.call(rail.querySelectorAll('details[data-view]'), function (d) {
      var on = d.getAttribute('data-view') === viewId;
      d.classList.toggle('is-current', on);
      if (d.hasAttribute('data-family') && !(find && find.value.trim())) d.open = on; else if (on) d.open = true;
    });
    closeRail();
    if (jump === false) return;
    touched = false;
    if (card) {
      card.scrollIntoView();
      /* Previews above the card settle to their real height as they load; line the card up again unless the reader has moved. */
      [500, 1400].forEach(function (t) { setTimeout(function () { if (!touched && !card.closest('.ds-view').hidden) card.scrollIntoView(); }, t); });
    } else { window.scrollTo(0, 0); }
    var h = view.querySelector('h1');
    if (h) { h.setAttribute('tabindex', '-1'); try { h.focus({ preventScroll: true }); } catch (err) { /* older browsers */ } }
    window.dispatchEvent(new Event('ds-shown'));
  }
  var touched = false;
  ['wheel', 'touchstart', 'keydown', 'mousedown'].forEach(function (t) { window.addEventListener(t, function () { touched = true; }, { passive: true }); });
  function route(jump) {
    var t = (location.hash || '').replace(/^#/, '');
    show(/^[A-Za-z0-9._~-]+$/.test(t) ? t : 'overview', jump);
  }
  window.addEventListener('hashchange', function () { route(true); });
  route(/^#c-/.test(location.hash));

  if (menu) menu.addEventListener('click', function () {
    var open = !rail.classList.contains('is-open');
    rail.classList.toggle('is-open', open);
    menu.setAttribute('aria-expanded', open ? 'true' : 'false');
    menu.textContent = open ? 'Close' : 'Menu';
  });
  rail.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href^="#"]');
    if (a && a.getAttribute('href').slice(1) === (location.hash || '#overview').slice(1)) { route(true); }
  });

  /* In-page jumps inside a guide (the address stays on the guide). */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-jump]');
    if (!a) return;
    var el = document.getElementById(a.getAttribute('data-jump'));
    if (el) { e.preventDefault(); el.scrollIntoView(); }
  });

  /* Search: components, guideline sections, tokens and asset files, ranked by where the words match.
     A name or title match beats an alias ("dropdown" finds Select), which beats the text of a guide or README. */
  var find = document.getElementById('ds-find'), results = document.getElementById('ds-results'), counter = document.getElementById('ds-count');
  var navBox = rail.querySelector('.ds-nav');
  /* British spellings in a query find the American text: col+our, gr+ey, cent+re and so on. */
  var US = {}; [['col' + 'our', 'color'], ['col' + 'ours', 'colors'], ['gr' + 'ey', 'gray'], ['gr' + 'eys', 'grays'], ['cent' + 're', 'center'], ['cent' + 'red', 'centered'], ['behavi' + 'our', 'behavior'], ['fav' + 'our', 'favor'], ['lic' + 'ence', 'license'], ['organ' + 'ise', 'organize'], ['priorit' + 'ise', 'prioritize'], ['anal' + 'yse', 'analyze']].forEach(function (p) { US[p[0]] = p[1]; });
  var KIND_ORDER = ['Page', 'Component', 'Guideline', 'Token', 'Asset'];
  var KIND_LABEL = { Component: 'Components', Page: 'Pages', Guideline: 'Guidelines', Token: 'Tokens', Asset: 'Asset files' };
  var KIND_MAX = { Component: 8, Page: 3, Guideline: 8, Token: 6, Asset: 4 };
  var KIND_WEIGHT = { Component: 8, Page: 7, Guideline: 5, Token: 1, Asset: 0 };
  var INDEX = (D.search || []).map(function (e) {
    var t = e.t.toLowerCase();
    var tw = t.split(/[^a-z0-9]+/).filter(Boolean);
    return { e: e, t: t, tn: tw.length, tw: tw.concat(e.a ? e.a.split(/\s+/) : []), a: e.a || '', g: (e.g || '').toLowerCase(), d: (e.d || '').toLowerCase(), x: (e.x || '').toLowerCase() };
  });
  function norm(q) { return q.toLowerCase().replace(/[^a-z0-9#.\- ]+/g, ' ').split(/\s+/).filter(Boolean).map(function (w) { return US[w] || w; }); }
  function score(r, words, whole) {
    var sum = 0, missed = 0;
    for (var i = 0; i < words.length; i++) {
      var w = words[i], s = 0, k;
      for (k = 0; k < r.tw.length; k++) { if (r.tw[k] === w) { s = Math.max(s, k < r.tn ? 40 : 34); } else if (r.tw[k].indexOf(w) === 0) { s = Math.max(s, k < r.tn ? 30 : 24); } }
      if (!s && r.t.indexOf(w) >= 0) s = 20;
      if (!s && (r.g.indexOf(w) >= 0 || r.d.indexOf(w) >= 0)) s = 8;
      if (!s && w.length > 2 && r.x.indexOf(w) >= 0) s = 4 + Math.min(4, r.x.split(w).length - 1);
      if (!s) { missed += 1; continue; }
      sum += s;
    }
    /* With two or more words, one may miss ("date format" still finds Dates and Times), at a cost. */
    if (missed && (words.length < 2 || missed * 2 > words.length || sum < 30)) return 0;
    sum -= missed * 15;
    if (r.t === whole) sum += 100; else if (r.t.indexOf(whole) === 0) sum += 25;
    if (r.e.top) sum += 6;
    return sum + KIND_WEIGHT[r.e.k];
  }
  function escH(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function mark(text, words) {
    var out = escH(text);
    words.forEach(function (w) { if (w.length < 2) return; out = out.replace(new RegExp('(' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig'), '\u0001$1\u0002'); });
    return out.replace(/\u0001/g, '<mark>').replace(/\u0002/g, '</mark>');
  }
  function snippet(r, words) {
    var src = r.e.x || '', low = r.x, at = -1;
    words.forEach(function (w) { var k = low.indexOf(w); if (k >= 0 && (at < 0 || k < at)) at = k; });
    if (at < 0) return r.e.d || '';
    var a = Math.max(0, at - 50), b = Math.min(src.length, at + 90);
    while (a > 0 && src[a - 1] !== ' ') a--;
    return (a > 0 ? '…' : '') + src.slice(a, b).trim() + (b < src.length ? '…' : '');
  }
  var hits = [], active = -1, pendingJump = null;
  function go(r) {
    var e = r.e;
    pendingJump = e.j || null;
    find.value = ''; render();
    if ((location.hash || '').slice(1) === e.h) route(true); else location.hash = e.h;
  }
  function setActive(k) {
    var opts = results.querySelectorAll('[role="option"]');
    active = Math.max(-1, Math.min(opts.length - 1, k));
    Array.prototype.forEach.call(opts, function (o, i) { o.setAttribute('aria-selected', i === active ? 'true' : 'false'); });
    if (active >= 0) { find.setAttribute('aria-activedescendant', opts[active].id); opts[active].scrollIntoView({ block: 'nearest' }); } else find.removeAttribute('aria-activedescendant');
  }
  function render() {
    var q = find.value.trim(), words = norm(q), whole = words.join(' ');
    results.innerHTML = ''; hits = []; active = -1; find.removeAttribute('aria-activedescendant');
    if (!words.length) {
      results.hidden = true; navBox.hidden = false; find.setAttribute('aria-expanded', 'false'); counter.textContent = '';
      return;
    }
    var ranked = INDEX.map(function (r) { return { r: r, s: score(r, words, whole) }; }).filter(function (o) { return o.s > 0; }).sort(function (a, b) { return b.s - a.s; });
    var groups = {};
    ranked.forEach(function (o) { var k = o.r.e.k; (groups[k] = groups[k] || []).push(o); });
    /* Groups follow their best hit, leaning toward components and guides; an exact name match ("qualys-blue") always comes first. */
    var BIAS = { Page: 10, Component: 10, Guideline: 6, Token: 0, Asset: -5 };
    function rank(k) { var top = groups[k][0]; return (top.r.t === whole ? 1000 : 0) + top.s + BIAS[k]; }
    var order = KIND_ORDER.filter(function (k) { return groups[k]; }).sort(function (a, b) { return rank(b) - rank(a) || KIND_ORDER.indexOf(a) - KIND_ORDER.indexOf(b); });
    var n = 0;
    order.forEach(function (k) {
      var list = groups[k], box = mk('div', 'ds-rgroup'), head = mk('p', 'ds-rhead', KIND_LABEL[k] + ' ');
      head.appendChild(mk('span', null, String(list.length)));
      box.setAttribute('role', 'group'); box.setAttribute('aria-label', KIND_LABEL[k]);
      box.appendChild(head);
      list.slice(0, KIND_MAX[k]).forEach(function (o) {
        var r = o.r, el = mk('div', 'ds-hit'), idx = hits.length;
        el.id = 'ds-hit-' + idx; el.setAttribute('role', 'option'); el.setAttribute('aria-selected', 'false');
        var title = mk('span', 'ds-hit-t'); title.innerHTML = mark(r.e.t, words);
        var meta = mk('span', 'ds-hit-g', r.e.g + (k === 'Token' && r.e.d ? ' · ' + r.e.d : ''));
        el.appendChild(title); el.appendChild(meta);
        var hitInTitle = words.every(function (w) { return r.t.indexOf(w) >= 0; });
        var sn = hitInTitle ? (r.e.d && k !== 'Token' ? r.e.d : '') : snippet(r, words);
        if (sn) { var sp = mk('span', 'ds-hit-x'); sp.innerHTML = mark(sn, words); el.appendChild(sp); }
        el.addEventListener('mousedown', function (ev) { ev.preventDefault(); });
        el.addEventListener('click', function () { go(r); });
        el.addEventListener('mousemove', function () { if (active !== idx) setActive(idx); });
        box.appendChild(el); hits.push(r); n += 1;
      });
      results.appendChild(box);
    });
    if (!n) {
      var none = mk('div', 'ds-rnone');
      none.appendChild(mk('p', null, 'Nothing matches “' + q + '”.'));
      none.appendChild(mk('p', null, 'Try a component (Button, Select), what it does (dropdown, modal, badge), a token (qualys-blue, spacing-rg) or a guide topic (contrast, focus, dates).'));
      results.appendChild(none);
    }
    counter.textContent = n ? ranked.length + ' results' : 'No results';
    results.hidden = false; navBox.hidden = true; find.setAttribute('aria-expanded', 'true');
    if (n) setActive(0);
  }
  if (find) {
    find.addEventListener('input', render);
    find.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowDown') { e.preventDefault(); setActive(active + 1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(active - 1); }
      else if (e.key === 'Enter') { if (hits[active]) { e.preventDefault(); go(hits[active]); } }
      else if (e.key === 'Escape') { if (find.value) { e.preventDefault(); find.value = ''; render(); } else find.blur(); }
    });
    /* "/" jumps to the search from anywhere on the page, as on most documentation sites. */
    document.addEventListener('keydown', function (e) {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      var t = e.target, tag = t && t.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return;
      e.preventDefault();
      if (window.matchMedia('(max-width: 900px)').matches && !rail.classList.contains('is-open') && menu) menu.click();
      find.focus(); find.select();
    });
  }
  /* After a search result opens its page, scroll to the section, token or file group it named. */
  window.addEventListener('ds-shown', function () {
    if (!pendingJump) return;
    var el = document.getElementById(pendingJump);
    pendingJump = null;
    if (!el) return;
    el.scrollIntoView({ block: 'start' });
    el.classList.add('ds-flash');
    setTimeout(function () { el.classList.remove('ds-flash'); }, 1600);
  });
  /* Prompts in the guides: copy the text to paste into an AI agent */
  document.addEventListener('click', function (e) {
    var b = e.target.closest ? e.target.closest('.ds-prompt .ds-copybtn') : null;
    if (!b) return;
    var pre = b.parentNode.parentNode.querySelector('pre'), text = pre.textContent;
    function done(msg) { b.textContent = msg; setTimeout(function () { b.textContent = 'Copy'; }, 2400); }
    function select() {
      var r = document.createRange(), sel = window.getSelection();
      r.selectNodeContents(pre); sel.removeAllRanges(); sel.addRange(r);
      done('Selected: press Ctrl or Cmd + C');
    }
    try { navigator.clipboard.writeText(text).then(function () { done('Copied'); }, select); } catch (err) { select(); }
  });
})();
