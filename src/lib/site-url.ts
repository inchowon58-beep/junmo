import { headers } from "next/headers";
import type { SiteConfig } from "./site-config-types";
import { DEFAULT_SITE_CONFIG } from "./site-config-types";

function fromEnv(): string | null {
  const value =
    process.env.SITE_URL?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return value ? value.replace(/\/$/, "") : null;
}

function hostFromHeadersGetter(
  getHeader: (name: string) => string | null
): string | null {
  const raw =
    getHeader("x-forwarded-host") ||
    getHeader("host");
  if (!raw) return null;
  const clean = raw.split(",")[0].trim().replace(/^www\./, "");
  const proto = getHeader("x-forwarded-proto") || "https";
  return `${proto}://${clean}`.replace(/\/$/, "");
}

/** 요청 hostname 우선 — 테넌트 서브도메인 사이트맵·RSS용 */
export function getSiteUrlFromRequest(request: Request): string {
  const fromReq = hostFromHeadersGetter((name) => request.headers.get(name));
  if (fromReq) return fromReq;

  return fromEnv() || DEFAULT_SITE_CONFIG.url.replace(/\/$/, "");
}

export async function getSiteUrlAsync(config?: Pick<SiteConfig, "url">): Promise<string> {
  try {
    const { getResolvedSiteConfig } = await import("@/utils/siteConfig");
    const { config: resolved, isTenant } = await getResolvedSiteConfig();
    if (isTenant && resolved.url) {
      return resolved.url.replace(/\/$/, "");
    }
  } catch {
    // ignore
  }

  try {
    const h = await headers();
    const fromReq = hostFromHeadersGetter((name) => h.get(name));
    if (fromReq) return fromReq;
  } catch {
    // headers() unavailable outside request
  }

  const envUrl = fromEnv();
  if (envUrl) return envUrl;

  return (config?.url || DEFAULT_SITE_CONFIG.url).replace(/\/$/, "");
}

export function getSiteUrl(config?: Pick<SiteConfig, "url">): string {
  return fromEnv() || (config?.url || DEFAULT_SITE_CONFIG.url).replace(/\/$/, "");
}

export function escapeXml(value: string | undefined | null): string {
  if (value == null) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function toCdata(value: string): string {
  return `<![CDATA[${value.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

export function stripHtml(value: string | undefined | null): string {
  if (!value) return "";
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function toRfc822(date: string | Date | undefined | null): string {
  const parsed = date ? new Date(date) : new Date();
  if (Number.isNaN(parsed.getTime())) {
    return new Date().toUTCString();
  }
  return parsed.toUTCString();
}
