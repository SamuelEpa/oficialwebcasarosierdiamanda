-- Teacher bio + studio intro typography (AdminRichTextField / variable axes)
alter table public.teachers
  add column if not exists bio_typography jsonb not null default '{"italic":false,"weight":400,"width":100,"fontSize":18}'::jsonb;

alter table public.studio_page_settings
  add column if not exists intro_content_typography jsonb not null default '{"italic":false,"weight":400,"width":100,"fontSize":18}'::jsonb;

comment on column public.teachers.bio_typography is 'Rich text typography for teacher bio (AdminRichTextField).';
comment on column public.studio_page_settings.intro_content_typography is 'Rich text typography for El Estudio free content block.';
