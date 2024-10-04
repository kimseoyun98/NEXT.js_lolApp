'use client';

import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import Image from 'next/image';
import Link from 'next/link';
import { Champion } from '@/types/Champion';
import { fetchChampions, fetchVersions } from '@/utils/serverApi';

const ChampionListPage = () => {
  const [champions, setChampions] = useState<{ [key: string]: Champion }>({});
  const [error, setError] = useState<string | null>(null);
  const [latestVersion, setLatestVersion] = useState<string>('');

  useEffect(() => {
    const loadVersions = async () => {
      try {
        const fetchedVersions = await fetchVersions();
        setLatestVersion(fetchedVersions[0]);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      }
    };

    const loadChampions = async () => {
      try {
        const fetchedChampions = await fetchChampions();
        setChampions(fetchedChampions.data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      }
    };

    loadVersions();
    loadChampions();
  }, []);

  return (
    <div>
      <h2 className="flex justify-center m-4">챔피언 목록</h2>
      <div className="flex flex-row flex-wrap justify-center">
        {error ? (
          <p>{error}</p>
        ) : Object.keys(champions).length > 0 && latestVersion ? (
          Object.keys(champions).map((championKey) => {
            const championList = champions[championKey];
            const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${championList.image.full}`;

            return (
              <Link
                key={championList.id}
                href={`/champions/${championList.id}`}
                className="common-box"
              >
                <div className="flex flex-col gap-3 items-center justify-center text-center">
                  <Image
                    height={100}
                    width={100}
                    src={imageUrl}
                    alt={championList.image.full}
                  />
                  <div>
                    <h3 className="line-clamp-1">{championList.name}</h3>
                    <p className="line-clamp-1">{championList.title}</p>
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default ChampionListPage;
