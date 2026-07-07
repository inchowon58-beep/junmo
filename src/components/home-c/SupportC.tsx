import Link from "next/link";
import { getSiteConfig } from "@/lib/site-config";
import { INQUIRY_SECTION_ID, inquiryAccentButtonClass } from "@/lib/exposure-mode";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

export default async function SupportC() {
  const site = await getSiteConfig();
  const { tenantUi } = await getResolvedSiteConfig();

  const blurb =
    tenantUi?.supportBlurb ||
    "철거와 원상복구는 결코 쉬운 일이 아닙니다. 부담은 잠시 내려놓고, 전문가와 함께 차근차근 진행해 보세요.";

  return (
    <section id="support" className="home-c-section py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-6">Support Grant</p>

        <h2 className="home-c-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 leading-[1.2] mb-6">
          폐업지원금
          <br />
          컨설팅 제도
        </h2>

        <p className="text-stone-600 leading-relaxed max-w-2xl text-base sm:text-lg mb-8">
          {blurb}
        </p>

        <p className="text-xs text-stone-400 mb-8">
          * 폐업 지원금은 지역·업종에 따라 달라질 수 있습니다. 상담을 통해 확인해 드립니다.
        </p>

        <Link
          href={`/#${INQUIRY_SECTION_ID}`}
          className={`inline-flex items-center gap-2 font-medium px-7 py-3.5 rounded-full transition text-sm ${inquiryAccentButtonClass(site.exposureMode)}`}
        >
          지원금 상담 신청하기
        </Link>
      </div>
    </section>
  );
}
