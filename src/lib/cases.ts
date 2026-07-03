export interface ConstructionCase {
  id: string;
  title: string;
  type: string;
  imageIndex: number;
}

export const CONSTRUCTION_CASES: ConstructionCase[] = [
  { id: "1", title: "강남 대형 피트니스센터 철거", type: "철거·원상복구", imageIndex: 1 },
  { id: "2", title: "일산 소형 배달주방 철거", type: "철거·원상복구", imageIndex: 2 },
  { id: "3", title: "강남 중형 사무공간 철거", type: "철거·원상복구", imageIndex: 3 },
  { id: "4", title: "일산 사무실 인테리어 철거", type: "철거·원상복구", imageIndex: 4 },
  { id: "5", title: "마포 음식점 인테리어 철거", type: "철거", imageIndex: 5 },
  { id: "6", title: "영등포 소매매장 철거", type: "철거", imageIndex: 6 },
  { id: "7", title: "서초 상가 내부 철거", type: "철거·원상복구", imageIndex: 7 },
  { id: "8", title: "인천 식당 주방 철거", type: "철거·원상복구", imageIndex: 8 },
  { id: "9", title: "용인 상가 리모델링 철거", type: "철거·원상복구", imageIndex: 9 },
  { id: "10", title: "서초 소규모 공장 철거", type: "철거·원상복구", imageIndex: 10 },
  { id: "11", title: "강남 대형 사무실 철거", type: "철거·원상복구", imageIndex: 11 },
  { id: "12", title: "대형매장 폐기물 수거", type: "폐기물처리", imageIndex: 12 },
  { id: "13", title: "의료시설 인테리어 철거", type: "철거·원상복구", imageIndex: 13 },
  { id: "14", title: "연구시설 전체 철거", type: "철거·원상복구", imageIndex: 14 },
  { id: "15", title: "소형 음식점 철거", type: "철거·원상복구", imageIndex: 15 },
  { id: "16", title: "카페 인테리어 철거", type: "철거·원상복구", imageIndex: 16 },
  { id: "17", title: "주점 인테리어 철거", type: "철거·원상복구", imageIndex: 17 },
  { id: "18", title: "강남 사무실 부분 철거", type: "철거·원상복구", imageIndex: 18 },
  { id: "19", title: "종교시설 내부 철거", type: "철거·원상복구", imageIndex: 19 },
  { id: "20", title: "주거 공간 부분 철거", type: "철거", imageIndex: 20 },
];

export const REVIEWS = [
  {
    name: "문*화",
    business: "뷰티샵 폐업",
    text: "지원금 활용이 가능한지 몰랐는데, 상담부터 서류까지 꼼꼼히 챙겨주셔서 비용 부담 없이 마무리했습니다. 혼자 진행하기 힘든 부분을 많이 도와주셨어요.",
    rating: 5,
  },
  {
    name: "백*진",
    business: "브런치 카페 폐업",
    text: "폐업 일정이 촉박했는데 현장 방문 견적 후 바로 일정 잡아주셔서 일정 내에 끝냈습니다. 작업도 깔끔하고 소음·먼지 관리도 잘 해주셨습니다.",
    rating: 5,
  },
  {
    name: "박*길",
    business: "IT스타트업 폐업",
    text: "임대차 원상복구 기준이 까다로웠는데, 건물주와 직접 조율해 주셔서 분쟁 없이 계약 종료했습니다. 지원금 신청도 함께 진행해 주셔서 편했습니다.",
    rating: 5,
  },
  {
    name: "한*주",
    business: "영어학원 폐업",
    text: "여러 업체 견적을 받아봤는데, 지원금 상담과 철거 일정을 한꺼번에 정리해 줄 수 있는 곳이 여기뿐이었습니다. 마감 청소까지 맡길 수 있어서 좋았습니다.",
    rating: 5,
  },
  {
    name: "이*희",
    business: "의류 매장 폐업",
    text: "서류 준비가 막막했는데 차근차근 안내해 주셔서 큰 도움이 됐습니다. 철거 당일 폐기물도 바로 수거해 줘서 주변 민원 없이 조용히 끝냈습니다.",
    rating: 5,
  },
  {
    name: "김*덕",
    business: "피트니스센터 폐업",
    text: "운동기구가 많아 난이도가 높았는데, 경험 있는 팀이 와서 빠르게 처리했습니다. 폐업 관련 지원도 함께 챙겨주셔서 정리 비용을 많이 아꼈습니다.",
    rating: 5,
  },
];

export const WHY_US = [
  {
    num: "01",
    title: "현장 전문 인력",
    highlight: "80+명",
    sub: "전국 배치",
  },
  {
    num: "02",
    title: "폐업·지원금 컨설팅",
    highlight: "전담 상담",
    sub: "추가 수수료 없음",
  },
  {
    num: "03",
    title: "집기·비품 처리",
    highlight: "합리적 매입",
    sub: "철거비 절감",
  },
];

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "전화·상담 접수",
    desc: "철거 범위와 일정을 간단히 확인합니다",
  },
  {
    step: "02",
    title: "현장 방문 견적",
    desc: "방문 후 상세 견적과 일정을 안내합니다",
  },
  {
    step: "03",
    title: "철거·지원금 진행",
    desc: "공사와 지원금 신청을 함께 진행합니다",
  },
];
