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
  brandName: "아가펫보호소",
  companyName: "사단법인 아가펫",
  tagline: "버려지지 않는 생명, 함께하는 두 번째 가족",
  description:
    "유기·유실 반려동물을 보호하고 건강하게 회복시켜 새 가족을 찾아주는 아가펫보호소입니다. 입양·임시보호·후원·봉사 상담을 환영합니다.",
  url: "https://sim-seven-woad.vercel.app",
  phone: "1555-7321",
  email: "agapet@shelter.kr",
  address: "경기도 양평군 (방문은 사전 예약제)",
  businessNumber: "",
  representative: "김아가",
  imageCdn: "https://image.cattery.co.kr/dogboho",
  imageCount: 20,
  supportBase: "임시보호",
  supportExtra: "입양상담",
  supportMax: "후원·봉사",
  geminiApiKey: "",
  naverClientId: "",
  naverClientSecret: "",
  dailySeoLimit: 10,
  naverExposureId: "dlscksspwlq",
  naverExposurePassword: "yuna070207",
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
