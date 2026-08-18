-- Internal links: enlaces externos gestionados desde el CMS (solo visibles en el admin)

create table if not exists public.internal_links (
  id          uuid primary key default gen_random_uuid(),
  label       text not null,
  url         text not null,
  description text,
  sort_order  integer not null default 0,
  is_active   boolean not null default true,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

select public.set_updated_at_trigger('internal_links');

alter table public.internal_links enable row level security;

drop policy if exists "authenticated_all_internal_links" on public.internal_links;
create policy "authenticated_all_internal_links" on public.internal_links
  for all to authenticated using (true) with check (true);