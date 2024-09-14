"use client";
import styles from "@/app/work/illustration/page.module.css";
import CarouselLoader from "@/components/carouselloader";
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
import IlluModal from "./illumodal";

interface IllustCarouselProps {
  currIndex: number;
  setCurrIndex: (index: number) => void;
  illust: FirebaseFirestore.DocumentData[];
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

  const handleIlluClick = (item: FirebaseFirestore.DocumentData) => () => {
    setIlluModal(true);
    setSelectedItem(item.imgurl[1]);
    // if(mobile === false){
    //     setIlluModal(true)
    //     setSelectedItem(item.imgurl[1])
    // }
  };

  useEffect(() => {
    function onChange() {
      setCurrIndex(carouselContext.state.currentSlide);
      // setChangedIndex(carouselContext.state.currentSlide);
      // console.log(carouselContext.state.currentSlide)
    }
    carouselContext.subscribe(onChange);
    return () => {
      carouselContext.unsubscribe(onChange);
    };
  }, [carouselContext]);

  useEffect(() => {
    if (currIndex !== null) {
      setSelectedIndex(currIndex);
    }
  }, [currIndex]);

  // 4.7 아래에서 styles.modalimg 여기를 수정해서 썸네일처럼 1:1 비율 만들것
  return (
    <>
      {illuModal && selectedItem && (
        <IlluModal
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
                  src={e.imgurl[0]}
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
