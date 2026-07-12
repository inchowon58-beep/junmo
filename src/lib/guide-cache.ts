import { unstable_cache } from "next/cache";
import { getPageByKey, getPages } from "@/lib/data";
import { getLegacySiteConfig } from "@/lib/site-config";

export const GUIDE_PAGE_CACHE_TAG = "guide-pages";
export const GUIDE_REVALIDATE_SECONDS = 3600;

/**
 * headers() 없이 페이지 조회 — Data Cache / ISR이 실제로 동작하도록.
 * (hostname 테넌트는 레이아웃 SiteConfigProvider에서 처리, 본문은 R2/Blob pages.json)
 */
export function getCachedGuidePage(slug: string) {
  return unstable_cache(
    async () => {
      const page = await getPageByKey(slug);
      return { page };
    },
    [`guide-page-${slug}`],
    {
      revalidate: GUIDE_REVALIDATE_SECONDS,
      tags: [GUIDE_PAGE_CACHE_TAG, `guide:${slug}`],
    }
  )();
}

export function getCachedLegacySiteConfig() {
  return unstable_cache(
    async () => getLegacySiteConfig(),
    ["legacy-site-config"],
    { revalidate: GUIDE_REVALIDATE_SECONDS, tags: [GUIDE_PAGE_CACHE_TAG] }
  )();
}

export function getCachedGuideSlugList() {
  return unstable_cache(
    async () => {
      const pages = await getPages();
      return pages.filter((p) => p.slug?.trim()).map((p) => p.slug);
    },
    ["guide-slug-list"],
    { revalidate: GUIDE_REVALIDATE_SECONDS, tags: [GUIDE_PAGE_CACHE_TAG] }
  )();
}
