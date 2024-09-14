import styles from "@/app/work/collaboration/page.module.css";

export default function CollabLoading() {
  return (
    <div className={styles.collabloadbox}>
      <img className={styles.loadstar1} src="/assets/contact/star.webp"></img>
      <img className={styles.loadstar2} src="/assets/contact/star.webp"></img>
    </div>
  );
}
