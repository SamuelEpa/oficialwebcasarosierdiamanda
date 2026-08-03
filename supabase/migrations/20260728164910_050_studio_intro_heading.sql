alter table public.studio_page_settings
  add column if not exists intro_heading text not null default '';

comment on column public.studio_page_settings.intro_heading is
  'Left-column display heading for El Estudio team intro (right column uses intro_content).';

update public.studio_page_settings
set intro_heading = case
  when coalesce(trim(intro_heading), '') <> '' then intro_heading
  else 'Quienes hacen posible el taller'
end
where id = 'studio-page';
