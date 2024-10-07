'use client';

import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import Image from 'next/image';
import { fetchItems, fetchVersions } from '@/utils/serverApi';
import Link from 'next/link';
import { Item } from '@/types/Item';

const ItemListPage = () => {
  const [items, setItems] = useState<{ [key: string]: Item }>({});
  const [error, setError] = useState<string | null>(null);
  const [latestVersion, setLatestVersion] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        const [fetchedVersions, fetchedItems] = await Promise.all([
          fetchVersions(),
          fetchItems(),
        ]);
        setLatestVersion(fetchedVersions[0]);
        setItems(fetchedItems.data);
        setError(null);
      } catch (err: any) {
        setError(err?.message);
      }
    };

    loadData();
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
              <div key={itemListDetail.name}>
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
