import styles from "@/app/page.module.css";

export default function CarouselLoader() {
  return (
    <div className={styles.carouselloaderbox}>
      <img
        className={styles.carouselloaderimg}
        src="/assets/loading.gif"
        alt="loading"
      ></img>
    </div>
  );
}
