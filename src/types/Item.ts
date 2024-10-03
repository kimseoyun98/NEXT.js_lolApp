export type Item = {
  id: string; // 아이템 ID
  name: string; // 아이템 이름
  description: string; // 아이템 설명
  plaintext: string; // 아이템의 간단한 설명
  tags: string[]; // 아이템 태그 배열
  image: {
    full: string; // 이미지 파일명
    sprite: string; // 스프라이트 파일명
    group: string; // 그룹
    x: number; // 이미지 x좌표
    y: number; // 이미지 y좌표
    w: number; // 너비
    h: number; // 높이
  };
  gold: {
    base: number; // 기본 금액
    total: number; // 총 금액
    sell: number; // 판매 금액
  };
  effect: { [key: string]: number }; // 효과
  effectBurn: { [key: string]: string }; // 효과 문자열
};

// 아이템 목록을 담는 타입
export type ItemData = {
  type: string; // 아이템 유형
  format: string; // 아이템 형식
  version: string; // 버전
  data: {
    [key: string]: Item; // 아이템 ID를 키로 갖는 객체
  };
};
