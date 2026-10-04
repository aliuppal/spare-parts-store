// GET /api/pakwheels?url=<PakWheels Auto Store listing>[&image=0]
// Admin-only: returns the listing's title, current price, original price and photo (base64).
// Browsers can't fetch PakWheels directly (CORS), so the admin page calls this instead.
import { fetchListing, isListingUrl } from '../lib/pakwheels.mjs';

async function isAdmin(token) {
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;
  if (!url || !anon || !token) return false;
  const r = await fetch(`${url}/rest/v1/rpc/is_admin`, {
    method: 'POST',
    headers: { apikey: anon, Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    body: '{}',
  });
  return r.ok && (await r.json()) === true;
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'GET') return res.status(405).json({ error: 'Use GET' });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: 'Server is missing SUPABASE_URL / SUPABASE_ANON_KEY' });
  }
  const token = String(req.headers.authorization || '').replace(/^Bearer\s+/i, '');
  if (!(await isAdmin(token))) return res.status(403).json({ error: 'Admins only — sign in with the admin Google account' });

  const listing = String(req.query.url || '');
  if (!isListingUrl(listing)) return res.status(400).json({ error: 'Paste a https://www.pakwheels.com/accessories-spare-parts/… listing link' });
  try {
    const data = await fetchListing(listing, { withImage: req.query.image !== '0' });
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ error: e.message });
  }
}
