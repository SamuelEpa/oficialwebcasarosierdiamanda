-- Align products.category_id with product_categories and enforce referential integrity.

update public.products
set category_id = null
where category_id is not null
  and btrim(category_id) = '';

update public.products p
set category_id = null
where category_id is not null
  and not exists (
    select 1
    from public.product_categories c
    where c.id::text = btrim(p.category_id)
  );

alter table public.products
  alter column category_id type uuid
  using nullif(btrim(category_id), '')::uuid;

alter table public.products
  drop constraint if exists products_category_id_fkey;

alter table public.products
  add constraint products_category_id_fkey
  foreign key (category_id)
  references public.product_categories (id)
  on delete set null;

create index if not exists idx_products_category_id
  on public.products (category_id);
