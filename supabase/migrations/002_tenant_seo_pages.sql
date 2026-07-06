-- 테넌트(서브도메인)별 SEO 서브페이지
create table if not exists public.tenant_seo_pages (
  id uuid primary key default gen_random_uuid(),
  site_config_id uuid not null references public.site_configs(id) on delete cascade,
  slug text not null,
  keyword text not null,
  region_name text,
  title text not null,
  description text not null default '',
  content text not null default '',
  faqs jsonb not null default '[]'::jsonb,
  local_partners jsonb,
  image_index integer,
  image_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (site_config_id, slug),
  unique (site_config_id, keyword)
);

create index if not exists tenant_seo_pages_site_idx
  on public.tenant_seo_pages (site_config_id);

create index if not exists tenant_seo_pages_slug_idx
  on public.tenant_seo_pages (site_config_id, slug);

alter table public.tenant_seo_pages enable row level security;

create policy "service role full access tenant pages"
  on public.tenant_seo_pages
  for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
