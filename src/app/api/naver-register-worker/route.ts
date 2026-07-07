import { NextRequest, NextResponse } from "next/server";
import { verifyWorkerRequest } from "@/lib/collection-queue";
import {
  claimNaverRegisterJob,
  completeNaverRegisterJob,
  submitNaverRegisterMeta,
} from "@/lib/naver-register-worker";

export const dynamic = "force-dynamic";

/**
 * POST /api/naver-register-worker/claim
 * POST /api/naver-register-worker/submit-meta
 * POST /api/naver-register-worker/complete
 */
export async function POST(request: NextRequest) {
  if (!(await verifyWorkerRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const action = request.nextUrl.searchParams.get("action");
  const body = await request.json().catch(() => ({}));

  const jobId = String(body.jobId || "").trim();
  const naverId = String(body.naverId || "").trim();
  const vmId = String(body.vmId || body.vm_id || "vm").trim();

  if (!jobId || !naverId) {
    return NextResponse.json({ error: "jobId, naverId가 필요합니다." }, { status: 400 });
  }

  try {
    if (action === "claim") {
      const job = await claimNaverRegisterJob(jobId, naverId, vmId);
      return NextResponse.json({ ok: true, job });
    }

    if (action === "submit-meta") {
      const result = await submitNaverRegisterMeta({
        jobId,
        naverId,
        vmId,
        naverVerification: String(body.naverVerification || body.meta || ""),
      });
      return NextResponse.json({
        ok: true,
        job: result.job,
        verifyAfterSec: result.verifyAfterSec,
        message: `${result.verifyAfterSec}초 후 네이버 소유확인을 진행하세요.`,
      });
    }

    if (action === "complete") {
      const job = await completeNaverRegisterJob({
        jobId,
        naverId,
        vmId,
        success: body.success !== false,
        message: body.message ? String(body.message) : undefined,
      });
      return NextResponse.json({ ok: true, job });
    }

    return NextResponse.json(
      { error: "action 쿼리 필요: claim | submit-meta | complete" },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "처리 실패" },
      { status: 400 }
    );
  }
}
