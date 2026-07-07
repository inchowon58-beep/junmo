import { getSiteConfig, phoneToTel } from "@/lib/site-config";
import { showCompanyContact } from "@/lib/exposure-mode";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

export default async function MissionC() {
  const site = await getSiteConfig();
  const showCompany = showCompanyContact(site.exposureMode);
  const { tenantUi } = await getResolvedSiteConfig();

  const lines = tenantUi?.missionLines || ["판단하지 않고,", "끝까지 함께", "있겠습니다."];
  const body =
    tenantUi?.missionBody ||
    `${site.brandName}은 폐업철거·원상복구·폐기물 처리를 진행합니다. 어려운 상황의 사업자분께도 문을 열고, 함께 길을 찾겠습니다.`;

  return (
    <section className="home-c-section py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-6">Our Mission</p>

        <h2 className="home-c-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 leading-[1.2] mb-8">
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="text-stone-600 leading-relaxed max-w-2xl text-base sm:text-lg whitespace-pre-line">
          {body}
        </p>

        {showCompany && (
          <p className="mt-10 text-sm text-stone-500">
            지금 바로 상담이 필요하시다면{" "}
            <a href={`tel:${phoneToTel(site.phone)}`} className="font-semibold text-stone-900 hover:text-orange transition">
              {site.phone}
            </a>
          </p>
        )}

        <div className="mt-16 grid grid-cols-3 gap-6 max-w-md">
          <div>
            <p className="text-2xl sm:text-3xl font-light text-stone-900">365일</p>
            <p className="text-xs text-stone-400 mt-1">진실된 약속으로</p>
          </div>
          <div className="col-span-2">
            <p className="text-xs tracking-[0.2em] uppercase text-stone-400">현장 일상</p>
          </div>
        </div>
      </div>
    </section>
  );
}
