'use client';

import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import Image from 'next/image';
import { fetchItems, fetchVersions } from '@/utils/serverApi';
import Link from 'next/link';

const ItemListPage = () => {
  const [items, setItems] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [latestVersion, setLatestVersion] = useState<string>('');

  useEffect(() => {
    const loadVersions = async () => {
      try {
        const fetchedVersions = await fetchVersions();
        setLatestVersion(fetchedVersions[0]);
        setError(null);
      } catch (err: any) {
        // console.error('버전을 가져오는 데 실패했습니다:', err);
        setError(err.message);
      }
    };

    const loadItems = async () => {
      try {
        const fetchedItems = await fetchItems();
        setItems(fetchedItems.data);
        setError(null);
      } catch (err: any) {
        // console.error('아이템 정보를 가져오는 데 실패했습니다:', err);
        setError(err.message);
      }
    };

    loadVersions();
    loadItems();
  }, []);

  return (
    <div>
      <h2 className="flex justify-center m-4">아이템 목록</h2>
      <div className="flex flex-row flex-wrap justify-center">
        {error ? (
          <p>{error}</p>
        ) : Object.keys(items).length > 0 && latestVersion ? (
          Object.keys(items).map((itemKey) => {
            const itemListDetail = items[itemKey];
            const itemImageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/item/${itemListDetail.image.full}`;

            return (
              <div key={itemListDetail.id}>
                <Link
                  key={itemListDetail.name}
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
                      <h3 className="line-clamp-1">{itemListDetail.name}</h3>
                      <p className="line-clamp-1">{`${itemListDetail.gold.base} RP`}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
};

export default ItemListPage;
