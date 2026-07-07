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
  ["믿음은", "두 번째로", "시작되기도."],
  ["새 출발은", "깔끔한 철거", "에서."],
  ["폐업도", "다시 일어설", "수 있습니다."],
  ["전문 철거가", "당신의", "다음을 엽니다."],
];

const HERO_SUBTITLES = [
  "오늘도 현장에서 믿음의 자리를 지켰습니다. 오늘은 당신의 차례일지도 몰라요.",
  "복잡한 철거, 저희가 끝까지 함께하겠습니다.",
  "폐업지원금부터 원상복구까지, 한 번에 해결하세요.",
];

const MISSION_TITLES = [
  ["판단하지 않고,", "끝까지 함께", "있겠습니다."],
  ["투명하게,", "끝까지", "책임지겠습니다."],
];

const PROMISES = [
  {
    num: "01",
    title: "추가 비용은 없습니다",
    description:
      "처음 견적 그대로 진행합니다. 폐기물 처리비 등 숨겨진 비용을 청구하지 않습니다.",
  },
  {
    num: "02",
    title: "평생 책임집니다",
    description:
      "시공 후에도 문의와 A/S에 성실히 응합니다. 끝까지 함께하는 파트너가 되겠습니다.",
  },
  {
    num: "03",
    title: "투명하게 공개합니다",
    description:
      "현장 사진, 처리 내역, 증빙서류까지. 숨기지 않는 것이 신뢰의 시작입니다.",
  },
];

const PROCESS_C = [
  { step: "1", title: "만나보기", desc: "홈페이지에서 상담을 신청하고\n방문 일정을 잡아요." },
  { step: "2", title: "안심 상담", desc: "현장 환경을 듣고\n맞는 철거 계획을 세워요." },
  { step: "3", title: "실제 시공", desc: "전문 인력이 안전하게\n철거와 정리를 진행해요." },
  { step: "4", title: "완료 · 서류", desc: "마무리 후 증빙서류와\n처리 확인서를 드려요." },
];

const SERVICE_TEMPLATES = [
  { title: "상가철거", description: "건물·상가 철거 및 부분철거를 완벽하게 진행합니다.", tags: ["상가철거", "부분철거"] },
  { title: "아파트철거", description: "인테리어 철거부터 부분철거까지 원스톱 서비스.", tags: ["인테리어", "부분철거"] },
  { title: "폐기물처리", description: "혼합폐기물, 산업폐기물, 인테리어 폐기물 등 처리.", tags: ["건설폐기물", "일반폐기물"] },
  { title: "원상복구", description: "폐업철거 및 폐업지원금 컨설팅까지 원스톱.", tags: ["폐업지원금", "원상복구"] },
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
    heroSubline: pickOne(HERO_SUBTITLES, rng).replace("저희", siteName),
    missionLines,
    missionBody: `${siteName}은 ${region} 지역을 중심으로 폐업철거·원상복구·폐기물 처리를 진행합니다. 어려운 상황의 사업자분께도 문을 열고, 함께 길을 찾겠습니다.`,
    storyTitle: ["작은 약속들이 모여", "한 현장의 완성이", "됩니다."],
    stats: [
      { label: "누적 시공", value: "4,200", suffix: "+" },
      { label: "안전사고", value: "0", suffix: "건" },
      { label: "일 응대", value: "365", suffix: "일" },
      { label: "고객 만족", value: "98", suffix: "%" },
    ],
    businessAreas,
    casesItems: casesItems.slice(0, 6),
    promises: PROMISES,
    processSteps: PROCESS_C,
    supportBlurb:
      "철거와 원상복구는 결코 쉬운 일이 아닙니다. 부담은 잠시 내려놓고, 전문가와 함께 차근차근 진행해 보세요.",
    heroKeyword: firstKeyword || `${region}철거`,
  };
}
