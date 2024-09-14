import { basicMeta, basicViewport } from "@/app/basicmeta";
import Goods from "./_component/goods";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function GoodsPage() {
  return <Goods />;
}
