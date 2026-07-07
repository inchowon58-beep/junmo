import Link from "next/link";
import { getSiteConfig } from "@/lib/site-config";
import { INQUIRY_SECTION_ID, inquiryAccentButtonClass } from "@/lib/exposure-mode";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

export default async function HeroC() {
  const site = await getSiteConfig();
  const { tenantUi } = await getResolvedSiteConfig();

  const lines = tenantUi?.heroLines || ["사랑은", "두 번째", "시작이기도."];
  const subline =
    tenantUi?.heroSubline ||
    `${site.brandName}에서 작은 생명들이 새 가족을 기다리고 있습니다. 따뜻한 손길이 필요해요.`;

  return (
    <section className="home-c-hero relative py-20 lg:py-32">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-8">
          유기동물 보호 · {site.brandName}
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
          <span>보호 사례 보기</span>
          <span className="group-hover:translate-x-0.5 transition-transform">↘</span>
        </Link>

        <div className="mt-12 flex flex-wrap gap-3">
          <Link
            href={`/#${INQUIRY_SECTION_ID}`}
            className={`inline-flex items-center gap-2 font-medium px-7 py-3.5 rounded-full transition text-sm ${inquiryAccentButtonClass(site.exposureMode)}`}
          >
            입양·후원 문의
          </Link>
        </div>
      </div>
    </section>
  );
}
