import Link from "next/link";
import { getSiteConfig } from "@/lib/site-config";
import { INQUIRY_SECTION_ID, inquiryAccentButtonClass } from "@/lib/exposure-mode";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

export default async function HeroC() {
  const site = await getSiteConfig();
  const { tenantUi } = await getResolvedSiteConfig();

  const lines = tenantUi?.heroLines || ["믿음은", "두 번째로", "시작되기도."];
  const subline =
    tenantUi?.heroSubline ||
    `${site.brandName}은 오늘도 현장에서 믿음의 자리를 지켰습니다. 오늘은 당신의 차례일지도 몰라요.`;

  return (
    <section className="home-c-hero relative py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-8">
          안전한 철거 · {site.brandName}
        </p>

        <h1 className="home-c-editorial text-4xl sm:text-5xl lg:text-7xl font-light text-stone-900 leading-[1.15] tracking-tight mb-8">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-xl mb-10">
          {subline}
        </p>

        <Link
          href="/#cases"
          className="inline-flex items-center gap-2 text-sm text-stone-700 hover:text-orange transition group"
        >
          <span>시공 사례 보기</span>
          <span className="group-hover:translate-x-0.5 transition-transform">↘</span>
        </Link>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href={`/#${INQUIRY_SECTION_ID}`}
            className={`inline-flex items-center gap-2 font-medium px-7 py-3.5 rounded-full transition text-sm ${inquiryAccentButtonClass(site.exposureMode)}`}
          >
            무료 견적 신청
          </Link>
        </div>
      </div>
    </section>
  );
}
