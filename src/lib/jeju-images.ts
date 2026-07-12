/** 제주 랜드스케이프 CDN — https://image.cattery.co.kr/jejuland/ */
export const JEJU_IMAGE_CDN = "https://image.cattery.co.kr/jejuland";
export const JEJU_IMAGE_COUNT = 78;

export function jejuImageUrl(index: number): string {
  const max = JEJU_IMAGE_COUNT;
  const num = ((Math.abs(index) - 1) % max) + 1;
  return `${JEJU_IMAGE_CDN}/${String(num).padStart(2, "0")}.webp`;
}

/** 시드 기반 의사난수 인덱스 (SSR에서도 안정적) */
export function pickJejuImageIndexes(count: number, seed = "taesol"): number[] {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const used = new Set<number>();
  const result: number[] = [];
  let n = Math.abs(hash) || 1;
  while (result.length < count) {
    n = (n * 1103515245 + 12345) >>> 0;
    const idx = (n % JEJU_IMAGE_COUNT) + 1;
    if (!used.has(idx)) {
      used.add(idx);
      result.push(idx);
    }
  }
  return result;
}
