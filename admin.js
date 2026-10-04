/* Admin page (#/admin): manage products (photo stored as base64 in Supabase, vehicle fitment
   tags), vehicles and orders. Only shown to admins; Supabase RLS enforces it. */
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
    // Review queue needs supabase/candidates.sql.
    const q = await sb().from('product_candidates').select('*').eq('status', 'pending').order('found_at', { ascending: false }).limit(100);
    data = {
      products: p.data, vehicles: v.data, cats: c.data,
      orders: o.error ? null : o.data, ordersError: o.error ? o.error.message : null,
      candidates: q.error ? null : q.data, candidatesError: q.error ? q.error.message : null,
    };
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
    const tab = ['vehicles', 'orders', 'review'].includes(route[0]) ? route[0] : 'products';
    const titles = { products: 'Products', vehicles: 'Vehicles', orders: 'Orders', review: 'Review new products' };
    mount.innerHTML = `<div class="wrap page admin">
      <div class="adm-head">
        <div><p class="label-caps muted">Store admin</p><h1>${titles[tab]}</h1></div>
        <a class="btn btn-primary" href="#/admin/new">${icon('plus')}Add product</a>
      </div>
      <nav class="adm-tabs" aria-label="Admin sections">
        <a href="#/admin/orders"${tab === 'orders' ? ' aria-current="page"' : ''}>Orders <span class="count-pill" id="adm-new-count" hidden></span></a>
        <a href="#/admin/review"${tab === 'review' ? ' aria-current="page"' : ''}>Review <span class="count-pill" id="adm-review-count" hidden></span></a>
        <a href="#/admin"${tab === 'products' ? ' aria-current="page"' : ''}>Products</a>
        <a href="#/admin/vehicles"${tab === 'vehicles' ? ' aria-current="page"' : ''}>Vehicles</a>
      </nav>
      ${flash()}
      <div id="adm-body"><div class="skel" style="height:320px"></div></div>
    </div>`;
    try {
      if (!data || (data.stale && tab !== 'review')) await load();
    } catch (e) {
      $('#adm-body').innerHTML = `<div class="panel state" role="alert"><div class="state-icon">${icon('alert', 'icon-lg')}</div><h2>Couldn't load the catalog</h2><p>${esc(e.message)}</p><div class="actions"><button class="btn btn-primary" type="button" onclick="location.reload()">Retry</button></div></div>`;
      return;
    }
    const newCount = (data.orders || []).filter((o) => o.status === 'new').length;
    const pill = $('#adm-new-count');
    if (pill && newCount) { pill.hidden = false; pill.textContent = newCount; pill.setAttribute('aria-label', `${newCount} new`); }
    if (route[0] === 'new') return productForm(null);
    if (route[0] === 'p') return productForm(route[1]);
    const rc = (data.candidates || []).length;
    const rpill = $('#adm-review-count');
    if (rpill && rc) { rpill.hidden = false; rpill.textContent = rc; rpill.setAttribute('aria-label', `${rc} waiting`); }
    if (tab === 'orders') return route[1] ? orderDetail(route[1]) : ordersView();
    if (tab === 'review') return reviewView();
    if (tab === 'vehicles') return vehiclesView();
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
    };
    const subs = [...new Set(data.products.map((x) => x.sub))].sort();
    const brands = [...new Set(data.products.map((x) => x.brand))].sort();
    const field = (name, label, input, cls = '', hint = '') => `<div class="field ${cls}"><label for="pf-${name}">${label}</label>${input}${hint ? `<p class="hint">${hint}</p>` : ''}<p class="field-error" id="pf-${name}-err" hidden></p></div>`;
    const val = (k, d = '') => esc(p && p[k] != null ? p[k] : d);

    $('#adm-body').innerHTML = `<form class="adm-form" id="adm-form" novalidate>
      <div class="form-error-banner" id="pf-banner" role="alert" hidden></div>

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
          ${field('price', 'Price (Rs)', `<input class="input mono" id="pf-price" name="price" inputmode="numeric" value="${val('price')}" required>`, 'half')}
          ${field('was', 'Original price (Rs)', `<input class="input mono" id="pf-was" name="was" inputmode="numeric" value="${val('was')}">`, 'half', 'Leave empty if not on sale.')}
        </div>
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
      active: f.elements.active.checked, price: int(get('price')), was: int(get('was')),
      universal: $('#pf-universal').checked,
    };
    const errs = [];
    const need = (k, label) => { if (!row[k]) { setErr(k, `${label} is required`); errs.push(k); } else setErr(k, ''); };
    need('title', 'Title'); need('brand', 'Brand'); need('category', 'Category'); need('sub', 'Part type');
    if (!Number.isInteger(row.price) || row.price <= 0) { setErr('price', 'Enter the price in whole rupees, e.g. 5499'); errs.push('price'); } else setErr('price', '');
    if (row.was != null && (!Number.isInteger(row.was) || row.was <= (row.price || 0))) { setErr('was', 'Original price must be higher than the price'); errs.push('was'); } else setErr('was', '');
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
        r = await s.from('product_images').upsert({ product_id: id, mime: form.image.mime, data_base64: form.image.base64 });
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
      form.image = { mime, base64 };
      form.imageChanged = true;
      form.imageRemoved = false;
      showPreview(url);
    } catch (e) {
      err.hidden = false;
      err.textContent = e.message;
    }
  }

  async function deleteProduct() {
    const p = data.products.find((x) => x.id === form.id);
    if (!p || !confirm(`Delete “${p.title}”? This removes its photo and vehicle tags too, and can't be undone.`)) return;
    const r = await sb().from('products').delete().eq('id', p.id);
    if (r.error) { alert(`Couldn't delete: ${r.error.message}`); return; }
    reloadWith(`Deleted “${p.title}”`);
  }

  // ---------- review queue (new products found by the daily job) ----------
  function reviewView() {
    if (!data.candidates) {
      $('#adm-body').innerHTML = `<div class="panel state"><div class="state-icon">${icon('search', 'icon-lg')}</div>
        <h2>The review queue isn't set up yet</h2><p>Run <b>supabase/candidates.sql</b> in the Supabase SQL editor, then reload this page.</p>
        <p class="spec-sm muted">${esc(data.candidatesError || '')}</p></div>`;
      return;
    }
    if (!data.candidates.length) {
      $('#adm-body').innerHTML = `<div class="panel state"><div class="state-icon">${icon('check', 'icon-lg')}</div>
        <h2>Nothing waiting for review</h2><p>The daily 7 PM job adds new products here. Approve them to put them in the shop, or reject them so they aren't suggested again.</p></div>`;
      return;
    }
    const vName = (id) => { const v = data.vehicles.find((x) => x.id === id); return v ? `${v.make} ${v.model} · ${v.engine}` : id; };
    $('#adm-body').innerHTML = `<p class="hint adm-review-intro">${data.candidates.length} new product${data.candidates.length === 1 ? '' : 's'} found. Check the details, adjust anything that's wrong, then approve or reject. Nothing appears in the shop until you approve it.</p>
      <div class="adm-review">${data.candidates.map((c) => `
      <article class="panel adm-cand" data-cand="${c.id}">
        <div class="media adm-cand-photo${c.image_base64 ? ' has-photo' : ''}">${c.image_base64 ? `<img class="photo" src="data:${esc(c.image_mime)};base64,${c.image_base64}" alt="">` : '<p class="muted spec-sm">No photo</p>'}</div>
        <div class="adm-cand-body">
          <div class="fields">
            <div class="field"><label for="cd-title-${c.id}">Title</label><input class="input" id="cd-title-${c.id}" data-k="title" value="${esc(c.title)}"></div>
            <div class="field half"><label for="cd-brand-${c.id}">Brand</label><input class="input" id="cd-brand-${c.id}" data-k="brand" value="${esc(c.brand || '')}" placeholder="Unbranded"></div>
            <div class="field half"><label for="cd-part-${c.id}">Part number</label><input class="input" id="cd-part-${c.id}" data-k="part_no" value="${esc(c.part_no || '')}"></div>
            <div class="field half"><label for="cd-cat-${c.id}">Category</label><select class="input" id="cd-cat-${c.id}" data-k="category"><option value="">Choose…</option>${data.cats.map((x) => `<option value="${esc(x.id)}"${c.category === x.id ? ' selected' : ''}>${esc(x.name)}</option>`).join('')}</select></div>
            <div class="field half"><label for="cd-sub-${c.id}">Part type</label><input class="input" id="cd-sub-${c.id}" data-k="sub" value="${esc(c.sub || '')}" placeholder="e.g. Brake pads"></div>
            <div class="field half"><label for="cd-price-${c.id}">Price (Rs)</label><input class="input mono" id="cd-price-${c.id}" data-k="price" inputmode="numeric" value="${c.price}"></div>
            <div class="field half"><label for="cd-was-${c.id}">Original price (Rs)</label><input class="input mono" id="cd-was-${c.id}" data-k="was" inputmode="numeric" value="${c.was || ''}"></div>
          </div>
          <div class="adm-cand-fits">
            <p class="label-caps muted">Fits</p>
            ${c.universal ? '<p class="spec-sm">Universal</p>' : c.fits.length ? `<ul class="chips">${c.fits.map((f) => `<li class="chip spec-sm">${esc(vName(f.vehicle_id))} (${f.year_from}–${f.year_to})</li>`).join('')}</ul>` : '<p class="field-error">No vehicle matched — tag it after approving from Products, or mark universal.</p>'}
            <label class="adm-check"><input type="checkbox" data-k="universal"${c.universal ? ' checked' : ''}> Universal (fits any vehicle)</label>
          </div>
          ${c.notes ? `<p class="spec-sm muted adm-cand-notes">${icon('info', 'icon-sm')}${esc(c.notes)}</p>` : ''}
          <p class="spec-sm muted">Found ${when(c.found_at)} · <a class="link" href="${esc(c.source_url)}" target="_blank" rel="noopener">Source link</a></p>
          <p class="field-error adm-cand-err" role="alert" hidden></p>
          <div class="adm-cand-actions">
            <button class="btn btn-outline" type="button" data-adm="cand-reject" data-id="${c.id}">${icon('x')}Reject</button>
            <button class="btn btn-primary" type="button" data-adm="cand-approve" data-id="${c.id}">${icon('check')}Approve &amp; add to shop</button>
          </div>
        </div>
      </article>`).join('')}</div>`;
  }

  function candidateOverrides(card) {
    const val = (k) => { const el = card.querySelector(`[data-k="${k}"]`); return el ? el.value.trim() : ''; };
    const num = (k) => { const s = val(k).replace(/[,\s]/g, ''); return s === '' ? null : Number(s); };
    return {
      title: val('title'), brand: val('brand'), part_no: val('part_no'), category: val('category'), sub: val('sub'),
      price: num('price'), was: num('was'), universal: card.querySelector('[data-k="universal"]').checked,
    };
  }

  function removeCandidateCard(id, message) {
    data.candidates = data.candidates.filter((c) => String(c.id) !== String(id));
    const pill = $('#adm-review-count');
    if (pill) { pill.hidden = !data.candidates.length; pill.textContent = data.candidates.length; }
    reviewView();
    const intro = $('#adm-body');
    intro.insertAdjacentHTML('afterbegin', `<p class="notice notice-fit adm-flash" role="status">${icon('check', 'icon-sm')}${esc(message)}</p>`);
  }

  async function decideCandidate(id, approve, btn) {
    const card = $(`[data-cand="${id}"]`);
    const err = card.querySelector('.adm-cand-err');
    err.hidden = true;
    const o = candidateOverrides(card);
    if (approve) {
      const problem = !o.title ? 'Enter a title' : !o.category ? 'Choose a category' : !o.sub ? 'Enter the part type'
        : !Number.isInteger(o.price) || o.price <= 0 ? 'Enter the price in whole rupees'
          : o.was != null && (!Number.isInteger(o.was) || o.was <= o.price) ? 'Original price must be higher than the price' : '';
      if (problem) { err.hidden = false; err.textContent = problem; return; }
    }
    card.querySelectorAll('button').forEach((b) => (b.disabled = true));
    btn.innerHTML = '<span class="spinner" aria-hidden="true"></span>' + (approve ? 'Adding…' : 'Rejecting…');
    const r = approve
      ? await sb().rpc('approve_product_candidate', { p_id: id, p: o })
      : await sb().from('product_candidates').update({ status: 'rejected', reviewed_at: new Date().toISOString(), image_base64: null }).eq('id', id);
    if (r.error) {
      card.querySelectorAll('button').forEach((b) => (b.disabled = false));
      btn.innerHTML = approve ? `${icon('check')}Approve &amp; add to shop` : `${icon('x')}Reject`;
      err.hidden = false;
      err.textContent = `Couldn't ${approve ? 'approve' : 'reject'}: ${r.error.message}`;
      return;
    }
    data.stale = true; // products changed; reload from Supabase on the next tab change
    removeCandidateCard(id, approve ? `Added “${o.title}” to the shop.` : `Rejected “${o.title}” — it won't be suggested again.`);
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
          <p class="spec-sm muted">Placed ${new Date(o.created_at).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })} · ${o.shipping_method === 'express' ? 'Express' : 'Standard'} delivery · Cash on delivery · ${o.email_sent ? 'Emailed to admins' : 'Not emailed'}</p>
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

  // ---------- events ----------
  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-adm]');
    if (!t || !mount || !mount.contains(t)) return;
    const act = t.dataset.adm;
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
    if (act === 'order-filter') { orderFilter = t.dataset.f; ordersView(); }
    if (act === 'cand-approve') decideCandidate(Number(t.dataset.id), true, t);
    if (act === 'cand-reject') decideCandidate(Number(t.dataset.id), false, t);
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
