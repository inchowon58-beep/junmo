import { getResolvedSiteConfig } from "@/utils/siteConfig";

export default async function TopMarqueeB() {
  const { tenantUi } = await getResolvedSiteConfig();
  const lines =
    tenantUi?.marqueeLines?.length
      ? tenantUi.marqueeLines
      : [
          "서울·경기·인천 전 지역 무료 출장 견적",
          "24시간 365일 상시 대기중",
          "안전사고 0건 · 시간 약속 100% 엄수",
        ];

  const text = lines.join("  ·  ");

  return (
    <div className="home-b-marquee bg-dark text-white text-xs sm:text-sm py-2 overflow-hidden">
      <div className="home-b-marquee-track whitespace-nowrap font-medium">
        <span>{text}</span>
        <span aria-hidden>{text}</span>
      </div>
    </div>
  );
}
