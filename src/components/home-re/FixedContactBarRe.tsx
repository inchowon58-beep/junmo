const PLACE_URL =
  "https://map.naver.com/p/entry/place/1574598604?placePath=%2Fhome%3Fentry%3Dplt&searchType=place&lng=126.5721595&lat=33.2559783";

export default function FixedContactBarRe() {
  return (
    <div className="re-fixed-bar">
      <a href="tel:01090494064" className="re-fixed-call">
        <span className="re-fixed-label">전화 연결</span>
        <span className="re-fixed-value">010-9049-4064</span>
      </a>
      <a
        href={PLACE_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="re-fixed-place"
      >
        <span className="re-fixed-label">네이버 플레이스</span>
        <span className="re-fixed-value">지도 · 매장 정보</span>
      </a>
    </div>
  );
}
