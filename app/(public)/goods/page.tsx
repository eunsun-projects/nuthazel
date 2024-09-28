import { basicMeta, basicViewport } from "@/app/basicmeta";
import GoodsTemplate from "./_component/goodstemplate";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function GoodsPage() {
  return <GoodsTemplate />;
}
