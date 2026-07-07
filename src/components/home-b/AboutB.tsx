import { getSiteConfig } from "@/lib/site-config";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

export default async function AboutB() {
  const site = await getSiteConfig();
  const { tenantUi } = await getResolvedSiteConfig();
  const keyword = tenantUi?.heroKeyword || "철거";
  const features = tenantUi?.aboutFeatures || [];

  return (
    <section id="about" className="home-b-section py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <p className="text-sm font-semibold text-orange mb-2">회사소개</p>
            <h2 className="text-3xl lg:text-4xl font-black text-dark leading-tight mb-6">
              믿을 수 있는 <span className="text-orange">{keyword}</span> 파트너
            </h2>
            <p className="text-gray-600 leading-relaxed">
              <strong className="text-dark">{site.brandName}</strong>
              {tenantUi?.aboutText
                ? ` — ${tenantUi.aboutText}`
                : `는 서울·경기·인천 전 지역을 거점으로, 전문 팀이 직접 시공합니다. ${keyword}부터 건물 철거, 폐기물 처리까지 원스톱으로 처리합니다.`}
            </p>
          </div>
          <div className="grid sm:grid-cols-1 gap-4">
            {features.map((item) => (
              <div
                key={item.title}
                className="home-b-card p-5 rounded-2xl border border-gray-100 bg-gray-50/50 hover:border-orange/20 transition"
              >
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <h3 className="font-bold text-dark mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
