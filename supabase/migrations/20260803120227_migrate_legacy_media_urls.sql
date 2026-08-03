-- Keep historical audit snapshots unchanged, but migrate every active or
-- restorable reference to the current Supabase Storage project.
do $$
declare
  column_record record;
begin
  for column_record in
    select table_schema, table_name, column_name, data_type
    from information_schema.columns
    where table_schema = 'public'
      and table_name <> 'history_logs'
      and data_type in ('text', 'character varying', 'json', 'jsonb')
  loop
    if column_record.data_type in ('json', 'jsonb') then
      execute format(
        'update %I.%I set %I = replace(%I::text, %L, %L)::%s where %I::text like %L',
        column_record.table_schema,
        column_record.table_name,
        column_record.column_name,
        column_record.column_name,
        'ilkrcakrduibgsfqfzti.supabase.co',
        'hhxftxxshwgmfxuyrjmz.supabase.co',
        column_record.data_type,
        column_record.column_name,
        '%ilkrcakrduibgsfqfzti%'
      );
    else
      execute format(
        'update %I.%I set %I = replace(%I, %L, %L) where %I like %L',
        column_record.table_schema,
        column_record.table_name,
        column_record.column_name,
        column_record.column_name,
        'ilkrcakrduibgsfqfzti.supabase.co',
        'hhxftxxshwgmfxuyrjmz.supabase.co',
        column_record.column_name,
        '%ilkrcakrduibgsfqfzti%'
      );
    end if;
  end loop;
end
$$;
update public.products as product
set gallery = array(
  select replace(
    item,
    'ilkrcakrduibgsfqfzti.supabase.co',
    'hhxftxxshwgmfxuyrjmz.supabase.co'
  )
  from unnest(product.gallery) with ordinality as gallery_item(item, position)
  order by position
)
where product.gallery::text like '%ilkrcakrduibgsfqfzti%';