const TERM_PAIRS: [string, string][] = [
  ["철거", "demolition"],
  ["원상복구", "restoration"],
  ["폐업", "closure"],
  ["상가", "commercial"],
  ["식당", "restaurant"],
  ["사무실", "office"],
  ["헬스장", "gym"],
  ["카페", "cafe"],
  ["병원", "clinic"],
  ["공장", "factory"],
  ["인테리어", "interior"],
  ["폐기물", "waste"],
  ["지원금", "subsidy"],
  ["견적", "estimate"],
];

export function englishSlugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function keywordToEnglishSlug(keyword: string): string {
  let translated = keyword.trim();
  for (const [kr, en] of TERM_PAIRS) {
    translated = translated.split(kr).join(` ${en} `);
  }
  return englishSlugify(translated);
}

export function buildSeoSlug(
  keyword: string,
  pageId: string,
  aiSlug?: string
): string {
  const fromAi = aiSlug ? englishSlugify(aiSlug) : "";
  if (fromAi) return fromAi;

  const keywordPart = keywordToEnglishSlug(keyword);
  if (keywordPart) return keywordPart;

  return pageId.replace(/^page-/, "");
}

export async function ensureUniqueSeoSlug(
  baseSlug: string,
  existingSlugs: string[]
): Promise<string> {
  const taken = new Set(existingSlugs);
  if (!taken.has(baseSlug)) return baseSlug;

  let i = 2;
  while (taken.has(`${baseSlug}-${i}`)) i++;
  return `${baseSlug}-${i}`;
}
