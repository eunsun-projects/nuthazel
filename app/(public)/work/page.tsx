import { basicMeta, basicViewport } from "@/app/basicmeta";
import styles from "@/styles/work.module.css";
import Work from "./_component/work";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function WorkPage() {
  return (
    <div className={styles.page}>
      <Work />
    </div>
  );
}
