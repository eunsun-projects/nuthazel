"use client";

import styles from "@/styles/illust.module.css";
import { Illust } from "@/types/NutHazel.type";
import isMobile from "@/utils/isMobile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CarouselProvider } from "pure-react-carousel";
import { useCallback, useEffect, useRef, useState } from "react";
import IllustCarousel from "./illustcarousel";

interface ModalProps {
  setModal: (modal: boolean) => void;
  illust: Illust[];
}

export default function IllustModal({ setModal, illust }: ModalProps) {
  const router = useRouter();
  const pathname = usePathname(); //해당 페이지 url
  const searchParams = useSearchParams(); //쿼리스트링

  const [currIndex, setCurrIndex] = useState<number | null>(null);
  const [mobile, setMobile] = useState<boolean | null>(null);

  const allRef = useRef<HTMLDivElement>(null);
  const xRef = useRef<HTMLDivElement>(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  // console.log(router)
  const handleX = () => {
    setModal(false);
    router.push("/work");
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // console.log(e.target)
    if (e.target === allRef.current || e.target === xRef.current) {
      setModal(false);
      router.push("/work");
    }
  };

  // 모바일인지 판단해서 내려줌
  useEffect(() => {
    if (isMobile()) {
      setMobile(true);
    }
    // 직접 접속 일 경우 처음에 한번만 쿼리스트링 추가
    if (searchParams.size === 0) {
      router.push(
        pathname + "?" + createQueryString("num", String(illust.length))
      );
      setCurrIndex(0);
      setModal(true);
    }
  }, [
    searchParams,
    createQueryString,
    router,
    pathname,
    illust.length,
    setModal,
    setCurrIndex,
  ]);

  //직접 접속했을때
  useEffect(() => {
    const num = searchParams.get("num");

    if (num) {
      // 아래 로직 확인 요망
      const index = Math.abs(Number(num) - illust.length);
      setCurrIndex(index);
      router.push(pathname + "?" + createQueryString("num", num));
      setModal(true);
    }
  }, [
    searchParams,
    createQueryString,
    router,
    pathname,
    illust.length,
    setModal,
    setCurrIndex,
  ]);

  // 넘길때마다 주소가 바뀌게..
  useEffect(() => {
    if (currIndex !== null) {
      const index = Math.abs(currIndex - illust.length);
      router.push(pathname + "?" + createQueryString("num", String(index)));
    }
  }, [currIndex, createQueryString, router, pathname, illust.length]);

  // 4.7 titleimgbox를 xbtn 안에 넣고 position relative 밑 width 넓게, x span 을 width 좁게 하면 어떨까요?
  return (
    <div onClick={handleClick} ref={allRef} className={styles.modalimgbox}>
      <div ref={xRef} className={styles.xbtn}>
        <div className={styles.titleimgbox}>
          <div className={styles.modaltitle}>
            <img
              className={styles.modaltitleimg}
              src="/assets/illust/pot.webp"
              alt="pot"
            ></img>
          </div>
        </div>
        <span onClick={handleX}>X</span>
      </div>

      <div className={styles.carouselprobox}>
        <div className={styles.carouselpro}>
          {
            <CarouselProvider
              naturalSlideHeight={10}
              naturalSlideWidth={10}
              totalSlides={illust.length}
              currentSlide={currIndex ?? 0}
              hasMasterSpinner
              lockOnWindowScroll
              dragEnabled={false}
            >
              <IllustCarousel
                currIndex={currIndex ?? 0}
                setCurrIndex={setCurrIndex}
                illust={illust}
                mobile={mobile ?? false}
              />
            </CarouselProvider>
          }
        </div>
      </div>
    </div>
  );
}
