import styles from "@/styles/collabo.module.css";

export default function CollabLoading() {
  return (
    <div className={styles.collabloadbox}>
      <img
        className={styles.loadstar1}
        src="/assets/contact/star.webp"
        alt="star"
      ></img>
      <img
        className={styles.loadstar2}
        src="/assets/contact/star.webp"
        alt="star"
      ></img>
    </div>
  );
}
