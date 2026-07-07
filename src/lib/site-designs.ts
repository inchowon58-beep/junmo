/** 사이트 생성 시 선택하는 상위 디자인 템플릿 */
export type SiteDesignId = "a" | "b";

export const DEFAULT_SITE_DESIGN: SiteDesignId = "a";

export interface SiteDesignOption {
  id: SiteDesignId;
  label: string;
  description: string;
}

export const SITE_DESIGN_OPTIONS: SiteDesignOption[] = [
  {
    id: "a",
    label: "A 디자인",
    description: "기본 레이아웃 · 좌측 히어로 · 랜덤 섹션·헤더 변형",
  },
  {
    id: "b",
    label: "B 디자인",
    description: "센터 히어로 · 카드형 통계 · 시공사례·지원 우선 배치",
  },
];

export function parseSiteDesignId(value: unknown): SiteDesignId {
  return value === "b" ? "b" : "a";
}

export function siteDesignLabel(id: SiteDesignId | string | null | undefined): string {
  const found = SITE_DESIGN_OPTIONS.find((o) => o.id === id);
  return found?.label ?? "A 디자인";
}
