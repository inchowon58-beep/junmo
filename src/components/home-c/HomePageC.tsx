import HeroC from "@/components/home-c/HeroC";
import PhotoStripC from "@/components/home-c/PhotoStripC";
import MissionC from "@/components/home-c/MissionC";
import StoryC from "@/components/home-c/StoryC";
import CasesC from "@/components/home-c/CasesC";
import SupportC from "@/components/home-c/SupportC";
import PromisesC from "@/components/home-c/PromisesC";
import ProcessC from "@/components/home-c/ProcessC";
import ContactC from "@/components/home-c/ContactC";

/** C 디자인 홈 — agapetstory.co.kr 스타일 레이아웃 */
export default async function HomePageC() {
  return (
    <>
      <HeroC />
      <PhotoStripC />
      <MissionC />
      <StoryC />
      <CasesC />
      <SupportC />
      <PromisesC />
      <ProcessC />
      <ContactC />
    </>
  );
}
