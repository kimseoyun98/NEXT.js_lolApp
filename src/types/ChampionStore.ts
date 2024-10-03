import { Champion } from "@/types/Champion";

export type ChampionStore = {
  champions: Champion[]; // 챔피언 배열
  latestVersion: string;
  error: string | null;
  setChampions: (champions: Champion[]) => void; // 챔피언 설정 함수
  setLatestVersion: (version: string) => void; // 버전 설정 함수
  setError: (error: string | null) => void; // 에러 설정 함수
};
