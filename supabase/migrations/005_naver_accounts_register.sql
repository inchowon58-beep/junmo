-- 네이버 계정 마스터 (비밀번호는 VM 로컬만 보관)
create table if not exists public.naver_accounts (
  id uuid primary key default gen_random_uuid(),
  naver_id text not null unique,
  label text,
  vm_label text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create index if not exists naver_accounts_naver_id_idx on public.naver_accounts (naver_id);

alter table public.site_configs
  add column if not exists naver_account_id uuid references public.naver_accounts(id) on delete set null;

-- 네이버 서치어드바이저 사이트 등록 VM 대기열
create table if not exists public.naver_site_register_jobs (
  id uuid primary key default gen_random_uuid(),
  site_config_id uuid not null references public.site_configs(id) on delete cascade,
  naver_account_id uuid references public.naver_accounts(id) on delete set null,
  naver_id text not null,
  site_name text not null,
  site_url text not null,
  api_base_url text not null,
  worker_token text not null,
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'meta_applied', 'completed', 'failed')),
  claimed_by text,
  claimed_at timestamptz,
  meta_applied_at timestamptz,
  completed_at timestamptz,
  error text,
  created_at timestamptz not null default now()
);

create index if not exists naver_register_jobs_naver_status_idx
  on public.naver_site_register_jobs (naver_id, status);

create unique index if not exists naver_register_jobs_site_pending_uidx
  on public.naver_site_register_jobs (site_config_id)
  where status in ('pending', 'processing', 'meta_applied');

alter table public.naver_accounts enable row level security;
alter table public.naver_site_register_jobs enable row level security;

create policy "service role naver_accounts"
  on public.naver_accounts for all
  using (auth.role() = 'service_role') with check (auth.role() = 'service_role');

create policy "service role naver_register_jobs"
  on public.naver_site_register_jobs for all
  using (auth.role() = 'service_role') with check (auth.role() = 'service_role');
