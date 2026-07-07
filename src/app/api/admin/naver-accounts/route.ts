import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated, isMasterAuthenticated } from "@/lib/auth";
import { getSupabaseConfigError } from "@/lib/supabase/tenant-db";
import {
  deleteNaverAccount,
  insertNaverAccount,
  listNaverAccounts,
} from "@/lib/supabase/naver-accounts";
import type { NaverAccountSummary } from "@/types/tenant";

function toSummary(row: Awaited<ReturnType<typeof listNaverAccounts>>[0]): NaverAccountSummary {
  return {
    id: row.id,
    naverId: row.naver_id,
    label: row.label,
    vmLabel: row.vm_label,
    isActive: row.is_active,
    createdAt: row.created_at,
  };
}

export async function GET() {
  if (!(await isAuthenticated()) || !(await isMasterAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = await listNaverAccounts();
    return NextResponse.json({
      accounts: rows.map(toSummary),
      total: rows.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "조회 실패" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated()) || !(await isMasterAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const configError = getSupabaseConfigError();
  if (configError) {
    return NextResponse.json({ error: configError }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  const naverId = String(body.naverId || "").trim();
  if (!naverId) {
    return NextResponse.json({ error: "네이버 아이디를 입력해 주세요." }, { status: 400 });
  }

  try {
    const row = await insertNaverAccount({
      naver_id: naverId,
      label: body.label ? String(body.label) : null,
      vm_label: body.vmLabel ? String(body.vmLabel) : null,
    });
    return NextResponse.json({ success: true, account: toSummary(row) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "등록 실패";
    const status = message.includes("duplicate") || message.includes("unique") ? 409 : 500;
    return NextResponse.json({ error: message }, { status });
  }
}
