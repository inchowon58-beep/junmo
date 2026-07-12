import type { Metadata } from "next";
import { pickSeoSuffixKeywords, buildTitleWithSeoSuffix } from "@/lib/seo-title-keywords";
import HomePageRe from "@/components/home-re/HomePageRe";
import { getSiteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const pageTitle = `${config.brandName} | 2026 서귀포시 우수공인중개사`;
  const browserTitle = buildTitleWithSeoSuffix(pageTitle, config.brandName);
  const suffixKeywords = pickSeoSuffixKeywords(config.brandName, 3);

  return {
    ...buildPageMetadata(config, {
      title: pageTitle,
      description: config.description,
      path: "/",
      ogPath: "/opengraph-image",
      keywords: [
        config.brandName,
        "제주공인중개사",
        "서귀포공인중개사",
        "서귀포시 우수공인중개사",
        "양준모공인중개사",
        "태솔부동산",
        "제주부동산",
        ...suffixKeywords,
      ],
    }),
    title: { absolute: browserTitle },
  };
}

export default function HomePage() {
  return <HomePageRe />;
}
