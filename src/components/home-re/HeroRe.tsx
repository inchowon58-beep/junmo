import Image from "next/image";
import { jejuImageUrl, pickJejuImageIndexes } from "@/lib/jeju-images";

const HERO_IMG = jejuImageUrl(pickJejuImageIndexes(1, "hero-taesol")[0]);

export default function HeroRe() {
  return (
    <section className="re-hero relative min-h-[100svh] flex flex-col justify-end overflow-hidden">
      <Image
        src={HERO_IMG}
        alt="제주도 서귀포 풍경"
        fill
        priority
        className="object-cover object-center re-hero-img"
        sizes="100vw"
      />
      <div className="re-hero-veil absolute inset-0" aria-hidden />
      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-28 pt-32 sm:pb-32">
        <p className="re-fade-up re-brand text-[clamp(1.75rem,5vw,3.25rem)] font-semibold tracking-tight text-white mb-5">
          양준모공인중개사 태솔
        </p>
        <h1 className="re-fade-up re-delay-1 text-[clamp(1.15rem,3.2vw,1.85rem)] font-medium text-[var(--re-gold)] leading-snug max-w-2xl mb-4">
          2026 서귀포시 우수공인중개사
        </h1>
        <p className="re-fade-up re-delay-2 text-white/85 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
          제주 서귀포에서, 거래의 처음부터 끝까지 투명하게 함께합니다.
        </p>
        <div className="re-fade-up re-delay-3 flex flex-wrap gap-3">
          <a href="tel:01090494064" className="re-btn re-btn-gold">
            전화 상담
          </a>
          <a href="#award" className="re-btn re-btn-ghost">
            수상 소개
          </a>
        </div>
      </div>
    </section>
  );
}
