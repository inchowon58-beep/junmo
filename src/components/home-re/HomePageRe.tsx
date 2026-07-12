import HeroRe from "@/components/home-re/HeroRe";
import AwardRe from "@/components/home-re/AwardRe";
import AboutRe from "@/components/home-re/AboutRe";
import TrustRe from "@/components/home-re/TrustRe";
import GalleryRe from "@/components/home-re/GalleryRe";
import ReviewsRe from "@/components/home-re/ReviewsRe";
import ContactRe from "@/components/home-re/ContactRe";

/** 제주 양준모공인중개사 태솔 — 신뢰형 소개 홈 */
export default function HomePageRe() {
  return (
    <div id="top" className="home-re-root">
      <HeroRe />
      <AwardRe />
      <AboutRe />
      <TrustRe />
      <GalleryRe />
      <ReviewsRe />
      <ContactRe />
    </div>
  );
}
