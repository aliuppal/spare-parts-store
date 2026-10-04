-- TeckAuto new-product review queue. Run once in the Supabase SQL editor (safe to re-run).
--
-- A daily Claude routine finds new spare-part listings (PakWheels Auto Store and Daraz) for the garage vehicles and submits them
-- here as *pending* candidates. Nothing reaches the shop until an admin approves it on
-- Admin → Review, which copies the candidate into products / product_fitments / product_images.

-- Secrets readable only by SECURITY DEFINER functions (RLS on, no policies).
create table if not exists public.app_secrets (
  name  text primary key,
  value text not null
);
alter table public.app_secrets enable row level security;
-- SHA-256 of the routine's token. The token itself lives only in the Claude routine's prompt.
insert into public.app_secrets (name, value)
values ('scraper_token_sha256', 'bb82951d7e4e021e8ab438fb4e0b10f7e59fc3f9b415840510cf3900b793a93e')
on conflict (name) do update set value = excluded.value;

create table if not exists public.product_candidates (
  id           bigint generated always as identity primary key,
  listing_id   text not null unique,                 -- '12345678' (PakWheels) or 'dz-123456789' (Daraz); skips repeats
  source_url   text not null,
  title        text not null,
  brand        text,
  category     text references public.categories (id),
  sub          text,                                 -- part type, e.g. 'Brake pads'
  grade        text not null default 'aftermarket' check (grade in ('oem', 'aftermarket')),
  position     text not null default 'na' check (position in ('front', 'rear', 'both', 'na')),
  part_no      text,
  unit         text not null default 'Each',
  price        int  not null check (price > 0),
  was          int,
  fits         jsonb not null default '[]'::jsonb,    -- [{vehicle_id, year_from, year_to}]
  universal    boolean not null default false,
  image_mime   text,
  image_base64 text,
  notes        text,                                 -- why the routine picked it / anything to check
  status       text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  product_id   text,                                 -- set when approved
  found_at     timestamptz not null default now(),
  reviewed_at  timestamptz
);
create index if not exists product_candidates_status_idx on public.product_candidates (status, found_at desc);

alter table public.product_candidates enable row level security;
drop policy if exists "admin all" on public.product_candidates;
create policy "admin all" on public.product_candidates for all using (public.is_admin()) with check (public.is_admin());

create or replace function public.scraper_token_ok(p_token text)
returns boolean language sql stable security definer set search_path = public as $$
  select coalesce(p_token, '') <> '' and encode(sha256(convert_to(p_token, 'utf8')), 'hex') =
         (select value from public.app_secrets where name = 'scraper_token_sha256');
$$;
revoke execute on function public.scraper_token_ok(text) from public, anon, authenticated;

-- Listing numbers the routine should skip: already in the shop, or already reviewed/queued.
create or replace function public.scraper_known_listings(p_token text)
returns text[] language plpgsql stable security definer set search_path = public as $$
begin
  if not public.scraper_token_ok(p_token) then raise exception 'Not authorised'; end if;
  return array(
    select regexp_replace(id, '^(pw|tk)-', '') from public.products where id ~ '^(pw|tk)-(dz-)?\d+$'
    union
    select listing_id from public.product_candidates
  );
end;
$$;
grant execute on function public.scraper_known_listings(text) to anon, authenticated;

-- Called by the routine for each new listing. Returns 'queued', 'duplicate' or 'in_shop'.
create or replace function public.submit_product_candidate(p jsonb, p_token text)
returns text language plpgsql security definer set search_path = public as $$
declare
  v_listing text := btrim(coalesce(p->>'listing_id', ''));
  v_fits    jsonb := '[]'::jsonb;
  f         jsonb;
