-- Migration 042: Backfill offerings.details.class.seoImage from cover_image_url when empty.

update public.offerings o
set
  details = jsonb_set(
    coalesce(o.details, '{}'::jsonb),
    '{class}',
    coalesce(o.details -> 'class', '{}'::jsonb)
      || jsonb_build_object(
        'seoImage',
        trim(o.cover_image_url)
      ),
    true
  ),
  updated_at = now()
where o.type in ('class', 'workshop', 'experience', 'gift_card')
  and o.deleted_at is null
  and coalesce(nullif(trim(o.details #>> '{class,seoImage}'), ''), '') = ''
  and coalesce(nullif(trim(o.cover_image_url), ''), '') <> '';
