import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolvePageByKey } from "@/lib/pages-resolver";
import { guidePageUrl } from "@/lib/constants";
import { buildPageMetadata, getOgImageAbsoluteUrl } from "@/lib/metadata";
import { buildDefaultFaqs } from "@/lib/gemini";
import { resolveSeoPage, phoneToTel, getPageImageUrl } from "@/lib/site-config";
import { getSeoContentImageUrls } from "@/lib/seo-content-images";
import { getResolvedSiteConfig } from "@/utils/siteConfig";
import { extractRegionFromKeyword } from "@/lib/region-parse";
import { getNearbySubRegionLinks } from "@/lib/nearby-regions";
import { getRelatedKeywordPageLinks } from "@/lib/related-keyword-pages";
import NearbyRegionsSection from "@/components/NearbyRegionsSection";
import RelatedKeywordPagesSection from "@/components/RelatedKeywordPagesSection";
import LocalPartnersSection from "@/components/LocalPartnersSection";
import { showCompanyContact } from "@/lib/exposure-mode";
import Link from "next/link";
import { buildSeoBrowserTitle } from "@/lib/seo-keyword";
import { ensureLocalPartners } from "@/lib/seo-local-partners";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{ slug: string }>;
}

/** 서귀포 기본 좌표 — 키워드 지역 없을 때 */
const DEFAULT_GEO = { lat: 33.2559783, lng: 126.5721595 };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [{ page }, { config }] = await Promise.all([
    resolvePageByKey(slug),
    getResolvedSiteConfig(),
  ]);
  if (!page) return { title: "페이지를 찾을 수 없습니다" };

  const resolved = resolveSeoPage(page, config);
  const browserTitle = buildSeoBrowserTitle(
    resolved.title,
    config.brandName,
    page.keyword || page.slug
  );
  const region = extractRegionFromKeyword(page.keyword) || "서귀포시";
  const seed = page.slug || page.keyword;
  const contentImages = getSeoContentImageUrls(seed, config);
  const heroImage = getPageImageUrl(page, config);

  return {
    ...buildPageMetadata(config, {
      title: resolved.title,
      description: resolved.description,
      path: guidePageUrl(page.slug),
      ogPath: `/guide/${page.slug}/opengraph-image`,
      type: "article",
      keywords: [
        page.keyword,
        "제주공인중개사",
        "서귀포공인중개사",
        "제주부동산",
        config.brandName,
      ],
      extraOgImages: [heroImage, ...contentImages],
      geo: {
        region: "KR-49",
        placename: region,
        position: `${DEFAULT_GEO.lat};${DEFAULT_GEO.lng}`,
      },
    }),
    title: { absolute: browserTitle },
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const [{ page }, { config }] = await Promise.all([
    resolvePageByKey(slug),
    getResolvedSiteConfig(),
  ]);
  if (!page) notFound();

  const resolved = resolveSeoPage(page, config);
  const { region: localRegion, partners: localPartners } = await ensureLocalPartners(
    page,
    config
  );
  const currentRegion = extractRegionFromKeyword(page.keyword) || localRegion;
  const [relatedKeywordLinks, nearbySubRegions] = await Promise.all([
    getRelatedKeywordPageLinks(page.slug, page.keyword, 30),
    getNearbySubRegionLinks(currentRegion, page.slug, page.keyword),
  ]);
  const faqs =
    resolved.faqs?.length >= 2
      ? resolved.faqs.slice(0, 2)
      : buildDefaultFaqs(page.keyword, config).map((f) => ({
          question: f.question,
          answer: f.answer
            .replace(/\{\{brandName\}\}/g, config.brandName)
            .replace(/\{\{phone\}\}/g, config.phone)
            .replace(/\{\{address\}\}/g, config.address)
            .replace(/\{\{supportMax\}\}/g, config.supportMax),
        }));

  const showCompany = showCompanyContact(config.exposureMode);
  const regionLabel = currentRegion || "제주";

  return (
    <article className="guide-doc min-h-screen">
      <header className="guide-doc-header border-b border-black/8 bg-white">
        <div className="max-w-3xl mx-auto px-4 py-5 flex items-center justify-between gap-4">
          <Link href="/" className="text-sm font-semibold text-[#0b1c33] hover:underline">
            {config.brandName}
          </Link>
          {showCompany && (
            <a
              href={`tel:${phoneToTel(config.phone)}`}
              className="text-sm font-medium text-[#c9a227] hover:underline"
            >
              {config.phone}
            </a>
          )}
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-10 lg:py-14">
        <p className="text-xs font-semibold tracking-wide text-[#c9a227] uppercase mb-3">
          {page.keyword}
        </p>
        <h1 className="text-[clamp(1.5rem,4vw,2.15rem)] font-bold text-[#0b1c33] leading-snug mb-4">
          {resolved.title}
        </h1>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          {resolved.description}
        </p>

        <div
          className="prose-seo guide-doc-body"
          dangerouslySetInnerHTML={{ __html: resolved.content }}
        />

        <section className="mt-12 pt-8 border-t border-black/8">
          <h2 className="text-lg font-bold text-[#0b1c33] mb-4">자주 묻는 질문</h2>
          <div className="space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-lg border border-gray-200 bg-white open:shadow-sm transition"
              >
                <summary className="cursor-pointer list-none px-4 py-3.5 font-semibold text-[#0b1c33] flex items-center justify-between gap-3 text-sm sm:text-base">
                  <span>{faq.question}</span>
                  <span className="text-[#c9a227] text-lg group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="px-4 pb-4 text-sm text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <RelatedKeywordPagesSection links={relatedKeywordLinks} />

        <NearbyRegionsSection
          cityLabel={nearbySubRegions.cityLabel}
          regions={nearbySubRegions.regions}
        />

        {localRegion && (
          <LocalPartnersSection
            region={localRegion}
            partners={localPartners}
            brandName={config.brandName}
          />
        )}

        <div className="mt-10 text-center border border-[#0b1c33]/10 bg-white rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">{regionLabel} · {page.keyword}</p>
          <p className="font-bold text-[#0b1c33] mb-4">{config.brandName}</p>
          {showCompany && (
            <a
              href={`tel:${phoneToTel(config.phone)}`}
              className="inline-flex items-center justify-center bg-[#c9a227] text-[#0b1c33] font-bold px-6 py-3 rounded-lg hover:bg-[#e0bc4a] transition"
            >
              전화 상담 {config.phone}
            </a>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: resolved.title,
            description: resolved.description,
            keywords: page.keyword,
            image: [
              getOgImageAbsoluteUrl(config, `/guide/${page.slug}/opengraph-image`),
              getPageImageUrl(page, config),
              ...getSeoContentImageUrls(page.slug || page.keyword, config),
            ],
            author: {
              "@type": "RealEstateAgent",
              name: config.brandName,
              telephone: config.phone,
              address: config.address,
            },
            publisher: {
              "@type": "Organization",
              name: config.brandName,
            },
            contentLocation: {
              "@type": "Place",
              name: regionLabel,
              geo: {
                "@type": "GeoCoordinates",
                latitude: DEFAULT_GEO.lat,
                longitude: DEFAULT_GEO.lng,
              },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </article>
  );
}
