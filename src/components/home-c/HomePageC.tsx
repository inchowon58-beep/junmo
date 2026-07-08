import HeroC from "@/components/home-c/HeroC";
import PhotoStripC from "@/components/home-c/PhotoStripC";
import MissionC from "@/components/home-c/MissionC";
import StoryC from "@/components/home-c/StoryC";
import ScenariosC from "@/components/home-c/ScenariosC";
import CasesC from "@/components/home-c/CasesC";
import SupportC from "@/components/home-c/SupportC";
import PromisesC from "@/components/home-c/PromisesC";
import ReviewsC from "@/components/home-c/ReviewsC";
import ProcessC from "@/components/home-c/ProcessC";
import ContactC from "@/components/home-c/ContactC";

/** C 디자인 홈 — 파양·무료분양 전문 레이아웃 */
export default async function HomePageC() {
  return (
    <>
      <HeroC />
      <PhotoStripC />
      <MissionC />
      <StoryC />
      <ScenariosC />
      <CasesC />
      <SupportC />
      <PromisesC />
      <ReviewsC />
      <ProcessC />
      <ContactC />
    </>
  );
}
