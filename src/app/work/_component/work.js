'use client'
import styles from '@/app/work/page.module.css'
import Image from 'next/image'
import { useEffect, useRef, useState, createRef } from 'react'
import Link from 'next/link'
import Loading from '@/app/loading';

const assetimg = [
    //창문
    ['/assets/work/window_shadow.webp','windowshadow'],
    ['/assets/work/window.webp','window'],
    //주방도구
    ['/assets/work/kitchentools_shadow.webp','kitchentoolsshadow'],
    ['/assets/work/kitchentools.webp','kitchentools'],
    //테이블
    ['/assets/work/tableshadow.webp', 'tableshadow'],
    ['/assets/work/table.webp', 'table'],
    //장작
    ['/assets/work/firewood_shadow.webp', 'firewoodshadow'],
    ['/assets/work/firewood.webp', 'firewood'],
    //절구
    ['/assets/work/mortar_shadow.webp','mortarshadow'],
    ['/assets/work/mortar.webp','mortar'],
     //클릭액자
    ['/assets/work/clickframe_shadow.webp', 'clickframeshadow', '/work/collaboration'],
    ['/assets/work/clickframe.webp', 'clickframe', '/work/collaboration'],
    //메모지
    ['/assets/work/memo_shadow.webp', 'memoshadow'],
    ['/assets/work/memo.webp', 'memo'],
    //팟
    ['/assets/work/pot_shadow.webp','potshadow', '/work/illustration'],
    ['/assets/work/pot_rock.webp','potrock', '/work/illustration'],
    ['/assets/work/pot2.webp','pot', '/work/illustration'],
    ['/assets/work/pot_fire.webp','potfire', '/work/illustration'],
    //보자기
    ['/assets/work/poket_shadow.webp', 'poketshadow', '/work/toon'],
    ['/assets/work/poket.webp', 'poket', '/work/toon'],
    //컵
    ['/assets/work/cup_shadow.webp','cupshadow'],
    ['/assets/work/cup.webp','cup'],
    // 바스켓
    ['/assets/work/nutbasket_shadow.webp', 'nutbasketshadow'],
    ['/assets/work/nutbasket.webp', 'nutbasket'],
    // 도마
    ['/assets/work/cuttingboard_shadow.webp', 'cuttingboardshadow'],
    ['/assets/work/cuttingboard.webp', 'cuttingboard'],
    //팬
    ['/assets/work/pan_shadow.webp', 'panshadow'],
    ['/assets/work/pan.webp', 'pan'],
    //촛불
    ['/assets/work/torch_shadow.webp', 'torchshadow'],
    ['/assets/work/torch.webp', 'torch'],
    //액자0
    ['/assets/work/frame0_shadow.webp', 'frame0shadow'],
    ['/assets/work/frame0.webp', 'frame0'],
    //초록,액자2
    ['/assets/work/frame2_shadow.webp', 'frame2shadow'],
    ['/assets/work/frame2.webp', 'frame2'],
    //액자1
    ['/assets/work/frame1_shadow.webp', 'frame1shadow'],
    ['/assets/work/frame1.webp', 'frame1'],
    //액자3
    ['/assets/work/frame3_shadow.webp', 'frame3shadow'],
    ['/assets/work/frame3.webp', 'frame3'],
    //스툴
    ['/assets/work/stool_shadow.webp','stoolshadow'],
    ['/assets/work/stool.webp','stool']
]

const potsmoke = [
    //연기
    ['/assets/work/pot_smoke1.webp','potsmoke1', '/work/illustration'],
    ['/assets/work/pot_smoke2.webp','potsmoke2', '/work/illustration'],
    ['/assets/work/pot_smoke3.webp','potsmoke3', '/work/illustration'],
    ['/assets/work/pot_smoke4.webp','potsmoke4', '/work/illustration']
]
const menu = [
    {
        title: 'illustration',
        url: '/work/illustration'
    },
    {
        title: 'toon',
        url: '/work/toon'
    },
    {
        title: 'collaboration',
        url: '/work/collaboration'
    }
]

