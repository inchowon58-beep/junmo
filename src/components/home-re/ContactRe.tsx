const PLACE_URL =
  "https://map.naver.com/p/entry/place/1574598604?placePath=%2Fhome%3Fentry%3Dplt&searchType=place&lng=126.5721595&lat=33.2559783";

export default function ContactRe() {
  return (
    <section id="contact" className="re-section re-section-navy scroll-mt-20">
      <div className="re-container re-contact">
        <div>
          <p className="re-eyebrow">오시는 길 · 연락처</p>
          <h2 className="re-heading re-heading-light">상담 예약</h2>
          <p className="re-lead re-lead-muted mt-4 max-w-md">
            방문·전화 상담 모두 가능합니다. 일정 조율이 필요하시면
            먼저 연락 주시면 안내해 드립니다.
          </p>
        </div>
        <address className="re-contact-card not-italic">
          <p className="re-contact-brand">양준모공인중개사 태솔</p>
          <p className="re-contact-line">
            <span aria-hidden>📍</span>
            제주특별자치도 서귀포시 동홍중앙로58-1, 1층
          </p>
          <p className="re-contact-line">
            <span aria-hidden>📞</span>
            <a href="tel:01090494064">010-9049-4064</a>
          </p>
          <p className="re-contact-meta">사업자등록번호 665-11-02801</p>
          <p className="re-contact-meta">등록번호 제50130-2024-00012호</p>
          <div className="re-contact-actions">
            <a href="tel:01090494064" className="re-btn re-btn-gold">
              전화 연결
            </a>
            <a
              href={PLACE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="re-btn re-btn-ghost"
            >
              네이버 플레이스
            </a>
          </div>
        </address>
      </div>
    </section>
  );
}
