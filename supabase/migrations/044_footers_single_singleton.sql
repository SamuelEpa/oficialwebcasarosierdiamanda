-- Migration 044: Single canonical site footer (merge duplicates, enforce one published row).

DO $$
DECLARE
  canonical_id uuid;
BEGIN
  SELECT id INTO canonical_id
  FROM public.footers
  WHERE deleted_at IS NULL
  ORDER BY (status = 'published') DESC, updated_at DESC NULLS LAST
  LIMIT 1;

  IF canonical_id IS NULL THEN
    RETURN;
  END IF;

  UPDATE public.pages
  SET footer_id = canonical_id
  WHERE footer_id IS NOT NULL AND footer_id <> canonical_id;

  UPDATE public.landing_pages
  SET footer_id = canonical_id
  WHERE footer_id IS NOT NULL AND footer_id <> canonical_id;

  DELETE FROM public.footers
  WHERE id <> canonical_id;

  UPDATE public.footers
  SET
    status = 'published',
    deleted_at = NULL,
    name = COALESCE(NULLIF(trim(name), ''), 'Footer principal'),
    updated_at = now()
  WHERE id = canonical_id;
END $$;

CREATE UNIQUE INDEX IF NOT EXISTS footers_single_published_singleton
ON public.footers ((1))
WHERE deleted_at IS NULL AND status = 'published';
