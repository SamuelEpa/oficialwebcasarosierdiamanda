-- Migration 038: Horizontal position for typographic (text) hero title per device.
-- Aligns offering_public_hero_settings with CMS fields heroTitlePositionX*.

alter table public.offering_public_hero_settings
  add column if not exists hero_title_position_x text not null default '50%',
  add column if not exists hero_title_position_x_tablet text not null default '50%',
  add column if not exists hero_title_position_x_mobile text not null default '50%';

update public.offering_public_hero_settings h
set
  hero_title_position_x = coalesce(nullif(trim(o.details -> 'class' ->> 'heroTitlePositionX'), ''), h.hero_title_position_x),
  hero_title_position_x_tablet = coalesce(
    nullif(trim(o.details -> 'class' ->> 'heroTitlePositionXTablet'), ''),
    nullif(trim(o.details -> 'class' ->> 'heroTitlePositionX'), ''),
    h.hero_title_position_x_tablet
  ),
  hero_title_position_x_mobile = coalesce(
    nullif(trim(o.details -> 'class' ->> 'heroTitlePositionXMobile'), ''),
    h.hero_title_position_x_mobile
  )
from public.offerings o
where o.id = h.offering_id;
