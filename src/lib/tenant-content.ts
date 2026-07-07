import type { TenantContentData } from "@/types/tenant";
import { type SiteDesignId, DEFAULT_SITE_DESIGN } from "@/lib/site-designs";
import { pickDesignBExtras } from "@/lib/tenant-content-b";
import { pickDesignCExtras } from "@/lib/tenant-content-c";
import { pickDesignDExtras } from "@/lib/tenant-content-d";

export type DesignVariant = "classic" | "modern" | "bold";
export type HeaderStyle = "sticky" | "overlay" | "minimal" | "hidden";
export type HomeSectionId =
  | "stats"
  | "support"
  | "cases"
  | "whyUs"
  | "process"
  | "reviews"
  | "inquiry"
  | "partner"
  | "cta";

export interface TenantStatItem {
  label: string;
  value: string;
  suffix: string;
}

export interface TenantCaseItem {
  id: string;
  title: string;
  type: string;
  imageIndex: number;
}

export interface TenantWhyUsItem {
  num: string;
  title: string;
  highlight: string;
  sub: string;
}

export interface TenantProcessItem {
  step: string;
  title: string;
  desc: string;
}

export interface TenantReviewItem {
  name: string;
  business: string;
  text: string;
  rating: number;
}

export const DEFAULT_HOME_SECTION_ORDER: HomeSectionId[] = [
  "stats",
  "support",
  "cases",
  "whyUs",
  "process",
  "reviews",
  "inquiry",
  "partner",
  "cta",
];

export const CASES_COUNT_OPTIONS = [4, 8, 12, 16, 20] as const;

function hashString(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function createRng(seed: number) {
  let state = seed || 1;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 0xffffffff;
  };
}

function shuffle<T>(items: T[], rng: () => number): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickOne<T>(items: T[], rng: () => number): T {
  return items[Math.floor(rng() * items.length)];
}

function extractRegion(keywords: string, siteName: string): string {
  const source = `${keywords} ${siteName}`;
  const match = source.match(
    /(서울|부산|대구|인천|광주|대전|울산|세종|경기|강원|충북|충남|전북|전남|경북|경남|제주|강남|강북|강서|강동|서초|송파|마포|영등포|용산|성동|광진|동작|관악|노원|일산|분당|수원|성남|안양|부천|김포|파주|고양|화성|평택|천안|청주|전주|창원|김해|거제|울산|제주)[^\s,]*/
  );
  if (match) return match[1];
  const first = keywords.split(/[,\n]/)[0]?.trim() || siteName;
  return first.replace(/입양|보호소|유기동물|반려동물|후원|봉사/g, "").trim() || "지역";
}

const DESIGN_VARIANTS: DesignVariant[] = ["classic", "modern", "bold"];
const DESIGN_VARIANTS_B: DesignVariant[] = ["modern", "bold"];
const HEADER_STYLES: HeaderStyle[] = ["sticky", "overlay", "minimal", "hidden"];
const HEADER_STYLES_B: HeaderStyle[] = ["minimal", "sticky"];

const HERO_BADGES = [
  "유기동물 보호, 함께해요",
  "책임 있는 입양 파트너",
  "작은 발걸음에 큰 사랑을",
  "지역 맞춤 보호·입양",
  "믿을 수 있는 보호소",
  "입양·후원·봉사 환영",
  "임시보호와 치료를 한곳에서",
  "투명한 보호소 운영",
];

const HERO_INTROS = [
  "구조부터 치료·입양까지",
  "건강 검진부터 새 가족 찾기까지",
  "임시보호부터 책임 입양까지",
  "후원·봉사로 함께하는 보호까지",
  "상담부터 입양 후 관리까지",
  "사랑으로 돌보는 보호 활동까지",
];

const HERO_CLOSINGS = [
  "를 한곳에서 진행합니다",
  "가 따뜻하게 함께합니다",
  "와 함께라면 희망이 있습니다",
  "이 든든하게 돕습니다",
  "가 끝까지 함께합니다",
];

const ABOUT_SNIPPETS = [
  "유기·유실 동물을 안전하게 보호하고 건강하게 회복시킵니다.",
  "입양 전 상담과 맞춤 매칭으로 행복한 만남을 돕습니다.",
  "후원금 사용 내역을 투명하게 공개하며 운영합니다.",
  "봉사자와 후원자의 따뜻한 손길로 보호소를 운영합니다.",
  "치료·예방접종·중성화를 철저히 관리합니다.",
  "입양 후에도 상담과 건강 관리를 지원합니다.",
];

