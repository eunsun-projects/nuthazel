"use client";
import styles from "@/app/work/illustration/page.module.css";
import isMobile from "@/utils/isMobile";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CarouselProvider } from "pure-react-carousel";
import React, { useCallback, useEffect, useRef, useState } from "react";
import IllustCarousel from "./carousel";

interface ModalProps {
  setModal: (modal: boolean) => void;
  illust: FirebaseFirestore.DocumentData[];
}

export default function Modal({ setModal, illust }: ModalProps) {
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
      // console.log('직접이냐?')
      router.push(
        pathname + "?" + createQueryString("num", String(illust.length))
      );
      setCurrIndex(0);
      setModal(true);
    }
  }, []);

  //직접 접속했을때
  useEffect(() => {
    const num = searchParams.get("num");

    if (num) {
      const index = Math.abs(Number(num) - illust.length);
      setCurrIndex(index);
      router.push(pathname + "?" + createQueryString("num", num));
      setModal(true);
    }
  }, [searchParams]);

  // 넘길때마다 주소가 바뀌게..
  useEffect(() => {
    if (currIndex !== null) {
      const index = Math.abs(currIndex - illust.length);
      router.push(pathname + "?" + createQueryString("num", String(index)));
    }
  }, [currIndex]);

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
