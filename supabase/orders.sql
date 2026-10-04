-- TeckAuto orders (cash on delivery). Run once in the Supabase SQL editor after schema.sql.
-- Safe to re-run.

create table if not exists public.orders (
  id               text primary key,                      -- e.g. 'TA-482913'
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  status           text not null default 'new'
                   check (status in ('new', 'confirmed', 'dispatched', 'delivered', 'cancelled')),
  customer_name    text not null,
  email            text not null,
  phone            text not null,
  address          text not null,
  city             text not null,
  customer_notes   text,
  admin_notes      text,
  payment_method   text not null default 'cod' check (payment_method = 'cod'),
  shipping_method  text not null check (shipping_method in ('standard', 'express')),
  vehicle          text,
  items            jsonb not null,                        -- [{product_id, title, sku, qty, price, line_total}]
  subtotal         int  not null,
  shipping         int  not null,
  total            int  not null,
  email_sent       boolean not null default false
);
create index if not exists orders_created_idx on public.orders (created_at desc);

-- "create table if not exists" doesn't touch an existing table, so re-apply the delivery rule
-- (earlier versions allowed 'nextday' instead of 'express').
alter table public.orders drop constraint if exists orders_shipping_method_check;
alter table public.orders add constraint orders_shipping_method_check check (shipping_method in ('standard', 'express', 'nextday'));

drop trigger if exists orders_touch on public.orders;
create trigger orders_touch before update on public.orders
  for each row execute function public.touch_updated_at();

-- Only admins can see or change orders. Customers create orders through place_order() below.
alter table public.orders enable row level security;
drop policy if exists "admin read" on public.orders;
create policy "admin read" on public.orders for select using (public.is_admin());
drop policy if exists "admin update" on public.orders;
create policy "admin update" on public.orders for update using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admin delete" on public.orders;
create policy "admin delete" on public.orders for delete using (public.is_admin());

-- Validates the customer's details, prices every line from the products table (the browser's
-- prices are never trusted), adds shipping, and stores the order. Returns the saved order.
create or replace function public.place_order(p jsonb)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_name    text := btrim(coalesce(p->>'name', ''));
  v_email   text := lower(btrim(coalesce(p->>'email', '')));
  v_phone   text := btrim(coalesce(p->>'phone', ''));
  v_address text := btrim(coalesce(p->>'address', ''));
  v_city    text := btrim(coalesce(p->>'city', ''));
  v_notes   text := nullif(btrim(coalesce(p->>'notes', '')), '');
  v_method  text := coalesce(p->>'method', 'standard');
  v_vehicle text := nullif(left(btrim(coalesce(p->>'vehicle', '')), 120), '');
  v_items   jsonb := '[]'::jsonb;
  v_sub     int := 0;
  v_ship    int;
  v_id      text;
  v_qty     int;
  it        jsonb;
  r         record;
begin
  if length(v_name) < 2 or length(v_name) > 100 then raise exception 'Enter your full name'; end if;
  if v_email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' or length(v_email) > 200 then raise exception 'Enter a valid email address'; end if;
  if length(regexp_replace(v_phone, '\D', '', 'g')) not between 10 and 15 then raise exception 'Enter a phone number with 10 to 15 digits'; end if;
  if length(v_address) < 5 or length(v_address) > 300 then raise exception 'Enter your full delivery address'; end if;
  if length(v_city) < 2 or length(v_city) > 80 then raise exception 'Enter your city'; end if;
  if v_notes is not null and length(v_notes) > 1000 then raise exception 'Order notes can be up to 1000 characters'; end if;
  if v_method not in ('standard', 'express') then raise exception 'Choose a delivery option'; end if;
  if jsonb_typeof(p->'items') is distinct from 'array' or jsonb_array_length(p->'items') = 0 then raise exception 'Your cart is empty'; end if;
  if jsonb_array_length(p->'items') > 50 then raise exception 'Too many different items in one order'; end if;

  for it in select * from jsonb_array_elements(p->'items') loop
    v_qty := nullif(it->>'qty', '')::int;
    if v_qty is null or v_qty < 1 or v_qty > 99 then raise exception 'Each quantity must be between 1 and 99'; end if;
    select id, title, sku, price into r from public.products where id = it->>'product_id' and active;
    if not found then raise exception 'A product in your cart is no longer available — remove it and try again'; end if;
    v_items := v_items || jsonb_build_object('product_id', r.id, 'title', r.title, 'sku', r.sku, 'qty', v_qty, 'price', r.price, 'line_total', r.price * v_qty);
    v_sub := v_sub + r.price * v_qty;
  end loop;

  -- Flat delivery charges in PKR. Keep in sync with STD_SHIP / EXPRESS_SHIP in app.js.
  v_ship := case when v_method = 'express' then 600 else 300 end;

  loop
    v_id := 'TA-' || lpad(floor(random() * 1000000)::int::text, 6, '0');
    exit when not exists (select 1 from public.orders where id = v_id);
  end loop;

  insert into public.orders (id, customer_name, email, phone, address, city, customer_notes, shipping_method, vehicle, items, subtotal, shipping, total)
  values (v_id, v_name, v_email, v_phone, v_address, v_city, v_notes, v_method, v_vehicle, v_items, v_sub, v_ship, v_sub + v_ship);

  return (select to_jsonb(o) - 'admin_notes' from public.orders o where o.id = v_id);
end;
$$;
grant execute on function public.place_order(jsonb) to anon, authenticated;

-- Lets the order endpoint record that the notification email went out.
create or replace function public.mark_order_emailed(p_id text)
returns void
language sql
security definer
set search_path = public
as $$ update public.orders set email_sent = true where id = p_id; $$;
grant execute on function public.mark_order_emailed(text) to anon, authenticated;
