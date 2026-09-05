-- Ubuntu catalogue. No existing application tables or auth users are modified.
begin;
create table public.ubuntu_editors (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
alter table public.ubuntu_editors enable row level security;
revoke all on public.ubuntu_editors from anon, authenticated;
grant select on public.ubuntu_editors to authenticated;
grant all on public.ubuntu_editors to service_role;
create policy ubuntu_editor_self_read on public.ubuntu_editors
  for select to authenticated using (user_id = (select auth.uid()));

create table public.ubuntu_equipment (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9-]{1,110}$'),
  name text not null check (char_length(btrim(name)) between 3 and 100),
  category text not null check (category in ('Pelles hydrauliques','Chargeuses frontales','Bulldozers','Compacteurs','Camions bennes','Niveleuses','Autres équipements')),
  summary text not null check (char_length(btrim(summary)) between 30 and 300),
  description text not null check (char_length(btrim(description)) between 50 and 10000),
  specifications text not null default '' check (char_length(specifications) <= 4000),
  capacity_summary text not null default '' check (char_length(capacity_summary) <= 2000),
  daily_rate bigint check (daily_rate between 0 and 2000000000),
  weekly_rate bigint check (weekly_rate between 0 and 2000000000),
  monthly_rate bigint check (monthly_rate between 0 and 2000000000),
  rental_terms text not null default '' check (char_length(rental_terms) <= 2000),
  image_path text check (image_path ~ '^/rentx-reference/asset-[a-f0-9]+\.png$' or image_path ~ '^[a-f0-9-]{36}/[a-f0-9-]{36}\.webp$'),
  image_alt text not null default '' check (char_length(image_alt) <= 180),
  seo_title text not null default '' check (char_length(seo_title) <= 70),
  seo_description text not null default '' check (char_length(seo_description) <= 170),
  status text not null default 'draft' check (status in ('draft','published')),
  availability text not null default 'on_request' check (availability in ('on_request','available','unavailable')),
  created_by uuid references auth.users(id) on delete set null default auth.uid(),
  updated_by uuid references auth.users(id) on delete set null default auth.uid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);
create index ubuntu_equipment_public_order on public.ubuntu_equipment (created_at, id) where status = 'published' and deleted_at is null;
create index ubuntu_equipment_admin_order on public.ubuntu_equipment (updated_at desc, id);
create index ubuntu_equipment_created_by on public.ubuntu_equipment (created_by);
create index ubuntu_equipment_updated_by on public.ubuntu_equipment (updated_by);
alter table public.ubuntu_equipment enable row level security;
revoke all on public.ubuntu_equipment from anon, authenticated;
grant select on public.ubuntu_equipment to anon, authenticated;
grant insert, update on public.ubuntu_equipment to authenticated;
grant all on public.ubuntu_equipment to service_role;
create policy ubuntu_equipment_public_read on public.ubuntu_equipment
  for select to anon, authenticated using (status = 'published' and deleted_at is null);
create policy ubuntu_equipment_editor_read on public.ubuntu_equipment
  for select to authenticated using (exists (select 1 from public.ubuntu_editors where user_id = (select auth.uid())));
create policy ubuntu_equipment_editor_insert on public.ubuntu_equipment
  for insert to authenticated with check (exists (select 1 from public.ubuntu_editors where user_id = (select auth.uid())) and created_by = (select auth.uid()));
create policy ubuntu_equipment_editor_update on public.ubuntu_equipment
  for update to authenticated
  using (exists (select 1 from public.ubuntu_editors where user_id = (select auth.uid())))
  with check (exists (select 1 from public.ubuntu_editors where user_id = (select auth.uid())));

create function public.ubuntu_equipment_timestamps() returns trigger
language plpgsql security invoker set search_path = '' as $$
begin
  if TG_OP = 'UPDATE' then
    if new.id is distinct from old.id or new.slug is distinct from old.slug or new.created_at is distinct from old.created_at then
      raise exception 'The identity and URL of an equipment record are immutable';
    end if;
    -- Preserve authorship for requests made through the authenticated API.
    if auth.uid() is not null then new.created_by := old.created_by; end if;
  end if;
  if auth.uid() is not null then new.updated_by := auth.uid(); end if;
  new.updated_at := clock_timestamp();
  return new;
end;
$$;
revoke all on function public.ubuntu_equipment_timestamps() from public;
create trigger ubuntu_equipment_timestamps before update or insert on public.ubuntu_equipment
for each row execute function public.ubuntu_equipment_timestamps();

