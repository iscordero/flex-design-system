/* @ds-bundle: {"format":4,"namespace":"Qualys","components":[{"name":"Button"},{"name":"Hyperlink"},{"name":"SocialButton"},{"name":"TextLink"},{"name":"BlogCard"},{"name":"Card"},{"name":"InlinePromoCard"},{"name":"IntegrationCard"},{"name":"ResourceCard"},{"name":"WebinarCard"},{"name":"Carousel"},{"name":"LogoCarousel"},{"name":"LogoHierarchy"},{"name":"TestimonialCard"},{"name":"TestimonialCarousel"},{"name":"AppliedFilters"},{"name":"FilterBar"},{"name":"FilterButton"},{"name":"FilterChip"},{"name":"FilterChipGroup"},{"name":"FilterDrawer"},{"name":"FilterDropdown"},{"name":"Checkbox"},{"name":"DemoRequestWizard"},{"name":"Form"},{"name":"FormModal"},{"name":"Radio"},{"name":"SearchBar"},{"name":"Select"},{"name":"TextField"},{"name":"Toggle"},{"name":"Flag"},{"name":"Icon"},{"name":"Marker"},{"name":"Tag"},{"name":"Breadcrumbs"},{"name":"Footer"},{"name":"Nav"},{"name":"NavBanner"},{"name":"AlertDialog"},{"name":"CookieBanner"},{"name":"ExitIntent"},{"name":"HoverCard"},{"name":"Modal"},{"name":"NotificationBar"},{"name":"Overlay"},{"name":"SessionTimeout"},{"name":"SuccessConfirmation"},{"name":"Toast"},{"name":"ToastStack"},{"name":"Tooltip"},{"name":"CtaModule"},{"name":"EventCalendar"},{"name":"EventCard"},{"name":"EventType"},{"name":"FormBanner"},{"name":"GeneralContent"},{"name":"Hero"},{"name":"Media"},{"name":"TypographicHeader"},{"name":"Avatar"},{"name":"ProfileCard"},{"name":"ProfileGrid"},{"name":"ProfileModal"},{"name":"StatCard"},{"name":"Stats"},{"name":"DetailComparison"},{"name":"FeatureMatrix"},{"name":"MarketingTable"},{"name":"Accordion"},{"name":"AccordionModule"},{"name":"Drawer"},{"name":"DrawerCard"},{"name":"TabModule"},{"name":"Tabs"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  var ICONS = __ICONS__;
  var FIGMA_ICONS = __FIGMA_ICONS__;
  /* Hugeicons (free, stroke rounded, MIT): the Arrows, Alert, AI, Bookmarks and Add and remove sets, named in kebab case (Alert01Icon -> "hi:alert-01"). */
  var HUGEICONS = __HUGEICONS__;
  /* Icon sizes: px and the stroke drawn at that size (stroke icons keep this weight however they scale). */
  var ICON_SIZES = { xs: [12, 1], sm: [16, 1.25], md: [20, 1.5], lg: [24, 1.5], xl: [32, 2] };

  function cx() {
    var out = [];
    for (var i = 0; i < arguments.length; i++) if (arguments[i]) out.push(arguments[i]);
    return out.join(' ');
  }
  function omit(obj, keys) {
    var out = {};
    for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k) && keys.indexOf(k) === -1) out[k] = obj[k];
    return out;
  }
  function truncate(text, max) {
    if (typeof text !== 'string' || !max || text.length <= max) return text;
    var cut = text.slice(0, max - 1);
    var sp = cut.lastIndexOf(' ');
    return (sp > max * 0.6 ? cut.slice(0, sp) : cut).replace(/[\s.,;:]+$/, '') + '…';
  }

  /* Icon — the Qualys utility set, inline so it takes currentColor. */
  function hugeEls(els, sw) {
    /* A Hugeicons drawing: plain strings are 1.5 round-capped strokes; other entries are [tag, attributes]. */
    return els.map(function (el, i) {
      if (typeof el === 'string') el = ['path', { d: el, stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' }];
      var t = el[0], at = Object.assign({}, el[1], { key: i });
      if (at.stroke && sw != null) { at.strokeWidth = sw; at.vectorEffect = 'non-scaling-stroke'; }
      return h(t, at);
    });
  }
  function Icon(p) {
    var preset = typeof p.size === 'string' ? ICON_SIZES[p.size] : null;
    var size = preset ? preset[0] : (p.size || 16);
    var tone = p.tone === 'black' || p.tone === 'blue' || p.tone === 'white' ? p.tone : null;
    var common = {
      className: cx('q-icon', tone && 'q-icon--' + tone, p.className), width: size, height: size, fill: 'none', focusable: 'false',
      role: p.title ? 'img' : undefined, 'aria-hidden': p.title ? undefined : 'true'
    };
    var title = p.title ? h('title', null, p.title) : null;
    /* Hugeicons: by name ("hi:arrow-right-01") from the bundled sets, or any icon from @hugeicons/core-free-icons passed as `icon`. */
    var huge = Array.isArray(p.icon) ? p.icon : (typeof p.name === 'string' && p.name.indexOf('hi:') === 0 ? HUGEICONS.icons[p.name.slice(3)] : null);
    if (huge) {
      var sw = p.strokeWidth != null ? p.strokeWidth : (preset ? preset[1] : null);
      return h('svg', Object.assign({ viewBox: '0 0 24 24' }, common), title, hugeEls(huge, sw));
    }
    var f = FIGMA_ICONS[p.name];
    if (f) {
      var box = f.vb.split(' ');
      if (box[2] !== box[3]) common.width = Math.round(size * box[2] / box[3] * 100) / 100;
      return h('svg', Object.assign({ viewBox: f.vb }, common), title,
        h('g', { transform: f.rot ? 'rotate(' + f.rot + ' ' + f.c[0] + ' ' + f.c[1] + ')' : undefined },
          f.ds.map(function (d, i) {
            return f.sw
              ? h('path', { key: i, d: d, fill: 'none', stroke: 'currentColor', strokeWidth: f.sw, strokeLinecap: 'round', strokeLinejoin: 'round' })
              : h('path', { key: i, d: d, fill: 'currentColor', fillRule: 'nonzero' });
          })));
    }
    var g = ICONS[p.name];
    if (!g) return null;
    return h('svg', Object.assign({ viewBox: '0 0 24 24' }, common), title,
      h('g', { transform: g.rot ? 'rotate(' + g.rot + ' 12 12)' : undefined },
        h('path', { d: g.d, fill: 'currentColor', fillRule: 'nonzero', transform: 'translate(' + g.tx + ' ' + g.ty + ')' })));
  }
  /* The bundled Hugeicons sets, for documentation: [[set name, [names]]]. */
  Icon.hugeicons = HUGEICONS.groups;
  function iconNode(x, size) { return typeof x === 'string' ? h(Icon, { name: x, size: size }) : x; }

  /* SocialButton — a link to a social profile or website (Figma: Social): the 52px blue icon button, or a plain small glyph. */
  var SOCIAL = { linkedin: 'LinkedIn', x: 'X', facebook: 'Facebook', instagram: 'Instagram', vimeo: 'Vimeo', youtube: 'YouTube', url: 'Website' };
  function SocialButton(p) {
    var network = SOCIAL[p.network] ? p.network : 'url', plain = p.variant === 'plain';
    var small = !plain && p.size === 'sm';
    var props = omit(p, ['network', 'variant', 'size', 'label', 'icon', 'className', 'href', 'newTab']);
    props.className = cx('q-social', plain && 'q-social--plain', small && 'q-social--sm', p.className);
    props['aria-label'] = p.label || SOCIAL[network];
    var icon = typeof p.icon === 'string' ? h('img', { src: p.icon, alt: '' }) : (p.icon || h(Icon, { name: 'social-' + network, size: plain ? 16 : (small ? 20 : 24) }));
    if (!p.href) { props.type = 'button'; return h('button', props, icon); }
    props.href = p.href;
    if (p.newTab !== false) { props.target = '_blank'; props.rel = 'noopener'; }
    return h('a', props, icon);
  }

  /* Button — Primary and Secondary families from the Figma Buttons sheet. */
  function Button(p) {
    var variant = p.variant || 'primary';
    var size = p.size || 'lg';
    var el = p.href ? 'a' : 'button';
    var rest = omit(p, ['variant', 'size', 'iconLeft', 'iconRight', 'className', 'children', 'disabled']);
    if (el === 'button') { if (!rest.type) rest.type = 'button'; rest.disabled = !!p.disabled; }
    else if (p.disabled) { rest['aria-disabled'] = 'true'; rest.tabIndex = -1; rest.href = undefined; }
    rest.className = cx('q-btn', 'q-btn--' + variant, 'q-btn--' + size, p.disabled && 'is-disabled', p.className);
    return h(el, rest,
      p.iconLeft ? iconNode(p.iconLeft, 16) : null,
      h('span', { className: 'q-btn__label' }, p.children),
      p.iconRight ? iconNode(p.iconRight, 16) : null);
  }

  /* TextLink — the Tertiary sheet: red, blue, inverted, or neutral (charcoal with a blue arrow). iconLeft puts an icon before the label. */
  function TextLink(p) {
    var tone = p.tone || 'red';
    var size = p.size || 'rg';
    var el = p.href ? 'a' : 'button';
    var rest = omit(p, ['tone', 'size', 'arrow', 'iconLeft', 'className', 'children', 'disabled']);
    if (el === 'button') { if (!rest.type) rest.type = 'button'; rest.disabled = !!p.disabled; }
    else if (p.disabled) { rest['aria-disabled'] = 'true'; rest.tabIndex = -1; rest.href = undefined; }
    rest.className = cx('q-textlink', 'q-textlink--' + tone, 'q-textlink--' + size, p.disabled && 'is-disabled', p.className);
    return h(el, rest,
      p.iconLeft ? h('span', { className: 'q-textlink__icon' }, iconNode(p.iconLeft, 16)) : null,
      h('span', { className: 'q-textlink__label' }, p.children),
      p.arrow ? h('span', { className: 'q-textlink__arrow' }, h(Icon, { name: 'arrow-right', size: 16 })) : null);
  }

  /* Hyperlink — inline link inside body copy. arrow: true shows the arrow on hover, 'always' keeps it in view. disabled greys it out and takes it out of the tab order. tone 'inverted' is white, for dark or blue grounds; it stays underlined. */
  function Hyperlink(p) {
    var rest = omit(p, ['arrow', 'className', 'children', 'disabled', 'tone']);
    if (p.disabled) { rest['aria-disabled'] = 'true'; rest.tabIndex = -1; rest.href = undefined; rest.onClick = undefined; }
    rest.className = cx('q-hyperlink', p.tone === 'inverted' && 'q-hyperlink--inverted', p.arrow && 'q-hyperlink--arrow', p.arrow === 'always' && 'q-hyperlink--arrow-always', p.disabled && 'is-disabled', p.className);
    return h('a', rest, p.children, p.arrow ? h('span', { className: 'q-hyperlink__arrow' }, h(Icon, { name: 'arrow-right', size: 'sm' })) : null);
  }

  /* Breadcrumbs — where the page sits in the site: a link for each level above it, then the page itself as plain text. (Figma: Breadcrumbs) */
  function Breadcrumbs(p) {
    var items = (p.items || []).map(function (it) { return it && typeof it === 'object' && !React.isValidElement(it) ? it : { label: it }; });
    var n = items.length, max = p.maxItems === undefined ? 4 : p.maxItems;
    var es = React.useState(false), listRef = React.useRef(null);
    var collapse = !es[0] && max > 0 && n > max;
    /* Collapsed, the trail keeps the root and the last two levels: Home > ... > Category > Current. */
    var shown = [];
    items.forEach(function (it, i) {
      if (collapse && i > 0 && i < n - 2) { if (i === 1) shown.push({ gap: true }); return; }
      shown.push({ it: it, i: i });
    });
    function expand() {
      es[1](true);
      /* The button goes away, so focus moves to the first level it revealed. */
      setTimeout(function () { var a = listRef.current && listRef.current.querySelectorAll('.q-crumbs__link')[1]; if (a) a.focus(); }, 0);
    }
    var nav = h('nav', { className: cx('q-crumbs', p.className), 'aria-label': p.label || 'Breadcrumb', id: p.id },
      h('ol', { className: 'q-crumbs__list', ref: listRef }, shown.map(function (s, k) {
        var sep = k > 0 ? h('span', { className: 'q-crumbs__sep', 'aria-hidden': 'true' }, h(Icon, { name: 'chevron-right', size: 12 })) : null;
        if (s.gap) return h('li', { key: 'gap', className: 'q-crumbs__item' }, sep,
          h('button', { type: 'button', className: 'q-crumbs__more', 'aria-label': p.moreLabel || 'Show all levels', onClick: expand }, '…'));
        var last = s.i === n - 1;
        return h('li', { key: s.i, className: cx('q-crumbs__item', last && 'q-crumbs__item--current', s.i === n - 2 && 'q-crumbs__item--prev') }, sep,
          last ? h('span', { className: 'q-crumbs__current', 'aria-current': 'page', title: typeof s.it.label === 'string' ? s.it.label : undefined }, s.it.label)
            : h('a', { className: 'q-crumbs__link', href: s.it.href || '#', onClick: s.it.onClick }, s.it.label));
      })));
    return p.contained ? h('div', { className: 'q-crumbs-bar' }, h('div', { className: 'q-crumbs-bar__inner' }, nav)) : nav;
  }

  /* ── Tags (Figma: Tagging System) ── */
  var TAG_TONES = { grey: 'gray', dark: 'slate', 'dark-red': 'dark-red' };
  /* Tag — badge style (fill / light / outline) for status, or text style for categories. */
  function Tag(p) {
    var variant = p.variant || 'fill';
    var tone = TAG_TONES[p.tone] || p.tone || 'blue';
    var size = p.size === 'sm' || p.size === 'xs' ? 'sm' : 'rg';
    if (variant === 'text' || variant === 'label' || variant === 'eyebrow') {
      var tp = { className: cx('q-tag', 'q-tag--' + variant, p.className) };
      if (p.href) { tp.href = p.href; return h('a', tp, p.children); }
      return h('span', tp, p.children);
    }
    return h('span', { className: cx('q-tag', 'q-tag--badge', 'q-tag--' + variant, 'q-tag--' + tone, 'q-tag--' + size, p.className) },
      h('span', { className: 'q-tag__text' }, p.children));
  }

  /* FilterChip — pill that filters a list; selected state, optional count, optional remove. */
  /* Counts over 999 shorten to "1k+" so a chip stays compact. */
  function shortCount(n) { return typeof n === 'number' && n > 999 ? Math.floor(n / 1000) + 'k+' : n; }
  function FilterChip(p) {
    var active = !!p.active;
    var size = p.size === 'sm' || p.size === 'lg' ? p.size : 'rg';
    var name = typeof p.children === 'string' ? p.children : 'filter';
    var label = h('span', { key: 'l', className: 'q-chip__label' }, p.children);
    var count = p.count != null ? h('span', { key: 'c', className: 'q-chip__count' }, '(' + shortCount(p.count) + ')') : null;
    /* Removable: an applied filter. Not a toggle; the cross takes it away. */
    if (p.removable) {
      return h('span', { className: cx('q-chip', 'q-chip--' + size, 'q-chip--removable', p.className) }, label, count,
        h('button', { type: 'button', className: 'q-chip__x', 'aria-label': (p.removeLabel || 'Remove') + ' ' + name, disabled: p.disabled, onClick: p.onRemove },
          h(Icon, { name: 'cross', size: size === 'sm' ? 'xs' : 'sm' })));
    }
    var chip = h('button', {
      type: 'button', className: cx('q-chip', 'q-chip--' + size, active && 'is-active', p.className),
      'aria-pressed': active ? 'true' : 'false', disabled: p.disabled, onClick: p.onClick
    }, label, count);
    if (!(active && p.onRemove)) return chip;
    return h('span', { className: cx('q-chip-wrap', 'q-chip-wrap--' + size) }, chip,
      h('button', { type: 'button', className: 'q-chip__remove', 'aria-label': 'Remove ' + name, onClick: p.onRemove },
        h(Icon, { name: 'cross', size: size === 'sm' ? 'xs' : 'sm' })));
  }

  /* Flag — notice anchored to a container edge: tiers (large) or a time label (small). */
  function Flag(p) {
    var tone = p.tone === 'tier-2' || p.tone === 'tier-3' ? p.tone : 'tier-1';
    return h('span', { className: cx('q-flag', 'q-flag--' + tone, p.size === 'sm' ? 'q-flag--sm' : 'q-flag--lg', p.className) },
      h('span', { className: 'q-flag__text' }, p.children));
  }

  /* Marker — vertical bar on a tab or menu edge; opens into a count pill. side 'left' (default) | 'right' picks the edge it sits on. */
  function Marker(p) {
    var tone = p.tone || 1;
    var open = p.count != null;
    return h('span', {
      className: cx('q-marker', 'q-marker--' + tone, p.side === 'right' && 'q-marker--right', open && 'is-open', p.className), style: p.style,
      role: p.label ? 'img' : undefined, 'aria-label': p.label, 'aria-hidden': p.label ? undefined : 'true'
    }, open ? h('span', { className: 'q-marker__count' }, p.count) : null);
  }

  /* EventType — icon and label for the five event types. */
  var EVENT_TYPES = {
    qualys: ['event-qualys', 'Qualys Event'], webinar: ['event-webinar', 'Webinar'], industry: ['event-industry', 'Industry Event'],
    speaking: ['event-speaking', 'Speaking Engagement'], training: ['event-training', 'Training']
  };
  function EventType(p) {
    var t = EVENT_TYPES[p.type] ? p.type : 'qualys';
    return h('span', { className: cx('q-event', 'q-event--' + t, p.className) },
      h(Icon, { name: EVENT_TYPES[t][0], size: 24 }),
      h('span', { className: 'q-event__label' }, p.children || EVENT_TYPES[t][1]));
  }

  /* ── Inputs (Figma: Inputs sheet) ── */
  var uid = 0;
  function useId(given) {
    var ref = React.useRef(null);
    if (ref.current === null) ref.current = given || 'q-in-' + (++uid);
    return ref.current;
  }
  /* Wait this long for an exit animation — no wait when the reader has asked for reduced motion. */
  function motionMs(ms) { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : ms; }
  function useOutside(ref, open, close) {
    React.useEffect(function () {
      if (!open) return undefined;
      function onDown(e) { if (ref.current && !ref.current.contains(e.target)) close(); }
      document.addEventListener('mousedown', onDown);
      return function () { document.removeEventListener('mousedown', onDown); };
    }, [open]);
  }
  function optionList(options) {
    return (options || []).map(function (o) { return typeof o === 'string' ? { value: o, label: o } : o; });
  }
  function message(id, text) {
    return text ? h('span', { className: 'q-field__msg', id: id + '-msg' }, text) : null;
  }

  /* TextField — placeholder label that floats up, or a small label always showing. */
  function TextField(p) {
    var id = useId(p.id);
    var isControlled = p.value !== undefined;
    var st = React.useState(p.defaultValue != null ? String(p.defaultValue) : ''), inner = st[0], setInner = st[1];
    var fs = React.useState(false), focused = fs[0], setFocused = fs[1];
    var value = isControlled ? String(p.value == null ? '' : p.value) : inner;
    var raised = p.labelMode === 'static' || focused || value !== '';
    var rest = omit(p, ['label', 'labelMode', 'error', 'hint', 'className', 'id', 'defaultValue', 'value', 'onChange', 'onFocus', 'onBlur', 'placeholder', 'disabled']);
    rest.disabled = p.disabled;
    rest.id = id;
    rest.className = 'q-tf__input';
    rest.value = value;
    rest.placeholder = raised ? (p.placeholder || '') : '';
    rest.onChange = function (e) { if (!isControlled) setInner(e.target.value); if (p.onChange) p.onChange(e); };
    rest.onFocus = function (e) { setFocused(true); if (p.onFocus) p.onFocus(e); };
    rest.onBlur = function (e) { setFocused(false); if (p.onBlur) p.onBlur(e); };
    if (p.error) rest['aria-invalid'] = 'true';
    if (p.error || p.hint) rest['aria-describedby'] = id + '-msg';
    return h('div', { className: cx('q-field', p.error && 'is-error', p.disabled && 'is-disabled', p.className) },
      h('div', { className: cx('q-tf', raised && 'is-raised', focused && 'is-focused') },
        p.label ? h('label', { className: 'q-tf__label', htmlFor: id }, p.label) : null,
        h('input', rest)),
      message(id, p.error || p.hint));
  }

  /* Select — the form dropdown: floating label, single choice, check on the chosen row. */
  function Select(p) {
    var id = useId(p.id);
    var opts = optionList(p.options);
    var isControlled = p.value !== undefined;
    var vs = React.useState(p.defaultValue != null ? p.defaultValue : null), inner = vs[0], setInner = vs[1];
    var value = isControlled ? p.value : inner;
    var os = React.useState(!!p.defaultOpen), open = os[0], setOpen = os[1];
    var as = React.useState(-1), active = as[0], setActive = as[1];
    var root = React.useRef(null);
    useOutside(root, open, function () { setOpen(false); });
    var chosen = opts.filter(function (o) { return o.value === value; })[0];
    var raised = open || !!chosen || p.labelMode === 'static';
    function choose(o) {
      if (!isControlled) setInner(o.value);
      if (p.onChange) p.onChange(o.value);
      setOpen(false);
    }
    function onKey(e) {
      if (p.disabled) return;
      if (!open && (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault(); setOpen(true); setActive(Math.max(0, opts.indexOf(chosen))); return;
      }
      if (!open) return;
      if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
      else if (e.key === 'ArrowDown') { e.preventDefault(); setActive(Math.min(opts.length - 1, active + 1)); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(Math.max(0, active - 1)); }
      else if ((e.key === 'Enter' || e.key === ' ') && opts[active]) { e.preventDefault(); choose(opts[active]); }
      else if (e.key === 'Tab') setOpen(false);
    }
    return h('div', { ref: root, className: cx('q-field', 'q-dd', p.error && 'is-error', p.disabled && 'is-disabled', p.className) },
      h('button', {
        type: 'button', id: id, className: cx('q-tf', 'q-dd__trigger', raised && 'is-raised', open && 'is-focused'), disabled: p.disabled,
        'aria-haspopup': 'listbox', 'aria-expanded': open ? 'true' : 'false', 'aria-controls': id + '-list',
        'aria-invalid': p.error ? 'true' : undefined, 'aria-describedby': p.error || p.hint ? id + '-msg' : undefined,
        onClick: function () { setOpen(!open); setActive(Math.max(0, opts.indexOf(chosen))); }, onKeyDown: onKey
      },
        p.label ? h('span', { className: 'q-tf__label' }, p.label) : null,
        raised ? h('span', { className: cx('q-tf__input', 'q-dd__value', !chosen && 'is-placeholder') }, chosen ? chosen.label : (p.placeholder || 'Select')) : null,
        h('span', { className: 'q-dd__chevron' }, h(Icon, { name: open ? 'chevron-up' : 'chevron-down', size: 16 }))),
      p.name ? h('input', { type: 'hidden', name: p.name, value: value == null ? '' : value }) : null,
      open ? h('ul', { className: 'q-menu', role: 'listbox', id: id + '-list', 'aria-labelledby': id },
        opts.map(function (o, i) {
          var sel = o.value === value;
          return h('li', {
            key: o.value, role: 'option', 'aria-selected': sel ? 'true' : 'false',
            className: cx('q-menu__row', i === active && 'is-active'),
            onMouseEnter: function () { setActive(i); }, onMouseDown: function (e) { e.preventDefault(); }, onClick: function () { choose(o); }
          },
            h('span', { className: 'q-menu__check' }, sel ? h(Icon, { name: 'check', size: 16 }) : null),
            h('span', null, o.label));
        })) : null,
      message(id, p.error || p.hint));
  }

  /* Checkbox */
  function Checkbox(p) {
    var id = useId(p.id);
    var rest = omit(p, ['label', 'className', 'id', 'children', 'size']);
    rest.id = id; rest.type = 'checkbox'; rest.className = 'q-check__input';
    var small = p.size === 'sm';
    return h('label', { className: cx('q-check', small && 'q-check--sm', p.disabled && 'is-disabled', p.className), htmlFor: id },
      h('input', rest),
      h('span', { className: 'q-check__box', 'aria-hidden': 'true' }, h(Icon, { name: 'check', size: small ? 12 : 16 })),
      p.label || p.children ? h('span', { className: 'q-check__label' }, p.label || p.children) : null);
  }

  /* Radio */
  function Radio(p) {
    var id = useId(p.id);
    var rest = omit(p, ['label', 'className', 'id', 'children']);
    rest.id = id; rest.type = 'radio'; rest.className = 'q-radio__input';
    return h('label', { className: cx('q-radio', p.disabled && 'is-disabled', p.className), htmlFor: id },
      h('input', rest),
      h('span', { className: 'q-radio__dot', 'aria-hidden': 'true' }),
      p.label || p.children ? h('span', { className: 'q-radio__label' }, p.label || p.children) : null);
  }

  /* Toggle — a switch; checked/defaultChecked/onChange like a checkbox. */
  function Toggle(p) {
    var id = useId(p.id);
    var rest = omit(p, ['label', 'className', 'id', 'children']);
    rest.id = id; rest.type = 'checkbox'; rest.role = 'switch'; rest.className = 'q-toggle__input';
    return h('label', { className: cx('q-toggle', p.disabled && 'is-disabled', p.className), htmlFor: id },
      h('input', rest),
      h('span', { className: 'q-toggle__track', 'aria-hidden': 'true' }, h('span', { className: 'q-toggle__knob' })),
      p.label || p.children ? h('span', { className: 'q-toggle__label' }, p.label || p.children) : null);
  }

  /* FilterDropdown — grey trigger, menu of checkboxes with an optional "All". */
  function FilterDropdown(p) {
    var id = useId(p.id);
    var opts = optionList(p.options);
    var isControlled = p.value !== undefined;
    var vs = React.useState(p.defaultValue || []), inner = vs[0], setInner = vs[1];
    var value = isControlled ? (p.value || []) : inner;
    var os = React.useState(p.defaultOpen || false), open = os[0], setOpen = os[1];
    var root = React.useRef(null);
    useOutside(root, open, function () { setOpen(false); });
    function set(next) { if (!isControlled) setInner(next); if (p.onChange) p.onChange(next); }
    function toggle(v) { set(value.indexOf(v) >= 0 ? value.filter(function (x) { return x !== v; }) : value.concat([v])); }
    var all = opts.length > 0 && opts.every(function (o) { return value.indexOf(o.value) >= 0; });
    var allLabel = p.allLabel === undefined ? 'All' : p.allLabel;
    var single = !!p.single;
    function row(key, label, checked, onToggle) {
      return h('li', { key: key, className: 'q-menu__row q-menu__row--check' },
        single ? h(Radio, { name: id + '-opt', checked: checked, onChange: onToggle, label: label }) : h(Checkbox, { checked: checked, onChange: onToggle, label: label }));
    }
    return h('div', { ref: root, className: cx('q-filter', p.className) },
      h('button', {
        type: 'button', id: id, className: cx('q-filter__trigger', open && 'is-open'), 'aria-haspopup': 'true', 'aria-expanded': open ? 'true' : 'false', 'aria-controls': id + '-menu',
        onClick: function () { setOpen(!open); }, onKeyDown: function (e) { if (e.key === 'Escape') setOpen(false); }
      },
        h('span', { className: 'q-filter__label' }, p.label),
        h(Icon, { name: open ? 'chevron-up' : 'chevron-down', size: 16 })),
      open ? h('ul', { className: 'q-menu q-filter__menu', id: id + '-menu', 'aria-labelledby': id, onKeyDown: function (e) { if (e.key === 'Escape') setOpen(false); } },
        allLabel && !single ? row('__all', allLabel, all, function () { set(all ? [] : opts.map(function (o) { return o.value; })); }) : null,
        opts.map(function (o) { return row(o.value, o.label, value.indexOf(o.value) >= 0, function () { if (single) set([o.value]); else toggle(o.value); }); })) : null);
  }

  /* ── Filters (Figma: Filters) ── */
  /* FilterChipGroup — every filter shown as a chip in a wrapping row; each chip toggles on its own. */
  function FilterChipGroup(p) {
    var opts = optionList(p.options);
    var isControlled = p.value !== undefined;
    var st = React.useState(p.defaultValue || []), value = isControlled ? (p.value || []) : st[0];
    function toggle(v) {
      var next = value.indexOf(v) >= 0 ? value.filter(function (x) { return x !== v; }) : value.concat([v]);
      if (!isControlled) st[1](next);
      if (p.onChange) p.onChange(next);
    }
    return h('div', { className: cx('q-chips', p.className), role: 'group', 'aria-label': p.label || 'Filters' },
      opts.map(function (o) {
        var on = value.indexOf(o.value) >= 0;
        /* A chip that would return nothing is disabled, so nobody reaches a dead end. */
        return h(FilterChip, { key: o.value, size: p.size || 'lg', active: on, count: o.count, disabled: o.disabled || (o.count === 0 && !on), onClick: function () { toggle(o.value); } }, o.label);
      }));
  }

  /* AppliedFilters — the filters in force as removable chips, with a "+N more" chip and the result count. */
  function AppliedFilters(p) {
    var items = optionList(p.items), max = p.max != null ? p.max : items.length;
    var shown = items.slice(0, max), extra = items.length - shown.length;
    var r = p.results;
    var results = r == null ? null : (typeof r === 'number' ? r.toLocaleString('en-US') + (r === 1 ? ' result' : ' results') : r);
    if (!items.length && results == null) return null;
    return h('div', { className: cx('q-applied', p.className) },
      items.length ? h('div', { className: 'q-applied__chips', role: 'group', 'aria-label': p.label || 'Applied filters' },
        shown.map(function (it) {
          return h(FilterChip, { key: it.value, removable: true, onRemove: function () { if (p.onRemove) p.onRemove(it.value); } }, it.label);
        }),
        extra > 0 ? h('button', { type: 'button', className: 'q-chip q-chip--rg q-chip--more', 'aria-haspopup': p.onMore ? 'dialog' : undefined, 'aria-label': 'Show ' + extra + ' more applied filters', onClick: p.onMore }, '+' + extra + ' more') : null,
        p.onClearAll ? h(TextLink, { tone: 'blue', onClick: p.onClearAll }, p.clearLabel || 'Clear all') : null) : null,
      results != null ? h('div', { className: 'q-applied__results', role: 'status' }, results) : null);
  }

  /* FilterButton — the "Filter" control beside a search field on mobile; opens the filter drawer. */
  function FilterButton(p) {
    var rest = omit(p, ['className', 'children', 'label']);
    rest.type = 'button'; rest.className = cx('q-filterbtn', p.className);
    if (!rest['aria-haspopup']) rest['aria-haspopup'] = 'dialog';
    return h('button', rest, h(Icon, { name: 'filter', size: 16 }), h('span', null, p.children || p.label || 'Filter'));
  }

  /* Modal behaviour for dialogs: page scroll lock, first focus, Esc to close, focus kept inside, focus returned. */
  function useDialog(active, ref, closeRef, focusSel) {
    React.useEffect(function () {
      if (!active) return undefined;
      var prev = document.activeElement, body = document.body, old = body.style.overflow, node = ref.current;
      body.style.overflow = 'hidden';
      var t = setTimeout(function () { var c = node && node.querySelector(focusSel); if (c) c.focus(); }, 0);
      function onKey(e) {
        if (e.key === 'Escape') { if (closeRef.current) closeRef.current(); return; }
        if (e.key !== 'Tab' || !node) return;
        var f = node.querySelectorAll(FOCUSABLE);
        if (!f.length) return;
        var first = f[0], last = f[f.length - 1], at = document.activeElement;
        if (e.shiftKey && (at === first || !node.contains(at))) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && (at === last || !node.contains(at))) { e.preventDefault(); first.focus(); }
      }
      document.addEventListener('keydown', onKey);
      return function () {
        clearTimeout(t); document.removeEventListener('keydown', onKey); body.style.overflow = old;
        if (prev && prev.focus) prev.focus();
      };
    }, [active]);
  }

  /* FilterDrawer — the mobile filter panel: sections of checkboxes, changed together and applied with one button. */
  function FilterDrawer(p) {
    var open = !!p.open, inline = !!p.inline, plain = p.variant === 'plain';
    var id = useId(p.id), ref = React.useRef(null), closeRef = React.useRef(p.onClose);
    closeRef.current = p.onClose;
    var sections = p.sections || [];
    function copy(v) { var o = {}; sections.forEach(function (sc) { o[sc.id] = ((v || {})[sc.id] || []).slice(); }); return o; }
    var ds = React.useState(function () { return copy(p.value); }), draft = ds[0], setDraft = ds[1];
    var es = React.useState({}), expanded = es[0], setExpanded = es[1];
    /* Each time it opens it starts from the filters in force; closing without Apply drops the changes. */
    React.useEffect(function () { if (open) setDraft(copy(p.value)); }, [open]);
    useDialog(open && !inline, ref, closeRef, '.q-fdrawer__close');
    if (!open && !inline) return null;
    function close() { if (closeRef.current) closeRef.current(); }
    function setSection(sid, vals) { var n = copy(draft); n[sid] = vals; setDraft(n); }
    var total = sections.reduce(function (n, sc) { return n + (draft[sc.id] || []).length; }, 0);
    var sectionClear = p.sectionClear !== undefined ? p.sectionClear : !plain;
    var showReset = p.reset !== undefined ? p.reset : plain;
    function rowLabel(o) {
      return [h('span', { key: 'n', className: 'q-fdrawer__name' }, o.label), o.count != null ? h('span', { key: 'c', className: 'q-fdrawer__count' }, o.count) : null];
    }
    function section(sc) {
      var opts = optionList(sc.options), sel = draft[sc.id] || [], hid = id + '-' + sc.id, isOpen = !!expanded[sc.id];
      var limited = sc.limit != null && opts.length > sc.limit;
      var visible = limited && !isOpen ? opts.slice(0, sc.limit) : opts;
      return h('div', { key: sc.id, className: 'q-fdrawer__section', role: 'group', 'aria-labelledby': hid },
        h('div', { className: 'q-fdrawer__head' },
          h('div', { className: 'q-fdrawer__title', id: hid }, sc.title),
          sectionClear && sel.length ? h(TextLink, { tone: 'blue', 'aria-label': (p.clearLabel || 'Clear all') + ': ' + sc.title, onClick: function () { setSection(sc.id, []); } }, p.clearLabel || 'Clear all') : null),
        h('ul', { className: 'q-fdrawer__list', id: hid + '-list' }, visible.map(function (o) {
          var on = sel.indexOf(o.value) >= 0;
          return h('li', { key: o.value, className: 'q-fdrawer__row' },
            sc.single ? h(Radio, { name: hid + '-opt', checked: on, onChange: function () { setSection(sc.id, [o.value]); }, label: rowLabel(o) })
              : h(Checkbox, { size: plain ? 'rg' : 'sm', checked: on, onChange: function () { setSection(sc.id, on ? sel.filter(function (x) { return x !== o.value; }) : sel.concat([o.value])); }, label: rowLabel(o) }));
        })),
        limited ? h('button', { type: 'button', className: 'q-fdrawer__more', 'aria-expanded': isOpen ? 'true' : 'false', 'aria-controls': hid + '-list', onClick: function () { var n = Object.assign({}, expanded); n[sc.id] = !isOpen; setExpanded(n); } },
          h('span', null, isOpen ? (p.lessLabel || 'Show less') : (opts.length - sc.limit) + ' more'),
          h(Icon, { name: isOpen ? 'chevron-up' : 'chevron-down', size: 'sm' })) : null);
    }
    var panel = h('div', { ref: ref, className: 'q-fdrawer__panel', role: inline ? 'group' : 'dialog', 'aria-modal': inline ? undefined : 'true', 'aria-label': p.title || 'Filters' },
      /* The close button sits on its own white bar, so the list scrolls away under it instead of behind it. */
      h('div', { className: 'q-fdrawer__top' },
        h('button', { type: 'button', className: 'q-fdrawer__close', 'aria-label': p.closeLabel || 'Close', onClick: close }, h(Icon, { name: 'cross', size: 'sm' }))),
      h('div', { className: 'q-fdrawer__body' }, sections.map(section)),
      h('div', { className: 'q-fdrawer__foot' },
        showReset ? h(TextLink, { tone: 'blue', disabled: !total, onClick: function () { setDraft(copy({})); if (p.onReset) p.onReset(); } }, p.resetLabel || 'Reset Filters') : null,
        h(Button, { variant: 'secondary-alt', onClick: function () { if (p.onApply) p.onApply(copy(draft)); close(); } }, p.applyLabel || 'Apply Filters')));
    var cls = cx('q-fdrawer', plain ? 'q-fdrawer--plain' : 'q-fdrawer--divided', inline && 'q-fdrawer--inline', p.className);
    if (inline) return h('div', { className: cls }, panel);
    var node = h('div', { className: cls, onMouseDown: function (e) { if (e.target === e.currentTarget) close(); } }, panel);
    var RD = window.ReactDOM;
    return RD && RD.createPortal ? RD.createPortal(node, document.body) : node;
  }

  /* FilterBar — a row of filter dropdowns with a reset link; on mobile, one "Filter" control that opens the drawer. */
  function FilterBar(p) {
    var filters = p.filters || [];
    var isControlled = p.value !== undefined;
    var st = React.useState(p.defaultValue || {}), value = isControlled ? (p.value || {}) : st[0];
    var os = React.useState(false), open = os[0], setOpen = os[1];
    function set(next) { if (!isControlled) st[1](next); if (p.onChange) p.onChange(next); }
    var total = filters.reduce(function (n, f) { return n + (value[f.id] || []).length; }, 0);
    var layout = p.layout === 'desktop' || p.layout === 'mobile' ? p.layout : 'auto';
    var mobileLabel = p.mobileLabel || 'Filter';
    return h('div', { className: cx('q-filterbar', 'q-filterbar--' + layout, p.className) },
      layout !== 'mobile' ? h('div', { className: 'q-filterbar__row' },
        filters.map(function (f) {
          return h(FilterDropdown, {
            key: f.id, label: f.label, options: f.options, single: f.single, allLabel: f.allLabel !== undefined ? f.allLabel : null, defaultOpen: f.defaultOpen, value: value[f.id] || [],
            onChange: function (v) { var n = Object.assign({}, value); n[f.id] = v; set(n); }
          });
        }),
        h(TextLink, { tone: 'blue', disabled: !total, onClick: function () { var n = {}; filters.forEach(function (f) { n[f.id] = []; }); set(n); } }, p.resetLabel || 'Reset Filters')) : null,
      layout !== 'desktop' ? h('div', { className: 'q-filterbar__mobile' },
        h('div', { className: 'q-filter' },
          h('button', { type: 'button', className: cx('q-filter__trigger', open && 'is-open'), 'aria-haspopup': 'dialog', 'aria-expanded': open ? 'true' : 'false', onClick: function () { setOpen(true); } },
            h('span', { className: 'q-filter__label' }, mobileLabel),
            h(Icon, { name: open ? 'chevron-up' : 'chevron-down', size: 16 }))),
        h(FilterDrawer, {
          open: open, onClose: function () { setOpen(false); }, variant: 'plain', title: mobileLabel, value: value, onApply: set,
          sections: filters.map(function (f) { return { id: f.id, title: f.label, options: f.options, single: f.single }; }),
          resetLabel: p.resetLabel, applyLabel: p.applyLabel, closeLabel: p.closeLabel
        })) : null);
  }

  /* SearchBar — line or contained. */
  function SearchBar(p) {
    var variant = p.variant || 'line';
    var rest = omit(p, ['variant', 'className', 'label']);
    rest.type = 'search'; rest.className = 'q-search__input';
    if (!rest['aria-label']) rest['aria-label'] = p.label || p.placeholder || 'Search';
    return h('div', { className: cx('q-search', 'q-search--' + variant, p.className), role: 'search' },
      h('span', { className: 'q-search__icon' }, h(Icon, { name: 'search', size: 16 })),
      h('input', rest));
  }

  /* ── Tabs (Figma: Tabs) ── */
  /* One bar, one active tab; a single shared indicator slides to the selected label. */
  function Tabs(p) {
    var items = p.items || [];
    var id = useId(p.id);
    function keyOf(it, i) { return it.id != null ? String(it.id) : String(i); }
    var isControlled = p.value !== undefined;
    var st = React.useState(p.defaultValue != null ? String(p.defaultValue) : (items[0] ? keyOf(items[0], 0) : null));
    var value = isControlled ? (p.value == null ? null : String(p.value)) : st[0];
    var active = 0;
    for (var k = 0; k < items.length; k++) if (keyOf(items[k], k) === value) active = k;
    var listRef = React.useRef(null), tabRefs = React.useRef([]);
    var is = React.useState({ left: 0, width: 0 }), ind = is[0], setInd = is[1];
    var rs = React.useState(false), ready = rs[0], setReady = rs[1];
    function measure() {
      var t = tabRefs.current[active]; if (!t) return;
      var label = t.firstChild;
      setInd({ left: t.offsetLeft + label.offsetLeft, width: label.offsetWidth });
    }
    React.useLayoutEffect(measure, [active, items.length]);
    React.useEffect(function () {
      window.addEventListener('resize', measure);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
      return function () { window.removeEventListener('resize', measure); };
    }, [active, items.length]);
    React.useEffect(function () {
      if (ind.width && !ready) { var r = requestAnimationFrame(function () { setReady(true); }); return function () { cancelAnimationFrame(r); }; }
      return undefined;
    }, [ind.width]);
    function reveal(i) {
      var list = listRef.current, t = tabRefs.current[i]; if (!list || !t) return;
      if (t.offsetLeft < list.scrollLeft) list.scrollLeft = t.offsetLeft;
      else if (t.offsetLeft + t.offsetWidth > list.scrollLeft + list.clientWidth) list.scrollLeft = t.offsetLeft + t.offsetWidth - list.clientWidth;
    }
    /* Autoplay: the next tab opens by itself every few seconds. It waits while the pointer or the focus is on the tabs,
       stops for good once the reader picks a tab, has its own pause button, and never starts under reduced motion. */
    var every = p.autoplay ? (typeof p.autoplay === 'number' ? Math.max(3000, p.autoplay) : 6000) : 0;
    var pl = React.useState(function () { return !!every && !prefersStill(); }), playing = pl[0], setPlaying = pl[1];
    var hd = React.useState(false), held = hd[0], setHeld = hd[1];
    function go(i) {
      var key = keyOf(items[i], i);
      if (!isControlled) st[1](key);
      if (p.onChange) p.onChange(key, i);
      reveal(i);
    }
    function select(i, focus) {
      if (playing) setPlaying(false);
      go(i);
      if (focus && tabRefs.current[i]) tabRefs.current[i].focus();
    }
    React.useEffect(function () {
      if (!every || !playing || held || items.length < 2) return undefined;
      var t = setTimeout(function () { go((active + 1) % items.length); }, every);
      return function () { clearTimeout(t); };
    }, [every, playing, held, active, items.length]);
    function onKey(e) {
      var n = items.length, to = null;
      if (e.key === 'ArrowRight') to = (active + 1) % n;
      else if (e.key === 'ArrowLeft') to = (active - 1 + n) % n;
      else if (e.key === 'Home') to = 0;
      else if (e.key === 'End') to = n - 1;
      if (to !== null) { e.preventDefault(); select(to, true); }
    }
    var hasPanels = items.some(function (it) { return it.content != null; });
    var hold = every ? { onMouseEnter: function () { setHeld(true); }, onMouseLeave: function () { setHeld(false); }, onFocus: function () { setHeld(true); },
      onBlur: function (e) { if (!e.currentTarget.contains(e.relatedTarget)) setHeld(false); } } : {};
    function bar(list) {
      if (!every) return list;
      return h('div', { className: 'q-tabs__head' }, list,
        h('button', { type: 'button', className: 'q-carousel__btn q-tabs__auto', 'aria-label': playing ? (p.pauseLabel || 'Pause the tabs') : (p.playLabel || 'Play the tabs'), 'aria-pressed': playing ? 'false' : 'true', onClick: function () { setPlaying(!playing); } },
          h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, 'aria-hidden': 'true' }, h('path', { d: playing ? 'M3.5 2.5H6.5V13.5H3.5ZM9.5 2.5H12.5V13.5H9.5Z' : 'M4 2.5L13 8L4 13.5Z', fill: 'currentColor' }))));
    }
    return h('div', Object.assign({ className: cx('q-tabs', every && 'q-tabs--auto', every && playing && !held && 'is-playing', p.className), style: every ? { '--q-tabs-every': every + 'ms' } : undefined }, hold),
      bar(h('div', { className: 'q-tabs__list', role: 'tablist', 'aria-label': p.label, ref: listRef },
        items.map(function (it, i) {
          var sel = i === active;
          return h('button', {
            key: keyOf(it, i), ref: function (el) { tabRefs.current[i] = el; }, type: 'button', role: 'tab', id: id + '-tab-' + i,
            'aria-selected': sel ? 'true' : 'false', 'aria-controls': hasPanels ? id + '-panel-' + i : undefined, tabIndex: sel ? 0 : -1,
            className: cx('q-tabs__tab', sel && 'is-active'), onClick: function () { select(i, false); }, onKeyDown: onKey
          }, h('span', { className: 'q-tabs__label' }, it.label));
        }),
        h('span', { className: cx('q-tabs__indicator', ready && 'is-ready'), style: { width: ind.width + 'px', transform: 'translateX(' + ind.left + 'px)' }, 'aria-hidden': 'true' }))),
      hasPanels ? items.map(function (it, i) {
        return h('div', { key: keyOf(it, i), role: 'tabpanel', id: id + '-panel-' + i, 'aria-labelledby': id + '-tab-' + i, hidden: i !== active, tabIndex: 0, className: 'q-tabs__panel' }, it.content);
      }) : null);
  }

  /* ── Drawers (Figma: Drawers) ── */
  var AVATAR_GLYPH = 'M7.487 8.423C9.812 8.423 11.699 6.537 11.699 4.212C11.699 1.886 9.812 0 7.487 0C5.162 0 3.276 1.886 3.276 4.212C3.276 6.537 5.162 8.423 7.487 8.423ZM11.231 9.359L9.619 9.359C8.97 9.657 8.248 9.827 7.487 9.827C6.727 9.827 6.007 9.657 5.355 9.359L3.744 9.359C1.676 9.359 0 11.035 0 13.103L0 13.571C0 14.346 0.629 14.974 1.404 14.974L13.571 14.974C14.346 14.974 14.974 14.346 14.974 13.571L14.974 13.103C14.974 11.035 13.299 9.359 11.231 9.359Z';
  function useOpen(p) {
    var isControlled = p.open !== undefined;
    var st = React.useState(!!p.defaultOpen);
    var open = isControlled ? !!p.open : st[0];
    function toggle() { if (!isControlled) st[1](!open); if (p.onToggle) p.onToggle(!open); }
    return [open, toggle];
  }
  function collapse(id, open, labelledBy, children) {
    return h('div', { className: cx('q-collapse', open && 'is-open'), id: id, role: 'region', 'aria-labelledby': labelledBy, 'aria-hidden': open ? undefined : 'true' },
      h('div', { className: 'q-collapse__inner' }, children));
  }
  function heading(level, props, children) { return h('h' + (level >= 1 && level <= 6 ? level : 3), props, children); }

  /* Drawer — the Standard drawer: a ruled row that expands to show body copy and an optional CTA. */
  function Drawer(p) {
    var id = useId(p.id), o = useOpen(p), open = o[0];
    var icon = typeof p.icon === 'string' ? h('img', { src: p.icon, alt: '' }) : p.icon;
    return h('div', { className: cx('q-drawer', open && 'is-open', p.layout === 'mobile' && 'q-drawer--mobile', p.className) },
      heading(p.headingLevel, { className: 'q-drawer__heading' },
        h('button', { type: 'button', id: id + '-btn', className: 'q-drawer__head', 'aria-expanded': open ? 'true' : 'false', 'aria-controls': id + '-panel', 'aria-disabled': p.locked && open ? 'true' : undefined, onClick: o[1] },
          icon ? h('span', { className: 'q-drawer__icon', 'aria-hidden': 'true' }, icon) : null,
          h('span', { className: 'q-drawer__title' }, p.title),
          h('span', { className: 'q-drawer__chevron' }, h(Icon, { name: 'chevron-down', size: 16 })))),
      collapse(id + '-panel', open, id + '-btn',
        h('div', { className: 'q-drawer__body' },
          h('div', { className: 'q-drawer__text' }, p.children),
          p.cta ? h('div', { className: 'q-drawer__cta' }, p.cta) : null)));
  }

  function avatarGlyph() {
    return h('svg', { className: 'q-avatar__glyph', viewBox: '0 0 14.974 14.974', focusable: 'false', 'aria-hidden': 'true' }, h('path', { d: AVATAR_GLYPH, fill: 'currentColor' }));
  }
  function avatar(person, extra) {
    return h('span', { className: cx('q-avatar', extra) , 'aria-hidden': 'true' },
      person && person.image ? h('img', { src: person.image, alt: '' }) : avatarGlyph());
  }

  /* Avatar — a person's photo: small and medium circles, large square. Falls back to the default silhouette. */
  function Avatar(p) {
    var size = p.size === 'md' || p.size === 'lg' ? p.size : 'sm';
    var st = React.useState(false), failed = st[0], setFailed = st[1];
    var show = p.image && !failed;
    return h('span', { className: cx('q-avatar', 'q-avatar--' + size, p.className), role: p.alt ? 'img' : undefined, 'aria-label': p.alt || undefined, 'aria-hidden': p.alt ? undefined : 'true' },
      show ? h('img', { src: p.image, alt: '', onError: function () { setFailed(true); } }) : avatarGlyph());
  }

  /* DrawerCard — the card drawer for sessions: time, title, body, speaker profiles and an optional CTA.
     How much each profile shows depends on how many there are; see the rule inside. */
  function DrawerCard(p) {
    var id = useId(p.id), o = useOpen(p), open = o[0];
    /* ctaVisibility and speakerVisibility: 'always' (default) or 'open-only', which keeps that part out of the closed card. */
    var people = open || p.speakerVisibility !== 'open-only' ? (p.speakers || []) : [], n = people.length;
    var hasCta = !!p.cta && (open || p.ctaVisibility !== 'open-only');
    /* profileCards: each headshot opens a profile HoverCard (name, role, LinkedIn icon). */
    function face(sp) {
      if (!p.profileCards || !sp || !sp.name) return avatar(sp);
      return h(HoverCard, { kind: 'profile', name: sp.name, image: sp.image, designation: sp.designation, company: sp.company, logo: sp.logo, logoAlt: sp.logoAlt, link: sp.link },
        h('button', { type: 'button', className: 'q-hcard__trigger q-hcard__trigger--avatar', 'aria-label': sp.name + ': profile' }, avatar(sp)));
    }
    /* The profile rule for a closed card on desktop and tablet. One to three profiles: name, role and company in equal columns.
       Four or more: name and company on one row; six or more put the first name over the surname.
       Past six (five with a CTA) the first four stay named and the rest stack as headshots.
       A card too narrow for its row first splits the names over two lines, then moves profiles into the stack one at a time. */
    var cap = n > (hasCta ? 5 : 6) ? 4 : n;
    var ruleKey = n + (hasCta ? 'c' : '');
    var fs = React.useState({ key: ruleKey, named: cap, two: false }), fit = fs[0], setFit = fs[1];
    if (fit.key !== ruleKey) fit = { key: ruleKey, named: cap, two: false };
    var named = Math.min(fit.named, cap), stacked = named < n, compact = n >= 4, two = compact && (fit.two || n >= 6);
    var extras = stacked ? people.slice(named) : [];
    var rootRef = React.useRef(null), listRef = React.useRef(null);
    React.useLayoutEffect(function () {
      var list = listRef.current;
      if (!list || open || !compact) return;
      if (getComputedStyle(list).flexDirection === 'column') return; /* mobile lists every profile */
      if (list.scrollWidth <= list.clientWidth + 1) return;
      if (!two) setFit({ key: ruleKey, named: named, two: true });
      else if (named > 1) setFit({ key: ruleKey, named: named - 1, two: true });
    });
    React.useEffect(function () {
      var el = rootRef.current;
      if (!el || typeof ResizeObserver === 'undefined') return;
      var last = el.offsetWidth;
      var ro = new ResizeObserver(function () {
        var w = el.offsetWidth;
        if (w !== last) { last = w; setFit({ key: ruleKey, named: cap, two: false }); }
      });
      ro.observe(el);
      /* Web fonts change the width of the names when they arrive: fit the row again then, or a row measured in the fallback font can be left too wide. */
      var live = true, fonts = document.fonts;
      function refit() { if (live) setFit({ key: ruleKey, named: cap, two: false }); }
      if (fonts && fonts.ready) fonts.ready.then(refit);
      if (fonts && fonts.addEventListener) fonts.addEventListener('loadingdone', refit);
      return function () { live = false; ro.disconnect(); if (fonts && fonts.removeEventListener) fonts.removeEventListener('loadingdone', refit); };
    }, [ruleKey, cap]);
    function person(sp, i) {
      var parts = String(sp.name || '').split(' '), first = parts.shift(), rest = parts.join(' ');
      return h('div', { key: i, className: cx('q-person', stacked && i >= named && 'is-extra'), role: 'listitem' },
        face(sp),
        h('div', { className: 'q-person__text' },
          h('div', { className: 'q-person__name' }, h('span', null, first), rest ? ' ' : null, rest ? h('span', null, rest) : null),
          sp.designation ? h('div', { className: 'q-person__role' }, sp.designation) : null,
          sp.company ? h('div', { className: 'q-person__company' }, sp.company) : null));
    }
    var cta = hasCta ? h('div', { className: 'q-dcard__cta' }, p.cta) : null;
    return h('div', { ref: rootRef, className: cx('q-dcard', open && 'is-open', n ? 'has-people' : 'no-people', hasCta && 'has-cta', 'q-dcard--n' + Math.min(n, 7), compact && 'is-compact', two && 'is-two', stacked && 'is-stacked', p.layout === 'mobile' && 'q-dcard--mobile', p.className) },
      heading(p.headingLevel, { className: 'q-dcard__heading' },
        h('button', { type: 'button', id: id + '-btn', className: 'q-dcard__head', 'aria-expanded': open ? 'true' : 'false', 'aria-controls': id + '-panel', 'aria-disabled': p.locked && open ? 'true' : undefined, onClick: o[1] },
          p.time ? h('span', { className: 'q-dcard__time' }, p.time) : null,
          h('span', { className: 'q-dcard__title' }, p.title),
          h('span', { className: 'q-dcard__chevron', 'aria-hidden': 'true' },
            h('svg', { viewBox: '0 0 30 30', width: 30, height: 30, fill: 'none', focusable: 'false' },
              h('path', { d: 'M8.75 11.875L15 18.125L21.25 11.875', stroke: 'currentColor', strokeWidth: 2.5, strokeLinecap: 'round', strokeLinejoin: 'round' }))))),
      collapse(id + '-panel', open, id + '-btn', h('div', { className: 'q-dcard__body' }, p.children)),
      n ? h('div', { className: 'q-dcard__people' },
        h('div', { ref: listRef, className: 'q-dcard__list', role: 'list', 'aria-label': p.speakersLabel || 'Speakers' },
          people.map(person),
          extras.length ? h('div', { className: 'q-dcard__stack', role: 'listitem' },
            extras.slice(0, 4).map(function (sp, i) {
              var last = i === Math.min(extras.length, 4) - 1;
              var more = last && (hasCta || extras.length > 4);
              return h('span', { key: i, className: 'q-dcard__stackitem' }, more ? avatar(sp) : face(sp),
                more ? h('span', { className: 'q-dcard__more', 'aria-hidden': 'true' }, '+' + extras.length) : null);
            }),
            h('span', { className: 'q-sr' }, 'and ' + extras.length + ' more')) : null),
        cta) : cta);
  }

  /* Accordion — a group of drawers (standard rows or session cards); one open at a time unless `multiple`.
     `collapsible={false}` keeps one item open: the open item can't be closed, only swapped. */
  function Accordion(p) {
    var items = p.items || [];
    var cards = p.variant === 'cards';
    function keyOf(it, i) { return it.id != null ? String(it.id) : String(i); }
    function initial() {
      var d = p.defaultOpen;
      if (d == null || d === false) return [];
      return (Array.isArray(d) ? d : [d]).map(function (x) { return typeof x === 'number' && items[x] ? keyOf(items[x], x) : String(x); });
    }
    var st = React.useState(initial), open = st[0], setOpen = st[1];
    function toggle(key, next) {
      if (!next && p.collapsible === false && open.length < 2) return;
      var value = p.multiple ? (next ? open.concat([key]) : open.filter(function (k) { return k !== key; })) : (next ? [key] : []);
      setOpen(value);
      if (p.onChange) p.onChange(value);
    }
    return h('div', { className: cx('q-accordion', cards ? 'q-accordion--cards' : 'q-accordion--standard', p.className) },
      items.map(function (it, i) {
        var key = keyOf(it, i), isOpen = open.indexOf(key) >= 0;
        var common = { key: key, title: it.title, cta: it.cta, headingLevel: p.headingLevel, open: isOpen, locked: p.collapsible === false && open.length < 2, onToggle: function (next) { toggle(key, next); }, layout: p.layout };
        if (cards) { common.time = it.time; common.speakers = it.speakers; common.speakersLabel = p.speakersLabel; return h(DrawerCard, common, it.content); }
        common.icon = it.icon;
        return h(Drawer, common, it.content);
      }));
  }

  /* ── Profiles (Figma: Avatars) ── */
  function profileMedia(p, cls, chip) {
    var st = React.useState(false), failed = st[0], setFailed = st[1];
    return h('div', { className: cls },
      p.image && !failed ? h('img', { className: 'q-profile__photo', src: p.image, alt: p.imageAlt || '', onError: function () { setFailed(true); } }) : avatarGlyph(),
      chip);
  }
  function profileChip(p) {
    var link = p.link;
    if (!link || !link.href) return null;
    var network = SOCIAL[link.network] ? link.network : 'linkedin';
    var label = link.label || (network === 'url' ? p.name + ': website' : p.name + ' on ' + SOCIAL[network]);
    return h(SocialButton, { className: 'q-profile__chip', network: network, href: link.href, icon: link.icon, label: label });
  }
  function profileText(p, nameProps) {
    return [
      h('div', Object.assign({ key: 'n', className: 'q-profile__name' }, nameProps), p.name),
      p.designation ? h('div', { key: 'd', className: 'q-profile__role' }, p.designation) : null,
      p.logo ? h('img', { key: 'l', className: 'q-profile__logo', src: p.logo, alt: p.logoAlt || '' }) : null
    ];
  }

  /* ProfileCard — photo with a profile-link chip, name, designation and company logo; hover shows "Read Bio". */
  function ProfileCard(p) {
    var interactive = typeof p.onOpen === 'function', chip = profileChip(p);
    function open(e) { if (!(e.target.closest && e.target.closest('.q-profile__chip'))) p.onOpen(); }
    return h('div', { className: cx('q-pcard', interactive && 'is-interactive', p.bare && 'q-pcard--bare', p.className), onClick: interactive ? open : undefined },
      profileMedia(p, 'q-pcard__media', [
        interactive ? h('button', { key: 'o', type: 'button', className: 'q-pcard__open', 'aria-haspopup': 'dialog', 'aria-label': (p.bioLabel || 'Read Bio') + ': ' + p.name },
          h('span', { className: 'q-btn q-btn--secondary-inverted q-btn--lg' }, h('span', { className: 'q-btn__label' }, p.bioLabel || 'Read Bio'))) : null,
        chip ? React.cloneElement(chip, { key: 'c' }) : null
      ]),
      profileText(p));
  }

  /* ProfileModal — the bio dialog opened from a profile card: photo, name and logo beside an "About" text. */
  function ProfileModal(p) {
    var open = !!p.open, inline = !!p.inline;
    var id = useId(p.id), ref = React.useRef(null), closeRef = React.useRef(p.onClose);
    closeRef.current = p.onClose;
    useDialog(open && !inline, ref, closeRef, '.q-pmodal__close');
    if (!open && !inline) return null;
    var links = p.links || [];
    var bio = typeof p.children === 'string' ? h('p', null, p.children) : p.children;
    var panel = h('div', { ref: ref, className: 'q-pmodal__panel', role: inline ? undefined : 'dialog', 'aria-modal': inline ? undefined : 'true', 'aria-labelledby': id + '-name' },
      inline ? null : h('button', { type: 'button', className: 'q-pmodal__close', 'aria-label': p.closeLabel || 'Close', onClick: function () { if (closeRef.current) closeRef.current(); } }, h(Icon, { name: 'cross', size: 24 })),
      h('div', { className: 'q-pmodal__side' },
        profileMedia(p, 'q-pmodal__media', profileChip(p)),
        profileText(p, { id: id + '-name', role: 'heading', 'aria-level': p.headingLevel || 2 })),
      h('div', { className: 'q-pmodal__main' },
        h('div', { className: 'q-pmodal__label' }, p.aboutLabel || 'About'),
        h('div', { className: 'q-pmodal__bio', tabIndex: inline ? undefined : 0 }, bio),
        links.length ? h('div', { className: 'q-pmodal__links' }, links.map(function (l, i) {
          if (SOCIAL[l.network] || l.icon) return h(SocialButton, { key: i, variant: 'plain', network: l.network, href: l.href, icon: l.icon, label: l.label || (SOCIAL[l.network] ? (l.network === 'url' ? p.name + ': website' : p.name + ' on ' + SOCIAL[l.network]) : undefined) });
          return h('a', { key: i, className: 'q-pmodal__textlink', href: l.href, target: '_blank', rel: 'noopener' }, l.label);
        })) : null));
    if (inline) return h('div', { className: cx('q-pmodal', 'q-pmodal--inline', p.className) }, panel);
    var node = h('div', { className: cx('q-pmodal', p.className), onMouseDown: function (e) { if (e.target === e.currentTarget && closeRef.current) closeRef.current(); } }, panel);
    var RD = window.ReactDOM;
    return RD && RD.createPortal ? RD.createPortal(node, document.body) : node;
  }

  /* ProfileGrid — profile cards laid out individually or combined in one container; opens each bio in a modal. */
  function ProfileGrid(p) {
    var items = p.items || [], combined = p.layout === 'combined';
    var st = React.useState(null), active = st[0], setActive = st[1];
    var cur = active != null ? items[active] : null;
    return h('div', { className: cx('q-pgrid', combined ? 'q-pgrid--combined' : 'q-pgrid--individual', p.className) },
      items.map(function (it, i) {
        return h(ProfileCard, Object.assign({}, it, { key: it.id || i, bare: combined, bioLabel: p.bioLabel, onOpen: it.bio ? function () { setActive(i); } : undefined }));
      }),
      cur ? h(ProfileModal, { open: true, onClose: function () { setActive(null); }, name: cur.name, designation: cur.designation, image: cur.image, imageAlt: cur.imageAlt, logo: cur.logo, logoAlt: cur.logoAlt, link: cur.link, links: cur.links, aboutLabel: p.aboutLabel, closeLabel: p.closeLabel }, cur.bio) : null);
  }

  /* ── Cards (Figma: Cards) ── */
  /* Shared shell: white card, radius-lg, the whole card a link when href is set, 6px hover bar along the bottom. */
  function cardShell(p, cls, children) {
    var el = p.href ? 'a' : 'div';
    var props = { className: cx('q-card', cls, p.className) };
    if (p.href) { props.href = p.href; if (p.external) { props.target = '_blank'; props.rel = 'noopener'; } }
    if (p.tabIndex != null) props.tabIndex = p.tabIndex;
    return h.apply(null, [el, props].concat(children, [h('span', { className: 'q-card__bar', 'aria-hidden': 'true' })]));
  }
  /* A text-link or button look for the card's call to action; the card itself is the link. */
  function linkLabel(label, tone, download) {
    return h('span', { className: cx('q-textlink', 'q-textlink--' + (tone || 'neutral'), 'q-textlink--rg', 'q-card__cta') },
      download ? h(Icon, { name: 'download', size: 20 }) : null,
      h('span', { className: 'q-textlink__label' }, label),
      download ? null : h('span', { className: 'q-textlink__arrow' }, h(Icon, { name: 'arrow-right', size: 16 })));
  }
  function buttonLabel(label) {
    return h('span', { className: 'q-btn q-btn--primary q-btn--sm q-card__cta' }, h('span', { className: 'q-btn__label' }, label));
  }
  function cardMedia(p) {
    return h('div', { className: 'q-card__media' },
      p.image ? h('img', { src: p.image, alt: p.imageAlt || '' }) : null,
      p.flag ? h(Flag, { tone: p.flagTone || 'tier-1', className: 'q-card__flag' }, p.flag) : null);
  }
  function cardMeta(parts) {
    var out = [];
    parts.forEach(function (part, i) {
      if (!part) return;
      if (out.length) out.push(h('span', { key: 's' + i, className: 'q-card__sep', 'aria-hidden': 'true' }, '|'));
      out.push(React.cloneElement(part, { key: 'p' + i }));
    });
    return out.length ? h('div', { className: 'q-card__meta' }, out) : null;
  }
  function metaCat(text) { return text ? h('span', { className: 'q-card__cat' }, text) : null; }
  function metaText(text) { return text ? h('span', { className: 'q-card__fmt' }, text) : null; }
  function metaTime(text) {
    return text ? h('span', { className: 'q-card__time' }, h(Icon, { name: 'time', size: 'sm' }), h('span', null, text)) : null;
  }
  function cardFoot(left, right) {
    return h('div', { className: 'q-card__foot' }, left || h('span'), right || null);
  }
  function outlink() { return h('span', { className: 'q-card__out' }, h(Icon, { name: 'outlink', size: 20 })); }
  function person(sp, withCompany) {
    return h('span', { className: 'q-card__person' }, avatar(sp),
      h('span', { className: 'q-card__who' },
        h('span', { className: 'q-card__name' }, sp.name),
        withCompany && sp.company ? h('span', { className: 'q-card__company' }, sp.company) : null));
  }
  /* The speaker rule for content cards: one row that never wraps. The first `named` speakers show their name (and company in the featured card);
     the rest stack as headshots overlapping by 15px, three circles at most. Past three, the third circle reads "+N", where N counts every speaker without a name. */
  function people(list, named, withCompany, label) {
    if (!list || !list.length) return null;
    var first = list.slice(0, named), rest = list.slice(named), faces = rest.length > 3 ? rest.slice(0, 2) : rest;
    return h('div', { className: 'q-card__people', role: 'group', 'aria-label': label || 'Speakers' },
      first.map(function (sp, i) { return React.cloneElement(person(sp, withCompany), { key: 'n' + i }); }),
      rest.length ? h('span', { className: 'q-card__faces' },
        faces.map(function (sp, i) { return React.cloneElement(avatar(sp), { key: 'a' + i }); }),
        rest.length > faces.length ? h('span', { className: 'q-card__more', 'aria-hidden': 'true' }, '+' + rest.length) : null,
        h('span', { className: 'q-sr' }, 'and ' + rest.length + ' more')) : null);
  }
  function contentCard(p, kind, body, foot) {
    var feat = p.layout === 'featured';
    return cardShell(p, cx('q-ccard', 'q-ccard--' + kind, feat && 'q-ccard--featured'), [
      cardMedia(p),
      h('div', { className: 'q-ccard__main' }, h.apply(null, ['div', { className: 'q-ccard__body' }].concat(body)), foot)
    ]);
  }
  function cardTitle(p, cls) { return heading(p.headingLevel, { className: cls || 'q-ccard__title' }, p.title); }
  function cardDate(text) { return text ? h('span', { className: 'q-card__date' }, text) : null; }

  /* Card — the Standard card: optional icon, eyebrow or tag name, heading, copy, tags or a badge, text-link CTA. */
  function Card(p) {
    var icon = typeof p.icon === 'string' ? h('img', { src: p.icon, alt: '' }) : p.icon;
    var badge = p.badge ? h('div', { className: 'q-scard__badge' }, h(Tag, { variant: 'fill', size: 'sm' }, p.badge)) : null;
    var chips = !badge && p.tags && p.tags.length
      ? h('div', { className: 'q-scard__tags' }, p.tags.map(function (t) { return h(Tag, { key: t, variant: 'light', size: 'sm' }, t); })) : null;
    return cardShell(p, cx('q-scard', badge && !icon && 'q-scard--badge-first', !badge && !icon && 'q-scard--plain'), [
      icon ? h('div', { className: 'q-scard__icon', 'aria-hidden': 'true' }, icon) : null,
      badge && !icon ? badge : null,
      h('div', { className: 'q-scard__text' },
        p.eyebrow ? h('div', { className: 'q-scard__eyebrow' }, p.eyebrow) : null,
        !p.eyebrow && p.tagName ? h('div', { className: 'q-scard__tagname' }, h('span', null, p.tagName)) : null,
        cardTitle(p, 'q-scard__title'),
        p.description ? h('p', { className: 'q-scard__desc' }, p.description) : null),
      chips,
      badge && icon ? badge : null,
      p.cta ? h('div', { className: 'q-scard__cta' }, linkLabel(p.cta)) : null
    ]);
  }

  /* IntegrationCard — a partner integration: thumbnail and name (or a logo), then labelled facts and "works with" tags. */
  function IntegrationCard(p) {
    var L = p.labels || {};
    var tags = p.worksWith || [], max = p.maxTags == null ? 2 : p.maxTags;
    var shown = tags.slice(0, max), extra = tags.length - shown.length;
    function field(label, value, key) {
      return value ? h('div', { key: key, className: 'q-icard__field' },
        h('div', { className: 'q-icard__label' }, label), h('div', { className: 'q-icard__value' }, value)) : null;
    }
    return cardShell(p, 'q-icard', [
      h('div', { className: 'q-icard__top' },
        p.logo ? h('img', { className: 'q-icard__logo', src: p.logo, alt: p.name || '' }) : null,
        !p.logo ? h('span', { className: 'q-icard__thumb', 'aria-hidden': 'true' }, p.image ? h('img', { src: p.image, alt: '' }) : null) : null,
        !p.logo ? heading(p.headingLevel, { className: 'q-icard__name' }, p.name) : null),
      h('div', { className: 'q-icard__rule' }),
      h('div', { className: 'q-icard__fields' },
        field(L.type || 'Type', p.type, 'type'),
        tags.length ? h('div', { className: 'q-icard__field' },
          h('div', { className: 'q-icard__label' }, L.worksWith || 'Works With'),
          h('div', { className: 'q-icard__tags' },
            shown.map(function (t) { return h(Tag, { key: t, variant: 'outline', size: 'sm' }, t); }),
            extra > 0 ? h(Tag, { variant: 'outline', size: 'sm' }, '+' + extra) : null)) : null,
        field(L.dataFetched || 'Data Fetched', p.dataFetched, 'data'),
        field(L.category || 'Category', p.category, 'cat'))
    ]);
  }

  /* EventCard — image with a flag, event type and format, title, date and an outlink icon. */
  function EventCard(p) {
    var feat = p.layout === 'featured';
    return contentCard(p, 'event', [
      cardMeta([metaCat(p.category), metaText(p.format)]),
      cardTitle(p),
      feat && p.description ? h('p', { className: 'q-ccard__desc' }, p.description) : null
    ], cardFoot(cardDate(p.date), outlink()));
  }

  /* WebinarCard — image, "Webinar | format | duration", title, speakers, date and an outlink icon. */
  function WebinarCard(p) {
    var feat = p.layout === 'featured';
    return contentCard(p, 'webinar', [
      cardMeta([metaCat(p.category || 'Webinar'), metaText(p.format), metaTime(p.duration)]),
      cardTitle(p),
      feat ? people(p.speakers, 2, true, p.speakersLabel) : null,
      feat && p.description ? h('p', { className: 'q-ccard__desc' }, p.description) : null
    ], h('div', { className: 'q-ccard__end' },
      feat ? null : people(p.speakers, 1, false, p.speakersLabel),
      cardFoot(cardDate(p.date), outlink())));
  }

  /* ResourceCard — image, resource type, title; ends with a date and outlink icon, a download link, or a text-link CTA. */
  function ResourceCard(p) {
    var action = p.action || 'link';
    var foot = action === 'download' ? cardFoot(linkLabel(p.cta || 'Get the Report', 'blue', true))
      : action === 'cta' ? cardFoot(linkLabel(p.cta || 'Learn More'))
      : cardFoot(cardDate(p.date), outlink());
    return contentCard(p, 'resource', [
      cardMeta([metaText(p.resourceType)]),
      cardTitle(p),
      action === 'cta' && p.description ? h('p', { className: 'q-ccard__desc' }, p.description) : null
    ], foot);
  }

  /* BlogCard — image, "Blog | reading time", title, description, author and an outlink icon. */
  function BlogCard(p) {
    return contentCard(p, 'blog', [
      cardMeta([metaCat(p.category || 'Blog'), metaTime(p.duration)]),
      cardTitle(p),
      p.description ? h('p', { className: 'q-ccard__desc' }, p.description) : null
    ], cardFoot(p.author ? person(p.author, false) : null, outlink()));
  }

  /* CountUp — the figure runs from 0 to its value once, when it first scrolls into view (1.2s, easing out).
     A value that isn't one plain number ("24/7", "A+") and people who prefer reduced motion get the final text straight away. */
  var COUNT_RE = /^(\D*)(\d[\d,]*)(\.\d+)?(\D*)$/;
  function CountUp(p) {
    var text = typeof p.value === 'number' ? String(p.value) : p.value;
    var m = typeof text === 'string' && p.animate !== false ? COUNT_RE.exec(text) : null;
    var can = !!m && typeof IntersectionObserver !== 'undefined' && !!window.requestAnimationFrame && !prefersStill();
    function fmt(v) {
      var decimals = m[3] ? m[3].length - 1 : 0, s = v.toFixed(decimals);
      if (m[2].indexOf(',') >= 0) { var parts = s.split('.'); parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); s = parts.join('.'); }
      return m[1] + s + m[4];
    }
    var ref = React.useRef(null);
    var st = React.useState(function () { return can ? fmt(0) : null; }), shown = st[0], setShown = st[1];
    React.useEffect(function () {
      if (!can) return;
      var target = parseFloat((m[2] + (m[3] || '')).replace(/,/g, '')), raf = 0, started = false;
      var io = new IntersectionObserver(function (entries) {
        if (started || !entries.some(function (e) { return e.isIntersecting; })) return;
        started = true; io.disconnect();
        var t0 = null;
        function step(t) {
          if (t0 == null) t0 = t;
          var k = Math.min(1, (t - t0) / 1200);
          if (k < 1) { setShown(fmt(target * (1 - Math.pow(1 - k, 3)))); raf = window.requestAnimationFrame(step); }
          else setShown(null);
        }
        raf = window.requestAnimationFrame(step);
      }, { threshold: 0.5 });
      io.observe(ref.current);
      return function () { io.disconnect(); window.cancelAnimationFrame(raf); };
    }, []);
    if (shown == null) return h('span', { className: 'q-stat__num', ref: ref }, p.value);
    return h('span', { className: 'q-stat__num is-counting', ref: ref },
      h('span', { className: 'q-sr' }, text), h('span', { 'aria-hidden': 'true' }, shown));
  }

  /* StatCard */
  function StatCard(p) {
    return h('div', { className: cx('q-statcard', 'q-statcard--' + (p.tone === 'outline' ? 'outline' : 'solid'), 'q-statcard--' + (p.size === 'md' ? 'md' : 'lg'), p.className) }, statBody(p));
  }
  function statBody(s, key) {
    var icon = s.icon, suffix = s.suffix != null ? s.suffix : s.unit;
    return h('div', { key: key, className: 'q-stat' },
      icon ? h('div', { className: 'q-stat__icon', 'aria-hidden': 'true' }, typeof icon === 'string' ? h('img', { src: icon, alt: '' }) : icon) : null,
      h('div', { className: 'q-stat__value' },
        s.prefix ? h('span', { className: 'q-stat__affix' }, s.prefix) : null,
        h(CountUp, { key: String(s.value), value: s.value, animate: s.countUp }),
        suffix ? h('span', { className: 'q-stat__affix' }, suffix) : null),
      s.label ? h('div', { className: 'q-stat__label' }, s.label) : null,
      s.description ? h('p', { className: 'q-stat__desc' }, s.description) : null);
  }
  /* Stats — the Figma Stats page as a module: layout 'block' (one panel of three figures) or 'cards' (three or four cards in a row). */
  function Stats(p) {
    var items = p.items || [], outline = p.tone === 'outline';
    var size = p.size || (items.length >= 4 ? 'md' : 'lg');
    var inner = p.layout === 'cards'
      ? h('div', { className: cx('q-stats__cards', 'q-stats__cards--' + size) }, items.map(function (it, i) {
          return h(StatCard, Object.assign({ key: i, tone: outline ? 'outline' : 'solid', size: size, countUp: p.countUp }, it));
        }))
      : h('div', { className: cx('q-stats__panel', outline && 'q-stats__panel--outline') }, items.map(function (it, i) { return statBody(Object.assign({ countUp: p.countUp }, it), i); }));
    return h('section', { className: cx('q-section', 'q-stats', 'q-stats--' + size, p.className), id: p.id, 'aria-label': p.label },
      h('div', { className: 'q-section__inner' }, inner));
  }

  /* InlinePromoCard — promo on Charcoal or the blue gradient: logo, image or icon, heading, copy, one CTA. */
  function InlinePromoCard(p) {
    var color = p.color === 'dark' ? 'dark' : 'light';
    var layout = p.layout === 'horizontal' || p.layout === 'banner' ? p.layout : 'vertical';
    var button = p.button || (layout === 'banner' ? 'tertiary' : 'primary');
    var el = p.href ? 'a' : 'div';
    var props = { className: cx('q-promo', 'q-promo--' + color, 'q-promo--' + layout, p.logo && layout !== 'banner' && 'has-logo', p.image && 'has-image', p.icon && 'has-icon', p.className) };
    if (p.href) props.href = p.href;
    var icon = typeof p.icon === 'string'
      ? (FIGMA_ICONS[p.icon] ? h(Icon, { name: p.icon, size: 43 }) : h('img', { src: p.icon, alt: '' }))
      : p.icon;
    return h(el, props,
      p.logo && layout !== 'banner' ? h('img', { className: 'q-promo__logo', src: p.logo, alt: p.logoAlt || 'Qualys' }) : null,
      p.image ? h('div', { className: 'q-promo__image' }, h('img', { src: p.image, alt: p.imageAlt || '' })) : null,
      h('div', { className: 'q-promo__content' },
        icon && layout === 'vertical' ? h('div', { className: 'q-promo__icon', 'aria-hidden': 'true' }, icon) : null,
        heading(p.headingLevel || 2, { className: 'q-promo__title' }, p.title),
        p.description ? h('p', { className: 'q-promo__desc' }, p.description) : null),
      p.cta ? h('div', { className: 'q-promo__cta' }, button === 'tertiary' ? linkLabel(p.cta, 'inverted') : buttonLabel(p.cta)) : null);
  }

  /* Nav */
  /* ── Navigation (Figma: Navigation) ── */
  function navBadge(b) { return b ? h(Tag, { size: 'sm' }, b === true ? 'New' : b) : null; }
  function navLinkObj(l) { return typeof l === 'string' ? { label: l } : l; }
  /* An item's menu: a mega menu (overview + groups), columns of links, or the older flat list of links. */
  function navMenu(it) {
    if (it.menu) return it.menu;
    return it.items && it.items.length ? { columns: [{ links: it.items }] } : null;
  }
  /* Every link inside a menu hovers the same way: it turns blue and this arrow slides in beside it. */
  function navArrow() { return h('span', { className: 'q-mega__arrow', 'aria-hidden': 'true' }, h(Icon, { name: 'arrow-right', size: 'sm' })); }
  /* A menu link's text: the last word, the badge and the arrow are glued together, so when the label wraps the arrow follows the last word, not the box. */
  function navText(label, badge, arrow) {
    var b = navBadge(badge), a = arrow === false ? null : navArrow();
    if (typeof label !== 'string') return [h(React.Fragment, { key: 'l' }, label), h('span', { key: 't', className: 'q-mega__tail' }, b, a)];
    var k = label.lastIndexOf(' ');
    return [k >= 0 ? label.slice(0, k + 1) : null, h('span', { key: 't', className: 'q-mega__tail' }, k >= 0 ? label.slice(k + 1) : label, b, a)];
  }
  function navGroup(g, key) {
    return h('div', { key: key, className: 'q-mega__group' },
      h(g.href ? 'a' : 'div', { className: 'q-mega__heading', href: g.href }, navText(g.title, null, !!g.href)),
      h('ul', { className: 'q-mega__links' }, (g.links || []).map(function (l, i) {
        l = navLinkObj(l);
        return h('li', { key: i }, h('a', { className: 'q-mega__link', href: l.href || '#' }, navText(l.label, l.badge)));
      })));
  }
  /* Mega menu: overview and a capability filter on a warm rail, the groups of links beside it. */
  function NavMega(p) {
    var m = p.menu, groups = m.groups || [];
    var st = React.useState(null), sel = st[0], setSel = st[1];
    var shown = sel == null ? groups : groups.filter(function (g, i) { return i === sel; });
    function item(key, label, badge, on, pick) {
      return h('li', { key: key }, h('button', { type: 'button', className: cx('q-mega__item', on && 'is-active'), 'aria-pressed': on ? 'true' : 'false', onClick: pick },
        h('span', null, label), navBadge(badge)));
    }
    var ov = m.overview;
    return h('div', { className: 'q-mega' },
      h('div', { className: 'q-mega__rail' },
        ov ? h('div', { className: 'q-mega__overview' },
          h('div', { className: 'q-nav__eyebrow' }, ov.eyebrow || 'Overview'),
          h(ov.href ? 'a' : 'div', { className: 'q-mega__title', href: ov.href }, navText(ov.title, null, !!ov.href)),
          ov.description ? h('p', { className: 'q-mega__desc' }, ov.description) : null) : null,
        groups.length > 1 ? h('div', { className: 'q-mega__filter' },
          h('div', { className: 'q-nav__eyebrow', id: p.id + '-rail' }, m.railLabel || 'Capabilities'),
          h('ul', { className: 'q-mega__list', 'aria-labelledby': p.id + '-rail' },
            [item('all', m.allLabel || 'All', null, sel == null, function () { setSel(null); })].concat(groups.map(function (g, i) {
              return item(i, g.title, g.badge, sel === i, function () { setSel(i); });
            })))) : null),
      h('div', { className: 'q-mega__main' },
        m.groupsLabel ? h('div', { className: 'q-nav__eyebrow q-nav__eyebrow--rule' }, m.groupsLabel) : null,
        /* Three columns of groups by default; groupColumns: 2 for a menu with fewer, longer groups */
        h('div', { className: cx('q-mega__groups', m.groupColumns === 2 && 'q-mega__groups--c2', shown.length === 1 && 'is-single') }, shown.map(navGroup))));
  }
  /* Search panel: a contained SearchBar that takes focus, and optional suggested searches below it. */
  function NavSearch(p) {
    var s = p.search, ref = React.useRef(null);
    React.useEffect(function () { var el = ref.current && ref.current.querySelector('input'); if (el) el.focus({ preventScroll: true }); }, []);
    var sug = s.suggestions || [];
    return h('div', { ref: ref, className: 'q-navsearch' },
      h(SearchBar, { variant: 'contained', placeholder: s.placeholder || 'Search qualys.com', label: s.label || 'Search', onKeyDown: function (e) { if (e.key === 'Enter' && s.onSearch) s.onSearch(e.target.value); } }),
      sug.length ? h('div', { className: 'q-navsearch__sug' },
        h('div', { className: 'q-nav__eyebrow' }, s.suggestionsLabel || 'Popular searches'),
        h('ul', null, sug.map(function (x, i) {
          x = navLinkObj(x);
          return h('li', { key: i }, h('a', { className: 'q-chip q-chip--rg q-navsearch__chip', href: x.href || '#' }, x.label));
        }))) : null);
  }
  /* Column dropdown: one or more titled columns of links. */
  function navColumns(m) {
    return h('div', { className: 'q-navdrop' }, (m.columns || []).map(function (c, i) {
      return h('div', { key: i, className: 'q-navdrop__col' },
        c.title ? h('div', { className: 'q-nav__eyebrow q-nav__eyebrow--rule' }, c.title) : null,
        h('ul', { className: 'q-navdrop__links' }, (c.links || []).map(function (l, k) {
          l = navLinkObj(l);
          return h('li', { key: k }, h('a', { className: 'q-navdrop__link', href: l.href || '#' }, navText(l.label, l.badge)));
        })));
    }));
  }

  /* Nav — global navigation: logo, primary items with menus, utility links, search and one call to action.
     Below 1200px it becomes a bar with a menu button that opens a full-screen, drill-down panel. */
  function Nav(p) {
    var items = p.items || [], utility = p.utility || [], cta = p.cta;
    var id = useId(p.id);
    /* Desktop menus slide open under the bar and slide shut; the one that is closing stays mounted until its animation ends. */
    var os = React.useState({ open: p.defaultOpen != null ? p.defaultOpen : null, closing: null, how: null }), open = os[0].open, closing = os[0].closing, how = os[0].how;
    function setOpen(v) { os[1](function (s) { return s.open === v ? s : { open: v, closing: v == null ? s.open : null, how: v == null ? s.how : (s.open != null ? 'switch' : 'open') }; }); }
    React.useEffect(function () {
      if (closing == null) return undefined;
      var t = setTimeout(function () { os[1](function (s) { return s.closing == null ? s : { open: s.open, closing: null, how: s.how }; }); }, motionMs(300));
      return function () { clearTimeout(t); };
    }, [closing]);
    /* The mobile menu slides in from the right and back out; each level slides in from the side it came from. */
    var ms = React.useState({ open: !!p.defaultMobileOpen || !!p.inlinePanel, closing: false, moved: false }), mobileOpen = ms[0].open, mobileClosing = ms[0].closing;
    function setMobileOpen(v) { ms[1](function (s) { return s.open === v ? s : { open: v, closing: !v, moved: true }; }); }
    var ps = React.useState(p.defaultPath || []), path = ps[0], setPath = ps[1];
    var dr = React.useState(null), dir = dr[0], setDir = dr[1];
    var root = React.useRef(null), panel = React.useRef(null), closeRef = React.useRef(null), cameFrom = React.useRef(null);
    function go(next) { cameFrom.current = path; setDir(next.length > path.length ? 'fwd' : 'back'); setPath(next); }
    React.useEffect(function () {
      if (!mobileClosing) return undefined;
      var t = setTimeout(function () { setPath([]); setDir(null); ms[1](function (s) { return s.closing ? { open: s.open, closing: false, moved: s.moved } : s; }); }, motionMs(300));
      return function () { clearTimeout(t); };
    }, [mobileClosing]);
    /* After a level change, put focus where the reader is: the back link, or the row they came out of. */
    React.useEffect(function () {
      var node = panel.current, from = cameFrom.current;
      if (!dir || !node || !from) return;
      var el = path.length ? node.querySelector('.q-navpanel__back') : node.querySelectorAll('.q-navpanel__list .q-navpanel__row')[from[0]];
      if (el && el.focus) el.focus({ preventScroll: true });
    }, [path]);
    closeRef.current = function () { setMobileOpen(false); };
    var layout = p.layout === 'desktop' || p.layout === 'mobile' ? p.layout : 'auto';
    var inline = !!p.inlinePanel;
    useOutside(root, open != null, function () { setOpen(null); });
    useDialog(mobileOpen && !inline, panel, closeRef, '.q-navpanel__close');
    function isCurrent(it) { return it.current || (p.current != null && p.current === it.label); }
    /* One underline bar for the whole list: it sits under the open item (or the current page) and slides between items, like Tabs. */
    var deskRef = React.useRef(null), linkRefs = React.useRef([]), barFrom = React.useRef(null);
    var bs = React.useState({ left: 0, width: 0, show: false, slide: false }), bar = bs[0], setBar = bs[1];
    /* A plain link that was just tapped takes the bar straight away, until the page (or the current prop) changes. */
    var ks = React.useState(null), picked = ks[0], setPicked = ks[1];
    React.useEffect(function () { setPicked(null); }, [p.current]);
    var target = open != null ? open : picked;
    if (target == null) for (var ci = 0; ci < items.length; ci++) if (isCurrent(items[ci])) { target = ci; break; }
    function measureBar() {
      var el = target != null ? linkRefs.current[target] : null, box = deskRef.current;
      if (!el || !box || !el.offsetWidth) {
        barFrom.current = null;
        setBar(function (b) { return b.show ? { left: b.left, width: b.width, show: false, slide: false } : b; });
        return;
      }
      var r = el.getBoundingClientRect();
      var left = Math.round((r.left - box.getBoundingClientRect().left) * 100) / 100, width = Math.round(r.width * 100) / 100;
      var slide = barFrom.current != null;
      barFrom.current = target;
      setBar(function (b) { return b.show && b.left === left && b.width === width ? b : { left: left, width: width, show: true, slide: slide }; });
    }
    React.useLayoutEffect(measureBar, [target, items.length, layout]);
    /* A column dropdown opens under its own item; if it would run past the window's right edge, it slides left just enough to fit. */
    React.useLayoutEffect(function () {
      var box = deskRef.current; if (!box) return;
      Array.prototype.forEach.call(box.querySelectorAll('.q-nav__panel--cols'), function (el) {
        el.style.marginLeft = '';
        var r = el.getBoundingClientRect(), vw = document.documentElement.clientWidth, edge = 16;
        if (r.right > vw - edge) el.style.marginLeft = Math.round(vw - edge - r.right) + 'px';
      });
    }, [open, closing, layout]);
    React.useEffect(function () {
      window.addEventListener('resize', measureBar);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(measureBar);
      return function () { window.removeEventListener('resize', measureBar); };
    }, [target, items.length, layout]);
    var logo = h('a', { className: 'q-nav__logo', href: p.logoHref || '#' },
      p.logoSrc ? h('img', { src: p.logoSrc, alt: p.logoAlt || 'Qualys' }) : (p.logoAlt || 'Qualys'),
      p.label ? h('span', { className: 'q-nav__sitelabel' }, p.label) : null);

    /* Desktop: the bar and the panel of whichever item is open. */
    function desktopItem(it, i) {
      var m = navMenu(it), isOpen = open === i, pid = id + '-m' + i;
      if (!m) return h('li', { key: i, className: 'q-nav__item' },
        h('a', { ref: function (el) { linkRefs.current[i] = el; }, className: cx('q-nav__link', isCurrent(it) && 'is-current'), href: it.href || '#', 'aria-current': isCurrent(it) ? 'page' : undefined, onClick: function () { setPicked(i); setOpen(null); } }, it.label));
      /* Hovering an item opens its menu, unless the search panel is open: someone may be typing. */
      return h('li', { key: i, className: cx('q-nav__item', !m.groups && 'q-nav__item--drop'), onMouseEnter: p.hover === false ? undefined : function () { if (open !== 'search') setOpen(i); } },
        h('button', {
          ref: function (el) { linkRefs.current[i] = el; },
          type: 'button', className: cx('q-nav__link', (isOpen || isCurrent(it)) && 'is-current', isOpen && 'is-open'), 'aria-expanded': isOpen ? 'true' : 'false', 'aria-controls': pid,
          /* A pointer click on an item the hover already opened keeps it open; the keyboard toggles. */
          onClick: function (e) { setOpen(p.hover !== false && e.detail > 0 ? i : (isOpen ? null : i)); }
        }, it.label),
        isOpen || closing === i ? h('div', { className: cx('q-nav__panel', m.groups ? 'q-nav__panel--mega' : 'q-nav__panel--cols', isOpen ? (how === 'open' ? 'is-opening' : how === 'switch' ? 'is-switching' : null) : 'is-closing'), id: pid, 'aria-hidden': isOpen ? undefined : 'true' },
          h('div', { className: 'q-nav__panelbox' }, m.groups ? h(NavMega, { menu: m, id: pid }) : navColumns(m))) : null);
    }
    var actions = p.actions || (cta ? h(Button, { size: 'sm', href: cta.href, onClick: cta.onClick }, cta.label) : null);
    var search = p.search ? (p.search === true ? {} : p.search) : null;
    var desktop = h('div', { ref: deskRef, className: 'q-nav__desktop', onMouseLeave: p.hover === false ? undefined : function () { if (open !== 'search') setOpen(null); }, onKeyDown: function (e) { if (e.key === 'Escape' && open != null) { var b = root.current && root.current.querySelector('.q-nav__link.is-open'); setOpen(null); if (b) b.focus(); } } },
      h('div', { className: cx('q-nav__inner', p.align === 'center' && 'q-nav__inner--center') },
        h('div', { className: 'q-nav__left' }, logo,
          h('ul', { className: 'q-nav__items' }, items.map(desktopItem))),
        utility.length || search || actions ? h('div', { className: 'q-nav__right' },
          search ? (search.href || search.onClick
            ? h(search.href ? 'a' : 'button', { className: 'q-nav__link q-nav__search', href: search.href, type: search.href ? undefined : 'button', 'aria-label': search.label || 'Search', onClick: search.onClick }, h(Icon, { name: 'search', size: 16 }))
            /* Otherwise the icon opens a search panel under the bar, like a menu */
            : h('div', { className: 'q-nav__item q-nav__item--search' },
                h('button', { ref: function (el) { linkRefs.current.search = el; }, type: 'button', className: cx('q-nav__link q-nav__search', open === 'search' && 'is-open'), 'aria-label': search.label || 'Search', 'aria-expanded': open === 'search' ? 'true' : 'false', 'aria-controls': id + '-search', onClick: function () { setOpen(open === 'search' ? null : 'search'); } }, h(Icon, { name: open === 'search' ? 'cross' : 'search', size: 16 })),
                open === 'search' || closing === 'search' ? h('div', { className: cx('q-nav__panel', 'q-nav__panel--search', open === 'search' ? (how === 'open' ? 'is-opening' : how === 'switch' ? 'is-switching' : null) : 'is-closing'), id: id + '-search', 'aria-hidden': open === 'search' ? undefined : 'true' },
                  h('div', { className: 'q-nav__panelbox' }, h(NavSearch, { search: search }))) : null)) : null,
          utility.length ? h('ul', { className: 'q-nav__items' }, utility.map(function (u, i) {
            u = navLinkObj(u);
            /* collapse: true hides the link when the bar gets narrow (below 1366px); it stays in the mobile menu */
            return h('li', { key: i, className: cx('q-nav__item', u.collapse && 'q-nav__item--collapse') }, h('a', { className: 'q-nav__link', href: u.href || '#' }, u.label));
          })) : null,
          actions ? h('div', { className: 'q-nav__cta' }, actions) : null) : null),
      h('span', { className: cx('q-nav__bar', bar.show && 'is-shown', bar.slide && 'is-sliding'), style: { width: bar.width + 'px', transform: 'translateX(' + bar.left + 'px)' }, 'aria-hidden': 'true' }));

    /* Mobile and tablet: one row per level, drilling in with the arrow and back with the blue link. */
    function row(key, label, badge, target) {
      var inner = [h('span', { key: 'l', className: 'q-navpanel__rowlabel' }, h('span', null, label), navBadge(badge)), h(Icon, { key: 'a', name: 'arrow-right', size: 16 })];
      return h('li', { key: key }, typeof target === 'function'
        ? h('button', { type: 'button', className: 'q-navpanel__row', onClick: target }, inner)
        : h('a', { className: 'q-navpanel__row', href: target || '#' }, inner));
    }
    function back(label, to) {
      return h('button', { type: 'button', className: 'q-navpanel__back', onClick: to }, h(Icon, { name: 'chevron-left', size: 16 }), h('span', null, label));
    }
    function panelBody() {
      if (!path.length) {
        return [
          search ? h(SearchBar, { key: 's', variant: 'contained', placeholder: search.placeholder || 'Search', onKeyDown: function (e) { if (e.key === 'Enter' && search.onSearch) search.onSearch(e.target.value); } }) : null,
          h('ul', { key: 'l', className: 'q-navpanel__list' }, items.map(function (it, i) {
            return row(i, it.label, it.badge, navMenu(it) ? function () { go([i]); } : it.href);
          })),
          h('div', { key: 'f', className: 'q-navpanel__foot' },
            utility.length ? h('ul', { className: 'q-navpanel__utility' }, utility.map(function (u, i) {
              u = navLinkObj(u); return h('li', { key: i }, h('a', { href: u.href || '#' }, u.label));
            })) : null,
            p.actions ? h('div', { className: 'q-navpanel__actions' }, p.actions) : (cta ? h(Button, { href: cta.href, onClick: cta.onClick, className: 'q-navpanel__cta' }, cta.label) : null))
        ];
      }
      var it = items[path[0]], m = navMenu(it), groups = m.groups || [];
      if (path.length === 1) {
        if (!m.groups) {
          return [back(it.label, function () { go([]); })].concat((m.columns || []).map(function (c, i) {
            return h('div', { key: i, className: 'q-navpanel__section' },
              c.title ? h('div', { className: 'q-nav__eyebrow q-nav__eyebrow--rule' }, c.title) : null,
              h('ul', { className: 'q-navpanel__list' }, (c.links || []).map(function (l, k) { l = navLinkObj(l); return row(k, l.label, l.badge, l.href); })));
          }));
        }
        var ov = m.overview;
        return [
          back(it.label, function () { go([]); }),
          ov ? h('div', { key: 'o', className: 'q-navpanel__overview' },
            h(ov.href ? 'a' : 'div', { className: 'q-mega__title', href: ov.href }, ov.title, ov.href ? navArrow() : null),
            ov.description ? h('p', { className: 'q-mega__desc' }, ov.description) : null) : null,
          h('div', { key: 'c', className: 'q-navpanel__section' },
            h('div', { className: 'q-nav__eyebrow q-nav__eyebrow--rule' }, m.railLabel || 'Capabilities'),
            h('ul', { className: 'q-navpanel__list' },
              [row('all', m.allLabel || 'All', null, function () { go([path[0], 'all']); })].concat(groups.map(function (g, i) {
                return row(i, g.title, g.badge, function () { go([path[0], i]); });
              }))))
        ];
      }
      var sel = path[1], shown = sel === 'all' ? groups : [groups[sel]];
      return [
        back(sel === 'all' ? (m.allLabel || 'All') : groups[sel].title, function () { go([path[0]]); }),
        h('div', { key: 'g', className: 'q-navpanel__section' },
          m.groupsLabel ? h('div', { className: 'q-nav__eyebrow q-nav__eyebrow--rule' }, m.groupsLabel) : null,
          h('div', { className: 'q-navpanel__groups' }, shown.map(navGroup)))
      ];
    }
    var mobileBar = h('div', { className: 'q-nav__mobilebar', inert: inline && mobileOpen ? '' : undefined }, logo,
      h('button', { type: 'button', className: 'q-nav__menubtn', 'aria-label': p.menuLabel || 'Menu', 'aria-haspopup': 'dialog', 'aria-expanded': mobileOpen ? 'true' : 'false', onClick: function () { setMobileOpen(true); } },
        h(Icon, { name: 'menu', size: 16 })));
    var panelShown = mobileOpen || mobileClosing;
    var mobilePanel = panelShown ? h('div', { ref: panel, className: cx('q-navpanel', inline && 'q-navpanel--inline', mobileClosing ? 'is-closing' : (ms[0].moved && 'is-opening')), role: inline ? undefined : 'dialog', 'aria-modal': inline ? undefined : 'true', 'aria-label': p.menuLabel || 'Menu' },
      h('div', { className: 'q-navpanel__bar' }, logo,
        h('button', { type: 'button', className: 'q-navpanel__close', 'aria-label': p.closeLabel || 'Close menu', onClick: function () { closeRef.current(); } }, h(Icon, { name: 'cross', size: 24 }))),
      h('div', { key: path.join('/'), className: cx('q-navpanel__body', !path.length && 'q-navpanel__body--root', dir && 'is-' + dir) }, panelBody())) : null;
    var RD = window.ReactDOM;
    return h('nav', { ref: root, className: cx('q-nav', 'q-nav--' + layout, p.className), 'aria-label': p.navLabel || 'Main' },
      layout !== 'mobile' ? desktop : null,
      layout !== 'desktop' ? mobileBar : null,
      layout !== 'desktop' && mobilePanel ? (inline || !(RD && RD.createPortal) ? mobilePanel : RD.createPortal(mobilePanel, document.body)) : null);
  }

  /* NavBanner — a promotion bar above the navigation: a line of copy, a date and place, one link, and a close button. */
  function NavBanner(p) {
    var st = React.useState(true), shown = st[0], setShown = st[1];
    if (!shown) return null;
    var meta = p.meta || [];
    return h('div', { className: cx('q-navbanner', p.className), role: 'region', 'aria-label': p.label || 'Announcement' },
      h('div', { className: 'q-navbanner__content' },
        h('span', { className: 'q-navbanner__text' },
          h('span', { className: 'q-navbanner__title' }, p.title),
          meta.length ? h('span', { className: 'q-navbanner__meta' }, meta.map(function (t, i) {
            /* a divider before each part, the first one included, so the title, date and place read as three separate pieces */
            return h(React.Fragment, { key: i }, h('span', { className: 'q-navbanner__sep', 'aria-hidden': 'true' }, '|'), h('span', null, t));
          })) : null),
        p.cta ? h(TextLink, { tone: 'inverted', arrow: true, href: p.cta.href, onClick: p.cta.onClick }, p.cta.label) : null),
      p.dismissible === false ? null : h('button', { type: 'button', className: 'q-navbanner__close', 'aria-label': p.closeLabel || 'Dismiss', onClick: function () { setShown(false); if (p.onClose) p.onClose(); } },
        h(Icon, { name: 'cross', size: 24 })));
  }

  /* Form — the lead-capture card from the Figma Forms page: a heading, fields, an opt-in checkbox, one primary Button and the consent line.
     variant: 'full' (centred heading, shield) | 'extended' (left heading, link under the button) | 'gate' | 'minimal' (tighter card, link beside the button). */
  function Form(p) {
    var variant = p.variant || 'full';
    var fields = p.fields || [];
    var id = useId(p.id);
    var consent = p.consent ? (typeof p.consent === 'string' ? { label: p.consent } : p.consent) : null;
    var consentName = consent ? (consent.name || 'optIn') : null;
    var link = p.link ? (typeof p.link === 'string' ? { label: p.link } : p.link) : null;
    var vs = React.useState(function () {
      var o = {};
      fields.forEach(function (f) { o[f.name] = f.defaultValue != null ? f.defaultValue : ''; });
      if (consent) o[consentName] = !!consent.defaultChecked;
      return o;
    }), values = vs[0], setValues = vs[1];
    var es = React.useState({}), errors = es[0], setErrors = es[1];
    var formRef = React.useRef(null);
    function set(name, v) {
      setValues(function (o) { var n = Object.assign({}, o); n[name] = v; return n; });
      if (errors[name]) setErrors(function (o) { var n = Object.assign({}, o); delete n[name]; return n; });
    }
    function check() {
      var out = {}, req = p.requiredMessage || 'This field is required';
      fields.forEach(function (f) {
        var v = values[f.name], msg = null;
        if (f.required && (v == null || String(v).trim() === '')) msg = f.requiredMessage || req;
        else if (v && f.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) msg = f.invalidMessage || 'Enter a valid email address';
        else if (f.validate) msg = f.validate(v, values) || null;
        if (msg) out[f.name] = msg;
      });
      if (consent && consent.required && !values[consentName]) out[consentName] = consent.requiredMessage || req;
      return out;
    }
    function submit(e) {
      var errs = check(), bad = Object.keys(errs);
      setErrors(errs);
      if (bad.length) {
        e.preventDefault();
        var el = formRef.current && formRef.current.querySelector('[data-field="' + bad[0] + '"] input:not([type="hidden"]), [data-field="' + bad[0] + '"] button');
        if (el) el.focus();
        return;
      }
      if (p.onSubmit) { e.preventDefault(); p.onSubmit(values, e); }
    }
    function cell(f) {
      var common = { id: id + '-' + f.name, name: f.name, label: f.label, error: errors[f.name] || f.error, hint: f.hint, disabled: f.disabled || p.disabled, placeholder: f.placeholder };
      var control = f.type === 'select' || f.options
        ? h(Select, Object.assign(common, { options: f.options, value: values[f.name] || null, onChange: function (v) { set(f.name, v); } }))
        : h(TextField, Object.assign(common, { type: f.type || 'text', value: values[f.name], required: f.required, autoComplete: f.autoComplete, inputMode: f.inputMode, maxLength: f.maxLength, onChange: function (e) { set(f.name, e.target.value); } }));
      return h('div', { key: f.name, className: 'q-form__cell', 'data-field': f.name }, control);
    }
    /* Two neighbouring fields marked half share a row on desktop. */
    var rows = [];
    for (var i = 0; i < fields.length; i++) {
      if (fields[i].half && fields[i + 1] && fields[i + 1].half) { rows.push(h('div', { key: 'r' + i, className: 'q-form__row' }, cell(fields[i]), cell(fields[i + 1]))); i++; }
      else rows.push(cell(fields[i]));
    }
    var consentErr = consent ? errors[consentName] : null;
    return h('div', { className: cx('q-form', 'q-form--' + variant, p.image && 'q-form--media', p.appearance === 'bare' && 'q-form--bare', p.tone === 'inverted' && 'q-form--inverted', p.className) },
      p.image ? h('div', { className: 'q-form__media' }, h('img', { src: p.image, alt: p.imageAlt || '' })) : null,
      h('form', { ref: formRef, className: 'q-form__body', action: p.action, method: p.method, noValidate: true, onSubmit: submit, 'aria-labelledby': p.title ? id + '-title' : undefined, 'aria-label': p.title ? undefined : p.label },
        p.logoSrc || p.title || p.subtitle ? h('div', { className: 'q-form__head' },
          p.logoSrc ? h('img', { className: 'q-form__logo', src: p.logoSrc, alt: p.logoAlt || '' }) : null,
          p.title ? heading(p.titleLevel || 2, { className: 'q-form__title', id: id + '-title' }, p.title) : null,
          p.subtitle ? h('p', { className: 'q-form__subtitle' }, p.subtitle) : null) : null,
        rows.length ? h('div', { className: 'q-form__fields' }, rows) : null,
        consent ? h('div', { className: cx('q-form__consent', consentErr && 'is-error'), 'data-field': consentName },
          h(Checkbox, { size: 'sm', name: consentName, value: consent.value || 'yes', checked: !!values[consentName], required: consent.required, disabled: p.disabled, 'aria-describedby': consentErr ? id + '-consent-msg' : undefined, onChange: function (e) { set(consentName, e.target.checked); }, label: consent.label }),
          consentErr ? h('span', { className: 'q-field__msg', id: id + '-consent-msg' }, consentErr) : null) : null,
        p.children ? h('div', { className: 'q-form__extra' }, p.children) : null,
        h('div', { className: 'q-form__actions' },
          h(Button, { type: 'submit', disabled: p.disabled, className: 'q-form__submit' }, p.submitLabel || 'Submit'),
          link ? h(TextLink, { href: link.href, onClick: link.onClick, className: 'q-form__link' }, link.label) : null),
        p.legal ? h('p', { className: 'q-form__legal' }, p.legal) : null));
  }

  /* ── Page modules (Figma: Hero, Typographic Headers, General Content Modules) ── */
  var MEDIA_GLYPH = 'M75 9.375L12.5 9.375C11.671 9.375 10.876 9.704 10.29 10.29C9.704 10.876 9.375 11.671 9.375 12.5L9.375 75C9.375 75.829 9.704 76.624 10.29 77.21C10.876 77.796 11.671 78.125 12.5 78.125L75 78.125C75.829 78.125 76.624 77.796 77.21 77.21C77.796 76.624 78.125 75.829 78.125 75L78.125 12.5C78.125 11.671 77.796 10.876 77.21 10.29C76.624 9.704 75.829 9.375 75 9.375ZM12.5 0C9.185 0 6.005 1.317 3.661 3.661C1.317 6.005 0 9.185 0 12.5L0 75C0 78.315 1.317 81.495 3.661 83.839C6.005 86.183 9.185 87.5 12.5 87.5L75 87.5C78.315 87.5 81.495 86.183 83.839 83.839C86.183 81.495 87.5 78.315 87.5 75L87.5 12.5C87.5 9.185 86.183 6.005 83.839 3.661C81.495 1.317 78.315 0 75 0L12.5 0ZM68.75 61.606L53.125 43.75L37.65 61.438L28.125 50L18.75 61.25L18.75 68.75L68.75 68.75L68.75 61.606ZM34.375 43.75C36.861 43.75 39.246 42.762 41.004 41.004C42.762 39.246 43.75 36.861 43.75 34.375C43.75 31.889 42.762 29.504 41.004 27.746C39.246 25.988 36.861 25 34.375 25C31.889 25 29.504 25.988 27.746 27.746C25.988 29.504 25 31.889 25 34.375C25 36.861 25.988 39.246 27.746 41.004C29.504 42.762 31.889 43.75 34.375 43.75Z';
  /* The play button: a 64px white disc with an Asphalt triangle. */
  function playButton(label, onClick, cls) {
    return h('button', { type: 'button', className: cx('q-play', cls), 'aria-label': label || 'Play video', onClick: onClick },
      h('svg', { viewBox: '0 0 64 64', width: 64, height: 64, 'aria-hidden': 'true' },
        h('path', { d: 'M26 19.6L46.2 32L26 44.4Z', fill: 'currentColor', stroke: 'currentColor', strokeWidth: 2, strokeLinejoin: 'round' })));
  }
  /* Media — an image, or a video poster with the play button; with no source it shows the grey placeholder from Figma. */
  function Media(p) {
    var ps = React.useState(false), playing = ps[0], setPlaying = ps[1];
    var style = p.ratio ? Object.assign({ aspectRatio: String(p.ratio) }, p.style) : p.style;
    var video = p.video, vsrc = typeof video === 'string' ? video : null;
    var poster = p.poster || p.src;
    if (video) {
      if (playing && vsrc) return h('div', { className: cx('q-media', 'q-media--video', 'is-playing', p.className), style: style },
        h('video', { src: vsrc, poster: poster, controls: true, autoPlay: true, playsInline: true }));
      return h('div', { className: cx('q-media', 'q-media--video', !poster && 'q-media--empty', p.className), style: style },
        poster ? h('img', { src: poster, alt: p.alt || '' }) : null,
        p.children,
        playButton(p.playLabel, function (e) { if (p.onPlay) p.onPlay(e); if (vsrc && !e.defaultPrevented) setPlaying(true); }, 'q-media__play'));
    }
    return h('div', { className: cx('q-media', !p.src && 'q-media--empty', p.className), style: style },
      p.src ? h('img', { src: p.src, alt: p.alt || '' }) : h('svg', { className: 'q-media__glyph', viewBox: '0 0 87.5 87.5', 'aria-hidden': 'true' }, h('path', { d: MEDIA_GLYPH, fill: 'currentColor', fillRule: 'evenodd' })),
      p.children);
  }
  function mediaOf(m) {
    if (React.isValidElement(m)) return m;
    return h(Media, typeof m === 'string' ? { src: m } : (m || {}));
  }
  /* The copy block every module shares: eyebrow, title, body, actions. */
  function copyParts(p, level) {
    var body = p.body != null ? p.body : p.subtitle;
    return [
      p.eyebrow ? h('p', { key: 'e', className: 'q-copy__eyebrow' }, p.eyebrow) : null,
      p.title ? heading(p.titleLevel || level, { key: 't', className: 'q-copy__title' }, p.title) : null,
      body ? h(typeof body === 'string' ? 'p' : 'div', { key: 'b', className: 'q-copy__body' }, body) : null,
      p.actions ? h('div', { key: 'a', className: 'q-copy__actions' }, p.actions) : null
    ];
  }
  function prefersStill() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }

  /* Hero — the top-of-page module. layout: 'split' (copy + media) | 'left' | 'center' | 'form'; size 'lg' (Impact) | 'rg' (Standard).
     background { src, tone, video, contained } puts the copy on a photo or video instead. */
  function Hero(p) {
    var form = p.form, media = p.media, bg = p.background;
    if (typeof bg === 'string') bg = { src: bg };
    if (!bg && p.image) bg = { src: p.image, tone: p.tone === 'light' ? 'light' : 'dark' };
    var layout = p.layout || (form ? 'form' : media ? 'split' : (p.align === 'center' ? 'center' : 'left'));
    var size = p.size === 'rg' ? 'rg' : 'lg';
    var copy = h('div', { className: 'q-copy q-hero__copy' }, copyParts(p, 1));
    var inner = copy, mod = null;
    if (bg) {
      var tone = bg.tone === 'light' ? 'light' : 'dark';
      var contained = bg.contained != null ? !!bg.contained : (layout === 'center' || !!bg.video);
      mod = cx('q-hero--bg', contained ? 'q-hero--contained' : 'q-hero--bleed');
      if (layout !== 'center') layout = 'left';
      inner = h('div', { className: cx('q-hero__panel', 'q-hero__panel--' + tone, !(bg.src || typeof bg.video === 'string') && 'q-hero__panel--empty') },
        typeof bg.video === 'string' ? h('video', { className: 'q-hero__bgmedia', src: bg.video, poster: bg.src, autoPlay: !prefersStill(), muted: true, loop: true, playsInline: true, 'aria-hidden': 'true' })
          : (bg.src ? h('img', { className: 'q-hero__bgmedia', src: bg.src, alt: bg.alt || '' }) : null),
        h('div', { className: 'q-hero__shade', 'aria-hidden': 'true' }),
        h('div', { className: 'q-hero__panelin' }, copy));
    } else if (layout === 'split') {
      inner = h('div', { className: 'q-hero__row' }, copy, h('div', { className: 'q-hero__media' }, mediaOf(media)));
    } else if (layout === 'form') {
      inner = h('div', { className: 'q-hero__row' }, copy,
        h('div', { className: 'q-hero__form' },
          p.visual ? h('div', { className: 'q-hero__visual', 'aria-hidden': 'true' }, typeof p.visual === 'string' ? h('img', { src: p.visual, alt: '' }) : p.visual) : null,
          React.isValidElement(form) ? form : h(Form, Object.assign({ variant: 'gate' }, form))));
    }
    return h('section', { className: cx('q-section', 'q-hero', 'q-hero--' + layout, 'q-hero--' + size, mod, p.className), id: p.id },
      h('div', { className: 'q-section__inner' }, inner));
  }

  /* TypographicHeader — a section opener with no media: eyebrow, heading, a short paragraph and up to two buttons. */
  function TypographicHeader(p) {
    return h('section', { className: cx('q-section', 'q-theader', p.align === 'center' && 'q-theader--center', p.className), id: p.id },
      h('div', { className: 'q-section__inner' }, h('div', { className: 'q-copy q-theader__copy' }, copyParts(p, 2))));
  }

  /* GeneralContent — copy beside an image or video, a full-width image or video, or a banner with the copy over the media.
     layout: 'media-right' | 'media-left' | 'full' | 'banner'. */
  function GeneralContent(p) {
    var layout = p.layout || 'media-right', media = p.media, inner;
    var bs = React.useState(false), playing = bs[0], setPlaying = bs[1];
    if (layout === 'full') inner = h('div', { className: 'q-gc__media' }, mediaOf(media));
    else if (layout === 'banner') {
      var m = typeof media === 'string' ? { src: media } : (media || {});
      var poster = m.poster || m.src, vsrc = typeof m.video === 'string' ? m.video : null;
      inner = playing && vsrc
        ? h('div', { className: 'q-media q-media--video is-playing q-gc__bannervideo' }, h('video', { src: vsrc, poster: poster, controls: true, autoPlay: true, playsInline: true }))
        : h('div', { className: cx('q-gc__banner', poster && 'q-gc__banner--image') },
            poster ? h('img', { className: 'q-gc__bannerimg', src: poster, alt: m.alt || '' }) : null,
            poster ? h('div', { className: 'q-gc__shade', 'aria-hidden': 'true' }) : null,
            h('div', { className: 'q-copy q-gc__bannercopy' }, copyParts(p, 2)),
            m.video ? playButton(m.playLabel, function (e) { if (m.onPlay) m.onPlay(e); if (vsrc && !e.defaultPrevented) setPlaying(true); }, 'q-gc__play') : null);
    } else {
      inner = h('div', { className: 'q-gc__row' },
        h('div', { className: 'q-copy q-gc__copy' }, copyParts(p, 2)),
        h('div', { className: 'q-gc__media' }, mediaOf(media)));
    }
    return h('section', { className: cx('q-section', 'q-gc', 'q-gc--' + layout, p.className), id: p.id },
      h('div', { className: 'q-section__inner' }, inner));
  }

  /* TabModule — a white card with the Tabs across the top; each tab has its own heading, copy, actions and media. */
  function TabModule(p) {
    var items = (p.items || []).map(function (it, i) {
      return { id: it.id != null ? it.id : i, label: it.label, content: h('div', { className: 'q-tabmod__row' },
        h('div', { className: 'q-copy q-tabmod__copy' }, copyParts(it, p.titleLevel || 2)),
        it.media !== undefined || p.media !== undefined ? h('div', { className: 'q-tabmod__media' }, mediaOf(it.media !== undefined ? it.media : p.media)) : null) };
    });
    return h('section', { className: cx('q-section', 'q-tabmod', p.align === 'center' && 'q-tabmod--center', p.className), id: p.id },
      h('div', { className: 'q-section__inner' },
        h('div', { className: 'q-tabmod__card' },
          h(Tabs, { items: items, value: p.value, defaultValue: p.defaultValue, onChange: p.onChange, label: p.label, autoplay: p.autoplay, pauseLabel: p.pauseLabel, playLabel: p.playLabel }))));
  }

  /* AccordionModule — an Accordion as a page section: on its own under a heading, beside a copy block, beside media,
     or as a list with the open item's content beside it. layout: 'full' | 'split' | 'media-left' | 'media-right' | 'list'.
     In the list a blue Marker slides to the open row; a row's cta may be { label, href } and the module picks Button or TextLink. */
  function AccordionModule(p) {
    var layout = p.layout || (p.media !== undefined ? 'media-right' : (p.body != null || p.actions || p.eyebrow ? 'split' : 'full'));
    var list = layout === 'list', items = p.items || [];
    var level = p.titleLevel || 2;
    var hasCopy = !!(p.eyebrow || p.title || p.body != null || p.subtitle != null || p.actions);
    var copy = hasCopy ? h('div', { className: 'q-copy q-accmod__copy' }, copyParts(p, level)) : null;
    /* One primary Button per module: when the copy block has one (and always in the list), a row's CTA is a neutral TextLink with the arrow. */
    var quiet = list || React.Children.toArray(p.actions).some(function (c) { return c && c.type === Button && (!c.props.variant || c.props.variant === 'primary'); });
    function rowCta(c) {
      if (c == null || typeof c !== 'object') return c;
      var el = React.isValidElement(c), props = el ? c.props : c, label = el ? props.children : props.label;
      if (el && !(quiet && c.type === Button && (!props.variant || props.variant === 'primary'))) return c;
      var rest = omit(props, ['label', 'children', 'variant', 'size', 'iconLeft', 'iconRight', 'className']);
      return quiet ? h(TextLink, Object.assign({ tone: 'neutral', arrow: true }, rest), label) : h(Button, Object.assign({ size: 'sm' }, rest), label);
    }
    items = items.map(function (it) { return it && it.cta != null ? Object.assign({}, it, { cta: rowCta(it.cta) }) : it; });
    /* List: one Marker on the left edge that slides to the open row, like the bar under the Nav links. */
    var tone = list && p.marker !== false ? (p.marker || 'blue') : null;
    var listRef = React.useRef(null);
    var ms = React.useState(null), markY = ms[0], setMarkY = ms[1];
    var cs = React.useState(0), changes = cs[0], setChanges = cs[1];
    function placeMarker() {
      var box = listRef.current, row = box && box.querySelector('.q-drawer.is-open > .q-drawer__heading');
      var y = row && row.offsetHeight ? Math.round((row.getBoundingClientRect().top - box.getBoundingClientRect().top + (row.offsetHeight - 36) / 2) * 100) / 100 : null;
      setMarkY(function (v) { return v === y ? v : y; });
    }
    React.useLayoutEffect(function () { if (tone) placeMarker(); }, [tone, changes, items.length]);
    React.useEffect(function () {
      if (!tone) return;
      var ro = typeof ResizeObserver !== 'undefined' && listRef.current ? new ResizeObserver(placeMarker) : null;
      if (ro) ro.observe(listRef.current);
      window.addEventListener('resize', placeMarker);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(placeMarker);
      return function () { window.removeEventListener('resize', placeMarker); if (ro) ro.disconnect(); };
    }, [tone, items.length]);
    var acc = h(Accordion, {
      items: items, multiple: list ? false : p.multiple, collapsible: list ? false : p.collapsible,
      defaultOpen: p.defaultOpen != null ? p.defaultOpen : (list && items.length ? 0 : undefined),
      headingLevel: p.headingLevel || (p.title ? level + 1 : 3), className: 'q-accmod__accordion',
      onChange: function (v) { setChanges(function (c) { return c + 1; }); if (p.onChange) p.onChange(v); }
    });
    if (list) acc = h('div', { className: 'q-accmod__list', ref: listRef }, acc,
      tone && markY != null ? h(Marker, { tone: tone, className: 'q-accmod__marker', style: { transform: 'translateY(' + markY + 'px)' } }) : null);
    var inner;
    if (layout === 'split') inner = h('div', { className: 'q-accmod__row' }, copy, h('div', { className: 'q-accmod__main' }, acc));
    else if (layout === 'media-left' || layout === 'media-right') {
      var media = h('div', { key: 'm', className: 'q-accmod__media' }, mediaOf(p.media));
      var main = h('div', { key: 'a', className: 'q-accmod__main' }, copy, acc);
      inner = h('div', { className: 'q-accmod__row' }, layout === 'media-left' ? [media, main] : [main, media]);
    } else inner = h('div', { className: 'q-accmod__main' }, copy, acc);
    return h('section', { className: cx('q-section', 'q-accmod', 'q-accmod--' + layout, tone && 'has-marker', p.className), id: p.id, style: list ? { '--q-accmod-n': items.length } : undefined },
      h('div', { className: 'q-section__inner' }, inner));
  }

  /* CtaModule — the closing call to action: a sign-up Form beside or over media, or a dark card with a heading and buttons.
     layout: 'media-right' | 'media-left' | 'bleed' | 'background' | 'card'. */
  function CtaModule(p) {
    var form = p.form;
    var layout = p.layout || (form ? 'media-right' : 'card');
    if (!form || layout === 'card') {
      return h('section', { className: cx('q-section', 'q-cta', 'q-cta--card', p.className), id: p.id },
        h('div', { className: 'q-section__inner' }, h('div', { className: 'q-cta__card' }, h('div', { className: 'q-copy q-cta__copy' }, copyParts(p, 2)))));
    }
    var m = typeof p.media === 'string' ? { src: p.media } : (p.media || {});
    var formNode = React.isValidElement(form) ? form : h(Form, Object.assign({ variant: 'full', appearance: 'bare', tone: layout === 'background' ? 'inverted' : undefined }, form));
    var art = null;
    if (layout === 'bleed') art = h('div', { className: cx('q-cta__bleed', !m.src && 'q-cta__bleed--empty'), role: m.src && m.alt ? 'img' : undefined, 'aria-label': m.src && m.alt ? m.alt : undefined, 'aria-hidden': m.src && m.alt ? undefined : 'true', style: m.src ? { backgroundImage: 'url("' + m.src + '")' } : undefined });
    else if (layout === 'background') art = h('div', { className: cx('q-cta__bg', !m.src && 'q-cta__bg--empty'), 'aria-hidden': 'true' }, m.src ? h('img', { src: m.src, alt: '' }) : null);
    return h('section', { className: cx('q-section', 'q-cta', 'q-cta--form', 'q-cta--' + layout, p.className), id: p.id },
      art,
      h('div', { className: 'q-section__inner' },
        h('div', { className: 'q-cta__row' },
          h('div', { className: 'q-cta__formcol' }, formNode),
          layout === 'media-right' || layout === 'media-left' ? h('div', { className: 'q-cta__media' }, mediaOf(p.media)) : h('div', { className: 'q-cta__media', 'aria-hidden': 'true' }))));
  }

  /* Carousel — a row of cards you scroll sideways, with the progress bar and the previous / next buttons.
     variant 'multi' (cards of slideWidth, default 350px) or 'single' (one card as wide as the column). */
  function Carousel(p) {
    var slides = React.Children.toArray(p.children);
    var vp = React.useRef(null);
    var st = React.useState({ progress: 0, atStart: true, atEnd: false }), s = st[0], setS = st[1];
    function measure() {
      var el = vp.current; if (!el) return;
      var max = el.scrollWidth - el.clientWidth;
      var next = { progress: el.scrollWidth ? Math.min(1, (el.scrollLeft + el.clientWidth) / el.scrollWidth) : 1, atStart: el.scrollLeft <= 1, atEnd: el.scrollLeft >= max - 1 };
      setS(function (o) { return o.progress === next.progress && o.atStart === next.atStart && o.atEnd === next.atEnd ? o : next; });
    }
    React.useEffect(function () {
      measure();
      window.addEventListener('resize', measure);
      return function () { window.removeEventListener('resize', measure); };
    }, [slides.length]);
    function step(dir) {
      var el = vp.current, first = el && el.querySelector('.q-carousel__slide'); if (!first) return;
      var gap = parseFloat(getComputedStyle(first.parentNode).columnGap) || 0;
      el.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: prefersStill() ? 'auto' : 'smooth' });
    }
    var w = p.slideWidth, style = w ? { '--q-slide': typeof w === 'number' ? w + 'px' : w } : undefined;
    return h('section', { className: cx('q-section', 'q-carousel', 'q-carousel--' + (p.variant === 'single' ? 'single' : 'multi'), p.spacing === 'lg' && 'q-carousel--roomy', p.className), id: p.id, 'aria-roledescription': 'carousel', 'aria-label': p.label, style: style },
      h('div', { className: 'q-carousel__viewport', ref: vp, onScroll: measure, tabIndex: 0, role: 'group', 'aria-label': p.label ? p.label + ', scrollable' : 'Scrollable' },
        h('ul', { className: 'q-carousel__track' }, slides.map(function (c, i) { return h('li', { key: i, className: 'q-carousel__slide' }, c); }))),
      slides.length > 1 ? h('div', { className: 'q-section__inner q-carousel__controls' },
        h('div', { className: 'q-carousel__progress', 'aria-hidden': 'true' }, h('span', { style: { width: (s.progress * 100) + '%' } })),
        h('div', { className: 'q-carousel__nav' },
          h('button', { type: 'button', className: 'q-carousel__btn', 'aria-label': p.prevLabel || 'Previous', disabled: s.atStart, onClick: function () { step(-1); } }, h(Icon, { name: 'chevron-left', size: 16 })),
          h('button', { type: 'button', className: 'q-carousel__btn', 'aria-label': p.nextLabel || 'Next', disabled: s.atEnd, onClick: function () { step(1); } }, h(Icon, { name: 'chevron-right', size: 16 })))) : null);
  }

  /* TestimonialCard — a customer quote: their logo, the quote, who said it and a link to the story.
     size 'lg' | 'sm'; image puts the quote on a white panel over a photo; video adds a portrait clip beside it. */
  function TestimonialCard(p) {
    var size = p.size === 'sm' || p.video ? 'sm' : 'lg', link = p.link, video = p.video;
    if (typeof link === 'string') link = { href: link };
    var body = [
      p.logo ? h('div', { key: 'l', className: 'q-tcard__logo' }, typeof p.logo === 'string' ? h('img', { src: p.logo, alt: p.logoAlt || '' }) : p.logo) : null,
      h('blockquote', { key: 'q', className: 'q-tcard__quote' }, p.quote),
      h('div', { key: 'f', className: 'q-tcard__foot' },
        p.name ? h('figcaption', { className: 'q-tcard__person' },
          p.avatar === false || video ? null : h(Avatar, { image: typeof p.avatar === 'string' ? p.avatar : undefined }),
          h('div', { className: 'q-tcard__who' }, h('span', { className: 'q-tcard__name' }, p.name), p.company ? h('span', { className: 'q-tcard__company' }, p.company) : null)) : null,
        link ? h(TextLink, { tone: 'neutral', arrow: true, href: link.href, onClick: link.onClick }, link.label || 'Read the Story') : null)
    ];
    var content = h('div', { className: 'q-tcard__content' }, body);
    return h('figure', { className: cx('q-tcard', 'q-tcard--' + size, p.image && 'q-tcard--image', video && 'q-tcard--video', p.className), style: p.image ? { backgroundImage: 'url("' + p.image + '")' } : undefined },
      content,
      video ? h('div', { className: 'q-tcard__video' }, mediaOf(video === true ? { video: true } : video)) : null);
  }
  /* TestimonialCarousel — TestimonialCards in the Carousel, with the roomier 100px section padding. */
  function TestimonialCarousel(p) {
    var items = p.items || [], size = p.size || 'lg';
    return h(Carousel, { className: cx('q-tcarousel', 'q-tcarousel--' + size, p.className), spacing: 'lg', label: p.label || 'Customer stories', id: p.id, prevLabel: p.prevLabel, nextLabel: p.nextLabel },
      items.map(function (it, i) { return h(TestimonialCard, Object.assign({ key: i, size: size === 'sm' || size === 'video' ? 'sm' : 'lg' }, it)); }));
  }

  /* LogoImg — a logo sized for optical balance: every logo gets about the same area in its cell, so a square mark is not
     dwarfed by a long wordmark (height follows the square root of the aspect ratio). `scale` nudges one logo for its visual
     weight: below 1 for dense, dark or heavy logos, above 1 for thin, light ones. `optical={false}` just fits the cell. */
  function LogoImg(p) {
    var ref = React.useRef(null), ss = React.useState(null), size = ss[0];
    function fit() {
      var img = ref.current; if (!img || !img.naturalWidth || p.optical === false) return;
      var cell = img.closest('.q-logos__tile, .q-logos__cell') || img.parentNode;
      var cs = getComputedStyle(cell);
      var W = cell.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      var H = cell.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      if (W <= 0 || H <= 0) return;
      var r = img.naturalWidth / img.naturalHeight, k = p.scale || 1;
      var hh = Math.sqrt(0.5 * W * H / r) * k, ww = hh * r;
      if (ww > W) { ww = W; hh = W / r; }
      if (hh > H) { hh = H; ww = H * r; }
      var next = [Math.round(ww), Math.round(hh)];
      ss[1](function (cur) { return cur && cur[0] === next[0] && cur[1] === next[1] ? cur : next; });
    }
    React.useEffect(function () {
      var img = ref.current; if (!img) return undefined;
      if (img.complete) fit();
      var cell = img.closest('.q-logos__tile, .q-logos__cell');
      if (!cell || typeof ResizeObserver === 'undefined') return undefined;
      var ro = new ResizeObserver(fit); ro.observe(cell);
      return function () { ro.disconnect(); };
    }, [p.src, p.scale, p.optical]);
    return h('img', { ref: ref, src: p.src, alt: p.alt || '', onLoad: fit, style: size ? { width: size[0] + 'px', height: size[1] + 'px' } : undefined });
  }
  /* A logo that opens its HoverCard: the logo is the button, the card repeats the logo beside its badge. */
  function logoCard(l, img, copy, onOpenChange) {
    var name = l.alt || l.card.title || 'Logo';
    return h(HoverCard, Object.assign({ kind: 'logo', logo: l.src, label: name }, l.card, { onOpenChange: onOpenChange }),
      h('button', { type: 'button', className: 'q-hcard__trigger q-logos__trigger', 'aria-label': name + ': details', tabIndex: copy ? -1 : undefined }, img));
  }
  /* LogoCarousel — a heading over a row of customer logos that scrolls by itself, with a pause button. */
  function LogoCarousel(p) {
    var logos = (p.logos || []).map(function (l) { return typeof l === 'string' ? { src: l } : l; });
    var ps = React.useState(function () { return !!p.paused || prefersStill(); }), paused = ps[0], setPaused = ps[1];
    /* A logo with a `card` opens a HoverCard; the row waits while one is open. */
    var hs = React.useState(0), held = hs[0];
    function tile(l, key, copy) {
      var img = h(LogoImg, { src: l.src, alt: copy || l.card ? '' : (l.alt || ''), scale: l.scale, optical: p.optical });
      var inner = l.card ? logoCard(l, img, copy, function (on) { hs[1](function (c) { return Math.max(0, c + (on ? 1 : -1)); }); }) : (l.href && !copy ? h('a', { href: l.href }, img) : img);
      var extra = !copy && typeof key === 'number' && key >= mobileMax;
      return h('li', { key: key, className: cx('q-logos__tile', copy && 'q-logos__tile--copy', extra && 'is-extra'), 'aria-hidden': copy ? 'true' : undefined }, inner);
    }
    /* On phones: 'stack' (default) shows up to `mobileMax` logos (8) in two still columns; 'carousel' keeps the moving row. */
    var mobile = p.mobile === 'carousel' ? 'carousel' : 'stack', mobileMax = p.mobileMax || 8;
    return h('section', { className: cx('q-section', 'q-logos', 'q-logos--carousel', 'q-logos--m' + mobile, (paused || held > 0) && 'is-paused', p.className), id: p.id },
      h('div', { className: 'q-section__inner q-logos__head' },
        p.title ? heading(p.titleLevel || 2, { className: 'q-copy__title q-logos__title' }, p.title) : null,
        logos.length ? h('button', { type: 'button', className: 'q-carousel__btn q-logos__toggle', 'aria-label': paused ? (p.playLabel || 'Play the logo carousel') : (p.pauseLabel || 'Pause the logo carousel'), onClick: function () { setPaused(!paused); } },
          h('svg', { viewBox: '0 0 16 16', width: 16, height: 16, 'aria-hidden': 'true' }, h('path', { d: paused ? 'M4 2.5L13 8L4 13.5Z' : 'M3.5 2.5H6.5V13.5H3.5ZM9.5 2.5H12.5V13.5H9.5Z', fill: 'currentColor' }))) : null),
      h('div', { className: 'q-logos__viewport' },
        h('ul', { className: 'q-logos__track', style: { animationDuration: (p.duration || Math.max(12, logos.length * 4)) + 's' } },
          logos.map(function (l, i) { return tile(l, i, false); }).concat(logos.map(function (l, i) { return tile(l, 'c' + i, true); })))));
  }
  /* LogoHierarchy — logos grouped in tiers under a heading: one lead sponsor, then rows of four. */
  function LogoHierarchy(p) {
    var tiers = p.tiers || [];
    return h('section', { className: cx('q-section', 'q-logos', 'q-logos--tiers', p.className), id: p.id },
      h('div', { className: 'q-section__inner' },
        p.title ? heading(p.titleLevel || 2, { className: 'q-copy__title q-logos__title' }, p.title) : null,
        tiers.map(function (t, i) {
          var logos = t.logos || [];
          /* The lead tier (one or two logos above the rest) is drawn larger: the signature sponsor. */
          var level = t.level || (i === 0 && tiers.length > 1 && logos.length <= 2 ? 'signature' : 'standard');
          /* On phones: one column, or two; 'auto' takes one column up to four logos and two from five. */
          var cols = level === 'signature' ? 1 : (t.mobileColumns || p.mobileColumns || 'auto');
          if (cols === 'auto') cols = logos.length <= 4 ? 1 : 2;
          return h('div', { key: i, className: cx('q-logos__tier', 'q-logos__tier--' + level) },
            t.label ? h('p', { className: 'q-logos__tierlabel' }, t.label) : null,
            h('ul', { className: cx('q-logos__grid', 'q-logos__grid--m' + cols) }, logos.map(function (l, k) {
              l = typeof l === 'string' ? { src: l } : l;
              var img = h(LogoImg, { src: l.src, alt: l.card ? '' : (l.alt || ''), scale: l.scale, optical: p.optical });
              return h('li', { key: k, className: 'q-logos__cell' }, l.card ? logoCard(l, img) : (l.href ? h('a', { href: l.href }, img) : img));
            })));
        })));
  }

  /* ── Comparison tables (Claude Design: Comparison Table) ── */
  /* True while the element is narrower than `max`: the tables change to their mobile layout by their own width, wherever they sit. */
  function useNarrow(ref, max, forced) {
    var st = React.useState(forced === 'mobile');
    React.useLayoutEffect(function () {
      if (forced === 'mobile' || forced === 'desktop') { st[1](forced === 'mobile'); return undefined; }
      var el = ref.current;
      if (!el) return undefined;
      function check() { st[1](el.offsetWidth < max); }
      check();
      if (typeof ResizeObserver === 'undefined') { window.addEventListener('resize', check); return function () { window.removeEventListener('resize', check); }; }
      var ro = new ResizeObserver(check);
      ro.observe(el);
      return function () { ro.disconnect(); };
    }, [forced, max]);
    return st[0];
  }
  function cmpColumns(list) {
    return (list || []).map(function (c, i) { c = typeof c === 'string' ? { name: c } : c; return Object.assign({}, c, { id: c.id != null ? String(c.id) : String(i) }); });
  }
  /* A column's logo; without one, a dashed slot holding the name. */
  function cmpLogo(c, size) {
    if (c.logo) return h('img', { className: 'q-cmp__logo', src: c.logo, alt: c.logoAlt || c.name || '', style: { height: size + 'px' } });
    return h('span', { className: 'q-cmp__nologo', style: { height: size + 'px' } }, h('span', null, c.name));
  }
  function cmpMark(yes, col, red) {
    return h('span', { className: cx('q-cmp__mark', yes ? 'q-cmp__mark--yes' : (red ? 'q-cmp__mark--no-red' : 'q-cmp__mark--no')), role: 'img', 'aria-label': (col ? col + ': ' : '') + (yes ? 'Yes' : 'No') },
      h(Icon, { name: yes ? 'check' : 'cross', size: 'sm' }));
  }
  function cmpHeading(p, key) {
    if (!p.title && !p.subtitle) return h('div', { key: key });
    return h('div', { key: key, className: 'q-cmp__heading' },
      p.title ? heading(p.titleLevel || 2, { className: 'q-cmp__title' }, p.title) : null,
      p.subtitle ? h('p', { className: 'q-cmp__subtitle' }, p.subtitle) : null);
  }
  function cmpTabs(p, own, others, cur, onPick) {
    if (others.length < 2) return null;
    return h('div', { key: 'pick', className: 'q-cmp__pick' },
      h('span', { className: 'q-cmp__picklabel' }, p.compareLabel || ('Compare ' + own.name + ' With')),
      h(Tabs, { items: others.map(function (c) { return { id: c.id, label: c.name }; }), value: others[cur].id, onChange: onPick, label: 'Competitor to compare with ' + own.name }));
  }

  /* FeatureMatrix — a yes/no comparison: the first column (Qualys) is highlighted, competitors sit beside it, features are grouped in drawers with a "Supported" count.
     Narrower than 768px it compares Qualys with one competitor at a time (tabs) and can show only the rows that differ. */
  function FeatureMatrix(p) {
    var ref = React.useRef(null), mobile = useNarrow(ref, 768, p.layout);
    var cols = cmpColumns(p.columns), own = cols[0] || { id: '0', name: '' }, others = cols.slice(1);
    var cs = React.useState(p.defaultCompare != null ? String(p.defaultCompare) : null), comp = p.compare !== undefined ? String(p.compare) : cs[0];
    var ds = React.useState(!!p.defaultDiffOnly), diff = ds[0], red = p.noMark === 'red';
    var cur = 0;
    others.forEach(function (c, i) { if (c.id === comp) cur = i; });
    var shown = mobile ? (others.length ? [0, cur + 1] : [0]) : cols.map(function (c, i) { return i; });
    var grid = mobile ? undefined : { gridTemplateColumns: 'minmax(0, 2.2fr) repeat(' + cols.length + ', minmax(0, 1fr))' };
    var level = (p.titleLevel || 2) + 1;
    function total(n, m) { return p.formatTotal ? p.formatTotal(n, m) : n + ' of ' + m; }
    function section(s, k) {
      var all = (s.rows || []).map(function (r) { return Array.isArray(r) ? { label: r[0], values: r.slice(1) } : r; });
      var rows = mobile && diff && others.length ? all.filter(function (r) { return !!r.values[0] !== !!r.values[cur + 1]; }) : all;
      return h(Drawer, { key: k, title: s.title, defaultOpen: !!s.open, headingLevel: level },
        h('div', { className: 'q-cmp__rows', role: 'table', 'aria-label': typeof s.title === 'string' ? s.title : undefined },
          rows.map(function (r, i) {
            return h('div', { key: i, className: 'q-cmp__row', role: 'row', style: grid },
              h('div', { className: 'q-cmp__label', role: 'rowheader' }, r.label),
              shown.map(function (c) { return h('div', { key: c, className: 'q-cmp__cell', role: 'cell' }, cmpMark(!!r.values[c], cols[c].name, red)); }));
          }),
          !rows.length ? h('div', { className: 'q-cmp__none' }, p.noDiffLabel || 'No differences in this section.') : null,
          p.totals === false ? null : h('div', { className: 'q-cmp__row q-cmp__row--total', role: 'row', style: grid },
            h('div', { className: 'q-cmp__label', role: 'rowheader' }, p.totalLabel || 'Supported'),
            shown.map(function (c) {
              return h('div', { key: c, className: 'q-cmp__cell', role: 'cell' },
                h('span', { className: 'q-sr' }, cols[c].name + ': '), total(all.filter(function (r) { return !!r.values[c]; }).length, all.length));
            }))));
    }
    var table = h('div', { key: 'table', className: 'q-cmp__table', style: mobile ? undefined : { minWidth: (280 + cols.length * 128) + 'px' } },
      h('div', { className: 'q-cmp__hl', 'aria-hidden': 'true', style: mobile ? undefined : { left: 'calc(100% * 2.2 / ' + (2.2 + cols.length) + ' + 6px)', width: 'calc(100% / ' + (2.2 + cols.length) + ' - 12px)' } }),
      h('div', { className: 'q-cmp__head', style: grid },
        mobile ? h('div') : cmpHeading(p),
        shown.map(function (i) {
          var c = cols[i];
          return h('div', { key: c.id, className: 'q-cmp__col' }, cmpLogo(c, mobile ? (i ? 24 : 22) : 28), !mobile && c.subtitle ? h('p', { className: 'q-cmp__colsub' }, c.subtitle) : null);
        })),
      (p.sections || []).map(section));
    return h('section', { ref: ref, className: cx('q-section', 'q-cmp', 'q-cmp--matrix', mobile && 'q-cmp--mobile', p.className), id: p.id },
      h('div', { className: 'q-section__inner' }, mobile ? [
        cmpHeading(p, 'heading'),
        cmpTabs(p, own, others, cur, function (id) { cs[1](id); if (p.onCompareChange) p.onCompareChange(id); }),
        others.length ? h('div', { key: 'diff', className: 'q-cmp__diff' }, h(Toggle, { label: p.diffLabel || 'Show Differences Only', checked: diff, onChange: function (e) { ds[1](e.target.checked); } })) : null,
        table
      ] : h('div', { className: 'q-cmp__card' }, h('div', { className: 'q-cmp__scroll' }, table))));
  }

  /* DetailComparison — a written comparison: Qualys beside up to three competitors picked with filter chips; each topic is a drawer with one short text per vendor.
     Narrower than 768px one competitor shows at a time (tabs) and the two texts stack as cards. */
  function DetailComparison(p) {
    var ref = React.useRef(null), mobile = useNarrow(ref, 768, p.layout);
    var cols = cmpColumns(p.columns), own = cols[0] || { id: '0', name: '' }, others = cols.slice(1), max = p.max || 3;
    var ps = React.useState(function () { return (p.defaultPicked || others.slice(0, 2).map(function (c) { return c.id; })).map(String); });
    var picked = (p.picked !== undefined ? p.picked.map(String) : ps[0]).filter(function (id) { return others.some(function (c) { return c.id === id; }); });
    var cs = React.useState(null), comp = cs[0] != null ? cs[0] : (picked[0] || (others[0] && others[0].id));
    var cur = 0;
    others.forEach(function (c, i) { if (c.id === comp) cur = i; });
    /* One competitor at least, `max` at most. */
    function setPicked(next) { if (next.length < 1 || next.length > max) return; if (p.picked === undefined) ps[1](next); if (p.onChange) p.onChange(next); }
    var shown = mobile ? others.slice(cur, cur + 1) : others.filter(function (c) { return picked.indexOf(c.id) >= 0; });
    var full = picked.length >= max, level = (p.titleLevel || 2) + 1;
    var grid = mobile ? undefined : { gridTemplateColumns: 'repeat(' + (shown.length + 1) + ', minmax(0, 1fr))' };
    function cellOf(s, c) {
      var v = (s.copy || {})[c.id];
      v = v == null ? {} : (typeof v === 'string' || React.isValidElement(v) ? { body: v } : v);
      return { heading: v.heading != null ? v.heading : s.heading, body: v.body };
    }
    function section(s, k) {
      return h(Drawer, { key: k, title: s.title, defaultOpen: !!s.open, headingLevel: level },
        h('div', { className: 'q-cmp__cells', style: grid },
          [own].concat(shown).map(function (c, i) {
            var cell = cellOf(s, c);
            return h('div', { key: c.id, className: cx('q-cmp__detail', !i && 'q-cmp__detail--own') },
              mobile ? cmpLogo(c, i ? 24 : 22) : h('span', { className: 'q-sr' }, c.name),
              h('div', { className: 'q-cmp__detailtext' },
                cell.heading ? h('div', { className: 'q-cmp__cellhead' }, cell.heading) : null,
                cell.body ? h(typeof cell.body === 'string' ? 'p' : 'div', { className: 'q-cmp__cellbody' }, cell.body) : null));
          })));
    }
    var sections = (p.sections || []).map(section);
    var chips = others.length > 1 ? h('div', { className: 'q-cmp__pick' },
      h('div', { className: 'q-cmp__pickline' },
        h('span', { className: 'q-cmp__picklabel' }, p.compareLabel || ('Compare ' + own.name + ' With')),
        h('span', { className: 'q-cmp__pickhint' }, p.hintLabel || ('Choose up to ' + max))),
      h(FilterChipGroup, { size: 'rg', label: 'Competitors to compare with ' + own.name, value: picked, onChange: setPicked,
        options: others.map(function (c) { return { value: c.id, label: c.name, disabled: full && picked.indexOf(c.id) < 0 }; }) })) : null;
    return h('section', { ref: ref, className: cx('q-section', 'q-cmp', 'q-cmp--detail', mobile && 'q-cmp--mobile', p.className), id: p.id },
      h('div', { className: 'q-section__inner' }, mobile ? [
        cmpHeading(p, 'heading'),
        cmpTabs(p, own, others, cur, function (id) { cs[1](id); }),
        h('div', { key: 'list', className: 'q-cmp__table' }, sections)
      ] : [
        /* The heading and the competitor chips sit above the card, on the page ground; the card holds only the table. */
        h('div', { key: 'top', className: 'q-cmp__top' }, cmpHeading(p), chips),
        h('div', { key: 'card', className: 'q-cmp__card' },
          h('div', { className: 'q-cmp__scroll' },
            h('div', { className: 'q-cmp__table', style: { minWidth: ((shown.length + 1) * 240) + 'px' } },
              h('div', { className: 'q-cmp__head', style: grid }, [own].concat(shown).map(function (c) {
                return h('div', { key: c.id, className: 'q-cmp__col' }, cmpLogo(c, 28), c.subtitle ? h('p', { className: 'q-cmp__colsub' }, c.subtitle) : null);
              })),
              sections)))
      ]));
  }

  /* MarketingTable — a branded comparison table as a page section: a header row on a photo, row headings with Feature Icons, and one featured column. */
  function MarketingTable(p) {
    var cols = p.columns || [], rows = p.rows || [], data = cols.slice(1);
    var img = p.image && typeof p.image === 'object' ? p.image : { src: p.image };
    var vars = { '--q-mtable-cols': data.length || 1 };
    if (img.size) vars['--q-mtable-photo-size'] = img.size;
    if (img.focus) vars['--q-mtable-photo-focus'] = img.focus;
    /* A column's name in words: its title, or what its logo says. Under 768px each cell carries it as a label. */
    function colName(c) { return c.title || (c.logo ? c.logoAlt || 'Qualys' : null); }
    return h('section', { className: cx('q-section', 'q-mtable', 'q-mtable--' + (p.tone === 'dark' ? 'dark' : 'blue'), p.className), id: p.id },
      h('div', { className: 'q-section__inner' },
        h('div', { className: 'q-mtable__card' },
          h('div', { className: 'q-mtable__table', role: 'table', 'aria-label': p.label, style: vars },
            h('div', { className: 'q-mtable__head', role: 'rowgroup' },
              img.src ? h('img', { className: 'q-mtable__photo', src: img.src, alt: '' }) : null,
              h('div', { className: 'q-mtable__row q-mtable__row--head', role: 'row' }, cols.map(function (c, i) {
                var logo = typeof c.logo === 'string' ? h('img', { src: c.logo, alt: c.logoAlt || 'Qualys' }) : c.logo;
                return h('div', { key: i, className: 'q-mtable__th', role: 'columnheader' },
                  logo ? h('div', { className: 'q-mtable__logo' }, logo) : h('div', { className: 'q-mtable__title' }, c.title),
                  c.subtitle ? h('div', { className: 'q-mtable__subtitle' }, c.subtitle) : null);
              }))),
            h('div', { className: 'q-mtable__body', role: 'rowgroup' }, rows.map(function (r, i) {
              var icon = typeof r.icon === 'string' ? h('img', { src: r.icon, alt: '' }) : r.icon;
              return h('div', { key: i, className: 'q-mtable__row', role: 'row' },
                h('div', { className: 'q-mtable__rowhead', role: 'rowheader' },
                  icon ? h('span', { className: 'q-mtable__icon', 'aria-hidden': 'true' }, icon) : null,
                  h('span', { className: 'q-mtable__rowtitle' }, r.title)),
                data.map(function (c, k) {
                  return h('div', { key: k, className: cx('q-mtable__cell', c.featured && 'is-featured'), role: 'cell' },
                    h('span', { className: 'q-mtable__label' }, colName(c), c.subtitle ? ' ' : null, c.subtitle),
                    h('span', { className: 'q-mtable__value' },
                      c.featured ? h('span', { className: 'q-mtable__check', 'aria-hidden': 'true' }, h(Icon, { name: 'check', size: 16 })) : null,
                      h('span', { className: 'q-mtable__text' }, (r.cells || [])[k])));
                }));
            }))))));
  }

  /* ── Overlays, dialogs and notifications (Figma: Modals, Popups, Tooltips) ── */
  var FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  /* Overlay — the backdrop behind a modal: 25% (light) or 50% (dark) black. */
  function Overlay(p) {
    return h('div', {
      className: cx('q-overlay', 'q-overlay--' + (p.tone === 'dark' ? 'dark' : 'light'), p.inline && 'q-overlay--inline', p.className),
      'aria-hidden': p.children ? undefined : 'true',
      onMouseDown: p.onClick ? function (e) { if (e.target === e.currentTarget) p.onClick(e); } : undefined
    }, p.children);
  }
  /* What every modal shares: scroll lock, first focus, focus kept inside, focus returned; Esc only when it may be dismissed. */
  function useModalFrame(p, canDismiss) {
    var ref = React.useRef(null), closeRef = React.useRef(null);
    closeRef.current = canDismiss && p.onClose ? p.onClose : null;
    useDialog(!!p.open && !p.inline, ref, closeRef, p.initialFocus || FOCUSABLE);
    return { ref: ref, close: function () { if (p.onClose) p.onClose(); } };
  }
  function modalFrame(p, f, o, panel) {
    if (!p.open && !p.inline) return null;
    var cls = cx('q-modal', 'q-modal--' + o.kind, o.sheet && 'q-modal--sheet', p.inline && 'q-modal--inline', p.className);
    if (p.inline) return h('div', { className: cls }, panel);
    var node = h('div', {
      className: cx(cls, 'q-overlay', 'q-overlay--' + (p.overlay === 'dark' ? 'dark' : 'light')),
      /* A press on the backdrop never takes focus out of the dialog; it closes the dialog only where that is allowed. */
      onMouseDown: function (e) { if (e.target !== e.currentTarget) return; e.preventDefault(); if (o.overlayCloses) f.close(); }
    }, panel);
    var RD = window.ReactDOM;
    return RD && RD.createPortal ? RD.createPortal(node, document.body) : node;
  }
  function modalPanel(p, f, id, cls, role, described) {
    return { ref: f.ref, className: cx('q-modal__panel', cls), role: p.inline ? 'group' : role, 'aria-modal': p.inline ? undefined : 'true', 'aria-labelledby': id + '-title', 'aria-describedby': described ? id + '-desc' : undefined };
  }
  function modalClose(p, f) {
    return h('button', { type: 'button', className: 'q-modal__close', 'aria-label': p.closeLabel || 'Close', onClick: f.close }, h(Icon, { name: 'cross', size: 24 }));
  }
  function statusDisc(tone, icon, cls, size) {
    return h('span', { className: cx('q-sdisc', 'q-sdisc--' + tone, cls), 'aria-hidden': 'true' }, h(Icon, { name: icon, size: size || 24 }));
  }
  /* Buttons from labels: [{ label, variant, onClick, href }] or ready-made nodes. */
  function modalActions(list, size) {
    if (!list) return null;
    if (!Array.isArray(list)) return list;
    return list.map(function (a, i) {
      if (React.isValidElement(a)) return React.cloneElement(a, { key: a.key != null ? a.key : i });
      return h(Button, { key: i, size: size, variant: a.variant || (i === list.length - 1 ? 'primary' : 'secondary'), href: a.href, onClick: a.onClick, disabled: a.disabled, type: a.type }, a.label);
    });
  }

  /* Modal — the base dialog: title, close, body and an optional footer of actions. size 'sm' 480 | 'md' 540 | 'lg' 600. */
  function Modal(p) {
    var id = useId(p.id), canClose = p.dismissible !== false, f = useModalFrame(p, canClose);
    var size = p.size === 'sm' || p.size === 'lg' ? p.size : 'md';
    var actions = modalActions(p.actions);
    var panel = h('div', modalPanel(p, f, id, 'q-modal__panel--' + size, 'dialog', false),
      h('div', { className: 'q-modal__head' },
        h('div', { className: 'q-modal__heading' },
          p.eyebrow ? h('div', { className: 'q-modal__eyebrow' }, p.eyebrow) : null,
          heading(p.titleLevel || 2, { className: 'q-modal__title', id: id + '-title' }, p.title),
          p.subtitle ? h('p', { className: 'q-modal__subtitle' }, p.subtitle) : null),
        canClose ? modalClose(p, f) : null),
      h('div', { className: 'q-modal__body' }, typeof p.children === 'string' ? h('p', null, p.children) : p.children),
      actions ? h('div', { className: 'q-modal__foot' }, actions) : null);
    return modalFrame(p, f, { kind: p.kind || 'base', overlayCloses: canClose && p.closeOnOverlay !== false }, panel);
  }
  /* FormModal — a lead-capture Form inside a modal: eyebrow, title and subtitle above the form. */
  function FormModal(p) {
    var form = p.form || {};
    return h(Modal, Object.assign(omit(p, ['form', 'children']), { size: p.size || 'lg', kind: 'form' }),
      React.isValidElement(form) ? form : h(Form, Object.assign({ variant: 'full', titleLevel: (p.titleLevel || 2) + 1 }, form)), p.children);
  }
  /* AlertDialog — a decision that must be answered: destructive, warning or info. Esc and the overlay do not close it. */
  var ALERT_ICONS = { destructive: 'alert-triangle', warning: 'alert-circle', info: 'alert-circle' };
  function AlertDialog(p) {
    var id = useId(p.id), f = useModalFrame(p, false);
    var tone = ALERT_ICONS[p.tone] ? p.tone : 'destructive';
    var actions = modalActions(p.actions) || [
      h(Button, { key: 'c', variant: 'secondary', onClick: p.onCancel || p.onClose }, p.cancelLabel || 'Cancel'),
      h(Button, { key: 'k', onClick: p.onConfirm }, p.confirmLabel || 'Confirm')];
    var panel = h('div', modalPanel(p, f, id, 'q-alert q-alert--' + tone, 'alertdialog', true),
      h('span', { className: 'q-alert__bar', 'aria-hidden': 'true' }),
      h('div', { className: 'q-alert__content' },
        statusDisc(tone === 'destructive' ? 'error' : tone, p.icon || ALERT_ICONS[tone]),
        heading(p.titleLevel || 2, { className: 'q-modal__title', id: id + '-title' }, p.title),
        h('p', { className: 'q-alert__message', id: id + '-desc' }, p.message || p.children)),
      h('div', { className: 'q-alert__foot' }, actions));
    return modalFrame(p, f, { kind: 'alert', overlayCloses: false }, panel);
  }
  /* SessionTimeout — a countdown before sign-out, then the signed-out notice. It needs a button press: no Esc, no overlay click. */
  function SessionTimeout(p) {
    /* Focus starts on the button that keeps the session, never on Log Out. */
    var id = useId(p.id), f = useModalFrame(Object.assign({}, p, { initialFocus: p.initialFocus || '.q-btn--primary' }), false);
    var expiredProp = p.state === 'expired';
    var ss = React.useState(p.defaultSeconds != null ? p.defaultSeconds : 300), own = ss[0];
    var running = !!p.open && !expiredProp && p.seconds === undefined;
    var cb = React.useRef(p.onExpire); cb.current = p.onExpire;
    React.useEffect(function () {
      if (!running) return undefined;
      ss[1](p.defaultSeconds != null ? p.defaultSeconds : 300);
      var t = setInterval(function () { ss[1](function (s) { if (s <= 1) { clearInterval(t); if (cb.current) cb.current(); return 0; } return s - 1; }); }, 1000);
      return function () { clearInterval(t); };
    }, [running]);
    var secs = Math.max(0, p.seconds !== undefined ? p.seconds : own);
    var expired = expiredProp || (p.state === undefined && secs === 0 && !p.inline);
    var clock = Math.floor(secs / 60) + ':' + ('0' + (secs % 60)).slice(-2);
    /* When the time runs out the buttons change, so focus moves to the one that is left. */
    React.useEffect(function () {
      if (!expired || !p.open || p.inline) return;
      var b = f.ref.current && f.ref.current.querySelector('.q-btn');
      if (b) b.focus();
    }, [expired]);
    var panel = h('div', modalPanel(p, f, id, 'q-notice q-notice--session', 'alertdialog', true),
      statusDisc(expired ? 'neutral' : 'warning', expired ? 'alert-triangle' : 'alert-circle', 'q-sdisc--md'),
      h('div', { className: 'q-notice__text' },
        heading(p.titleLevel || 2, { className: 'q-modal__title', id: id + '-title' }, expired ? (p.expiredTitle || 'Session Expired') : (p.title || 'Session Expiring Soon')),
        h('p', { className: 'q-notice__message', id: id + '-desc' }, expired
          ? (p.expiredMessage || 'Your session has expired due to inactivity. Please sign in again to continue.')
          : (p.message || 'Your session is about to expire due to inactivity. Any unsaved changes will be lost.'))),
      expired ? null : h('div', { className: 'q-notice__clock', role: 'timer', 'aria-label': p.clockLabel || 'Time left' }, clock),
      expired
        ? h('div', { className: 'q-notice__actions' }, h(Button, { onClick: p.onSignIn, href: p.signInHref }, p.signInLabel || 'Sign In Again'))
        : h('div', { className: 'q-notice__actions q-notice__actions--pair' },
            h(Button, { variant: 'secondary', onClick: p.onSignOut }, p.signOutLabel || 'Log Out'),
            h(Button, { onClick: p.onStay }, p.stayLabel || 'Stay Signed In')));
    return modalFrame(p, f, { kind: 'session', overlayCloses: false }, panel);
  }
  /* SuccessConfirmation — the "it worked" notice after an action: a green tick, a line of copy and one button. */
  function SuccessConfirmation(p) {
    var id = useId(p.id), f = useModalFrame(p, true), dl = p.type === 'download';
    var panel = h('div', modalPanel(p, f, id, 'q-notice q-notice--success', 'dialog', true),
      statusDisc('success', 'check', 'q-sdisc--lg', 32),
      h('div', { className: 'q-notice__text' },
        heading(p.titleLevel || 2, { className: 'q-modal__title', id: id + '-title' }, p.title || (dl ? 'Download Ready' : 'Success!')),
        h('p', { className: 'q-notice__message', id: id + '-desc' }, p.message || p.children || (dl
          ? 'Your download should begin automatically. If it doesn’t, use the button below.'
          : 'Your request has been submitted successfully.'))),
      h('div', { className: 'q-notice__actions' },
        h(Button, { href: p.href, download: dl && p.href ? (p.download === undefined ? true : p.download) : undefined, onClick: p.onAction || (p.href ? undefined : f.close) }, p.actionLabel || (dl ? 'Download Now' : 'Done'))));
    return modalFrame(p, f, { kind: 'notice', overlayCloses: true }, panel);
  }
  /* ExitIntent — a last offer as someone leaves: 'offer' (image beside the form) or 'content' (a resource, centred). One field, one button. */
  function ExitIntent(p) {
    var id = useId(p.id), f = useModalFrame(p, true), content = p.type === 'content';
    var field = Object.assign({ name: 'email', label: 'Work Email', type: 'email' }, p.field);
    var vs = React.useState(''), es = React.useState(null);
    function submit(e) {
      e.preventDefault();
      var v = vs[0].trim();
      var bad = !v ? (p.requiredMessage || 'This field is required') : (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? 'Enter a valid email address' : null);
      es[1](bad);
      if (!bad && p.onSubmit) p.onSubmit(v, e);
    }
    var icon = p.icon === undefined ? 'file' : p.icon;
    var panel = h('div', modalPanel(p, f, id, cx('q-exit', 'q-exit--' + (content ? 'content' : 'offer')), 'dialog', true),
      !content && p.image ? h('div', { className: 'q-exit__media' }, h('img', { src: p.image, alt: p.imageAlt || '' })) : null,
      h('form', { className: 'q-exit__main', noValidate: true, onSubmit: submit },
        h('div', { className: 'q-exit__top' }, modalClose(p, f)),
        content && icon ? h('span', { className: 'q-exit__tile', 'aria-hidden': 'true' }, iconNode(icon, 24)) : null,
        h('div', { className: 'q-notice__text' },
          heading(p.titleLevel || 2, { className: 'q-modal__title', id: id + '-title' }, p.title),
          p.subtitle ? h('p', { className: 'q-notice__message', id: id + '-desc' }, p.subtitle) : null),
        h(TextField, { name: field.name, label: field.label, type: field.type, autoComplete: field.autoComplete, value: vs[0], error: es[0], onChange: function (e) { vs[1](e.target.value); if (es[0]) es[1](null); } }),
        h('div', { className: 'q-exit__actions' },
          h(Button, { type: 'submit' }, p.submitLabel || (content ? 'Download Free' : 'Start Free Trial')),
          h(TextLink, { tone: 'neutral', arrow: !content, onClick: p.onDismiss || f.close, className: 'q-exit__dismiss' }, p.dismissLabel || 'No Thanks'))));
    return modalFrame(p, f, { kind: 'exit', overlayCloses: true }, panel);
  }
  /* DemoRequestWizard — a short form split into steps, ending on a confirmation. steps [{ title, description, fields, consent }]. */
  function DemoRequestWizard(p) {
    var id = useId(p.id), f = useModalFrame(p, true);
    var steps = p.steps || [], total = steps.length + 1;
    var ss = React.useState(p.defaultStep || 0), step = Math.min(p.step !== undefined ? p.step : ss[0], steps.length);
    var vs = React.useState({}), values = vs[0], es = React.useState({}), errors = es[0];
    var bodyRef = React.useRef(null), moved = React.useRef(false), wasOpen = React.useRef(!!p.open);
    var done = step >= steps.length, cur = done ? {} : steps[step], S = p.success || {};
    /* A new step starts at its first field (the confirmation at its button), so keyboard and screen reader users land on it. */
    React.useEffect(function () {
      if (!moved.current) { moved.current = true; return; }
      var b = bodyRef.current, el = b && (b.querySelector('input:not([type="hidden"]), button, select, textarea') || b.parentNode.querySelector('.q-wizard__foot .q-btn'));
      if (el) el.focus();
    }, [step]);
    /* Opened again after a finished request, it starts over. */
    React.useEffect(function () {
      if (p.open && !wasOpen.current && ss[0] >= steps.length && p.step === undefined) { ss[1](0); vs[1]({}); es[1]({}); moved.current = false; }
      wasOpen.current = !!p.open;
    }, [p.open]);
    function go(n) { if (p.step === undefined) ss[1](n); if (p.onStepChange) p.onStepChange(n); }
    function set(name, v) {
      vs[1](function (o) { var n = Object.assign({}, o); n[name] = v; return n; });
      if (errors[name]) es[1](function (o) { var n = Object.assign({}, o); delete n[name]; return n; });
    }
    function next(e) {
      e.preventDefault();
      var errs = {}, req = p.requiredMessage || 'This field is required';
      (cur.fields || []).forEach(function (fl) {
        var v = values[fl.name];
        if (fl.required && (v == null || String(v).trim() === '')) errs[fl.name] = req;
        else if (v && fl.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errs[fl.name] = 'Enter a valid email address';
      });
      es[1](errs);
      var bad = Object.keys(errs);
      if (bad.length) {
        var el = bodyRef.current && bodyRef.current.querySelector('[data-field="' + bad[0] + '"] input:not([type="hidden"]), [data-field="' + bad[0] + '"] button');
        if (el) el.focus();
        return;
      }
      if (step === steps.length - 1 && p.onSubmit && p.onSubmit(values) === false) return;
      go(step + 1);
    }
    var consent = cur.consent ? (typeof cur.consent === 'string' ? { label: cur.consent } : cur.consent) : null;
    var panel = h('div', modalPanel(p, f, id, 'q-wizard', 'dialog', false),
      h('div', { className: 'q-wizard__head' },
        heading(p.titleLevel || 2, { className: 'q-modal__title q-modal__title--lg', id: id + '-title' }, done ? (S.title || 'Request Submitted!') : cur.title),
        modalClose(p, f)),
      h('div', { className: 'q-wizard__steps' },
        done ? null : h('p', { className: 'q-wizard__info' }, (p.stepLabel ? p.stepLabel(step + 1, total) : 'Step ' + (step + 1) + ' of ' + total) + (cur.description ? ' — ' + cur.description : '')),
        h('div', { className: 'q-wizard__dots', role: 'img', 'aria-label': 'Step ' + (step + 1) + ' of ' + total }, steps.concat([0]).map(function (s, i) {
          return h('span', { key: i, className: cx('q-wizard__dot', i < step && 'is-done', i === step && 'is-current') });
        }))),
      h('form', { className: 'q-wizard__form', noValidate: true, onSubmit: done ? function (e) { e.preventDefault(); f.close(); } : next },
        done ? h('div', { className: 'q-wizard__body q-wizard__body--done', ref: bodyRef, role: 'status' },
            statusDisc('success', 'check', 'q-sdisc--lg', 32),
            h('p', { className: 'q-notice__message' }, S.message || 'Thank you for your interest in Qualys. A member of our team will contact you within 24 hours to schedule your personalized demo.'),
            S.note === false ? null : h('p', { className: 'q-wizard__note' }, S.note || 'Check your inbox for a confirmation email.'))
          : h('div', { className: 'q-wizard__body', ref: bodyRef },
            (cur.fields || []).map(function (fl) {
              var common = { id: id + '-' + fl.name, name: fl.name, label: fl.label, error: errors[fl.name], hint: fl.hint };
              return h('div', { key: fl.name, 'data-field': fl.name }, fl.type === 'select' || fl.options
                ? h(Select, Object.assign(common, { options: fl.options, value: values[fl.name] || null, onChange: function (v) { set(fl.name, v); } }))
                : h(TextField, Object.assign(common, { type: fl.type || 'text', required: fl.required, autoComplete: fl.autoComplete, value: values[fl.name] || '', onChange: function (e) { set(fl.name, e.target.value); } })));
            }),
            consent ? h(Checkbox, { size: 'sm', name: consent.name || 'optIn', checked: !!values[consent.name || 'optIn'], onChange: function (e) { set(consent.name || 'optIn', e.target.checked); }, label: consent.label }) : null),
        h('div', { className: cx('q-wizard__foot', done && 'q-wizard__foot--done') },
          !done && step > 0 ? h(Button, { variant: 'secondary', onClick: function () { go(step - 1); } }, p.backLabel || 'Back') : null,
          h(Button, { type: 'submit' }, done ? (S.actionLabel || 'Done') : (step === steps.length - 1 ? (p.submitLabel || 'Submit Request') : (p.nextLabel || 'Continue'))))));
    return modalFrame(p, f, { kind: 'wizard', overlayCloses: true }, panel);
  }

  /* Toast — a short message that appears over the page without taking focus. status 'success' | 'warning' | 'error' | 'info'. */
  var TOAST_ICONS = { success: 'check', warning: 'alert-circle', error: 'x-circle', info: 'alert-circle' };
  function Toast(p) {
    var status = TOAST_ICONS[p.status] ? p.status : 'info', urgent = status === 'error' || status === 'warning';
    return h('div', { className: cx('q-toast', 'q-toast--' + status, p.className), role: urgent ? 'alert' : 'status', 'aria-live': urgent ? 'assertive' : 'polite', onMouseEnter: p.onMouseEnter, onMouseLeave: p.onMouseLeave },
      h('span', { className: cx('q-sdisc', 'q-sdisc--' + status, 'q-sdisc--xs'), 'aria-hidden': 'true' }, h(Icon, { name: TOAST_ICONS[status], size: status === 'success' ? 'lg' : 'sm' })),
      h('div', { className: 'q-toast__message' }, p.message || p.children),
      p.onClose ? h('button', { type: 'button', className: 'q-toast__close', 'aria-label': p.closeLabel || 'Dismiss', onClick: p.onClose }, h(Icon, { name: 'cross', size: 16 })) : null);
  }
  var TOAST_MS = { success: 5000, info: 5000, warning: 8000, error: 0 };
  function ToastTimer(p) {
    var it = p.item, ms = it.duration != null ? it.duration : TOAST_MS[TOAST_ICONS[it.status] ? it.status : 'info'];
    var hs = React.useState(false), cb = React.useRef(p.onDismiss); cb.current = p.onDismiss;
    React.useEffect(function () {
      if (!ms || hs[0]) return undefined;
      var t = setTimeout(function () { if (cb.current) cb.current(it.id); }, ms);
      return function () { clearTimeout(t); };
    }, [ms, hs[0], it.id]);
    return h(Toast, { status: it.status, message: it.message, closeLabel: p.closeLabel, onClose: function () { if (cb.current) cb.current(it.id); }, onMouseEnter: function () { hs[1](true); }, onMouseLeave: function () { hs[1](false); } });
  }
  /* ToastStack — where toasts live: a corner of the screen, three at most, each leaving by itself after a few seconds. */
  function ToastStack(p) {
    var max = p.max || 3, items = (p.items || []).slice(-max);
    var pos = ['bottom-left', 'bottom-right', 'top-left', 'top-right'].indexOf(p.position) >= 0 ? p.position : 'bottom-left';
    var node = h('div', { className: cx('q-toasts', 'q-toasts--' + pos, p.inline && 'q-toasts--inline', p.className), role: 'region', 'aria-label': p.label || 'Notifications' },
      items.map(function (it) { return h(ToastTimer, { key: it.id, item: it, onDismiss: p.onDismiss, closeLabel: p.closeLabel }); }));
    var RD = window.ReactDOM;
    return p.inline || !(RD && RD.createPortal) ? node : RD.createPortal(node, document.body);
  }
  /* NotificationBar — one line across the top of the page: info, success, warning or promo. */
  var NBAR_ICONS = { info: 'alert-circle', success: 'check-circle', warning: 'alert-triangle', promo: 'party' };
  function NotificationBar(p) {
    var type = NBAR_ICONS[p.type] ? p.type : 'info';
    var link = p.link ? (typeof p.link === 'string' ? { label: p.link } : p.link) : null;
    return h('div', { className: cx('q-nbar', 'q-nbar--' + type, p.className), role: type === 'warning' ? 'alert' : 'status', id: p.id },
      h('div', { className: 'q-nbar__bar' },
        h('div', { className: 'q-nbar__inner' },
          h('span', { className: 'q-nbar__icon', 'aria-hidden': 'true' }, iconNode(p.icon || NBAR_ICONS[type], 16)),
          h('div', { className: 'q-nbar__text' },
            h('span', { className: 'q-nbar__message' }, p.message || p.children),
            link ? h(TextLink, { tone: 'blue', size: 'sm', arrow: true, href: link.href, onClick: link.onClick, className: 'q-nbar__link' }, link.label) : null)),
        p.onClose ? h('button', { type: 'button', className: 'q-nbar__close', 'aria-label': p.closeLabel || 'Dismiss', onClick: p.onClose }, h(Icon, { name: 'cross', size: 16 })) : null));
  }
  /* CookieBanner — consent: a compact bar along the bottom, or the expanded panel with a switch per category. */
  function CookieBanner(p) {
    var id = useId(p.id), expanded = p.variant === 'expanded';
    var cats = p.categories || [];
    var ps = React.useState(function () { var o = {}; cats.forEach(function (c) { o[c.id] = !!(c.required || c.defaultChecked); }); return o; }), prefs = ps[0];
    var f = useModalFrame({ open: expanded && p.open !== false, inline: p.inline }, false);
    var link = p.link ? (typeof p.link === 'string' ? { label: p.link } : p.link) : null;
    function all() { var o = {}; cats.forEach(function (c) { o[c.id] = true; }); if (p.onAccept) p.onAccept(o); }
    if (p.open === false && !p.inline) return null;
    if (!expanded) {
      return h('div', { className: cx('q-cookie', p.inline && 'q-cookie--inline', p.className), role: 'region', 'aria-label': p.label || 'Cookie consent', id: p.id },
        h('div', { className: 'q-cookie__inner' },
          h('span', { className: 'q-cookie__icon', 'aria-hidden': 'true' }, h(Icon, { name: 'cookie', size: 24 })),
          h('p', { className: 'q-cookie__message' }, p.message || 'We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.',
            link ? [' ', h('a', { key: 'l', className: 'q-cookie__link', href: link.href, onClick: link.onClick }, link.label)] : null),
          h('div', { className: 'q-cookie__actions' },
            p.onManage ? h(TextLink, { tone: 'blue', size: 'sm', onClick: p.onManage }, p.manageLabel || 'Manage Preferences') : null,
            h(Button, { size: 'sm', variant: 'secondary', onClick: p.onDecline }, p.declineLabel || 'Decline'),
            h(Button, { size: 'sm', onClick: all }, p.acceptLabel || 'Accept All'))));
    }
    var panel = h('div', modalPanel({ inline: p.inline }, f, id, 'q-cookiepanel', 'dialog', true),
      h('div', { className: 'q-cookiepanel__head' },
        heading(p.titleLevel || 2, { className: 'q-modal__title', id: id + '-title' }, p.title || 'Cookie Preferences'),
        h('p', { className: 'q-notice__message', id: id + '-desc' }, p.message || 'Manage your cookie preferences. Essential cookies cannot be disabled as they are required for basic site functionality.')),
      h('ul', { className: 'q-cookiepanel__list' }, cats.map(function (c) {
        return h('li', { key: c.id, className: 'q-cookiepanel__row' },
          h(Toggle, { checked: !!prefs[c.id], disabled: !!c.required, onChange: function (e) { var n = Object.assign({}, prefs); n[c.id] = e.target.checked; ps[1](n); },
            label: h('span', { className: 'q-cookiepanel__text' }, h('span', { className: 'q-cookiepanel__name' }, c.label), c.description ? h('span', { className: 'q-cookiepanel__desc' }, c.description) : null) }));
      })),
      h('div', { className: 'q-cookiepanel__foot' },
        h(Button, { size: 'sm', variant: 'secondary', onClick: function () { if (p.onSave) p.onSave(Object.assign({}, prefs)); } }, p.saveLabel || 'Save Preferences'),
        h(Button, { size: 'sm', onClick: all }, p.acceptLabel || 'Accept All')));
    return modalFrame({ open: true, inline: p.inline, overlay: p.overlay, className: p.className }, f, { kind: 'cookie', sheet: true, overlayCloses: false }, panel);
  }
  /* HoverCard — a small card that opens beside the thing it describes. A mouse opens it on hover; a click, a tap or Enter opens it and keeps it open.
     kind 'logo' (logo, badge, name, copy, one link) | 'profile' (avatar, full name, role, company logo, LinkedIn button, close icon). */
  /* One profile card can be pinned open at a time (opened with a click, a tap or the keyboard). While it is, the other headshots don't open theirs: close it first. */
  var profilePin = { id: null, subs: [] };
  function pinProfile(id, on) {
    if (on) profilePin.id = id; else if (profilePin.id === id) profilePin.id = null; else return;
    profilePin.subs.slice().forEach(function (f) { f(); });
  }
  function HoverCard(p) {
    var id = useId(p.id), kind = p.kind === 'profile' ? 'profile' : 'logo';
    var pinS = React.useState(0), pinned = kind === 'profile' && !p.inline ? profilePin.id : null;
    var blocked = !!pinned && pinned !== id;
    React.useEffect(function () {
      if (kind !== 'profile' || p.inline) return undefined;
      function f() { pinS[1](function (n) { return n + 1; }); }
      profilePin.subs.push(f);
      return function () { profilePin.subs = profilePin.subs.filter(function (g) { return g !== f; }); pinProfile(id, false); };
    }, []);
    var controlled = p.open !== undefined, os = React.useState(!!p.defaultOpen), open = controlled ? !!p.open : os[0];
    var wrapRef = React.useRef(null), cardRef = React.useRef(null), timer = React.useRef(null), how = React.useRef(null), openRef = React.useRef(open);
    var ps = React.useState(null), pos = ps[0];
    openRef.current = open;
    function set(v) {
      clearTimeout(timer.current);
      if (openRef.current === v) return;
      openRef.current = v;
      if (!v) { how.current = null; if (kind === 'profile') pinProfile(id, false); }
      if (!controlled) os[1](v);
      if (p.onOpenChange) p.onOpenChange(v);
    }
    function later(v, ms) { clearTimeout(timer.current); timer.current = setTimeout(function () { set(v); }, ms); }
    function trigger() { return wrapRef.current ? wrapRef.current.querySelector('[aria-haspopup]') : null; }
    function close(refocus) { set(false); if (refocus) { var t = trigger(); if (t) t.focus(); } }
    function place() {
      var t = wrapRef.current, c = cardRef.current;
      if (!t || !c) return;
      var r = t.getBoundingClientRect(), cw = c.offsetWidth, ch = c.offsetHeight, vw = document.documentElement.clientWidth, vh = window.innerHeight, gap = 8, m = 16;
      var side = p.position === 'top' ? 'top' : 'bottom';
      if (side === 'bottom' && r.bottom + gap + ch > vh - m && r.top - gap - ch >= m) side = 'top';
      else if (side === 'top' && r.top - gap - ch < m) side = 'bottom';
      var left = p.align === 'start' ? r.left : (p.align === 'end' ? r.right - cw : r.left + r.width / 2 - cw / 2);
      left = Math.max(m, Math.min(left, vw - m - cw));
      var top = side === 'top' ? r.top - gap - ch : r.bottom + gap;
      ps[1]({ left: Math.round(left + window.pageXOffset), top: Math.round(top + window.pageYOffset), side: side });
    }
    React.useLayoutEffect(function () {
      if (!open || p.inline) { if (pos) ps[1](null); return undefined; }
      place();
      window.addEventListener('resize', place);
      window.addEventListener('scroll', place, true);
      return function () { window.removeEventListener('resize', place); window.removeEventListener('scroll', place, true); };
    }, [open]);
    React.useEffect(function () {
      if (!open || p.inline) return undefined;
      function onKey(e) { if (e.key === 'Escape') { var c = cardRef.current, a = document.activeElement; close(!!(c && c.contains(a)) || a === trigger()); } }
      function onDown(e) { var w = wrapRef.current, c = cardRef.current; if ((w && w.contains(e.target)) || (c && c.contains(e.target))) return; if (kind === 'profile' && profilePin.id === id) return; set(false); }
      document.addEventListener('keydown', onKey);
      document.addEventListener('mousedown', onDown);
      document.addEventListener('touchstart', onDown);
      return function () { document.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onDown); document.removeEventListener('touchstart', onDown); };
    }, [open]);
    React.useEffect(function () { return function () { clearTimeout(timer.current); }; }, []);
    /* Opened from the keyboard, the focus moves into the card; Tab past its last control returns to the trigger. */
    React.useEffect(function () {
      if (!open || p.inline || how.current !== 'key' || !pos) return;
      var c = cardRef.current, f = c && c.querySelector(FOCUSABLE);
      if (f) f.focus(); else if (c) c.focus();
      how.current = 'click';
    }, [open, !!pos]);
    function onCardKey(e) {
      if (e.key !== 'Tab') return;
      var c = cardRef.current, f = c.querySelectorAll(FOCUSABLE), a = document.activeElement;
      if (!f.length || (!e.shiftKey && a === f[f.length - 1]) || (e.shiftKey && (a === f[0] || a === c))) { e.preventDefault(); close(true); }
    }
    function onClick(e) {
      if (profilePin.id && profilePin.id !== id && kind === 'profile') { e.preventDefault(); return; }
      if (openRef.current && how.current === 'hover') { how.current = 'click'; if (kind === 'profile') pinProfile(id, true); return; }
      if (openRef.current) { set(false); return; }
      how.current = e.detail === 0 ? 'key' : 'click';
      set(true);
      if (kind === 'profile') pinProfile(id, true);
    }
    function onEnter(e) { if (e.pointerType !== 'mouse') return; if (kind === 'profile' && profilePin.id && profilePin.id !== id) return; if (!openRef.current) { how.current = 'hover'; later(true, p.delay != null ? p.delay : 150); } else clearTimeout(timer.current); }
    function onLeave(e) { if (e.pointerType !== 'mouse') return; if (how.current === 'hover' || !openRef.current) later(false, 200); }

    var name = kind === 'profile' ? p.name : p.title;
    var closable = p.closable !== undefined ? !!p.closable : kind === 'profile';
    var link = p.link ? (typeof p.link === 'string' ? { href: p.link } : p.link) : null;
    var badge = p.badge ? (typeof p.badge === 'string' ? h('img', { src: p.badge, alt: p.badgeAlt || '' }) : p.badge) : null;
    var body = p.body != null ? p.body : p.description;
    /* Profile card: the link is the plain social icon (no container), on one line with the close icon at the top right. LinkedIn unless the link names another network. */
    var net = link && SOCIAL[link.network] ? link.network : 'linkedin';
    var social = kind === 'profile' && link && link.href ? h(SocialButton, { key: 's', size: 'sm', className: 'q-hcard__social', network: net, href: link.href, onClick: link.onClick,
      icon: link.icon,
      label: typeof link.label === 'string' ? link.label : (net === 'url' ? p.name + ': website' : p.name + ' on ' + SOCIAL[net]) }) : null;
    var closeBtn = !closable ? null : (p.inline ? h('span', { key: 'x', className: 'q-hcard__close', 'aria-hidden': 'true' }, h(Icon, { name: 'cross', size: 24 }))
      : h('button', { key: 'x', type: 'button', className: 'q-hcard__close', 'aria-label': p.closeLabel || 'Close', onClick: function () { close(true); } }, h(Icon, { name: 'cross', size: 24 })));
    /* Profile card (Figma "Profile Modal - Alternate"): headshot on the left; name, then role; a foot row with the company logo on the left and the LinkedIn button on the right; the close icon top right. */
    var orgLogo = kind === 'profile' && p.logo ? h('img', { className: 'q-hcard__org', src: p.logo, alt: p.logoAlt || (typeof p.company === 'string' ? p.company : '') }) : null;
    var content = kind === 'profile' ? [
      h('div', { key: 'w', className: 'q-hcard__who' },
        h(Avatar, { size: 'md', image: p.image }),
        h('div', { className: 'q-hcard__text' },
          h('div', { className: 'q-hcard__name', id: id + '-name' }, p.name),
          p.designation ? h('div', { className: 'q-hcard__role' }, p.designation) : null,
          p.company && !orgLogo ? h('div', { className: 'q-hcard__company' }, p.company) : null,
          orgLogo || social ? h('div', { className: 'q-hcard__foot' }, orgLogo || h('span'), social) : null),
        closeBtn)
    ] : [
      p.logo || badge ? h('div', { key: 't', className: 'q-hcard__top' },
        p.logo ? h('img', { className: 'q-hcard__logo', src: p.logo, alt: p.logoAlt || '' }) : h('span'),
        badge ? h('span', { className: 'q-hcard__badge' }, badge) : null) : null,
      p.title ? h('div', { key: 'n', className: 'q-hcard__name', id: id + '-name' }, p.title) : null,
      body ? h(typeof body === 'string' ? 'p' : 'div', { key: 'b', className: 'q-hcard__body' }, body) : null,
      link && link.href ? h(TextLink, { key: 'l', tone: 'neutral', arrow: true, href: link.href, onClick: link.onClick }, link.label || 'Learn More') : null
    ];
    function card(extra) {
      return h('div', Object.assign({ ref: cardRef, id: id, className: cx('q-hcard__card', 'q-hcard__card--' + kind, closable && 'has-close', p.cardClassName), 'aria-labelledby': name ? id + '-name' : undefined, 'aria-label': name ? undefined : p.label }, extra),
        kind === 'profile' ? null : closeBtn,
        content);
    }
    if (p.inline) return card({ className: cx('q-hcard__card', 'q-hcard__card--' + kind, 'q-hcard__card--inline', closable && 'has-close', p.className), role: 'group' });
    var child = p.children, tp = { 'aria-haspopup': 'dialog', 'aria-expanded': open ? 'true' : 'false', 'aria-controls': open ? id : undefined, 'aria-disabled': blocked ? 'true' : undefined };
    var isControl = React.isValidElement(child) && (child.type === 'button' || child.type === 'a' || child.type === Button || child.type === TextLink);
    if (isControl) {
      var own = child.props.onClick;
      child = React.cloneElement(child, Object.assign(tp, { onClick: function (e) { if (own) own(e); onClick(e); } }));
    } else {
      child = h('button', Object.assign(tp, { type: 'button', className: 'q-hcard__trigger', 'aria-label': p.triggerLabel || ((name || p.label || 'Details') + ': details'), onClick: onClick }), child);
    }
    var layer = null;
    if (open) {
      var node = card({ role: 'dialog', tabIndex: -1, 'data-side': pos ? pos.side : undefined, onKeyDown: onCardKey, onPointerEnter: function (e) { if (e.pointerType === 'mouse') clearTimeout(timer.current); }, onPointerLeave: onLeave,
        style: pos ? { left: pos.left + 'px', top: pos.top + 'px' } : { left: 0, top: 0, visibility: 'hidden' } });
      var RD = window.ReactDOM;
      layer = RD && RD.createPortal ? RD.createPortal(node, document.body) : node;
    }
    return h('span', { ref: wrapRef, className: cx('q-hcard', open && 'is-open', blocked && 'is-blocked', p.className), onPointerEnter: onEnter, onPointerLeave: onLeave }, child, layer);
  }

  /* FormBanner — a banner (a heading on the blue gradient, a tint or a photo, with optional artwork on the right) and the lead-capture Form attached under it.
     background 'gradient' (default) | 'light' | { src }; tone 'inverted' | 'blue' sets the heading colour. */
  function FormBanner(p) {
    var bg = p.background, src = bg && typeof bg === 'object' ? bg.src : null, form = p.form || {};
    var ground = src ? 'image' : (bg === 'light' ? 'light' : 'gradient');
    var tone = p.tone === 'blue' || p.tone === 'inverted' ? p.tone : (ground === 'light' ? 'blue' : 'inverted');
    return h('section', { className: cx('q-section', 'q-fbanner', p.className), id: p.id },
      h('div', { className: 'q-section__inner' },
        h('div', { className: 'q-fbanner__card' },
          h('div', { className: cx('q-fbanner__band', 'q-fbanner__band--' + ground, 'q-fbanner__band--' + tone), style: src ? { backgroundImage: 'url("' + src + '")' } : undefined },
            h('div', { className: 'q-fbanner__copy' },
              heading(p.titleLevel || 2, { className: 'q-fbanner__title' }, p.title),
              p.subtitle ? h('p', { className: 'q-fbanner__subtitle' }, p.subtitle) : null),
            p.image ? h('img', { className: 'q-fbanner__art', src: p.image, alt: p.imageAlt || '' }) : null),
          h('div', { className: 'q-fbanner__form' },
            React.isValidElement(form) ? form : h(Form, Object.assign({ variant: 'extended', titleLevel: (p.titleLevel || 2) + 1 }, form))))));
  }

  /* Tooltip — a short label for the thing it points at, on hover and on keyboard focus. position 'top' | 'bottom' | 'left' | 'right'; theme 'dark' | 'light'. */
  function Tooltip(p) {
    var id = useId(p.id), os = React.useState(false), timer = React.useRef(null);
    var open = p.open !== undefined ? !!p.open : os[0];
    var pos = ['bottom', 'left', 'right'].indexOf(p.position) >= 0 ? p.position : 'top';
    function show(wait) { clearTimeout(timer.current); if (wait) timer.current = setTimeout(function () { os[1](true); }, p.delay != null ? p.delay : 300); else os[1](true); }
    function hide() { clearTimeout(timer.current); os[1](false); }
    React.useEffect(function () { return function () { clearTimeout(timer.current); }; }, []);
    /* Escape puts it away wherever the focus is, so a tooltip opened by the pointer can be dismissed from the keyboard. */
    React.useEffect(function () {
      if (!os[0]) return undefined;
      function onKey(e) { if (e.key === 'Escape') hide(); }
      document.addEventListener('keydown', onKey);
      return function () { document.removeEventListener('keydown', onKey); };
    }, [os[0]]);
    var child = React.isValidElement(p.children)
      ? React.cloneElement(p.children, { 'aria-describedby': id })
      : h('span', { tabIndex: 0, 'aria-describedby': id, className: 'q-tip__text' }, p.children);
    return h('span', { className: cx('q-tip', p.className), onMouseEnter: function () { show(true); }, onMouseLeave: hide, onFocus: function () { show(false); }, onBlur: hide },
      child,
      h('span', { className: cx('q-tip__bubble', 'q-tip__bubble--' + pos, 'q-tip__bubble--' + (p.theme === 'light' ? 'light' : 'dark'), open && 'is-open'), role: 'tooltip', id: id }, p.label || p.content));
  }

  /* ── Event calendar (Figma: Calendar) ── */
  function calDate(v) {
    if (v instanceof Date) return new Date(v.getFullYear(), v.getMonth(), v.getDate());
    var m = typeof v === 'string' ? /^(\d{4})-(\d{1,2})(?:-(\d{1,2}))?/.exec(v) : null;
    return m ? new Date(+m[1], +m[2] - 1, m[3] ? +m[3] : 1) : null;
  }
  function calKey(d) { return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate(); }
  function calAdd(d, n) { return new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); }
  function calMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
  function calFormats(locale) {
    function f(o) { try { return new Intl.DateTimeFormat(locale, o); } catch (e) { return new Intl.DateTimeFormat('en-US', o); } }
    var wl = f({ weekday: 'long' }), ws = f({ weekday: 'short' }), wn = f({ weekday: 'narrow' }), ms = f({ month: 'short' }), my = f({ month: 'long', year: 'numeric' });
    function md(d) { return ms.format(d) + ' ' + d.getDate(); }
    return {
      month: function (d) { return my.format(d); },
      weekday: function (d) { return [wl.format(d), ws.format(d), wn.format(d)]; },
      /* "Tuesday Jan 14" */
      day: function (d) { return wl.format(d) + ' ' + md(d); },
      /* "Fri Jan 27, 2025" or "Mon Feb 4 – Wed Feb 6, 2025" */
      span: function (a, b) {
        function one(d) { return ws.format(d) + ' ' + md(d); }
        return (calKey(a) === calKey(b) ? one(a) : one(a) + ' – ' + one(b)) + ', ' + b.getFullYear();
      }
    };
  }
  function calEvents(list) {
    var out = [];
    (list || []).forEach(function (e, i) {
      var s = calDate(e.start || e.date);
      if (!s) return;
      var en = calDate(e.end) || s;
      if (en < s) en = s;
      var t = EVENT_TYPES[e.type] ? e.type : 'qualys';
      out.push({ key: e.id != null ? String(e.id) : 'e' + i, src: e, start: s, end: en, a: calKey(s), b: calKey(en), type: t, typeLabel: e.typeLabel || EVENT_TYPES[t][1] });
    });
    return out.sort(function (x, y) { return x.a - y.a || y.b - x.b; });
  }
  function calWeeks(month, weekStart) {
    var lead = (month.getDay() - weekStart + 7) % 7;
    var last = new Date(month.getFullYear(), month.getMonth() + 1, 0), weeks = [];
    for (var d = calAdd(month, -lead); d <= last; d = calAdd(d, 7)) {
      var w = [];
      for (var i = 0; i < 7; i++) w.push(calAdd(d, i));
      weeks.push(w);
    }
    return weeks;
  }
  var CAL_TYPES = ['qualys', 'industry', 'webinar', 'speaking', 'training'];
  var CAL_ICONS = { list: 'view-list', month: 'view-month', grid: 'view-grid' };
  var CAL_LABELS = {
    view: 'View', list: 'List view', month: 'Month view', grid: 'Grid view', prev: 'Previous month', next: 'Next month', current: 'Current Month',
    search: 'Search Events', type: 'Event Type', format: 'Format', reset: 'Reset Filters', filter: 'Filter', legend: 'Event types',
    action: 'Register', allDay: 'All day', loadMore: 'Load More', browse: 'Browse Events', empty: 'No events match your search or filters.', emptyMonth: 'No events this month.'
  };
  /* EventCalendar — the events calendar module: a search and filter bar over a month grid, a day-by-day list or a grid of cards.
     events [{ id, title, type, format, start, end, time, href, image, flag, speakers, action }]; view 'month' | 'list' | 'grid'. */
  function EventCalendar(p) {
    var id = useId(p.id), L = Object.assign({}, CAL_LABELS, p.labels);
    var hl = p.titleLevel || 2, size = p.pageSize || 9, weekStart = p.weekStart === 1 ? 1 : 0, dense = p.compact;
    var fmt = React.useMemo(function () { return calFormats(p.locale || 'en-US'); }, [p.locale]);
    var views = p.views && p.views.length ? p.views : ['list', 'month', 'grid'];
    var vs = React.useState(p.defaultView || 'month');
    var view = p.view !== undefined ? p.view : vs[0];
    if (views.indexOf(view) < 0) view = views[0];
    var today = calDate(p.today) || calDate(new Date());
    var mst = React.useState(function () { return calMonth(calDate(p.defaultMonth) || today); });
    var month = p.month !== undefined ? calMonth(calDate(p.month) || today) : mst[0];
    var qs = React.useState(''), query = qs[0];
    var fs = React.useState(p.defaultFilters || {}), fvalue = fs[0];
    var ns = React.useState(size), shown = ns[0];
    var ps = React.useState(null), pop = ps[0];
    var timer = React.useRef(null), touch = React.useRef(false), monthRef = React.useRef(null);

    function cancelClose() { if (timer.current) { clearTimeout(timer.current); timer.current = null; } }
    function closePop() { cancelClose(); ps[1](null); }
    function schedClose() { cancelClose(); timer.current = setTimeout(function () { ps[1](function (s) { return s && s.pinned ? s : null; }); }, 150); }
    function openPop(pk, ev, target, pinned) {
      cancelClose();
      var root = monthRef.current;
      if (!root || p.hoverCard === false) return;
      var r = target.getBoundingClientRect(), R = root.getBoundingClientRect();
      var w = Math.min(364, R.width - 16);
      var left = Math.max(8, Math.min(R.width - w - 8, r.left - R.left + r.width / 2 - w / 2));
      var up = window.innerHeight - r.bottom < 456 && r.top > 456;
      ps[1](function (s) {
        if (s && s.key === pk && s.pinned && !pinned) return s;
        return { key: pk, evKey: ev.key, pinned: !!pinned, left: left, width: w, top: up ? null : r.bottom - R.top + 8, bottom: up ? R.bottom - r.top + 8 : null };
      });
    }
    React.useEffect(function () { return cancelClose; }, []);
    React.useEffect(function () {
      if (!pop) return undefined;
      function onDown(e) { var t = e.target; if (t.closest && (t.closest('.q-cal__pop') || t.closest('.q-cal__event'))) return; closePop(); }
      function onKey(e) { if (e.key === 'Escape') closePop(); }
      document.addEventListener('pointerdown', onDown); document.addEventListener('keydown', onKey);
      return function () { document.removeEventListener('pointerdown', onDown); document.removeEventListener('keydown', onKey); };
    }, [!!pop]);

    function setView(v) { closePop(); ns[1](size); if (p.view === undefined) vs[1](v); if (p.onViewChange) p.onViewChange(v); }
    function setMonth(d) { d = calMonth(d); closePop(); if (p.month === undefined) mst[1](d); if (p.onMonthChange) p.onMonthChange(d); }
    function setFilters(v) { closePop(); ns[1](size); fs[1](v); if (p.onFilterChange) p.onFilterChange(v, query); }
    function setQuery(v) { closePop(); ns[1](size); qs[1](v); if (p.onFilterChange) p.onFilterChange(fvalue, v); }

    var all = React.useMemo(function () { return calEvents(p.events); }, [p.events]);
    var typeLabels = {};
    CAL_TYPES.forEach(function (t) { typeLabels[t] = (p.typeLabels && p.typeLabels[t]) || EVENT_TYPES[t][1]; });
    all.forEach(function (ev) { if (!ev.src.typeLabel) ev.typeLabel = typeLabels[ev.type]; });
    var filters = p.filters;
    if (!filters) {
      var formats = [];
      all.forEach(function (ev) { if (ev.src.format && formats.indexOf(ev.src.format) < 0) formats.push(ev.src.format); });
      filters = [
        { id: 'type', label: L.type, options: CAL_TYPES.filter(function (t) { return all.some(function (ev) { return ev.type === t; }); }).map(function (t) { return { value: t, label: typeLabels[t] }; }) },
        { id: 'format', label: L.format, options: formats }
      ].filter(function (f) { return f.options.length > 1; });
    }
    var q = query.trim().toLowerCase();
    var filtering = !!q || filters.some(function (f) { return (fvalue[f.id] || []).length; });
    var events = all.filter(function (ev) {
      if (q && String(ev.src.title || '').toLowerCase().indexOf(q) < 0 && ev.typeLabel.toLowerCase().indexOf(q) < 0) return false;
      return filters.every(function (f) {
        var sel = fvalue[f.id] || [];
        if (!sel.length) return true;
        var v = f.id === 'type' ? ev.type : ev.src[f.id];
        return (Array.isArray(v) ? v : [v]).some(function (x) { return sel.indexOf(x) >= 0; });
      });
    });

    function card(ev, extra) {
      var e = ev.src;
      return h(e.speakers && e.speakers.length ? WebinarCard : EventCard, Object.assign({
        title: e.title, category: ev.typeLabel, format: e.format, date: fmt.span(ev.start, ev.end) + (e.time ? ' • ' + e.time : ''),
        href: e.href, external: e.external, image: e.image, imageAlt: e.imageAlt, flag: e.flag, flagTone: e.flagTone, speakers: e.speakers, duration: e.duration, headingLevel: hl + 1
      }, extra));
    }
    function empty() { return h('p', { className: 'q-cal__empty', role: 'status' }, filtering ? L.empty : L.emptyMonth); }

    /* One event in the month grid: a link (or button) that also opens the event's card. */
    function bar(ev, wi, o) {
      var e = ev.src, el = e.href ? 'a' : 'button', pk = ev.key + ':' + wi;
      var props = {
        key: pk, style: o.style,
        className: cx('q-cal__event', 'q-cal__event--' + ev.type, o.multi && 'q-cal__event--multi', o.compact && 'q-cal__event--compact', o.pre && 'is-pre', o.post && 'is-post', pop && pop.key === pk && 'is-open'),
        'aria-label': [e.title, ev.typeLabel, e.format, fmt.span(ev.start, ev.end), e.time].filter(Boolean).join(', '),
        onMouseEnter: function (x) { openPop(pk, ev, x.currentTarget, false); }, onMouseLeave: schedClose,
        onFocus: function (x) { openPop(pk, ev, x.currentTarget, false); }, onBlur: schedClose,
        onPointerDown: function (x) { touch.current = x.pointerType === 'touch' || x.pointerType === 'pen'; },
        onClick: function (x) {
          if (touch.current && p.hoverCard !== false && !(pop && pop.key === pk && pop.pinned)) { x.preventDefault(); openPop(pk, ev, x.currentTarget, true); return; }
          if (p.onEventClick) p.onEventClick(e, x);
        }
      };
      if (el === 'a') { props.href = e.href; if (e.external) { props.target = '_blank'; props.rel = 'noopener'; } } else props.type = 'button';
      return h(el, props,
        o.multi ? h('span', { className: 'q-cal__emeta' }, ev.typeLabel + (e.format ? ' | ' + e.format : '')) : h('span', { className: 'q-cal__emeta' }, ev.typeLabel),
        !o.multi && e.format ? h('span', { className: 'q-cal__emeta' }, e.format) : null,
        h('span', { className: 'q-cal__etitle' }, e.title));
    }
    function weekRow(week, wi) {
      var a = calKey(week[0]), b = calKey(week[6]);
      var multi = [], single = [[], [], [], [], [], [], []], count = [0, 0, 0, 0, 0, 0, 0], lanes = [];
      events.forEach(function (ev) {
        if (ev.b < a || ev.a > b) return;
        var c0 = -1, c1 = -1, i, k;
        for (i = 0; i < 7; i++) { k = calKey(week[i]); if (k >= ev.a && k <= ev.b) { if (c0 < 0) c0 = i; c1 = i; } }
        if (c0 < 0) return;
        for (i = c0; i <= c1; i++) count[i]++;
        if (ev.b === ev.a) { single[c0].push(ev); return; }
        for (var l = 0; ; l++) {
          var row = lanes[l] || (lanes[l] = []), free = true;
          for (i = c0; i <= c1; i++) if (row[i]) free = false;
          if (free) { for (i = c0; i <= c1; i++) row[i] = true; break; }
        }
        multi.push({ ev: ev, c0: c0, c1: c1, lane: l, pre: ev.a < a, post: ev.b > b });
      });
      var M = lanes.length;
      return h('div', { key: wi, className: 'q-cal__week', style: { gridTemplateRows: 'var(--q-cal-top) ' + (M ? 'repeat(' + M + ', auto) ' : '') + '1fr' } },
        week.map(function (d, i) {
          return h('div', { key: 'd' + i, className: cx('q-cal__day', d.getMonth() !== month.getMonth() && 'is-out', calKey(d) === calKey(today) && 'is-today'), style: { gridColumn: i + 1 } },
            h('span', { className: 'q-cal__num' }, d.getDate()));
        }),
        multi.map(function (s) {
          return bar(s.ev, wi, { multi: true, pre: s.pre, post: s.post, compact: dense === true, style: { gridColumn: (s.c0 + 1) + ' / span ' + (s.c1 - s.c0 + 1), gridRow: s.lane + 2 } });
        }),
        single.map(function (list, i) {
          /* A day's own events start under the lowest bar that crosses that day. */
          var top = 0;
          for (var l = 0; l < M; l++) if (lanes[l][i]) top = l + 1;
          return list.length ? h('div', { key: 's' + i, className: 'q-cal__stack', style: { gridColumn: i + 1, gridRow: (top + 2) + ' / -1' } },
            list.map(function (ev) { return bar(ev, wi, { compact: dense === true || (dense !== false && count[i] > 1) }); })) : null;
        }));
    }
    function monthView() {
      var weeks = calWeeks(month, weekStart), pe = null;
      if (pop) events.forEach(function (ev) { if (ev.key === pop.evKey) pe = ev; });
      return h('div', { className: 'q-cal__month', ref: monthRef, role: 'group', 'aria-labelledby': id + '-title' },
        h('div', { className: 'q-cal__weekdays', 'aria-hidden': 'true' }, weeks[0].map(function (d, i) {
          var n = fmt.weekday(d);
          return h('span', { key: i, className: 'q-cal__weekday' },
            h('span', { className: 'q-cal__wd q-cal__wd--long' }, n[0]), h('span', { className: 'q-cal__wd q-cal__wd--short' }, n[1]), h('span', { className: 'q-cal__wd q-cal__wd--narrow' }, n[2]));
        })),
        weeks.map(weekRow),
        pe ? h('div', {
          className: 'q-cal__pop', style: { left: pop.left, width: pop.width, top: pop.top == null ? undefined : pop.top, bottom: pop.bottom == null ? undefined : pop.bottom },
          'aria-hidden': pop.pinned ? undefined : 'true', onMouseEnter: cancelClose, onMouseLeave: schedClose
        }, card(pe, { tabIndex: -1 })) : null);
    }
    function listView() {
      var a = calKey(month), b = calKey(new Date(month.getFullYear(), month.getMonth() + 1, 0));
      var groups = [], byKey = {};
      /* An event sits under every day it covers in this month, so a row never needs a date of its own. */
      events.forEach(function (ev) {
        if (ev.b < a || ev.a > b) return;
        for (var d = ev.a < a ? month : ev.start, k = calKey(d); k <= ev.b && k <= b; d = calAdd(d, 1), k = calKey(d)) {
          if (!byKey[k]) { byKey[k] = { date: d, items: [] }; groups.push(byKey[k]); }
          byKey[k].items.push(ev);
        }
      });
      if (!groups.length) return empty();
      groups.sort(function (x, y) { return x.date - y.date; });
      return h('div', { className: 'q-cal__list' }, groups.map(function (g) {
        return h('section', { key: calKey(g.date), className: 'q-cal__group' },
          heading(hl + 1, { className: 'q-cal__dayname' }, fmt.day(g.date)),
          h('ul', { className: 'q-cal__rows' }, g.items.map(function (ev) {
            var e = ev.src;
            var act = e.action === false ? null : Object.assign({ label: L.action, href: e.href }, typeof e.action === 'string' ? { label: e.action } : e.action);
            return h('li', { key: ev.key, className: 'q-cal__row' },
              h('span', { className: 'q-cal__time' }, e.time || L.allDay),
              h(EventType, { type: ev.type, className: 'q-cal__type' }, ev.typeLabel),
              h(e.href ? 'a' : 'span', { className: 'q-cal__rowtitle', href: e.href }, e.title),
              act ? h(Button, { className: 'q-cal__action', variant: act.variant || 'secondary', href: act.href, onClick: act.onClick, target: act.href && e.external ? '_blank' : undefined, rel: act.href && e.external ? 'noopener' : undefined, 'aria-label': act.label + ': ' + e.title }, act.label) : null);
          })));
      }));
    }
    function gridView() {
      if (!events.length) return empty();
      var list = events.slice();
      if (p.gridOrder !== 'asc') list.reverse();
      var tiles = list.map(function (ev) { return h('li', { key: ev.key, className: 'q-cal__tile' }, card(ev)); });
      if (p.promo) tiles.splice(Math.min(p.promoIndex != null ? p.promoIndex : 5, tiles.length), 0, h('li', { key: 'promo', className: 'q-cal__tile' }, h(InlinePromoCard, Object.assign({ color: 'dark', headingLevel: hl + 1 }, p.promo))));
      return h(React.Fragment, null,
        h('ul', { className: 'q-cal__grid' }, tiles.slice(0, shown)),
        tiles.length > shown ? h('div', { className: 'q-cal__more' }, h(Button, { variant: 'secondary', onClick: function () { ns[1](shown + size); } }, L.loadMore)) : null);
    }

    var isGrid = view === 'grid';
    function step(n) { return function () { setMonth(new Date(month.getFullYear(), month.getMonth() + n, 1)); }; }
    function current(cls) { return h('button', { type: 'button', className: cx('q-cal__today', cls), onClick: function () { setMonth(today); } }, L.current); }
    return h('section', { className: cx('q-section', 'q-cal', 'q-cal--' + view, p.className), id: p.id, 'aria-labelledby': id + '-title' },
      p.toolbar === false ? null : h('div', { className: 'q-cal__tools' }, h('div', { className: 'q-section__inner' },
        p.search === false ? null : h(SearchBar, { className: 'q-cal__search', placeholder: L.search, value: query, onChange: function (e) { setQuery(e.target.value); } }),
        filters.length ? h(FilterBar, { className: 'q-cal__filters q-cal__filters--desk', layout: 'desktop', filters: filters, value: fvalue, onChange: setFilters, resetLabel: L.reset }) : null,
        filters.length ? h(FilterBar, { className: 'q-cal__filters q-cal__filters--mob', layout: 'mobile', filters: filters, value: fvalue, onChange: setFilters, resetLabel: L.reset, mobileLabel: L.filter }) : null)),
      h('div', { className: 'q-cal__body' }, h('div', { className: 'q-section__inner' },
        h('div', { className: 'q-cal__head' },
          h('div', { className: 'q-cal__lead' },
            heading(hl, { className: 'q-cal__title', id: id + '-title', 'aria-live': 'polite' }, isGrid ? (p.title || L.browse) : fmt.month(month)),
            isGrid ? null : h('div', { className: 'q-cal__nav' },
              h('button', { type: 'button', className: 'q-cal__arrow q-cal__arrow--prev', 'aria-label': L.prev, onClick: step(-1) }, h(Icon, { name: 'chevron-left', size: 16 })),
              h('button', { type: 'button', className: 'q-cal__arrow q-cal__arrow--next', 'aria-label': L.next, onClick: step(1) }, h(Icon, { name: 'chevron-right', size: 16 }))),
            view === 'month' ? current() : null),
          views.length > 1 ? h('div', { className: 'q-cal__views' },
            h('span', { className: 'q-cal__viewlabel', id: id + '-view' }, L.view),
            h('div', { className: 'q-cal__toggle', role: 'group', 'aria-labelledby': id + '-view' }, views.map(function (v) {
              return h('button', { key: v, type: 'button', className: cx('q-cal__viewbtn', v === view && 'is-active'), 'aria-pressed': v === view ? 'true' : 'false', 'aria-label': L[v], title: L[v], onClick: function () { setView(v); } },
                h(Icon, { name: CAL_ICONS[v], size: 20 }));
            }))) : null),
        isGrid || p.legend === false ? null : h('ul', { className: cx('q-cal__legend', 'q-cal__legend--' + view), 'aria-label': L.legend }, CAL_TYPES.map(function (t) {
          /* Both views share one layout: a 24px mark (the icon, or the bar colour in a 24px slot) and the name, so the names stay put when the view changes. */
          return h('li', { key: t }, view === 'list' ? h(EventType, { type: t }, typeLabels[t])
            : h('span', { className: 'q-event q-event--' + t },
                h('span', { className: 'q-cal__swatch q-cal__swatch--' + t, 'aria-hidden': 'true' }),
                h('span', { className: 'q-event__label' }, typeLabels[t])));
        })),
        view === 'month' ? monthView() : view === 'list' ? listView() : gridView(),
        view === 'month' ? current('q-cal__today--below') : null)));
  }

  /* Footer */
  /* Footer — Charcoal footer with the shield in a raised notch: a lead block with a URL form and social links,
     link columns, and a centred legal line. */
  var FOOTER_NOTCH = 'M0 40C6.4 40 12.3 37 16.1 32L31.4 12C37 4.5 45.9 0 55.4 0H346.6C356.1 0 365 4.5 370.6 12L385.9 32C389.7 37 395.6 40 402 40Z';
  function Footer(p) {
    var cols = p.columns || [], social = p.social || [], legal = p.legal || [], form = p.form;
    var body = p.body || p.blurb;
    function submit(e) { if (form.onSubmit) { e.preventDefault(); form.onSubmit(e.target.elements[0].value, e); } }
    return h('footer', { className: cx('q-footer', p.className) },
      h('svg', { className: 'q-footer__notch', viewBox: '0 0 402 40', preserveAspectRatio: 'none', 'aria-hidden': 'true', focusable: 'false' }, h('path', { d: FOOTER_NOTCH, fill: 'currentColor' })),
      h('div', { className: 'q-footer__bg' }, h('div', { className: 'q-footer__inner' },
        p.logoSrc ? h(p.logoHref ? 'a' : 'div', { className: 'q-footer__logo', href: p.logoHref }, h('img', { src: p.logoSrc, alt: p.logoAlt || 'Qualys' })) : null,
        h('div', { className: 'q-footer__main' },
          h('div', { className: 'q-footer__lead' },
            p.heading ? heading(p.headingLevel || 2, { className: 'q-footer__heading' }, p.heading) : null,
            body ? h('p', { className: 'q-footer__body' }, body) : null,
            form ? h('form', { className: 'q-footer__form', action: form.action, method: form.method, onSubmit: submit },
              h('input', { className: 'q-footer__input', type: form.type || 'url', name: form.name || 'url', placeholder: form.placeholder, 'aria-label': form.label || form.placeholder, required: form.required }),
              h('button', { type: 'submit', className: 'q-footer__submit', 'aria-label': form.buttonLabel || 'Submit' }, h(Icon, { name: 'chevron-right', size: 16 }))) : null,
            social.length ? h('div', { className: 'q-footer__social' }, social.map(function (sc, i) {
              return SOCIAL[sc.network] || sc.icon
                ? h(SocialButton, { key: i, variant: 'plain', className: 'q-footer__socialbtn', network: sc.network, icon: sc.icon, href: sc.href || '#', label: sc.label })
                : h('a', { key: i, className: 'q-footer__socialbtn q-footer__socialbtn--text', href: sc.href || '#', 'aria-label': sc.label }, sc.glyph || String(sc.label || '').charAt(0));
            })) : null),
          cols.length ? h('nav', { className: 'q-footer__cols', 'aria-label': p.navLabel || 'Footer' }, cols.map(function (c, i) {
            return h('div', { key: i, className: 'q-footer__col' },
              h('div', { className: 'q-footer__coltitle' }, c.title),
              h('ul', { className: 'q-footer__links' }, (c.links || []).map(function (l, k) {
                var link = typeof l === 'string' ? { label: l } : l;
                return h('li', { key: k }, h('a', { className: 'q-footer__link', href: link.href || '#' }, link.label));
              })));
          })) : null),
        p.copyright || legal.length ? h('p', { className: 'q-footer__legal' }, p.copyright, legal.map(function (l, i) {
          var link = typeof l === 'string' ? { label: l } : l;
          return h(React.Fragment, { key: i }, ' ', h('a', { href: link.href || '#' }, link.label), '.');
        })) : null)));
  }

  window.Qualys = Object.assign(window.Qualys || {}, {
    Button: Button, TextLink: TextLink, Hyperlink: Hyperlink, Breadcrumbs: Breadcrumbs, SocialButton: SocialButton, Icon: Icon, Tag: Tag, FilterChip: FilterChip, Flag: Flag, Marker: Marker, EventType: EventType, Tabs: Tabs, Drawer: Drawer, DrawerCard: DrawerCard, Accordion: Accordion, Avatar: Avatar, ProfileCard: ProfileCard, ProfileModal: ProfileModal, ProfileGrid: ProfileGrid, TextField: TextField, Select: Select, FilterDropdown: FilterDropdown, FilterChipGroup: FilterChipGroup, AppliedFilters: AppliedFilters, FilterButton: FilterButton, FilterBar: FilterBar, FilterDrawer: FilterDrawer, SearchBar: SearchBar, Checkbox: Checkbox, Radio: Radio, Toggle: Toggle, Form: Form,
    Card: Card, IntegrationCard: IntegrationCard, EventCard: EventCard, WebinarCard: WebinarCard, ResourceCard: ResourceCard, BlogCard: BlogCard, InlinePromoCard: InlinePromoCard, StatCard: StatCard,
    Nav: Nav, NavBanner: NavBanner, Media: Media, Hero: Hero, TypographicHeader: TypographicHeader, GeneralContent: GeneralContent, TabModule: TabModule, AccordionModule: AccordionModule, CtaModule: CtaModule, Stats: Stats, Carousel: Carousel, TestimonialCard: TestimonialCard, TestimonialCarousel: TestimonialCarousel, LogoCarousel: LogoCarousel, LogoHierarchy: LogoHierarchy, EventCalendar: EventCalendar, Footer: Footer,
    FeatureMatrix: FeatureMatrix, DetailComparison: DetailComparison, MarketingTable: MarketingTable, HoverCard: HoverCard, FormBanner: FormBanner,
    Overlay: Overlay, Modal: Modal, FormModal: FormModal, AlertDialog: AlertDialog, SessionTimeout: SessionTimeout, SuccessConfirmation: SuccessConfirmation, ExitIntent: ExitIntent, DemoRequestWizard: DemoRequestWizard, Toast: Toast, ToastStack: ToastStack, NotificationBar: NotificationBar, CookieBanner: CookieBanner, Tooltip: Tooltip
  });
})();
