export interface SeoReview {
  name: string;
  area: string;
  text: string;
}

const REVIEW_POOL: SeoReview[] = [
  {
    name: "김○○",
    area: "서귀포시 동홍동",
    text: "매물 설명부터 계약 조건까지 차근차근 알려주셔서 안심하고 진행했습니다. 수수료도 미리 명확하게 안내해 주셨어요.",
  },
  {
    name: "이○○",
    area: "서귀포시 중문",
    text: "타 지역에서 이주 상담을 받았는데, 생활권·학교·주차까지 현실적으로 짚어 주셔서 결정이 빨랐습니다.",
  },
  {
    name: "박○○",
    area: "제주시 → 서귀포",
    text: "급한 일정에도 권리관계 확인을 꼼꼼히 해 주셨습니다. 잔금 날까지 연락이 잘 되어 좋았어요.",
  },
  {
    name: "최○○",
    area: "서귀포시 대정",
    text: "처음 부동산 거래라 걱정이 많았는데, 용어부터 절차까지 쉽게 설명해 주셔서 부담이 줄었습니다.",
  },
  {
    name: "정○○",
    area: "서귀포시 성산",
    text: "시세만 밀어붙이지 않고, 제 상황에 맞는 선택지를 여러 개 비교해 주셨습니다. 신뢰가 갔습니다.",
  },
  {
    name: "한○○",
    area: "서귀포시 남원",
    text: "계약 후에도 전입·공과금 관련 질문에 친절히 답해 주셨어요. 한 번으로 끝나지 않는 느낌이었습니다.",
  },
  {
    name: "윤○○",
    area: "서울 → 제주",
    text: "원격으로도 사진·서류·일정을 체계적으로 공유해 주셔서 멀리서도 불안하지 않았습니다.",
  },
  {
    name: "오○○",
    area: "서귀포시 강정",
    text: "우수공인중개사 선정 소식을 보고 방문했는데, 상담 태도가 그만큼 차분하고 확실했습니다.",
  },
  {
    name: "송○○",
    area: "서귀포시 동홍",
    text: "위치도 찾기 쉽고, 방문 상담 예약부터 안내가 친절했습니다. 주변에 추천하고 싶은 사무소입니다.",
  },
];

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 1;
}

/** 키워드마다 다른 리뷰 3개 — 본문 글자수(1500~2000) 보완용 */
export function getSeoReviewsForKeyword(keyword: string, count = 3): SeoReview[] {
  const seed = hashSeed(keyword.trim() || "review");
  const pool = [...REVIEW_POOL];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = (seed + i * 17) % (i + 1);
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }

  return pool.slice(0, count).map((r, idx) => ({
    ...r,
    text:
      idx === 0
        ? `${keyword} 상담을 받으며 ${r.text}`
        : idx === 1
          ? `${r.text} ${keyword} 관련으로도 다시 문의하고 싶습니다.`
          : r.text,
  }));
}

export function stripHtmlToText(html: string): string {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** 본문+FAQ+리뷰 순수 글자수 */
export function estimateSeoPageCharCount(
  contentHtml: string,
  faqs: { question: string; answer: string }[],
  reviews: SeoReview[]
): number {
  const body = stripHtmlToText(contentHtml);
  const faqText = faqs.map((f) => `${f.question}${f.answer}`).join("");
  const reviewText = reviews.map((r) => `${r.name}${r.area}${r.text}`).join("");
  return body.length + faqText.length + reviewText.length;
}
