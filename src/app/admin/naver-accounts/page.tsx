import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { isAuthenticated, isMasterAuthenticated } from "@/lib/auth";
import NaverAccountsClient from "./NaverAccountsClient";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "네이버 계정 관리",
    robots: { index: false, follow: false },
  };
}

export default async function NaverAccountsPage() {
  const authed = await isAuthenticated();
  if (!authed) redirect("/");

  const master = await isMasterAuthenticated();
  if (!master) redirect("/admin/master");

  return <NaverAccountsClient />;
}