const SUPPORT_BLURBS = [
  "임시보호, 입양, 후원, 봉사 — 어떤 방식이든 작은 도움이 큰 변화를 만듭니다.",
  "보호소 운영비와 의료비는 후원자분들의 따뜻한 마음으로 이어집니다.",
  "입양을 고민 중이시라면 상담을 통해 맞는 아이를 찾아드립니다.",
  "봉사 참여로 보호 동물에게 산책과 관심을 선물해 주세요.",
];

const WHY_US_TITLES = [
  "보호소를 믿을 수 있는 이유",
  "가족들이 다시 찾는 이유",
  "입양자들이 추천하는 이유",
  "후원자들이 함께하는 이유",
];

const STATS_SETS: TenantStatItem[][] = [
  [
    { label: "누적 구조", value: "1,200+", suffix: "" },
    { label: "입양 성공", value: "890+", suffix: "" },
    { label: "봉사 참여", value: "3,500+", suffix: "" },
    { label: "입양 만족", value: "97", suffix: "%" },
  ],
  [
    { label: "보호 중", value: "120+", suffix: "" },
    { label: "월 평균 입양", value: "25+", suffix: "" },
    { label: "정기 후원자", value: "480+", suffix: "" },
    { label: "치료 완료율", value: "99", suffix: "%" },
  ],
  [
    { label: "연간 구조", value: "350+", suffix: "" },
    { label: "임시보호 가정", value: "85+", suffix: "" },
    { label: "상담 응답", value: "당일", suffix: "" },
    { label: "투명 공개", value: "100", suffix: "%" },
  ],
  [
    { label: "평균 상담", value: "2", suffix: "시간" },
    { label: "주말 봉사", value: "가능", suffix: "" },
    { label: "건강 검진", value: "100", suffix: "%" },
    { label: "입양 후 상담", value: "1년", suffix: "" },
  ],
];

const WHY_US_SETS: TenantWhyUsItem[][] = [
  [
    { num: "01", title: "전문 케어팀", highlight: "수의·행동", sub: "전문 상담" },
    { num: "02", title: "책임 입양", highlight: "맞춤 매칭", sub: "사후 관리" },
    { num: "03", title: "투명 운영", highlight: "공개 후원", sub: "정기 보고" },
  ],
  [
    { num: "01", title: "건강 관리", highlight: "검진·접종", sub: "철저 관리" },
    { num: "02", title: "임시보호", highlight: "긴급 구조", sub: "24시 대응" },
    { num: "03", title: "봉사·후원", highlight: "열린 보호소", sub: "함께하기" },
  ],
  [
    { num: "01", title: "맞춤 입양", highlight: "성향 분석", sub: "가족 매칭" },
    { num: "02", title: "교육·상담", highlight: "입양 전후", sub: "지속 지원" },
    { num: "03", title: "지역 협력", highlight: "구조 네트워크", sub: "연계 운영" },
  ],
];

const PROCESS_SETS: TenantProcessItem[][] = [
  [
    { step: "01", title: "문의·상담", desc: "입양·후원·봉사 문의를 접수합니다" },
    { step: "02", title: "방문·만남", desc: "예약 후 보호소에서 아이들을 만납니다" },
    { step: "03", title: "입양·후원", desc: "매칭 후 입양 또는 후원을 진행합니다" },
  ],
  [
    { step: "01", title: "온라인·전화 상담", desc: "관심 분야와 생활 환경을 파악합니다" },
    { step: "02", title: "보호소 방문", desc: "아이들과 직접 만나 성향을 확인합니다" },
    { step: "03", title: "입양·사후 관리", desc: "입양 후에도 상담을 지원합니다" },
  ],
  [
    { step: "01", title: "후원·봉사 문의", desc: "참여 방식을 안내해 드립니다" },
    { step: "02", title: "활동·후원 진행", desc: "봉사 일정 또는 후원을 시작합니다" },
    { step: "03", title: "정기 소식 공유", desc: "보호 현황과 활동 소식을 전합니다" },
  ],
];

