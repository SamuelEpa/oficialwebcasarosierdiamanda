-- Migration 037: Detail page rich-text typography for basic info fields.
-- Mirrors details.class typography into queryable columns for subtitle, question, highlight and description.

create table if not exists public.offering_detail_text_settings (
  offering_id uuid primary key references public.offerings(id) on delete cascade,
  subtitle_font_size integer not null default 28 check (subtitle_font_size between 12 and 72),
  subtitle_font_weight integer not null default 400 check (subtitle_font_weight between 100 and 900),
  subtitle_font_width integer not null default 100 check (subtitle_font_width between 75 and 125),
  subtitle_italic boolean not null default false,
  detail_question_font_size integer not null default 28 check (detail_question_font_size between 12 and 72),
  detail_question_font_weight integer not null default 400 check (detail_question_font_weight between 100 and 900),
  detail_question_font_width integer not null default 100 check (detail_question_font_width between 75 and 125),
  detail_question_italic boolean not null default false,
  highlight_font_size integer not null default 28 check (highlight_font_size between 12 and 72),
  highlight_font_weight integer not null default 400 check (highlight_font_weight between 100 and 900),
  highlight_font_width integer not null default 100 check (highlight_font_width between 75 and 125),
  highlight_italic boolean not null default false,
  description_font_size integer not null default 18 check (description_font_size between 12 and 72),
  description_font_weight integer not null default 400 check (description_font_weight between 100 and 900),
  description_font_width integer not null default 100 check (description_font_width between 75 and 125),
  description_italic boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_offering_detail_text_settings_offering_id
  on public.offering_detail_text_settings (offering_id);

insert into public.offering_detail_text_settings (
  offering_id,
  subtitle_font_size,
  subtitle_font_weight,
  subtitle_font_width,
  subtitle_italic,
  detail_question_font_size,
  detail_question_font_weight,
  detail_question_font_width,
  detail_question_italic,
  highlight_font_size,
  highlight_font_weight,
  highlight_font_width,
  highlight_italic,
  description_font_size,
  description_font_weight,
  description_font_width,
  description_italic,
  updated_at
)
select
  o.id,
  coalesce((o.details #>> '{class,subtitleTypography,fontSize}')::integer, 28),
  coalesce((o.details #>> '{class,subtitleTypography,weight}')::integer, 400),
  coalesce((o.details #>> '{class,subtitleTypography,width}')::integer, 100),
  coalesce((o.details #>> '{class,subtitleTypography,italic}')::boolean, false),
  coalesce((o.details #>> '{class,detailQuestionTypography,fontSize}')::integer, 28),
  coalesce((o.details #>> '{class,detailQuestionTypography,weight}')::integer, 400),
  coalesce((o.details #>> '{class,detailQuestionTypography,width}')::integer, 100),
  coalesce((o.details #>> '{class,detailQuestionTypography,italic}')::boolean, false),
  coalesce((o.details #>> '{class,highlightDescriptionTypography,fontSize}')::integer, 28),
  coalesce((o.details #>> '{class,highlightDescriptionTypography,weight}')::integer, 400),
  coalesce((o.details #>> '{class,highlightDescriptionTypography,width}')::integer, 100),
  coalesce((o.details #>> '{class,highlightDescriptionTypography,italic}')::boolean, false),
  coalesce((o.details #>> '{class,descriptionTypography,fontSize}')::integer, 18),
  coalesce((o.details #>> '{class,descriptionTypography,weight}')::integer, 400),
  coalesce((o.details #>> '{class,descriptionTypography,width}')::integer, 100),
  coalesce((o.details #>> '{class,descriptionTypography,italic}')::boolean, false),
  now()
from public.offerings o
where o.type in ('class', 'workshop', 'experience', 'gift_card')
on conflict (offering_id) do update set
  subtitle_font_size = excluded.subtitle_font_size,
  subtitle_font_weight = excluded.subtitle_font_weight,
  subtitle_font_width = excluded.subtitle_font_width,
  subtitle_italic = excluded.subtitle_italic,
  detail_question_font_size = excluded.detail_question_font_size,
  detail_question_font_weight = excluded.detail_question_font_weight,
  detail_question_font_width = excluded.detail_question_font_width,
  detail_question_italic = excluded.detail_question_italic,
  highlight_font_size = excluded.highlight_font_size,
  highlight_font_weight = excluded.highlight_font_weight,
  highlight_font_width = excluded.highlight_font_width,
  highlight_italic = excluded.highlight_italic,
  description_font_size = excluded.description_font_size,
  description_font_weight = excluded.description_font_weight,
  description_font_width = excluded.description_font_width,
  description_italic = excluded.description_italic,
  updated_at = now();

alter table public.offering_detail_text_settings enable row level security;

revoke insert, update, delete, truncate, references, trigger
  on public.offering_detail_text_settings
  from anon, authenticated;

grant select on public.offering_detail_text_settings to anon, authenticated;

drop policy if exists "public_read_offering_detail_text_settings" on public.offering_detail_text_settings;

create policy "public_read_offering_detail_text_settings"
  on public.offering_detail_text_settings
  for select
  to anon, authenticated
  using (
    exists (
      select 1
      from public.offerings
      where offerings.id = offering_detail_text_settings.offering_id
        and offerings.status = 'published'
        and offerings.deleted_at is null
    )
  );

comment on table public.offering_detail_text_settings is
  'Detail page rich-text typography for subtitle, question, highlight and description blocks.';
