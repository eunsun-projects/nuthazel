import { basicMeta, basicViewport } from "@/app/basicmeta";
import styles from "@/styles/work.module.css";
import WorkTemplate from "./_component/worktemplate";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function WorkPage() {
  // 감싸는 div 수정 요망
  return (
    <div className={styles.page}>
      <WorkTemplate />
    </div>
  );
}
