# 네이버 서치어드바이저 사이트 등록 VM 연동

250대 VM이 **각자의 네이버 아이디**에 맞는 신규 사이트만 가져가 서치어드바이저에 등록합니다.

---

## 1. 사전 설정

### 웹 (마스터)

1. `/admin/naver-accounts` — 네이버 **아이디** 등록 (비밀번호는 VM만)
2. `/admin/register` — 신규 사이트 등록 시 **네이버 계정 선택**
3. 마스터 설정 — **VM Worker API 토큰** (`COLLECTION_WORKER_SECRET`과 동일)

### VM (각 대)

```json
{
  "vm_id": "worker-037",
  "naver_id": "네이버로그인아이디",
  "naver_password": "****",
  "worker_token": "3078",
  "register_api_base": "https://demolishzone.yourdogzone.co.kr"
}
```

- `register_api_base` — **메인 관리 도메인** (테넌트 도메인 아님)
- `naver_id` — 웹에 등록한 ID와 **완전 일치**

---

## 2. 자동 흐름

```
신규 사이트 등록 + 네이버 계정 선택
  → naver_site_register_jobs (pending)

VM 폴링 (하루 1~2회 또는 N분마다)
  GET {register_api_base}/api/naver-register-worker/jobs?naverId={내아이디}

VM 프로그램 사이트 목록에 자동 등록:
  - 이름: siteName
  - 수집사이트 URL: siteUrl
  - API 베이스 URL: apiBaseUrl
  - Worker API 토큰: workerToken

VM: 네이버 로그인 → 서치어드바이저 사이트 등록 → HTML 메타값 발급

POST .../api/naver-register-worker?action=submit-meta
  → 사이트 DB에 naver_verification 저장

60초 대기 (verifyAfterSec)

VM: 네이버 소유확인 클릭

POST .../api/naver-register-worker?action=complete
  → job completed
  → site_configs.naver_site_registered_at 저장 → 관리자 목록에 「등록완료」 표시
```

이후 SEO 페이지 발행 시 기존 **collection-worker**가 웹문서 수집 요청을 처리합니다.

---

## 3. API 명세

인증: `Authorization: Bearer {worker_token}`

### 대기 작업 조회

```
GET /api/naver-register-worker/jobs?naverId=abc123
```

응답 `jobs[]`:

| 필드 | 설명 |
|------|------|
| `action` | `register_site` / `wait_meta` / `verify_ownership` |
| `siteName` | VM 「이름」 |
| `siteUrl` | 수집사이트 URL |
| `apiBaseUrl` | API 베이스 URL |
| `workerToken` | Worker API 토큰 |
| `waitSeconds` | meta 적용 후 소유확인까지 남은 초 |

### 작업 선점

```
POST /api/naver-register-worker?action=claim
{ "jobId": "...", "naverId": "abc123", "vmId": "worker-037" }
```

### 메타값 제출 (사이트 DB 반영)

```
POST /api/naver-register-worker?action=submit-meta
{
  "jobId": "...",
  "naverId": "abc123",
  "vmId": "worker-037",
  "naverVerification": "네이버가_발급한_content_값"
}
```

응답: `verifyAfterSec: 60` — 이후 소유확인 진행

### 완료 보고

```
POST /api/naver-register-worker?action=complete
{
  "jobId": "...",
  "naverId": "abc123",
  "vmId": "worker-037",
  "success": true,
  "message": "소유확인 완료"
}
```

- `success: true` 시 서버가 `site_configs.naver_site_registered_at` 을 기록합니다.
- 관리자 `/admin/sites` 목록에 **네이버 · 등록완료** 버튼이 표시됩니다.
- 메타값만 있고 소유확인 전이면 **등록 대기**로 표시됩니다.

---

## 4. VM 권장 루프 (Python 의사코드)

```python
API = config["register_api_base"]
HEADERS = {"Authorization": f"Bearer {config['worker_token']}"}
NAVER_ID = config["naver_id"]

r = requests.get(f"{API}/api/naver-register-worker/jobs", params={"naverId": NAVER_ID}, headers=HEADERS)
for job in r.json().get("jobs", []):
    if job["action"] == "register_site":
        requests.post(f"{API}/api/naver-register-worker?action=claim", json={...}, headers=HEADERS)
        meta = selenium_register_site_on_naver(job)  # 기존 프로그램 로직
        requests.post(f"{API}/api/naver-register-worker?action=submit-meta",
                      json={"jobId": job["id"], "naverVerification": meta, ...}, headers=HEADERS)
    elif job["action"] == "wait_meta":
        time.sleep(job.get("waitSeconds", 60))
    elif job["action"] == "verify_ownership":
        selenium_verify_ownership(job)
        requests.post(f"{API}/api/naver-register-worker?action=complete",
                      json={"jobId": job["id"], "success": True, ...}, headers=HEADERS)
```

---

## 5. Supabase 마이그레이션

`005_naver_accounts_register.sql` 실행 필요.

---

## 6. 주의

- 네이버 비밀번호는 **서버에 저장하지 않음**
- 1 네이버 ID = 1 VM 권장
- DNS·Vercel 도메인 연결 후 VM 등록이 성공률 높음
- `register_api_base`는 **메인 도메인** 고정 (250 VM 공통)
