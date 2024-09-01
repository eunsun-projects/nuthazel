"use client"
import React, { useContext, useEffect, useState } from "react";
import { Slide, Slider, Image, ButtonLast, ButtonFirst, ButtonBack, ButtonNext, CarouselContext } from 'pure-react-carousel'
import styles from '@/app/work/illustration/page.module.css'
import IlluModal from "./illumodal";
import CarouselLoader from "@/components/carouselloader";

export default function IllustCarousel ({currIndex, setCurrIndex, illust, mobile}) {
    const [illuModal, setIlluModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    // const [changedIndex, setChangedIndex] = useState(Math.abs(currIndex - illust.length))
    const [selectedIndex, setSelectedIndex] = useState(null);

    const carouselContext = useContext(CarouselContext);
    // console.log(selectedItem)

    const handleIlluClick = (item) => () => {
        setIlluModal(true)
        setSelectedItem(item.imgurl[1])
        // if(mobile === false){
        //     setIlluModal(true)
        //     setSelectedItem(item.imgurl[1])
        // }
    }

    useEffect(()=>{
        function onChange () {
            setCurrIndex(carouselContext.state.currentSlide);
            // setChangedIndex(carouselContext.state.currentSlide);
            // console.log(carouselContext.state.currentSlide)
        }
        carouselContext.subscribe(onChange);
        return () => {
            carouselContext.unsubscribe(onChange);
        }
    },[carouselContext]);

    useEffect(() => {
        if(currIndex !== null) {
            setSelectedIndex(currIndex);
        }
    }, [currIndex])

    // 4.7 아래에서 styles.modalimg 여기를 수정해서 썸네일처럼 1:1 비율 만들것
    return(
        <>
            {illuModal && selectedItem && <IlluModal setIlluModal={setIlluModal} selectedItem={selectedItem} setCurrIndex={setCurrIndex} mobile={mobile} />}
            <div className={styles.sliderbox}>
                <Slider
                    spinner={()=><CarouselLoader/>}
                    moveThreshold={0.1}
                    horizontalPixelThreshold={15}
                >
                    {
                        illust.map((e, i)=>{
                            return(
                                <Slide key={i} index={i}>
                                    <Image 
                                        className={styles.modalimg}
                                        src={e.imgurl[0]}
                                        onClick={handleIlluClick(e)}
                                        alt="illust"
                                        sizes='(max-width: 1920px) 100%, 100%'
                                    ></Image>
                                </Slide>
                            )
                        })
                    }
                    
                </Slider>
                <div className={styles.btn}>
                    <ButtonFirst className={styles.button}>{`<<`}</ButtonFirst>
                    <div className={styles.midbtn}>
                        <ButtonBack className={styles.backnext}>{`<`}</ButtonBack>
                        {selectedIndex !== null && <p className={styles.midtitle}>{illust[selectedIndex].title}</p>}
                        <ButtonNext className={styles.backnext}>{`>`}</ButtonNext>
                    </div>
                    <ButtonLast className={styles.button}>{`>>`}</ButtonLast>
                </div>
            </div>
        </>
    )
}

// export default WithStore(IllustCarousel, state => ({
//     // these are read only properties.  we use the "deepFreeze"
//     // npm package to make these properties immutable. You don't have to use
//     // all of these, just pick the ones you need.
//     currentSlide: state.currentSlide,
//     disableAnimation: state.disableAnimation,
//     hasMasterSpinner: state.hasMasterSpinner,
//     imageErrorCount: state.imageErrorCount,
//     imageSuccessCount: state.imageSuccessCount,
//     lockOnWindowScroll: state.lockOnWindowScroll,
//     masterSpinnerThreshold: state.masterSpinnerThreshold,
//     naturalSlideHeight: state.naturalSlideHeight,
//     naturalSlideWidth: state.naturalSlideWidth,
//     orientation: state.orientation,
//     slideSize: state.slideSize,
//     slideTraySize: state.slideTraySize,
//     step: state.step,
//     dragStep: state.dragStep,
//     totalSlides: state.totalSlides,
//     touchEnabled: state.touchEnabled,
//     dragEnabled: state.dragEnabled,
//     visibleSlides: state.visibleSlides,
// }));