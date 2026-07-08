/** 네이버 검색 노출용 — 브라우저 타이틀 끝에 붙일 키워드 풀 */
export const SEO_SUFFIX_KEYWORDS = [
  "강아지보호소",
  "강아지파양",
  "유기견보호센터",
  "유기견보호소",
  "고양이파양",
  "고양이보호소",
  "유기묘보호소",
  "유기묘보호센터",
  "유기동물보호소",
  "유기동물보호센터",
  "강아지무료분양",
  "고양이무료분양",
  "유기견분양",
  "유기견무료분양",
  "유기묘분양",
  "강아지무료입양",
  "고양이무료입양",
] as const;

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

/** 시드 기준으로 풀에서 중복 없이 n개 선택 (사이트·페이지마다 고정) */
export function pickSeoSuffixKeywords(seed: string, count = 3): string[] {
  const pool = [...SEO_SUFFIX_KEYWORDS];
  let state = hashSeed(seed || "default") || 1;
  const picked: string[] = [];

  while (picked.length < count && pool.length > 0) {
    state = (state * 1664525 + 1013904223) >>> 0;
    const idx = state % pool.length;
    picked.push(pool.splice(idx, 1)[0]);
  }

  return picked;
}

export function buildTitleWithSeoSuffix(baseTitle: string, seed: string): string {
  const suffix = pickSeoSuffixKeywords(seed, 3).join("·");
  return `${baseTitle} · ${suffix}`;
}
