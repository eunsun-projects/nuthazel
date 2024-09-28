"use client";

import CarouselLoader from "@/components/carouselloader";
import styles from "@/styles/toon.module.css";
import { usePathname, useRouter } from "next/navigation";
import {
  CarouselProvider,
  DotGroup,
  Image,
  Slide,
  Slider,
} from "pure-react-carousel";

interface ModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  toonCon: {
    imgurl?: string[];
  };
}

//selectedNum, toon
export default function Modal({ setShowModal, toonCon }: ModalProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (
      target.classList.contains("carousel__image") ||
      target.classList.contains("carousel__dot") ||
      target.classList.contains("carousel__slider-tray")
    ) {
      setShowModal(true);
    } else {
      setShowModal(false);
      router.replace(pathname);
    }
  };

  return (
    <div className={styles.modalimgbox} onClick={handleClick}>
      <div className={styles.carouselpro}>
        <CarouselProvider
          naturalSlideHeight={10}
          naturalSlideWidth={10}
          totalSlides={
            toonCon.imgurl && toonCon.imgurl.length ? toonCon.imgurl.length : 0
          }
          hasMasterSpinner
          lockOnWindowScroll
          dragEnabled={false}
        >
          <div className={styles.sliderbox}>
            <Slider
              spinner={() => <CarouselLoader />}
              moveThreshold={0.1}
              horizontalPixelThreshold={15}
            >
              {toonCon &&
                toonCon.imgurl &&
                toonCon.imgurl.map((e, i) => {
                  return (
                    <Slide key={i} index={i}>
                      <Image
                        className={styles.modalimg}
                        hasMasterSpinner
                        src={e}
                        alt="toon"
                      />
                    </Slide>
                  );
                })}
            </Slider>
          </div>
          <DotGroup className={styles.dotgroup} />
        </CarouselProvider>
      </div>
    </div>
  );
}
