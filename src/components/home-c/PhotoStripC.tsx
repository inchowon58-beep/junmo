import Image from "next/image";
import { CONSTRUCTION_CASES } from "@/lib/cases";
import { getSiteConfig } from "@/lib/site-config";
import { getImageUrl } from "@/lib/site-images";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

export default async function PhotoStripC() {
  const site = await getSiteConfig();
  const { tenantUi } = await getResolvedSiteConfig();
  const items = tenantUi?.casesItems?.length ? tenantUi.casesItems : CONSTRUCTION_CASES;
  const display = items.slice(0, 5);

  return (
    <section className="home-c-strip py-6 overflow-hidden border-y border-stone-200/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <p className="text-xs text-stone-400 tracking-wide">↘ 현장에서 만난 이야기들</p>
      </div>
      <div className="flex gap-3 px-4 sm:px-6 overflow-x-auto pb-2 scrollbar-hide">
        {display.map((item) => (
          <div
            key={item.id}
            className="home-c-strip-item relative shrink-0 w-40 sm:w-48 h-52 sm:h-60 rounded-2xl overflow-hidden"
          >
            <Image
              src={getImageUrl(item.imageIndex, site)}
              alt={item.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-3">
              <p className="text-white text-sm font-medium truncate">{item.title}</p>
              <p className="text-white/70 text-xs">{item.type}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
