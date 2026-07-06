import type { TenantContentData } from "@/types/tenant";

export type DesignVariant = "classic" | "modern" | "bold";

export interface TenantStatItem {
  label: string;
  value: string;
  suffix: string;
}

function hashString(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

const DESIGN_VARIANTS: DesignVariant[] = ["classic", "modern", "bold"];

const HERO_BADGES = [
  "폐업 철거, 부담 없이 마무리",
  "전문 철거 원스톱 파트너",
  "빠르고 깔끔한 철거 솔루션",
  "지역 맞춤 철거 전문",
  "믿을 수 있는 철거 파트너",
  "합리적 견적 · 신속 시공",
];

const HERO_INTROS = [
  "폐업지원금 신청부터 철거·원상복구까지",
  "현장 실측부터 마감·인허가까지",
  "철거 계획 수립부터 완공·정리까지",
  "무료 방문 견적부터 원상복구까지",
];

const HERO_CLOSINGS = [
  "가 한 번에 해결합니다",
  "가 책임지고 진행합니다",
  "와 함께라면 걱정 없습니다",
  "이 든든하게 도와드립니다",
];

const ABOUT_SNIPPETS = [
  "지역 특성에 맞춘 맞춤형 철거 계획을 제안합니다.",
  "현장 조건을 꼼꼼히 확인한 뒤 합리적인 견적을 드립니다.",
  "철거 전·후까지 책임지는 원스톱 서비스를 제공합니다.",
  "빠른 일정 조율과 깔끔한 마감으로 만족도를 높입니다.",
];

const STATS_SETS: TenantStatItem[][] = [
  [
    { label: "누적 상담 건수", value: "4,200+", suffix: "" },
    { label: "월 평균 시공", value: "85+", suffix: "건" },
    { label: "무료 방문 견적", value: "100", suffix: "%" },
    { label: "지원금 수급 성공률", value: "96", suffix: "%" },
  ],
  [
    { label: "현장 방문 견적", value: "3,800+", suffix: "건" },
    { label: "평균 시공 기간", value: "3~5", suffix: "일" },
    { label: "재의뢰 고객", value: "78", suffix: "%" },
    { label: "지역 커버리지", value: "전국", suffix: "" },
  ],
  [
    { label: "연간 시공 실적", value: "1,200+", suffix: "건" },
    { label: "견적 만족도", value: "98", suffix: "%" },
    { label: "당일 상담 응답", value: "95", suffix: "%" },
    { label: "현장 정리 완료율", value: "100", suffix: "%" },
  ],
];

const WHY_US_TITLES = [
  "합리적인 견적을 제안할 수 있는 이유",
  "고객이 다시 찾는 이유",
  "믿고 맡길 수 있는 이유",
];

/** 서브도메인 시드로 사이트마다 다른 문구·디자인 패키지 생성 */
export function pickTenantContentPackage(
  seed: string,
  siteName: string,
  keywords: string,
  bodyContent: string
): TenantContentData {
  const h = hashString(seed);
  const firstKeyword = keywords.split(/[,\n]/)[0]?.trim() || siteName;
  const intro = HERO_INTROS[h % HERO_INTROS.length];
  const closing = HERO_CLOSINGS[(h >> 3) % HERO_CLOSINGS.length];
  const about = bodyContent.trim() || ABOUT_SNIPPETS[h % ABOUT_SNIPPETS.length];

  return {
    designVariant: DESIGN_VARIANTS[h % DESIGN_VARIANTS.length],
    heroBadge: HERO_BADGES[h % HERO_BADGES.length],
    heroIntro: intro,
    heroClosing: closing,
    heroLead: `${intro}\n${siteName}${closing}`,
    aboutText: about,
    whyUsTitle: WHY_US_TITLES[h % WHY_US_TITLES.length],
    stats: STATS_SETS[h % STATS_SETS.length],
    tagline: firstKeyword.includes("철거")
      ? `${firstKeyword} 전문 · ${siteName}`
      : `${siteName} | ${firstKeyword} 전문`,
    description: about.slice(0, 160) || `${siteName} 공식 사이트`,
    keywords,
    body: bodyContent,
  };
}

export function getDefaultStats(): TenantStatItem[] {
  return STATS_SETS[0];
}
