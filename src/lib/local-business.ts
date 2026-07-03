import { extractRegionFromKeyword } from "./region-parse";
import {
  buildPlaceUrl,
  pickBestMatch,
  searchNaverLocal,
  stripHtml,
} from "./naver-local";

import type { LocalPartner } from "./data";

export const LOCAL_PARTNER_TYPES = [
  { type: "타일업체", searchTerm: "타일" },
  { type: "도배업체", searchTerm: "도배" },
  { type: "장판업체", searchTerm: "장판" },
  { type: "철물점", searchTerm: "철물" },
] as const;

interface FetchOptions {
  region: string;
  naverClientId: string;
  naverClientSecret: string;
}

export async function fetchLocalPartners({
  region,
  naverClientId,
  naverClientSecret,
}: FetchOptions): Promise<LocalPartner[]> {
  if (!naverClientId || !naverClientSecret) return [];

  const partners: LocalPartner[] = [];

  for (const { type, searchTerm } of LOCAL_PARTNER_TYPES) {
    const query = `${region} ${searchTerm}`;
    try {
      const items = await searchNaverLocal(query, naverClientId, naverClientSecret);
      const best = pickBestMatch(items, region);
      if (!best) continue;

      const address = best.roadAddress || best.address;
      if (!address) continue;

      partners.push({
        type,
        name: stripHtml(best.title),
        address,
        placeUrl: buildPlaceUrl(best, region),
      });
    } catch {
      continue;
    }
  }

  return partners;
}

export async function resolveLocalPartnersForKeyword(
  keyword: string,
  credentials: { naverClientId: string; naverClientSecret: string }
): Promise<{ region: string | null; partners: LocalPartner[] }> {
  const region = extractRegionFromKeyword(keyword);
  if (!region) return { region: null, partners: [] };

  const partners = await fetchLocalPartners({
    region,
    naverClientId: credentials.naverClientId,
    naverClientSecret: credentials.naverClientSecret,
  });

  return { region, partners };
}
