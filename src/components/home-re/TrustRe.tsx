const POINTS = [
  {
    title: "지역에 정통한 상담",
    body: "서귀포·동홍 일대 시세와 생활권을 바탕으로, 목적에 맞는 선택지를 정리해 드립니다.",
  },
  {
    title: "투명한 진행 과정",
    body: "중개 수수료·일정·위험 요소를 미리 설명하고, 결정에 필요한 정보를 숨기지 않습니다.",
  },
  {
    title: "계약까지 책임 동행",
    body: "가계약부터 잔금·인도까지 단계별로 확인하며, 거래 후에도 문의에 응합니다.",
  },
];

export default function TrustRe() {
  return (
    <section id="trust" className="re-section re-section-mist scroll-mt-20">
      <div className="re-container">
        <p className="re-eyebrow re-eyebrow-dark text-center">왜 태솔인가</p>
        <h2 className="re-heading text-center max-w-2xl mx-auto">
          신뢰를 만드는 중개 방식
        </h2>
        <p className="re-lead text-center max-w-xl mx-auto mt-4">
          매물 홍보가 아닌, 사람을 위한 중개. 제주에서의 중요한 결정을
          함께 지키는 것이 태솔의 역할입니다.
        </p>
        <div className="re-trust-grid mt-14">
          {POINTS.map((item) => (
            <article key={item.title} className="re-trust-item">
              <h3 className="re-trust-title">{item.title}</h3>
              <p className="re-trust-body">{item.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
