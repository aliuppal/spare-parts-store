// Imports the existing catalog (data.js) into Supabase:
//   - vehicles and products with their fitment tags
//   - each product's current price / original price re-read from its PakWheels listing
//   - each product's PakWheels photo, stored as base64 in product_images
//
// Run after supabase/schema.sql, from the spare-parts-store folder:
//   SUPABASE_URL=https://xxxx.supabase.co SUPABASE_SERVICE_ROLE_KEY=... node supabase/seed.mjs
// The service-role key bypasses RLS — keep it out of git and out of the browser.
// Re-running is safe: rows are upserted and prices/photos refreshed.

import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetchListing } from '../lib/pakwheels.mjs';

const URL_ = process.env.SUPABASE_URL;
const KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!URL_ || !KEY) {
  console.error('Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const ctx = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), ctx);
const { VEHICLES, PRODUCTS } = ctx.window;

async function rest(method, table, { body, query = '', prefer } = {}) {
  const r = await fetch(`${URL_}/rest/v1/${table}${query}`, {
    method,
    headers: {
      apikey: KEY,
      Authorization: `Bearer ${KEY}`,
      'Content-Type': 'application/json',
      ...(prefer ? { Prefer: prefer } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!r.ok) throw new Error(`${method} ${table}${query}: ${r.status} ${await r.text()}`);
}
const upsert = (table, rows, onConflict) =>
  rest('POST', table, { body: rows, query: `?on_conflict=${onConflict}`, prefer: 'resolution=merge-duplicates,return=minimal' });

// 1. Vehicles
await upsert('vehicles', VEHICLES.map((v) => ({
  id: v.id, make: v.make, model: v.model, engine: v.engine, year_from: v.years[0], year_to: v.years[1],
})), 'id');
console.log(`vehicles: ${VEHICLES.length}`);
const vYears = Object.fromEntries(VEHICLES.map((v) => [v.id, v.years]));

// 2. Products, fitments and photos — 4 listings at a time to stay polite to PakWheels
const report = { ok: 0, priceChanged: [], failed: [] };
async function importProduct(p) {
  let fresh = null;
  if (p.src) {
    try { fresh = await fetchListing(p.src); } catch (e) { report.failed.push(`${p.id}: ${e.message}`); }
  }
  const price = fresh?.price ?? p.price;
  const was = fresh ? fresh.was : (p.was ?? null);
  if (fresh && fresh.price !== p.price) report.priceChanged.push(`${p.id} ${p.title}: Rs ${p.price} → Rs ${fresh.price}`);

  const universal = p.fits.includes('universal');
  await upsert('products', [{
    id: p.id,
    sku: p.sku,
    part_no: p.sku && !p.sku.startsWith('PW-') ? p.sku : null,
    brand: p.brand,
    grade: p.grade === 'oem' ? 'oem' : 'aftermarket',
    title: p.title,
    category: p.category,
    sub: p.sub,
    art: p.art,
    position: p.position || 'na',
    price,
    was: was && was > price ? was : null,
    unit: p.unit,
    universal,
    description: p.desc,
    source_url: p.src || null,
    price_checked_at: fresh?.checked ?? p.checked ?? null,
    active: true,
  }], 'id');

  await rest('DELETE', 'product_fitments', { query: `?product_id=eq.${encodeURIComponent(p.id)}` });
  if (!universal) {
    const rows = p.fits.map((f) => {
      const [vehicle_id, yrs] = f.split('@');
      const [year_from, year_to] = yrs ? yrs.split('-').map(Number) : vYears[vehicle_id];
      return { product_id: p.id, vehicle_id, year_from, year_to };
    });
    await rest('POST', 'product_fitments', { body: rows, prefer: 'return=minimal' });
  }

  if (fresh?.image) {
    await upsert('product_images', [{
      product_id: p.id, mime: fresh.image.mime, data_base64: fresh.image.base64, source_url: fresh.image_url,
    }], 'product_id');
  }
  report.ok++;
  process.stdout.write(`\rproducts: ${report.ok}/${PRODUCTS.length}`);
}

const queue = [...PRODUCTS];
await Promise.all(Array.from({ length: 4 }, async () => {
  while (queue.length) await importProduct(queue.shift());
}));

console.log(`\n\nprice changes since data.js (${report.priceChanged.length}):`);
report.priceChanged.forEach((l) => console.log('  ' + l));
console.log(`listings that could not be refreshed (${report.failed.length}) — kept data.js price, no photo:`);
report.failed.forEach((l) => console.log('  ' + l));
