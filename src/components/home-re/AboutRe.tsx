import Image from "next/image";

export default function AboutRe() {
  return (
    <section id="about" className="re-section re-section-paper scroll-mt-20">
      <div className="re-container">
        <div className="re-about-grid">
          <figure className="re-ceo-figure">
            <Image
              src="/images/ceo-yangjunmo.png"
              alt="양준모 공인중개사 대표 사진"
              width={640}
              height={800}
              className="w-full h-full object-cover object-top"
              priority
            />
          </figure>
          <div className="re-about-copy">
            <p className="re-eyebrow re-eyebrow-dark">대표 소개</p>
            <h2 className="re-heading">양준모 공인중개사</h2>
            <p className="re-subhead mt-2">제주도 양준모공인중개사 태솔 대표</p>
            <p className="re-lead mt-6">
              서귀포를 중심으로 제주 부동산 중개를 이어가고 있습니다.
              매물 나열이 아닌, 고객의 상황과 목적에 맞는 안전한 거래가
              가장 중요하다고 믿습니다.
            </p>
            <p className="re-lead mt-4">
              계약 전 권리관계 확인부터 잔금·인도까지, 한 번의 상담으로
              끝나지 않는 책임 있는 중개를 약속드립니다.
            </p>
            <dl className="re-creds mt-8">
              <div>
                <dt>사무소</dt>
                <dd>양준모공인중개사사무소 태솔</dd>
              </div>
              <div>
                <dt>등록번호</dt>
                <dd>제50130-2024-00012호</dd>
              </div>
              <div>
                <dt>사업자등록번호</dt>
                <dd>665-11-02801</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
