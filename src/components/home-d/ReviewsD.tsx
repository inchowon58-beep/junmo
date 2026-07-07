import { getResolvedSiteConfig } from "@/utils/siteConfig";

export default async function ReviewsD() {
  const { tenantUi } = await getResolvedSiteConfig();
  const reviews = (tenantUi?.reviews || []).slice(0, 3);

  return (
    <section id="reviews" className="home-d-section py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-3 text-center">
          Customer Review
        </p>
        <h2 className="home-d-display text-2xl sm:text-3xl lg:text-4xl text-center text-gray-900 mb-12">
          Service <em className="italic text-orange font-normal">Review</em>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <blockquote
              key={`${review.name}-${i}`}
              className="home-d-review border-l-2 border-orange/40 pl-6 py-2"
            >
              <p className="text-sm text-gray-600 leading-relaxed mb-6 italic">
                &ldquo;{review.text}&rdquo;
              </p>
              <footer>
                <p className="text-sm font-medium text-gray-900">{review.name}</p>
                <p className="text-xs text-gray-400 mt-1">{review.business}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
