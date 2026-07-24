-- Optimize admin listing and reorder paths for testimonials
create index if not exists idx_testimonials_admin_list
  on public.testimonials (sort_order asc, updated_at desc)
  where deleted_at is null;

create index if not exists idx_testimonials_status_sort
  on public.testimonials (status, sort_order asc)
  where deleted_at is null;

create index if not exists idx_testimonials_featured_sort
  on public.testimonials (is_featured, sort_order asc)
  where is_featured = true and deleted_at is null and status = 'published';
