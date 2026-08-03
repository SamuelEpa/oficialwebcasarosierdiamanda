-- Migration 036: Home card settings for featured offerings on the public homepage.
-- Mirrors details.class.homeCard into queryable columns, including rich-text typography.

create table if not exists public.offering_home_card_settings (
  offering_id uuid primary key references public.offerings(id) on delete cascade,
  image text not null default '',
  image_alt text not null default '',
  eyebrow text not null default '',
  title text not null default '',
  excerpt text not null default '',
  excerpt_font_size integer not null default 28 check (excerpt_font_size between 12 and 72),
  excerpt_font_weight integer not null default 400 check (excerpt_font_weight between 100 and 900),
  excerpt_font_width integer not null default 100 check (excerpt_font_width between 75 and 125),
  excerpt_italic boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_offering_home_card_settings_offering_id
  on public.offering_home_card_settings (offering_id);

insert into public.offering_home_card_settings (
  offering_id,
  image,
  image_alt,
  eyebrow,
  title,
  excerpt,
  excerpt_font_size,
  excerpt_font_weight,
  excerpt_font_width,
  excerpt_italic,
  updated_at
)
select
  o.id,
  coalesce(o.details #>> '{class,homeCard,image}', ''),
  coalesce(o.details #>> '{class,homeCard,imageAlt}', ''),
  coalesce(o.details #>> '{class,homeCard,eyebrow}', ''),
  coalesce(o.details #>> '{class,homeCard,title}', ''),
  coalesce(nullif(o.details #>> '{class,homeCard,excerpt}', ''), coalesce(o.details #>> '{class,homeExcerpt}', ''), ''),
  case
    when coalesce(o.details #>> '{class,homeCard,excerptTypography,fontSize}', '') ~ '^[0-9]+$'
      then (o.details #>> '{class,homeCard,excerptTypography,fontSize}')::integer
    else 28
  end,
  case
    when coalesce(o.details #>> '{class,homeCard,excerptTypography,weight}', '') ~ '^[0-9]+$'
      then (o.details #>> '{class,homeCard,excerptTypography,weight}')::integer
    else 400
  end,
  case
    when coalesce(o.details #>> '{class,homeCard,excerptTypography,width}', '') ~ '^[0-9]+$'
      then (o.details #>> '{class,homeCard,excerptTypography,width}')::integer
    else 100
  end,
  coalesce((o.details #>> '{class,homeCard,excerptTypography,italic}')::boolean, false),
  now()
from public.offerings o
where o.type in ('class', 'workshop', 'experience', 'gift_card')
on conflict (offering_id) do update set
  image = excluded.image,
  image_alt = excluded.image_alt,
  eyebrow = excluded.eyebrow,
  title = excluded.title,
  excerpt = excluded.excerpt,
  excerpt_font_size = excluded.excerpt_font_size,
  excerpt_font_weight = excluded.excerpt_font_weight,
  excerpt_font_width = excluded.excerpt_font_width,
  excerpt_italic = excluded.excerpt_italic,
  updated_at = now();

alter table public.offering_home_card_settings enable row level security;

revoke insert, update, delete, truncate, references, trigger
  on public.offering_home_card_settings
  from anon, authenticated;

grant select on public.offering_home_card_settings to anon, authenticated;

drop policy if exists "public_read_offering_home_card_settings" on public.offering_home_card_settings;

create policy "public_read_offering_home_card_settings"
  on public.offering_home_card_settings
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.offerings
      where offerings.id = offering_home_card_settings.offering_id
        and offerings.status = 'published'
        and offerings.deleted_at is null
    )
  );

comment on table public.offering_home_card_settings is
  'Home featured card content and excerpt typography for offerings shown on the public homepage.';
