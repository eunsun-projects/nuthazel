import { NutHazelResponse } from "@/app/api/nutget/route";
import { basicMeta, basicViewport } from "@/app/basicmeta";
import Loading from "@/app/loading";
import ToonPage from "@/app/work/toon/_component/toon";
import Config from "@/config/config.export";
import { Suspense } from "react";

export const metadata = basicMeta;
export const viewport = basicViewport;

export async function getData() {
  try {
    const req = {
      method: "GET",
      cache: "no-store", //매번 새로 데이터 받아오기
      headers: {
        // 'Content-Type' : 'application/json',
        Authorization: `Bearer ${process.env.POST_TOKEN}`,
      },
      // body: JSON.stringify({action: "data please"})
    };

    const response = await fetch(
      `${Config().baseUrl}/api/nutget`,
      req as RequestInit
    );

    if (response.ok) {
      const result: NutHazelResponse = await response.json(); //응답 body를 .json(풀어헤쳐서) result에 담아라.
      console.log("데이터 수신 성공");

      const toon = result.nuthazelall.filter((e) => {
        return e.category === "toon";
      });

      return toon;
    } else {
      console.log("데이터 수신 실패", response.statusText);
      return [];
    }
  } catch (error) {
    console.log(error);
  }
}
export default async function Toon() {
  const result = await getData();

  return (
    <Suspense fallback={<Loading />}>
      <ToonPage toon={result} />
    </Suspense>
  );
}
