import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  async redirects() {
    return [
      {
        source: "/seo/:slug",
        destination: "/guide/:slug",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      { source: "/feed.xml", destination: "/feed" },
      { source: "/rss.xml", destination: "/feed" },
    ];
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.cattery.co.kr",
        pathname: "/chul/**",
      },
      {
        protocol: "https",
        hostname: "123demolition.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.123demolition.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
