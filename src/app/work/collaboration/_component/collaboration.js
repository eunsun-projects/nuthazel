"use client"
import styles from '@/app/work/collaboration/page.module.css';
import Image from 'next/image';
import { useEffect, useState, useCallback, useMemo, use } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import Loading from '@/app/loading';
import Modal from './modal';
import Link from 'next/link';
import Pagination from '../../_component/pagination';
import CollabLoading from '@/components/collabloading';
import CanvasComp from '@/components/mushroom/canvas';
import findParentArrayIndex from '@/utils/findParentArrayIndex';

const assetimg = [
    ['/assets/collabo/frame1.webp','frame1'],
    ['/assets/collabo/frame2.webp','frame2'],
    ['/assets/collabo/frame3.webp','frame3'],
    ['/assets/collabo/frame4.webp','frame4'],
    ['/assets/collabo/frame5.webp','frame5'],
    ['/assets/collabo/frame6.webp','frame6'],
    ['/assets/collabo/frame1_shadow.webp','frame1shadow'],
    ['/assets/collabo/frame2_shadow.webp','frame2shadow'],
    ['/assets/collabo/frame3_shadow.webp','frame3shadow'],
    ['/assets/collabo/frame4_shadow.webp','frame4shadow'],
    ['/assets/collabo/frame5_shadow.webp','frame5shadow'],
    ['/assets/collabo/frame6_shadow.webp','frame6shadow'],
    ['/assets/collabo/flower0.webp','flower0'],
    ['/assets/collabo/flower1.webp','flower1'],
    ['/assets/collabo/flower2.webp','flower2'],
    ['/assets/collabo/flower3.webp','flower3'],
    ['/assets/collabo/key.webp','key'],
    ['/assets/collabo/key_shadow.webp','keyshadow'],
    ['/assets/collabo/torch_right.webp','torchright'],
    ['/assets/collabo/torch_right_shadow.webp','torchrightshadow'],
    ['/assets/collabo/torch_left.webp','torchleft'],
    ['/assets/collabo/torch_left_shadow.webp','torchleftshadow']
]
const thumb = [
    'thumb0','thumb1','thumb2','thumb3','thumb4','thumb5',
]

export default function CollaborationPage({collab}){
    const router = useRouter();
    const pathname = usePathname(); //해당 페이지 url
    const searchParams = useSearchParams(); //쿼리스트링

    const totalContents = useMemo(() => {
        const copy = [...collab]
        return Array(Math.ceil(collab.length / 6)).fill().map(() => copy.splice(0, 6))
    }, [collab])

    //페이지네이션 만들때 6개씩 끊는 함수 추가
    const [loadTrace, setLoadTrace] = useState(0);
    const [collaboration, setCollaboration] = useState(totalContents[0]);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [curr, setCurr] = useState(0);
    const [collabLoad, setCollabLoad] = useState(0);
    const [indexing, setIndexing] = useState(0);
    const [queryNum, setQueryNum] = useState(null);

    const createQueryString = useCallback((name, value) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
    
        return params.toString();
    },[searchParams]);

    const handlecollabloading = () => {
        setCollabLoad(prev => prev + 1);
    }

    // 페이지에서 클릭하여 모달 오픈 할 경우에 쿼리스트링 설정
    // i 는 클릭시 받아오는 인덱스이고
    // collaboration 은 이미 6개씩 분할되어 있기 때문에 로직에 문제가 없음
    // 그리고 router.push 는 애초에 firebase 객체에 있는 대로 설정하기 때문에 주소 항상 일치
    const handleModalOpen = (i) => () => {
        setModalOpen(true);
        setSelectedIndex(i);
        // router.push(pathname + '?' + createQueryString('num', String(i)));
        router.push(collaboration[i].pageurl);
    }

    const handleImgLoaded = () => {
        setLoadTrace(prev => prev + 1);
    };

    // 직접 url 로 접속했을때 쿼리스트링 설정
    useEffect(()=>{
        const num = searchParams.get('num');

        if(num){
            if(num !== 'screenxyz'){
                setQueryNum(Number(num));

                // index 는 totalContents 에서 최종 아이템을 포함하는 배열의 인덱스임
                const index = findParentArrayIndex(totalContents, Number(num));
                setIndexing(index);
                setCollaboration(totalContents[index]);

                router.push(pathname + '?' + createQueryString('num', num));

                const innerIndex = totalContents[index].findIndex(e => e.num === Number(num));
                setSelectedIndex(innerIndex);
                
                setModalOpen(true);
            }
        }
    },[searchParams]);

    // useEffect(() => {
    //     setCollaboration(totalContents[curr]);
    //     router.replace( pathname )
    // }, [curr])

    // indexing 은 전체 totalContents 의 각 배열의 index 와 일치해야 함!
    useEffect(() => {
        // 쿼리스트링으로 직접 들어오지 않았을때만 수행
        if(searchParams.size === 0){
            setCollaboration(totalContents[indexing]);
            // router.replace( pathname );
        }
    }, [indexing, searchParams])

    return(
        <>
            {loadTrace < assetimg.length && <Loading />}
            {modalOpen && <Modal setModalOpen = {setModalOpen} collabocontents = {collaboration[selectedIndex]} setQueryNum={setQueryNum} />}
            <div className={styles.page} style={{ opacity : loadTrace === assetimg.length ? "1" : '0'}}>

                <div className={styles.frame0} style={{position:'absolute'}}>
                    <Image
                        priority
                        src={'/assets/collabo/frame0.webp'}
                        alt='elements'
                        fill
                        sizes='(max-width: 1920px) 100%, 100%'
                    />
                    <div className={styles.mushroom} style={{position: 'relative'}}>
                        <CanvasComp classification={'collabo'}/>
                    </div>
                </div>

                {
                    assetimg.map((e, i)=>{
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
                                {
                                    collaboration[i] &&
                                        (<div className={styles[thumb[i]]} onClick={handleModalOpen(i)}>
                                            {collabLoad < collaboration.length && <CollabLoading/>}
                                            <Image
                                                priority
                                                src={collaboration[i].imgurl[0]}
                                                alt='elements'
                                                fill
                                                sizes='(max-width: 1920px) 100%, 100%'
                                                onLoad={handlecollabloading}
                                                style={{visibility: collabLoad >= collaboration.length ? 'visible' : 'hidden'}}
                                            />
                                        </div>)
                                }
                            </div>
                        )
                    })
                }

                <Pagination
                    totalPage={collab}
                    limit={6}
                    curr={curr}
                    setCurr={setCurr}
                    setLoad={setCollabLoad}
                    indexing={indexing}
                    setIndexing={setIndexing}
                />

                <div className={styles.collabfooter}>
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