import { REVIEWS } from "@/lib/cases";
import { getResolvedSiteConfig } from "@/utils/siteConfig";

function Stars({ count }: { count: number }) {
  return <span className="text-orange text-sm">{"★".repeat(count)}</span>;
}

export default async function ReviewsC() {
  const { tenantUi } = await getResolvedSiteConfig();
  const reviews = tenantUi?.reviews?.length ? tenantUi.reviews : REVIEWS;
  const satisfaction = tenantUi?.reviewsSatisfaction || "97%";

  return (
    <section id="reviews" className="home-c-section py-20 lg:py-28 bg-stone-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-3">Reviews</p>
          <h2 className="home-c-editorial text-3xl sm:text-4xl font-light text-stone-900 mb-3">
            이용 고객 만족도{" "}
            <span className="text-orange font-normal">{satisfaction}</span>
          </h2>
          <p className="text-stone-500 text-sm">
            파양·무료분양·입양 상담을 이용하신 분들의 후기입니다
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <article
              key={`${review.name}-${i}`}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border border-stone-100"
            >
              <Stars count={review.rating} />
              <p className="text-stone-600 text-sm leading-relaxed mt-4 mb-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <p className="text-sm font-medium text-stone-900">
                {review.name}{" "}
                <span className="text-stone-400 font-normal">| {review.business}</span>
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
