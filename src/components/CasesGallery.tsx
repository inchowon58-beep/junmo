import Image from "next/image";
import { CONSTRUCTION_CASES } from "@/lib/cases";
import { getSiteConfig } from "@/lib/site-config";
import { getImageUrl } from "@/lib/site-images";

export default async function CasesGallery() {
  const site = await getSiteConfig();

  return (
    <section id="cases" className="py-16 lg:py-24 bg-gray-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-dark mb-3">
            {site.brandName} 시공 사례
          </h2>
          <p className="text-gray-600">실제 현장 철거·원상복구 사례를 확인해 보세요</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {CONSTRUCTION_CASES.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={getImageUrl(item.imageIndex, site)}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
                <span className="absolute top-3 left-3 bg-orange text-white text-xs font-bold px-2.5 py-1 rounded-full">
                  {item.type}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-dark text-sm leading-snug">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