-- Public catalogue photographs only. No documents or customer information.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('ubuntu-equipment','ubuntu-equipment',true,5242880,array['image/webp']);
create policy ubuntu_image_editor_read on storage.objects
  for select to authenticated using (bucket_id = 'ubuntu-equipment' and exists (select 1 from public.ubuntu_editors where user_id = (select auth.uid())));
create policy ubuntu_image_editor_insert on storage.objects
  for insert to authenticated with check (
    bucket_id = 'ubuntu-equipment'
    and name ~ '^[a-f0-9-]{36}/[a-f0-9-]{36}\.webp$'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and exists (select 1 from public.ubuntu_editors where user_id = (select auth.uid()))
  );
-- Unique immutable filenames: replacements upload a new object, never overwrite one.
create policy ubuntu_image_editor_delete on storage.objects
  for delete to authenticated using (
    bucket_id = 'ubuntu-equipment'
    and (storage.foldername(name))[1] = (select auth.uid())::text
    and exists (select 1 from public.ubuntu_editors where user_id = (select auth.uid()))
    and not exists (select 1 from public.ubuntu_equipment where image_path = storage.objects.name)
  );
-- Preserve the six existing catalogue entries. No customer data is seeded.
insert into public.ubuntu_equipment (slug,name,category,summary,description,image_path,image_alt,status) values
('pelles-hydrauliques', 'Pelles hydrauliques', 'Pelles hydrauliques', 'Pour les travaux d’excavation, l’ouverture de tranchées et le terrassement.', 'Pour les travaux d’excavation, l’ouverture de tranchées et le terrassement.
Contactez Ubuntu Location BTP pour préciser les caractéristiques recherchées, la durée de location et les conditions d’intervention sur votre chantier.', '/rentx-reference/asset-d42655080003ef46.png', 'Pelles hydrauliques', 'published'),
('chargeuses-frontales', 'Chargeuses frontales', 'Chargeuses frontales', 'Pour le chargement et la manutention de terre, de sable et de granulats.', 'Pour le chargement et la manutention de terre, de sable et de granulats.
Contactez Ubuntu Location BTP pour préciser les caractéristiques recherchées, la durée de location et les conditions d’intervention sur votre chantier.', '/rentx-reference/asset-53c5f9104bbddcd2.png', 'Chargeuses frontales', 'published'),
('bulldozers', 'Bulldozers', 'Bulldozers', 'Pour le décapage, le déblaiement et la préparation des plateformes.', 'Pour le décapage, le déblaiement et la préparation des plateformes.
Contactez Ubuntu Location BTP pour préciser les caractéristiques recherchées, la durée de location et les conditions d’intervention sur votre chantier.', null, 'Bulldozers', 'published'),
('compacteurs', 'Compacteurs', 'Compacteurs', 'Pour le compactage des sols et la préparation des ouvrages routiers.', 'Pour le compactage des sols et la préparation des ouvrages routiers.
Contactez Ubuntu Location BTP pour préciser les caractéristiques recherchées, la durée de location et les conditions d’intervention sur votre chantier.', null, 'Compacteurs', 'published'),
('camions-bennes', 'Camions bennes', 'Camions bennes', 'Pour le transport de matériaux, de déblais et de granulats sur vos chantiers.', 'Pour le transport de matériaux, de déblais et de granulats sur vos chantiers.
Contactez Ubuntu Location BTP pour préciser les caractéristiques recherchées, la durée de location et les conditions d’intervention sur votre chantier.', null, 'Camions bennes', 'published'),
('niveleuses', 'Niveleuses', 'Niveleuses', 'Pour le nivellement précis des terrains, des pistes et des chaussées.', 'Pour le nivellement précis des terrains, des pistes et des chaussées.
Contactez Ubuntu Location BTP pour préciser les caractéristiques recherchées, la durée de location et les conditions d’intervention sur votre chantier.', '/rentx-reference/asset-63712c0423260b45.png', 'Niveleuses', 'published');
update public.ubuntu_equipment set capacity_summary = case slug
  when 'pelles-hydrauliques' then E'Excavation et fouille\nOuverture de tranchées\nTerrassement et chargement'
  when 'chargeuses-frontales' then E'Chargement de matériaux\nManutention de terre et de granulats\nPréparation et dégagement du chantier'
  when 'bulldozers' then E'Décapage des sols\nPoussée et répartition des matériaux\nPréparation des plateformes'
  when 'compacteurs' then E'Compactage des sols\nPréparation des couches de chaussée\nTravaux routiers et plateformes'
  when 'camions-bennes' then E'Transport de déblais\nAcheminement de terre et de granulats\nÉvacuation de matériaux de chantier'
  when 'niveleuses' then E'Nivellement de précision\nProfilage des pistes et chaussées\nFinition des plateformes'
  else capacity_summary
end;
commit;
