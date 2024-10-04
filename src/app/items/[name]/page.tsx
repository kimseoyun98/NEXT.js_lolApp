import { Props } from '@/types/Props';
import { fetchItemsDetail, fetchVersions } from '@/utils/serverApi';
import Image from 'next/image';

const ItemPage = async ({ params }: Props) => {
  const itemName = decodeURIComponent(params.name);
  const fetchedItemDetail = await fetchItemsDetail(itemName);
  const fetchedVersions = await fetchVersions();
  const latestVersion = fetchedVersions[0];

  if (!fetchedItemDetail) {
    return <div>아이템을 찾을 수 없습니다.</div>;
  }
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/item/${fetchedItemDetail.image.full}`;

  return (
    <div className="w-screen h-full flex justify-center items-center pt-16">
      <div className="flex flex-col justify-center items-center gap-10">
        <div className="flex flex-row items-center gap-2 text-nowrap">
          <h2>{fetchedItemDetail.name}</h2>
          {'▸'}
          <p>{fetchedItemDetail.gold.base} RP</p>
        </div>
        <Image
          height={100}
          width={100}
          src={imageUrl}
          alt={fetchedItemDetail.name}
        />
        <table className="w-auto mt-4">
          <thead className="bg-gray-800 text-white ">
            <tr>
              <th>스탯</th>
              <th>값</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>태그</td>
              <td>{fetchedItemDetail.tags || 'N/A'}</td>
            </tr>
            <tr>
              <td>요약</td>
              <td>{fetchedItemDetail.plaintext || 'N/A'}</td>
            </tr>
          </tbody>
        </table>
        <div
          dangerouslySetInnerHTML={{
            __html: fetchedItemDetail.description,
          }}
          className="w-[350px] text-center"
        />
      </div>
    </div>
  );
};

export default ItemPage;
