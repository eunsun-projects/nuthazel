"use client";

import CarouselLoader from "@/components/carouselloader";
import styles from "@/styles/illust.module.css";
import { Illust } from "@/types/NutHazel.type";
import {
  ButtonBack,
  ButtonFirst,
  ButtonLast,
  ButtonNext,
  CarouselContext,
  Image,
  Slide,
  Slider,
} from "pure-react-carousel";
import { useContext, useEffect, useState } from "react";
import CloseUpModal from "./closeupmodal";

interface IllustCarouselProps {
  currIndex: number;
  setCurrIndex: (index: number) => void;
  illust: Illust[];
  mobile: boolean;
}

export default function IllustCarousel({
  currIndex,
  setCurrIndex,
  illust,
  mobile,
}: IllustCarouselProps) {
  const [illuModal, setIlluModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  // const [changedIndex, setChangedIndex] = useState(Math.abs(currIndex - illust.length))
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const carouselContext = useContext(CarouselContext);
  // console.log(selectedItem)

  const handleIlluClick = (item: Illust) => () => {
    if (!item.imgurl) return;
    setIlluModal(true);
    setSelectedItem(item.imgurl[1]);
  };

  useEffect(() => {
    function onChange() {
      setCurrIndex(carouselContext.state.currentSlide);
    }
    carouselContext.subscribe(onChange);
    return () => {
      carouselContext.unsubscribe(onChange);
    };
  }, [carouselContext, setCurrIndex]);

  useEffect(() => {
    if (currIndex !== null) {
      setSelectedIndex(currIndex);
    }
  }, [currIndex]);

  return (
    <>
      {illuModal && selectedItem && (
        <CloseUpModal
          setIlluModal={setIlluModal}
          selectedItem={selectedItem}
          setCurrIndex={setCurrIndex}
          mobile={mobile}
        />
      )}
      <div className={styles.sliderbox}>
        <Slider
          spinner={() => <CarouselLoader />}
          moveThreshold={0.1}
          horizontalPixelThreshold={15}
        >
          {illust.map((e, i) => {
            return (
              <Slide key={i} index={i}>
                <Image
                  className={styles.modalimg}
                  hasMasterSpinner
                  src={e?.imgurl?.[0] ?? "/assets/loading.gif"}
                  onClick={handleIlluClick(e)}
                  alt="illust"
                ></Image>
              </Slide>
            );
          })}
        </Slider>
        <div className={styles.btn}>
          <ButtonFirst className={styles.button}>{`<<`}</ButtonFirst>
          <div className={styles.midbtn}>
            <ButtonBack className={styles.backnext}>{`<`}</ButtonBack>
            {selectedIndex !== null && (
              <p className={styles.midtitle}>{illust[selectedIndex].title}</p>
            )}
            <ButtonNext className={styles.backnext}>{`>`}</ButtonNext>
          </div>
          <ButtonLast className={styles.button}>{`>>`}</ButtonLast>
        </div>
      </div>
    </>
  );
}
