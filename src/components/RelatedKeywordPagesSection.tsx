import Link from "next/link";
import type { RelatedKeywordPageLink } from "@/lib/related-keyword-pages";

interface Props {
  links: RelatedKeywordPageLink[];
}

export default function RelatedKeywordPagesSection({ links }: Props) {
  if (links.length === 0) return null;

  return (
    <section className="mt-10 pt-8 border-t border-black/8">
      <h2 className="text-lg font-bold text-[#0b1c33] mb-1">관련 키워드 안내</h2>
      <p className="text-xs text-gray-500 mb-4">
        생성된 페이지 중 관련 키워드 {links.length}개 — 좌우로 스크롤하세요.
      </p>
      <div className="relative -mx-1">
        <div className="flex gap-2 overflow-x-auto pb-2 px-1 scroll-smooth snap-x snap-mandatory [scrollbar-width:thin]">
          {links.map((item) => (
            <Link
              key={item.slug}
              href={item.href}
              className="snap-start shrink-0 inline-flex items-center px-4 py-2.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-[#0b1c33] hover:border-[#c9a227] hover:text-[#c9a227] transition whitespace-nowrap max-w-[240px] truncate"
              title={item.keyword}
            >
              {item.keyword}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
