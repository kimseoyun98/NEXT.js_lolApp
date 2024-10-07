import { ChampionsRotation } from '@/types/ChampionsRotation';
import { NextResponse } from 'next/server';

export async function GET(): Promise<
  NextResponse<ChampionsRotation | { message: string }>
> {
  const apiKey = process.env.RIOT_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { message: 'API 키가 없습니다!' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      'https://kr.api.riotgames.com/lol/platform/v3/champion-rotations',
      {
        method: 'GET',
        headers: {
          'X-Riot-Token': apiKey,
        },
      }
    );

    if (!res.ok) {
      throw Error(`${res.status} - ${res.statusText}`);
    }
    const data = await res.json();
    const freeIds: ChampionsRotation = data.freeChampionIds;
    console.log('가져온데이터:', freeIds);

    return NextResponse.json(freeIds);
  } catch (error) {
    console.error('에러:', error);
    return NextResponse.json({ message: '500' }, { status: 500 });
  }
}