export default function Work(){
    const [bubble, setBubble] = useState(false);
    const [loadTrace, setLoadTrace] = useState(0);
    const [smoke, setSmoke] = useState(0);

    const smokeRefs = useRef(potsmoke.map(() => createRef()));
    const timerRef = useRef(null);
    const timerRef2 = useRef(null);
    const timerRef3 = useRef(null);

    const fadeInDelay = 500; // 각 div의 페이드인 애니메이션 간격
    const fadeOutDelay = 2000; // 모든 이미지가 나타난 후 다시 숨기기 전까지의 시간


    const handleImgLoaded = () => {
        setLoadTrace(prev => prev + 1);
    }

    const runAnimation = () => {
        smokeRefs.current.forEach((ref, index) => {
            timerRef.current = setTimeout(() => {
                // 이미지 페이드인
                if(!ref.current) return;
                ref.current.style.opacity = 1;
        
                // 마지막 이미지가 나타난 후 모든 이미지를 숨기고, 애니메이션 재시작
                if (index === potsmoke.length - 1) {
                    timerRef2.current = setTimeout(() => {
                        smokeRefs.current.forEach(ref => {
                            ref.current.style.opacity = 0;
                        });
                    }, fadeOutDelay);
                    timerRef3.current = setTimeout(() => {
                        // 첫 번째 이미지부터 다시 애니메이션 시작
                        setSmoke(1);
                    }, fadeOutDelay + 2000)
                }
            }, fadeInDelay * index); // 각 이미지가 나타나는 시간을 순차적으로 지연

        });
    };

    useEffect(()=>{

        setTimeout(() => {
            setBubble(true)
        }, 1200);

        runAnimation(); // 첫 로드 시 애니메이션 시작

        return () => {
            clearTimeout(timerRef.current)
            clearTimeout(timerRef2.current)
            clearTimeout(timerRef3.current)
        }
    },[])

    useEffect(() => {
        if(smoke === 1){
            setSmoke(0);
            runAnimation();
        }
    }, [smoke])

    return(

        <>
            {loadTrace < assetimg.length + potsmoke.length && <Loading />}
            <div className={styles.page} style={{opacity: loadTrace === assetimg.length + potsmoke.length ? "1" : "0"}}>
                {
                    assetimg.map((e, i)=>{
                        return(
                            <div key={i} className={styles[e[1]]} style={{position:'absolute'}}>
                                {
                                    e[2] ? (
                                        <Link href={e[2]} style={{position:'relative', width:'100%',height:'100%', display:'block'}} prefetch={false}>
                                            <Image
                                                priority
                                                src={e[0]}
                                                alt='elements'
                                                fill
                                                onLoad={handleImgLoaded}
                                                sizes='(max-width: 1920px) 100%, 100%'
                                            >
                                            </Image>
                                        </Link>
                                    ) : (
                                        <Image
                                                priority
                                                src={e[0]}
                                                alt='elements'
                                                fill
                                                onLoad={handleImgLoaded}
                                                sizes='(max-width: 1920px) 100%, 100%'
                                            >
                                        </Image>
                                    )
                                }
                            </div>
                        )
                    })
                }

                {
                    potsmoke.map((e, i)=>{
                        return(
                            <div key={i} className={styles[e[1]]} ref={smokeRefs.current[i]} style={{position:'absolute'}}>
                                <Link href={e[2]} style={{position:'relative', width:'100%',height:'100%', display:'block'}}>
                                    <Image
                                        priority
                                        src={e[0]}
                                        alt='elements'
                                        fill
                                        onLoad={handleImgLoaded}
                                        sizes='(max-width: 1920px) 100%, 100%'
                                    >
                                    </Image>
                                </Link>
                            </div>
                        )
                    })
                }

                {bubble && 
                    menu.map((e, i) => {
                        return(
                            <Link key={i} href={e.url}>
                                <div className={`${styles.bubblebox} ${styles[e.title]}`} style={{position:'absolute'}}>
                                    <div className={styles.bubble}>
                                        <div className={styles.bubblecong}></div>
                                        <div className={styles.bubblecong}></div>
                                        <div className={styles.bubblecong}></div>
                                        <p>{e.title}</p>
                                    </div>
                                </div>
                            </Link>
                        )
                })}
            </div>
        </>
    )
}

// {e.title.split('').map((char, charIndex)=>{
//     return(
//         <span className={styles.titlename} key={charIndex}>{char}</span>
//     )
// })}