const REVIEW_POOL: TenantReviewItem[] = [
  {
    name: "이*진",
    business: "강아지 입양",
    text: "상담부터 입양 후 관리까지 세심하게 챙겨주셔서 우리 가족에게 완벽한 친구를 만났습니다.",
    rating: 5,
  },
  {
    name: "박*수",
    business: "고양이 입양",
    text: "처음 반려동물을 키우는 거라 걱정이 많았는데, 성향 매칭과 입양 후 상담이 큰 도움이 됐어요.",
    rating: 5,
  },
  {
    name: "최*영",
    business: "임시보호",
    text: "긴급 구조된 아이를 임시로 맡았다가 정이 들어 입양하게 됐습니다. 보호소 분들이 정말 따뜻하세요.",
    rating: 5,
  },
  {
    name: "김*호",
    business: "정기 후원",
    text: "후원금 사용 내역을 투명하게 공개해 주셔서 믿고 후원할 수 있습니다.",
    rating: 5,
  },
  {
    name: "정*미",
    business: "봉사 참여",
    text: "주말 산책 봉사에 참여했는데 아이들이 너무 사랑스러웠어요. 다음에도 꼭 다시 오겠습니다.",
    rating: 5,
  },
  {
    name: "한*우",
    business: "노견 입양",
    text: "나이 든 아이를 입양하기 어려울 줄 알았는데, 맞춤 상담 덕분에 행복하게 지내고 있어요.",
    rating: 5,
  },
  {
    name: "윤*아",
    business: "가족 입양",
    text: "아이들과 함께 방문했는데 보호소 분들이 친절하게 안내해 주셔서 좋은 경험이었습니다.",
    rating: 5,
  },
  {
    name: "서*현",
    business: "후원·봉사",
    text: "정기 후원과 봉사를 병행하고 있는데, 보호 동물들의 변화를 보며 보람을 느낍니다.",
    rating: 5,
  },
];

const CASE_TEMPLATES = [
  { title: "{region} 길고양이 구조·입양", type: "구조·입양" },
  { title: "{region} 유기견 치료·재활", type: "치료·재활" },
  { title: "{region} 새끼 고양이 임시보호", type: "임시보호" },
  { title: "{region} 노견·노묘 평생 보호", type: "평생 보호" },
  { title: "{region} 중형견 가족 입양", type: "입양 성공" },
  { title: "{region} 긴급 구조·수술", type: "구조·의료" },
  { title: "{region} 봉사단체 산책", type: "봉사·활동" },
  { title: "{region} 후원 의료비 지원", type: "후원·치료" },
  { title: "{region} 반려묘 입양 매칭", type: "입양·매칭" },
  { title: "{region} 겨울철 길고양이 보호", type: "계절 보호" },
  { title: "{region} 장애견 특별 케어", type: "특별 케어" },
  { title: "{region} 임보 가정 연계", type: "임시보호" },
  { title: "{region} 입양 후 상담 지원", type: "사후 관리" },
  { title: "{region} 어린이 봉사 체험", type: "교육·봉사" },
  { title: "{region} 보호소 시설 개선", type: "시설·후원" },
  { title: "{region} 유기묘 중성화", type: "의료·예방" },
  { title: "{region} 지역 구조 네트워크", type: "구조·협력" },
  { title: "{region} 정기 후원자 케어", type: "후원·운영" },
  { title: "{region} 다묘 가정 입양", type: "입양 성공" },
  { title: "{region} 유기동물 교육", type: "교육·홍보" },
];

function pickCases(
  rng: () => number,
  count: number,
  region: string,
  maxImages: number
): TenantCaseItem[] {
  const imagePool = shuffle(
    Array.from({ length: maxImages }, (_, i) => i + 1),
    rng
  );
  const templates = shuffle(CASE_TEMPLATES, rng);
  return Array.from({ length: count }, (_, i) => ({
    id: `case-${i + 1}`,
    title: templates[i % templates.length].title.replace("{region}", region),
    type: templates[i % templates.length].type,
    imageIndex: imagePool[i % imagePool.length],
  }));
}

function pickSectionOrder(rng: () => number): HomeSectionId[] {
  const optionalHidden = shuffle(
    ["partner", "cta", "stats", "reviews"] as HomeSectionId[],
    rng
  );
  const hideCount = Math.floor(rng() * 2);
  const hidden = new Set(optionalHidden.slice(0, hideCount));
  const core = shuffle(
    DEFAULT_HOME_SECTION_ORDER.filter((id) => !hidden.has(id)),
    rng
  );
  return core;
}

