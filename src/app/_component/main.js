'use client'
import styles from '@/app/main.module.css'
import Image from 'next/image'
import Loading from '../loading'
import { useEffect, useState, useRef, createRef } from 'react'
import isMobile from '@/utils/isMobile'
import CanvasComp from '@/components/mushroom/canvas'
import Link from 'next/link'

const dandelion = [{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}]
const assetimg=[
    //오른쪽나무
    ['/assets/main/right_tree1_shadow.webp','righttree1shadow'],
    ['/assets/main/right_tree1.webp','righttree1'],
    ['/assets/main/right_tree2_shadow.webp','righttree2shadow'],
    ['/assets/main/right_tree2.webp','righttree2'],
    ['/assets/main/right_tree3_shadow.webp','righttree3shadow'],
    ['/assets/main/right_tree3.webp','righttree3'],

    //왼쪽나무
    ['/assets/main/left_tree1.webp','lefttree1'], //그림자없음
    ['/assets/main/left_tree2.webp','lefttree2'], //그림자없음
    ['/assets/main/left_tree3_shadow.webp','lefttree3shadow'],
    ['/assets/main/left_tree3.webp','lefttree3'],

    //작은나무
    ['/assets/main/small_tree1_shadow.webp','smalltree1shadow'],
    ['/assets/main/small_tree1.webp','smalltree1'],
    ['/assets/main/small_tree2_shadow.webp','smalltree2shadow'],
    ['/assets/main/small_tree2.webp','smalltree2'],
    ['/assets/main/small_tree4_shadow.webp','smalltree4shadow'],
    ['/assets/main/small_tree4.webp','smalltree4'],
    ['/assets/main/small_tree3_shadow.webp','smalltree3shadow'],
    ['/assets/main/small_tree3.webp','smalltree3'],

    //집
    ['/assets/main/house_shadow.webp','houseshadow'],
    ['/assets/main/house_window.webp','housewindow'],
    ['/assets/main/house_albam.webp','housealbam'],
    ['/assets/main/house.webp','house'],

    //상점
    ['/assets/main/store_shadow.webp','storeshadow', '/goods'],
    ['/assets/main/store.webp','store', '/goods'],

    //우체통
    ['/assets/main/mailbox_shadow.webp','mailboxshadow', '/contact'],
    ['/assets/main/mailbox.webp','mailbox', '/contact'],

    // 꽃
    ['/assets/main/flower2.webp','flower'],
    //텍스처
    ['/assets/main/texture.webp','texture'],
]
const smokeimg = [
    //연기
    ['/assets/main/smoke1.webp','smoke1', '/work'],
    ['/assets/main/smoke2.webp','smoke2', '/work'],
    ['/assets/main/smoke3.webp','smoke3', '/work'],
    ['/assets/main/smoke4.webp','smoke4', '/work'],
    ['/assets/main/smoke5.webp','smoke5', '/work'],
    ['/assets/main/smoke6.webp','smoke6', '/work'],
    ['/assets/main/smoke7.webp','smoke7', '/work'],
]
const cloudimg=[
    ['/assets/main/mid_cloud.webp','midcloud'],
    ['/assets/main/small_cloud_copy.webp','smallcloudcopy'],
    ['/assets/main/small_cloud.webp','smallcloud'],
    ['/assets/main/mid_cloud_copy.webp','midcloudcopy'],
    ['/assets/main/big_cloud.webp','bigcloud'],
]

