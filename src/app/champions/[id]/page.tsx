import Image from 'next/image';
import { Props } from '@/types/Props';
import { fetchChampionsDetail, fetchVersions } from '@/utils/serverApi';
import {
  getChampionSplashArtUrl01,
  getChampionSplashArtUrl02,
  getChampionSplashArtUrl03,
} from '@/utils/championUtils';

const ChampionPage = async ({ params }: Props) => {
  const fetchedChampionDetail = await fetchChampionsDetail(params.id);
  const fetchedVersions = await fetchVersions();
  const latestVersion = fetchedVersions[0];

  if (!fetchedChampionDetail) {
    return <div>챔피언을 찾을 수 없습니다.</div>;
  }
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${fetchedChampionDetail.image.full}`;
  const splashArtUrl01 = getChampionSplashArtUrl01(fetchedChampionDetail.id);
  const splashArtUrl02 = getChampionSplashArtUrl02(fetchedChampionDetail.id);
  const splashArtUrl03 = getChampionSplashArtUrl03(fetchedChampionDetail.id);

  return (
    <div className="w-screen h-full flex flex-col items-center p-40">
      <div className="flex flex-row items-center gap-10">
        <div>
          <Image
            height={200}
            width={200}
            src={imageUrl}
            alt={fetchedChampionDetail.name}
          />
          <table className="w-[200px] mt-4">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th>스탯</th>
                <th>값</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>공격력</td>
                <td>{fetchedChampionDetail.info?.attack || 'N/A'}</td>
              </tr>
              <tr>
                <td>방어력</td>
                <td>{fetchedChampionDetail.info?.defense || 'N/A'}</td>
              </tr>
              <tr>
                <td>마법력</td>
                <td>{fetchedChampionDetail.info?.magic || 'N/A'}</td>
              </tr>
              <tr>
                <td>난이도</td>
                <td>{fetchedChampionDetail.info?.difficulty || 'N/A'}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col justify-start gap-4">
          <div className="flex flex-row items-center gap-2 text-nowrap">
            <h2>{fetchedChampionDetail.name}</h2>
            {'▸'}
            <p>{fetchedChampionDetail.title}</p>
          </div>
          <p className="text-left w-[300px]">{fetchedChampionDetail.blurb}</p>
        </div>
      </div>
      <div className="p-40 mb-[-400px]">
        <h3 className="text-center">{fetchedChampionDetail.name} 컨셉아트</h3>
        <div className="mt-10">
          <div key={fetchedChampionDetail.id} className="mb-10">
            <img
              src={splashArtUrl01}
              alt={fetchedChampionDetail.name}
              className="w-120 h-auto mx-auto"
            />
          </div>
          <div key={fetchedChampionDetail.id} className="mb-10">
            <img
              src={splashArtUrl02}
              alt={fetchedChampionDetail.name}
              className="w-120 h-auto mx-auto"
            />
          </div>
          <div key={fetchedChampionDetail.id}>
            <img
              src={splashArtUrl03}
              alt={fetchedChampionDetail.name}
              className="w-120 h-auto mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export async function generateMetadata({ params }: Props) {
  const fetchedChampionsDetail = await fetchChampionsDetail(params.id);

  return {
    title: fetchedChampionsDetail
      ? fetchedChampionsDetail.name
      : '챔피언 페이지',
    description: fetchedChampionsDetail
      ? fetchedChampionsDetail.id
      : '챔피언 정보를 가져올 수 없습니다.',
    openGraph: {
      title: fetchedChampionsDetail
        ? fetchedChampionsDetail.name
        : '챔피언 페이지',
      description: fetchedChampionsDetail
        ? fetchedChampionsDetail.id
        : '챔피언 정보를 가져올 수 없습니다.',
      images: [
        fetchedChampionsDetail
          ? `https://ddragon.leagueoflegends.com/cdn/img/item/${fetchedChampionsDetail.image.full}`
          : null,
      ],
    },
  };
}
export default ChampionPage;
