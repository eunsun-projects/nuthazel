import SetScreenSize from "@/components/setscreensize";
import styles from "@/styles/home.module.css";

export default function Loading() {
  return (
    <div>
      <SetScreenSize />
      <div
        className={styles.loader}
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      >
        <div className={styles.loaderimgdiv}>
          <img
            className={styles.loaderimg}
            src="/assets/loading.gif"
            alt="loading"
          ></img>
        </div>
      </div>
    </div>
  );
}
