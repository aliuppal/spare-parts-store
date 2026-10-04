// POST /api/order — places a cash-on-delivery order and emails it to the store admins.
// Body: { name, email, phone, address, city, notes, method, vehicle, items: [{ product_id, qty }] }
// The order is priced and saved by the Supabase function place_order (supabase/orders.sql), so the
// browser's prices are never trusted. Email goes out through Gmail SMTP (SMTP_USER + SMTP_PASS,
// an app password) or Resend (RESEND_API_KEY); if neither is configured the order is still saved
// and shows up on the admin Orders tab.

const RECIPIENTS = (process.env.ORDER_EMAILS || 'aliuppal@gmail.com,teckintl@gmail.com').split(',').map((s) => s.trim()).filter(Boolean);
const money = (n) => 'Rs ' + Math.round(Number(n)).toLocaleString('en-US');
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

async function rpc(name, body) {
  const r = await fetch(`${process.env.SUPABASE_URL}/rest/v1/rpc/${name}`, {
    method: 'POST',
    headers: { apikey: process.env.SUPABASE_ANON_KEY, Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await r.json().catch(() => null);
  if (!r.ok) {
    const err = new Error((data && (data.message || data.hint)) || `Database error ${r.status}`);
    err.status = r.status;
    err.code = data && data.code;
    throw err;
  }
  return data;
}

function compose(o, origin) {
  const ship = o.shipping_method === 'express' ? 'Express (1–2 business days)' : 'Standard (3–5 business days)';
  const lines = o.items.map((i) => `${i.qty} × ${i.title} (${i.sku}) — ${money(i.line_total)}`);
  const text = [
    `New cash-on-delivery order ${o.id}`,
    '',
    `Customer: ${o.customer_name}`,
    `Phone:    ${o.phone}`,
    `Email:    ${o.email}`,
    `Address:  ${o.address}, ${o.city}`,
    o.vehicle ? `Vehicle:  ${o.vehicle}` : null,
    `Delivery: ${ship}`,
    o.customer_notes ? `Notes:    ${o.customer_notes}` : null,
    '',
    ...lines,
    '',
    `Subtotal: ${money(o.subtotal)}`,
    `Shipping: ${o.shipping ? money(o.shipping) : 'Free'}`,
    `Collect on delivery: ${money(o.total)}`,
    '',
    `Manage it: ${origin}/#/admin/orders/${o.id}`,
  ].filter((l) => l !== null).join('\n');
  const row = (k, v) => `<tr><td style="padding:4px 12px 4px 0;color:#64748B">${k}</td><td style="padding:4px 0"><b>${v}</b></td></tr>`;
  const html = `<div style="font-family:Arial,sans-serif;color:#0F172A;max-width:620px">
    <h2 style="margin:0 0 4px">New order ${esc(o.id)}</h2>
    <p style="margin:0 0 16px;color:#C2410C"><b>Cash on delivery · collect ${money(o.total)}</b></p>
    <table style="border-collapse:collapse;font-size:14px">
      ${row('Customer', esc(o.customer_name))}${row('Phone', `<a href="tel:${esc(o.phone)}">${esc(o.phone)}</a>`)}${row('Email', `<a href="mailto:${esc(o.email)}">${esc(o.email)}</a>`)}
      ${row('Address', `${esc(o.address)}, ${esc(o.city)}`)}${o.vehicle ? row('Vehicle', esc(o.vehicle)) : ''}${row('Delivery', ship)}
      ${o.customer_notes ? row('Notes', esc(o.customer_notes)) : ''}
    </table>
    <table style="border-collapse:collapse;width:100%;margin-top:16px;font-size:14px">
      <tr style="background:#F1F5F9"><th align="left" style="padding:8px">Item</th><th style="padding:8px">Qty</th><th align="right" style="padding:8px">Total</th></tr>
      ${o.items.map((i) => `<tr><td style="padding:8px;border-bottom:1px solid #E2E8F0">${esc(i.title)}<br><span style="color:#64748B;font-size:12px">${esc(i.sku)} · ${money(i.price)} each</span></td><td align="center" style="padding:8px;border-bottom:1px solid #E2E8F0">${i.qty}</td><td align="right" style="padding:8px;border-bottom:1px solid #E2E8F0">${money(i.line_total)}</td></tr>`).join('')}
      <tr><td colspan="2" align="right" style="padding:6px 8px">Subtotal</td><td align="right" style="padding:6px 8px">${money(o.subtotal)}</td></tr>
      <tr><td colspan="2" align="right" style="padding:6px 8px">Shipping</td><td align="right" style="padding:6px 8px">${o.shipping ? money(o.shipping) : 'Free'}</td></tr>
      <tr><td colspan="2" align="right" style="padding:6px 8px"><b>Collect on delivery</b></td><td align="right" style="padding:6px 8px"><b>${money(o.total)}</b></td></tr>
    </table>
    <p style="margin-top:20px"><a href="${origin}/#/admin/orders/${esc(o.id)}" style="background:#C2410C;color:#fff;padding:10px 16px;border-radius:4px;text-decoration:none">Open in admin</a></p>
  </div>`;
  return { subject: `New order ${o.id} — ${money(o.total)} COD — ${o.customer_name}, ${o.city}`, text, html };
}

async function sendEmail(msg, replyTo) {
  if (process.env.SMTP_USER && process.env.SMTP_PASS) {
    const nodemailer = (await import('nodemailer')).default;
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    });
    await transport.sendMail({ from: `TeckAuto Orders <${process.env.SMTP_USER}>`, to: RECIPIENTS, replyTo, ...msg });
    return true;
  }
  if (process.env.RESEND_API_KEY) {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: process.env.ORDER_EMAIL_FROM || 'TeckAuto Orders <orders@teckauto.site>', to: RECIPIENTS, reply_to: replyTo, ...msg }),
    });
    if (!r.ok) throw new Error(`Resend ${r.status}: ${await r.text()}`);
    return true;
  }
  return false; // no email provider configured yet
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') return res.status(405).json({ error: 'Use POST' });
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
    return res.status(500).json({ error: 'Ordering is not set up on the server yet' });
  }
  const b = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const payload = {
    name: b.name, email: b.email, phone: b.phone, address: b.address, city: b.city,
    notes: b.notes, method: b.method, vehicle: b.vehicle,
    items: Array.isArray(b.items) ? b.items.map((i) => ({ product_id: String(i.product_id || ''), qty: Number(i.qty) })) : [],
  };

  let order;
  try {
    order = await rpc('place_order', { p: payload });
  } catch (e) {
    // place_order raises plain-language validation messages (SQLSTATE P0001, e.g. "Enter your city");
    // anything else is an internal problem the customer can't fix, so don't show its details.
    if (e.code === 'P0001') return res.status(400).json({ error: e.message });
    console.error('place_order failed:', e.code, e.message);
    return res.status(502).json({ error: 'We couldn’t place your order right now. Please try again in a minute, or call us to order.' });
  }

  let emailed = false;
  try {
    const origin = `https://${req.headers['x-forwarded-host'] || req.headers.host}`;
    emailed = await sendEmail(compose(order, origin), order.email);
    if (emailed) await rpc('mark_order_emailed', { p_id: order.id });
  } catch (e) {
    console.error(`Order ${order.id} saved but the email failed:`, e.message);
  }
  return res.status(200).json({ order, emailed });
}
