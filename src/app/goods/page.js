import Goods from "./_component/goods"
import { basicMeta, basicViewport } from "@/app/basicmeta";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function GoodsPage(){
    return(
        <Goods/>
    )
}