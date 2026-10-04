// Reads a PakWheels Auto Store listing: title and current price from the page's Product JSON-LD,
// the struck-through original price, and the main photo (og:image). Shared by api/pakwheels.mjs
// (admin "import from PakWheels") and supabase/seed.mjs (initial import / price refresh).

const UA = 'Mozilla/5.0 (compatible; ApexAutoCatalog/1.0)';

export function isListingUrl(raw) {
  try {
    const u = new URL(raw);
    return u.protocol === 'https:' && u.hostname === 'www.pakwheels.com' && u.pathname.startsWith('/accessories-spare-parts/');
  } catch {
    return false;
  }
}

export function parseListing(html, url) {
  let title = null;
  let price = null;
  let image = null;
  for (const m of html.matchAll(/<script[^>]*application\/ld\+json[^>]*>([\s\S]*?)<\/script>/g)) {
    let json;
    try { json = JSON.parse(m[1]); } catch { continue; }
    for (const node of [].concat(json)) {
      if (![].concat(node['@type']).includes('Product')) continue;
      title = title || node.name || null;
      const offerPrice = [].concat(node.offers || []).map((o) => Number(o.price)).find((n) => n > 0);
      if (offerPrice && !price) price = Math.round(offerPrice);
      image = image || [].concat(node.image || [])[0] || null;
    }
  }
  const og = html.match(/<meta property="og:image" content="([^"]+)"/i);
  if (og) image = og[1];
  const strike = html.match(/discount-strike[^>]*>\s*PKR\s*([\d,]+)/i);
  const was = strike ? Number(strike[1].replace(/,/g, '')) : null;
  return {
    source_url: url,
    title: title ? title.replace(/\.\s*$/, '').trim() : null,
    price,
    was: was && price && was > price ? was : null,
    image_url: image,
  };
}

export async function fetchListing(url, { withImage = true } = {}) {
  if (!isListingUrl(url)) throw new Error('Not a PakWheels Auto Store listing URL');
  const res = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html' }, redirect: 'follow' });
  if (!res.ok) throw new Error(`PakWheels returned HTTP ${res.status}`);
  const data = parseListing(await res.text(), url);
  if (!data.price) throw new Error('Could not find a price on that listing');
  if (withImage && data.image_url) {
    const img = await fetch(data.image_url, { headers: { 'User-Agent': UA } });
    if (img.ok) {
      const mime = (img.headers.get('content-type') || 'image/webp').split(';')[0];
      if (mime.startsWith('image/')) {
        data.image = { mime, base64: Buffer.from(await img.arrayBuffer()).toString('base64') };
      }
    }
  }
  data.checked = new Date().toISOString().slice(0, 10);
  return data;
}
