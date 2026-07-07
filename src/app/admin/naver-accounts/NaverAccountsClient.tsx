"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { NaverAccountSummary } from "@/types/tenant";

export default function NaverAccountsClient() {
  const [accounts, setAccounts] = useState<NaverAccountSummary[]>([]);
  const [naverId, setNaverId] = useState("");
  const [label, setLabel] = useState("");
  const [vmLabel, setVmLabel] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/naver-accounts", { cache: "no-store" });
      if (res.status === 401) {
        window.location.href = "/admin/master";
        return;
      }
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "목록 조회 실패");
        return;
      }
      setAccounts(Array.isArray(data.accounts) ? data.accounts : []);
    } catch {
      setError("네트워크 오류");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMessage("");
    setError("");
    try {
      const res = await fetch("/api/admin/naver-accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ naverId, label, vmLabel }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "등록 실패");
        return;
      }
      setMessage(`네이버 계정 "${data.account.naverId}" 등록됨`);
      setNaverId("");
      setLabel("");
      setVmLabel("");
      await load();
    } catch {
      setError("네트워크 오류");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(account: NaverAccountSummary) {
    if (!window.confirm(`네이버 계정 "${account.naverId}"을(를) 삭제할까요?`)) return;
    const res = await fetch(`/api/admin/naver-accounts/${account.id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(data.error || "삭제 실패");
      return;
    }
    setMessage("삭제되었습니다.");
    await load();
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-wrap justify-between gap-4 mb-8">
          <div>
            <Link href="/admin/master" className="text-xs text-gray-400 hover:text-orange">
              ← 마스터 설정
            </Link>
            <h1 className="text-2xl font-bold text-dark mt-1">네이버 계정 관리</h1>
            <p className="text-sm text-gray-500 mt-2">
              VM에 설정한 네이버 아이디와 매칭됩니다. 비밀번호는 VM에만 보관하세요.
            </p>
          </div>
          <Link href="/admin/register" className="text-sm text-orange hover:underline shrink-0">
            신규 사이트 등록 →
          </Link>
        </div>

        {message && (
          <p className="mb-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
            {message}
          </p>
        )}
        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </p>
        )}

        <form
          onSubmit={handleAdd}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 space-y-4"
        >
          <h2 className="font-bold text-dark">계정 추가</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">네이버 아이디 *</label>
              <input
                value={naverId}
                onChange={(e) => setNaverId(e.target.value)}
                required
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-orange"
                placeholder="VM과 동일한 ID"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">메모 (선택)</label>
              <input
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-orange"
                placeholder="예: worker-037"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">VM 번호 (선택)</label>
              <input
                value={vmLabel}
                onChange={(e) => setVmLabel(e.target.value)}
                className="w-full px-3 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-orange"
                placeholder="예: VM-037"
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="px-5 py-2.5 bg-orange text-white font-bold rounded-xl hover:bg-orange-light disabled:opacity-50"
          >
            {saving ? "등록 중..." : "계정 등록"}
          </button>
        </form>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {loading ? (
            <p className="p-8 text-center text-gray-400 text-sm">불러오는 중...</p>
          ) : accounts.length === 0 ? (
            <p className="p-8 text-center text-gray-500 text-sm">등록된 네이버 계정이 없습니다.</p>
          ) : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-500 uppercase">
                <tr>
                  <th className="px-4 py-3 text-left">네이버 ID</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">메모</th>
                  <th className="px-4 py-3 text-left hidden sm:table-cell">VM</th>
                  <th className="px-4 py-3 text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {accounts.map((a) => (
                  <tr key={a.id} className="hover:bg-orange/5">
                    <td className="px-4 py-3 font-mono font-medium">{a.naverId}</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{a.label || "—"}</td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{a.vmLabel || "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(a)}
                        className="text-xs text-red-600 hover:underline"
                      >
                        삭제
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <p className="text-xs text-gray-400 mt-6 text-center">
          VM은 메인 도메인 <code className="bg-gray-100 px-1 rounded">/api/naver-register-worker/jobs?naverId=...</code> 를
          폴링합니다. docs/NAVER_REGISTER_WORKER.md 참고.
        </p>
      </div>
    </div>
  );
}
