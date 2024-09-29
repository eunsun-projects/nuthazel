"use client";

import Loading from "@/app/loading";
import styles from "@/styles/contact.module.css";
import isMobile from "@/utils/isMobile";
import Image from "next/image";
import { useEffect, useState } from "react";
import EmailForm from "./email";

const assetstar = [
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
  {},
];
const assetimg = [
  /*왼쪽나무4*/
  ["/assets/contact/left_tree4_shadow.webp", "leftshadow4"],
  ["/assets/contact/left_tree4.webp", "left4"],
  /*왼쪽나무4*/
  ["/assets/contact/right_tree4_shadow.webp", "rightshadow4"],
  ["/assets/contact/right_tree4.webp", "right4"],
  /*오른쪽나무3*/
  ["/assets/contact/right_tree3_shadow.webp", "rightshadow3"],
  ["/assets/contact/right_tree3.webp", "right3"],
  /*왼쪽나무3*/
  ["/assets/contact/left_tree3_shadow.webp", "leftshadow3"],
  ["/assets/contact/left_tree3.webp", "left3"],
  /*왼쪽나무2*/
  ["/assets/contact/left_tree2_shadow.webp", "leftshadow2"],
  ["/assets/contact/left_tree2.webp", "left2"],
  /*오른쪽나무2*/
  ["/assets/contact/right_tree2_shadow.webp", "rightshadow2"],
  ["/assets/contact/right_tree2.webp", "right2"],
  /*오른쪽나무1*/
  ["/assets/contact/right_tree1_shadow.webp", "rightshadow1"],
  ["/assets/contact/right_tree1.webp", "right1"],
  /*왼쪽나무1*/
  ["/assets/contact/left_tree1_shadow.webp", "leftshadow1"],
  ["/assets/contact/left_tree1.webp", "left1"],
  /*밤꽃*/
  ["/assets/contact/bam1.webp", "bam1"],
  ["/assets/contact/bam2.webp", "bam2"],
  ["/assets/contact/bam3.webp", "bam3"],
];
const postbox = [
  ["/assets/contact/postboxshadow.webp", "postboxshadow"],
  ["/assets/contact/postbox.gif", "postbox"],
];
const cloudimg = [
  ["/assets/main/mid_cloud.webp", "midcloud"],
  ["/assets/main/small_cloud_copy.webp", "smallcloudcopy"],
  ["/assets/main/small_cloud.webp", "smallcloud"],
  ["/assets/main/mid_cloud_copy.webp", "midcloudcopy"],
];

export default function ContactTemplate() {
  const [loadTrace, setLoadTrace] = useState(0);
  const [gif, setGif] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [xy, setXy] = useState<{ x: number; y: number }[]>([]);

  const handleImgLoaded = () => {
    setLoadTrace((prev) => prev + 1);
  };

  useEffect(() => {
    if (isMobile()) {
      setMobile(true);
    }

    const ensureWithinBounds = (value: number, max: number) => {
      return Math.max(0, Math.min(value, max));
    };

    const getRandomPosition = () => {
      let x = Math.random() * window.innerWidth;
      let y = Math.random() * window.innerHeight;

      x = ensureWithinBounds(Math.round(x), window.innerWidth);
      y = ensureWithinBounds(Math.round(y), window.innerHeight);

      return { x, y };
    };

    const generatePositions = (count: number) => {
      const positions = [];
      for (let i = 0; i < count; i++) {
        let newPos = getRandomPosition();
        positions.push(newPos);
      }
      return positions;
    };
    const reduced = generatePositions(assetstar.length);

    setXy(reduced);

    // console.log(copy)
  }, []);

  return (
    <>
      {loadTrace < assetimg.length + assetstar.length + postbox.length + cloudimg.length && <Loading />}
      <div
        className={styles.page}
        style={{
          opacity:
            loadTrace === assetimg.length + assetstar.length + postbox.length + +cloudimg.length
              ? "1"
              : "0",
        }}
      >
        <EmailForm gif={gif} setGif={setGif} mobile={mobile} />
        {xy.length === assetstar.length &&
          assetstar.map((e, i) => {
            return (
              <div
                key={i}
                className={styles.star}
                style={{
                  left: `${xy[i].x}px`, // x 좌표를 스타일에 적용
                  top: `${xy[i].y}px`, // y 좌표를 스타일에 적용
                }}
              >
                <Image
                  priority
                  src={"/assets/contact/star.webp"}
                  alt="elements"
                  fill
                  unoptimized
                  onLoad={handleImgLoaded}
                  sizes="(max-width: 1920px) 100%, 100%"
                />
              </div>
            );
          })}
        {cloudimg.map((e, i) => {
          return (
            <div key={i} className={styles[e[1]]} style={{ position: "absolute" }}>
              <Image
                priority
                src={e[0]}
                alt="elements"
                fill
                onLoad={handleImgLoaded}
                sizes="(max-width: 1920px) 100%, 100%"
                unoptimized
              />
            </div>
          );
        })}
        {assetimg.map((e, i) => {
          return (
            <div key={i} className={styles[e[1]]}>
              <Image
                priority
                src={e[0]}
                alt="elements"
                fill
                onLoad={handleImgLoaded}
                sizes="(max-width: 1920px) 100%, 100%"
                unoptimized
              />
            </div>
          );
        })}
        {postbox.map((e, i) => {
          return (
            <div key={i} className={styles[e[1]]} style={{ opacity: gif ? "1" : "0" }}>
              <Image
                priority
                src={e[0]}
                alt="elements"
                fill
                onLoad={handleImgLoaded}
                sizes="(max-width: 1920px) 100%, 100%"
                unoptimized
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
