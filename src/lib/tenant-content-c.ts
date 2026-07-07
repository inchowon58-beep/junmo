import type { TenantContentData } from "@/types/tenant";

type Rng = () => number;

function pickOne<T>(items: T[], rng: Rng): T {
  return items[Math.floor(rng() * items.length)];
}

function shuffle<T>(items: T[], rng: Rng): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const HERO_LINE_POOLS: string[][] = [
  ["사랑은", "두 번째", "시작이기도."],
  ["버려진 아이도", "다시 웃을", "수 있습니다."],
  ["작은 발걸음이", "큰 가족을", "만듭니다."],
  ["함께라면", "어떤 상처도", "치유됩니다."],
];

const HERO_SUBTITLES = [
  "오늘도 보호소에서 작은 생명들이 새 희망을 기다리고 있습니다. 당신의 따뜻한 손길이 필요해요.",
  "입양, 임시보호, 후원, 봉사 — 어떤 방식이든 함께해 주세요.",
  "유기·유실 동물을 안전하게 보호하고, 건강하게 회복시켜 새 가족을 찾아드립니다.",
];

const MISSION_TITLES = [
  ["판단하지 않고,", "끝까지 함께", "돌봅니다."],
  ["생명을 존중하며,", "투명하게", "보호합니다."],
];

const PROMISES = [
  {
    num: "01",
    title: "생명을 최우선으로",
    description:
      "모든 보호 동물에게 충분한 식사, 치료, 사랑을 제공합니다. 건강 검진과 예방접종을 철저히 관리합니다.",
  },
  {
    num: "02",
    title: "책임 있는 입양",
    description:
      "입양 전·후 상담과 맞춤 매칭으로 동물과 가족 모두가 행복한 만남이 되도록 돕습니다.",
  },
  {
    num: "03",
    title: "투명한 운영",
    description:
      "후원금 사용 내역과 보호 현황을 정기적으로 공개합니다. 믿고 함께할 수 있는 보호소가 되겠습니다.",
  },
];

const PROCESS_C = [
  { step: "1", title: "문의·상담", desc: "홈페이지나 전화로\n입양·후원·봉사를 문의해요." },
  { step: "2", title: "방문·만남", desc: "예약 후 보호소를 방문해\n아이들을 만나보세요." },
  { step: "3", title: "매칭·결정", desc: "생활 환경과 성향을 고려해\n맞는 아이를 찾아드려요." },
  { step: "4", title: "입양·후속", desc: "입양 후에도 상담과\n건강 관리를 지원해요." },
];

const SERVICE_TEMPLATES = [
  { title: "입양", description: "건강 검진을 마친 보호 동물의 책임 있는 입양을 진행합니다.", tags: ["입양", "매칭"] },
  { title: "임시보호", description: "긴급 구조·치료가 필요한 아이들을 임시로 보호합니다.", tags: ["임시보호", "구조"] },
  { title: "후원", description: "사료·의료비·시설 운영을 위한 정기·일시 후원을 받습니다.", tags: ["후원", "기부"] },
  { title: "봉사", description: "산책, 청소, 미용 등 보호소 활동 봉사를 환영합니다.", tags: ["봉사", "활동"] },
];

export function pickDesignCExtras(
  rng: Rng,
  region: string,
  siteName: string,
  firstKeyword: string,
  maxImages: number,
  casesItems: NonNullable<TenantContentData["casesItems"]>
): Partial<TenantContentData> {
  const imagePool = shuffle(
    Array.from({ length: maxImages }, (_, i) => i + 1),
    rng
  );

  const businessAreas = SERVICE_TEMPLATES.map((item, i) => ({
    ...item,
    imageIndex: imagePool[i % imagePool.length],
  }));

  const missionLines = pickOne(MISSION_TITLES, rng);

  return {
    heroLines: pickOne(HERO_LINE_POOLS, rng),
    heroSubline: pickOne(HERO_SUBTITLES, rng).replace("보호소", siteName),
    missionLines,
    missionBody: `${siteName}은 유기·유실 반려동물을 보호하고 회복시켜 새 가족을 찾아주는 비영리 보호 단체입니다. ${region} 지역을 중심으로 구조·치료·입양·교육을 진행하며, 모든 생명이 존중받는 세상을 만들어 갑니다.`,
    storyTitle: ["작은 발걸음이 모여", "큰 사랑이", "됩니다."],
    stats: [
      { label: "누적 구조", value: "1,200", suffix: "+" },
      { label: "입양 성공", value: "890", suffix: "+" },
      { label: "봉사 참여", value: "3,500", suffix: "+" },
      { label: "입양 만족", value: "97", suffix: "%" },
    ],
    businessAreas,
    casesItems: casesItems.slice(0, 6),
    promises: PROMISES,
    processSteps: PROCESS_C,
    supportBlurb:
      "보호소 운영은 혼자서는 어렵습니다. 입양, 임시보호, 후원, 봉사 — 어떤 방식이든 작은 도움이 큰 변화를 만듭니다.",
    heroKeyword: firstKeyword || `${region}유기동물`,
  };
}
