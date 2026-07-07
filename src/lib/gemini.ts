import type { SiteConfig } from "./site-config-types";
import type { SeoFaq } from "./data";
import {
  buildSeoCorePhrase,
  extractServicePhrase,
  generateVariedSeoTitle,
  normalizeSeoKeyword,
  polishSeoHtmlContent,
  polishSeoText,
  extractRegionForKeyword,
} from "./seo-keyword";

interface GenerateOptions {
  keyword: string;
  apiKey: string;
  site: SiteConfig;
}

export interface GeneratedSeoContent {
  title: string;
  description: string;
  content: string;
  slug?: string;
  faqs: SeoFaq[];
}

const CONTENT_RULES = `
작성 조건:
- 키워드를 자연스럽게 본문 전체에 5~8회 포함
- 업체명·전화번호는 반드시 {{brandName}}, {{phone}} 등 토큰으로만 표기 (직접 입력 금지)
- 유기동물 보호, 입양, 임시보호, 후원, 봉사 관점으로 작성
- 신뢰감 있는 전문가 톤, 허위·과장 금지
- h2, h3, p, ul 태그만 사용 (img 태그 직접 사용 금지)
- 본문 순수 텍스트 기준 **2800자 이상** (짧으면 안 됨)
- h2 섹션 **최소 5개**, 각 섹션마다 p 2~3문단 또는 ul 목록 포함
- 이미지는 시스템에서 본문에 자동 삽입되므로 img 태그·이미지 플레이스홀더 사용 금지
- 다른 SEO 페이지와 문장·사례·섹션 순서가 겹치지 않게 작성
- 자주 묻는 질문(FAQ) 3개: 키워드와 관련된 실질적 질문과 답변 (답변 2문장 이상, 토큰 사용)
- 제목: 지역명을 두 번 반복하지 말 것 (예: "자양동 자양동철거" 금지 → "자양동철거" 한 번만)
- 제목: "견적 저렴한 곳", "견적 지원금" 같은 뻔한 문구만 반복하지 말고, 키워드·지역·서비스 특성이 드러나게 매번 다른 표현 사용
- 제목: 다른 페이지와 같은 패턴·같은 문장 구조 금지
- 제목: {{brandName}}·상호명은 제목에 넣지 말 것 (시스템이 자동 추가)
- 제목: 반드시 지역명 1회 포함 (지역 맥락이 있을 때)
- 본문 h2/h3: 지역명 2회 연속 금지 (예: "상봉리 상봉리 철거" 금지)
`;

const WRITING_ANGLES = [
  "입양 희망자 관점에서 상담·매칭·사후 관리를 중심으로",
  "보호소 운영 관점에서 구조·치료·재활을 중심으로",
  "후원자 관점에서 투명한 운영·후원 활용을 중심으로",
  "봉사자 관점에서 참여 방법·활동 내용을 중심으로",
  "임시보호 가정 관점에서 준비 사항·절차를 중심으로",
  "지역 유기동물 문제와 보호소 역할을 중심으로",
];

const TITLE_STYLE_HINTS = [
  "입양 상담·매칭 강조형",
  "후원·봉사 참여 강조형",
  "보호·치료 전문 강조형",
  "지역 유기동물 안내형",
  "임시보호·구조 강조형",
  "책임 입양·사후 관리형",
  "보호소 신뢰·투명 운영형",
  "반려동물 복지 안내형",
];

