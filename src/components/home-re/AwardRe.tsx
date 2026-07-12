import Image from "next/image";

export default function AwardRe() {
  return (
    <section id="award" className="re-section re-section-navy scroll-mt-20">
      <div className="re-container">
        <div className="re-award-grid">
          <div className="re-award-copy">
            <p className="re-eyebrow">Korea Local Business Awards</p>
            <h2 className="re-heading re-heading-light">
              2026 서귀포시
              <br />
              우수공인중개사
            </h2>
            <p className="re-lead re-lead-muted mt-5">
              지역브랜드 대상 라이프서비스부문에서
              <strong className="text-[var(--re-gold)] font-semibold">
                {" "}
                서귀포시 우수공인중개사
              </strong>
              로 선정되었습니다. 고객의 신뢰가 곧 우리의 기준입니다.
            </p>
            <ul className="re-award-points mt-8">
              <li>주관 · 베스트타임즈언론사</li>
              <li>부문 · 라이프서비스</li>
              <li>수상 · 양준모공인중개사사무소 태솔</li>
            </ul>
          </div>
          <figure className="re-award-figure">
            <Image
              src="/images/award-2026.png"
              alt="2026 지역브랜드 대상 서귀포시 우수공인중개사 선정 - 양준모공인중개사사무소태솔"
              width={900}
              height={600}
              className="w-full h-auto"
              priority
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
