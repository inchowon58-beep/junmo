import type { Metadata } from "next";
import HomeSections, { HomeLeadBlocks } from "@/components/HomeSections";
import HomePageB from "@/components/home-b/HomePageB";
import HomePageC from "@/components/home-c/HomePageC";
import HomePageD from "@/components/home-d/HomePageD";
import { parseSiteDesignId } from "@/lib/site-designs";
import { getSiteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/metadata";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return buildPageMetadata(config, {
    title: `${config.brandName} | 유기동물 보호·입양 전문`,
    description: config.description,
    path: "/",
    ogPath: "/opengraph-image",
  });
}

export default async function HomePage() {
  const { tenantUi } = await getResolvedSiteConfig();

  const siteDesign = parseSiteDesignId(tenantUi?.siteDesign);

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
