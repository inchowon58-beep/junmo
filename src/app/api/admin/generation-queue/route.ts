import { NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";

const GONE_MESSAGE =
  "관리자 대량등록·대기열은 더 이상 사용할 수 없습니다. 단일 발행만 사용하세요.";

function gone() {
  return NextResponse.json({ error: GONE_MESSAGE }, { status: 410 });
}

/** 관리자 대량등록·대기열 API — 비활성화 (단일 발행 POST /api/admin/pages 만 사용) */
export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return gone();
}

export async function POST() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return gone();
}

export async function PUT() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return gone();
}
