import Image from "next/image";
import { CONSTRUCTION_CASES } from "@/lib/cases";
import { getSiteConfig } from "@/lib/site-config";
import { getImageUrl } from "@/lib/site-images";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

export default async function GalleryD() {
  const site = await getSiteConfig();
  const { tenantUi } = await getResolvedSiteConfig();
  const items = tenantUi?.casesItems?.length ? tenantUi.casesItems : CONSTRUCTION_CASES;
  const display = items.slice(0, 12);

  return (
    <section id="gallery" className="home-d-section py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-3 text-center">
          Gallery
        </p>
        <h2 className="home-d-display text-2xl sm:text-3xl lg:text-4xl text-center text-gray-900 mb-12">
          Our <em className="italic text-orange font-normal">Projects</em>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {display.map((item) => (
            <div
              key={item.id}
              className="home-d-gallery-item relative aspect-square overflow-hidden rounded-sm group"
            >
              <Image
                src={getImageUrl(item.imageIndex, site)}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-end p-3 opacity-0 group-hover:opacity-100">
                <div>
                  <p className="text-white text-xs font-medium">{item.title}</p>
                  <p className="text-white/70 text-[10px]">{item.type}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
