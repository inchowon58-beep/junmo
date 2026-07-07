/** 사이트 생성 시 선택하는 상위 디자인 템플릿 */
export const SITE_DESIGN_OPTIONS = [
  {
    id: "a",
    label: "A 디자인",
    description: "기본 레이아웃 · 좌측 히어로 · 랜덤 섹션·헤더 변형",
    preview: {
      heroAlign: "left" as const,
      headerStyle: "standard" as const,
      statsStyle: "dark-bar" as const,
      sectionOrder: ["통계", "지원", "시공", "강점", "절차", "후기", "문의"],
      features: ["좌측 정렬 히어로", "다크 통계 바", "섹션 순서 랜덤", "classic/modern/bold 변형"],
    },
  },
  {
    id: "b",
    label: "B 디자인",
    description: "cleneo 스타일 · 상단 띠배너 · 센터 히어로 · 사업영역·FAQ·폐업지원금",
    preview: {
      heroAlign: "center" as const,
      headerStyle: "minimal" as const,
      statsStyle: "cards" as const,
      sectionOrder: ["소개", "사업영역", "절차", "선택이유", "지원금", "시공", "후기", "FAQ"],
      features: ["상단 마퀴", "5단계 절차", "사업영역 카드", "FAQ 아코디언", "폐업지원금 박스"],
    },
  },
] as const;

export type SiteDesignId = (typeof SITE_DESIGN_OPTIONS)[number]["id"];

export const DEFAULT_SITE_DESIGN: SiteDesignId = "a";

const DESIGN_IDS = new Set<string>(SITE_DESIGN_OPTIONS.map((o) => o.id));

/** 미리보기·와이어프레임 렌더용 스펙 */
export type SiteDesignPreviewSpec = {
  heroAlign: "left" | "center";
  headerStyle: "standard" | "minimal" | "overlay";
  statsStyle: "dark-bar" | "cards";
  sectionOrder: readonly string[];
  features: readonly string[];
};

export type SiteDesignOption = (typeof SITE_DESIGN_OPTIONS)[number];

export function parseSiteDesignId(value: unknown): SiteDesignId {
  const id = String(value || "").toLowerCase();
  return DESIGN_IDS.has(id) ? (id as SiteDesignId) : DEFAULT_SITE_DESIGN;
}

export function siteDesignLabel(id: SiteDesignId | string | null | undefined): string {
  const found = SITE_DESIGN_OPTIONS.find((o) => o.id === id);
  return found?.label ?? "A 디자인";
}

export function getSiteDesignOption(id: SiteDesignId | string): SiteDesignOption {
  return (
    SITE_DESIGN_OPTIONS.find((o) => o.id === id) ??
    SITE_DESIGN_OPTIONS[0]
  );
}

export function getSiteDesignPreview(id: SiteDesignId | string): SiteDesignPreviewSpec {
  return getSiteDesignOption(id).preview;
}
