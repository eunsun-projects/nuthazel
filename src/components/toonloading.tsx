"use client";

import styles from "@/styles/toon.module.css";

export default function ToonLoading() {
  return (
    <div className={styles.balldiv}>
      <img
        className={styles.ballimg}
        src="/assets/toon/background/toon_ani.gif"
        alt="loader"
      ></img>
    </div>
  );
}
