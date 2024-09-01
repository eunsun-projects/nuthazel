import Work from "./_component/work"
import styles from "@/app/work/page.module.css"
import { basicMeta, basicViewport } from "@/app/basicmeta";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function WorkPage(){
    return(
        <div className={styles.page}>
            <Work/>
        </div>
        
    )
}