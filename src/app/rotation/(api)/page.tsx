'use client';

import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { fetchChampions } from '@/utils/serverApi';
import { Champion } from '@/types/Champion';
import { getChampionSplashArtUrl } from '@/utils/championUtils';
import { ChampionSlider } from '@/components/ChampionRotationSlider';

const RotationPage = () => {
  const [championsRotation, setChampionsRotation] = useState<number[]>([]);
  const [championsData, setChampionsData] = useState<{
    [key: string]: Champion;
  }>({});
  const [error, setError] = useState<string | null>(null);
  // console.log('가져온 championsRotation:', championsRotation);
  // console.log('가져온 championsData:', championsData);

  useEffect(() => {
    const loadRotations = async () => {
      try {
        const res = await fetch('/api/rotation');

        if (!res.ok) {
          throw new Error('네트워크 오류 발생');
        }
        const fetchedRotations = await res.json();
        // console.log('가져온 fetchedRotations:', fetchedRotations);

        setChampionsRotation(fetchedRotations);
        setError(null);
      } catch (err: any) {
        console.error('오류 발생:', err);
        setError(err.message);
      }
    };

    loadRotations();
  }, []);

  useEffect(() => {
    const loadChampionsData = async () => {
      try {
        const champions = await fetchChampions();
        console.log('가져온 champion.data 데이터:', champions.data);
        setChampionsData(champions.data);
      } catch (error: any) {
        console.error('챔피언 데이터를 가져오는 데 실패했습니다:', error);
        setError('챔피언 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    };

    loadChampionsData();
  }, []);

  return (
    <div>
      <h2 className="flex justify-center m-4">금주 플레이 가능한 챔피언</h2>
      <div className="flex flex-row flex-wrap justify-center">
        {error ? (
          <p>{error}</p>
        ) : championsData && championsRotation.length > 0 ? (
          <ul>
            {championsRotation.map((id) => {
              const championKey = Object.keys(championsData).find(
                (key) => championsData[key].key === id.toString()
              );
              const champion = championKey ? championsData[championKey] : null;
              if (!champion) return null;
              const splashArtUrl = getChampionSplashArtUrl(champion.id);

              return <ChampionSlider images={[splashArtUrl]} />;
            })}
          </ul>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default RotationPage;
