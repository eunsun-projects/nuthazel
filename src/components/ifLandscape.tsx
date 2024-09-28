"use client";

import styles from "@/styles/home.module.css";
import isMobile from "@/utils/isMobile";
import { useEffect, useState } from "react";

export default function IfLandscape() {
  const [land, setland] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const mobileLandscape = () => {
        //모바일이고, 세로, 가로 상관없이 너비 < 1000 이면 true 리턴. 아니면 false리턴.
        if (isMobile() && window.innerWidth < 1000) {
          return true;
        } else {
          return false;
        }
      };
      //1. 모바일이고, 세로일때는 false
      //2. 모바일이고, 가로일때 true
      //3. 두 개 다 아니면 false
      if (
        mobileLandscape() &&
        window.matchMedia("(orientation: portrait)").matches
      ) {
        setland(false);
      } else if (
        mobileLandscape() &&
        window.matchMedia("(orientation: landscape)").matches
      ) {
        setland(true);
      } else {
        setland(false);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {land && (
        <div className={styles.nutlandscape}>
          <p>◐◐</p>
          <p>looks good in portrait mode</p>
          <p>세로모드에서 잘 보여요!</p>
        </div>
      )}
    </>
  );
}
