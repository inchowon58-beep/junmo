import { getResolvedSiteConfig } from "@/utils/siteConfig";

const DEFAULT_PROMISES = [
  {
    num: "01",
    title: "추가 비용은 없습니다",
    description:
      "처음 견적 그대로 진행합니다. 폐기물 처리비 등 숨겨진 비용을 청구하지 않습니다.",
  },
  {
    num: "02",
    title: "평생 책임집니다",
    description:
      "시공 후에도 문의와 A/S에 성실히 응합니다. 끝까지 함께하는 파트너가 되겠습니다.",
  },
  {
    num: "03",
    title: "투명하게 공개합니다",
    description:
      "현장 사진, 처리 내역, 증빙서류까지. 숨기지 않는 것이 신뢰의 시작입니다.",
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
