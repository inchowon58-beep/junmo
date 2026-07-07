import type { TenantContentData } from "@/types/tenant";

type Rng = () => number;

interface AboutFeature {
  icon: string;
  title: string;
  description: string;
}

interface BusinessArea {
  title: string;
  description: string;
  tags: string[];
  imageIndex: number;
}

interface FaqItem {
  question: string;
  answer: string;
}

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

const TRUST_BADGES = [
  "🏆 10년+ 철거 전문",
  "📋 증빙서류 100% 제공",
  "⏱️ 시간 약속 100% 엄수",
  "🛡️ 안전사고 0건",
  "📞 24시간 상시 대기",
];

const ABOUT_FEATURES: Omit<AboutFeature, "icon">[] = [
  {
    title: "직접 시공 · 중간 마진 없음",
    description:
      "모든 작업을 자체 전문 인력이 직접 수행합니다. 외주 없이 처리하여 품질과 비용을 모두 잡습니다.",
  },
  {
    title: "투명한 견적 · 추가 비용 없음",
    description:
      "처음 견적 그대로 진행합니다. 폐기물 처리비 등 숨겨진 비용이 일절 없습니다.",
  },
  {
    title: "법적 허가 · 증빙서류 완비",
    description:
      "지자체 승인 폐기물 처리 허가 보유. 세금계산서 및 모든 처리 증빙서류를 100% 제공합니다.",
  },
];

const ABOUT_ICONS = ["🎯", "🔒", "📄"];

const BUSINESS_AREA_TEMPLATES: Omit<BusinessArea, "imageIndex">[] = [
  {
    title: "상가철거",
    description: "건물·상가 철거 및 부분철거를 완벽하게 진행하고 있습니다.",
    tags: ["상가철거", "부분철거", "원상복구"],
  },
  {
    title: "아파트철거",
    description: "인테리어 철거부터 부분철거까지 합리적인 가격으로 원스톱 서비스.",
    tags: ["인테리어 철거", "부분철거", "욕실철거"],
  },
  {
    title: "폐기물처리",
    description: "혼합폐기물, 폐콘크리트, 산업폐기물, 인테리어 폐기물 등 처리합니다.",
    tags: ["건설폐기물", "산업폐기물", "일반폐기물"],
  },
  {
    title: "원상복구",
    description: "폐업철거 및 폐업지원금 컨설팅까지 원스톱으로 서비스.",
    tags: ["폐업지원금", "폐업철거", "업종변경"],
  },
];

const PROCESS_STEPS_B = [
  { step: "01", title: "무료 상담", desc: "전화 또는 온라인으로\n현장 상황을 상담합니다" },
  { step: "02", title: "현장 방문", desc: "전문가가 직접 방문하여\n현장을 정밀 확인합니다" },
  { step: "03", title: "견적 확정", desc: "추가 비용 없는\n투명한 견적을 제공합니다" },
  { step: "04", title: "전문 시공", desc: "숙련된 전문 인력이\n안전하게 시공합니다" },
  { step: "05", title: "완료 · 서류", desc: "마무리 정리 후\n증빙서류를 발행합니다" },
];

const WHY_US_B = [
  { icon: "🏆", title: "10년 이상 전문 경력", desc: "수백 건의 시공 경험으로 어떤 어려운 현장도 노하우로 해결합니다." },
  { icon: "⚙️", title: "최신 전문 장비 직보유", desc: "업계 최신 중장비를 직접 보유하여 빠르고 정밀한 작업이 가능합니다." },
  { icon: "⏰", title: "시간 약속 100% 엄수", desc: "고객님과 약속한 시간에 반드시 방문합니다." },
  { icon: "🛡️", title: "안전사고 0건 · 민원 없는 시공", desc: "소음·분진 방지부터 안전 관리까지 철저히 준비합니다." },
  { icon: "💰", title: "견적 그대로 · 추가 비용 없음", desc: "폐기물 처리비, 장비비 등 어떤 명목의 추가 청구도 없습니다." },
];

