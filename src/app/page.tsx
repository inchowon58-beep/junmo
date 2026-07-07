import type { Metadata } from "next";
import HomeSections, { HomeLeadBlocks } from "@/components/HomeSections";
import HomePageB from "@/components/home-b/HomePageB";
import { getSiteConfig } from "@/lib/site-config";
import { buildPageMetadata } from "@/lib/metadata";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  return buildPageMetadata(config, {
    title: `${config.brandName} | 폐업철거 전문 · 폐업지원금 원스톱`,
    description: config.description,
    path: "/",
    ogPath: "/opengraph-image",
  });
}

export default async function HomePage() {
  const { tenantUi } = await getResolvedSiteConfig();

  if (tenantUi?.siteDesign === "b") {
    return <HomePageB />;
  }

  return (
    <>
      <HomeLeadBlocks />
      <HomeSections />
    </>
  );
}