function hashKeyword(keyword: string): number {
  let hash = 0;
  for (let i = 0; i < keyword.length; i++) {
    hash = (hash << 5) - hash + keyword.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function pickAngle(keyword: string): string {
  const idx = hashKeyword(keyword) % WRITING_ANGLES.length;
  return WRITING_ANGLES[idx];
}

export async function generateSeoContent({
  keyword: rawKeyword,
  apiKey,
  site,
}: GenerateOptions): Promise<GeneratedSeoContent> {
  const keyword = normalizeSeoKeyword(rawKeyword);
  const corePhrase = buildSeoCorePhrase(keyword);

  if (!apiKey) {
    return generateFallbackContent(keyword, site);
  }

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const region = extractRegionForKeyword(keyword);
  const angle = pickAngle(keyword);
  const uniqueSeed = `${keyword}-${hashKeyword(keyword)}`;
  const titleStyleHint =
    TITLE_STYLE_HINTS[hashKeyword(keyword + "style") % TITLE_STYLE_HINTS.length];

  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    generationConfig: {
      temperature: 1.1,
      topP: 0.95,
      maxOutputTokens: 8192,
    },
  });

  const prompt = `당신은 유기동물 보호소·입양 SEO 전문 작가입니다. 네이버 검색 최적화를 고려하여 한국어 HTML 콘텐츠를 작성하세요.

보호소 정보 (본문에 아래 토큰을 그대로 사용하세요):
- 상호: {{brandName}} ({{companyName}})
- 대표: {{representative}}
- 연락처: {{phone}}
- 활동: {{supportBase}}, {{supportExtra}}, {{supportMax}}
- 특징: 유기동물 구조·치료, 책임 입양, 임시보호, 후원·봉사, 입양 전·후 상담

키워드: "${corePhrase}"
(원본 입력: "${keyword}" — 지역명은 한 번만 사용)
${region ? `지역 맥락: ${region} 지역 유기동물·입양 (제목·본문에 "${region} ${region}"처럼 두 번 쓰지 말 것)` : ""}
제목 작성 스타일: ${titleStyleHint}
작성 관점: ${angle}
고유 시드(다른 글과 중복 금지): ${uniqueSeed}

중요: 이전에 작성한 다른 키워드 페이지와 동일한 문장·구조·사례·제목 패턴을 재사용하지 마세요. 키워드와 지역에 맞는 구체적인 상황을 새로 작성하세요.
${CONTENT_RULES}

JSON 형식으로만 응답:
{
  "title": "55자 이내 SEO 제목 — 지역 1회, 상호명·| 구분자 없이, 매번 다른 문장 구조",
  "description": "150자 이내 메타 설명 (토큰 사용 가능)",
  "slug": "영문 소문자 URL slug",
  "content": "HTML 본문",
  "faqs": [
    { "question": "질문1", "answer": "답변1" },
    { "question": "질문2", "answer": "답변2" },
    { "question": "질문3", "answer": "답변3" }
  ]
}`;

  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) throw new Error("Invalid response");

    const parsed = JSON.parse(jsonMatch[0]) as {
      title: string;
      description: string;
      content: string;
      slug?: string;
      faqs?: SeoFaq[];
    };

    if (!parsed.content || parsed.content.length < 800) {
      throw new Error("Content too short");
    }

    return {
      title: generateVariedSeoTitle(keyword, region, parsed.title),
      description: polishSeoText(parsed.description, region),
      content: polishSeoHtmlContent(parsed.content, keyword),
      slug: parsed.slug,
      faqs: normalizeFaqs(parsed.faqs, keyword, site),
    };
  } catch {
    return generateFallbackContent(keyword, site);
  }
}

function normalizeFaqs(
  faqs: SeoFaq[] | undefined,
  keyword: string,
  site: SiteConfig
): SeoFaq[] {
  const valid = (faqs || []).filter((f) => f.question?.trim() && f.answer?.trim());
  if (valid.length >= 3) return valid.slice(0, 3);
  return buildDefaultFaqs(keyword, site);
}

export function buildDefaultFaqs(keyword: string, site: SiteConfig): SeoFaq[] {
  const region = extractRegionForKeyword(keyword);
  const regionNote = region ? `${region} 지역 ` : "";

  const faqSets: SeoFaq[][] = [
    [
      {
        question: `${keyword} 입양 절차는 어떻게 되나요?`,
        answer: `문의·상담 후 보호소 방문, 성향 매칭, 입양 결정 순으로 진행됩니다. {{brandName}}은 입양 전·후 상담을 지원하며, 전화 {{phone}}로 예약할 수 있습니다.`,
      },
      {
        question: `${keyword} 입양 비용이 있나요?`,
        answer: `입양 시 기본 의료비·중성화 비용 등이 발생할 수 있습니다. {{brandName}}은 상담 시 비용 항목을 투명하게 안내해 드립니다.`,
      },
      {
        question: `${keyword} 상담은 어떻게 하나요?`,
        answer: `전화 {{phone}} 또는 홈페이지 문의 폼으로 연락주시면 입양·후원·봉사 상담을 도와드립니다. 보호소 방문은 사전 예약제입니다.`,
      },
    ],
    [
      {
        question: `${regionNote}${keyword} 후원은 어떻게 하나요?`,
        answer: `{{brandName}}은 정기·일시 후원을 받으며, 후원금 사용 내역을 투명하게 공개합니다. {{phone}}로 후원 방법을 안내받으실 수 있습니다.`,
      },
      {
        question: `임시보호도 가능한가요?`,
        answer: `긴급 구조·치료가 필요한 경우 임시보호 가정을 연계합니다. {{brandName}}에 상황을 알려주시면 절차를 안내해 드립니다.`,
      },
      {
        question: `봉사 참여는 어떻게 하나요?`,
        answer: `산책, 청소, 미용 등 보호소 활동 봉사를 환영합니다. {{phone}}로 봉사 일정과 참여 방법을 문의해 주세요.`,
      },
    ],
    [
      {
        question: `${keyword} 입양 전 준비할 것은?`,
        answer: `생활 환경, 가족 구성, 반려 경험 등을 상담 시 알려주시면 맞는 아이를 추천해 드립니다. {{brandName}}이 입양 전 체크리스트를 안내합니다.`,
      },
      {
        question: `처음 입양인데 괜찮을까요?`,
        answer: `{{brandName}}은 입양 초보 가정을 위한 상담과 사후 관리를 제공합니다. 궁금한 점은 {{phone}}로 편하게 문의하세요.`,
      },
      {
        question: `보호소 방문은 예약이 필요한가요?`,
        answer: `네, 보호 동물과 봉사자의 안전을 위해 사전 예약제로 운영합니다. {{phone}}로 방문 일정을 잡아 주세요.`,
      },
    ],
  ];

  const idx = hashKeyword(keyword) % faqSets.length;
  return faqSets[idx];
}

