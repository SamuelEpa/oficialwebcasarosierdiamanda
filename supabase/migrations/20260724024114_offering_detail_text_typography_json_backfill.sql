-- Migration 039: Backfill details.class rich-text typography objects from offering_detail_text_settings.
-- Keeps existing JSON typography when present; fills missing keys so CMS JSON and table stay aligned.

update public.offerings o
set
  details = jsonb_set(
    coalesce(o.details, '{}'::jsonb),
    '{class}',
    coalesce(o.details -> 'class', '{}'::jsonb)
      || case when o.details -> 'class' -> 'subtitleTypography' is not null then '{}'::jsonb else jsonb_build_object(
        'subtitleTypography', jsonb_build_object(
          'fontSize', d.subtitle_font_size,
          'weight', d.subtitle_font_weight,
          'width', d.subtitle_font_width,
          'italic', d.subtitle_italic
        )
      ) end
      || case when o.details -> 'class' -> 'detailQuestionTypography' is not null then '{}'::jsonb else jsonb_build_object(
        'detailQuestionTypography', jsonb_build_object(
          'fontSize', d.detail_question_font_size,
          'weight', d.detail_question_font_weight,
          'width', d.detail_question_font_width,
          'italic', d.detail_question_italic
        )
      ) end
      || case when o.details -> 'class' -> 'highlightDescriptionTypography' is not null then '{}'::jsonb else jsonb_build_object(
        'highlightDescriptionTypography', jsonb_build_object(
          'fontSize', d.highlight_font_size,
          'weight', d.highlight_font_weight,
          'width', d.highlight_font_width,
          'italic', d.highlight_italic
        )
      ) end
      || case when o.details -> 'class' -> 'descriptionTypography' is not null then '{}'::jsonb else jsonb_build_object(
        'descriptionTypography', jsonb_build_object(
          'fontSize', d.description_font_size,
          'weight', d.description_font_weight,
          'width', d.description_font_width,
          'italic', d.description_italic
        )
      ) end,
    true
  ),
  updated_at = now()
from public.offering_detail_text_settings d
where d.offering_id = o.id
  and o.type in ('class', 'workshop', 'experience', 'gift_card')
  and o.deleted_at is null
  and (
    o.details -> 'class' -> 'subtitleTypography' is null
    or o.details -> 'class' -> 'detailQuestionTypography' is null
    or o.details -> 'class' -> 'highlightDescriptionTypography' is null
    or o.details -> 'class' -> 'descriptionTypography' is null
  );

comment on table public.offering_detail_text_settings is
  'Detail page rich-text typography for subtitle, question, highlight and description blocks. Synced from details.class on CMS save; migration 039 backfills missing JSON keys from these columns.';
