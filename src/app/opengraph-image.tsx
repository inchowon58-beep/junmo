import { ImageResponse } from "next/og";
import { getSiteConfig } from "@/lib/site-config";
import { OgBrandedLayout, OG_SIZE } from "@/lib/og-template";

export const alt = "양준모공인중개사 태솔 · 2026 서귀포시 우수공인중개사";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const config = await getSiteConfig();

  return new ImageResponse(
    (
      <OgBrandedLayout
        brandName={config.brandName}
        title="2026 서귀포시 우수공인중개사"
        subtitle={config.description.slice(0, 90)}
        badge="제주 · 서귀포 공인중개"
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
