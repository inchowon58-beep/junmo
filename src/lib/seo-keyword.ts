import { extractRegionFromKeyword } from "./region-parse";

const TITLE_TEMPLATES: ((core: string, region: string | null) => string)[] = [
  (core, region) => `${region ? `${region} ` : ""}${core} | {{brandName}}`,
  (core) => `{{brandName}} · ${core} 무료 현장 견적`,
  (core, region) =>
    `${region ? `${region} ` : ""}${core} — 폐업지원금·철거 원스톱`,
  (core) => `${core} 전문 시공 | {{brandName}}`,
  (core, region) =>
    `${region ? `${region} ` : ""}폐업철거 ${core} | {{brandName}}`,
  (core) => `{{brandName}} ${core} 비용·일정 상담`,
  (core, region) =>
    `${core} 맞춤 견적${region ? ` (${region})` : ""} | {{brandName}}`,
  (core) => `${core} · 철거·원상복구 {{brandName}}`,
  (core, region) =>
    `${region ? `${region} ` : ""}${core} 현장 안내 | {{brandName}}`,
  (core) => `{{brandName}} | ${core} 지원금·견적`,
];

function hashText(text: string): number {
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = (hash << 5) - hash + text.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** "자양동 자양동철거" → "자양동철거" 등 지역 중복 제거 */
export function dedupeRegionInText(text: string, region: string | null): string {
  if (!text?.trim()) return "";
  let result = text.trim().replace(/\s+/g, " ");
  if (!region) return result;

  const esc = escapeRegExp(region);
  result = result.replace(new RegExp(`(${esc})\\s+\\1`, "gi"), "$1");
  result = result.replace(new RegExp(`(${esc})\\s+\\1(?=[가-힣])`, "gi"), "$1");

  const compact = result.replace(/\s/g, "");
  const dedupedCompact = dedupeRegionInCompact(compact, region);
  if (dedupedCompact !== compact) {
    result = dedupedCompact;
  }

  return result.replace(/\s+/g, " ").trim();
}

export function dedupeRegionInCompact(text: string, region: string): string {
  let result = text;
  while (result.includes(region + region)) {
    result = result.replaceAll(region + region, region);
  }
  return result;
}

/** 입력 키워드 정규화 — 지역·띄어쓰기 중복 정리 */
export function normalizeSeoKeyword(keyword: string): string {
  const spaced = keyword.trim().replace(/\s+/g, " ");
  const compact = spaced.replace(/\s/g, "");
  const region =
    extractRegionFromKeyword(compact) || extractRegionFromKeyword(spaced);

  if (!region) return spaced;

  const fixedCompact = dedupeRegionInCompact(compact, region);
  let fixedSpaced = dedupeRegionInText(spaced, region);

  if (fixedSpaced.replace(/\s/g, "") !== fixedCompact) {
    fixedSpaced = insertSpacesForKeyword(fixedCompact, region);
  }

  return fixedSpaced.replace(/\s+/g, " ").trim();
}

function insertSpacesForKeyword(compact: string, region: string): string {
  if (!compact.startsWith(region)) return compact;

  const rest = compact.slice(region.length);
  const breakWords = ["견적", "지원금", "원상복구", "폐업", "상가", "비용"];
  let tail = rest;
  const parts: string[] = [region];

  for (const word of breakWords) {
    const idx = tail.indexOf(word);
    if (idx > 0) {
      parts.push(tail.slice(0, idx), word);
      tail = tail.slice(idx + word.length);
    } else if (idx === 0) {
      parts.push(word);
      tail = tail.slice(word.length);
    }
  }

  if (tail) parts.push(tail);
  return parts.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();
}

/** 제목·설명용 핵심 키워드 (지역 중복·불필요 공백 제거) */
export function buildSeoCorePhrase(keyword: string): string {
  const normalized = normalizeSeoKeyword(keyword);
  const region = extractRegionFromKeyword(normalized.replace(/\s/g, ""));
  return polishSeoText(normalized, region);
}

export function polishSeoText(text: string, region: string | null): string {
  return dedupeRegionInText(text, region);
}

/** 키워드·해시 기반 SEO 제목 (페이지마다 다른 패턴) */
export function generateVariedSeoTitle(
  keyword: string,
  region: string | null,
  aiTitle?: string
): string {
  const core = buildSeoCorePhrase(keyword);
  const idx = hashText(`${keyword}-${core}-title`) % TITLE_TEMPLATES.length;
  const templateTitle = TITLE_TEMPLATES[idx](core, region);

  if (!aiTitle?.trim()) {
    return polishSeoText(templateTitle, region).slice(0, 60);
  }

  const polishedAi = polishSeoText(aiTitle.trim(), region);
  const aiLooksDuplicate =
    region &&
    (new RegExp(`${escapeRegExp(region)}\\s+${escapeRegExp(region)}`, "i").test(
      polishedAi
    ) ||
      polishedAi.replace(/\s/g, "").includes(region + region));

  const aiTooGeneric =
    polishedAi.includes("견적 저렴한") ||
    polishedAi.includes("견적 지원금") ||
    (polishedAi.match(/\|/g)?.length ?? 0) > 1;

  if (aiLooksDuplicate || aiTooGeneric || polishedAi.length > 60) {
    return polishSeoText(templateTitle, region).slice(0, 60);
  }

  return polishedAi.slice(0, 60);
}
