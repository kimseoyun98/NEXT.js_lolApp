"use client";

// import { useEffect, useState } from "react";
// import { LoadingSpinner } from "@/components/LoadingSpinner";
// import Image from "next/image";
// import { Champion } from "@/types/Champion";

// const RotationPage = () => {
//   const [championsRotation, setChampionsRotation] = useState<number[]>([]);
//   const [championsDetail, setChampionsDetail] = useState<
//     Champion[] | undefined
//   >(undefined);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch("/api/rotation"); // API 엔드포인트 호출
//         const freeIds = await response.json();

//         setChampionsRotation(freeIds.freeChampionIds); // 챔피언 ID 설정
//         setError(null);
//       } catch (error: any) {
//         setError(error.message);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       if (championsRotation.length > 0) {
//         try {
//           // 모든 챔피언의 세부 정보를 가져오기 위한 비동기 요청
//           const freeIdsDetails = await Promise.all(
//             championsRotation.map((championId) =>
//               fetchChampionsDetail(championId.toString())
//             )
//           );
//           setChampionsDetail(freeIdsDetails); // 배열로 설정
//         } catch (error) {
//           setError(
//             "해당하는 freeIds의 챔피언 세부 정보를 가져오는 중 오류가 발생했습니다."
//           );
//         }
//       }
//     };

//     fetchDetails();
//   }, [championsRotation]); // championsRotation이 변경될 때마다 세부 정보를 가져옵니다.

//   return (
//     <div>
//       <h2 className="flex justify-center m-4">금주 플레이 가능한 챔피언</h2>
//       <div className="flex flex-row flex-wrap justify-center">
//         {error ? (
//           <p>{error}</p>
//         ) : championsDetail && championsDetail.length > 0 ? (
//           <ul>
//             {Object.keys(championsDetail).map((champion) => {
//               const imageUrl = `https://ddragon.leagueoflegends.com/cdn/${champion.version}/img/champion/${champion.image.full}`;

//               return (
//                 <li key={champion.id}>
//                   <Image
//                     height={100}
//                     width={100}
//                     src={imageUrl}
//                     alt={champion.id}
//                   />
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <LoadingSpinner />
//         )}
//       </div>
//     </div>
//   );
// };

// export default RotationPage;

export default function RotationPage() {
  return (
    <div>
      <h1>Rotation Page</h1>
    </div>
  );
}