/** 서브도메인 시드로 사이트마다 다른 문구·레이아웃·이미지 패키지 생성 */
export function pickTenantContentPackage(
  seed: string,
  siteName: string,
  keywords: string,
  bodyContent: string,
  imageCount = 20,
  siteDesign: SiteDesignId = DEFAULT_SITE_DESIGN
): TenantContentData {
  const designSeed =
    siteDesign === "b"
      ? `${seed}:design-b`
      : siteDesign === "c"
        ? `${seed}:design-c`
        : siteDesign === "d"
          ? `${seed}:design-d`
          : seed;
  const layoutSeed = hashString(designSeed);
  const rng = createRng(layoutSeed);
  const isDesignB = siteDesign === "b";
  const isDesignC = siteDesign === "c";
  const isDesignD = siteDesign === "d";
  const isAltDesign = isDesignB || isDesignC || isDesignD;
  const maxImages = Math.max(4, imageCount);
  const region = extractRegion(keywords, siteName);
  const firstKeyword = keywords.split(/[,\n]/)[0]?.trim() || siteName;
  const intro = pickOne(HERO_INTROS, rng);
  const closing = pickOne(HERO_CLOSINGS, rng);
  const about = bodyContent.trim() || pickOne(ABOUT_SNIPPETS, rng);
  const casesCount = pickOne([...CASES_COUNT_OPTIONS], rng);
  const heroImageIndex = Math.floor(rng() * maxImages) + 1;
  const supportImageIndex = Math.floor(rng() * maxImages) + 1;
  const reviews = shuffle(REVIEW_POOL, rng).slice(0, 4 + Math.floor(rng() * 3));

  const base: TenantContentData = {
    siteDesign,
    layoutSeed,
    headerStyle: pickOne(isAltDesign ? HEADER_STYLES_B : HEADER_STYLES, rng),
    sectionOrder: isAltDesign ? [] : pickSectionOrder(rng),
    designVariant: pickOne(isAltDesign ? DESIGN_VARIANTS_B : DESIGN_VARIANTS, rng),
    heroBadge: pickOne(HERO_BADGES, rng),
    heroIntro: intro,
    heroClosing: closing,
    heroLead: `${intro}\n${siteName}${closing}`,
    heroImageIndex,
    supportImageIndex,
    aboutText: about,
    supportBlurb: pickOne(SUPPORT_BLURBS, rng),
    whyUsTitle: pickOne(WHY_US_TITLES, rng),
    whyUsItems: pickOne(WHY_US_SETS, rng),
    processSteps: pickOne(PROCESS_SETS, rng),
    reviews,
    reviewsSatisfaction: `${94 + Math.floor(rng() * 5)}%`,
    stats: pickOne(STATS_SETS, rng),
    casesCount,
    casesItems: pickCases(rng, casesCount, region, maxImages),
    tagline: firstKeyword.includes("입양") || firstKeyword.includes("보호")
      ? `${firstKeyword} · ${siteName}`
      : `${siteName} | ${firstKeyword}`,
    description: about.slice(0, 160) || `${siteName} 공식 사이트`,
    keywords,
    body: bodyContent || about,
  };

  if (isDesignB) {
    const bExtras = pickDesignBExtras(rng, region, siteName, firstKeyword, maxImages);
    return { ...base, ...bExtras };
  }

  if (isDesignC) {
    const casesItems = base.casesItems || [];
    const cExtras = pickDesignCExtras(
      rng,
      region,
      siteName,
      firstKeyword,
      maxImages,
      casesItems
    );
    return { ...base, ...cExtras };
  }

  if (isDesignD) {
    const casesItems = base.casesItems || [];
    const dExtras = pickDesignDExtras(
      rng,
      region,
      siteName,
      firstKeyword,
      maxImages,
      casesItems
    );
    return { ...base, ...dExtras };
  }

  return {
    ...base,
    sectionOrder: pickSectionOrder(rng),
  };
}

/** DB에 저장된 테넌트 UI — 없으면 시드로 생성 (기존 사이트 호환) */
export function resolveTenantContentData(
  content: TenantContentData | undefined | null,
  subdomain: string,
  siteName: string,
  keywords = "",
  bodyContent = "",
  imageCount = 20
): TenantContentData {
  if (content?.layoutSeed != null && content.sectionOrder?.length) {
    return content;
  }

  const pkg = pickTenantContentPackage(
    subdomain,
    siteName,
    keywords || content?.keywords || "",
    bodyContent || content?.body || "",
    imageCount,
    content?.siteDesign || DEFAULT_SITE_DESIGN
  );

  return {
    ...pkg,
    tagline: content?.tagline || pkg.tagline,
    keywords: content?.keywords || pkg.keywords,
    body: content?.body || pkg.body,
    description: content?.description || pkg.description,
    aboutText: content?.aboutText || pkg.aboutText,
  };
}

export function getDefaultStats(): TenantStatItem[] {
  return STATS_SETS[0];
}
