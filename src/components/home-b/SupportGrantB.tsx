import Link from "next/link";
import { getSiteConfig } from "@/lib/site-config";
import { INQUIRY_SECTION_ID, inquiryAccentButtonClass } from "@/lib/exposure-mode";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

export default async function SupportGrantB() {
  const site = await getSiteConfig();
  const { tenantUi } = await getResolvedSiteConfig();

  return (
    <section id="support" className="home-b-section py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold text-orange mb-2">폐업 지원금 안내</p>
            <h2 className="text-3xl lg:text-4xl font-black text-dark leading-tight mb-4">
              모르면 <span className="text-orange">놓치는</span>
              <br />
              폐업 지원금
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              {tenantUi?.supportBlurb ||
                "수도권 사장님들이 폐업 시 받을 수 있는 지원금을 대부분 모르고 지나칩니다. 철거 의뢰 고객님께 무료로 지원금 컨설팅까지 제공합니다."}
            </p>
            <Link
              href={`/#${INQUIRY_SECTION_ID}`}
              className={`inline-flex items-center gap-2 font-bold px-6 py-3 rounded-lg transition ${inquiryAccentButtonClass(site.exposureMode)}`}
            >
              무료 지원금 컨설팅 신청 →
            </Link>
          </div>

          <div className="home-b-grant-box rounded-3xl bg-gradient-to-br from-dark to-gray-800 text-white p-8 text-center shadow-xl">
            <p className="text-sm text-orange font-semibold mb-2">💰 수도권 사장님 전용</p>
            <h3 className="text-xl font-bold mb-6">지원금 컨설팅으로 최대 700만원 지원받기</h3>
            <div className="grid grid-cols-3 gap-3 items-end mb-4">
              <div>
                <p className="text-xs text-gray-400 mb-1">정부 지원금</p>
                <p className="text-lg font-black text-orange">최대 600만원</p>
              </div>
              <p className="text-2xl font-light text-gray-500">+</p>
              <div>
                <p className="text-xs text-gray-400 mb-1">지자체 지원금</p>
                <p className="text-lg font-black text-orange">최대 100만원</p>
              </div>
            </div>
            <p className="text-3xl font-black text-orange mb-2">합계 최대 700만원</p>
            <p className="text-xs text-gray-400">철거 의뢰 고객 전원 무료 제공</p>
          </div>
        </div>
      </div>
    </section>
  );
}
