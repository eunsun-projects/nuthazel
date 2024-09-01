'use client'
import styles from '@/app/goods/page.module.css'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import Loading from '@/app/loading'

const sticker = [
    ['/assets/goods/picnicbag.webp', 'picnicbag'],
    ['/assets/goods/puppy.webp', 'puppy'],
    ['/assets/goods/bam.webp', 'bam'],
    ['/assets/goods/flower.webp', 'flower'],
    ['/assets/goods/mushroom.webp', 'mushroom'],
    ['/assets/goods/seed.webp', 'seed'],
    ['/assets/goods/watermelon.webp', 'watermelon'],
]
const albam = [
    ['/assets/goods/albam1.webp', 'albam1'],
    ['/assets/goods/albam2.webp', 'albam2'],
    ['/assets/goods/albam3.webp', 'albam3'],
]

export default function Goods(){
    const [loadTrace, setLoadTrace] = useState(0);
    const [animate, setAnimate] = useState(true);
    const onStop = () => setAnimate(false);
    const onRun = () => setAnimate(true);

    const handleImgLoaded = () => {
        setLoadTrace(prev => prev + 1);
    }

    return(
        <>
        {loadTrace < sticker.length + albam.length && <Loading/>}
        <div className={styles.page} style={{opacity: loadTrace === sticker.length + albam.length ? '1' : '0' }}>
            <Link href={'https://smartstore.naver.com/nuthazel'} target='blank'>
                <div className={styles.shopdiv} style={{zIndex:'1', cursor:'pointer'}}>
                    <p>ᨎᨎᨎᨎᨎᨎ</p>
                    <div className={styles.door} style={{position:'relative'}}>
                        <Image
                            priority
                            src={'/assets/goods/storedoor.webp'}
                            alt='elements'
                            fill
                            sizes='(max-width: 1920px) 100%, 100%'
                        />
                    </div>
                    <div className={styles.ladybug} style={{position:'absolute'}}>
                        <Image
                            priority
                            src={'/assets/goods/ladybug_.webp'}
                            alt='elements'
                            fill
                            sizes='(max-width: 1920px) 100%, 100%'
                        />
                    </div>
                    <p>Go  To Shop</p>
                    <p>귀엽고 깜찍한 아이템 만나러가기</p>
                    <p>ᨎᨎᨎᨎᨎᨎ</p>
                </div>
            </Link>

            {
                albam.map((e, i)=>{
                    return(
                        <div key={i} className={styles[e[1]]} style={{position:'absolute'}}>
                            <Image
                                priority
                                src={e[0]}
                                alt='elements'
                                fill
                                onLoad={handleImgLoaded}
                                sizes='(max-width: 1920px) 100%, 100%'
                            />
                        </div>
                    )
                })
            }
            <div className={styles.stickerdiv}>
                {
                    sticker.map((e, i)=>{
                        return(
                            <div key={i} className={styles[e[1]]} style={{position:'relative'}}>
                                <Image
                                    priority
                                    src={e[0]}
                                    alt='elements'
                                    fill
                                    onLoad={handleImgLoaded}
                                    sizes='(max-width: 1920px) 100%, 100%'
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div
                className={styles.slideWrapper2}
                onMouseEnter={onStop}
                onMouseLeave={onRun}
            >
                <div className={styles.flowmasking}>
                    <img src='/assets/goods/masking.webp'></img>
                </div>
                <div className={styles.cloneflowmasking}>
                    <img src='/assets/goods/masking.webp'></img>
                </div>
            </div> 
            
            <div className={styles.goodsfooter}>
                <p>©2024.nuthazel</p>
                <Link href={'https://www.instagram.com/bdn._.toon/'} target='_blanc'>
                    <div style={{display:'flex'}}>
                        <div className={styles.cong}>i</div>
                        <div className={styles.cong}>n</div>
                        <div className={styles.cong}>s</div>
                        <div className={styles.cong}>t</div>
                        <div className={styles.cong}>a</div>
                    </div>
                </Link>
            </div>
        </div>
        </>
    )
}

{/* <div 
                className={styles.slideWrapper}
                onMouseEnter={onStop}
                onMouseLeave={onRun}
            >
                <div className={styles.flowmasking2}>
                    <Image
                        priority
                        src={'/assets/flowmasking2.webp'}
                        alt='elements'
                        fill
                        sizes='(max-width: 1920px) 100%, 100%'
                    />
                </div>
                <div className={styles.cloneflowmasking2}>
                    <Image
                        priority
                        src={'/assets/flowmasking2.webp'}
                        alt='elements'
                        fill
                        sizes='(max-width: 1920px) 100%, 100%'
                    />
                </div>
            </div> */}