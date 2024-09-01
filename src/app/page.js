// import Image from 'next/image'
import { Suspense } from "react"
import Loading from "./loading"
import Main from "./_component/main"
import { basicMeta, basicViewport } from "./basicmeta";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function Home() {
  return (
    <Suspense fallback={<Loading/>}>
      <Main/>
    </Suspense>
    )
}
