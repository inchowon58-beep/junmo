export default function RegionsB() {
  const regions = ["서울 전 지역", "경기도 전 지역", "인천 전 지역"];

  return (
    <section id="regions" className="home-b-section py-12 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold text-orange mb-4">출장 가능 지역</p>
        <div className="flex flex-wrap justify-center gap-3">
          {regions.map((region) => (
            <span
              key={region}
              className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-dark shadow-sm"
            >
              {region}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
