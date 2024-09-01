'use client'
import styles from '@/app/work/illustration/page.module.css'
import {CarouselProvider} from 'pure-react-carousel'
import React, { useRef, useState, useCallback, useEffect, useContext } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import IllustCarousel from './carousel';
import isMobile from '@/utils/isMobile';

export default function Modal({setModal, illust}){
    const router = useRouter();
    const pathname = usePathname(); //해당 페이지 url
    const searchParams = useSearchParams(); //쿼리스트링

    const [currIndex, setCurrIndex] = useState(null);
    const [mobile, setMobile] = useState(null);

    const allRef = useRef();
    const xRef = useRef();

    const createQueryString = useCallback((name, value) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
    
        return params.toString();
    },[searchParams]);

    // console.log(router)
    const handleX = () => {
        setModal(false);
        router.push('/work')
    }
    const handleClick = (e) => {
        // console.log(e.target)
        if(e.target === allRef.current || e.target === xRef.current){
            setModal(false);
            router.push('/work')
        }
    }

    // 모바일인지 판단해서 내려줌
    useEffect(()=>{
        if(isMobile()){
            setMobile(true);
        }
        // 직접 접속 일 경우 처음에 한번만 쿼리스트링 추가
        if(searchParams.size === 0){
            // console.log('직접이냐?')
            router.push(pathname + '?' + createQueryString('num', String(illust.length)));
            setCurrIndex(0);
            setModal(true);
        }
    },[])

    //직접 접속했을때
    useEffect(()=>{
        const num = searchParams.get('num');

        if(num){
            const index = Math.abs(Number(num) - illust.length);
            setCurrIndex(index);
            router.push(pathname + '?' + createQueryString('num', num));
            setModal(true);
        }
    },[searchParams]);

    // 넘길때마다 주소가 바뀌게..
    useEffect(()=>{
        if(currIndex !== null){
            const index = Math.abs(currIndex - illust.length)
            router.push(pathname + '?' + createQueryString('num', String(index)));
        }
    },[currIndex])


    // 4.7 titleimgbox를 xbtn 안에 넣고 position relative 밑 width 넓게, x span 을 width 좁게 하면 어떨까요?
    return(
        <div onClick={handleClick} ref={allRef} className={styles.modalimgbox}>

            <div ref={xRef} className={styles.xbtn}>
                <div className={styles.titleimgbox}>
                    <div className={styles.modaltitle}>
                        <img 
                            className={styles.modaltitleimg}
                            src='/assets/illust/pot.webp'
                            alt='pot'
                        ></img>
                    </div>
                </div>
                <span onClick={handleX}>X</span>
            </div>

            

            <div className={styles.carouselprobox}>
                <div className={styles.carouselpro}>
                    {
                        (
                            <CarouselProvider
                                naturalSlideHeight={10}
                                naturalSlideWidth={10}
                                totalSlides={illust.length}
                                currentSlide={currIndex}
                                hasMasterSpinner
                                lockOnWindowScroll
                                dragEnabled={false}
                            >
                                <IllustCarousel currIndex={currIndex} setCurrIndex={setCurrIndex} illust={illust} mobile={mobile} />
                            </CarouselProvider>
                        )
                    }
                </div>
            </div>

        </div>
    )
}

{/* <CarouselProvider
    naturalSlideHeight={10}
    naturalSlideWidth={10}
    totalSlides={3}
    currentSlide={currIndex}
    hasMasterSpinner
>
    <div className={styles.sliderbox}>
        <Slider>
            {
                img.map((e, i)=>{
                    return(
                        <Slide key={i} index={i}>
                            <Image className={styles.modalimg} src={e}></Image>
                        </Slide>
                    )
                })
            }
            
        </Slider>
        <div className={styles.btn}>
            <ButtonFirst className={styles.button}>{`<<`}</ButtonFirst>
            <div className={styles.midbtn}>
                <ButtonBack className={styles.backnext}>{`<`}</ButtonBack>
                <p className={styles.midtitle}>title</p>
                <ButtonNext className={styles.backnext}>{`>`}</ButtonNext>
            </div>
            <ButtonLast className={styles.button}>{`>>`}</ButtonLast>
        </div>
    </div>
</CarouselProvider> */}