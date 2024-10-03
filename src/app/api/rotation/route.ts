import { ChampionsRotation } from "@/types/ChampionsRotation";
import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.RIOT_API_KEY;

  if (!apiKey) {
    throw new Error("API 키가 없습니다!");
  }

  try {
    const res = await fetch(
      "https://kr.api.riotgames.com/lol/platform/v3/champion-rotations",
      {
        method: "GET",
        headers: {
          "X-Riot-Token": apiKey,
        },
      }
    );

    console.log("Response status:", res.status);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // API 응답에서 JSON 데이터를 추출
    const data: ChampionsRotation = await res.json();
    console.log("Fetched data:", data);

    // 여기서 data를 직접 반환
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error fetching data:", error.message);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
