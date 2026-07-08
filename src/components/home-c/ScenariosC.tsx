import { getResolvedSiteConfig } from "@/utils/siteConfig";

const DEFAULT_SCENARIOS = [
  { title: "임신·출산", description: "케어가 어렵거나 반려동물과의 공존이 힘든 경우" },
  { title: "알러지 발현", description: "전에는 없던 반려동물 알러지가 나타난 경우" },
  { title: "이민·유학·군입대", description: "해외 이주·장기 부재로 직접 케어가 불가능한 경우" },
  { title: "이사·환경 변화", description: "반려동물 동반 입주가 어려운 이사·거주 환경 변화" },
];

export default async function ScenariosC() {
  const { tenantUi } = await getResolvedSiteConfig();
  const items = tenantUi?.scenarioItems?.length ? tenantUi.scenarioItems : DEFAULT_SCENARIOS;

  return (
    <section id="scenarios" className="home-c-section py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-3">When to visit</p>
        <h2 className="home-c-editorial text-3xl sm:text-4xl font-light text-stone-900 mb-4">
          이럴 때 파양·무료분양
          <br />
          상담을 이용합니다
        </h2>
        <p className="text-stone-500 text-sm mb-12 max-w-2xl">
          더 이상 함께할 수 없을 때, 전문 파양·무료분양 상담을 받으세요.
          아가펫보호소는 가정견·가정묘 파양과 무료분양 매칭을 진행합니다.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <article
              key={item.title}
              className="rounded-2xl border border-stone-100 p-6 hover:border-stone-200 transition"
            >
              <h3 className="text-lg font-medium text-stone-900 mb-2">{item.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>

        <ul className="mt-12 space-y-2 text-sm text-stone-600 max-w-3xl">
          <li>· 보호자가 병에 걸리거나 연로해 더 이상 케어가 어려울 때</li>
          <li>· 다견·다묘 가정에서 반려동물 간 갈등으로 분리·파양이 필요할 때</li>
          <li>· 반려동물의 성격·건강 문제로 가정 내 케어가 불가능할 때</li>
          <li>· 노령 반려동물에게 집중 케어가 필요하지만 환경적으로 어려울 때</li>
        </ul>
      </div>
    </section>
  );
}
