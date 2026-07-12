import type { CSSProperties, ReactNode } from "react";

export const OG_SIZE = { width: 1200, height: 630 };

export const OG_COLORS = {
  dark: "#0b1c33",
  orange: "#c9a227",
  orangeLight: "#e0bc4a",
  white: "#ffffff",
  gray: "#9ca3af",
};

interface OgBrandedProps {
  brandName: string;
  title: string;
  subtitle?: string;
  badge?: string;
}

export function OgBrandedLayout({
  brandName,
  title,
  subtitle,
  badge,
}: OgBrandedProps): ReactNode {
  const containerStyle: CSSProperties = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "56px 64px",
    fontFamily: "sans-serif",
    background: `linear-gradient(135deg, ${OG_COLORS.dark} 0%, #2d2d2d 45%, ${OG_COLORS.orange} 160%)`,
  };

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 16,
            background: OG_COLORS.orange,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: OG_COLORS.white,
            fontSize: 28,
            fontWeight: 900,
          }}
        >
          태솔
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ color: OG_COLORS.white, fontSize: 36, fontWeight: 800 }}>
            {brandName}
          </div>
          <div style={{ color: OG_COLORS.gray, fontSize: 22 }}>
            제주 · 서귀포 공인중개
          </div>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 960 }}>
        {badge && (
          <div
            style={{
              alignSelf: "flex-start",
              background: OG_COLORS.orange,
              color: OG_COLORS.white,
              fontSize: 22,
              fontWeight: 700,
              padding: "10px 24px",
              borderRadius: 999,
            }}
          >
            {badge}
          </div>
        )}
        <div
          style={{
            color: OG_COLORS.white,
            fontSize: 52,
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div style={{ color: "#d1d5db", fontSize: 28, lineHeight: 1.4 }}>{subtitle}</div>
        )}
      </div>

      <div style={{ color: OG_COLORS.gray, fontSize: 20 }}>
        제주 · 서귀포 공인중개
      </div>
    </div>
  );
}

/** 윤슬 — 바닷가에 빛나는 빛 느낌 파비콘 */
export function FaviconLayout({ size }: { size: number }): ReactNode {
  const glow = size >= 48 ? 10 : 4;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        borderRadius: size >= 48 ? 18 : 6,
        background: "linear-gradient(165deg, #0a2744 0%, #135a8a 42%, #1a8fb5 72%, #7ec8e3 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: size * 0.7,
          height: size * 0.35,
          bottom: size * 0.18,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.18)",
          filter: `blur(${glow}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: size * 0.28,
          height: size * 0.28,
          borderRadius: "50%",
          background: "radial-gradient(circle, #fff9e6 0%, #ffe08a 35%, rgba(255,200,80,0.15) 70%, transparent 100%)",
          boxShadow: `0 0 ${glow * 2}px rgba(255, 230, 150, 0.85)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: size * 0.08,
          height: size * 0.08,
          top: size * 0.22,
          right: size * 0.22,
          borderRadius: "50%",
          background: "#fff8dc",
          opacity: 0.9,
        }}
      />
    </div>
  );
}