begin
  if not public.scraper_token_ok(p_token) then raise exception 'Not authorised'; end if;
  if v_listing !~ '^(\d{3,12}|dz-\d{3,15})$' then raise exception 'listing_id must be the PakWheels listing number or dz-<Daraz item id>'; end if;
  if coalesce(btrim(p->>'title'), '') = '' then raise exception 'title is required'; end if;
  if coalesce((p->>'price')::int, 0) <= 0 then raise exception 'price must be a positive whole number of rupees'; end if;
  if exists (select 1 from public.products where id in ('pw-' || v_listing, 'tk-' || v_listing)) then return 'in_shop'; end if;

  -- keep only fitment tags for vehicles that exist
  for f in select * from jsonb_array_elements(coalesce(p->'fits', '[]'::jsonb)) loop
    if exists (select 1 from public.vehicles where id = f->>'vehicle_id') then
      v_fits := v_fits || jsonb_build_object('vehicle_id', f->>'vehicle_id',
        'year_from', coalesce((f->>'year_from')::int, (select year_from from public.vehicles where id = f->>'vehicle_id')),
        'year_to',   coalesce((f->>'year_to')::int,   (select year_to   from public.vehicles where id = f->>'vehicle_id')));
    end if;
  end loop;

  insert into public.product_candidates (listing_id, source_url, title, brand, category, sub, grade, position, part_no, unit,
                                         price, was, fits, universal, image_mime, image_base64, notes)
  values (
    v_listing,
    left(coalesce(p->>'source_url', ''), 500),
    left(btrim(p->>'title'), 200),
    nullif(left(btrim(coalesce(p->>'brand', '')), 80), ''),
    (select id from public.categories where id = p->>'category'),
    nullif(left(btrim(coalesce(p->>'sub', '')), 60), ''),
    case when p->>'grade' = 'oem' then 'oem' else 'aftermarket' end,
    case when p->>'position' in ('front', 'rear', 'both') then p->>'position' else 'na' end,
    nullif(left(btrim(coalesce(p->>'part_no', '')), 60), ''),
    coalesce(nullif(left(btrim(coalesce(p->>'unit', '')), 40), ''), 'Each'),
    (p->>'price')::int,
    case when (p->>'was')::int > (p->>'price')::int then (p->>'was')::int end,
    v_fits,
    coalesce((p->>'universal')::boolean, false),
    case when p->>'image_mime' like 'image/%' then p->>'image_mime' end,
    case when length(coalesce(p->>'image_base64', '')) between 100 and 2000000 then p->>'image_base64' end,
    left(p->>'notes', 1000)
  )
  on conflict (listing_id) do nothing;
  return case when found then 'queued' else 'duplicate' end;
end;
$$;
grant execute on function public.submit_product_candidate(jsonb, text) to anon, authenticated;

-- Admin approval: copies a candidate (with any edits from the review screen) into the shop.
create or replace function public.approve_product_candidate(p_id bigint, p jsonb default '{}'::jsonb)
returns text language plpgsql security definer set search_path = public as $$
declare
  c    public.product_candidates;
  v_id text;
  v_universal boolean;
begin
  if not public.is_admin() then raise exception 'Admins only'; end if;
  select * into c from public.product_candidates where id = p_id for update;
  if not found then raise exception 'Candidate not found'; end if;
  if c.status <> 'pending' then raise exception 'This candidate was already %', c.status; end if;

  v_id := 'tk-' || c.listing_id;
  v_universal := coalesce((p->>'universal')::boolean, c.universal);
  if coalesce(p->>'category', c.category) is null then raise exception 'Choose a category before approving'; end if;
  if not v_universal and jsonb_array_length(coalesce(p->'fits', c.fits)) = 0 then
    raise exception 'Tag at least one vehicle, or mark it universal, before approving';
  end if;

  insert into public.products (id, sku, part_no, brand, grade, title, category, sub, art, position, price, was, unit, universal, description, active)
  values (
    v_id,
    coalesce(nullif(p->>'part_no', ''), c.part_no, upper(v_id)),
    coalesce(nullif(p->>'part_no', ''), c.part_no),
    coalesce(nullif(p->>'brand', ''), c.brand, 'Unbranded'),
    coalesce(nullif(p->>'grade', ''), c.grade),
    coalesce(nullif(p->>'title', ''), c.title),
    coalesce(nullif(p->>'category', ''), c.category),
    coalesce(nullif(p->>'sub', ''), c.sub, 'Parts'),
    case coalesce(nullif(p->>'category', ''), c.category)
      when 'brakes' then 'pads' when 'filters' then 'oilfilter' when 'oils' then 'fluid'
      when 'engine' then 'plug' when 'cooling' then 'radiator' when 'electrical' then 'battery' else 'oilfilter' end,
    coalesce(nullif(p->>'position', ''), c.position),
    coalesce((p->>'price')::int, c.price),
    case when coalesce((p->>'was')::int, c.was) > coalesce((p->>'price')::int, c.price) then coalesce((p->>'was')::int, c.was) end,
    coalesce(nullif(p->>'unit', ''), c.unit),
    v_universal,
    'Confirm against your old part number before fitting.',
    true
  );

  if not v_universal then
    insert into public.product_fitments (product_id, vehicle_id, year_from, year_to)
    select v_id, f->>'vehicle_id', (f->>'year_from')::int, (f->>'year_to')::int
    from jsonb_array_elements(coalesce(p->'fits', c.fits)) f
    where exists (select 1 from public.vehicles v where v.id = f->>'vehicle_id')
    on conflict do nothing;
  end if;

  if c.image_base64 is not null then
    insert into public.product_images (product_id, mime, data_base64) values (v_id, c.image_mime, c.image_base64);
  end if;

  update public.product_candidates set status = 'approved', product_id = v_id, reviewed_at = now(), image_base64 = null where id = p_id;
  return v_id;
end;
$$;
grant execute on function public.approve_product_candidate(bigint, jsonb) to authenticated;
