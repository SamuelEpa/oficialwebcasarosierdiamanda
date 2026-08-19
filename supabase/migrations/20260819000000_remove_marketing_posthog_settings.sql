alter table marketing_settings
  drop column if exists posthog_enabled,
  drop column if exists posthog_key,
  drop column if exists posthog_host;