import Image from "next/image";
import { jejuImageUrl, pickJejuImageIndexes } from "@/lib/jeju-images";

const INDEXES = pickJejuImageIndexes(6, "gallery-taesol-2026");

const CAPTIONS = [
  "제주 서귀포의 일상과 풍경",
  "바다와 맞닿은 생활권",
  "조용한 주거 환경",
  "올레와 이어지는 동네",
  "계절이 선명한 제주의 하루",
  "서귀포에서 시작하는 새로운 삶",
];

export default function GalleryRe() {
  return (
    <section id="gallery" className="re-section re-section-paper scroll-mt-20">
      <div className="re-container">
        <p className="re-eyebrow re-eyebrow-dark">제주 · 서귀포</p>
        <h2 className="re-heading">우리가 함께하는 지역</h2>
        <p className="re-lead mt-4 max-w-xl">
          중개하는 땅이 곧 고객의 일상이 됩니다. 서귀포의 분위기와 생활권을
          이해하는 것에서 상담이 시작됩니다.
        </p>
        <div className="re-gallery mt-12">
          {INDEXES.map((idx, i) => (
            <figure key={idx} className="re-gallery-item">
              <Image
                src={jejuImageUrl(idx)}
                alt={CAPTIONS[i]}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 33vw"
              />
              <figcaption className="re-gallery-cap">{CAPTIONS[i]}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
