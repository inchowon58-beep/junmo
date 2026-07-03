import type { SiteConfig } from "./site-config-types";
import type { SeoFaq } from "./data";

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

export async function generateSeoContent({
  keyword,
  apiKey,
  site,
}: GenerateOptions): Promise<GeneratedSeoContent> {
  if (!apiKey) {
    return generateFallbackContent(keyword, site);
  }

  const { GoogleGenerativeAI } = await import("@google/generative-ai");
  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const prompt = `당신은 폐업철거·상가철거 SEO 전문 작가입니다. 네이버 검색 최적화를 고려하여 한국어 HTML 콘텐츠를 작성하세요.

업체 정보 (본문에 아래 토큰을 그대로 사용하세요):
- 상호: {{brandName}} ({{companyName}})
- 대표: {{representative}}
- 연락처: {{phone}}
- 특징: 폐업지원금 신청 대행, 무료 방문 견적, 철거·원상복구 원스톱, 전국 시공

작성 조건:
- 키워드: "${keyword}"
- 업체명·전화번호는 반드시 {{brandName}}, {{phone}} 등 토큰으로만 표기 (직접 입력 금지)
- 폐업철거, 상가철거, 원상복구, 폐업지원금 관점으로 작성
- 신뢰감 있는 전문가 톤, 허위·과장 금지
- h2, h3, p, ul 태그만 사용하는 HTML 본문 (1500자 이상)
- 매번 다른 구성과 문장으로 작성
- 자주 묻는 질문(FAQ) 3개: ${keyword}와 관련된 실질적 질문과 답변 (답변에도 토큰 사용)

JSON 형식으로만 응답:
{
  "title": "60자 이내 SEO 제목 ({{brandName}} 토큰 사용 가능)",
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

    return {
      title: parsed.title,
      description: parsed.description,
      content: parsed.content,
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
  return [
    {
      question: `${keyword} 비용은 어떻게 산정되나요?`,
      answer: `평수, 업종, 원상복구 범위에 따라 달라집니다. {{brandName}}은 무료 현장 방문 견적을 제공하며, 폐업지원금 활용 시 실제 부담을 줄일 수 있습니다.`,
    },
    {
      question: `폐업지원금과 함께 ${keyword}가 가능한가요?`,
      answer: `네. {{brandName}}은 폐업지원금 신청부터 철거·원상복구까지 원스톱으로 지원합니다. 최대 {{supportMax}}까지 안내받으실 수 있습니다.`,
    },
    {
      question: `${keyword} 상담은 어떻게 하나요?`,
      answer: `전화 {{phone}}로 상담 후 무료 현장 방문 견적을 진행합니다. 폐업 일정과 철거 범위를 알려주시면 맞춤 안내해 드립니다.`,
    },
  ];
}

function generateFallbackContent(
  keyword: string,
  site: SiteConfig
): GeneratedSeoContent {
  return {
    title: `${keyword} 전문 | {{brandName}}`,
    description: `${keyword} 무료 방문 견적, 폐업지원금 신청 대행. {{brandName}}이 철거부터 원상복구까지 원스톱으로 해결해 드립니다.`,
    content: `
<h2>${keyword} — {{brandName}} 전문 안내</h2>
<p>{{companyName}} {{brandName}}은 폐업지원금 신청부터 ${keyword}, 원상복구까지 한 번에 진행하는 전국 폐업철거 전문 업체입니다.</p>

<h3>{{brandName}}를 선택하는 이유</h3>
<ul>
<li>현장 경험이 풍부한 전문 인력으로 신속·안전한 시공</li>
<li>폐업 컨설턴트가 지원금 신청 무료 대행</li>
<li>집기·비품 합리적 매입으로 비용 절감</li>
<li>무료 현장 방문 견적</li>
</ul>

<h3>폐업지원금 안내</h3>
<p>폐업철거지원금 {{supportBase}}, 추가지원금 {{supportExtra}}으로 최대 {{supportMax}}까지 지원받을 수 있습니다. 지역·업종·평수에 따라 상이하니 철거 전 꼭 상담받으세요.</p>

<h3>${keyword} 진행 절차</h3>
<ul>
<li>Step 1. 전화·상담 접수</li>
<li>Step 2. 무료 현장 방문 견적</li>
<li>Step 3. 철거 및 지원금 신청 대행</li>
</ul>

<h3>상담 문의</h3>
<p>${keyword} 관련 문의는 {{phone}}으로 연락 주세요. {{brandName}}이 책임지고 도와드리겠습니다.</p>
`.trim(),
    faqs: buildDefaultFaqs(keyword, site),
  };
}
