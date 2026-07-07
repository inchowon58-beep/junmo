import HeroD from "@/components/home-d/HeroD";
import StoriesD from "@/components/home-d/StoriesD";
import AboutD from "@/components/home-d/AboutD";
import ServicesD from "@/components/home-d/ServicesD";
import GuideD from "@/components/home-d/GuideD";
import ReviewsD from "@/components/home-d/ReviewsD";
import GalleryD from "@/components/home-d/GalleryD";
import FaqD from "@/components/home-d/FaqD";
import ContactD from "@/components/home-d/ContactD";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

/** D 디자인 홈 — mainecoon.cattery.co.kr 스타일 레이아웃 */
export default async function HomePageD() {
  const { tenantUi } = await getResolvedSiteConfig();
  const faqItems = tenantUi?.faqItems || [];

  return (
    <>
      <HeroD />
      <StoriesD />
      <AboutD />
      <ServicesD />
      <GuideD />
      <ReviewsD />
      <GalleryD />
      <FaqD items={faqItems} />
      <ContactD />
    </>
  );
}
