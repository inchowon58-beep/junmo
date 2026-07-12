const REVIEWS = [
  {
    name: "김○○",
    area: "서귀포시 동홍동",
    text: "매물 설명부터 계약 조건까지 차근차근 알려주셔서 안심하고 진행했습니다. 수수료도 미리 명확하게 안내해 주셨어요.",
  },
  {
    name: "이○○",
    area: "서귀포시 중문",
    text: "타 지역에서 이주 상담을 받았는데, 생활권·학교·주차까지 현실적으로 짚어 주셔서 결정이 빨랐습니다.",
  },
  {
    name: "박○○",
    area: "제주시 → 서귀포",
    text: "급한 일정에도 권리관계 확인을 꼼꼼히 해 주셨습니다. 잔금 날까지 연락이 잘 되어 좋았어요.",
  },
  {
    name: "최○○",
    area: "서귀포시 대정",
    text: "처음 부동산 거래라 걱정이 많았는데, 용어부터 절차까지 쉽게 설명해 주셔서 부담이 줄었습니다.",
  },
  {
    name: "정○○",
    area: "서귀포시 성산",
    text: "시세만 밀어붙이지 않고, 제 상황에 맞는 선택지를 여러 개 비교해 주셨습니다. 신뢰가 갔습니다.",
  },
  {
    name: "한○○",
    area: "서귀포시 남원",
    text: "계약 후에도 전입·공과금 관련 질문에 친절히 답해 주셨어요. 한 번으로 끝나지 않는 느낌이었습니다.",
  },
  {
    name: "윤○○",
    area: "서울 → 제주",
    text: "원격으로도 사진·서류·일정을 체계적으로 공유해 주셔서 멀리서도 불안하지 않았습니다.",
  },
  {
    name: "오○○",
    area: "서귀포시 강정",
    text: "우수공인중개사 선정 소식을 보고 방문했는데, 상담 태도가 그만큼 차분하고 확실했습니다.",
  },
  {
    name: "송○○",
    area: "서귀포시 동홍",
    text: "위치도 찾기 쉽고, 방문 상담 예약부터 안내가 친절했습니다. 주변에 추천하고 싶은 사무소입니다.",
  },
];

export default function ReviewsRe() {
  return (
    <section id="reviews" className="re-section re-section-mist scroll-mt-20">
      <div className="re-container">
        <p className="re-eyebrow re-eyebrow-dark text-center">고객 후기</p>
        <h2 className="re-heading text-center">함께한 분들의 이야기</h2>
        <p className="re-lead text-center max-w-lg mx-auto mt-4">
          실제 상담·거래 과정에서 남겨 주신 소중한 말씀입니다.
        </p>
        <div className="re-reviews mt-12">
          {REVIEWS.map((r) => (
            <article key={`${r.name}-${r.area}`} className="re-review">
              <div className="re-review-stars" aria-hidden>
                ★★★★★
              </div>
              <p className="re-review-text">{r.text}</p>
              <footer className="re-review-meta">
                <span className="re-review-name">{r.name}</span>
                <span className="re-review-area">{r.area}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
