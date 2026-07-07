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

const HERO_EYEBROWS = [
  "Premium Demolition Expert",
  "Expert Demolition Partner",
  "Professional Demolition Service",
];

const ABOUT_BULLETS = [
  "투명한 견적과 추가 비용 없는 프리미엄 철거 시스템",
  "상가·아파트·폐업철거 등 업종별 맞춤 상담",
  "폐기물 처리·원상복구·폐업지원금 체계적 안내",
  "긴급 철거부터 대형 현장까지 책임 있는 시공 프로세스",
];

const SERVICE_CARDS = [
  {
    title: "상가철거",
    englishLabel: "Commercial Demolition",
    description: "건강 검증을 완료한 전문 인력이 상가·건물 철거를 책임감 있게 진행합니다.",
  },
  {
    title: "아파트철거",
    englishLabel: "Apartment Demolition",
    description: "인테리어 철거부터 부분철거까지 원스톱으로 처리합니다.",
  },
  {
    title: "폐기물처리",
    englishLabel: "Waste Management",
    description: "혼합폐기물, 산업폐기물, 건설폐기물 등 법적 허가 하에 처리합니다.",
  },
  {
    title: "원상복구",
    englishLabel: "Restoration Service",
    description: "임대차 계약 기준에 맞춘 원상복구를 완벽하게 시공합니다.",
  },
  {
    title: "폐업철거",
    englishLabel: "Business Closure",
    description: "폐업 철거와 정리를 한 번에. 빠르고 깔끔한 마무리를 약속합니다.",
  },
  {
    title: "부분철거",
    englishLabel: "Partial Demolition",
    description: "필요한 구역만 정밀하게 철거. 주변 시설 보호에 최선을 다합니다.",
  },
  {
    title: "긴급철거",
    englishLabel: "Emergency Service",
    description: "24시간 긴급 출동. 당일 방문·견적이 가능한 신속 대응 시스템.",
  },
  {
    title: "폐업지원금",
    englishLabel: "Grant Consulting",
    description: "철거 의뢰 고객 전원 무료. 최대 700만원 지원금 컨설팅 제공.",
  },
  {
    title: "무료 견적",
    englishLabel: "Free Consultation",
    description: "현장 방문 후 정확한 견적을 드립니다. 추가 비용 없이 투명하게 안내합니다.",
  },
];

const GUIDE_ITEMS = [
  {
    title: "철거 절차 안내",
    subtitle: "Demolition Process Guide",
    description:
      "상담부터 현장 방문, 견적 확정, 시공, 마무리까지 체계적인 철거 절차를 안내합니다.",
  },
  {
    title: "폐기물 처리 가이드",
    subtitle: "Waste Disposal Guide",
    description:
      "건설폐기물, 혼합폐기물, 산업폐기물 등 종류별 처리 방법과 증빙서류 발급 안내.",
  },
  {
    title: "폐업지원금 안내",
    subtitle: "Closure Grant Program",
    description:
      "정부·지자체 폐업지원금 신청 자격과 절차. 최대 700만원까지 받을 수 있는 방법.",
  },
  {
    title: "원상복구 기준",
    subtitle: "Restoration Standards",
    description:
      "임대차 계약상 원상복구 범위와 기준. 합리적인 비용으로 완벽한 복구를 약속합니다.",
  },
];

const FAQ_POOL = [
  {
    question: "철거 견적은 어떻게 진행되나요?",
    answer:
      "전화 또는 온라인 문의 후 현장 방문 견적을 진행합니다. 서울·경기·인천 전 지역 출장 견적은 무료이며, 확정 견적 그대로 시공합니다.",
  },
  {
    question: "폐기물 처리 증빙서류를 받을 수 있나요?",
    answer:
      "네, 지자체 승인 폐기물 처리 허가를 보유하고 있습니다. 세금계산서, 폐기물 처리 확인서 등 모든 증빙서류를 100% 발행해드립니다.",
  },
  {
    question: "당일 또는 긴급 출장이 가능한가요?",
    answer:
      "24시간 상시 대기 중으로 긴급 상황 시 당일 출장도 가능합니다. 먼저 전화로 현장 상황을 알려주시면 가장 빠른 방법을 안내해 드립니다.",
  },
  {
    question: "처음 견적에서 추가 비용이 생기나요?",
    answer:
      "절대 없습니다. 현장 방문 후 확정된 견적 그대로 진행합니다. 폐기물 처리비, 장비 사용비 등 추가 청구를 하지 않습니다.",
  },
  {
    question: "폐업 지원금 컨설팅도 함께 받을 수 있나요?",
    answer:
      "네, 철거 의뢰 고객님께는 폐업지원금 컨설팅을 무료로 제공합니다. 정부지원금과 지자체 지원금을 합쳐 최대 700만원까지 받으실 수 있습니다.",
  },
  {
    question: "원상복구도 함께 진행 가능한가요?",
    answer:
      "네, 철거와 원상복구를 원스톱으로 진행합니다. 임대차 계약 기준에 맞춰 완벽한 복구를 약속드립니다.",
  },
];

const REGION_POOL = [
  "서울", "부천", "인천", "수원", "성남", "안양", "고양", "용인",
  "화성", "김포", "의정부", "광명", "시흥", "안산", "평택", "하남",
];

export function pickDesignDExtras(
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

  const serviceCards = SERVICE_CARDS.map((item, i) => ({
    ...item,
    imageIndex: imagePool[i % imagePool.length],
  }));

  const aboutFeatures = ABOUT_BULLETS.map((text, i) => ({
    icon: ["✓", "✓", "✓", "✓"][i],
    title: text.split(" ")[0] + "…",
    description: text,
  }));

  const regionLinks = [
    `${region}철거`,
    ...shuffle(REGION_POOL.filter((r) => r !== region), rng).slice(0, 11).map((r) => `${r}철거`),
  ];

  return {
    heroEyebrow: pickOne(HERO_EYEBROWS, rng),
    heroKeyword: firstKeyword || `${region}철거`,
    heroSubline: `프리미엄 ${firstKeyword || "철거"}와 체계적인 시공 케어를 경험하세요`,
    aboutFeatures,
    serviceCards,
    guideItems: GUIDE_ITEMS,
    businessAreas: serviceCards.slice(0, 4).map((c) => ({
      title: c.title,
      description: c.description,
      tags: [c.englishLabel],
      imageIndex: c.imageIndex,
    })),
    faqItems: shuffle(FAQ_POOL, rng).slice(0, 6),
    casesItems: casesItems.slice(0, 12),
    regionLinks,
    trustBadges: ["10년+ 전문", "증빙서류 100%", "안전사고 0건", "24시간 대기"],
  };
}
