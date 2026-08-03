-- Migration 041: Backfill media, gallery metadata and content defaults in offerings.details.class.

update public.offerings o
set
  details = jsonb_set(
    coalesce(o.details, '{}'::jsonb),
    '{class}',
    coalesce(o.details -> 'class', '{}'::jsonb)
      || case when o.details -> 'class' ? 'galleryImages' then '{}'::jsonb else jsonb_build_object(
        'galleryImages',
        coalesce(
          (
            select jsonb_agg(
              jsonb_build_object(
                'image', src.value,
                'alt', '',
                'order', src.idx - 1
              )
              order by src.idx
            )
            from jsonb_array_elements_text(coalesce(o.gallery, '[]'::jsonb)) with ordinality as src(value, idx)
          ),
          '[]'::jsonb
        )
      ) end
      || case when o.details -> 'class' ? 'includedItems' then '{}'::jsonb else jsonb_build_object('includedItems', '[]'::jsonb) end
      || case when o.details -> 'class' ? 'showIncludedSection' then '{}'::jsonb else jsonb_build_object('showIncludedSection', false) end
      || case when o.details -> 'class' ? 'videoUrl' then '{}'::jsonb else jsonb_build_object('videoUrl', '') end
      || case when o.details -> 'class' ? 'videoPoster' then '{}'::jsonb else jsonb_build_object(
        'videoPoster',
        coalesce(nullif(o.details #>> '{class,videoPoster}', ''), '')
      ) end
      || case when o.details -> 'class' ? 'content' then '{}'::jsonb else jsonb_build_object(
        'content',
        jsonb_build_object(
          'modules', '[]'::jsonb,
          'paymentMethodsList', '[]'::jsonb,
          'activitiesSection', jsonb_build_object(
            'enabled', false,
            'title', '',
            'content', '',
            'items', '[]'::jsonb
          )
        )
      ) end,
    true
  ),
  updated_at = now()
where o.type in ('class', 'workshop', 'experience', 'gift_card')
  and o.deleted_at is null
  and (
    not (coalesce(o.details -> 'class', '{}'::jsonb) ? 'galleryImages')
    or not (coalesce(o.details -> 'class', '{}'::jsonb) ? 'includedItems')
    or not (coalesce(o.details -> 'class', '{}'::jsonb) ? 'showIncludedSection')
    or not (coalesce(o.details -> 'class', '{}'::jsonb) ? 'videoUrl')
    or not (coalesce(o.details -> 'class', '{}'::jsonb) ? 'content')
  );