const STATS_GRID_B = [
  { label: "철거 전문 경력", value: "10년+", suffix: "" },
  { label: "누적 시공 건수", value: "4,200+", suffix: "" },
  { label: "전문 인력", value: "50+", suffix: "" },
  { label: "365일 상시 대기", value: "24/7", suffix: "" },
  { label: "안전사고 기록", value: "0", suffix: "건" },
  { label: "전국 폐기물 처리장", value: "17", suffix: "" },
];

const FAQ_POOL: FaqItem[] = [
  {
    question: "출장 견적은 정말 무료인가요?",
    answer:
      "네, 서울·경기·인천 전 지역 출장 견적은 완전 무료입니다. 현장을 직접 방문해 정확한 견적을 드리며, 견적 후 계약을 강요하지 않습니다.",
  },
  {
    question: "폐기물 처리 증빙서류를 발급받을 수 있나요?",
    answer:
      "네, 지자체 승인 폐기물 처리 허가를 보유하고 있습니다. 세금계산서, 폐기물 처리 확인서 등 모든 증빙서류를 100% 발행해드립니다.",
  },
  {
    question: "당일 또는 긴급 출장이 가능한가요?",
    answer:
      "24시간 상시 대기 중으로, 긴급 상황 시 당일 출장도 가능합니다. 먼저 전화로 현장 상황을 알려주시면 가장 빠른 방법을 안내해 드립니다.",
  },
  {
    question: "처음 견적에서 추가 비용이 생기나요?",
    answer:
      "절대 없습니다. 현장 방문 후 확정된 견적 그대로 진행합니다. 폐기물 처리비, 장비 사용비 등 어떤 명목으로도 추가 청구를 하지 않습니다.",
  },
  {
    question: "폐업 지원금 컨설팅도 함께 받을 수 있나요?",
    answer:
      "네, 철거 의뢰 고객님께는 폐업지원금 컨설팅을 무료로 제공합니다. 정부지원금과 지자체 지원금을 합쳐 최대 700만원까지 받으실 수 있습니다.",
  },
];

const MARQUEE_LINES = [
  "서울·경기·인천 전 지역 무료 출장 견적",
  "24시간 365일 상시 대기중",
  "안전사고 0건 · 시간 약속 100% 엄수",
  "폐업지원금 최대 700만원 컨설팅 무료 제공",
  "정산 및 증빙서류 100% 제공",
];

export function pickDesignBExtras(
  rng: Rng,
  region: string,
  siteName: string,
  firstKeyword: string,
  maxImages: number
): Partial<TenantContentData> {
  const imagePool = shuffle(
    Array.from({ length: maxImages }, (_, i) => i + 1),
    rng
  );

  const businessAreas: BusinessArea[] = BUSINESS_AREA_TEMPLATES.map((item, i) => ({
    ...item,
    imageIndex: imagePool[i % imagePool.length],
  }));

  const aboutFeatures: AboutFeature[] = ABOUT_FEATURES.map((item, i) => ({
    icon: ABOUT_ICONS[i],
    ...item,
  }));

  return {
    heroKeyword: firstKeyword || `${region}철거`,
    trustBadges: TRUST_BADGES,
    marqueeLines: MARQUEE_LINES,
    aboutFeatures,
    businessAreas,
    processSteps: PROCESS_STEPS_B,
    whyUsItems: WHY_US_B.map((item, i) => ({
      num: String(i + 1).padStart(2, "0"),
      title: item.title,
      highlight: item.title,
      sub: item.desc,
    })),
    stats: pickOne(
      [
        [
          { label: "전문 인력 운영", value: "50", suffix: "+" },
          { label: "전국 폐기물 처리장", value: "17", suffix: "" },
          { label: "안전사고 무사고", value: "100", suffix: "%" },
          { label: "누적 시공 건수", value: "4,200", suffix: "+" },
        ],
        STATS_GRID_B.slice(0, 4),
      ],
      rng
    ),
    statsGrid: STATS_GRID_B,
    faqItems: shuffle(FAQ_POOL, rng).slice(0, 5),
    heroSubline: `철거·폐기물처리 전문 · ${siteName}`,
    sectionOrder: [
      "about",
      "business",
      "process",
      "whyUs",
      "regions",
      "support",
      "cases",
      "reviews",
      "faq",
      "cta",
    ],
  };
}
