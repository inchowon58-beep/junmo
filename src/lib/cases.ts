export interface ConstructionCase {
  id: string;
  title: string;
  type: string;
  imageIndex: number;
}

export const CONSTRUCTION_CASES: ConstructionCase[] = [
  { id: "1", title: "길고양이 구조 후 입양", type: "구조·입양", imageIndex: 1 },
  { id: "2", title: "유기견 치료·재활 사례", type: "치료·재활", imageIndex: 2 },
  { id: "3", title: "새끼 고양이 임시보호", type: "임시보호", imageIndex: 3 },
  { id: "4", title: "노견 보호·요양", type: "보호·요양", imageIndex: 4 },
  { id: "5", title: "중형견 가족 입양", type: "입양 성공", imageIndex: 5 },
  { id: "6", title: "긴급 구조·수술 지원", type: "구조·의료", imageIndex: 6 },
  { id: "7", title: "봉사단체 산책 프로그램", type: "봉사·활동", imageIndex: 7 },
  { id: "8", title: "후원금 의료비 지원", type: "후원·치료", imageIndex: 8 },
  { id: "9", title: "반려묘 입양 매칭", type: "입양·매칭", imageIndex: 9 },
  { id: "10", title: "겨울철 길고양이 보호", type: "계절 보호", imageIndex: 10 },
  { id: "11", title: "장애견 특별 케어", type: "특별 케어", imageIndex: 11 },
  { id: "12", title: "가족 단위 입양", type: "입양 성공", imageIndex: 12 },
  { id: "13", title: "유기묘 중성화·예방접종", type: "의료·예방", imageIndex: 13 },
  { id: "14", title: "보호소 시설 개선", type: "시설·후원", imageIndex: 14 },
  { id: "15", title: "어린이 봉사 체험", type: "교육·봉사", imageIndex: 15 },
  { id: "16", title: "임보 가정 연계", type: "임시보호", imageIndex: 16 },
  { id: "17", title: "노묘·노견 평생 보호", type: "평생 보호", imageIndex: 17 },
  { id: "18", title: "지역 구조 네트워크", type: "구조·협력", imageIndex: 18 },
  { id: "19", title: "입양 후 상담 지원", type: "사후 관리", imageIndex: 19 },
  { id: "20", title: "정기 후원자 케어", type: "후원·운영", imageIndex: 20 },
];

export const REVIEWS = [
  {
    name: "이*진",
    business: "강아지 입양",
    text: "상담부터 입양 후 관리까지 세심하게 챙겨주셔서 우리 가족에게 완벽한 친구를 만났습니다. 정말 감사합니다.",
    rating: 5,
  },
  {
    name: "박*수",
    business: "고양이 입양",
    text: "처음 반려동물을 키우는 거라 걱정이 많았는데, 성향 매칭과 입양 후 상담이 큰 도움이 됐어요.",
    rating: 5,
  },
  {
    name: "최*영",
    business: "임시보호",
    text: "긴급 구조된 아이를 임시로 맡았다가 정이 들어 입양하게 됐습니다. 보호소 분들이 정말 따뜻하세요.",
    rating: 5,
  },
  {
    name: "김*호",
    business: "정기 후원",
    text: "후원금 사용 내역을 투명하게 공개해 주셔서 믿고 후원할 수 있습니다. 작은 도움이지만 계속 함께하겠습니다.",
    rating: 5,
  },
  {
    name: "정*미",
    business: "봉사 참여",
    text: "주말 산책 봉사에 참여했는데 아이들이 너무 사랑스러웠어요. 다음에도 꼭 다시 오겠습니다.",
    rating: 5,
  },
  {
    name: "한*우",
    business: "노견 입양",
    text: "나이 든 아이를 입양하기 어려울 줄 알았는데, 맞춤 상담 덕분에 우리 집에 온 할머니 강아지가 행복해하고 있어요.",
    rating: 5,
  },
];

export const WHY_US = [
  {
    num: "01",
    title: "전문 케어팀",
    highlight: "수의·행동",
    sub: "전문 상담",
  },
  {
    num: "02",
    title: "책임 입양",
    highlight: "맞춤 매칭",
    sub: "사후 관리",
  },
  {
    num: "03",
    title: "투명 운영",
    highlight: "공개 후원",
    sub: "정기 보고",
  },
];

export const PROCESS_STEPS = [
  { step: "01", title: "문의·상담", desc: "입양·후원·봉사 문의를 접수합니다" },
  { step: "02", title: "방문·만남", desc: "예약 후 보호소에서 아이들을 만납니다" },
  { step: "03", title: "입양·후원", desc: "매칭 후 입양 또는 후원을 진행합니다" },
];
