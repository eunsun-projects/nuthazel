import { Suspense } from "react";
import { basicMeta, basicViewport } from "../basicmeta";
import Loading from "../loading";
import Main from "./_component/main";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <Main />
    </Suspense>
  );
}
