import { Suspense } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import Image from 'next/image';
import Link from 'next/link';
import { fetchChampions, fetchVersions } from '@/utils/serverApi';
import GlobalError from '@/app/GlobalError';

async function getChampionsData() {
  const [fetchedVersions, fetchedChampions] = await Promise.all([
    fetchVersions(),
    fetchChampions(),
  ]);

  return { versions: fetchedVersions, champions: fetchedChampions.data };
}

export default async function ChampionListPage() {
  try {
    const { versions, champions } = await getChampionsData();
    const latestVersion = versions[0];

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <div className="mt-[160px]">
          <h2 className="flex justify-center mb-8">챔피언 목록</h2>
          <div className="flex flex-row flex-wrap justify-center">
            {Object.keys(champions).length > 0 && latestVersion ? (
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
              <p>챔피언을 찾을 수 없습니다.</p>
            )}
          </div>
        </div>
      </Suspense>
    );
  } catch (error) {
    return <GlobalError error={error as Error} />;
  }
}
