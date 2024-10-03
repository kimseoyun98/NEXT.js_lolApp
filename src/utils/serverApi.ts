import { Champion, ChampionData } from '@/types/Champion';
import { Item, ItemData } from '@/types/Item';

export async function fetchVersions(): Promise<string[]> {
  try {
    const res = await fetch(
      'https://ddragon.leagueoflegends.com/api/versions.json',
      {
        method: 'GET',
        // next: {
        //   revalidate: 86400,
        // },
      }
    );

    if (!res.ok) {
      throw Error(`HTTP error! status: ${res.status}`);
    }

    const versions = await res.json();
    return versions;
  } catch (error: any) {
    throw Error(error.message);
  }
}

export async function fetchChampions(): Promise<ChampionData> {
  try {
    const fetchedversions = await fetchVersions();
    const latestVersion = fetchedversions[0];

    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion.json`,
      {
        method: 'GET',
        // next: {
        //   revalidate: 86400,
        // },
      }
    );

    if (!res.ok) {
      throw Error(`챔피언을 찾을 수 없습니다.`);
    }

    const champions = await res.json();
    return champions;
  } catch (error: any) {
    throw Error(error.message);
  }
}

export async function fetchChampionsDetail(key: string): Promise<Champion> {
  try {
    const fetchedversions = await fetchVersions();
    const latestVersion = fetchedversions[0];

    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/champion/${key}.json`,
      {
        method: 'GET',
        // next: {
        //   revalidate: 86400,
        // },
      }
    );

    if (!res.ok) {
      `error: ${res.status})`;
    }

    const data = await res.json();
    const championsDetail: Champion = data.data[key];

    if (!championsDetail) {
      throw Error(`챔피언 ID "${key}"에 해당하는 챔피언을 찾을 수 없습니다.`);
    }

    return championsDetail;
  } catch (error: any) {
    throw Error(error.message);
  }
}

export async function fetchItems(): Promise<ItemData> {
  try {
    const fetchedversions = await fetchVersions();
    const latestVersion = fetchedversions[0];

    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/item.json`,
      {
        method: 'GET',
        // next: {
        //   revalidate: 86400,
        // },
      }
    );

    if (!res.ok) {
      throw Error(`아이템을 찾을 수 없습니다.`);
    }

    const items = await res.json();
    return items;
  } catch (error: any) {
    throw Error(error.message);
  }
}

export async function fetchItemsDetail(key: string): Promise<Item> {
  try {
    const fetchedversions = await fetchVersions();
    const latestVersion = fetchedversions[0];

    const res = await fetch(
      `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/item/${key}.json`,
      {
        method: 'GET',
        // next: {
        //   revalidate: 86400,
        // },
      }
    );

    if (!res.ok) {
      `error: ${res.status})`;
    }

    const data = await res.json();
    const itemsDetail: Item = data.data[key];

    if (!itemsDetail) {
      throw Error(`아이템 "${key}"에 해당하는 챔피언을 찾을 수 없습니다.`);
    }

    return itemsDetail;
  } catch (error: any) {
    throw Error(error.message);
  }
}
