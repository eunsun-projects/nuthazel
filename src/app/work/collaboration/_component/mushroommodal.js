'use client'
import Script from "next/script"
import styles from '@/app/work/collaboration/page.module.css'
import { useState, useRef } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Link from "next/link"

export default function MushroomModal({ setModalOpen }){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const contentsRef = useRef();
    const xRef = useRef();

    const handlex = () => {
        setModalOpen(false);
        router.replace( pathname );
    }
    const handleClick = (e) => {
        if(e.target === contentsRef.current || e.target === xRef.current){
            setModalOpen(false);
            router.replace( pathname );
        }
    }
    return(
        <>
            <Script type="module" src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js" crossOrigin="anonymous" strategy="lazyOnload"></Script>

            <dialog onClick={handleClick} className={styles.mushroommodalbox}>
                <div ref={xRef} className={styles.xbtn}>
                    <span onClick={handlex} >X</span>
                </div>
                <div ref={contentsRef} className={styles.modalconbox}>
                    <div className={styles.modalcontents}>
                        <div className={styles.contents}>
                            <div className={styles.modalcontitle}>
                                <img className={styles.modalflower} src='/assets/collabo/flower1.webp' alt="flower1"></img>
                                <p>collabo with screenxyz</p>
                                <img className={styles.modalflower} src='/assets/collabo/flower1.webp' alt="flower2"></img>
                            </div>

                            <div className={styles.modalcondesc}>
                                <p style={{whiteSpace:'pre-line', textAlign:'center',paddingBottom:'1rem'}}>{`넡헤이즐 숲속에 등장한 버섯돌이\n버섯돌이의 정체는?`}</p>
                                <Link href={'https://www.instagram.com/screenxyz/'} target="_blank" style={{color:'limegreen'}}>
                                    <p>{`ミ✩ 인스타그램 바로가기 ミ✩`}</p>
                                </Link>
                            </div>

                            <div className={styles.mushroommodalconimgbox}>
                                <div className={styles.mushroombox}>
                                    <model-viewer 
                                        class={styles.mushroomdec} 
                                        src={"/assets/glb/mushroom_join.glb"} 
                                        poster="/assets/glb/mushroom.webp" 
                                        camera-controls 
                                        auto-rotate 
                                        shadow-intensity="1"
                                        camera-orbit="90deg 90deg 30m"
                                    ></model-viewer>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </dialog>
        </>
    )
}