type FallbackBuilder = (keyword: string, region: string | null) => string;

const FALLBACK_VARIANTS: FallbackBuilder[] = [
  (keyword, region) => {
    const core = buildSeoCorePhrase(keyword);
    return `
<h2>${core} — {{brandName}} 안내</h2>
<p>{{companyName}} {{brandName}}은 ${region ? `${region} 및 ` : ""}주변 지역의 유기·유실 반려동물을 보호하고, 새 가족을 찾아드립니다. ${core}에 관심 있으신 분들의 문의를 환영합니다.</p>
<p>대표 {{representative}}와 보호소 팀이 구조·치료·입양 매칭·사후 상담까지 함께합니다. {{phone}}로 입양·후원·봉사 상담을 예약해 주세요.</p>

<h2>${keyword} 입양 절차</h2>
<ul>
<li>1단계: 문의·상담 — 관심 분야와 생활 환경 확인</li>
<li>2단계: 보호소 방문 — 아이들과 직접 만남</li>
<li>3단계: 성향 매칭·입양 결정</li>
<li>4단계: 입양 후 상담·건강 관리 지원</li>
</ul>

<h2>후원·봉사 참여</h2>
<p>{{brandName}}은 {{supportBase}}, {{supportExtra}}, {{supportMax}} 등 다양한 방식으로 함께할 수 있습니다. 후원금 사용 내역을 투명하게 공개하며, 산책·청소·미용 봉사도 환영합니다.</p>

<h2>${keyword} 상담 문의</h2>
<p>전화 {{phone}} · {{brandName}}. 보호소 방문은 사전 예약제입니다.</p>`.trim();
  },
  (keyword, region) => {
    const area = region || "지역";
    return `
<h2>${area} 유기동물 보호 — {{brandName}}</h2>
<p>{{brandName}}은 ${keyword} 관련 문의를 받고 있습니다. 유기동물 구조, 치료, 임시보호, 책임 입양을 진행합니다.</p>
<p>입양을 처음 고민하시는 분도 {{phone}} 상담을 통해 단계별 안내를 받으실 수 있습니다.</p>

<h2>보호소 활동</h2>
<ul>
<li>긴급 구조 및 건강 검진</li>
<li>치료·중성화·예방접종</li>
<li>임시보호 가정 연계</li>
<li>책임 입양 및 사후 관리</li>
</ul>

<h2>${keyword} 자주 묻는 내용</h2>
<p>입양 비용, 방문 예약, 후원 방법 등은 상담 시 자세히 안내해 드립니다. {{companyName}} {{brandName}}에 문의해 주세요.</p>`.trim();
  },
];

function generateFallbackContent(
  keyword: string,
  site: SiteConfig
): GeneratedSeoContent {
  const region = extractRegionForKeyword(keyword);
  const variantIdx = hashKeyword(keyword) % FALLBACK_VARIANTS.length;
  const content = FALLBACK_VARIANTS[variantIdx](keyword, region);

  const titleVariants = [
    (k: string, r: string | null) => generateVariedSeoTitle(k, r),
    (k: string, r: string | null) =>
      generateVariedSeoTitle(k, r, `${extractServicePhrase(k, r)} 입양 상담`),
    (k: string, r: string | null) =>
      generateVariedSeoTitle(k, r, `${extractServicePhrase(k, r)} 후원·봉사`),
    (k: string, r: string | null) =>
      generateVariedSeoTitle(k, r, `${extractServicePhrase(k, r)} — 보호소 안내`),
  ];
  const descVariants = [
    (k: string, r: string | null) =>
      `${buildSeoCorePhrase(k)} 입양·후원 상담. {{brandName}}에서 유기동물 보호와 책임 입양을 진행합니다.`,
    (k: string, r: string | null) =>
      `${r ? `${r} ` : ""}${extractServicePhrase(k, r)} 전문 안내. {{brandName}} 임시보호·후원·봉사 환영.`,
    (k: string) =>
      `{{brandName}} ${buildSeoCorePhrase(k)} — 구조·치료·입양. 전화 {{phone}} 상담.`,
    (k: string) =>
      `${buildSeoCorePhrase(k)} 입양 절차·후원 안내. {{brandName}} 유기동물 보호소.`,
  ];

  const tIdx = hashKeyword(keyword + "t") % titleVariants.length;
  const dIdx = hashKeyword(keyword + "d") % descVariants.length;

  return {
    title: titleVariants[tIdx](keyword, region),
    description: polishSeoText(descVariants[dIdx](keyword, region), region),
    content: polishSeoHtmlContent(content, keyword),
    faqs: buildDefaultFaqs(keyword, site),
  };
}
