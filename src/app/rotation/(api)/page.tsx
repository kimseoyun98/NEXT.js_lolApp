'use client';

import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import Image from 'next/image';
import { fetchChampions, fetchVersions } from '@/utils/serverApi';
import { Champion } from '@/types/Champion';

const RotationPage = () => {
  const [championsRotation, setChampionsRotation] = useState<number[]>([]);
  const [championsData, setChampionsData] = useState<{
    [key: string]: Champion;
  }>({});
  const [latestVersion, setLatestVersion] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  console.log('가져온 championsRotation:', championsRotation); // 데이터 확인
  console.log('가져온 championsData:', championsData); // 데이터 확인

  useEffect(() => {
    const loadVersions = async () => {
      try {
        const fetchedVersions = await fetchVersions();
        setLatestVersion(fetchedVersions[0]);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadVersions();
  }, []);

  useEffect(() => {
    const loadRotations = async () => {
      try {
        const res = await fetch('/api/rotation');
        console.log('응답 상태:', res.status); // 응답 상태 확인
        if (!res.ok) {
          throw new Error('네트워크 오류 발생');
        }
        const fetchedRotations = await res.json();
        console.log('가져온 fetchedRotations:', fetchedRotations); // 데이터 확인

        setChampionsRotation(fetchedRotations);
        setError(null);
      } catch (err: any) {
        console.error('오류 발생:', err); // 오류 로그 추가
        setError(err.message);
      }
    };

    loadRotations();
  }, []);

  useEffect(() => {
    const loadChampionsData = async () => {
      if (latestVersion) {
        try {
          const champions = await fetchChampions(); // 챔피언 데이터 가져오기
          console.log('가져온 champion.data 데이터:', champions.data); // 데이터 확인
          setChampionsData(champions.data); // 챔피언 데이터를 상태에 저장
        } catch (error: any) {
          console.error('챔피언 데이터를 가져오는 데 실패했습니다:', error);
          setError('챔피언 데이터를 가져오는 중 오류가 발생했습니다.');
        }
      }
    };

    loadChampionsData();
  }, [latestVersion]);

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
              const champion = championKey ? championsData[championKey] : null; // 챔피언 데이터 가져오기
              if (!champion) return null;
              const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.image.full}`;

              return (
                <li key={champion.id}>
                  <Image
                    height={100}
                    width={100}
                    src={imageUrl}
                    alt={champion.id}
                  />
                  <span>{champion.name}</span>
                  <span>{champion.title}</span>
                </li>
              );
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
