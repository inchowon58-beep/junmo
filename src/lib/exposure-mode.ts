export type ExposureMode = "cpa" | "company";

export const DEFAULT_EXPOSURE_MODE: ExposureMode = "company";

export function resolveExposureMode(value: unknown): ExposureMode {
  return value === "cpa" ? "cpa" : "company";
}

export function isCpaExposure(mode: ExposureMode): boolean {
  return mode === "cpa";
}

export function showCompanyContact(mode: ExposureMode): boolean {
  return mode === "company";
}

export const INQUIRY_SECTION_ID = "quick-inquiry";

export function inquiryHref(pathname: string): string {
  if (pathname.startsWith("/guide/")) return `#${INQUIRY_SECTION_ID}`;
  return `/#${INQUIRY_SECTION_ID}`;
}

export function inquiryButtonLabel(mode: ExposureMode, context: "header" | "floating" | "cta"): string {
  if (mode === "cpa") {
    if (context === "header") return "빠른 상담 신청하기";
    return "파양·분양 상담하기";
  }
  if (context === "header" || context === "floating") return "파양·분양 상담";
  return "파양·분양 상담";
}

export function inquiryFormTitle(mode: ExposureMode): string {
  return mode === "cpa" ? "파양·분양 빠른 상담" : "파양·분양 상담하기";
}

/** CPA: 주황(기본) / 업체정보: 검정(보조) */
export function inquiryAccentButtonClass(mode: ExposureMode): string {
  return isCpaExposure(mode)
    ? "bg-orange text-white hover:bg-orange-light"
    : "bg-dark text-white hover:bg-dark-light";
}

/** 어두운 배경 위 문의 버튼 — CPA는 주황, 업체정보는 흰색 보조 */
export function inquiryOnDarkBgClass(mode: ExposureMode): string {
  return isCpaExposure(mode)
    ? "bg-orange text-white hover:bg-orange-light"
    : "bg-white text-dark hover:bg-gray-100";
}
