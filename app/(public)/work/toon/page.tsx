import { basicMeta, basicViewport } from "@/app/basicmeta";
import ToonTemplate from "./_component/toontemplate";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default async function Toon() {
  return <ToonTemplate />;
}
