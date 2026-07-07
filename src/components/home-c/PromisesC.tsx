import { getResolvedSiteConfig } from "@/utils/siteConfig";

const DEFAULT_PROMISES = [
  {
    num: "01",
    title: "생명을 최우선으로",
    description:
      "모든 보호 동물에게 충분한 식사, 치료, 사랑을 제공합니다. 건강 검진과 예방접종을 철저히 관리합니다.",
  },
  {
    num: "02",
    title: "책임 있는 입양",
    description:
      "입양 전·후 상담과 맞춤 매칭으로 동물과 가족 모두가 행복한 만남이 되도록 돕습니다.",
  },
  {
    num: "03",
    title: "투명한 운영",
    description:
      "후원금 사용 내역과 보호 현황을 정기적으로 공개합니다. 믿고 함께할 수 있는 보호소가 되겠습니다.",
  },
];

export default async function PromisesC() {
  const { tenantUi } = await getResolvedSiteConfig();
  const promises = tenantUi?.promises?.length ? tenantUi.promises : DEFAULT_PROMISES;

  return (
    <section id="promises" className="home-c-section py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-3">Our Promises</p>
        <h2 className="home-c-editorial text-3xl sm:text-4xl font-light text-stone-900 mb-4">
          세 가지 약속
        </h2>
        <p className="text-stone-500 text-sm mb-16">
          이 약속은 한 번도 깨진 적이 없습니다. 앞으로도 그럴 것입니다.
        </p>

        <div className="space-y-16 lg:space-y-20">
          {promises.map((item) => (
            <article key={item.num} className="grid lg:grid-cols-12 gap-6 lg:gap-10 items-start border-t border-stone-100 pt-10 first:border-t-0 first:pt-0">
              <p className="lg:col-span-2 text-sm text-stone-400 font-medium">{item.num}</p>
              <div className="lg:col-span-10">
                <p className="text-xs text-stone-400 mb-2">— 약속 {item.num}</p>
                <h3 className="text-xl sm:text-2xl font-medium text-stone-900 mb-4">{item.title}</h3>
                <p className="text-stone-600 leading-relaxed max-w-xl">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
