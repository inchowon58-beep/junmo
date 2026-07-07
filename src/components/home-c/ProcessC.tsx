import { getResolvedSiteConfig } from "@/utils/siteConfig";

export default async function ProcessC() {
  const { tenantUi } = await getResolvedSiteConfig();
  const steps = tenantUi?.processSteps || [];

  return (
    <section id="process" className="home-c-section py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs tracking-[0.25em] uppercase text-stone-400 mb-3">Process</p>
        <h2 className="home-c-editorial text-3xl sm:text-4xl font-light text-stone-900 mb-4">
          입양이 처음이신가요?
        </h2>
        <p className="text-stone-500 text-sm mb-16 max-w-lg">
          입양은 쉬운 결정이 아닙니다.
          <br />
          단계별로 천천히 함께 걷겠습니다.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {steps.map((step) => (
            <div key={step.step} className="home-c-process-step">
              <p className="text-4xl font-light text-stone-200 mb-4">{step.step}</p>
              <h3 className="text-lg font-medium text-stone-900 mb-3">{step.title}</h3>
              <p className="text-sm text-stone-500 leading-relaxed whitespace-pre-line">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
