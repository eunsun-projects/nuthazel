"use client";
import styles from "@/app/about/page.module.css";
import Loading from "@/app/loading";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const fullText = `새로운  무언가를 시작하기 전에,
    ‘잘할 수 있을까?’ 걱정이 앞선다면
    
    무엇이든 시작할 수 있는 용기를 주는
    달콤한 헤이즐넛 밀크를 마셔보자.
    
    어린아이를 돌보며, 
    다시 나의 일을 할 수 있을까 고민했었던 
    일러스트레이터 헤이즐씨처럼!`;

export default function AboutPage() {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [contactLoad, setContactLoad] = useState(0);

  const handleLoad = () => {
    setContactLoad((prev) => prev + 1);
  };

  useEffect(() => {
    if (index < fullText.length) {
      setTimeout(() => {
        setText((prev) => prev + fullText.charAt(index));
        setIndex(index + 1);
      }, 50); // 타이핑 속도 조절
    }
  }, [index]);

  return (
    <>
      {contactLoad < 1 && <Loading />}
      <div
        className={styles.page}
        style={{ opacity: contactLoad === 1 ? "1" : "0" }}
      >
        <div className={styles.fullbox}>
          <div className={styles.ipadbox}>
            <div className={styles.nutimgbox}>
              <Image
                priority
                src="/assets/about/about_1.webp"
                alt="elements"
                fill
                onLoad={handleLoad}
                sizes="(max-width: 1920px) 100%, 100%"
              />
            </div>

            <div className={styles.text}>
              <p>{text}</p>
            </div>
          </div>
        </div>
        <div className={styles.aboutfooter}>
          <p>©2024.nuthazel</p>
          <Link href={"https://www.instagram.com/bdn._.toon/"} target="_blanc">
            <div style={{ display: "flex" }}>
              <div className={styles.cong}>i</div>
              <div className={styles.cong}>n</div>
              <div className={styles.cong}>s</div>
              <div className={styles.cong}>t</div>
              <div className={styles.cong}>a</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
