import type { Metadata } from "next";
import { pickSeoSuffixKeywords, buildTitleWithSeoSuffix } from "@/lib/seo-title-keywords";
import HomeSections, { HomeLeadBlocks } from "@/components/HomeSections";
import HomePageB from "@/components/home-b/HomePageB";
import HomePageC from "@/components/home-c/HomePageC";
import HomePageD from "@/components/home-d/HomePageD";
import HomePageRe from "@/components/home-re/HomePageRe";
import { parseSiteDesignId } from "@/lib/site-designs";
import { getSiteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/metadata";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

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

export default async function HomePage() {
  const { tenantUi } = await getResolvedSiteConfig();
  const siteDesign = parseSiteDesignId(tenantUi?.siteDesign);

  if (siteDesign === "e") {
    return <HomePageRe />;
  }
  if (siteDesign === "d") {
    return <HomePageD />;
  }
  if (siteDesign === "c") {
    return <HomePageC />;
  }
  if (siteDesign === "b") {
    return <HomePageB />;
  }

  return (
    <>
      <HomeLeadBlocks />
      <HomeSections />
    </>
  );
}
