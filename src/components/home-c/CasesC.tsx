import Image from "next/image";
import Link from "next/link";
import { CONSTRUCTION_CASES } from "@/lib/cases";
import { getSiteConfig } from "@/lib/site-config";
import { getImageUrl } from "@/lib/site-images";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

export default async function CasesC() {
  const site = await getSiteConfig();
  const { tenantUi } = await getResolvedSiteConfig();
  const areas = tenantUi?.businessAreas || [];
  const casesItems = tenantUi?.casesItems?.length ? tenantUi.casesItems : CONSTRUCTION_CASES;
  const display = areas.length
    ? areas.slice(0, 6).map((area, i) => ({
        id: `area-${i}`,
        title: area.title,
        type: area.tags.join(" · "),
        description: area.description,
        imageIndex: area.imageIndex,
      }))
    : casesItems.slice(0, 6).map((item) => ({
        ...item,
        description: item.type,
      }));

  return (
    <section id="cases" className="home-c-section py-20 lg:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-3">Services</p>
            <h2 className="home-c-editorial text-3xl sm:text-4xl font-light text-stone-900">
              강아지·고양이
              <br />
              파양 · 무료분양
            </h2>
          </div>
          <Link href="/#contact" className="text-sm text-stone-500 hover:text-orange transition shrink-0">
            상담 문의 →
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {display.map((item) => (
            <article key={item.id} className="home-c-card group">
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4">
                <Image
                  src={getImageUrl(item.imageIndex, site)}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-[1.02] transition duration-500"
                />
                <span className="absolute top-3 left-3 text-[10px] tracking-wider uppercase bg-white/90 text-stone-700 px-2.5 py-1 rounded-full">
                  {item.type.split("·")[0]?.trim() || "파양·분양"}
                </span>
              </div>
              <h3 className="text-lg font-medium text-stone-900 mb-1">{item.title}</h3>
              <p className="text-sm text-stone-500 mb-2">{item.type}</p>
              {"description" in item && item.description && item.description !== item.type && (
                <p className="text-sm text-stone-600 leading-relaxed line-clamp-2">{item.description}</p>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
