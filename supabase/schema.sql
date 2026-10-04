-- ApexAuto spare-parts store — Supabase schema.
-- Run once in the Supabase SQL editor (Project → SQL Editor → New query → paste → Run).
-- Safe to re-run: every statement is idempotent.

-- ---------------------------------------------------------------------------
-- Admins
-- ---------------------------------------------------------------------------
create table if not exists public.admin_users (
  email text primary key
);
insert into public.admin_users (email) values ('aliuppal@gmail.com'), ('teckintl@gmail.com') on conflict do nothing;

-- True when the signed-in user's email is in admin_users. SECURITY DEFINER so it can read
-- admin_users even though that table is locked down by RLS.
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Catalog
-- ---------------------------------------------------------------------------
create table if not exists public.categories (
  id   text primary key,
  name text not null,
  sort int  not null default 0
);

create table if not exists public.vehicles (
  id         text primary key,                  -- e.g. 'toyota-corolla-16'
  make       text not null,
  model      text not null,
  engine     text not null,
  year_from  int  not null check (year_from between 1950 and 2100),
  year_to    int  not null check (year_to >= year_from),
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id               text primary key,            -- 'pw-<number>' for the original catalog, 'ax-<random>' for admin-created
  sku              text,
  part_no          text,
  brand            text not null,
  grade            text not null default 'aftermarket' check (grade in ('oem', 'aftermarket')),
  title            text not null,
  category         text not null references public.categories (id),
  sub              text not null,               -- part type, e.g. 'Brake pads'
  art              text not null default 'oilfilter', -- fallback drawing when there is no photo
  position         text not null default 'na' check (position in ('front', 'rear', 'both', 'na')),
  price            int  not null check (price > 0),   -- PKR, whole rupees
  was              int  check (was is null or was > price),
  unit             text not null default 'Each',
  universal        boolean not null default false,
  description      text,
  source_url       text,                        -- optional reference link
  price_checked_at date,
  active           boolean not null default true,
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

-- Fitment tags: which vehicles (and model years) a product fits.
create table if not exists public.product_fitments (
  product_id text not null references public.products (id) on delete cascade,
  vehicle_id text not null references public.vehicles (id) on delete cascade,
  year_from  int  not null,
  year_to    int  not null check (year_to >= year_from),
  primary key (product_id, vehicle_id)
);
create index if not exists product_fitments_vehicle_idx on public.product_fitments (vehicle_id);

-- One photo per product, stored as base64.
create table if not exists public.product_images (
  product_id  text primary key references public.products (id) on delete cascade,
  mime        text not null check (mime like 'image/%'),
  data_base64 text not null,
  source_url  text,
  updated_at  timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at := now(); return new; end;
$$;
drop trigger if exists products_touch on public.products;
create trigger products_touch before update on public.products
  for each row execute function public.touch_updated_at();
drop trigger if exists product_images_touch on public.product_images;
create trigger product_images_touch before update on public.product_images
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row level security: anyone can read the catalog, only admins can change it.
-- ---------------------------------------------------------------------------
alter table public.admin_users      enable row level security;
alter table public.categories       enable row level security;
alter table public.vehicles         enable row level security;
alter table public.products         enable row level security;
alter table public.product_fitments enable row level security;
alter table public.product_images   enable row level security;

drop policy if exists "admins read admins" on public.admin_users;
create policy "admins read admins" on public.admin_users for select using (public.is_admin());

drop policy if exists "public read" on public.categories;
create policy "public read" on public.categories for select using (true);
drop policy if exists "admin write" on public.categories;
create policy "admin write" on public.categories for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read" on public.vehicles;
create policy "public read" on public.vehicles for select using (true);
drop policy if exists "admin write" on public.vehicles;
create policy "admin write" on public.vehicles for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read active" on public.products;
create policy "public read active" on public.products for select using (active or public.is_admin());
drop policy if exists "admin write" on public.products;
create policy "admin write" on public.products for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read" on public.product_fitments;
create policy "public read" on public.product_fitments for select using (true);
drop policy if exists "admin write" on public.product_fitments;
create policy "admin write" on public.product_fitments for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "public read" on public.product_images;
create policy "public read" on public.product_images for select using (true);
drop policy if exists "admin write" on public.product_images;
create policy "admin write" on public.product_images for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Categories (vehicles and products are managed on the admin page)
-- ---------------------------------------------------------------------------
insert into public.categories (id, name, sort) values
  ('brakes', 'Brakes', 1),
  ('filters', 'Filters', 2),
  ('oils', 'Oils & Coolants', 3),
  ('engine', 'Engine & Ignition', 4),
  ('cooling', 'Cooling', 5),
  ('electrical', 'Electrical', 6)
on conflict (id) do update set name = excluded.name, sort = excluded.sort;
