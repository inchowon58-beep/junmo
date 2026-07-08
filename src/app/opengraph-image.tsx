import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/site-config";
import { OgBrandedLayout, OG_SIZE } from "@/lib/og-template";

export const alt = "아가펫보호소 강아지·고양이 파양·무료분양";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const config = await getSiteConfig();

  return new ImageResponse(
    (
      <OgBrandedLayout
        brandName={config.brandName}
        title="강아지·고양이 파양 · 무료분양"
        subtitle={config.description.slice(0, 80)}
        badge="파양·분양 상담"
      />
    ),
    {
      ...OG_SIZE,
      headers: {
        "Cache-Control": "public, max-age=3600, must-revalidate",
      },
    }
  );
}
