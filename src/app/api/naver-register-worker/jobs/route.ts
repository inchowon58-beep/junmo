import { NextRequest, NextResponse } from "next/server";
import { verifyWorkerRequest } from "@/lib/collection-queue";
import { getWorkerNaverRegisterJobs } from "@/lib/naver-register-worker";

export const dynamic = "force-dynamic";

/**
 * VM 네이버 서치어드바이저 사이트 등록 — 대기 작업 조회
 * GET /api/naver-register-worker/jobs?naverId={네이버아이디}
 * Authorization: Bearer {worker_token}
 */
export async function GET(request: NextRequest) {
  if (!(await verifyWorkerRequest(request))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const naverId = request.nextUrl.searchParams.get("naverId")?.trim();
  if (!naverId) {
    return NextResponse.json({ error: "naverId 쿼리가 필요합니다." }, { status: 400 });
  }

  const jobs = await getWorkerNaverRegisterJobs(naverId);

  return NextResponse.json(
    {
      naverId: naverId.toLowerCase(),
      count: jobs.length,
      jobs,
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
