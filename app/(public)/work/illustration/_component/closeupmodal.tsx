"use client";

import styles from "@/styles/illust.module.css";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ZoomInOut from "./zoomInOut";

interface IlluModalProps {
  setIlluModal: (modal: boolean) => void;
  selectedItem: string;
  setCurrIndex: (index: number) => void;
  mobile: boolean;
}

export default function CloseUpModal({
  setIlluModal,
  selectedItem,
  setCurrIndex,
  mobile,
}: IlluModalProps) {
  const searchParams = useSearchParams(); //쿼리스트링

  const [size, setSize] = useState<string | null>(null);

  const handleClick = () => {
    setIlluModal(false);
  };

  useEffect(() => {
    const handlePop = () => {
      const num = searchParams.get("num");
      setCurrIndex(Number(num));
      setIlluModal(false);
    };

    window.addEventListener("popstate", handlePop);

    return () => {
      window.removeEventListener("popstate", handlePop);
    };
  }, [searchParams, setCurrIndex, setIlluModal]);

  useEffect(() => {
    const image = new Image();
    image.src = selectedItem;
    image.onload = function () {
      const width = image.width;
      const height = image.height;
      // console.log(width, height)
      // console.log(selectedItem);
      //너비 > 세로 너비 80, 세로 auto wide
      //너비 = 세로와 너비 50, 세로 auto square
      //너비 < 세로 너비 auto, 세로 100 narrow
      if (width > height) {
        setSize("wide");
      } else if (width === height) {
        setSize("square");
      } else {
        setSize("narrow");
      }
    };
  }, [selectedItem]);

  return (
    <>
      <dialog onClick={handleClick} className={styles.bigimgbox}>
        <p>손가락으로 이미지를 확대하여 자세히 보실 수 있습니다.</p>
        <div className={styles.bigmodaldiv}>
          {size === "wide" && (
            <div className={styles.zoominoutbox}>
              <ZoomInOut imgSrc={selectedItem} size={size} mobile={mobile} />
            </div>
          )}
          {size === "square" && (
            <div className={styles.zoominoutbox2}>
              <ZoomInOut imgSrc={selectedItem} size={size} mobile={mobile} />
            </div>
          )}
          {size === "narrow" && (
            <div className={styles.zoominoutbox3}>
              <ZoomInOut imgSrc={selectedItem} size={size} mobile={mobile} />
            </div>
          )}
        </div>
      </dialog>
    </>
  );
}
