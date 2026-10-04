/* ApexAuto storefront — vanilla JS, hash-routed, no build step. */
(() => {
  'use strict';

  // ---------- helpers ----------
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const money = (n) => 'Rs ' + Math.round(Number(n)).toLocaleString('en-US'); // PKR, whole rupees
  const r2 = (n) => Math.round(n * 100) / 100;
  const norm = (s) => String(s || '').toLowerCase().replace(/[^a-z0-9]/g, '');
  const icon = (id, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable: state stays in memory */ } },
  };

  const main = $('#main');

  // ---------- data guard (error state) ----------
  if (!Array.isArray(window.PRODUCTS) || !Array.isArray(window.VEHICLES)) {
    main.innerHTML = `<div class="wrap page"><div class="panel state" role="alert">
      <div class="state-icon">${icon('alert', 'icon-lg')}</div>
      <h2>The parts catalog didn't load</h2>
      <p>data.js is missing or failed to load, so there are no parts to show. Check that it sits next to index.html, then retry.</p>
      <div class="actions"><button class="btn btn-primary" onclick="location.reload()">Retry</button></div></div></div>`;
    return;
  }

  const { PRODUCTS, VEHICLES, CATEGORIES } = window;
  const byId = Object.fromEntries(PRODUCTS.map((p) => [p.id, p]));
  const catName = (id) => (CATEGORIES.find((c) => c.id === id) || {}).name || id;
  const PAGE = 9;
  const FREE_SHIP = 20000, STD_SHIP = 2500, NEXT_DAY = 7000, TAX = 0.0825; // PKR
  const PRICE_STEP = 1000;
  const PRICE_CEIL = Math.ceil(Math.max(...PRODUCTS.map((p) => p.price)) / 10000) * 10000;
  const YEARS = (() => { const lo = Math.min(...VEHICLES.map((v) => v.years[0])); const hi = Math.max(...VEHICLES.map((v) => v.years[1])); const out = []; for (let y = hi; y >= lo; y--) out.push(y); return out; })();
  const POS = { front: 'Front axle', rear: 'Rear axle', both: 'Front & rear', na: 'N/A' };
  const GRADE = { oem: 'Genuine / OEM', performance: 'Aftermarket' };

  // ---------- state ----------
  const defaultFilters = () => ({ q: '', cat: null, sale: false, subs: new Set(), brands: new Set(), grades: new Set(), positions: new Set(), fitMode: 'mine', min: 0, max: PRICE_CEIL, inStock: false, shipsToday: false, sort: 'best', page: 1 });

  const state = {
    vehicle: (() => { const v = store.get('apex.vehicle', null); return v && VEHICLES.some((x) => x.id === v.id) ? v : null; })(),
    cart: store.get('apex.cart', []).filter((l) => byId[l.id] && l.qty > 0).map((l) => ({ id: l.id, qty: Math.min(l.qty, byId[l.id].stock, 99) })).filter((l) => l.qty > 0),
    view: store.get('apex.view', 'grid') === 'list' ? 'list' : 'grid',
    compare: [],
    f: defaultFilters(),
    catalogKey: null,
    openFacets: new Set(['fit', 'sub', 'brand', 'grade', 'price', 'pos', 'avail']),
    dockEditing: false,
    draft: { year: '', make: '', model: '', id: '' },
    route: 'catalog',
  };

  // ---------- vehicle / fitment ----------
  const vehicle = () => (state.vehicle ? { ...VEHICLES.find((v) => v.id === state.vehicle.id), year: state.vehicle.year } : null);
  const vFull = (v) => `${v.year} ${v.make} ${v.model}`;
  const vShort = (v) => `${v.year} ${v.model}`;
  // A fit entry is "vehicle-id" or "vehicle-id@2016-2022" (model years from the source listing).
  function parseFit(f) {
    const [id, yrs] = f.split('@');
    const v = VEHICLES.find((x) => x.id === id);
    const [from, to] = yrs ? yrs.split('-').map(Number) : v ? v.years : [0, 0];
    return { id, v, from, to };
  }
  const fitEntries = (p) => p.fits.filter((f) => f !== 'universal').map(parseFit).filter((e) => e.v);
  function fitStatus(p) {
    if (p.fits.includes('universal')) return 'universal';
    if (!state.vehicle) return 'unknown';
    const { id, year } = state.vehicle;
    return fitEntries(p).some((e) => e.id === id && e.from <= year && year <= e.to) ? 'fit' : 'nofit';
  }
  const fitRank = { fit: 0, universal: 1, unknown: 1, nofit: 2 };

  // ---------- part drawings (blueprint style SVG) ----------
  const DIM = '#0284C7';
  const dimText = (x, y, t, rot) => `<text x="${x}" y="${y}" fill="${DIM}" stroke="none" font-family="JetBrains Mono, monospace" font-size="9" text-anchor="middle"${rot ? ` transform="rotate(-90 ${x} ${y})"` : ''}>${t}</text>`;
  const dimH = (x1, x2, y, t) => `<g stroke="${DIM}" stroke-width="1"><path d="M${x1} ${y}H${x2}M${x1} ${y - 4}v8M${x2} ${y - 4}v8"/></g>${dimText((x1 + x2) / 2, y - 4, t)}`;
  const dimV = (x, y1, y2, t) => `<g stroke="${DIM}" stroke-width="1"><path d="M${x} ${y1}V${y2}M${x - 4} ${y1}h8M${x - 4} ${y2}h8"/></g>${dimText(x - 5, (y1 + y2) / 2, t, true)}`;
  const polar = (cx, cy, r, deg) => [cx + r * Math.cos((deg * Math.PI) / 180), cy + r * Math.sin((deg * Math.PI) / 180)];
  const FILL = 'fill="currentColor" fill-opacity=".12"';

  const ART = {
    rotor(drilled = true) {
      let s = `<circle cx="100" cy="94" r="78"/><circle cx="100" cy="94" r="72" stroke-width="1" opacity=".45"/><circle cx="100" cy="94" r="36" ${FILL}/><circle cx="100" cy="94" r="12"/>`;
      for (let i = 0; i < 5; i++) { const [x, y] = polar(100, 94, 24, i * 72 - 90); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="4"/>`; }
      if (drilled) {
        [48, 58, 68].forEach((r, k) => { for (let j = 0; j < 18; j++) { const [x, y] = polar(100, 94, r, j * 20 + k * 6.7); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.3" fill="currentColor"/>`; } });
      } else {
        s += `<circle cx="100" cy="94" r="55" stroke-width=".8" opacity=".35"/><circle cx="100" cy="94" r="64" stroke-width=".8" opacity=".35"/>`;
      }
      return s + dimH(22, 178, 190, drilled ? 'Ø 300' : 'Ø 270');
    },
    'rotor-plain'() { return ART.rotor(false); },
    pads() {
      const pad = (dy) => `<g transform="translate(0 ${dy})"><path d="M28 30 L172 30 L166 68 Q100 84 34 68 Z"/><path d="M40 36 L160 36 L155 62 Q100 76 45 62 Z" ${FILL}/><path d="M100 38v32" stroke-width="1.2"/><circle cx="20" cy="38" r="6"/><circle cx="180" cy="38" r="6"/></g>`;
      return pad(10) + pad(78) + dimH(28, 172, 182, '156.2 mm');
    },
    lines() {
      let s = '';
      for (let i = 0; i < 4; i++) {
        const y = 42 + i * 34;
        s += `<path d="M34 ${y} C 74 ${y - 22}, 126 ${y + 22}, 160 ${y}" stroke-width="7" opacity=".18"/><path d="M34 ${y} C 74 ${y - 22}, 126 ${y + 22}, 160 ${y}" stroke-dasharray="3 3"/>`;
        s += `<circle cx="28" cy="${y}" r="7"/><circle cx="28" cy="${y}" r="2.5"/><rect x="160" y="${y - 6}" width="16" height="12" rx="1"/>`;
      }
      return s + dimH(28, 176, 190, '470 mm');
    },
    shock() {
      return `<circle cx="96" cy="22" r="8"/><rect x="92" y="30" width="8" height="42" ${FILL}/><rect x="78" y="72" width="36" height="96" rx="3"/><rect x="78" y="112" width="36" height="22" fill="currentColor" fill-opacity=".25"/><ellipse cx="96" cy="94" rx="30" ry="5"/><rect x="88" y="168" width="16" height="6"/><circle cx="96" cy="182" r="8"/><circle cx="96" cy="182" r="3"/>` + dimV(150, 14, 190, '512 mm');
    },
    spring() {
      let s = '';
      for (let i = 0; i < 8; i++) { const y = 30 + i * 17; s += `<path d="M144 ${y + 8.5} A44 9 0 0 0 56 ${y + 17}" stroke-width="1.4" opacity=".4"/><path d="M56 ${y} A44 9 0 0 0 144 ${y + 8.5}" stroke-width="3"/>`; }
      return s + dimV(172, 30, 166, 'FREE 286');
    },
    balljoint() {
      let s = `<rect x="48" y="118" width="104" height="10" rx="2"/><path d="M62 128 L138 128 L130 164 L70 164 Z" ${FILL}/><path d="M78 118 Q100 82 122 118"/><rect x="92" y="34" width="16" height="64"/><circle cx="100" cy="174" r="5"/>`;
      for (let y = 40; y <= 70; y += 5) s += `<path d="M92 ${y}l16 3" stroke-width="1"/>`;
      return s + `<rect x="84" y="76" width="32" height="12" rx="1"/>` + dimV(160, 34, 164, '118 mm');
    },
    plug() {
      let s = `<rect x="94" y="12" width="12" height="12" rx="2"/><rect x="86" y="24" width="28" height="66" rx="7" ${FILL}/>`;
      for (let y = 32; y <= 60; y += 7) s += `<path d="M86 ${y}h28" stroke-width="1"/>`;
      s += `<rect x="76" y="92" width="48" height="20"/><path d="M90 92v20M110 92v20" stroke-width="1"/><rect x="82" y="112" width="36" height="6"/><rect x="88" y="118" width="24" height="44"/>`;
      for (let y = 122; y <= 156; y += 5) s += `<path d="M88 ${y}l24 4" stroke-width="1"/>`;
      return s + `<path d="M100 162v6M110 162v12h-10"/>` + dimV(150, 118, 162, 'M12×1.25');
    },
    coil() {
      return `<rect x="84" y="12" width="32" height="22" rx="2"/><path d="M92 18h16" stroke-width="1"/><rect x="72" y="34" width="56" height="28" rx="3" ${FILL}/><rect x="90" y="62" width="20" height="92"/><rect x="86" y="154" width="28" height="26" rx="9" ${FILL}/><path d="M100 180v10"/>` + dimV(150, 12, 190, '186 mm');
    },
    belt() {
      const d = 'M56 30 L148 30 Q170 30 172 52 L180 134 Q184 172 150 172 L64 174 Q38 174 38 150 L32 60 Q30 30 56 30 Z';
      return `<path d="${d}" stroke-width="5" opacity=".9"/><path d="${d}" stroke="#fff" stroke-width="1" stroke-dasharray="2 4"/><circle cx="62" cy="62" r="26" ${FILL}/><circle cx="62" cy="62" r="6"/><circle cx="146" cy="58" r="20"/><circle cx="148" cy="140" r="28" ${FILL}/><circle cx="148" cy="140" r="8"/><circle cx="66" cy="148" r="22"/><circle cx="104" cy="104" r="11"/>`;
    },
    oilfilter() {
      let s = `<ellipse cx="100" cy="40" rx="46" ry="11"/><path d="M54 40V158M146 40V158"/><path d="M54 158 A46 11 0 0 0 146 158"/><ellipse cx="100" cy="40" rx="13" ry="3.5" ${FILL}/>`;
      for (let x = 60; x <= 140; x += 6) s += `<path d="M${x} 52V166" stroke-width="1" opacity=".45"/>`;
      return s + dimV(168, 29, 169, '128 mm');
    },
    airfilter() {
      const pts = [];
      for (let x = 36, k = 0; x <= 164; x += 8, k++) pts.push(`${x},${k % 2 ? 140 : 60}`);
      return `<rect x="28" y="52" width="144" height="96" rx="4" ${FILL}/><rect x="34" y="58" width="132" height="84" stroke-width="1"/><polyline points="${pts.join(' ')}" stroke-width="1.3"/>` + dimH(28, 172, 172, '269 mm');
    },
    fluid(label = '0W-20') {
      return `<path d="M58 62 L58 176 Q58 182 64 182 L150 182 Q156 182 156 176 L156 84 L130 54 L92 54 L92 62 Z"/><path d="M118 62 L138 62 Q146 62 146 70 L146 84 L132 84 L132 74 L118 74 Z" stroke-width="1.4"/><rect x="92" y="36" width="26" height="18" rx="2" ${FILL}/><rect x="68" y="100" width="78" height="56" ${FILL}/><text x="107" y="134" fill="currentColor" stroke="none" font-family="JetBrains Mono, monospace" font-size="${label.length > 6 ? 11 : 14}" font-weight="700" text-anchor="middle">${label}</text>`;
    },
    coolant() { return ART.fluid('COOLANT'); },
    shoe() {
      const s = (dy) => `<g transform="translate(0 ${dy})"><path d="M40 70 A62 62 0 0 1 160 70" stroke-width="10" opacity=".18"/><path d="M36 74 A66 66 0 0 1 164 74 L152 78 A54 54 0 0 0 48 78 Z" ${FILL}/><path d="M48 78 A54 54 0 0 1 152 78"/><circle cx="44" cy="82" r="4"/><circle cx="156" cy="82" r="4"/></g>`;
      return s(10) + s(80) + dimH(36, 164, 186, 'Ø 180');
    },
    radiator() {
      let s = `<rect x="32" y="50" width="136" height="110" ${FILL}/><rect x="18" y="42" width="14" height="126" rx="3"/><rect x="168" y="42" width="14" height="126" rx="3"/><path d="M25 42V26h22"/><path d="M175 168v14h-22"/><circle cx="175" cy="34" r="6"/>`;
      for (let x = 38; x <= 162; x += 6) s += `<path d="M${x} 52V158" stroke-width="1" opacity=".5"/>`;
      return s + dimH(18, 182, 190, '682 mm');
    },
    pump() {
      let s = `<circle cx="100" cy="100" r="56"/><circle cx="100" cy="100" r="16" ${FILL}/><circle cx="100" cy="100" r="5"/>`;
      for (let i = 0; i < 3; i++) { const [x, y] = polar(100, 100, 66, i * 120 - 90); s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="3"/>`; }
      for (let i = 0; i < 8; i++) { const [x1, y1] = polar(100, 100, 18, i * 45); const [x2, y2] = polar(100, 100, 44, i * 45 + 28); const [cx, cy] = polar(100, 100, 34, i * 45 + 2); s += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} Q${cx.toFixed(1)} ${cy.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke-width="1.6"/>`; }
      return s + `<rect x="150" y="92" width="36" height="16" rx="2"/>`;
    },
    thermostat() {
      let s = `<ellipse cx="100" cy="92" rx="62" ry="12" ${FILL}/><path d="M70 92 Q100 40 130 92" /><ellipse cx="100" cy="66" rx="28" ry="6"/>`;
      for (let i = 0; i < 5; i++) { const y = 104 + i * 8; s += `<path d="M78 ${y} A22 4 0 0 0 122 ${y + 4}" stroke-width="2"/>`; }
      return s + `<rect x="92" y="144" width="16" height="30" rx="3" ${FILL}/>` + dimH(38, 162, 188, 'Ø 54');
    },
    battery() {
      return `<rect x="30" y="62" width="140" height="106" rx="4"/><rect x="26" y="52" width="148" height="14" rx="2" ${FILL}/><rect x="46" y="38" width="20" height="14"/><rect x="134" y="38" width="20" height="14"/><path d="M50 82h12M56 76v12M138 82h12" stroke-width="2.4"/><rect x="46" y="100" width="108" height="44" ${FILL}/><text x="100" y="127" fill="currentColor" stroke="none" font-family="JetBrains Mono, monospace" font-size="12" font-weight="700" text-anchor="middle">AGM 850 CCA</text>` + dimH(30, 170, 186, '315 mm');
    },
    alternator() {
      let s = `<circle cx="100" cy="106" r="58"/><circle cx="100" cy="106" r="20" ${FILL}/><circle cx="100" cy="106" r="14"/><circle cx="100" cy="106" r="5"/><rect x="28" y="36" width="30" height="16" rx="3" transform="rotate(-35 43 44)"/><rect x="142" y="160" width="30" height="16" rx="3" transform="rotate(-35 157 168)"/>`;
      for (let i = 0; i < 16; i++) { const [x1, y1] = polar(100, 106, 30, i * 22.5); const [x2, y2] = polar(100, 106, 48, i * 22.5); s += `<path d="M${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}" stroke-width="2.4" opacity=".6"/>`; }
      return s;
    },
    sensor() {
      let s = `<rect x="12" y="28" width="24" height="22" rx="2" ${FILL}/><path d="M36 39 C 70 39, 70 92, 100 92" stroke-width="3"/><rect x="82" y="92" width="36" height="22"/><path d="M94 92v22M106 92v22" stroke-width="1"/><rect x="90" y="114" width="20" height="28"/>`;
      for (let y = 118; y <= 138; y += 5) s += `<path d="M90 ${y}l20 4" stroke-width="1"/>`;
      return s + `<rect x="93" y="142" width="14" height="24" rx="2" ${FILL}/><path d="M97 148v12M103 148v12" stroke-width="1"/>` + dimV(150, 114, 142, 'M18×1.5');
    },
    exhaust() {
      return `<path d="M14 64H66M14 136H40Q58 136 62 116L66 96" stroke-width="7" opacity=".2"/><path d="M14 64H66M14 136H40Q58 136 62 116L66 96"/><rect x="66" y="54" width="76" height="52" rx="26" ${FILL}/><path d="M80 80h48" stroke-width="1" stroke-dasharray="3 3"/><path d="M142 80H164" stroke-width="7" opacity=".2"/><path d="M142 80H164"/><rect x="162" y="70" width="26" height="20" rx="3"/>` + dimH(14, 188, 176, '3.0 in T-304');
    },
    gasket() {
      let s = `<path fill-rule="evenodd" d="M30 100a50 50 0 1 0 100 0a50 50 0 1 0 -100 0ZM52 100a28 28 0 1 0 56 0a28 28 0 1 0 -56 0Z" ${FILL}/><circle cx="80" cy="100" r="50"/><circle cx="80" cy="100" r="28"/>`;
      for (let k = 0; k < 2; k++) { const x = 152 + k * 22; s += `<path d="M${x} 40V64"/><rect x="${x - 6}" y="34" width="12" height="6"/>`; for (let i = 0; i < 6; i++) s += `<path d="M${x - 7} ${68 + i * 9} L${x + 7} ${73 + i * 9}" stroke-width="2"/>`; }
      return s;
    },
  };
  const art = (type) => `<svg viewBox="0 0 200 200" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${(ART[type] || ART.oilfilter)()}</svg>`;

  // ---------- small renderers ----------
  function starsHTML(p) {
    if (!p.rating) return ''; // catalog uses real listings; no rating data is shown unless sourced
    const pct = Math.max(0, Math.min(100, (p.rating / 5) * 100));
    const star = '<svg viewBox="0 0 24 24"><path d="M12 2.5l2.9 6.2 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.3 1.3-6.6L2.5 9.5l6.6-.8z" fill="currentColor"/></svg>';
    return `<div class="rating" role="img" aria-label="Rated ${p.rating} out of 5 from ${p.reviews.toLocaleString()} reviews">
      <span class="stars" aria-hidden="true"><span class="stars-off">${star.repeat(5)}</span><span class="stars-on" style="width:${pct}%">${star.repeat(5)}</span></span>
      <span class="spec-sm" aria-hidden="true"><b>${p.rating.toFixed(1)}</b></span><span class="spec-sm muted" aria-hidden="true">(${p.reviews.toLocaleString()})</span></div>`;
  }
  function stockHTML(p) {
    if (p.stock <= 0) return `<p class="stock out spec-sm"><span class="dot"></span>Out of stock</p>`;
    return `<p class="stock in spec-sm"><span class="dot"></span>Available to order</p>`;
  }
  function gradeBadge(p) {
    return p.grade === 'oem'
      ? `<span class="badge badge-oem spec-sm">${p.oem ? 'OEM #' + esc(p.oem) : 'Genuine / OEM'}</span>`
      : `<span class="badge badge-after spec-sm">Aftermarket</span>`;
  }
  const sourceLine = (p) => p.src
    ? `<p class="spec-sm muted source-line">${icon('info', 'icon-sm')}<span>Price as listed on <a class="link" href="${esc(p.src)}" target="_blank" rel="noopener">PakWheels</a>, checked ${esc(p.checked)}</span></p>` : '';
  function fitLine(p) {
    const v = vehicle();
    const s = fitStatus(p);
    if (s === 'fit') return `<p class="fitline fit spec-sm">${icon('check', 'icon-sm')}Fits your ${esc(vShort(v))}</p>`;
    if (s === 'nofit') return `<p class="fitline nofit spec-sm">${icon('x', 'icon-sm')}Doesn't fit your ${esc(vShort(v))}</p>`;
    if (s === 'universal') return `<p class="fitline universal spec-sm">${icon('info', 'icon-sm')}Universal fitment — check specs</p>`;
    return `<button type="button" class="fitline unknown spec-sm" data-act="garage">${icon('car', 'icon-sm')}Add your vehicle to confirm fit</button>`;
  }
  const savePct = (p) => Math.round((1 - p.price / p.was) * 100);

  function cardHTML(p) {
    const inCompare = state.compare.includes(p.id);
    return `<article class="card">
      <div class="card-media-col"><div class="media">${art(p.art)}</div></div>
      <div class="card-body">
        <div class="card-badges">${gradeBadge(p)}${p.was ? `<span class="badge badge-sale spec-sm">Save ${savePct(p)}%</span>` : ''}</div>
        <div class="media">${art(p.art)}<span class="media-tag spec-sm">${esc(p.sub)}</span></div>
        <div>
          <p class="brand-line label-caps">${esc(p.brand)}</p>
          <h3 class="card-title"><a href="#/p/${p.id}">${esc(p.title)}</a></h3>
          <p class="spec-sm muted">SKU ${esc(p.sku)}</p>
        </div>
        <dl class="specs spec-sm">${p.specs.slice(0, 3).map(([k, v]) => `<div><dt>${esc(k)}</dt><dd title="${esc(v)}">${esc(v)}</dd></div>`).join('')}</dl>
        ${starsHTML(p)}
        ${fitLine(p)}
      </div>
      <div class="card-foot">
        <div class="price-row"><span><span class="price">${money(p.price)}</span>${p.was ? `<span class="was">${money(p.was)}</span>` : ''}</span><span class="spec-sm muted">${esc(p.unit)}</span></div>
        ${stockHTML(p)}
        <div class="card-actions">
          ${p.stock > 0
            ? `<button class="btn btn-primary" type="button" data-act="add" data-id="${p.id}">${icon('cart')}Add to cart</button>`
            : `<button class="btn btn-outline" type="button" disabled>Out of stock</button>`}
          <button class="btn btn-outline btn-icon" type="button" data-act="compare" data-id="${p.id}" aria-pressed="${inCompare}" aria-label="Compare ${esc(p.title)}" title="Compare">${icon('compare')}</button>
        </div>
      </div>
    </article>`;
  }

  // ---------- catalog filtering ----------
  function matchesQuery(p, q) {
    if (!q) return true;
    const vehicles = fitEntries(p).map(({ v }) => `${v.make} ${v.model} ${v.engine}`).join(' ');
    const hay = `${p.title} ${p.brand} ${p.sub} ${catName(p.category)} ${vehicles} ${p.fits.includes('universal') ? 'universal' : ''}`.toLowerCase();
    const codes = `${norm(p.sku)} ${norm(p.oem)}`;
    return q.toLowerCase().split(/\s+/).filter(Boolean).every((t) => {
      if (hay.includes(t)) return true;
      if (t.length > 3 && t.endsWith('s') && hay.includes(t.slice(0, -1))) return true;
      const n = norm(t);
      return n.length >= 3 && codes.includes(n);
    });
  }
  function filtered(except) {
    const f = state.f;
    return PRODUCTS.filter((p) => {
      if (f.cat && p.category !== f.cat) return false;
      if (f.sale && !p.was) return false;
      if (!matchesQuery(p, f.q)) return false;
      if (except !== 'fit' && state.vehicle && f.fitMode === 'mine' && fitStatus(p) === 'nofit') return false;
      if (except !== 'sub' && f.subs.size && !f.subs.has(p.sub)) return false;
      if (except !== 'brand' && f.brands.size && !f.brands.has(p.brand)) return false;
      if (except !== 'grade' && f.grades.size && !f.grades.has(p.grade)) return false;
      if (except !== 'pos' && f.positions.size && !f.positions.has(p.position)) return false;
      if (except !== 'price' && (p.price < f.min || (f.max < PRICE_CEIL && p.price > f.max))) return false;
      if (except !== 'avail' && f.inStock && p.stock <= 0) return false;
      if (except !== 'avail' && f.shipsToday && !(p.shipsToday && p.stock > 0)) return false;
      return true;
    });
  }
  function sortList(list) {
    const by = {
      best: (a, b) => fitRank[fitStatus(a)] - fitRank[fitStatus(b)] || (b.stock > 0) - (a.stock > 0) || (a.grade === 'oem') - (b.grade === 'oem') || a.price - b.price,
      'price-asc': (a, b) => a.price - b.price,
      'price-desc': (a, b) => b.price - a.price,
      reviews: (a, b) => b.reviews - a.reviews,
      rating: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
    }[state.f.sort] || (() => 0);
    return [...list].sort(by);
  }
  const scope = () => PRODUCTS.filter((p) => (!state.f.cat || p.category === state.f.cat) && (!state.f.sale || p.was) && matchesQuery(p, state.f.q));
  const countBy = (list, key) => list.reduce((m, p) => ((m[p[key]] = (m[p[key]] || 0) + 1), m), {});

  function optHTML(ctx, f, value, label, count, checked) {
    return `<label class="opt${count ? '' : ' is-empty'}"><span><input type="checkbox" data-f="${f}" value="${esc(value)}" data-key="${ctx}:${f}:${esc(value)}"${checked ? ' checked' : ''}>${esc(label)}</span><span class="count spec-sm">(${count})</span></label>`;
  }
  function facet(id, title, body) {
    return `<details class="facet" data-facet="${id}"${state.openFacets.has(id) ? ' open' : ''}><summary><h3 class="label-caps">${title}</h3>${icon('chevron', 'icon-sm')}</summary><div class="facet-body">${body}</div></details>`;
  }
  function activeChips() {
    const f = state.f, chips = [];
    if (f.q) chips.push(['q', '', `“${f.q}”`]);
    f.subs.forEach((v) => chips.push(['sub', v, v]));
    f.brands.forEach((v) => chips.push(['brand', v, v]));
    f.grades.forEach((v) => chips.push(['grade', v, GRADE[v]]));
    f.positions.forEach((v) => chips.push(['pos', v, POS[v]]));
    if (f.min > 0 || f.max < PRICE_CEIL) chips.push(['price', '', `${money(f.min)}–${money(f.max)}${f.max >= PRICE_CEIL ? '+' : ''}`]);
    if (f.inStock) chips.push(['inStock', '', 'In stock']);
    if (f.shipsToday) chips.push(['shipsToday', '', 'Ships today']);
    if (state.vehicle && f.fitMode === 'all') chips.push(['fit', '', 'Incl. non-fitting parts']);
    return chips;
  }

  function filtersHTML(ctx) {
    const f = state.f, sc = scope();
    const chips = activeChips();
    const subsAll = [...new Set(sc.map((p) => p.sub))].sort();
    const subCounts = countBy(filtered('sub'), 'sub');
    const brandsAll = [...new Set(sc.map((p) => p.brand))].sort((a, b) => a.localeCompare(b));
    const brandCounts = countBy(filtered('brand'), 'brand');
    const gradeCounts = countBy(filtered('grade'), 'grade');
    const posAll = ['front', 'rear', 'both'].filter((k) => sc.some((p) => p.position === k));
    const posCounts = countBy(filtered('pos'), 'position');
    const v = vehicle();

    let fitFacet = '';
    if (v) {
      const fl = filtered('fit');
      const mine = fl.filter((p) => fitStatus(p) !== 'nofit').length;
      fitFacet = facet('fit', 'Fitment', `
        <label class="opt fit-opt${f.fitMode === 'mine' ? ' is-checked' : ''}"><span><input type="radio" name="fit-${ctx}" data-f="fit" value="mine" data-key="${ctx}:fit:mine"${f.fitMode === 'mine' ? ' checked' : ''}>Fits my ${esc(vShort(v))}</span><span class="count spec-sm">(${mine})</span></label>
        <label class="opt"><span><input type="radio" name="fit-${ctx}" data-f="fit" value="all" data-key="${ctx}:fit:all"${f.fitMode === 'all' ? ' checked' : ''}>All parts</span><span class="count spec-sm">(${fl.length})</span></label>`);
    }
    const lo = (f.min / PRICE_CEIL) * 100, hi = (f.max / PRICE_CEIL) * 100;

    return `<div class="filters">
      <div class="panel panel-pad">
        <div class="filters-head"><h2 class="label-caps">${icon('tune', 'icon-sm')}Filters</h2>${chips.length ? `<button class="link spec-sm" type="button" data-act="clear-filters">Clear all</button>` : ''}</div>
        ${chips.length
          ? `<div class="chips">${chips.map(([t, val, label]) => `<span class="chip spec-sm">${esc(label)}<button type="button" data-act="rm-chip" data-type="${t}" data-val="${esc(val)}" aria-label="Remove filter ${esc(label)}">${icon('x', 'icon-sm')}</button></span>`).join('')}</div>`
          : `<p class="spec-sm muted" style="margin-top:8px">No filters applied</p>`}
      </div>
      <div class="panel">
        ${fitFacet}
        ${subsAll.length > 1 ? facet('sub', 'Part type', subsAll.map((s) => optHTML(ctx, 'sub', s, s, subCounts[s] || 0, f.subs.has(s))).join('')) : ''}
        ${facet('brand', 'Brand', brandsAll.map((b) => optHTML(ctx, 'brand', b, b, brandCounts[b] || 0, f.brands.has(b))).join(''))}
        ${facet('grade', 'Part grade', Object.keys(GRADE).map((g) => optHTML(ctx, 'grade', g, GRADE[g], gradeCounts[g] || 0, f.grades.has(g))).join(''))}
        ${facet('price', 'Price', `
          <div class="range" data-range>
            <div class="range-rail"></div><div class="range-fill" style="left:${lo}%;right:${100 - hi}%"></div>
            <input type="range" min="0" max="${PRICE_CEIL}" step="${PRICE_STEP}" value="${f.min}" data-f="min" data-key="${ctx}:min" aria-label="Minimum price">
            <input type="range" min="0" max="${PRICE_CEIL}" step="${PRICE_STEP}" value="${f.max}" data-f="max" data-key="${ctx}:max" aria-label="Maximum price">
          </div>
          <div class="range-values spec-sm"><span data-out="min">${money(f.min)}</span><span data-out="max">${money(f.max)}${f.max >= PRICE_CEIL ? '+' : ''}</span></div>`)}
        ${posAll.length ? facet('pos', 'Axle position', posAll.map((k) => optHTML(ctx, 'pos', k, POS[k], posCounts[k] || 0, f.positions.has(k))).join('')) : ''}
      </div>
    </div>`;
  }

  function preserveFocus(fn) {
    const key = document.activeElement && document.activeElement.dataset ? document.activeElement.dataset.key : null;
    fn();
    if (key) { const el = document.querySelector(`[data-key="${CSS.escape(key)}"]`); if (el) el.focus({ preventScroll: true }); }
  }
  const announce = (msg) => { const el = $('#sr-status'); el.textContent = ''; setTimeout(() => (el.textContent = msg), 30); };

  function emptyHTML() {
    const f = state.f, v = vehicle();
    if (v && f.fitMode === 'mine') {
      f.fitMode = 'all';
      const others = filtered().length;
      f.fitMode = 'mine';
      if (others) {
        return `<div class="panel state"><div class="state-icon">${icon('car', 'icon-lg')}</div>
          <h2>Nothing here fits your ${esc(vShort(v))}</h2>
          <p>${others} part${others > 1 ? 's' : ''} match these filters, but none are listed for the ${esc(v.engine)}. Try another category, or view them anyway.</p>
          <div class="actions"><button class="btn btn-secondary" type="button" data-act="fit-all">Show ${others} non-fitting part${others > 1 ? 's' : ''}</button><button class="btn btn-outline" type="button" data-act="clear-filters">Clear filters</button></div></div>`;
      }
    }
    if (f.q) {
      return `<div class="panel state"><div class="state-icon">${icon('search', 'icon-lg')}</div>
        <h2>No parts match “${esc(f.q)}”</h2>
        <p>Check the spelling, search a part type like “rotor” or “spark plug”, or paste an OEM number (dashes are optional).</p>
        <div class="actions"><button class="btn btn-secondary" type="button" data-act="clear-search">Clear search</button>${CATEGORIES.slice(0, 3).map((c) => `<a class="btn btn-outline" href="#/c/${c.id}">${esc(c.name)}</a>`).join('')}</div></div>`;
    }
    return `<div class="panel state"><div class="state-icon">${icon('tune', 'icon-lg')}</div>
      <h2>No parts match these filters</h2><p>Loosen the price range or remove a brand to see more results.</p>
      <div class="actions"><button class="btn btn-secondary" type="button" data-act="clear-filters">Clear all filters</button></div></div>`;
  }

  // First, last, and current ±1, with "…" for gaps — keeps the pager narrow on phones.
  function pageList(cur, pages) {
    const keep = new Set([1, pages, cur - 1, cur, cur + 1].filter((n) => n >= 1 && n <= pages));
    const out = [];
    [...keep].sort((a, b) => a - b).forEach((n, i, arr) => { if (i && n - arr[i - 1] > 1) out.push('…'); out.push(n); });
    return out;
  }
  function renderCatalog() {
    const f = state.f, v = vehicle();
    const list = sortList(filtered());
    const total = list.length;
    const pages = Math.max(1, Math.ceil(total / PAGE));
    if (f.page > pages) f.page = pages;
    const slice = list.slice((f.page - 1) * PAGE, f.page * PAGE);
    const from = total ? (f.page - 1) * PAGE + 1 : 0, to = (f.page - 1) * PAGE + slice.length;
    const title = f.sale ? 'Clearance deals' : f.cat ? catName(f.cat) : f.q ? 'Search results' : 'All parts';
    const quick = Object.entries(countBy(filtered('sub'), 'sub')).sort((a, b) => b[1] - a[1]).slice(0, 5);
    const isVin = /^[a-hj-npr-z0-9]{17}$/i.test(f.q.trim());
    const nChips = activeChips().length;

    const pager = pages > 1 ? `<div class="panel panel-pad pager"><span class="muted">Showing <b>${from}–${to}</b> of <b>${total}</b></span><div class="pager-btns">
        <button type="button" data-act="page" data-page="${f.page - 1}" aria-label="Previous page"${f.page === 1 ? ' disabled' : ''}>${icon('left', 'icon-sm')}</button>
        ${pageList(f.page, pages).map((n) => n === '…' ? '<span class="pager-gap" aria-hidden="true">…</span>' : `<button type="button" data-act="page" data-page="${n}"${n === f.page ? ' aria-current="page"' : ''} aria-label="Page ${n}">${n}</button>`).join('')}
        <button type="button" data-act="page" data-page="${f.page + 1}" aria-label="Next page"${f.page === pages ? ' disabled' : ''}>${icon('right', 'icon-sm')}</button></div></div>` : '';

    preserveFocus(() => {
      main.innerHTML = `<div class="wrap page"><div class="catalog">
        <aside class="filters-col" aria-label="Filters">${filtersHTML('side')}</aside>
        <section class="results" aria-labelledby="results-title">
          <div class="panel panel-pad">
            <div class="toolbar">
              <div><h1 id="results-title">${esc(title)}</h1>
                <p class="muted">Showing <b>${from}–${to}</b> of <b>${total}</b> ${v && f.fitMode === 'mine' ? `parts for your <b>${esc(vFull(v))}</b>` : 'parts'}${f.q ? ` matching “${esc(f.q)}”` : ''}</p></div>
              <div class="toolbar-controls">
                <button class="btn btn-outline filter-toggle" type="button" data-act="open-filters" aria-controls="filter-drawer">${icon('tune')}Filters${nChips ? ` (${nChips})` : ''}</button>
                <label class="sr-only" for="sort">Sort by</label>
                <select id="sort" class="select" data-f="sort" data-key="sort">
                  ${[['best', 'Best fit'], ['price-asc', 'Price: low to high'], ['price-desc', 'Price: high to low']].map(([k, l]) => `<option value="${k}"${f.sort === k ? ' selected' : ''}>${l}</option>`).join('')}
                </select>
                <div class="seg" role="group" aria-label="Layout">
                  <button type="button" data-act="view" data-view="grid" aria-pressed="${state.view === 'grid'}" aria-label="Grid view" data-key="view:grid">${icon('grid')}</button>
                  <button type="button" data-act="view" data-view="list" aria-pressed="${state.view === 'list'}" aria-label="List view" data-key="view:list">${icon('list')}</button>
                </div>
              </div>
            </div>
            ${quick.length > 1 ? `<div class="quick"><span class="label-caps muted">Quick filter</span>${quick.map(([s, n]) => `<button type="button" data-act="quick" data-sub="${esc(s)}" aria-pressed="${f.subs.has(s)}" class="spec-sm" data-key="quick:${esc(s)}">${esc(s)} (${n})</button>`).join('')}</div>` : ''}
          </div>
          ${isVin ? `<p class="notice notice-warn spec-sm">${icon('barcode', 'icon-sm')}That looks like a VIN. VIN decoding isn't available yet — pick your year, make, model and engine above instead.</p>` : ''}
          ${slice.length ? `<div class="grid${state.view === 'list' ? ' is-list' : ''}">${slice.map(cardHTML).join('')}</div>${pager}` : emptyHTML()}
        </section></div></div>`;
      const db = $('#filter-drawer .drawer-body');
      const st = db.scrollTop; db.innerHTML = filtersHTML('drawer'); db.scrollTop = st;
      $('#filter-drawer-count').textContent = total;
    });

    const crumbs = [['#/', 'Home']];
    if (f.cat) crumbs.push([`#/c/${f.cat}`, catName(f.cat)]);
    else if (f.sale) crumbs.push(['#/deals', 'Clearance deals']);
    else crumbs.push([null, 'All parts']);
    setCrumbs(crumbs, v && f.fitMode === 'mine'
      ? `<span class="notice notice-fit spec-sm">${icon('shield', 'icon-sm')}Showing parts verified for your ${esc(vShort(v))}</span>`
      : !v ? `<button type="button" class="notice notice-warn spec-sm" data-act="garage">${icon('car', 'icon-sm')}Add your vehicle to filter by exact fit</button>` : '');
    announce(`${total} parts found`);
  }

  // ---------- product detail ----------
  let pdpQty = 1;
  function renderPDP(id) {
    const p = byId[id];
    if (!p) return renderNotFound('Part not found', `There's no part with the id “${esc(id)}”. It may have been removed from the catalog.`);
    pdpQty = 1;
    const v = vehicle(), s = fitStatus(p);
    const fits = fitEntries(p);
    const fitBox = {
      fit: () => `<div class="fit-box">${icon('shield', 'icon-lg')}<div><h3>Fits your ${esc(vFull(v))}</h3><p>Verified for the ${esc(v.engine)}. Covered by the fitment guarantee.</p></div></div>`,
      nofit: () => `<div class="fit-box nofit">${icon('alert', 'icon-lg')}<div><h3>Doesn't fit your ${esc(vFull(v))}</h3><p>This part is listed for ${fits.map(({ v: x, from, to }) => esc(`${x.make} ${x.model} ${x.engine} (${from}–${to})`)).join('; ')}.</p><p style="margin-top:8px"><a class="link" href="#/c/${p.category}">Find ${esc(catName(p.category).toLowerCase())} that fit</a></p></div></div>`,
      universal: () => `<div class="fit-box universal">${icon('info', 'icon-lg')}<div><h3>Universal fitment</h3><p>Not vehicle-specific. Check the specifications below against your application.</p></div></div>`,
      unknown: () => `<div class="fit-box unknown">${icon('car', 'icon-lg')}<div><h3>Will this fit?</h3><p>Add your vehicle and we'll confirm the fit before you buy.</p><p style="margin-top:8px"><button class="link" type="button" data-act="garage">Add my vehicle</button></p></div></div>`,
    }[s]();
    const related = sortList(PRODUCTS.filter((x) => x.id !== p.id && x.category === p.category)).slice(0, 3);
    const max = Math.min(p.stock, 99);

    main.innerHTML = `<div class="wrap page">
      <div class="pdp">
        <div class="pdp-media">
          <div class="media">${art(p.art)}<span class="media-tag spec-sm">FIG. 1 — ${esc(p.sub)}</span><span class="media-sku spec-sm">${esc(p.sku)}</span></div>
          <div class="dims">${p.specs.slice(0, 2).map(([k, val]) => `<span class="badge badge-after spec-sm">${esc(k)}: ${esc(val)}</span>`).join('')}</div>
        </div>
        <div class="pdp-info">
          <div class="card-badges" style="justify-content:flex-start">${gradeBadge(p)}${p.was ? `<span class="badge badge-sale spec-sm">Save ${savePct(p)}%</span>` : ''}</div>
          <div><p class="brand-line label-caps">${esc(p.brand)}</p><h1>${esc(p.title)}</h1></div>
          <div class="pdp-ids spec-sm"><span>SKU <b>${esc(p.sku)}</b></span>${p.oem ? `<span>OEM # <b class="oem-link">${esc(p.oem)}</b></span>` : ''}<span>Position <b>${POS[p.position]}</b></span></div>
          ${starsHTML(p)}
          ${fitBox}
          <div class="panel buy-box">
            <div class="price-row"><span><span class="price" style="font-size:28px">${money(p.price)}</span>${p.was ? `<span class="was">${money(p.was)}</span>` : ''}</span><span class="spec-sm muted">${esc(p.unit)}</span></div>
            ${p.core ? `<p class="spec-sm muted">+ ${money(p.core)} refundable core charge, returned when you send back the old part.</p>` : ''}
            ${stockHTML(p)}
            ${p.stock > 0 ? `
              <div class="buy-row">
                <div class="qty" role="group" aria-label="Quantity">
                  <button type="button" data-act="pdp-dec" aria-label="Decrease quantity" disabled>${icon('minus', 'icon-sm')}</button>
                  <input type="number" id="pdp-qty" value="1" min="1" max="${max}" inputmode="numeric" aria-label="Quantity">
                  <button type="button" data-act="pdp-inc" aria-label="Increase quantity"${max <= 1 ? ' disabled' : ''}>${icon('plus', 'icon-sm')}</button>
                </div>
                <button class="btn btn-primary btn-lg" type="button" data-act="pdp-add" data-id="${p.id}">${icon('cart')}Add to cart</button>
              </div>
              <button class="btn btn-secondary btn-lg btn-block" type="button" data-act="buy-now" data-id="${p.id}">Buy now</button>`
            : `<div class="notice notice-warn">${icon('info', 'icon-sm')}Out of stock. Check back soon, or compare similar parts below.</div>`}
            <p class="spec-sm muted" style="display:flex;gap:6px;align-items:center">${icon('truck', 'icon-sm')}Free standard shipping over ${money(FREE_SHIP)} · 60-day returns</p>
          </div>
          ${sourceLine(p)}
          <p>${esc(p.desc)}</p>
          <div class="panel"><div class="section-title"><h2 class="label-caps">Technical specifications</h2></div>
            <table class="spec-table spec"><tbody>${p.specs.map(([k, val]) => `<tr><th scope="row">${esc(k)}</th><td>${esc(val)}</td></tr>`).join('')}<tr><th scope="row">Part grade</th><td>${GRADE[p.grade]}</td></tr></tbody></table></div>
          <div class="panel"><div class="section-title"><h2 class="label-caps">Confirmed fitment</h2><span class="spec-sm muted">${p.fits.includes('universal') ? 'Universal' : `${fits.length} vehicle${fits.length === 1 ? '' : 's'}`}</span></div>
            ${fits.length ? `<ul class="compat-list spec-sm">${fits.map(({ id, v: x, from, to }) => `<li${state.vehicle && state.vehicle.id === id && from <= state.vehicle.year && state.vehicle.year <= to ? ' class="is-mine"' : ''}><span>${esc(`${x.make} ${x.model}`)} · ${esc(x.engine)}</span><span class="muted">${from}–${to}</span></li>`).join('')}</ul>`
              : `<p class="spec-sm muted" style="padding:12px 16px">Not tied to a specific vehicle.</p>`}</div>
        </div>
      </div>
      ${related.length ? `<section class="related" aria-labelledby="rel-title"><h2 id="rel-title">More ${esc(catName(p.category).toLowerCase())}</h2><div class="grid">${related.map(cardHTML).join('')}</div></section>` : ''}
    </div>`;
    setCrumbs([['#/', 'Home'], [`#/c/${p.category}`, catName(p.category)], [null, p.title]]);
    document.title = `${p.title} — ApexAuto Parts`;
  }
  function setPdpQty(n) {
    const input = $('#pdp-qty'); if (!input) return;
    const max = Number(input.max);
    pdpQty = Math.max(1, Math.min(max, Number.isFinite(n) ? Math.round(n) : 1));
    input.value = pdpQty;
    $('[data-act="pdp-dec"]').disabled = pdpQty <= 1;
    $('[data-act="pdp-inc"]').disabled = pdpQty >= max;
  }

  // ---------- cart ----------
  const saveCart = () => { store.set('apex.cart', state.cart); renderCart(); };
  function addToCart(id, qty = 1, quiet = false) {
    const p = byId[id]; if (!p || p.stock <= 0) return false;
    const line = state.cart.find((l) => l.id === id);
    const max = Math.min(p.stock, 99), cur = line ? line.qty : 0, next = Math.min(max, cur + qty);
    if (next === cur) { toast(`Only ${p.stock} in stock, and they're all in your cart`); return false; }
    if (line) line.qty = next; else state.cart.push({ id, qty: next });
    saveCart();
    if (!quiet) {
      toast(fitStatus(p) === 'nofit' ? `Added — note: this doesn't fit your ${vShort(vehicle())}` : `Added ${p.brand} ${p.sub.toLowerCase()} to cart`, { label: 'View cart', fn: () => openDrawer('cart-drawer') });
    }
    return true;
  }
  function totals(method = 'standard') {
    const items = state.cart.map((l) => ({ ...l, p: byId[l.id] })).filter((x) => x.p);
    const sub = r2(items.reduce((s, x) => s + x.p.price * x.qty, 0));
    const core = r2(items.reduce((s, x) => s + (x.p.core || 0) * x.qty, 0));
    const count = items.reduce((s, x) => s + x.qty, 0);
    const ship = !items.length ? 0 : method === 'nextday' ? NEXT_DAY : sub >= FREE_SHIP ? 0 : STD_SHIP;
    const tax = Math.round(sub * TAX);
    return { items, sub, core, count, ship, tax, total: r2(sub + core + ship + tax) };
  }
  function lineHTML(x, editable) {
    const p = x.p, s = fitStatus(p), max = Math.min(p.stock, 99);
    return `<li class="line">
      <a class="media" href="#/p/${p.id}" tabindex="-1" aria-hidden="true">${art(p.art)}</a>
      <div>
        <a class="line-title" href="#/p/${p.id}">${esc(p.title)}</a>
        <p class="spec-sm muted">${esc(p.sku)} · ${money(p.price)}${p.core ? ` + ${money(p.core)} core` : ''}</p>
        ${s === 'nofit' ? `<p class="spec-sm" style="color:var(--nofit-ink);margin-top:4px;display:flex;gap:4px;align-items:center">${icon('alert', 'icon-sm')}Doesn't fit your ${esc(vShort(vehicle()))}</p>` : ''}
        <div class="line-meta">
          ${editable ? `<div class="qty sm" role="group" aria-label="Quantity for ${esc(p.title)}">
              <button type="button" data-act="line-dec" data-id="${p.id}" aria-label="Decrease quantity" data-key="ld:${p.id}"${x.qty <= 1 ? ' disabled' : ''}>${icon('minus', 'icon-sm')}</button>
              <input type="number" value="${x.qty}" min="1" max="${max}" data-line="${p.id}" aria-label="Quantity" data-key="lq:${p.id}">
              <button type="button" data-act="line-inc" data-id="${p.id}" aria-label="Increase quantity" data-key="li:${p.id}"${x.qty >= max ? ' disabled' : ''}>${icon('plus', 'icon-sm')}</button>
            </div>
            <button class="icon-btn" type="button" data-act="line-rm" data-id="${p.id}" aria-label="Remove ${esc(p.title)}">${icon('trash')}</button>`
          : `<span class="spec-sm muted">Qty ${x.qty}</span>`}
          <span class="price" style="font-size:15px">${money(p.price * x.qty)}</span>
        </div>
      </div></li>`;
  }
  function renderCart() {
    const t = totals();
    $('#cart-btn').innerHTML = `<span class="cb-ico">${icon('cart', 'icon-lg')}${t.count ? `<span class="count-badge">${t.count}</span>` : ''}</span>
      <span class="cb-text" style="text-align:left"><span class="cb-label spec-sm" style="display:block">Cart (${t.count})</span><span class="cb-total">${money(t.sub)}</span></span>`;
    $('#cart-btn').setAttribute('aria-label', `Cart, ${t.count} item${t.count === 1 ? '' : 's'}, ${money(t.sub)}`);
    $('#cart-title').textContent = t.count ? `Your cart (${t.count})` : 'Your cart';

    if (!t.items.length) {
      const v = vehicle();
      $('#cart-body').innerHTML = `<div class="state"><div class="state-icon">${icon('cart', 'icon-lg')}</div><h2>Your cart is empty</h2>
        <p>${v ? `Browse parts verified for your ${esc(vFull(v))}.` : 'Set your vehicle first and we only show parts that fit.'}</p>
        <div class="actions"><a class="btn btn-primary" href="#/shop" data-act="close-drawers">Shop parts</a></div></div>`;
      $('#cart-foot').hidden = true;
      return;
    }
    $('#cart-foot').hidden = false;
    preserveFocus(() => { $('#cart-body').innerHTML = `<ul>${t.items.map((x) => lineHTML(x, true)).join('')}</ul>`; });
    const need = r2(FREE_SHIP - t.sub);
    $('#cart-foot').innerHTML = `
      <div><p class="spec-sm">${need > 0 ? `Add <b>${money(need)}</b> for free standard shipping` : 'Free standard shipping unlocked'}</p>
        <div class="ship-meter" aria-hidden="true"><span style="width:${Math.min(100, (t.sub / FREE_SHIP) * 100)}%"></span></div></div>
      <div class="totals">
        <div><span>Subtotal</span><span class="mono">${money(t.sub)}</span></div>
        ${t.core ? `<div><span>Refundable core charges</span><span class="mono">${money(t.core)}</span></div>` : ''}
        <div class="muted"><span>Shipping &amp; tax</span><span>At checkout</span></div>
      </div>
      <a class="btn btn-primary btn-lg btn-block" href="#/checkout">${icon('lock')}Checkout · ${money(r2(t.sub + t.core))}</a>
      <button class="btn btn-outline btn-block" type="button" data-act="close-drawers">Keep shopping</button>`;
  }
  function setLineQty(id, n) {
    const line = state.cart.find((l) => l.id === id); if (!line) return;
    const max = Math.min(byId[id].stock, 99);
    line.qty = Math.max(1, Math.min(max, Number.isFinite(n) ? Math.round(n) : 1));
    saveCart();
    if (state.route === 'checkout') renderSummary();
  }
  function removeLine(id) {
    const i = state.cart.findIndex((l) => l.id === id); if (i < 0) return;
    const [removed] = state.cart.splice(i, 1);
    saveCart();
    if (state.route === 'checkout') { if (!state.cart.length) renderCheckout(); else renderSummary(); }
    toast(`Removed ${byId[id].brand} ${byId[id].sub.toLowerCase()}`, { label: 'Undo', fn: () => { state.cart.splice(Math.min(i, state.cart.length), 0, removed); saveCart(); if (state.route === 'checkout') renderCheckout(); } });
  }

  // ---------- checkout ----------
  function luhn(v) {
    const d = v.replace(/\D/g, '');
    if (d.length < 13 || d.length > 19) return false;
    let sum = 0;
    for (let i = 0; i < d.length; i++) { let n = +d[d.length - 1 - i]; if (i % 2) { n *= 2; if (n > 9) n -= 9; } sum += n; }
    return sum % 10 === 0;
  }
  function expOk(v) {
    const m = v.trim().match(/^(\d{2})\s*\/\s*(\d{2})$/); if (!m) return false;
    const mo = +m[1], yr = 2000 + +m[2]; if (mo < 1 || mo > 12) return false;
    const now = new Date();
    return yr > now.getFullYear() || (yr === now.getFullYear() && mo >= now.getMonth() + 1);
  }
  const FIELDS = {
    email: { label: 'Email', test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Enter an email like name@example.com' },
    phone: { label: 'Phone', test: (v) => { const d = v.replace(/\D/g, ''); return d.length >= 10 && d.length <= 15; }, msg: 'Enter a 10-digit phone number for delivery updates' },
    first: { label: 'First name', test: (v) => v.trim().length > 0, msg: 'Enter your first name' },
    last: { label: 'Last name', test: (v) => v.trim().length > 0, msg: 'Enter your last name' },
    address: { label: 'Street address', test: (v) => v.trim().length >= 4, msg: 'Enter the street address' },
    apt: { label: 'Apt, suite (optional)', optional: true, test: () => true },
    city: { label: 'City', test: (v) => v.trim().length > 1, msg: 'Enter the city' },
    region: { label: 'State', test: (v) => /^[A-Za-z]{2}$/.test(v.trim()), msg: 'Use the 2-letter state code, e.g. MI' },
    zip: { label: 'ZIP code', test: (v) => /^\d{5}(-\d{4})?$/.test(v.trim()), msg: 'Enter a 5-digit ZIP code' },
    cardName: { label: 'Name on card', test: (v) => v.trim().length > 1, msg: 'Enter the name as printed on the card' },
    card: { label: 'Card number', test: luhn, msg: 'That card number isn’t valid — check the digits' },
    exp: { label: 'Expiry (MM/YY)', test: expOk, msg: 'Enter a future expiry date as MM/YY' },
    cvc: { label: 'CVC', test: (v) => /^\d{3,4}$/.test(v.trim()), msg: 'Enter the 3 or 4 digits on the back' },
  };
  const fieldHTML = (name, cls = '', attrs = '') => {
    const f = FIELDS[name];
    return `<div class="field ${cls}"><label for="co-${name}">${f.label}</label>
      <input class="input" id="co-${name}" name="${name}" ${attrs} aria-describedby="err-${name}"${f.optional ? '' : ' required'}>
      <p class="field-error" id="err-${name}" hidden></p></div>`;
  };
  let shipMethod = 'standard';
  const touched = new Set();

  function renderCheckout() {
    touched.clear();
    if (!state.cart.length) {
      main.innerHTML = `<div class="wrap page"><div class="panel state"><div class="state-icon">${icon('cart', 'icon-lg')}</div>
        <h2>Nothing to check out</h2><p>Your cart is empty. Add parts and come back here to place the order.</p>
        <div class="actions"><a class="btn btn-primary" href="#/shop">Shop parts</a></div></div></div>`;
      setCrumbs([['#/', 'Home'], [null, 'Checkout']]);
      return;
    }
    main.innerHTML = `<div class="wrap page"><h1 class="checkout-title">Checkout</h1>
      <div class="checkout">
        <form class="panel" id="co-form" novalidate>
          <div class="form-error-banner" id="co-banner" role="alert" hidden></div>
          <fieldset class="form-section"><legend><span class="step-num">1</span>Contact</legend>
            <div class="fields">${fieldHTML('email', 'half', 'type="email" autocomplete="email"')}${fieldHTML('phone', 'half', 'type="tel" autocomplete="tel"')}</div></fieldset>
          <fieldset class="form-section"><legend><span class="step-num">2</span>Shipping address</legend>
            <div class="fields">${fieldHTML('first', 'half', 'autocomplete="given-name"')}${fieldHTML('last', 'half', 'autocomplete="family-name"')}${fieldHTML('address', '', 'autocomplete="address-line1"')}${fieldHTML('apt', '', 'autocomplete="address-line2"')}${fieldHTML('city', 'third', 'autocomplete="address-level2"')}${fieldHTML('region', 'third', 'autocomplete="address-level1" maxlength="2" style="text-transform:uppercase"')}${fieldHTML('zip', 'third', 'autocomplete="postal-code" inputmode="numeric" maxlength="10"')}</div></fieldset>
          <fieldset class="form-section"><legend><span class="step-num">3</span>Delivery</legend>
            <div class="ship-opts" id="ship-opts"></div></fieldset>
          <fieldset class="form-section"><legend><span class="step-num">4</span>Payment</legend>
            <p class="notice notice-warn spec-sm" style="margin-bottom:14px">${icon('info', 'icon-sm')}Demo store: no payment is taken. Use test card 4242 4242 4242 4242 — never a real card.</p>
            <div class="fields">${fieldHTML('cardName', '', 'autocomplete="off"')}${fieldHTML('card', '', 'inputmode="numeric" autocomplete="off" maxlength="23" placeholder="4242 4242 4242 4242"')}${fieldHTML('exp', 'half', 'inputmode="numeric" autocomplete="off" maxlength="5" placeholder="MM/YY"')}${fieldHTML('cvc', 'half', 'inputmode="numeric" autocomplete="off" maxlength="4"')}</div></fieldset>
          <div class="form-section">
            <button class="btn btn-primary btn-lg btn-block" type="submit" id="co-submit"></button>
            <p class="spec-sm muted" style="margin-top:10px;text-align:center">Card details are never stored by this demo.</p>
          </div>
        </form>
        <aside class="panel summary" aria-labelledby="sum-title" id="co-summary"></aside>
      </div></div>`;
    renderSummary();
    setCrumbs([['#/', 'Home'], [null, 'Checkout']]);
  }
  function renderSummary() {
    const t = totals(shipMethod);
    const opts = $('#ship-opts');
    if (opts) {
      preserveFocus(() => {
        opts.innerHTML = [
          ['standard', 'Standard', '3–5 business days', t.sub >= FREE_SHIP ? 'Free' : money(STD_SHIP)],
          ['nextday', 'Next-day', 'Order by 3 pm for next business day', money(NEXT_DAY)],
        ].map(([k, n, d, price]) => `<label class="ship-opt"><span><input type="radio" name="ship" value="${k}"${shipMethod === k ? ' checked' : ''} data-ship data-key="ship:${k}"><span><b>${n}</b><span class="spec-sm muted" style="display:block">${d}</span></span></span><span class="mono">${price}</span></label>`).join('');
      });
    }
    const btn = $('#co-submit');
    if (btn && !btn.disabled) btn.innerHTML = `${icon('lock')}Place order · ${money(t.total)}`;
    const nofit = t.items.filter((x) => fitStatus(x.p) === 'nofit').length;
    const sum = $('#co-summary'); if (!sum) return;
    sum.innerHTML = `<div class="section-title"><h2 class="label-caps" id="sum-title">Order summary</h2><button class="link spec-sm" type="button" data-act="open-cart">Edit</button></div>
      <div style="padding:16px">
        ${nofit ? `<p class="notice notice-warn spec-sm" style="margin-bottom:12px">${icon('alert', 'icon-sm')}${nofit} item${nofit > 1 ? 's don’t' : ' doesn’t'} fit your ${esc(vShort(vehicle()))}</p>` : ''}
        <ul>${t.items.map((x) => lineHTML(x, false)).join('')}</ul>
        <div class="totals" style="margin-top:12px">
          <div><span>Subtotal (${t.count})</span><span class="mono">${money(t.sub)}</span></div>
          ${t.core ? `<div><span>Refundable core charges</span><span class="mono">${money(t.core)}</span></div>` : ''}
          <div><span>Shipping</span><span class="mono">${t.ship ? money(t.ship) : 'Free'}</span></div>
          <div><span>Est. tax (${(TAX * 100).toFixed(2)}%)</span><span class="mono">${money(t.tax)}</span></div>
          <div class="grand"><span>Total</span><span class="mono">${money(t.total)}</span></div>
        </div>
      </div>`;
  }
  function validateField(input) {
    const f = FIELDS[input.name]; if (!f) return true;
    const ok = f.test(input.value);
    const err = $(`#err-${input.name}`);
    input.setAttribute('aria-invalid', ok ? 'false' : 'true');
    err.hidden = ok;
    err.innerHTML = ok ? '' : `${icon('alert', 'icon-sm')}${f.msg}`;
    return ok;
  }
  function submitCheckout(form) {
    const inputs = [...form.querySelectorAll('input.input')];
    inputs.forEach((i) => touched.add(i.name));
    const bad = inputs.filter((i) => !validateField(i));
    const banner = $('#co-banner');
    if (bad.length) {
      banner.hidden = false;
      banner.innerHTML = `${icon('alert')}<div><b>Fix ${bad.length} field${bad.length > 1 ? 's' : ''} to place your order:</b> ${bad.map((i) => `<a href="#co-${i.name}" data-focus="co-${i.name}">${FIELDS[i.name].label}</a>`).join(', ')}</div>`;
      bad[0].focus();
      return;
    }
    banner.hidden = true;
    const btn = $('#co-submit');
    btn.disabled = true;
    btn.innerHTML = `<span class="spinner" aria-hidden="true"></span>Placing order…`;
    const val = (n) => form.elements[n].value.trim();
    const t = totals(shipMethod);
    const order = {
      id: 'AX-' + String(Math.floor(100000 + Math.random() * 900000)),
      date: new Date().toISOString(),
      email: val('email'),
      method: shipMethod,
      vehicle: vehicle() ? vFull(vehicle()) : null,
      ship: { name: `${val('first')} ${val('last')}`, address: [val('address'), val('apt')].filter(Boolean).join(', '), city: val('city'), region: val('region').toUpperCase(), zip: val('zip') },
      items: t.items.map((x) => ({ id: x.id, title: x.p.title, sku: x.p.sku, qty: x.qty, price: x.p.price })),
      totals: { sub: t.sub, core: t.core, ship: t.ship, tax: t.tax, total: t.total },
    };
    form.querySelectorAll('fieldset').forEach((fs) => (fs.disabled = true)); // lock against re-submission
    setTimeout(() => {
      const orders = store.get('apex.orders', []);
      orders.unshift(order);
      store.set('apex.orders', orders.slice(0, 20));
      state.cart = []; saveCart();
      shipMethod = 'standard';
      location.hash = `#/order/${order.id}`;
    }, 1100);
  }

  // ---------- orders ----------
  function addBusinessDays(date, n) { const d = new Date(date); while (n > 0) { d.setDate(d.getDate() + 1); if (d.getDay() % 6 !== 0) n--; } return d; }
  const fmtDate = (d) => d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  function renderOrder(id) {
    const o = store.get('apex.orders', []).find((x) => x.id === id);
    if (!o) return renderNotFound(`We can't find order ${esc(id)}`, 'Orders in this demo are saved in this browser only. It may have been placed on another device, or the browser data was cleared.', `<a class="btn btn-outline" href="#/orders">Order history</a>`);
    const eta = o.method === 'nextday' ? fmtDate(addBusinessDays(o.date, 1)) : `${fmtDate(addBusinessDays(o.date, 3))} – ${fmtDate(addBusinessDays(o.date, 5))}`;
    main.innerHTML = `<div class="wrap page"><div class="confirm">
      <div class="confirm-head">${icon('shield', 'icon-lg')}<div>
        <p class="label-caps" style="color:var(--fit-ink)">Order confirmed</p>
        <h1>Thanks — order <span class="mono">${esc(o.id)}</span> is in</h1>
        <p style="margin-top:4px">Placed ${new Date(o.date).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}. A live store would email a receipt to <b>${esc(o.email)}</b>; this demo sends nothing.</p></div></div>
      <div class="confirm-grid">
        <div class="panel panel-pad"><h2 class="label-caps" style="margin-bottom:8px">Estimated delivery</h2><p class="mono" style="font-weight:700;font-size:16px">${eta}</p><p class="spec-sm muted" style="margin-top:4px">${o.method === 'nextday' ? 'Next-day' : 'Standard'} shipping</p></div>
        <div class="panel panel-pad"><h2 class="label-caps" style="margin-bottom:8px">Ship to</h2><p>${esc(o.ship.name)}<br>${esc(o.ship.address)}<br>${esc(o.ship.city)}, ${esc(o.ship.region)} ${esc(o.ship.zip)}</p></div>
      </div>
      <div class="panel" style="margin-top:16px"><div class="section-title"><h2 class="label-caps">Items</h2>${o.vehicle ? `<span class="spec-sm muted">For ${esc(o.vehicle)}</span>` : ''}</div>
        <table class="spec-table"><tbody>${o.items.map((i) => `<tr><td><a href="#/p/${esc(i.id)}">${esc(i.title)}</a><span class="spec-sm muted" style="display:block">${esc(i.sku)} · Qty ${i.qty}</span></td><td class="mono" style="text-align:right">${money(i.price * i.qty)}</td></tr>`).join('')}</tbody></table>
        <div class="totals" style="padding:12px 16px;border-top:1px solid var(--slate-200)">
          <div><span>Subtotal</span><span class="mono">${money(o.totals.sub)}</span></div>
          ${o.totals.core ? `<div><span>Core charges (refundable)</span><span class="mono">${money(o.totals.core)}</span></div>` : ''}
          <div><span>Shipping</span><span class="mono">${o.totals.ship ? money(o.totals.ship) : 'Free'}</span></div>
          <div><span>Tax</span><span class="mono">${money(o.totals.tax)}</span></div>
          <div class="grand"><span>Total</span><span class="mono">${money(o.totals.total)}</span></div>
        </div></div>
      <div class="state" style="padding:24px 0"><div class="actions"><a class="btn btn-primary btn-lg" href="#/shop">Continue shopping</a><a class="btn btn-outline btn-lg" href="#/orders">Order history</a></div></div>
    </div></div>`;
    setCrumbs([['#/', 'Home'], ['#/orders', 'Orders'], [null, o.id]]);
  }
  function renderOrders() {
    const orders = store.get('apex.orders', []);
    main.innerHTML = `<div class="wrap page"><div class="confirm">
      <h1 class="checkout-title">Order history</h1>
      ${orders.length ? `<div class="panel"><ul class="compat-list">${orders.map((o) => `<li><span><a class="mono" href="#/order/${esc(o.id)}"><b>${esc(o.id)}</b></a><span class="spec-sm muted" style="display:block">${new Date(o.date).toLocaleDateString('en-US', { dateStyle: 'medium' })} · ${o.items.reduce((s, i) => s + i.qty, 0)} items</span></span><span class="mono">${money(o.totals.total)}</span></li>`).join('')}</ul></div>`
        : `<div class="panel state"><div class="state-icon">${icon('package', 'icon-lg')}</div><h2>No orders yet</h2><p>Orders you place in this browser show up here with delivery estimates.</p><div class="actions"><a class="btn btn-primary" href="#/shop">Shop parts</a></div></div>`}
    </div></div>`;
    setCrumbs([['#/', 'Home'], [null, 'Orders']]);
  }
  function renderNotFound(title = 'Page not found', body = "That link doesn't go anywhere in the store.", extra = '') {
    main.innerHTML = `<div class="wrap page"><div class="panel state"><div class="state-icon">${icon('alert', 'icon-lg')}</div><h2>${title}</h2><p>${body}</p>
      <div class="actions"><a class="btn btn-primary" href="#/shop">Back to the catalog</a>${extra}</div></div></div>`;
    setCrumbs([['#/', 'Home'], [null, 'Not found']]);
  }

  // ---------- chrome: crumbs, nav, garage, dock ----------
  function setCrumbs(items, right = '') {
    $('#crumbs-bar').hidden = false;
    $('#crumbs').innerHTML = `<nav class="crumbs spec-sm" aria-label="Breadcrumb">${items.map(([href, label], i) => {
      const last = i === items.length - 1;
      return (i ? '<span aria-hidden="true">/</span>' : '') + (last || !href ? `<span${last ? ' aria-current="page"' : ''}>${esc(label)}</span>` : `<a href="${href}">${esc(label)}</a>`);
    }).join('')}</nav>${right}`;
  }
  function renderNav() {
    const cur = state.route === 'catalog' ? (state.f.sale ? 'deals' : state.f.cat) : state.route === 'pdp' ? (byId[parseHash().parts[1]] || {}).category : null;
    $('#cat-nav').innerHTML = CATEGORIES.map((c) => `<li><a href="#/c/${c.id}"${cur === c.id ? ' aria-current="page"' : ''}>${esc(c.name)}</a></li>`).join('') +
      `<li><a class="deals" href="#/deals"${cur === 'deals' ? ' aria-current="page"' : ''}>${icon('tag', 'icon-sm')}Clearance deals</a></li>`;
    const v = vehicle(), chip = $('#garage-chip');
    chip.classList.toggle('is-set', !!v);
    chip.setAttribute('aria-label', v ? `My garage: ${vFull(v)}. Change vehicle` : 'Add your vehicle');
    chip.innerHTML = `<span class="gc-icon">${icon('car')}</span><span class="gc-text"><span class="gc-label label-caps">${v ? 'Garage · fit active' : 'My garage'}</span><span class="gc-name">${v ? esc(vFull(v)) : 'Add your vehicle'}</span></span>`;
  }
  function renderDock() {
    const dock = $('#dock');
    const show = state.route === 'catalog' || state.route === 'pdp';
    dock.hidden = !show;
    if (!show) return;
    const v = vehicle();
    dock.classList.toggle('is-set', !!v && !state.dockEditing);
    if (v && !state.dockEditing) {
      const n = PRODUCTS.filter((p) => fitStatus(p) !== 'nofit').length;
      preserveFocus(() => {
        dock.innerHTML = `<div class="wrap">
          <div class="dock-head"><div class="dock-shield">${icon('shield', 'icon-lg')}</div>
            <div><p class="label-caps" style="color:#6EE7B7">My garage</p><p class="veh">${esc(vFull(v))}</p>
            <p class="dock-sub spec-sm">${esc(v.engine)} · <strong>${n} parts</strong> fit or are universal</p></div></div>
          <div class="dock-loaded"><span class="fit-badge label-caps">${icon('check', 'icon-sm')}Fitment guaranteed</span>
            <button class="btn btn-ghost-dark" type="button" data-act="dock-edit" data-key="dock:edit">Change vehicle</button>
            <button class="btn btn-ghost-dark" type="button" data-act="dock-clear">Remove</button></div></div>`;
      });
      return;
    }
    preserveFocus(() => {
      dock.innerHTML = `<div class="wrap">
        <div class="dock-head"><div class="dock-shield">${icon('shield', 'icon-lg')}</div>
          <div><h2>Find parts guaranteed to fit your exact vehicle</h2><p class="dock-sub spec-sm">Year → make → model → engine. We hide parts that won't bolt on.</p></div></div>
        <button class="btn btn-primary btn-lg dock-mobile" type="button" data-act="garage">${icon('car')}Select your vehicle</button>
        <form class="dock-form" id="dock-form" data-vehicle-form="dk" aria-label="Select your vehicle">
          ${vehicleSelectsHTML('dk')}
          <button class="btn btn-primary" type="submit" data-key="dk:go">${icon('search')}Find my parts</button>
          ${v ? `<button class="btn btn-ghost-dark" type="button" data-act="dock-cancel">Cancel</button>` : ''}
        </form></div>`;
    });
  }
  // Year → make → model → engine selects, shared by the dock (prefix "dk") and the garage dialog ("gd").
  function vehicleSelectsHTML(prefix) {
    const d = state.draft;
    const inYear = (x) => d.year && x.years[0] <= +d.year && +d.year <= x.years[1];
    const makes = [...new Set(VEHICLES.filter(inYear).map((x) => x.make))].sort();
    const models = [...new Set(VEHICLES.filter((x) => inYear(x) && x.make === d.make).map((x) => x.model))].sort();
    const engines = VEHICLES.filter((x) => inYear(x) && x.make === d.make && x.model === d.model);
    const sel = (name, label, opts, value, disabled) => `<div class="dock-select"><label class="label-caps" for="${prefix}-${name}">${label}</label>
      <select id="${prefix}-${name}" data-dock="${name}" data-prefix="${prefix}" data-key="${prefix}:${name}"${disabled ? ' disabled' : ''}><option value="">${disabled ? `Select ${label === 'Make' ? 'year' : label === 'Model' ? 'make' : 'model'} first` : label}</option>${opts.map(([val, l]) => `<option value="${esc(val)}"${String(val) === String(value) ? ' selected' : ''}>${esc(l)}</option>`).join('')}</select>${icon('chevron', 'icon-sm')}</div>`;
    return sel('year', 'Year', YEARS.map((y) => [y, y]), d.year, false)
      + sel('make', 'Make', makes.map((m) => [m, m]), d.make, !d.year)
      + sel('model', 'Model', models.map((m) => [m, m]), d.model, !d.make)
      + sel('engine', 'Engine', engines.map((x) => [x.id, x.engine]), d.id, !d.model);
  }
  function renderGarageDialog() {
    const v = vehicle();
    preserveFocus(() => {
      $('#garage-dialog').innerHTML = `<div class="drawer-head"><h2 id="garage-title">${v ? 'Change your vehicle' : 'Add your vehicle'}</h2>
          <button class="icon-btn" type="button" data-act="garage-close" aria-label="Close">${icon('x')}</button></div>
        <form class="garage-form" id="garage-form" data-vehicle-form="gd">
          ${v ? `<p class="notice notice-fit spec-sm">${icon('shield', 'icon-sm')}Current: ${esc(vFull(v))} · ${esc(v.engine)}</p>` : `<p class="muted">Pick your car and we'll only show parts that fit it.</p>`}
          <div class="garage-fields">${vehicleSelectsHTML('gd')}</div>
          <div class="garage-actions">
            <button class="btn btn-primary btn-lg" type="submit" data-key="gd:go">${icon('search')}Find my parts</button>
            ${v ? `<button class="btn btn-outline btn-lg" type="button" data-act="dock-clear">Remove vehicle</button>` : ''}
          </div>
        </form>`;
    });
  }
  function focusGarage() {
    closeDrawers(false);
    const v = vehicle();
    state.draft = v ? { year: String(v.year), make: v.make, model: v.model, id: v.id } : { year: '', make: '', model: '', id: '' };
    renderGarageDialog();
    const dlg = $('#garage-dialog');
    if (!dlg.open) dlg.showModal();
    $('#gd-year').focus();
  }
  function rerender() {
    const { parts } = parseHash();
    if (state.route === 'catalog') renderCatalog();
    else if (state.route === 'pdp') renderPDP(parts[1]);
    else if (state.route === 'checkout' && state.cart.length) renderSummary();
    renderNav(); renderDock(); renderCart();
  }

  // ---------- drawers & dialogs ----------
  let lastOpener = null;
  function openDrawer(id) {
    lastOpener = document.activeElement;
    document.querySelectorAll('.drawer.is-open').forEach((d) => d.classList.remove('is-open'));
    $('#' + id).classList.add('is-open');
    $('#scrim').classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { const f = $('#' + id).querySelector('button, a[href], input, select'); if (f) f.focus(); }, 30);
  }
  function closeDrawers(restore = true) {
    const was = document.querySelector('.drawer.is-open');
    document.querySelectorAll('.drawer.is-open').forEach((d) => d.classList.remove('is-open'));
    $('#scrim').classList.remove('is-open');
    document.body.style.overflow = '';
    if (was && restore && lastOpener && document.contains(lastOpener)) lastOpener.focus();
  }
  function renderCompareBar() {
    const bar = $('#compare-bar');
    const onPage = state.route === 'catalog' || state.route === 'pdp';
    bar.hidden = !state.compare.length || !onPage;
    if (bar.hidden) return;
    bar.innerHTML = `<span class="spec-sm"><b>${state.compare.length}</b> of 3 parts selected</span>
      <button class="btn btn-primary" type="button" data-act="compare-open"${state.compare.length < 2 ? ' disabled title="Pick at least 2 parts"' : ''}>${icon('compare')}Compare</button>
      <button class="icon-btn" type="button" data-act="compare-clear" aria-label="Clear comparison">${icon('x')}</button>`;
  }
  function openCompare() {
    const items = state.compare.map((id) => byId[id]);
    const keys = [...new Set(items.flatMap((p) => p.specs.map(([k]) => k)))];
    const row = (label, fn) => `<tr><th scope="row">${label}</th>${items.map((p) => `<td>${fn(p)}</td>`).join('')}</tr>`;
    const fitTxt = { fit: 'Fits', nofit: 'Doesn’t fit', universal: 'Universal', unknown: 'Set vehicle' };
    const dlg = $('#compare-dialog');
    dlg.innerHTML = `<div class="drawer-head"><h2 id="compare-title">Compare parts</h2><button class="icon-btn" type="button" data-act="compare-close" aria-label="Close comparison">${icon('x')}</button></div>
      <div style="overflow-x:auto"><table class="spec-table compare-table"><thead><tr><th scope="col"><span class="sr-only">Attribute</span></th>${items.map((p) => `<th scope="col"><div class="media">${art(p.art)}</div><a href="#/p/${p.id}">${esc(p.title)}</a></th>`).join('')}</tr></thead><tbody>
        ${row('Price', (p) => `<b class="mono">${money(p.price)}</b>`)}
        ${row('Fitment', (p) => `<span class="fit-txt ${fitStatus(p)}">${fitTxt[fitStatus(p)]}</span>`)}
        ${row('Brand', (p) => esc(p.brand))}
        ${row('Grade', (p) => GRADE[p.grade])}
        ${keys.map((k) => row(esc(k), (p) => esc((p.specs.find(([kk]) => kk === k) || [null, '—'])[1]))).join('')}
        <tr><th scope="row"><span class="sr-only">Action</span></th>${items.map((p) => `<td>${p.stock > 0 ? `<button class="btn btn-primary" type="button" data-act="add" data-id="${p.id}">Add to cart</button>` : ''}</td>`).join('')}</tr>
      </tbody></table></div>`;
    dlg.showModal();
  }

  // ---------- toast ----------
  function toast(msg, action) {
    const el = document.createElement('div');
    el.className = 'toast';
    el.innerHTML = `<span>${esc(msg)}</span>${action ? `<button class="btn btn-ghost-dark" type="button">${esc(action.label)}</button>` : ''}`;
    if (action) el.querySelector('button').addEventListener('click', () => { action.fn(); el.remove(); });
    $('#toasts').appendChild(el);
    setTimeout(() => el.remove(), 5000);
  }

  // ---------- router ----------
  function parseHash() {
    const h = location.hash.slice(1) || '/';
    const [path, qs] = h.split('?');
    return { parts: path.split('/').filter(Boolean).map(decodeURIComponent), params: new URLSearchParams(qs || '') };
  }
  function route() {
    const { parts, params } = parseHash();
    const [a, b] = parts;
    closeDrawers(false);
    if ($('#compare-dialog').open) $('#compare-dialog').close();
    document.title = 'ApexAuto Parts — Spare parts guaranteed to fit';
    if (!a || a === 'shop' || a === 'c' || a === 'deals') {
      const cat = a === 'c' ? b : null;
      if (a === 'c' && !CATEGORIES.some((c) => c.id === cat)) { state.route = 'other'; renderNotFound('Category not found'); }
      else {
        state.route = 'catalog';
        const q = (params.get('q') || '').trim();
        const key = `${a || 'shop'}|${cat}|${q}`;
        if (key !== state.catalogKey) { state.f = defaultFilters(); state.f.cat = cat; state.f.q = q; state.f.sale = a === 'deals'; state.catalogKey = key; }
        renderCatalog();
        if (cat) document.title = `${catName(cat)} — ApexAuto Parts`;
      }
      $('#search-q').value = state.f.q || '';
      $('#search-cat').value = state.f.cat || '';
    } else {
      $('#search-q').value = '';
      $('#search-cat').value = '';
      if (a === 'p') { state.route = 'pdp'; renderPDP(b); }
      else if (a === 'checkout') { state.route = 'checkout'; renderCheckout(); }
      else if (a === 'order') { state.route = 'order'; renderOrder(b); }
      else if (a === 'orders') { state.route = 'orders'; renderOrders(); }
      else { state.route = 'other'; renderNotFound(); }
    }
    renderNav(); renderDock(); renderCompareBar();
  }

  // ---------- events ----------
  const SETS = { sub: 'subs', brand: 'brands', grade: 'grades', pos: 'positions' };

  document.addEventListener('click', (e) => {
    const focusLink = e.target.closest('[data-focus]');
    if (focusLink) { e.preventDefault(); const el = document.getElementById(focusLink.dataset.focus); if (el) el.focus(); return; }
    const t = e.target.closest('[data-act]');
    if (!t) return;
    const act = t.dataset.act, f = state.f, id = t.dataset.id;
    switch (act) {
      case 'add': addToCart(id); break;
      case 'compare': {
        const i = state.compare.indexOf(id);
        if (i >= 0) state.compare.splice(i, 1);
        else if (state.compare.length >= 3) { toast('You can compare up to 3 parts — remove one first'); break; }
        else state.compare.push(id);
        document.querySelectorAll(`[data-act="compare"][data-id="${id}"]`).forEach((b) => b.setAttribute('aria-pressed', String(state.compare.includes(id))));
        renderCompareBar();
        break;
      }
      case 'compare-open': openCompare(); break;
      case 'compare-close': $('#compare-dialog').close(); break;
      case 'compare-clear': state.compare = []; document.querySelectorAll('[data-act="compare"]').forEach((b) => b.setAttribute('aria-pressed', 'false')); renderCompareBar(); break;
      case 'open-cart': if ($('#compare-dialog').open) $('#compare-dialog').close(); openDrawer('cart-drawer'); break;
      case 'open-filters': openDrawer('filter-drawer'); break;
      case 'close-drawers': closeDrawers(); break;
      case 'garage': e.preventDefault(); focusGarage(); break;
      case 'clear-filters': { const keep = { q: f.q, cat: f.cat, sale: f.sale, sort: f.sort }; state.f = Object.assign(defaultFilters(), keep); renderCatalog(); break; }
      case 'clear-search': location.hash = f.cat ? `#/c/${f.cat}` : f.sale ? '#/deals' : '#/shop'; break;
      case 'fit-all': f.fitMode = 'all'; f.page = 1; renderCatalog(); break;
      case 'rm-chip': {
        const type = t.dataset.type, val = t.dataset.val;
        if (type === 'q') { location.hash = f.cat ? `#/c/${f.cat}` : f.sale ? '#/deals' : '#/shop'; break; }
        if (SETS[type]) f[SETS[type]].delete(val);
        if (type === 'price') { f.min = 0; f.max = PRICE_CEIL; }
        if (type === 'inStock') f.inStock = false;
        if (type === 'shipsToday') f.shipsToday = false;
        if (type === 'fit') f.fitMode = 'mine';
        f.page = 1; renderCatalog(); break;
      }
      case 'quick': { const s = t.dataset.sub; if (f.subs.has(s) && f.subs.size === 1) f.subs.clear(); else { f.subs.clear(); f.subs.add(s); } f.page = 1; renderCatalog(); break; }
      case 'page': { const n = +t.dataset.page; if (n >= 1) { f.page = n; renderCatalog(); $('#results-title').scrollIntoView({ behavior: 'smooth', block: 'center' }); } break; }
      case 'view': state.view = t.dataset.view; store.set('apex.view', state.view); renderCatalog(); break;
      case 'dock-edit': {
        if (window.matchMedia('(max-width: 767px)').matches) { focusGarage(); break; } // inline form is hidden on phones
        const v = vehicle();
        state.dockEditing = true;
        state.draft = { year: String(v.year), make: v.make, model: v.model, id: v.id };
        renderDock();
        $('#dk-year').focus();
        break;
      }
      case 'garage-close': $('#garage-dialog').close(); break;
      case 'dock-cancel': state.dockEditing = false; renderDock(); break;
      case 'dock-clear': {
        const prev = state.vehicle;
        state.vehicle = null; store.set('apex.vehicle', null); state.draft = { year: '', make: '', model: '', id: '' };
        state.dockEditing = false;
        if ($('#garage-dialog').open) $('#garage-dialog').close();
        rerender();
        toast('Vehicle removed — showing all parts', { label: 'Undo', fn: () => { state.vehicle = prev; store.set('apex.vehicle', prev); rerender(); } });
        break;
      }
      case 'pdp-inc': setPdpQty(pdpQty + 1); break;
      case 'pdp-dec': setPdpQty(pdpQty - 1); break;
      case 'pdp-add': addToCart(id, pdpQty); break;
      case 'buy-now': addToCart(id, pdpQty, true); if (state.cart.some((l) => l.id === id)) location.hash = '#/checkout'; break;
      case 'line-inc': setLineQty(id, state.cart.find((l) => l.id === id).qty + 1); break;
      case 'line-dec': setLineQty(id, state.cart.find((l) => l.id === id).qty - 1); break;
      case 'line-rm': removeLine(id); break;
    }
  });

  document.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.dock) {
      const d = state.draft, k = t.dataset.dock;
      if (k === 'year') { d.year = t.value; d.make = d.model = d.id = ''; }
      if (k === 'make') { d.make = t.value; d.model = d.id = ''; }
      if (k === 'model') {
        d.model = t.value; d.id = '';
        const eng = VEHICLES.filter((x) => x.make === d.make && x.model === d.model && x.years[0] <= +d.year && +d.year <= x.years[1]);
        if (eng.length === 1) d.id = eng[0].id;
      }
      if (k === 'engine') d.id = t.value;
      const pre = t.dataset.prefix;
      if (pre === 'gd') renderGarageDialog(); else renderDock();
      const next = { year: 'make', make: 'model', model: 'engine' }[k];
      const nextEl = next && $(`#${pre}-${next}`);
      if (t.value && nextEl && !nextEl.value) nextEl.focus();
      else if (t.value && (k === 'engine' || (k === 'model' && d.id))) $(`[data-key="${pre}:go"]`).focus();
      return;
    }
    if (t.dataset.line) { setLineQty(t.dataset.line, parseInt(t.value, 10)); return; }
    if (t.id === 'pdp-qty') { setPdpQty(parseInt(t.value, 10)); return; }
    if (t.dataset.ship !== undefined) { shipMethod = t.value; renderSummary(); return; }
    const f = t.dataset.f; if (!f) return;
    const s = state.f;
    if (SETS[f]) { const set = s[SETS[f]]; if (t.checked) set.add(t.value); else set.delete(t.value); }
    else if (f === 'fit') s.fitMode = t.value;
    else if (f === 'min' || f === 'max') {
      const box = t.closest('[data-range]'); const [lo, hi] = box.querySelectorAll('input');
      s.min = Math.min(+lo.value, +hi.value); s.max = Math.max(+lo.value, +hi.value);
    }
    else if (f === 'inStock' || f === 'shipsToday') s[f] = t.checked;
    else if (f === 'sort') s.sort = t.value;
    s.page = 1;
    renderCatalog();
  });

  // live feedback while dragging the price range (filter commits on change)
  document.addEventListener('input', (e) => {
    const t = e.target;
    if (t.dataset.f === 'min' || t.dataset.f === 'max') {
      const box = t.closest('[data-range]');
      const [lo, hi] = box.querySelectorAll('input');
      if (+lo.value > +hi.value - PRICE_STEP) { if (t === lo) lo.value = +hi.value - PRICE_STEP; else hi.value = +lo.value + PRICE_STEP; }
      const fill = box.querySelector('.range-fill');
      fill.style.left = (lo.value / PRICE_CEIL) * 100 + '%';
      fill.style.right = 100 - (hi.value / PRICE_CEIL) * 100 + '%';
      const out = box.nextElementSibling;
      out.querySelector('[data-out="min"]').textContent = money(+lo.value);
      out.querySelector('[data-out="max"]').textContent = money(+hi.value) + (+hi.value >= PRICE_CEIL ? '+' : '');
      return;
    }
    if (t.closest && t.closest('#co-form') && t.classList.contains('input')) {
      if (t.name === 'card') { const d = t.value.replace(/\D/g, '').slice(0, 19); t.value = d.replace(/(.{4})/g, '$1 ').trim(); }
      if (t.name === 'exp') { const d = t.value.replace(/\D/g, '').slice(0, 4); t.value = d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d; }
      if (touched.has(t.name)) validateField(t);
    }
  });
  // validate on blur, not on first keystroke
  document.addEventListener('focusout', (e) => {
    const t = e.target;
    if (t.closest && t.closest('#co-form') && t.classList.contains('input') && (t.value || touched.has(t.name))) { touched.add(t.name); validateField(t); }
  });

  document.addEventListener('toggle', (e) => {
    const d = e.target; if (!d.dataset || !d.dataset.facet) return;
    if (d.open) state.openFacets.add(d.dataset.facet); else state.openFacets.delete(d.dataset.facet);
  }, true);

  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.id === 'search-form') {
      e.preventDefault();
      const q = $('#search-q').value.trim(), cat = $('#search-cat').value;
      const base = cat ? `#/c/${cat}` : '#/shop';
      const next = q ? `${base}?q=${encodeURIComponent(q)}` : base;
      if (location.hash === next) { state.catalogKey = null; route(); } else location.hash = next;
    } else if (form.dataset.vehicleForm) {
      e.preventDefault();
      const d = state.draft, pre = form.dataset.vehicleForm;
      if (!d.id) {
        const missing = !d.year ? 'year' : !d.make ? 'make' : !d.model ? 'model' : 'engine';
        toast(`Pick the ${missing} to finish setting your vehicle`);
        $(`#${pre}-${missing}`).focus();
        return;
      }
      state.vehicle = { id: d.id, year: +d.year };
      store.set('apex.vehicle', state.vehicle);
      state.dockEditing = false;
      state.f.fitMode = 'mine'; state.f.page = 1;
      if ($('#garage-dialog').open) $('#garage-dialog').close();
      rerender();
      toast(`Garage set: ${vFull(vehicle())} — showing parts that fit`);
      if (pre === 'dk') { const focusTarget = $('[data-key="dock:edit"]'); if (focusTarget) focusTarget.focus({ preventScroll: true }); }
    } else if (form.id === 'co-form') { e.preventDefault(); submitCheckout(form); }
  });

  document.addEventListener('keydown', (e) => {
    const open = document.querySelector('.drawer.is-open');
    if (e.key === 'Escape' && open) { closeDrawers(); return; }
    if (e.key === 'Tab' && open) { // keep focus inside the open drawer
      const els = [...open.querySelectorAll('button:not([disabled]), a[href], input:not([disabled]), select:not([disabled])')].filter((el) => el.offsetParent !== null);
      if (!els.length) return;
      const first = els[0], last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
    if (e.key === '/' && !/INPUT|SELECT|TEXTAREA/.test(document.activeElement.tagName) && !open) { e.preventDefault(); $('#search-q').focus(); }
  });
  ['#compare-dialog', '#garage-dialog'].forEach((sel) => $(sel).addEventListener('click', (e) => { if (e.target === e.currentTarget) e.currentTarget.close(); }));

  // ---------- boot ----------
  $('#search-cat').innerHTML = `<option value="">All categories</option>` + CATEGORIES.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join('');
  $('#footer-cats').innerHTML = CATEGORIES.map((c) => `<li><a href="#/c/${c.id}">${esc(c.name)}</a></li>`).join('');
  $('#year').textContent = new Date().getFullYear();
  $('#search-q').setAttribute('aria-keyshortcuts', '/');
  window.addEventListener('hashchange', () => { route(); window.scrollTo(0, 0); });
  renderCart();
  route();
})();
