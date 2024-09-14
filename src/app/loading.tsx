import styles from "@/app/page.module.css";
import SetScreenSize from "@/components/setscreensize";

export default function Loading() {
  return (
    <div>
      <SetScreenSize />
      <div
        className={styles.loader}
        style={{ height: "calc(var(--vh, 1vh) * 100)" }}
      >
        <div className={styles.loaderimgdiv}>
          <img className={styles.loaderimg} src="/assets/loading.gif"></img>
        </div>
      </div>
    </div>
  );
}
