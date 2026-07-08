import { getSiteConfig, phoneToTel } from "@/lib/site-config";
import { INQUIRY_SECTION_ID, showCompanyContact } from "@/lib/exposure-mode";
import QuickInquiryForm from "@/components/QuickInquiryForm";

export default async function ContactC() {
  const site = await getSiteConfig();
  const showCompany = showCompanyContact(site.exposureMode);

  return (
    <section id="contact" className="home-c-contact py-20 lg:py-28 bg-stone-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-stone-500 mb-4">
              {site.brandName}
            </p>
            <p className="text-sm text-stone-400 mb-2">— 강아지·고양이 파양·무료분양 전문</p>
            <h2 className="home-c-editorial text-3xl sm:text-4xl font-light leading-[1.2] mb-6">
              언제든 편하게
              <br />
              연락주세요.
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mb-12">
              강아지파양, 고양이파양, 강아지무료분양, 고양이무료분양 상담 — 궁금한 점이 있으시면 문의해 주세요.
            </p>

            <dl className="space-y-6 text-sm">
              {showCompany && (
                <div>
                  <dt className="text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-1">Phone</dt>
                  <dd>
                    <a
                      href={`tel:${phoneToTel(site.phone)}`}
                      className="text-lg font-medium hover:text-orange transition"
                    >
                      {site.phone}
                    </a>
                  </dd>
                </div>
              )}
              <div>
                <dt className="text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-1">Hours</dt>
                <dd className="text-stone-300">평일 10:00 — 18:00 (방문 예약제)</dd>
              </div>
              {showCompany && site.address && (
                <div>
                  <dt className="text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-1">Address</dt>
                  <dd className="text-stone-300">{site.address}</dd>
                </div>
              )}
              <div>
                <dt className="text-[10px] tracking-[0.2em] uppercase text-stone-500 mb-1">Homepage</dt>
                <dd className="text-stone-300">{site.url.replace(/^https?:\/\//, "")}</dd>
              </div>
            </dl>
          </div>

          <div
            id={INQUIRY_SECTION_ID}
            className="bg-white rounded-3xl p-6 sm:p-8 text-stone-900 shadow-2xl"
          >
            <QuickInquiryForm
              keyword={`${site.brandName} 메인`}
              pageSlug=""
              pageTitle={`${site.brandName} 메인`}
              brandName={site.brandName}
              exposureMode={site.exposureMode}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
