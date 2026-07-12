import type { SeoReview } from "@/lib/seo-reviews";

interface Props {
  keyword: string;
  reviews: SeoReview[];
}

export default function GuideReviewsSection({ keyword, reviews }: Props) {
  if (reviews.length === 0) return null;

  return (
    <section className="mt-12 pt-8 border-t border-black/8">
      <h2 className="re-heading text-xl mb-2">상담 후기</h2>
      <p className="text-sm text-[var(--re-muted)] mb-6">
        {keyword} 관련 상담·거래에서 남겨 주신 이야기입니다.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        {reviews.map((r) => (
          <article
            key={`${r.name}-${r.area}-${r.text.slice(0, 12)}`}
            className="border-t-2 border-[var(--re-gold)] pt-4"
          >
            <div className="text-[var(--re-gold)] text-sm tracking-wider mb-2" aria-hidden>
              ★★★★★
            </div>
            <p className="text-sm text-[var(--re-ink)] leading-relaxed mb-3">{r.text}</p>
            <footer className="text-xs text-[var(--re-muted)] flex flex-wrap gap-2">
              <span className="font-semibold text-[var(--re-navy)]">{r.name}</span>
              <span>{r.area}</span>
            </footer>
          </article>
        ))}
      </div>
    </section>
  );
}
