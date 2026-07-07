import { getSiteConfig } from "@/lib/site-config";
import { getResolvedSiteConfig } from "@/utils/siteConfig";
import { getDefaultStats } from "@/lib/tenant-content";

export default async function StoryC() {
  const site = await getSiteConfig();
  const { tenantUi } = await getResolvedSiteConfig();

  const titleLines = tenantUi?.storyTitle || ["작은 약속들이 모여", "한 현장의 완성이", "됩니다."];
  const stats = tenantUi?.stats?.length ? tenantUi.stats : getDefaultStats();
  const about =
    tenantUi?.aboutText ||
    site.description ||
    "어려운 상황에 놓인 반려동물을 위한 공간이 되었습니다. 치료와 사랑으로 믿음을 지킵니다.";

  return (
    <section id="story" className="home-c-section py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-6">Our Story</p>

        <h2 className="home-c-editorial text-3xl sm:text-4xl lg:text-5xl font-light text-stone-900 leading-[1.2] mb-8">
          {titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h2>

        <p className="text-stone-600 leading-relaxed max-w-2xl text-base sm:text-lg mb-16 whitespace-pre-line">
          {about}
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="text-3xl sm:text-4xl font-light text-stone-900">
                {stat.value}
                <span className="text-lg text-stone-500">{stat.suffix}</span>
              </p>
              <p className="text-sm text-stone-400 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
