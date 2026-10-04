/* Boot loader: signs the user in (Google via Supabase), loads the catalog from Supabase when
   config.js is filled in (falling back to the bundled data.js), lazy-loads base64 product photos,
   then starts app.js. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const icon = (id, cls = '') => `<svg class="icon ${cls}" aria-hidden="true"><use href="#i-${id}"/></svg>`;

  const cfg = window.APEX_CONFIG || {};
  const sb = cfg.supabaseUrl && cfg.supabaseAnonKey && window.supabase
    ? window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, {
      auth: { flowType: 'pkce', detectSessionInUrl: true, persistSession: true },
    })
    : null;

  // ---------- auth ----------
  const listeners = new Set();
  const Auth = {
    sb,
    user: null,
    isAdmin: false,
    onChange(fn) { listeners.add(fn); },
    async signIn() {
      sessionStorage.setItem('apex.afterLogin', location.hash || '#/');
      const { error } = await sb.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: location.origin + location.pathname },
      });
      if (error) alert(`Google sign-in failed: ${error.message}`);
    },
    async signOut() { await sb.auth.signOut(); },
    async token() { const { data } = await sb.auth.getSession(); return data.session ? data.session.access_token : null; },
  };
  window.ApexAuth = Auth;

  async function refreshAuth(session) {
    Auth.user = session ? session.user : null;
    Auth.isAdmin = false;
    if (Auth.user) {
      const { data, error } = await sb.rpc('is_admin');
      Auth.isAdmin = !error && data === true;
    }
    renderAccount();
    listeners.forEach((fn) => fn());
  }

  function renderAccount() {
    const slot = $('#account-slot');
    if (!slot) return;
    if (!sb) { slot.hidden = true; return; }
    slot.hidden = false;
    const u = Auth.user;
    if (!u) {
      slot.innerHTML = `<button class="icon-btn account-btn" type="button" data-acct="signin" aria-label="Sign in with Google" title="Sign in">${icon('user')}</button>`;
      return;
    }
    const name = (u.user_metadata && (u.user_metadata.full_name || u.user_metadata.name)) || u.email;
    slot.innerHTML = `<button class="icon-btn account-btn is-in" type="button" data-acct="menu" aria-haspopup="menu" aria-expanded="false" aria-label="Account: ${esc(u.email)}">
        <span class="avatar">${esc((name || '?').trim().charAt(0).toUpperCase())}</span></button>
      <div class="account-menu panel" role="menu" hidden>
        <p class="spec-sm muted">Signed in as</p><p class="account-email">${esc(u.email)}</p>
        ${Auth.isAdmin ? `<a class="btn btn-secondary btn-block" role="menuitem" href="#/admin">${icon('lock')}Admin</a>` : ''}
        <button class="btn btn-outline btn-block" type="button" role="menuitem" data-acct="signout">Sign out</button>
      </div>`;
  }

  document.addEventListener('click', (e) => {
    const t = e.target.closest('[data-acct]');
    const menu = $('#account-slot .account-menu');
    if (!t) { if (menu && !e.target.closest('.account-menu')) closeMenu(); return; }
    const act = t.dataset.acct;
    if (act === 'signin') Auth.signIn();
    if (act === 'signout') { closeMenu(); Auth.signOut(); }
    if (act === 'menu') {
      const open = menu.hidden;
      menu.hidden = !open;
      t.setAttribute('aria-expanded', String(open));
    }
  });
  document.addEventListener('click', (e) => { if (e.target.closest('.account-menu a')) closeMenu(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  function closeMenu() {
    const menu = $('#account-slot .account-menu');
    if (menu && !menu.hidden) { menu.hidden = true; const b = $('#account-slot [data-acct="menu"]'); if (b) b.setAttribute('aria-expanded', 'false'); }
  }

  // ---------- catalog ----------
  function listedFit(fits, vehicles) {
    if (fits.includes('universal')) return 'Universal — match the spec to your owner’s manual';
    return fits.map((f) => {
      const [id, yrs] = f.split('@');
      const v = vehicles.find((x) => x.id === id);
      return v ? `${v.make} ${v.model} ${v.engine.split(' (')[0]} (${yrs ? yrs.replace('-', '–') : v.years.join('–')})` : id;
    }).join('; ');
  }

  async function loadFromSupabase() {
    const [p, v, c] = await Promise.all([
      sb.from('products').select('*, product_fitments(vehicle_id, year_from, year_to), product_images(product_id)').eq('active', true).order('created_at'),
      sb.from('vehicles').select('*').order('make').order('model').order('year_from'),
      sb.from('categories').select('*').order('sort'),
    ]);
    for (const r of [p, v, c]) if (r.error) throw r.error;
    if (!p.data.length || !v.data.length) throw new Error('Supabase catalog is empty — run supabase/seed.mjs');

    const vehicles = v.data.map((x) => ({ id: x.id, make: x.make, model: x.model, engine: x.engine, years: [x.year_from, x.year_to] }));
    const products = p.data.map((r) => {
      const fits = r.universal ? ['universal'] : (r.product_fitments || []).map((f) => `${f.vehicle_id}@${f.year_from}-${f.year_to}`);
      const img = Array.isArray(r.product_images) ? r.product_images[0] : r.product_images;
      const specs = [['Brand', r.brand]];
      if (r.part_no) specs.push(['Part no.', r.part_no]);
      specs.push(['Listed fitment', listedFit(fits, vehicles)], ['Pack', r.unit]);
      return {
        id: r.id,
        sku: r.sku || r.part_no || r.id.toUpperCase(),
        oem: r.grade === 'oem' ? r.part_no : null,
        brand: r.brand,
        grade: r.grade === 'oem' ? 'oem' : 'performance',
        title: r.title,
        category: r.category,
        sub: r.sub,
        art: r.art,
        position: r.position,
        price: r.price,
        was: r.was || undefined,
        unit: r.unit,
        stock: 99,
        fits,
        src: r.source_url || undefined,
        checked: r.price_checked_at || undefined,
        hasImg: !!img,
        specs,
        desc: r.description || '',
      };
    });
    window.VEHICLES = vehicles;
    window.CATEGORIES = c.data.map((x) => ({ id: x.id, name: x.name }));
    window.PRODUCTS = products;
  }

  // ---------- base64 photos, fetched only for products that are on screen ----------
  const imgCache = new Map(); // product id -> data URL, or null when it has none
  const inflight = new Set();
  const wanted = new Set();
  let timer = null;

  function applyPhoto(img, url) {
    img.classList.remove('pending');
    const box = img.parentNode;
    if (!url) { box.classList.add('no-photo'); return; }
    img.src = url;
    box.classList.add('has-photo');
  }
  function hydrate() {
    document.querySelectorAll('img.photo.pending[data-pid]').forEach((img) => {
      const id = img.dataset.pid;
      if (imgCache.has(id)) applyPhoto(img, imgCache.get(id));
      else if (!inflight.has(id)) wanted.add(id);
    });
    if (wanted.size && !timer) timer = setTimeout(fetchWanted, 30);
  }
  async function fetchWanted() {
    timer = null;
    const ids = [...wanted];
    wanted.clear();
    ids.forEach((id) => inflight.add(id));
    for (let i = 0; i < ids.length; i += 12) {
      const chunk = ids.slice(i, i + 12);
      const { data, error } = await sb.from('product_images').select('product_id, mime, data_base64').in('product_id', chunk);
      if (!error) data.forEach((r) => imgCache.set(r.product_id, `data:${r.mime};base64,${r.data_base64}`));
      chunk.forEach((id) => { if (!imgCache.has(id) && !error) imgCache.set(id, null); inflight.delete(id); });
    }
    hydrate();
  }
  window.ApexImages = {
    set(id, dataUrl) { imgCache.set(id, dataUrl); },
    hydrate,
  };

  // ---------- boot ----------
  async function boot() {
    if (sb) {
      const params = new URLSearchParams(location.search);
      const loginError = params.get('error_description') || params.get('error');
      const { data } = await sb.auth.getSession(); // also completes the Google redirect (?code=…)
      if (params.has('code') || loginError) {
        if (loginError) sessionStorage.setItem('apex.loginError', loginError);
        const back = sessionStorage.getItem('apex.afterLogin') || location.hash || '#/';
        sessionStorage.removeItem('apex.afterLogin');
        history.replaceState(null, '', location.pathname + back);
      }
      sb.auth.onAuthStateChange((event, session) => { if (event !== 'INITIAL_SESSION') refreshAuth(session); });
      await refreshAuth(data.session);
      try {
        await loadFromSupabase();
        window.APEX_SOURCE = 'supabase';
        new MutationObserver(hydrate).observe(document.body, { childList: true, subtree: true });
      } catch (e) {
        console.warn('Using bundled data.js catalog:', e.message || e);
        window.APEX_SOURCE = 'data.js';
      }
    } else {
      renderAccount();
      window.APEX_SOURCE = 'data.js';
    }
    const s = document.createElement('script');
    s.src = 'app.js';
    document.body.appendChild(s);
  }
  boot();
})();
