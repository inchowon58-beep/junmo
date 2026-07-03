import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/site-config";
import { OgBrandedLayout, OG_SIZE } from "@/lib/og-template";

export const alt = "1977철거 폐업철거 전문";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const config = await getSiteConfig();

  return new ImageResponse(
    (
      <OgBrandedLayout
        brandName={config.brandName}
        title="폐업철거 · 원상복구 전문"
        subtitle={config.description.slice(0, 80)}
        badge="무료 방문 견적"
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
