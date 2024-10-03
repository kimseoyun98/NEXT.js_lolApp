"use client";

import Image from "next/image";
import { Props } from "@/types/Props";
import { fetchChampionsDetail, fetchVersions } from "@/utils/serverApi"; // 데이터 가져오기

async function ChampionPage({ params }: Props) {
  const championDetail = await fetchChampionsDetail(params.key); // 특정 챔피언 데이터 불러오기
  const versions = await fetchVersions(); // 최신 버전 가져오기
  const latestVersion = versions[0]; // 최신 버전 선택

  // 챔피언을 찾지 못한 경우의 처리
  if (!championDetail) {
    return <div>챔피언을 찾을 수 없습니다.</div>; // 오류 메시지 또는 대체 UI
  }
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${championDetail.image.full}`;

  return (
    <div className="w-screen h-full flex justify-center items-center pt-16">
      <div className="flex flex-row items-center gap-10">
        <div>
          <Image
            height={200}
            width={200}
            src={`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${championDetail.image.full}`}
            alt={championDetail.name}
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
                <td>{championDetail.info?.attack || "N/A"}</td>
              </tr>
              <tr>
                <td>방어력</td>
                <td>{championDetail.info?.defense || "N/A"}</td>
              </tr>
              <tr>
                <td>마법력</td>
                <td>{championDetail.info?.magic || "N/A"}</td>
              </tr>
              <tr>
                <td>난이도</td>
                <td>{championDetail.info?.difficulty || "N/A"}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="flex flex-col justify-start gap-4">
          <div className="flex flex-row items-center gap-2 text-nowrap">
            <h2>{championDetail.name}</h2>
            {"▸"}
            <p>{championDetail.title}</p>
          </div>
          <main className="text-left w-[300px]">{championDetail.blurb}</main>
        </div>
      </div>
    </div>
  );
}
export default ChampionPage;
