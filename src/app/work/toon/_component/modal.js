'use client'
import styles from '@/app/work/toon/page.module.css'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, DotGroup, Image } from 'pure-react-carousel'
import { useEffect, useState, useCallback } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import CarouselLoader from '@/components/carouselloader'

//selectedNum, toon
export default function Modal({setShowModal, toonCon}){

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // const [toonCon, setToonCon] = useState(null);

    // useEffect(()=>{
    //     if(typeof selectedNum === "number"){
    //         // console.log(typeof selectedNum)
    //         setToonCon(toon[selectedNum])
    //     }
    // },[selectedNum]);

    const handleClick = (e) => {
        // console.log(e.target.classList)
        if(e.target.classList.contains('carousel__image') || e.target.classList.contains('carousel__dot') || e.target.classList.contains('carousel__slider-tray') ){
            setShowModal(true);
        }else{
            setShowModal(false);
            router.replace( pathname );
        }
    };

    return(
        <div className={styles.modalimgbox} onClick={handleClick}>

            <div className={styles.carouselpro}>
                <CarouselProvider
                    naturalSlideHeight={10}
                    naturalSlideWidth={10}
                    totalSlides={toonCon && toonCon.imgurl.length}
                    hasMasterSpinner
                    lockOnWindowScroll
                    dragEnabled={false}
                >
                    <div className={styles.sliderbox}>
                    <Slider
                        spinner={()=><CarouselLoader/>}
                        moveThreshold={0.1}
                        horizontalPixelThreshold={15}
                    >
                        {
                            toonCon && toonCon.imgurl.map((e, i)=>{
                                return(
                                    <Slide key={i} index={i}>
                                        <Image className={styles.modalimg} src={e} alt='toon'></Image>
                                    </Slide>
                                )
                            })
                        }
                    </Slider>
                    </div>
                    <DotGroup className={styles.dotgroup}/>
                </CarouselProvider>
            </div>
        </div>
    )
}