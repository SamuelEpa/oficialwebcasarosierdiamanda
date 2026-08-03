create table if not exists private.api_rate_limits (
  route text not null,
  identifier_hash text not null,
  window_started_at timestamptz not null,
  request_count integer not null,
  primary key (route, identifier_hash),
  constraint api_rate_limits_request_count_positive check (request_count > 0)
);

revoke all on table private.api_rate_limits from public, anon, authenticated;
grant usage on schema private to service_role;
grant select, insert, update on table private.api_rate_limits to service_role;

create or replace function public.check_api_rate_limit(
  p_route text,
  p_identifier_hash text,
  p_limit integer,
  p_window_seconds integer
)
returns table (allowed boolean, remaining integer, retry_after_seconds integer)
language plpgsql
security invoker
set search_path = ''
as $$
declare
  v_now timestamptz := clock_timestamp();
  v_row private.api_rate_limits%rowtype;
begin
  if p_route is null or length(p_route) not between 1 and 100
    or p_identifier_hash is null or length(p_identifier_hash) <> 64
    or p_limit not between 1 and 10000
    or p_window_seconds not between 1 and 86400 then
    raise exception 'Invalid rate limit parameters' using errcode = '22023';
  end if;

  insert into private.api_rate_limits as limits (
    route,
    identifier_hash,
    window_started_at,
    request_count
  )
  values (p_route, p_identifier_hash, v_now, 1)
  on conflict (route, identifier_hash) do update
  set
    window_started_at = case
      when limits.window_started_at <= v_now - make_interval(secs => p_window_seconds) then v_now
      else limits.window_started_at
    end,
    request_count = case
      when limits.window_started_at <= v_now - make_interval(secs => p_window_seconds) then 1
      else limits.request_count + 1
    end
  returning * into v_row;

  allowed := v_row.request_count <= p_limit;
  remaining := greatest(p_limit - v_row.request_count, 0);
  retry_after_seconds := greatest(
    ceil(extract(epoch from (
      v_row.window_started_at + make_interval(secs => p_window_seconds) - v_now
    )))::integer,
    0
  );
  return next;
end;
$$;

revoke all on function public.check_api_rate_limit(text, text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.check_api_rate_limit(text, text, integer, integer)
  to service_role;
