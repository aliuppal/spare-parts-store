/* Admin page (#/admin): manage products (photo stored as base64 in Supabase, vehicle fitment
   tags), vehicles, and PakWheels price refresh. Only shown to admins; Supabase RLS enforces it. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (id, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;
  const money = (n) => 'Rs ' + Math.round(Number(n)).toLocaleString('en-US');
  const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const ART_TYPES = ['pads', 'shoe', 'rotor', 'rotor-plain', 'oilfilter', 'airfilter', 'fluid', 'coolant', 'plug', 'coil', 'belt', 'battery', 'alternator', 'sensor', 'radiator', 'pump', 'thermostat', 'shock', 'spring', 'balljoint', 'lines', 'exhaust', 'gasket'];
  const POS = { na: 'N/A', front: 'Front axle', rear: 'Rear axle', both: 'Front & rear' };
  const MAX_IMAGE_CHARS = 1500000; // ~1.1 MB of image data per product

  let mount = null;
  let route = [];
  let data = null; // { products, vehicles, cats }
  let form = null; // product form state
  let listQuery = '';

  const A = () => window.ApexAuth;
  const sb = () => A().sb;

  async function load() {
    const [p, v, c] = await Promise.all([
      sb().from('products').select('*, product_fitments(vehicle_id, year_from, year_to), product_images(product_id)').order('updated_at', { ascending: false }),
      sb().from('vehicles').select('*').order('make').order('model').order('year_from'),
      sb().from('categories').select('*').order('sort'),
    ]);
    for (const r of [p, v, c]) if (r.error) throw r.error;
    // Orders need supabase/orders.sql; if it hasn't been run yet the rest of admin still works.
    const o = await sb().from('orders').select('*').order('created_at', { ascending: false }).limit(500);
    data = { products: p.data, vehicles: v.data, cats: c.data, orders: o.error ? null : o.data, ordersError: o.error ? o.error.message : null };
  }
  // The storefront builds its catalog once at page load, so after a change we reload the page.
  function reloadWith(message, hash = '#/admin') {
    sessionStorage.setItem('apex.adminFlash', message);
    history.replaceState(null, '', location.pathname + hash);
    location.reload();
  }
  const vLabel = (v) => `${v.make} ${v.model} · ${v.engine}`;
  const hasImg = (p) => !!(Array.isArray(p.product_images) ? p.product_images[0] : p.product_images);
  const thumb = (p) => `<div class="media adm-thumb">${hasImg(p) ? `<img class="photo pending" data-pid="${esc(p.id)}" alt="">` : ''}</div>`;

  // ---------- entry ----------
  function render(el, parts) {
    mount = el;
    route = parts || [];
    draw();
  }

  async function draw() {
    const auth = A();
    if (!auth || !auth.sb) {
      mount.innerHTML = gate('Admin is not connected yet', 'Add your Supabase URL and anon key to config.js to turn on sign-in and the admin page.');
      return;
    }
    const loginError = sessionStorage.getItem('apex.loginError');
    if (loginError) sessionStorage.removeItem('apex.loginError');
    if (!auth.user) {
      mount.innerHTML = gate('Admin sign-in', 'Sign in with the admin Google account to manage products.',
        `<button class="btn btn-primary btn-lg" type="button" data-acct="signin">${icon('user')}Sign in with Google</button>`, loginError);
      return;
    }
    if (!auth.isAdmin) {
      mount.innerHTML = gate('Admins only', `You're signed in as ${esc(auth.user.email)}, which isn't an admin account.`,
        `<button class="btn btn-outline" type="button" data-acct="signout">Sign out</button><a class="btn btn-primary" href="#/shop">Back to the shop</a>`);
      return;
    }
    const tab = ['vehicles', 'prices', 'orders'].includes(route[0]) ? route[0] : 'products';
    const titles = { products: 'Products', vehicles: 'Vehicles', prices: 'PakWheels prices', orders: 'Orders' };
    mount.innerHTML = `<div class="wrap page admin">
      <div class="adm-head">
        <div><p class="label-caps muted">Store admin</p><h1>${titles[tab]}</h1></div>
        <a class="btn btn-primary" href="#/admin/new">${icon('plus')}Add product</a>
      </div>
      <nav class="adm-tabs" aria-label="Admin sections">
        <a href="#/admin/orders"${tab === 'orders' ? ' aria-current="page"' : ''}>Orders <span class="count-pill" id="adm-new-count" hidden></span></a>
        <a href="#/admin"${tab === 'products' ? ' aria-current="page"' : ''}>Products</a>
        <a href="#/admin/vehicles"${tab === 'vehicles' ? ' aria-current="page"' : ''}>Vehicles</a>
        <a href="#/admin/prices"${tab === 'prices' ? ' aria-current="page"' : ''}>PakWheels prices</a>
      </nav>
      ${flash()}
      <div id="adm-body"><div class="skel" style="height:320px"></div></div>
    </div>`;
    try {
      if (!data) await load();
    } catch (e) {
      $('#adm-body').innerHTML = `<div class="panel state" role="alert"><div class="state-icon">${icon('alert', 'icon-lg')}</div><h2>Couldn't load the catalog</h2><p>${esc(e.message)}</p><div class="actions"><button class="btn btn-primary" type="button" onclick="location.reload()">Retry</button></div></div>`;
      return;
    }
    const newCount = (data.orders || []).filter((o) => o.status === 'new').length;
    const pill = $('#adm-new-count');
    if (pill && newCount) { pill.hidden = false; pill.textContent = newCount; pill.setAttribute('aria-label', `${newCount} new`); }
    if (route[0] === 'new') return productForm(null);
    if (route[0] === 'p') return productForm(route[1]);
    if (tab === 'orders') return route[1] ? orderDetail(route[1]) : ordersView();
    if (tab === 'vehicles') return vehiclesView();
    if (tab === 'prices') return pricesView();
    return productList();
  }

  function gate(title, body, actions = '', error = '') {
    return `<div class="wrap page"><div class="panel state">
      <div class="state-icon">${icon('lock', 'icon-lg')}</div><h2>${title}</h2><p>${body}</p>
      ${error ? `<p class="field-error" role="alert">${icon('alert', 'icon-sm')}Sign-in failed: ${esc(error)}</p>` : ''}
      <div class="actions">${actions}</div></div></div>`;
  }
  function flash() {
    const m = sessionStorage.getItem('apex.adminFlash');
    if (!m) return '';
    sessionStorage.removeItem('apex.adminFlash');
    return `<p class="notice notice-fit adm-flash" role="status">${icon('check', 'icon-sm')}${esc(m)}</p>`;
  }

  // ---------- products ----------
  function productList() {
    const q = listQuery.toLowerCase();
    const rows = data.products.filter((p) => !q || `${p.title} ${p.brand} ${p.sku || ''} ${p.part_no || ''} ${p.sub}`.toLowerCase().includes(q));
    const catName = (id) => (data.cats.find((c) => c.id === id) || {}).name || id;
    $('#adm-body').innerHTML = `
      <div class="panel panel-pad adm-toolbar">
        <label class="sr-only" for="adm-q">Search products</label>
        <input class="input" id="adm-q" type="search" placeholder="Search ${data.products.length} products" value="${esc(listQuery)}">
        <span class="spec-sm muted">${rows.length} shown · ${data.products.filter((p) => !p.active).length} hidden from the shop</span>
      </div>
      ${rows.length ? `<div class="panel adm-table-wrap"><table class="adm-table">
        <thead><tr><th scope="col"><span class="sr-only">Photo</span></th><th scope="col">Product</th><th scope="col">Category</th><th scope="col">Price</th><th scope="col">Fits</th><th scope="col">Status</th><th scope="col"><span class="sr-only">Actions</span></th></tr></thead>
        <tbody>${rows.map((p) => `<tr>
          <td>${thumb(p)}</td>
          <td><a class="adm-title" href="#/admin/p/${esc(p.id)}">${esc(p.title)}</a><span class="spec-sm muted">${esc(p.brand)} · ${esc(p.part_no || p.sku || p.id)}</span></td>
          <td>${esc(catName(p.category))}<span class="spec-sm muted">${esc(p.sub)}</span></td>
          <td class="mono">${money(p.price)}${p.was ? `<span class="spec-sm muted"><s>${money(p.was)}</s></span>` : ''}</td>
          <td>${p.universal ? 'Universal' : `${(p.product_fitments || []).length} vehicle${(p.product_fitments || []).length === 1 ? '' : 's'}`}</td>
          <td>${p.active ? '<span class="badge badge-after spec-sm">Live</span>' : '<span class="badge badge-sale spec-sm">Hidden</span>'}</td>
          <td class="adm-actions"><a class="btn btn-outline" href="#/admin/p/${esc(p.id)}">Edit</a></td>
        </tr>`).join('')}</tbody></table></div>`
        : `<div class="panel state"><div class="state-icon">${icon('search', 'icon-lg')}</div><h2>No products match “${esc(listQuery)}”</h2><p>Try a brand, part type or part number.</p></div>`}`;
    const input = $('#adm-q');
    input.addEventListener('input', () => { listQuery = input.value; const pos = input.selectionStart; productList(); const i = $('#adm-q'); i.focus(); i.setSelectionRange(pos, pos); });
  }

  function productForm(id) {
    const p = id ? data.products.find((x) => x.id === id) : null;
    if (id && !p) {
      $('#adm-body').innerHTML = `<div class="panel state"><h2>Product not found</h2><p>It may have been deleted.</p><div class="actions"><a class="btn btn-primary" href="#/admin">All products</a></div></div>`;
      return;
    }
    form = {
      id: p ? p.id : null,
      fits: p ? (p.product_fitments || []).map((f) => ({ ...f })) : [],
      image: null, imageChanged: false, imageRemoved: false,
      checked: p ? p.price_checked_at : null,
    };
    const subs = [...new Set(data.products.map((x) => x.sub))].sort();
    const brands = [...new Set(data.products.map((x) => x.brand))].sort();
    const field = (name, label, input, cls = '', hint = '') => `<div class="field ${cls}"><label for="pf-${name}">${label}</label>${input}${hint ? `<p class="hint">${hint}</p>` : ''}<p class="field-error" id="pf-${name}-err" hidden></p></div>`;
    const val = (k, d = '') => esc(p && p[k] != null ? p[k] : d);

    $('#adm-body').innerHTML = `<form class="adm-form" id="adm-form" novalidate>
      <div class="form-error-banner" id="pf-banner" role="alert" hidden></div>
      <section class="panel form-section">
        <h2 class="adm-h2">${icon('search')}Fill from a PakWheels listing <span class="muted spec-sm">optional</span></h2>
        <div class="adm-inline">
          <label class="sr-only" for="pf-pw">PakWheels listing link</label>
          <input class="input" id="pf-pw" type="url" inputmode="url" placeholder="https://www.pakwheels.com/accessories-spare-parts/…" value="${val('source_url')}">
          <button class="btn btn-secondary" type="button" data-adm="pw-fetch">Fetch details</button>
        </div>
        <p class="hint" id="pf-pw-status">Pulls the title, current price, original price and photo from the listing.</p>
      </section>

      <section class="panel form-section">
        <h2 class="adm-h2">Product details</h2>
        <div class="fields">
          ${field('title', 'Title', `<input class="input" id="pf-title" name="title" value="${val('title')}" required>`)}
          ${field('brand', 'Brand', `<input class="input" id="pf-brand" name="brand" list="pf-brands" value="${val('brand')}" required><datalist id="pf-brands">${brands.map((b) => `<option value="${esc(b)}">`).join('')}</datalist>`, 'half')}
          ${field('part_no', 'Part number', `<input class="input" id="pf-part_no" name="part_no" value="${val('part_no')}">`, 'half', 'Shown as the SKU and searchable.')}
          ${field('category', 'Category', `<select class="input" id="pf-category" name="category" required><option value="">Choose…</option>${data.cats.map((c) => `<option value="${esc(c.id)}"${p && p.category === c.id ? ' selected' : ''}>${esc(c.name)}</option>`).join('')}</select>`, 'half')}
          ${field('sub', 'Part type', `<input class="input" id="pf-sub" name="sub" list="pf-subs" value="${val('sub')}" placeholder="e.g. Brake pads" required><datalist id="pf-subs">${subs.map((s) => `<option value="${esc(s)}">`).join('')}</datalist>`, 'half', 'Becomes a “Part type” filter in the shop.')}
          <fieldset class="field half"><legend class="adm-legend">Grade</legend>
            <label class="adm-radio"><input type="radio" name="grade" value="oem"${p && p.grade === 'oem' ? ' checked' : ''}> Genuine / OEM</label>
            <label class="adm-radio"><input type="radio" name="grade" value="aftermarket"${!p || p.grade !== 'oem' ? ' checked' : ''}> Aftermarket</label>
          </fieldset>
          ${field('position', 'Axle position', `<select class="input" id="pf-position" name="position">${Object.entries(POS).map(([k, l]) => `<option value="${k}"${(p ? p.position : 'na') === k ? ' selected' : ''}>${l}</option>`).join('')}</select>`, 'half')}
          ${field('unit', 'Pack / unit', `<input class="input" id="pf-unit" name="unit" value="${val('unit', 'Each')}">`, 'half', 'e.g. Front axle set, 4 L, Each')}
          ${field('art', 'Fallback drawing', `<select class="input" id="pf-art" name="art">${ART_TYPES.map((t) => `<option${(p ? p.art : 'oilfilter') === t ? ' selected' : ''}>${t}</option>`).join('')}</select>`, 'half', 'Shown only if there is no photo.')}
          ${field('description', 'Description', `<textarea class="input adm-textarea" id="pf-description" name="description" rows="4">${val('description')}</textarea>`)}
          <label class="adm-check field"><input type="checkbox" name="active"${!p || p.active ? ' checked' : ''}> Show this product in the shop</label>
        </div>
      </section>

      <section class="panel form-section">
        <h2 class="adm-h2">Price</h2>
        <div class="fields">
          ${field('price', 'Price (Rs)', `<input class="input mono" id="pf-price" name="price" inputmode="numeric" value="${val('price')}" required>`, 'third')}
          ${field('was', 'Original price (Rs)', `<input class="input mono" id="pf-was" name="was" inputmode="numeric" value="${val('was')}">`, 'third', 'Leave empty if not on sale.')}
          ${field('source_url', 'Source listing', `<input class="input" id="pf-source_url" name="source_url" type="url" value="${val('source_url')}">`, 'third')}
        </div>
        <p class="hint" id="pf-checked">${form.checked ? `Price last checked on PakWheels: ${esc(form.checked)}` : 'Not checked against PakWheels yet.'}</p>
      </section>

      <section class="panel form-section">
        <h2 class="adm-h2">${icon('car')}Fits these vehicles</h2>
        <p class="hint">Each tag puts the product in the shop’s fitment filter for that car and model years.</p>
        <label class="adm-check"><input type="checkbox" id="pf-universal"${p && p.universal ? ' checked' : ''}> Universal — fits any vehicle (oils, coolants, accessories)</label>
        <div id="pf-fits"></div>
        <div class="adm-fit-add" id="pf-fit-add">
          <div class="field"><label for="pf-veh">Vehicle</label><select class="input" id="pf-veh"><option value="">Choose a vehicle…</option>${groupedVehicles()}</select></div>
          <div class="field"><label for="pf-yf">From</label><input class="input mono" id="pf-yf" inputmode="numeric" maxlength="4"></div>
          <div class="field"><label for="pf-yt">To</label><input class="input mono" id="pf-yt" inputmode="numeric" maxlength="4"></div>
          <button class="btn btn-outline" type="button" data-adm="fit-add">${icon('plus')}Add tag</button>
        </div>
        <p class="field-error" id="pf-fits-err" hidden></p>
        <p class="hint">Car not listed? <a class="link" href="#/admin/vehicles">Add it on the Vehicles tab</a> first.</p>
      </section>

      <section class="panel form-section">
        <h2 class="adm-h2">Photo</h2>
        <div class="adm-photo">
          <div class="media adm-preview" id="pf-preview">${p && hasImg(p) ? `<img class="photo pending" data-pid="${esc(p.id)}" alt="">` : `<p class="muted spec-sm">No photo</p>`}</div>
          <div>
            <label class="btn btn-outline adm-file">${icon('plus')}Upload photo<input type="file" id="pf-file" accept="image/*" hidden></label>
            <button class="btn btn-outline" type="button" data-adm="img-remove">${icon('trash')}Remove photo</button>
            <p class="hint">Resized to 900 px and stored in Supabase as base64. JPG, PNG or WebP.</p>
            <p class="field-error" id="pf-img-err" hidden></p>
          </div>
        </div>
      </section>

      <div class="adm-save">
        ${p ? `<button class="btn btn-outline adm-delete" type="button" data-adm="delete">${icon('trash')}Delete product</button>` : '<span></span>'}
        <div class="adm-save-right"><a class="btn btn-outline" href="#/admin">Cancel</a><button class="btn btn-primary btn-lg" type="submit" id="pf-save">${p ? 'Save changes' : 'Create product'}</button></div>
      </div>
    </form>`;
    renderFits();
    syncUniversal();
    if (window.ApexImages) window.ApexImages.hydrate();
  }

  function groupedVehicles() {
    const makes = [...new Set(data.vehicles.map((v) => v.make))];
    return makes.map((m) => `<optgroup label="${esc(m)}">${data.vehicles.filter((v) => v.make === m).map((v) => `<option value="${esc(v.id)}">${esc(`${v.model} · ${v.engine} (${v.year_from}–${v.year_to})`)}</option>`).join('')}</optgroup>`).join('');
  }
  function renderFits() {
    const box = $('#pf-fits');
    if (!form.fits.length) { box.innerHTML = '<p class="muted spec-sm adm-empty">No vehicles tagged yet.</p>'; return; }
    box.innerHTML = `<ul class="chips adm-chips">${form.fits.map((f, i) => {
      const v = data.vehicles.find((x) => x.id === f.vehicle_id);
      return `<li class="chip spec-sm">${esc(v ? vLabel(v) : f.vehicle_id)} (${f.year_from}–${f.year_to})<button type="button" data-adm="fit-rm" data-i="${i}" aria-label="Remove ${esc(v ? v.model : f.vehicle_id)} tag">${icon('x', 'icon-sm')}</button></li>`;
    }).join('')}</ul>`;
  }
  function syncUniversal() {
    const uni = $('#pf-universal').checked;
    $('#pf-fit-add').hidden = uni;
    $('#pf-fits').hidden = uni;
  }

  function setErr(name, msg) {
    const el = $(`#pf-${name}-err`);
    const input = $(`#pf-${name}`);
    if (el) { el.hidden = !msg; el.innerHTML = msg ? `${icon('alert', 'icon-sm')}${esc(msg)}` : ''; }
    if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    return !msg;
  }

  function collect() {
    const f = $('#adm-form');
    const get = (n) => (f.elements[n] ? f.elements[n].value.trim() : '');
    const int = (s) => (s === '' ? null : Number(String(s).replace(/[,\s]/g, '')));
    const row = {
      title: get('title'), brand: get('brand'), part_no: get('part_no') || null, category: get('category'), sub: get('sub'),
      grade: (f.querySelector('[name="grade"]:checked') || {}).value || 'aftermarket',
      position: get('position'), unit: get('unit') || 'Each', art: get('art'), description: get('description') || null,
      active: f.elements.active.checked, price: int(get('price')), was: int(get('was')), source_url: get('source_url') || null,
      universal: $('#pf-universal').checked, price_checked_at: form.checked || null,
    };
    const errs = [];
    const need = (k, label) => { if (!row[k]) { setErr(k, `${label} is required`); errs.push(k); } else setErr(k, ''); };
    need('title', 'Title'); need('brand', 'Brand'); need('category', 'Category'); need('sub', 'Part type');
    if (!Number.isInteger(row.price) || row.price <= 0) { setErr('price', 'Enter the price in whole rupees, e.g. 5499'); errs.push('price'); } else setErr('price', '');
    if (row.was != null && (!Number.isInteger(row.was) || row.was <= (row.price || 0))) { setErr('was', 'Original price must be higher than the price'); errs.push('was'); } else setErr('was', '');
    if (row.source_url && !/^https?:\/\//.test(row.source_url)) { setErr('source_url', 'Use a full https:// link'); errs.push('source_url'); } else setErr('source_url', '');
    const fitsErr = $('#pf-fits-err');
    if (!row.universal && !form.fits.length) {
      fitsErr.hidden = false; fitsErr.innerHTML = `${icon('alert', 'icon-sm')}Tag at least one vehicle, or mark the product as universal`; errs.push('fits');
    } else fitsErr.hidden = true;
    return { row, errs };
  }

  async function save() {
    const { row, errs } = collect();
    const banner = $('#pf-banner');
    if (errs.length) {
      banner.hidden = false;
      banner.innerHTML = `${icon('alert')}<div><b>Fix ${errs.length} field${errs.length > 1 ? 's' : ''} before saving.</b></div>`;
      const first = $(`#pf-${errs[0] === 'fits' ? 'veh' : errs[0]}`);
      if (first) first.focus();
      return;
    }
    banner.hidden = true;
    const btn = $('#pf-save');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span>Saving…';
    try {
      const id = form.id || `ax-${slug(row.title).slice(0, 40)}-${Math.random().toString(36).slice(2, 6)}`;
      const record = { ...row, id, sku: row.part_no || id.toUpperCase() };
      const s = sb();
      let r = await s.from('products').upsert(record);
      if (r.error) throw r.error;
      r = await s.from('product_fitments').delete().eq('product_id', id);
      if (r.error) throw r.error;
      if (!row.universal && form.fits.length) {
        r = await s.from('product_fitments').insert(form.fits.map((f) => ({ product_id: id, vehicle_id: f.vehicle_id, year_from: f.year_from, year_to: f.year_to })));
        if (r.error) throw r.error;
      }
      if (form.imageRemoved && !form.image) {
        r = await s.from('product_images').delete().eq('product_id', id);
        if (r.error) throw r.error;
      } else if (form.imageChanged && form.image) {
        r = await s.from('product_images').upsert({ product_id: id, mime: form.image.mime, data_base64: form.image.base64, source_url: form.image.source_url || null });
        if (r.error) throw r.error;
      }
      reloadWith(`${form.id ? 'Saved' : 'Created'} “${row.title}”`);
    } catch (e) {
      btn.disabled = false;
      btn.textContent = form.id ? 'Save changes' : 'Create product';
      banner.hidden = false;
      banner.innerHTML = `${icon('alert')}<div><b>Couldn't save.</b> ${esc(e.message || e)}. Your changes are still in the form.</div>`;
    }
  }

  function showPreview(dataUrl) {
    $('#pf-preview').innerHTML = dataUrl ? `<img class="photo" src="${esc(dataUrl)}" alt="">` : '<p class="muted spec-sm">No photo</p>';
    $('#pf-preview').classList.toggle('has-photo', !!dataUrl);
  }

  async function onFile(file) {
    const err = $('#pf-img-err');
    err.hidden = true;
    if (!file) return;
    if (!file.type.startsWith('image/')) { err.hidden = false; err.textContent = 'Choose an image file (JPG, PNG or WebP).'; return; }
    try {
      const img = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => rej(new Error('That image could not be read')); i.src = URL.createObjectURL(file); });
      const scale = Math.min(1, 900 / Math.max(img.naturalWidth, img.naturalHeight));
      const c = document.createElement('canvas');
      c.width = Math.round(img.naturalWidth * scale);
      c.height = Math.round(img.naturalHeight * scale);
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(img.src);
      let url = c.toDataURL('image/webp', 0.85);
      if (!url.startsWith('data:image/webp')) url = c.toDataURL('image/jpeg', 0.85); // Safari can't encode WebP
      const [, mime, base64] = url.match(/^data:([^;]+);base64,(.*)$/);
      if (base64.length > MAX_IMAGE_CHARS) throw new Error('That photo is still too large after resizing — try a smaller one');
      form.image = { mime, base64, source_url: null };
      form.imageChanged = true;
      form.imageRemoved = false;
      showPreview(url);
    } catch (e) {
      err.hidden = false;
      err.textContent = e.message;
    }
  }

  async function pwFetch() {
    const url = $('#pf-pw').value.trim();
    const status = $('#pf-pw-status');
    const btn = $('[data-adm="pw-fetch"]');
    if (!/^https:\/\/www\.pakwheels\.com\/accessories-spare-parts\//.test(url)) {
      status.className = 'field-error';
      status.innerHTML = `${icon('alert', 'icon-sm')}Paste a link that starts with https://www.pakwheels.com/accessories-spare-parts/`;
      return;
    }
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span>Fetching…';
    status.className = 'hint';
    status.textContent = 'Reading the listing…';
    try {
      const token = await A().token();
      const r = await fetch(`/api/pakwheels?url=${encodeURIComponent(url)}`, { headers: { Authorization: `Bearer ${token}` } });
      const d = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(d.error || `Request failed (${r.status})`);
      const f = $('#adm-form');
      if (d.title && !f.elements.title.value.trim()) f.elements.title.value = d.title;
      f.elements.price.value = d.price;
      f.elements.was.value = d.was || '';
      f.elements.source_url.value = url;
      form.checked = d.checked;
      $('#pf-checked').textContent = `Price last checked on PakWheels: ${d.checked}`;
      if (d.image) {
        form.image = { mime: d.image.mime, base64: d.image.base64, source_url: d.image_url };
        form.imageChanged = true;
        form.imageRemoved = false;
        showPreview(`data:${d.image.mime};base64,${d.image.base64}`);
      }
      status.className = 'hint';
      status.textContent = `Filled from PakWheels: ${money(d.price)}${d.was ? ` (was ${money(d.was)})` : ''}${d.image ? ' and the photo' : ''}. Review the details, then save.`;
    } catch (e) {
      status.className = 'field-error';
      status.innerHTML = `${icon('alert', 'icon-sm')}${esc(e.message)}`;
    } finally {
      btn.disabled = false;
      btn.textContent = 'Fetch details';
    }
  }

  async function deleteProduct() {
    const p = data.products.find((x) => x.id === form.id);
    if (!p || !confirm(`Delete “${p.title}”? This removes its photo and vehicle tags too, and can't be undone.`)) return;
    const r = await sb().from('products').delete().eq('id', p.id);
    if (r.error) { alert(`Couldn't delete: ${r.error.message}`); return; }
    reloadWith(`Deleted “${p.title}”`);
  }

  // ---------- orders ----------
  const STATUSES = [
    ['new', 'New'], ['confirmed', 'Confirmed'], ['dispatched', 'Dispatched'], ['delivered', 'Delivered'], ['cancelled', 'Cancelled'],
  ];
  const statusLabel = (s) => (STATUSES.find(([k]) => k === s) || [s, s])[1];
  const statusBadge = (s) => `<span class="status status-${esc(s)} spec-sm">${esc(statusLabel(s))}</span>`;
  const when = (iso) => new Date(iso).toLocaleString('en-GB', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  let orderFilter = 'open';

  function ordersMissing() {
    $('#adm-body').innerHTML = `<div class="panel state"><div class="state-icon">${icon('package', 'icon-lg')}</div>
      <h2>Orders aren't set up yet</h2><p>Run <b>supabase/orders.sql</b> in the Supabase SQL editor, then reload this page.</p>
      <p class="spec-sm muted">${esc(data.ordersError || '')}</p></div>`;
  }

  function ordersView() {
    if (!data.orders) return ordersMissing();
    const all = data.orders;
    const count = (k) => all.filter((o) => (k === 'open' ? !['delivered', 'cancelled'].includes(o.status) : k === 'all' || o.status === k)).length;
    const rows = all.filter((o) => (orderFilter === 'open' ? !['delivered', 'cancelled'].includes(o.status) : orderFilter === 'all' || o.status === orderFilter));
    const filters = [['open', 'Open'], ...STATUSES, ['all', 'All']];
    $('#adm-body').innerHTML = `
      <div class="panel panel-pad adm-toolbar" role="group" aria-label="Filter orders by status">
        ${filters.map(([k, l]) => `<button type="button" class="adm-filter${orderFilter === k ? ' is-on' : ''}" data-adm="order-filter" data-f="${k}" aria-pressed="${orderFilter === k}">${l} <span class="muted">${count(k)}</span></button>`).join('')}
      </div>
      ${rows.length ? `<div class="panel adm-table-wrap"><table class="adm-table">
        <thead><tr><th scope="col">Order</th><th scope="col">Customer</th><th scope="col">City</th><th scope="col">Items</th><th scope="col">Collect</th><th scope="col">Status</th></tr></thead>
        <tbody>${rows.map((o) => `<tr>
          <td><a class="adm-title mono" href="#/admin/orders/${esc(o.id)}">${esc(o.id)}</a><span class="spec-sm muted">${when(o.created_at)}</span></td>
          <td>${esc(o.customer_name)}<span class="spec-sm muted">${esc(o.phone)}</span></td>
          <td>${esc(o.city)}</td>
          <td>${o.items.reduce((s, i) => s + i.qty, 0)}</td>
          <td class="mono">${money(o.total)}</td>
          <td>${statusBadge(o.status)}${o.admin_notes ? `<span class="spec-sm muted" title="${esc(o.admin_notes)}">${icon('chat', 'icon-sm')} note</span>` : ''}</td>
        </tr>`).join('')}</tbody></table></div>`
        : `<div class="panel state"><div class="state-icon">${icon('package', 'icon-lg')}</div><h2>${all.length ? 'No orders with this status' : 'No orders yet'}</h2><p>${all.length ? 'Pick another status above.' : 'Orders placed at checkout appear here, and are emailed to the admins.'}</p></div>`}`;
  }

  function orderDetail(id) {
    if (!data.orders) return ordersMissing();
    const o = data.orders.find((x) => x.id === id);
    if (!o) {
      $('#adm-body').innerHTML = `<div class="panel state"><h2>Order ${esc(id)} not found</h2><div class="actions"><a class="btn btn-primary" href="#/admin/orders">All orders</a></div></div>`;
      return;
    }
    const digits = o.phone.replace(/[^\d+]/g, '');
    const wa = digits.replace(/^\+/, '').replace(/^0/, '92');
    $('#adm-body').innerHTML = `<div class="adm-order">
      <div class="adm-order-main">
        <section class="panel form-section">
          <div class="adm-order-head"><h2 class="adm-h2 mono">${esc(o.id)}</h2>${statusBadge(o.status)}</div>
          <p class="spec-sm muted">Placed ${new Date(o.created_at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })} · ${o.shipping_method === 'nextday' ? 'Next-day' : 'Standard'} delivery · Cash on delivery · ${o.email_sent ? 'Emailed to admins' : 'Not emailed'}</p>
        </section>
        <section class="panel">
          <div class="section-title"><h2 class="label-caps">Items</h2>${o.vehicle ? `<span class="spec-sm muted">For ${esc(o.vehicle)}</span>` : ''}</div>
          <table class="spec-table"><tbody>${o.items.map((i) => `<tr><td><a class="adm-title" href="#/p/${esc(i.product_id)}" target="_blank" rel="noopener">${esc(i.title)}</a><span class="spec-sm muted" style="display:block">${esc(i.sku)} · ${money(i.price)} × ${i.qty}</span></td><td class="mono" style="text-align:right">${money(i.line_total)}</td></tr>`).join('')}</tbody></table>
          <div class="totals" style="padding:12px 16px;border-top:1px solid var(--slate-200)">
            <div><span>Subtotal</span><span class="mono">${money(o.subtotal)}</span></div>
            <div><span>Shipping</span><span class="mono">${o.shipping ? money(o.shipping) : 'Free'}</span></div>
            <div class="grand"><span>Collect on delivery</span><span class="mono">${money(o.total)}</span></div>
          </div>
        </section>
      </div>
      <div class="adm-order-side">
        <section class="panel form-section">
          <h2 class="adm-h2">Customer</h2>
          <p><b>${esc(o.customer_name)}</b></p>
          <p class="adm-contact"><a class="link" href="tel:${esc(digits)}">${esc(o.phone)}</a> · <a class="link" href="https://wa.me/${esc(wa)}" target="_blank" rel="noopener">WhatsApp</a></p>
          <p class="adm-contact"><a class="link" href="mailto:${esc(o.email)}">${esc(o.email)}</a></p>
          <p style="margin-top:8px">${esc(o.address)}<br>${esc(o.city)}</p>
          ${o.customer_notes ? `<p class="notice notice-warn spec-sm" style="margin-top:12px;display:block"><b>Customer note:</b> ${esc(o.customer_notes)}</p>` : ''}
        </section>
        <form class="panel form-section" id="order-form" novalidate>
          <h2 class="adm-h2">Status &amp; notes</h2>
          <div class="field"><label for="of-status">Status</label>
            <select class="input" id="of-status" name="status">${STATUSES.map(([k, l]) => `<option value="${k}"${o.status === k ? ' selected' : ''}>${l}</option>`).join('')}</select></div>
          <div class="field" style="margin-top:12px"><label for="of-notes">Admin notes</label>
            <textarea class="input adm-textarea" id="of-notes" name="admin_notes" rows="5" maxlength="2000" placeholder="Courier, tracking number, call outcome… only admins see this">${esc(o.admin_notes || '')}</textarea></div>
          <p class="hint" id="of-status-msg" role="status">${o.updated_at && o.updated_at !== o.created_at ? `Last updated ${when(o.updated_at)}` : ''}</p>
          <button class="btn btn-primary btn-block" type="submit" id="of-save" style="margin-top:8px">Save</button>
        </form>
        <a class="btn btn-outline btn-block" href="#/admin/orders">${icon('back')}All orders</a>
      </div>
    </div>`;
  }

  async function saveOrder(f) {
    const id = route[1];
    const o = data.orders.find((x) => x.id === id);
    const btn = $('#of-save');
    const msg = $('#of-status-msg');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span>Saving…';
    const patch = { status: f.elements.status.value, admin_notes: f.elements.admin_notes.value.trim() || null };
    const r = await sb().from('orders').update(patch).eq('id', id).select().single();
    btn.disabled = false;
    btn.textContent = 'Save';
    if (r.error) { msg.className = 'field-error'; msg.textContent = `Couldn't save: ${r.error.message}`; return; }
    Object.assign(o, r.data);
    orderDetail(id);
    const m = $('#of-status-msg');
    m.className = 'notice notice-fit spec-sm';
    m.textContent = `Saved — status is now ${statusLabel(o.status)}`;
    const n = data.orders.filter((x) => x.status === 'new').length;
    const pill = $('#adm-new-count');
    if (pill) { pill.hidden = !n; pill.textContent = n; }
  }

  // ---------- vehicles ----------
  function vehiclesView() {
    const counts = {};
    data.products.forEach((p) => (p.product_fitments || []).forEach((f) => { counts[f.vehicle_id] = (counts[f.vehicle_id] || 0) + 1; }));
    const makes = [...new Set(data.vehicles.map((v) => v.make))].sort();
    $('#adm-body').innerHTML = `
      <form class="panel form-section" id="veh-form" novalidate>
        <h2 class="adm-h2">${icon('car')}Add a vehicle</h2>
        <p class="hint">New vehicles appear in the shop’s Year → Make → Model → Engine selector. Then tag products with them.</p>
        <div class="form-error-banner" id="veh-banner" role="alert" hidden></div>
        <div class="fields">
          <div class="field third"><label for="vf-make">Make</label><input class="input" id="vf-make" name="make" list="vf-makes" placeholder="e.g. Toyota" required><datalist id="vf-makes">${makes.map((m) => `<option value="${esc(m)}">`).join('')}</datalist></div>
          <div class="field third"><label for="vf-model">Model</label><input class="input" id="vf-model" name="model" placeholder="e.g. Corolla Cross" required></div>
          <div class="field third"><label for="vf-engine">Engine / trim</label><input class="input" id="vf-engine" name="engine" placeholder="e.g. 1.8L Hybrid" required></div>
          <div class="field third"><label for="vf-from">Year from</label><input class="input mono" id="vf-from" name="from" inputmode="numeric" maxlength="4" required></div>
          <div class="field third"><label for="vf-to">Year to</label><input class="input mono" id="vf-to" name="to" inputmode="numeric" maxlength="4" required></div>
          <div class="field third adm-veh-btn"><button class="btn btn-primary" type="submit">${icon('plus')}Add vehicle</button></div>
        </div>
      </form>
      <div class="panel adm-table-wrap"><table class="adm-table">
        <thead><tr><th scope="col">Vehicle</th><th scope="col">Years</th><th scope="col">Tagged products</th><th scope="col"><span class="sr-only">Actions</span></th></tr></thead>
        <tbody>${data.vehicles.map((v) => `<tr>
          <td><b>${esc(v.make)} ${esc(v.model)}</b><span class="spec-sm muted">${esc(v.engine)}</span></td>
          <td class="mono">${v.year_from}–${v.year_to}</td>
          <td>${counts[v.id] || 0}</td>
          <td class="adm-actions"><button class="btn btn-outline" type="button" data-adm="veh-rm" data-id="${esc(v.id)}">${icon('trash')}Delete</button></td>
        </tr>`).join('')}</tbody></table></div>`;
  }

  async function addVehicle(f) {
    const get = (n) => f.elements[n].value.trim();
    const v = { make: get('make'), model: get('model'), engine: get('engine'), year_from: Number(get('from')), year_to: Number(get('to')) };
    const banner = $('#veh-banner');
    const problems = [];
    if (!v.make || !v.model || !v.engine) problems.push('Fill in make, model and engine');
    if (!Number.isInteger(v.year_from) || v.year_from < 1950 || v.year_from > 2100) problems.push('Year from must be a 4-digit year');
    if (!Number.isInteger(v.year_to) || v.year_to < v.year_from) problems.push('Year to must be the same as or after year from');
    if (problems.length) { banner.hidden = false; banner.innerHTML = `${icon('alert')}<div>${problems.map(esc).join('. ')}.</div>`; return; }
    let id = slug(`${v.make}-${v.model}-${v.engine}`).slice(0, 60);
    if (data.vehicles.some((x) => x.id === id)) id = `${id}-${v.year_from}`;
    const r = await sb().from('vehicles').insert({ id, ...v });
    if (r.error) { banner.hidden = false; banner.innerHTML = `${icon('alert')}<div>Couldn't add it: ${esc(r.error.message)}</div>`; return; }
    reloadWith(`Added ${v.make} ${v.model} ${v.engine} — tag products with it from their edit page`, '#/admin/vehicles');
  }

  async function removeVehicle(id) {
    const v = data.vehicles.find((x) => x.id === id);
    const n = data.products.filter((p) => (p.product_fitments || []).some((f) => f.vehicle_id === id)).length;
    if (!v || !confirm(`Delete ${v.make} ${v.model} ${v.engine}?${n ? ` Its tag will be removed from ${n} product${n > 1 ? 's' : ''}.` : ''}`)) return;
    const r = await sb().from('vehicles').delete().eq('id', id);
    if (r.error) { alert(`Couldn't delete: ${r.error.message}`); return; }
    reloadWith(`Deleted ${v.make} ${v.model}`, '#/admin/vehicles');
  }

  // ---------- PakWheels price refresh ----------
  function pricesView() {
    const linked = data.products.filter((p) => p.source_url);
    $('#adm-body').innerHTML = `
      <div class="panel form-section">
        <h2 class="adm-h2">Refresh prices from PakWheels</h2>
        <p class="hint">${linked.length} of ${data.products.length} products link to a PakWheels listing. Refreshing reads each listing's current price and original price and updates the shop.</p>
        <button class="btn btn-primary btn-lg" type="button" data-adm="refresh-all"${linked.length ? '' : ' disabled'}>Refresh ${linked.length} prices</button>
        <p class="hint" id="pr-status" role="status"></p>
      </div>
      <div class="panel adm-table-wrap"><table class="adm-table">
        <thead><tr><th scope="col">Product</th><th scope="col">Price</th><th scope="col">Last checked</th><th scope="col">Result</th></tr></thead>
        <tbody>${linked.map((p) => `<tr data-row="${esc(p.id)}">
          <td><a class="adm-title" href="#/admin/p/${esc(p.id)}">${esc(p.title)}</a></td>
          <td class="mono" data-cell="price">${money(p.price)}</td>
          <td class="mono" data-cell="checked">${esc(p.price_checked_at || '—')}</td>
          <td data-cell="result" class="spec-sm muted">—</td>
        </tr>`).join('')}</tbody></table></div>`;
  }

  async function refreshAll() {
    const btn = $('[data-adm="refresh-all"]');
    const status = $('#pr-status');
    btn.disabled = true;
    const linked = data.products.filter((p) => p.source_url);
    const token = await A().token();
    let done = 0; let changed = 0; let failed = 0;
    const queue = [...linked];
    const cell = (id, k) => $(`[data-row="${CSS.escape(id)}"] [data-cell="${k}"]`);
    async function one(p) {
      const res = cell(p.id, 'result');
      try {
        const r = await fetch(`/api/pakwheels?image=0&url=${encodeURIComponent(p.source_url)}`, { headers: { Authorization: `Bearer ${token}` } });
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || `HTTP ${r.status}`);
        const was = d.was && d.was > d.price ? d.was : null;
        const u = await sb().from('products').update({ price: d.price, was, price_checked_at: d.checked }).eq('id', p.id);
        if (u.error) throw u.error;
        cell(p.id, 'checked').textContent = d.checked;
        if (d.price !== p.price) {
          changed++;
          cell(p.id, 'price').innerHTML = `${money(d.price)} <span class="spec-sm muted"><s>${money(p.price)}</s></span>`;
          res.textContent = d.price > p.price ? 'Price went up' : 'Price went down';
          res.className = 'spec-sm';
        } else { res.textContent = 'No change'; }
        Object.assign(p, { price: d.price, was, price_checked_at: d.checked });
      } catch (e) {
        failed++;
        res.textContent = e.message;
        res.className = 'spec-sm field-error';
      }
      done++;
      status.textContent = `Checked ${done} of ${linked.length} · ${changed} changed · ${failed} failed`;
    }
    await Promise.all(Array.from({ length: 3 }, async () => { while (queue.length) await one(queue.shift()); }));
    status.innerHTML = `Done: ${changed} price${changed === 1 ? '' : 's'} changed, ${failed} failed. <button class="link" type="button" onclick="location.reload()">Reload the shop to see them</button>`;
    btn.disabled = false;
  }

  // ---------- events ----------
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-adm]');
    if (!t || !mount || !mount.contains(t)) return;
    const act = t.dataset.adm;
    if (act === 'pw-fetch') pwFetch();
    if (act === 'fit-add') {
      const vid = $('#pf-veh').value;
      const v = data.vehicles.find((x) => x.id === vid);
      if (!v) { $('#pf-veh').focus(); return; }
      const yf = Number($('#pf-yf').value) || v.year_from;
      const yt = Number($('#pf-yt').value) || v.year_to;
      if (yt < yf) { const er = $('#pf-fits-err'); er.hidden = false; er.textContent = '“To” year must be the same as or after “From”'; return; }
      form.fits = form.fits.filter((f) => f.vehicle_id !== vid).concat({ vehicle_id: vid, year_from: yf, year_to: yt });
      $('#pf-veh').value = ''; $('#pf-yf').value = ''; $('#pf-yt').value = '';
      $('#pf-fits-err').hidden = true;
      renderFits();
      $('#pf-veh').focus();
    }
    if (act === 'fit-rm') { form.fits.splice(Number(t.dataset.i), 1); renderFits(); }
    if (act === 'img-remove') { form.image = null; form.imageRemoved = true; form.imageChanged = false; showPreview(null); }
    if (act === 'delete') deleteProduct();
    if (act === 'veh-rm') removeVehicle(t.dataset.id);
    if (act === 'refresh-all') refreshAll();
    if (act === 'order-filter') { orderFilter = t.dataset.f; ordersView(); }
  });
  document.addEventListener('change', (e) => {
    if (!mount || !mount.contains(e.target)) return;
    if (e.target.id === 'pf-file') onFile(e.target.files[0]);
    if (e.target.id === 'pf-universal') syncUniversal();
    if (e.target.id === 'pf-veh') {
      const v = data.vehicles.find((x) => x.id === e.target.value);
      if (v) { $('#pf-yf').value = v.year_from; $('#pf-yt').value = v.year_to; }
    }
  });
  document.addEventListener('submit', (e) => {
    if (e.target.id === 'adm-form') { e.preventDefault(); save(); }
    if (e.target.id === 'veh-form') { e.preventDefault(); addVehicle(e.target); }
    if (e.target.id === 'order-form') { e.preventDefault(); saveOrder(e.target); }
  });

  // Re-draw when sign-in state changes while the admin page is open.
  const watch = () => { if (window.ApexAuth) window.ApexAuth.onChange(() => { if (mount && location.hash.startsWith('#/admin')) { data = null; draw(); } }); else setTimeout(watch, 50); };
  watch();

  window.ApexAdmin = { render };
})();
