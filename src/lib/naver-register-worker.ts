import { getWorkerSecret } from "@/lib/collection-queue";
import { tenantSiteUrl } from "@/lib/tenant-serialize";
import {
  fetchNaverAccountById,
  fetchNaverRegisterJobById,
  insertNaverRegisterJob,
  listNaverRegisterJobsForWorker,
  updateNaverRegisterJob,
  type NaverRegisterJobRow,
} from "@/lib/supabase/naver-accounts";
import { updateTenantSiteConfig } from "@/lib/supabase/tenant-db";

const META_VERIFY_WAIT_SEC = 60;

export interface NaverRegisterJobPayload {
  id: string;
  status: NaverRegisterJobRow["status"];
  action: "register_site" | "verify_ownership" | "wait_meta";
  siteConfigId: string;
  siteName: string;
  siteUrl: string;
  apiBaseUrl: string;
  workerToken: string;
  naverId: string;
  waitSeconds?: number;
  metaAppliedAt?: string | null;
}

function jobToPayload(job: NaverRegisterJobRow): NaverRegisterJobPayload {
  const base = {
    id: job.id,
    status: job.status,
    siteConfigId: job.site_config_id,
    siteName: job.site_name,
    siteUrl: job.site_url,
    apiBaseUrl: job.api_base_url,
    workerToken: job.worker_token,
    naverId: job.naver_id,
    metaAppliedAt: job.meta_applied_at,
  };

  if (job.status === "pending") {
    return { ...base, action: "register_site" };
  }

  if (job.status === "processing") {
    return { ...base, action: "register_site" };
  }

  if (job.status === "meta_applied" && job.meta_applied_at) {
    const elapsed =
      (Date.now() - new Date(job.meta_applied_at).getTime()) / 1000;
    if (elapsed >= META_VERIFY_WAIT_SEC) {
      return { ...base, action: "verify_ownership" };
    }
    return {
      ...base,
      action: "wait_meta",
      waitSeconds: Math.max(1, Math.ceil(META_VERIFY_WAIT_SEC - elapsed)),
    };
  }

  return { ...base, action: "register_site" };
}

export async function getWorkerNaverRegisterJobs(
  naverId: string
): Promise<NaverRegisterJobPayload[]> {
  const jobs = await listNaverRegisterJobsForWorker(naverId);
  return jobs.map(jobToPayload);
}

export async function claimNaverRegisterJob(
  jobId: string,
  naverId: string,
  vmId: string
): Promise<NaverRegisterJobPayload> {
  const job = await fetchNaverRegisterJobById(jobId);
  if (!job) throw new Error("작업을 찾을 수 없습니다.");
  if (job.naver_id !== naverId.trim().toLowerCase()) {
    throw new Error("네이버 아이디가 일치하지 않습니다.");
  }
  if (!["pending", "meta_applied"].includes(job.status)) {
    throw new Error("이미 처리 중이거나 완료된 작업입니다.");
  }

  if (job.status === "pending") {
    const updated = await updateNaverRegisterJob(jobId, {
      status: "processing",
      claimed_by: vmId,
      claimed_at: new Date().toISOString(),
    });
    return jobToPayload(updated);
  }

  return jobToPayload(job);
}

export async function submitNaverRegisterMeta(input: {
  jobId: string;
  naverId: string;
  vmId: string;
  naverVerification: string;
}): Promise<{ job: NaverRegisterJobPayload; verifyAfterSec: number }> {
  const job = await fetchNaverRegisterJobById(input.jobId);
  if (!job) throw new Error("작업을 찾을 수 없습니다.");
  if (job.naver_id !== input.naverId.trim().toLowerCase()) {
    throw new Error("네이버 아이디가 일치하지 않습니다.");
  }
  if (!["processing", "pending"].includes(job.status)) {
    throw new Error("메타값을 제출할 수 있는 상태가 아닙니다.");
  }

  const meta = input.naverVerification.trim();
  if (!meta) throw new Error("네이버 인증 메타값이 비어 있습니다.");

  await updateTenantSiteConfig(job.site_config_id, {
    naver_verification: meta,
  });

  const updated = await updateNaverRegisterJob(job.id, {
    status: "meta_applied",
    meta_applied_at: new Date().toISOString(),
    claimed_by: input.vmId,
    error: null,
  });

  return {
    job: jobToPayload(updated),
    verifyAfterSec: META_VERIFY_WAIT_SEC,
  };
}

export async function completeNaverRegisterJob(input: {
  jobId: string;
  naverId: string;
  vmId: string;
  success: boolean;
  message?: string;
}): Promise<NaverRegisterJobPayload> {
  const job = await fetchNaverRegisterJobById(input.jobId);
  if (!job) throw new Error("작업을 찾을 수 없습니다.");
  if (job.naver_id !== input.naverId.trim().toLowerCase()) {
    throw new Error("네이버 아이디가 일치하지 않습니다.");
  }

  const updated = await updateNaverRegisterJob(job.id, {
    status: input.success ? "completed" : "failed",
    completed_at: new Date().toISOString(),
    error: input.success ? null : input.message || "VM 등록 실패",
    claimed_by: input.vmId,
  });

  return jobToPayload(updated);
}

export async function enqueueNaverSiteRegistration(input: {
  siteConfigId: string;
  naverAccountId: string;
  siteName: string;
  subdomain: string;
}): Promise<NaverRegisterJobRow | null> {
  const account = await fetchNaverAccountById(input.naverAccountId);
  if (!account || !account.is_active) return null;

  const workerToken = await getWorkerSecret();
  if (!workerToken) {
    throw new Error("VM Worker API 토큰이 설정되지 않았습니다. 마스터 설정을 확인하세요.");
  }

  const siteUrl = tenantSiteUrl(input.subdomain);

  return insertNaverRegisterJob({
    site_config_id: input.siteConfigId,
    naver_account_id: account.id,
    naver_id: account.naver_id,
    site_name: input.siteName,
    site_url: siteUrl,
    api_base_url: siteUrl,
    worker_token: workerToken,
  });
}
