"use client";

import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import Image from "next/image";
import Link from "next/link";
import { Champion } from "@/types/Champion";
import { fetchChampions, fetchVersions } from "@/utils/serverApi";

const ChampionList = () => {
  const [champions, setChampions] = useState<{ [key: string]: Champion }>({});
  const [error, setError] = useState<string | null>(null);
  const [latestVersion, setLatestVersion] = useState<string>("");

  useEffect(() => {
    const loadVersions = async () => {
      try {
        const versions = await fetchVersions(); // 버전 가져오기
        setLatestVersion(versions[0]); // 최신 버전 설정
      } catch (err: any) {
        console.error("버전을 가져오는 데 실패했습니다:", err);
        setError(err.message);
      }
    };

    const loadChampions = async () => {
      try {
        const fetchedChampions = await fetchChampions(); // 챔피언 가져오기
        setChampions(fetchedChampions.data); // 챔피언 리스트를 data에서 가져옴
      } catch (err: any) {
        console.error("챔피언 정보를 가져오는 데 실패했습니다:", err);
        setError(err.message); // 에러 메시지 상태 업데이트
      }
    };

    loadVersions(); // useEffect 안에서 비동기 호출
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
            const championDetail = champions[championKey]; // champions[championKey]로 챔피언 데이터에 접근
            const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${latestVersion}/img/champion/${championDetail.image.full}`;

            return (
              <Link
                key={championDetail.id}
                href={`/champions/${championDetail.id}`}
                className="common-box"
              >
                <div className="flex flex-col gap-3 items-center justify-center text-center">
                  <Image
                    height={100}
                    width={100}
                    src={imageUrl}
                    alt={championDetail.image.full}
                  />
                  <div>
                    <h3>{championDetail.name}</h3>
                    <p>{championDetail.title}</p>
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

export default ChampionList;
