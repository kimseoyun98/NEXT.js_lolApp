'use client';

import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import Image from 'next/image';
import { fetchChampionsDetail, fetchVersions } from '@/utils/serverApi';

const RotationPage = () => {
  const [championsRotation, setChampionsRotation] = useState<number[]>([]);
  const [championsDetailRotation, setChampionsDetailRotation] = useState<any[]>(
    []
  );
  const [error, setError] = useState<string | null>(null);
  const [latestVersion, setLatestVersion] = useState<string | null>(null);

  useEffect(() => {
    const loadVersions = async () => {
      try {
        const fetchedVersions = await fetchVersions(); // 최신 버전 가져오기
        setLatestVersion(fetchedVersions[0]); // 최신 버전 선택
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadVersions();
  }, []);

  useEffect(() => {
    const loadRotations = async () => {
      try {
        const fetchedRotations = await fetch('/api/rotation');

        if (!fetchedRotations.ok) {
          throw new Error('Failed to fetch rotation');
        }
        const fetchedData = await fetchedRotations.json(); // JSON 데이터를 추출
        const freeIds = fetchedData.freeChampionIds; // freeChampionIds 배열에 접근
        setChampionsRotation(freeIds); // 무료 아이디 배열 설정
        setError(null);
      } catch (err: any) {
        console.error('무료 챔피언을 가져오는 데 실패했습니다:', err);
        setError(err.message);
      }
    };

    loadRotations();
  }, []);

  useEffect(() => {
    const loadDetailRotations = async () => {
      if (championsRotation.length > 0) {
        try {
          // 모든 챔피언의 세부 정보를 가져오기 위한 비동기 요청
          const fetchedDetailRotation = await Promise.all(
            championsRotation.map((id) => fetchChampionsDetail(String(id)))
          );

          setChampionsDetailRotation(fetchedDetailRotation);
        } catch (error: any) {
          console.error('Error fetching champion details:', error);
          setError(
            '해당하는 freeIds의 챔피언 세부 정보를 가져오는 중 오류가 발생했습니다.'
          );
        }
      }
    };

    loadDetailRotations();
  }, [championsRotation]); // championsRotation이 변경될 때마다 세부 정보를 가져옵니다.

  return (
    <div>
      <h2 className="flex justify-center m-4">금주 플레이 가능한 챔피언</h2>
      <div className="flex flex-row flex-wrap justify-center">
        {error ? (
          <p>{error}</p>
        ) : championsDetailRotation.length > 0 ? (
          <ul>
            {championsDetailRotation.map((champion) => {
              const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${champion.image.full}`;

              return (
                <li key={champion.id}>
                  <Image
                    height={100}
                    width={100}
                    src={imageUrl}
                    alt={champion.id}
                  />
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
