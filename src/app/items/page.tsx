import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchItems, fetchVersions } from '@/utils/serverApi';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import GlobalError from '@/app/GlobalError';

async function getItemsData() {
  try {
    const [fetchedVersions, fetchedItems] = await Promise.all([
      fetchVersions(),
      fetchItems(),
    ]);

    return { versions: fetchedVersions, items: fetchedItems.data };
  } catch (error) {
    throw new Error('데이터를 불러오는 중 오류가 발생했습니다.');
  }
}

export default async function ItemListPage() {
  try {
    const { versions, items } = await getItemsData();
    const latestVersion = versions[0];

    return (
      <Suspense fallback={<LoadingSpinner />}>
        <div className="mt-[160px]">
          <h2 className="flex justify-center text-center mb-8">아이템 목록</h2>
          <div className="flex flex-row flex-wrap justify-center">
            {Object.keys(items).length > 0 && latestVersion ? (
              Object.keys(items).map((itemKey) => {
                const itemListDetail = items[itemKey];
                const itemImageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/item/${itemListDetail.image.full}`;

                return (
                  <div>
                    <Link
                      href={`/items/${itemListDetail.name}`}
                      className="common-box"
                    >
                      <div className="flex flex-col gap-3 items-center justify-center text-center">
                        <Image
                          height={100}
                          width={100}
                          src={itemImageUrl}
                          alt={itemListDetail.name}
                        />
                        <div>
                          <h3 className="line-clamp-1">
                            {itemListDetail.name}
                          </h3>
                          <p className="line-clamp-1">
                            {`${itemListDetail.gold.base} RP`}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })
            ) : (
              <p>아이템을 찾을 수 없습니다.</p>
            )}
          </div>
        </div>
      </Suspense>
    );
  } catch (error) {
    return <GlobalError error={error as Error} />;
  }
}
