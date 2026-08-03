-- Migration 043: Backfill offerings.details.class.showIdeaPromptSection (default on when missing).

update public.offerings o
set
  details = jsonb_set(
    coalesce(o.details, '{}'::jsonb),
    '{class}',
    coalesce(o.details -> 'class', '{}'::jsonb)
      || jsonb_build_object('showIdeaPromptSection', true),
    true
  ),
  updated_at = now()
where o.type in ('class', 'workshop', 'experience', 'gift_card')
  and o.deleted_at is null
  and not (coalesce(o.details -> 'class', '{}'::jsonb) ? 'showIdeaPromptSection');
