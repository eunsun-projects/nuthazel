import { NutHazelResponse } from "@/app/api/nutget/route";
import { basicMeta } from "@/app/basicmeta";
import Loading from "@/app/loading";
import Config from "@/config/config.export";
import { Suspense } from "react";
import Illust from "./_component/illust";

export const metadata = basicMeta;

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // viewportFit : "cover"
};

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
      const result: NutHazelResponse = await response.json();
      console.log("데이터 수신 성공");

      const toon = result.nuthazelall.filter((e) => {
        return e.category === "illust";
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

export default async function IllustPage() {
  const result = await getData();

  return (
    <Suspense fallback={<Loading />}>
      <Illust illust={result} />
    </Suspense>
  );
}
