-- VM 네이버 서치어드바이저 사이트 등록·소유확인 완료 시각
alter table public.site_configs
  add column if not exists naver_site_registered_at timestamptz;

comment on column public.site_configs.naver_site_registered_at is
  'VM이 네이버 서치어드바이저 사이트 등록·소유확인 완료 후 기록';
