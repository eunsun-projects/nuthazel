"use client";

import styles from "@/styles/goods.module.css";
import Image from "next/image";
import Link from "next/link";

const stickers = [
  ["/assets/goods/picnicbag.webp", "picnicbag"],
  ["/assets/goods/puppy.webp", "puppy"],
  ["/assets/goods/bam.webp", "bam"],
  ["/assets/goods/flower.webp", "flower"],
  ["/assets/goods/mushroom.webp", "mushroom"],
  ["/assets/goods/seed.webp", "seed"],
  ["/assets/goods/watermelon.webp", "watermelon"],
];
const albams = [
  ["/assets/goods/albam1.webp", "albam1"],
  ["/assets/goods/albam2.webp", "albam2"],
  ["/assets/goods/albam3.webp", "albam3"],
];

export default function GoodsTemplate() {
  return (
    <>
      <div className={styles.page}>
        <Link href={"https://smartstore.naver.com/nuthazel"} target="blank">
          <div
            className={styles.shopdiv}
            style={{ zIndex: "1", cursor: "pointer" }}
          >
            <p>ᨎᨎᨎᨎᨎᨎ</p>
            <div className={styles.door} style={{ position: "relative" }}>
              <Image
                priority
                src={"/assets/goods/storedoor.webp"}
                alt="elements"
                fill
                unoptimized
                sizes="(max-width: 1920px) 100%, 100%"
              />
            </div>
            <div className={styles.ladybug} style={{ position: "absolute" }}>
              <Image
                priority
                src={"/assets/goods/ladybug_.webp"}
                alt="elements"
                fill
                unoptimized
                sizes="(max-width: 1920px) 100%, 100%"
              />
            </div>
            <p>Go To Shop</p>
            <p>귀엽고 깜찍한 아이템 만나러가기</p>
            <p>ᨎᨎᨎᨎᨎᨎ</p>
          </div>
        </Link>

        {albams.map((albam, idx) => {
          return (
            <div
              key={idx}
              className={styles[albam[1]]}
              style={{ position: "absolute" }}
            >
              <Image
                priority
                src={albam[0]}
                alt="elements"
                fill
                // unoptimized
                // onLoad={handleImgLoaded}
                sizes="(max-width: 1920px) 100%, 100%"
              />
            </div>
          );
        })}
        <div className={styles.stickerdiv}>
          {stickers.map((sticker, idx) => {
            return (
              <div
                key={idx}
                className={styles[sticker[1]]}
                style={{ position: "relative" }}
              >
                <Image
                  priority
                  src={sticker[0]}
                  alt="elements"
                  fill
                  unoptimized
                  // onLoad={handleImgLoaded}
                  sizes="(max-width: 1920px) 100%, 100%"
                />
              </div>
            );
          })}
        </div>
        <div
          className={styles.slideWrapper2}
          // onMouseEnter={onStop}
          // onMouseLeave={onRun}
        >
          <div className={styles.flowmasking}>
            <img src="/assets/goods/masking.webp" alt="masking" />
          </div>
          <div className={styles.cloneflowmasking}>
            <img src="/assets/goods/masking.webp" alt="masking" />
          </div>
        </div>

        <div className={styles.goodsfooter}>
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
