-- Keep privileged RLS helpers outside schemas exposed by the Data API.
create schema if not exists private;

revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

alter function public.is_cms_admin() set schema private;
alter function private.is_cms_admin() set search_path = '';

revoke all on function private.is_cms_admin() from public, anon, authenticated;
grant execute on function private.is_cms_admin() to authenticated;

comment on function private.is_cms_admin() is
  'Internal RLS helper. Returns true only for authenticated admin/editor profiles.';

-- Event-trigger functions are invoked by PostgreSQL, never through the Data API.
do $$
begin
  if to_regprocedure('public.rls_auto_enable()') is not null then
    execute 'revoke all on function public.rls_auto_enable() from public, anon, authenticated';
  end if;
end;
$$;
