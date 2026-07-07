import Link from "next/link";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

const DEFAULT_GUIDE = [
  {
    title: "철거 절차 안내",
    subtitle: "Demolition Process Guide",
    description: "상담부터 현장 방문, 견적 확정, 시공, 마무리까지 체계적인 철거 절차를 안내합니다.",
  },
  {
    title: "폐기물 처리 가이드",
    subtitle: "Waste Disposal Guide",
    description: "건설폐기물, 혼합폐기물 등 종류별 처리 방법과 증빙서류 발급 안내.",
  },
  {
    title: "폐업지원금 안내",
    subtitle: "Closure Grant Program",
    description: "정부·지자체 폐업지원금 신청 자격과 절차. 최대 700만원까지 받을 수 있는 방법.",
  },
  {
    title: "원상복구 기준",
    subtitle: "Restoration Standards",
    description: "임대차 계약상 원상복구 범위와 기준. 합리적인 비용으로 완벽한 복구를 약속합니다.",
  },
];

export default async function GuideD() {
  const { tenantUi } = await getResolvedSiteConfig();
  const items = tenantUi?.guideItems?.length ? tenantUi.guideItems : DEFAULT_GUIDE;

  return (
    <section id="guide" className="home-d-section py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-3 text-center">
          Service Information
        </p>
        <h2 className="home-d-display text-2xl sm:text-3xl lg:text-4xl text-center text-gray-900 mb-12">
          Demolition <em className="italic text-orange font-normal">Guide</em>
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {items.map((item) => (
            <article
              key={item.title}
              className="home-d-card bg-white border border-gray-100 rounded-sm p-6 lg:p-8 hover:border-orange/30 transition"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
              <p className="text-[10px] tracking-[0.15em] uppercase text-gray-400 mb-4">
                {item.subtitle}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{item.description}</p>
              <Link
                href="/#contact"
                className="text-sm font-medium text-gray-900 hover:text-orange transition"
              >
                자세히 보기 →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
