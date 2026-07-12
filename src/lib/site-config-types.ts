import type { ExposureMode } from "./exposure-mode";
export type { ExposureMode } from "./exposure-mode";

export interface SiteConfig {
  brandName: string;
  companyName: string;
  tagline: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  address: string;
  businessNumber: string;
  /** 중개사무소 등록번호 등 */
  registrationNumber: string;
  /** 네이버 플레이스 URL */
  placeUrl: string;
  representative: string;
  imageCdn: string;
  imageCount: number;
  supportBase: string;
  supportExtra: string;
  supportMax: string;
  geminiApiKey: string;
  naverClientId: string;
  naverClientSecret: string;
  dailySeoLimit: number;
  naverExposureId: string;
  naverExposurePassword: string;
  serviceAvailableDays: number;
  serviceExpiresAt: string;
  /** cpa: 견적폼만·업체정보 미노출 / company: 업체정보+견적문의 동시 */
  exposureMode: ExposureMode;
}

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandName: "양준모공인중개사 태솔",
  companyName: "양준모공인중개사사무소 태솔",
  tagline: "2026 서귀포시 우수공인중개사 · 제주 부동산 신뢰 중개",
  description:
    "제주도 서귀포시 양준모공인중개사 태솔은 2026 서귀포시 우수공인중개사로 선정된 공인중개사사무소입니다. 투명한 상담과 지역 밀착 중개로 제주 부동산 거래를 안전하게 도와드립니다.",
  url: "https://junmo-kappa.vercel.app",
  phone: "010-9049-4064",
  email: "",
  address: "제주특별자치도 서귀포시 동홍중앙로58-1, 1층",
  businessNumber: "665-11-02801",
  registrationNumber: "제50130-2024-00012호",
  placeUrl:
    "https://map.naver.com/p/entry/place/1574598604?placePath=%2Fhome%3Fentry%3Dplt&searchType=place&lng=126.5721595&lat=33.2559783",
  representative: "양준모",
  imageCdn: "https://image.cattery.co.kr/jejuland",
  imageCount: 78,
  supportBase: "",
  supportExtra: "",
  supportMax: "",
  geminiApiKey: "",
  naverClientId: "",
  naverClientSecret: "",
  dailySeoLimit: 10,
  naverExposureId: "",
  naverExposurePassword: "",
  serviceAvailableDays: 30,
  serviceExpiresAt: "",
  exposureMode: "company",
};

export function phoneToTel(phone: string): string {
  return phone.replace(/\D/g, "");
}

export type PublicSiteConfig = Omit<SiteConfig, "geminiApiKey"> & {
  phoneTel: string;
};

export function toPublicConfig(config: SiteConfig): PublicSiteConfig {
  const { geminiApiKey: _, ...rest } = config;
  return { ...rest, phoneTel: phoneToTel(rest.phone) };
}