export default function Main(){
    const [loadTrace, setLoadTrace] = useState(0);
    const [xy, setXy] = useState([]);
    const [smoke, setSmoke] = useState(0);

    const smokeRefs = useRef(smokeimg.map(() => createRef()));
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
                if (index === smokeimg.length - 1) {
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
    
        const ensureWithinBounds = (value, max) => {
            return Math.max(0, Math.min(value, max));
        };
        
        const getRandomPosition = () => {
            let x = Math.random() * (window.innerWidth);
            let y = Math.random() * (window.innerHeight);

            x = ensureWithinBounds(Math.round(x), window.innerWidth);
            y = ensureWithinBounds(Math.round(y), window.innerHeight);

            return { x , y };
        };
        
        const generatePositions = (count) => {
            const positions = [];
            for(let i = 0; i < count; i++){
                let newPos = getRandomPosition();
                positions.push(newPos);
            }
            return positions;
        };
        const reduced = generatePositions(dandelion.length);
                
        setXy(reduced);

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
            {loadTrace < assetimg.length + cloudimg.length + smokeimg.length + dandelion.length && <Loading/>}
            <div className={styles.mainpage} style={{opacity: loadTrace === assetimg.length + cloudimg.length + smokeimg.length + dandelion.length ? '1' : '0'}}>
                {xy.length === 20 &&
                    dandelion.map((e, i)=>{
                        return(
                            <div 
                                key={i} 
                                className={styles.dandelion} 
                                style={{
                                    left: `${xy[i].x}px`, // x 좌표를 스타일에 적용
                                    top: `${xy[i].y}px`, // y 좌표를 스타일에 적용
                                }}
                            >
                                <Image
                                    priority
                                    src={'/assets/main/dandelion.webp'}
                                    alt='elements'
                                    fill
                                    onLoad={handleImgLoaded}
                                    sizes='(max-width: 1920px) 100%, 100%'
                                />
                            </div>
                        )
                    })
                }
                {
                    cloudimg.map((e, i)=>{
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

                <div className={styles.background}></div>
                {
                    assetimg.map((e, i)=>{
                        return(
                            <div key={i} className={styles[e[1]]} style={{position:'absolute'}}>
                                {
                                    e[2] ? (
                                        <Link href={e[2]} prefetch={false}>
                                            <Image
                                                priority
                                                src={e[0]}
                                                alt='elements'
                                                fill
                                                onLoad={handleImgLoaded}
                                                sizes='(max-width: 1920px) 100%, 100%'
                                            />
                                        </Link>
                                    ) : (
                                        <Image
                                            priority
                                            src={e[0]}
                                            alt='elements'
                                            fill
                                            onLoad={handleImgLoaded}
                                            sizes='(max-width: 1920px) 100%, 100%'
                                        />
                                    )
                                }
                            </div>
                        )
                    })
                }
                
                {
                    smokeimg.map((e, i)=>{
                        return(
                            <div 
                                key={i} 
                                ref={smokeRefs.current[i]} 
                                className={styles[e[1]]} 
                                style={{position:'absolute'}}
                            >
                                <Link href={e[2]} prefetch={false}>
                                    <Image
                                        priority
                                        src={e[0]}
                                        alt='elements'
                                        fill
                                        onLoad={handleImgLoaded}
                                        sizes='(max-width: 1920px) 100%, 100%'
                                    />
                                </Link>
                            </div>
                        )
                    })
                }

            <div className={styles.mushroom}>
                <CanvasComp classification={'main'}/>
            </div>
            </div>
        </>
    )
}

// // 민들레의 랜덤 위치를 생성하는 함수
// const getRandomPosition = () => {
//     const x = Math.random() * (window.innerWidth - 240); // 240은 별의 대략적인 크기입니다
//     const y = Math.random() * (window.innerHeight - 240);

//     return { x, y };
// };

// let copy = [...xy];
// // 임시 배열에 화면의 정중앙 좌표를 구해서 0번 객체 center.x 와 center.y 에 할당
// let temp = [
//     {
//         x : window.innerWidth / 2,
//         y : window.innerHeight / 2
//     }
// ];
// // 뺄 값 === 모바일이면 50 아니면 100
// let minus = isMobile() ? 50 : 100;
// let xx, yy = 0;

// for(let i = 0; i < dandelion.length; i++){
//     let { x, y } = getRandomPosition();

//     temp.forEach((e) => {
//         // x y 값의 차 구하기
//         const xAbs = e.x - x;
//         const YAbs = e.y - y;

//         // 차이가 100 미만 이면 100만큼 추가
//         if( Math.abs(xAbs) < minus ){
//             // 차가 음수면(기준에서 오른쪽으로 가까우면 오른쪽으로 minus 값만큼 추가)
//             // 차가 양수면(기준에서 왼쪽으로 가까우면 왼쪽으로 minus 값만큼 추가)
//             xAbs < 0 ? x = x + minus : x = x - minus;
//         }
//         if( Math.abs(YAbs) < minus ){
//             // 차가 음수면(기준에서 위로 가까우면 위로 minus 값만큼 추가)
//             // 차가 양수면(기준에서 아래로로 가까우면 아래로 minus 값만큼 추가)
//             YAbs < 0 ? y = y + minus : y = y - minus;
//         }
//     })
//     xx = Math.abs(Math.round(x));
//     yy = Math.abs(Math.round(y));

//     temp = [...temp, { x : xx, y: yy } ];
// }
// temp.shift();
// copy = temp;
// setXy(copy);


// const getRandomPosition = () => {
//     const x = Math.random() * (window.innerWidth - 240);
//     const y = Math.random() * (window.innerHeight - 240);
//     return { x, y };
// };

// const adjustPosition = (baseArr, position, minus) => {
//     let { x, y } = position;
//     let newxy = {};
//     baseArr.forEach(e => {
//         const xDiff = e.x - x;
//         const yDiff = e.y - y;

//         // 차이가 100 미만 이면 100만큼 추가
//         if( Math.abs(xDiff) < minus ){
//             // 차가 음수면(기준에서 오른쪽으로 가까우면 오른쪽으로 minus 값만큼 추가)
//             // 차가 양수면(기준에서 왼쪽으로 가까우면 왼쪽으로 minus 값만큼 추가)
//             xDiff < 0 ? x = x + minus : y = x - minus;
//         }
//         if( Math.abs(yDiff) < minus ){
//             // 차가 음수면(기준에서 위로 가까우면 위로 minus 값만큼 추가)
//             // 차가 양수면(기준에서 아래로로 가까우면 아래로 minus 값만큼 추가)
//             yDiff < 0 ? x = y + minus : y = y - minus;
//         }

//         newxy = { x : Math.round(x), y : Math.round(y) }
//     })

//     return newxy;
// };

// const minus = isMobile() ? 50 : 100;

// const dande = dandelion.map(e => e = getRandomPosition());

// const reduced = dande.reduce((acc, curr) => {
//     const adjustedPosition = adjustPosition(acc, curr, minus);
    
//     acc.push(adjustedPosition)
//     return acc;
// }, [])

// const isPositionValid = (baseArr, position, minus) => {
//     return baseArr.every(e => {
//         const xDiff = e.x - position.x;
//         const yDiff = e.y - position.y;
//         return Math.abs(xDiff) >= minus && Math.abs(yDiff) >= minus;
//     });
// };

// const minus = isMobile() ? 50 : 100;

// const generatePositions = (count, minus) => {
//     const positions = [];
//     for(let i = 0; i < count; i++){
//         let newPos = getRandomPosition();
//         if (isPositionValid(positions, newPos, minus)) {
//             positions.push(newPos);
//         }else{
//             positions.push(getRandomPosition());
//         }
//     }
//     return positions;
// };

// const reduced = generatePositions(dandelion.length, minus);