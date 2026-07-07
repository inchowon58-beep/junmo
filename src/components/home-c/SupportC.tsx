import Link from "next/link";
import { getSiteConfig } from "@/lib/site-config";
import { INQUIRY_SECTION_ID, inquiryAccentButtonClass } from "@/lib/exposure-mode";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

export default async function SupportC() {
  const site = await getSiteConfig();
  const { tenantUi } = await getResolvedSiteConfig();

  const blurb =
    tenantUi?.supportBlurb ||
    "보호소 운영은 혼자서는 어렵습니다. 입양, 임시보호, 후원, 봉사 — 어떤 방식이든 작은 도움이 큰 변화를 만듭니다.";

  return (
    <section id="support" className="home-c-section py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-6">Support</p>

        <h2 className="home-c-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 leading-[1.2] mb-6">
          후원·봉사로
          <br />
          함께해 주세요
        </h2>

        <p className="text-stone-600 leading-relaxed max-w-2xl text-base sm:text-lg mb-8">
          {blurb}
        </p>

        <p className="text-xs text-stone-400 mb-8">
          * 정기·일시 후원, 산책·청소·미용 봉사 등 다양한 참여 방법이 있습니다.
        </p>

        <Link
          href={`/#${INQUIRY_SECTION_ID}`}
          className={`inline-flex items-center gap-2 font-medium px-7 py-3.5 rounded-full transition text-sm ${inquiryAccentButtonClass(site.exposureMode)}`}
        >
          후원·봉사 문의하기
        </Link>
      </div>
    </section>
  );
}
