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
      throw Error(`HTTP 오류 발생! 상태: ${res.status} - ${res.statusText}`);
    }
    const data: ChampionsRotation = await res.json();
    console.log('가져온데이터:', data);

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('데이터를 가져오는 중 오류:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
