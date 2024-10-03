"use client";
import { Champion, ChampionData } from "@/types/Champion";
import { ItemData } from "@/types/Item";

export async function fetchVersions(): Promise<string[]> {
  try {
    const res = await fetch(
      "https://ddragon.leagueoflegends.com/api/versions.json",
      {
        method: "GET",
        // next: {
        //   revalidate: 86400,
        // },
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const version = await res.json();
    return version;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchChampions(): Promise<ChampionData> {
  try {
    const versions = await fetchVersions();
    const latestVersion = versions[0];

    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`,
      {
        method: "GET",
        // next: {
        //   revalidate: 86400,
        // },
      }
    );

    if (!res.ok) {
      throw new Error(`챔피언을 찾을 수 없습니다.`);
    }

    const champions = await res.json();
    return champions;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function fetchChampionsDetail(key: string): Promise<Champion> {
  try {
    const versions = await fetchVersions();
    const latestVersion = versions[0];

    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion/${key}.json`,
      {
        method: "GET",
        // next: {
        //   revalidate: 86400,
        // },
      }
    );

    if (!res.ok) {
      `error: ${res.status})`;
    }

    const data = await res.json();
    const championDetail: Champion = data.data[key];

    if (!championDetail) {
      throw new Error(
        `챔피언 ID "${key}"에 해당하는 챔피언을 찾을 수 없습니다.`
      );
    }

    return championDetail;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

// 새로 추가된 아이템 데이터 가져오기 함수
export async function fetchItems(): Promise<ItemData> {
  try {
    const versions = await fetchVersions();
    const latestVersion = versions[0];

    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/item.json`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error(`아이템을 찾을 수 없습니다.`);
    }

    const items = await res.json();
    return items;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
