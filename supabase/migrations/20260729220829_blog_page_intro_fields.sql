alter table public.blog_page_settings
  add column if not exists intro_heading text not null default 'Bitácora cerámica',
  add column if not exists intro_kicker text not null default 'Casa Rosier',
  add column if not exists intro_text text not null default
    'Un espacio para compartir procesos, técnicas, reflexiones y pequeñas historias alrededor de la cerámica contemporánea, el taller y la creación con las manos.';

comment on column public.blog_page_settings.intro_heading is
  'Masthead title for the public blog index (Bitácora cerámica).';
comment on column public.blog_page_settings.intro_kicker is
  'Masthead brand line under the title (Casa Rosier).';
comment on column public.blog_page_settings.intro_text is
  'Centered intro paragraph below the masthead on the blog index.';

update public.blog_page_settings
set
  intro_heading = coalesce(nullif(trim(intro_heading), ''), 'Bitácora cerámica'),
  intro_kicker = coalesce(nullif(trim(intro_kicker), ''), 'Casa Rosier'),
  intro_text = coalesce(
    nullif(trim(intro_text), ''),
    'Un espacio para compartir procesos, técnicas, reflexiones y pequeñas historias alrededor de la cerámica contemporánea, el taller y la creación con las manos.'
  )
where id = 'blog-page';
