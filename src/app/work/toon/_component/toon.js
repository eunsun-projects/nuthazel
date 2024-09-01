'use client'
import styles from '@/app/work/toon/page.module.css'
import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Modal from '@/app/work/toon/_component/modal'
import Image from 'next/image'
import Loading from '@/app/loading'
import Pagination from '../../_component/pagination'
import ToonLoading from '@/components/toonloading'
import ToonGridLoading from '@/components/toongridloading'
import findParentArrayIndex from '@/utils/findParentArrayIndex';
import isMobile from '@/utils/isMobile';

const assetimg = [
    /*모빌*/
    ['/assets/toon/background/mobile.webp', 'mobile'],
    /*가랜드*/
    ['/assets/toon/background/galand.webp', 'galand'],
    /*공*/
    ['/assets/toon/background/ball.webp', 'ball'],
    ['/assets/toon/background/ball_shadow.webp', 'ballshadow'],
    /*상어*/
    ['/assets/toon/background/shark.webp', 'shark'],
    ['/assets/toon/background/shark_shadow.webp', 'sharkshadow'],
    /*지구본*/
    ['/assets/toon/background/globe.webp', 'globe'],
    ['/assets/toon/background/globe_shadow.webp', 'globeshadow'],
    /*아이스크림*/
    ['/assets/toon/background/icecream.webp', 'icecream'],
    ['/assets/toon/background/icecream_shadow.webp', 'icecreamshadow'],
    /*사탕*/
    ['/assets/toon/background/candy.webp', 'candy'],
    ['/assets/toon/background/candy_shadow.webp', 'candyshadow'],
    /*마법봉*/
    ['/assets/toon/background/magicstick.webp', 'magicstick'],
    ['/assets/toon/background/magicstick_shadow.webp', 'magicstickshadow'],
    /*하트*/
    ['/assets/toon/background/heart.webp', 'heart'],
    ['/assets/toon/background/heart_shadow.webp', 'heartshadow'],
    /*코끼리*/
    ['/assets/toon/background/ele.webp', 'ele'],
    ['/assets/toon/background/ele_shadow.webp', 'eleshadow'],
    /*기찻길*/
    ['/assets/toon/background/railway.webp', 'railway'],
    ['/assets/toon/background/railway_shadow.webp', 'railwayshadow'],
    /*기차*/
    ['/assets/toon/background/train.webp', 'train'],
]
export default function ToonPage({toon}){
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const totalContents = useMemo(() => {
        const copy = [...toon]
        return Array(Math.ceil(toon.length / 6)).fill().map(() => copy.splice(0, 6))
    }, [toon])

    const [loadTrace, setLoadTrace] = useState(0);
    const [toonCategory, setToonCategory] = useState(totalContents[0]);
    const [showModal, setShowModal] = useState(false);
    const [selectedNum, setSelectedNum] = useState(null);
    const [gridPage, setGridPage] = useState(false);
    const [toonLoad, setToonLoad] = useState(0);
    const [curr, setCurr] = useState(0);
    const [indexing, setIndexing] = useState(0);
    const [queryNum, setQueryNum] = useState(null);

    // const textRef = useRef(null);

    // Get a new searchParams string by merging the current
    // searchParams with a provided key/value pair
    const createQueryString = useCallback((name, value) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);

        return params.toString();
    },[searchParams]);

    const handletoonload = () =>{
        setToonLoad(prev => prev + 1);
    }

    const handleClick = (i) => () => {
        setShowModal(true);
        setSelectedNum(i);
        router.push(toonCategory[i].pageurl);
        // router.push(pathname + '?' + createQueryString('num', String(i)));
    };

    const handleImgLoaded = () => {
        setLoadTrace(prev => prev + 1);
    };

    useEffect(()=>{
        const num = searchParams.get('num');

        if(num){
            setQueryNum(Number(num));

            // index 는 totalContents 에서 최종 아이템을 포함하는 배열의 인덱스임
            const index = findParentArrayIndex(totalContents, Number(num));
            setIndexing(index);
            setToonCategory(totalContents[index]);

            router.push(pathname + '?' + createQueryString('num', Number(num)));

            const innerIndex = totalContents[index].findIndex(e => e.num === Number(num));
            setSelectedNum(innerIndex);

            //toonCategory[selectedNum]
            setShowModal(true);
        }
    },[searchParams]);

    // useEffect(() => {
    //     setToonCategory(totalContents[curr]);
    //     router.replace( pathname );
    // }, [curr])

    useEffect(() => {
        // 쿼리스트링으로 직접 들어오지 않았을때만 수행
        if(searchParams.size === 0){
            setToonCategory(totalContents[indexing]);
            // router.replace( pathname );
        }
    }, [indexing, searchParams])

    useEffect(()=>{

        // 모바일이면 toon 백그라운드 div 에 overflowX hidden, 아니면 overflow hidden
        if(isMobile()){
            const wrapper = document.getElementById('toonbackground');
            if(wrapper) wrapper.style.overflowX = 'hidden';
        }else{
            const wrapper = document.getElementById('toonbackground');
            if(wrapper) wrapper.style.overflow = 'hidden';
        }

        const timer = setTimeout(() => {
            setGridPage(true);
            clearTimeout(timer);
        }, 3000);
    },[])

    return(
        <>
            {loadTrace < assetimg.length && <Loading /> }
            <div 
                className={styles.page} 
                style={{ 
                    opacity : loadTrace === assetimg.length ? "1" : '0',
                    backgroundImage: gridPage ? 'url(/assets/toon/background/poketback.webp)' : 'none',
                    backgroundRepeat: gridPage ? 'repeat' : 'no-repeat',
                }}
            >
                {!gridPage && <ToonLoading />}

                {!gridPage &&
                    assetimg.map((e, i)=>{
                        return(
                            <div key={i} className={styles[e[1]]}>
                                <Image
                                    priority
                                    src={e[0]}
                                    alt='elements'
                                    fill
                                    sizes='(max-width: 1920px) 100%, 100%'
                                    onLoad={handleImgLoaded}
                                />
                            </div>
                        )
                    })
                }
                {(gridPage && toonLoad < toonCategory.length) && <ToonGridLoading />}
                {showModal && <Modal setShowModal={setShowModal} toonCon={toonCategory[selectedNum]}/>}
                {gridPage && (
                    <>
                        <div className={styles.toonbox}>
                            {
                                toonCategory.map((e, i)=>{
                                    return(
                                        <div onClick={handleClick(i)} key={i} className={styles.imgdiv}>
                                            <div className={styles.img}>
                                                <Image
                                                    priority
                                                    src={e.imgurl[0]}
                                                    style={{
                                                        objectFit:'contain', 
                                                        borderRadius:'0',
                                                        visibility: toonLoad === toonCategory.length ? 'visible' : 'hidden'
                                                    }}
                                                    alt='elements'
                                                    fill
                                                    sizes='(max-width: 1920px) 100%, 100%'
                                                    onLoad={handletoonload}
                                                />
                                            </div>
                                        </div>
                                    )
                                })
                            }

                        </div>
                        <Pagination
                            totalPage={toon}
                            limit={6}
                            curr={curr}
                            setCurr={setCurr}
                            setLoad={setToonLoad}
                            indexing={indexing}
                            setIndexing={setIndexing}
                        />
                    </>
                )}
            </div>
        </>
    )
}