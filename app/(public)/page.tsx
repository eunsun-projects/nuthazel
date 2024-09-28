import MainTemplate from "@/app/(public)/_component/maintemplate";
import Loading from "@/app/loading";
import { Suspense } from "react";
import { basicMeta, basicViewport } from "../basicmeta";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <MainTemplate />
    </Suspense>
  );
}
