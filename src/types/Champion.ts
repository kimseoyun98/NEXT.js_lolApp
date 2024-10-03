export type Champion = {
  id: string; // 챔피언의 ID
  key: string; // 챔피언의 고유 키
  name: string; // 챔피언 이름
  title: string; // 챔피언 타이틀
  blurb: string; // 챔피언 설명
  info: {
    attack: number; // 공격력
    defense: number; // 방어력
    magic: number; // 마법력
    difficulty: number; // 난이도
  };
  image: {
    full: string; // 이미지 파일명
    sprite: string; // 스프라이트 파일명
    group: string; // 그룹
    x: number; // 이미지 x좌표
    y: number; // 이미지 y좌표
    w: number; // 너비
    h: number; // 높이
  };
  tags: string[]; // 태그 배열
  partype: string; // 파트 타입
  stats: {
    hp: number; // 체력
    hpperlevel: number; // 레벨당 체력 증가
    mp: number; // 마나
    mpperlevel: number; // 레벨당 마나 증가
    movespeed: number; // 이동 속도
    armor: number; // 방어력
    armorperlevel: number; // 레벨당 방어력 증가
    spellblock: number; // 마법 저항력
    spellblockperlevel: number; // 레벨당 마법 저항력 증가
    attackrange: number; // 공격 범위
    hpregen: number; // 체력 회복
    hpregenperlevel: number; // 레벨당 체력 회복 증가
    mpregen: number; // 마나 회복
    mpregenperlevel: number; // 레벨당 마나 회복 증가
    crit: number; // 치명타 확률
    critperlevel: number; // 레벨당 치명타 확률 증가
    attackdamage: number; // 공격력
    attackdamageperlevel: number; // 레벨당 공격력 증가
    attackspeedperlevel: number; // 레벨당 공격 속도 증가
    attackspeed: number; // 기본 공격 속도
  };
};

// 챔피언 목록을 담는 타입
export type ChampionData = {
  type: string;
  format: string;
  version: string;
  data: {
    [key: string]: Champion; // 챔피언 이름을 키로 갖는 객체
  };
};
