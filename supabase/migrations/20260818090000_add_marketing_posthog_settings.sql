-- Add PostHog settings to marketing_settings

alter table public.marketing_settings
  add column if not exists posthog_enabled boolean not null default false,
  add column if not exists posthog_key text,
  add column if not exists posthog_host text;