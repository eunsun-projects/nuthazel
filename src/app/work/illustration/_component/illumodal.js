'use client'
import styles from '@/app/work/illustration/page.module.css';
// import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import ZoomInOut from './zoomInOut';

export default function IlluModal({setIlluModal, selectedItem, setCurrIndex, mobile}) {
    const searchParams = useSearchParams(); //쿼리스트링

    const [size, setSize] = useState(null);

    const handleClick = () => {
        setIlluModal(false);
    }

    const handlePop = () => {
        const num = searchParams.get('num');
        setCurrIndex(num);
        setIlluModal(false);
    }

    useEffect(() => {
        window.addEventListener("popstate", handlePop);
        return () => {
            window.removeEventListener("popstate", handlePop);
        };
    }, [])
    useEffect(()=>{
        const image = new Image();
        image.src = selectedItem;
        image.onload = function(){
            const width = image.width;
            const height = image.height;
            // console.log(width, height)
            // console.log(selectedItem);
            //너비 > 세로 너비 80, 세로 auto wide
            //너비 = 세로와 너비 50, 세로 auto square
            //너비 < 세로 너비 auto, 세로 100 narrow
            if(width > height){
                setSize('wide');
            }else if(width === height){
                setSize('square');
            }else{
                setSize('narrow');
            }
        }
        
    },[selectedItem])

    // console.log(size)

    return(
        <>
            <dialog 
                onClick={handleClick} 
                className={styles.bigimgbox}
            >
                <p>손가락으로 이미지를 확대하여 자세히 보실 수 있습니다.</p>
                <div className={styles.bigmodaldiv}>
                    {size === 'wide' &&
                        (<div className={styles.zoominoutbox}>
                            <ZoomInOut imgSrc={selectedItem} size={size} mobile={mobile} />
                        </div>)
                    }
                    {size === 'square' &&
                        (<div className={styles.zoominoutbox2}>
                            <ZoomInOut imgSrc={selectedItem} size={size} mobile={mobile} />
                        </div>)
                    }
                    {size === 'narrow' &&
                        (<div className={styles.zoominoutbox3}>
                            <ZoomInOut imgSrc={selectedItem} size={size} mobile={mobile} />
                        </div>)
                    }
                </div>
            </dialog>
        </>
    )
}

// const [scale, setScale] = useState({
//     x : 0,
//     y : 0,
//     scale : 1
// });
// const [prevDiff, setPrevDiff] = useState(-1);
// const [evHistory, setEvHistory] = useState([]);

// const handlePinch = ({ zoom, x, y }) => {
//     if (zoom === 0) {
//         return;
//     }

//     const zoomWeight = 0.02;

//     const nextScale = scale.scale + (zoom > 0 ? zoomWeight : -zoomWeight);

//     const biasX = ((x - scale.x) * nextScale) / scale.scale - (x - scale.x);
//     const biasY = ((y - scale.y) * nextScale) / scale.scale - (y - scale.y);
//     const nextX = x - biasX;
//     const nextY = y - biasY;

//     const nextState = {
//         x: nextX,
//         y: nextY,
//         scale: nextScale,
//     };

//     setScale(nextState);
// };

// // 터치 시작
// function touchStartHandler(ev) {
//     const touches = ev.changedTouches;
//     const copy = [...evHistory];
//     if (copy.length + touches.length <= 2) {
//         for (let i = 0; i < touches.length; i++) {
//             const touch = touches[i];
//             setEvHistory(prev => [...prev, touch]);
//         }
//     }
// }

// // 터치 끝
// function touchEndHandler(ev) {
//     const touches = ev.changedTouches;
//     const copy = [...evHistory];
//     for (let i = 0; i < touches.length; i++) {
//         const touch = touches[i];
//         const index = copy.findIndex(cachedEv => cachedEv.identifier === touch.identifier);
//         if (index > -1) {
//             copy.splice(index, 1);
//             setEvHistory(copy);
//         }
//     }
// }

// // 터치 이동시 핀치 발생 체크
// const touchMoveHandler = (ev) => {
//     const touches = ev.changedTouches;

//     const copy = [...evHistory];
//     for (let i = 0; i < touches.length; i++) {
//         const touch = touches[i];
//         const index = copy.findIndex(cachedEv => cachedEv.identifier === touch.identifier);

//         if (index !== -1) {
//             copy[index] = touch;
//             // 두 개의 터치가 진행중인 경우 핀치 줌으로 판단한다
//             if (copy.length === 2) {
//                 const xDiff = copy[0].clientX - copy[1].clientX;
//                 const yDiff = copy[0].clientY - copy[1].clientY;
//                 const curDiff = Math.sqrt(xDiff * xDiff + yDiff * yDiff);
        
//                 // 첫 핀치의 경우 비교군이 없으므로 prevDiff가 -1인 경우 생략한다.
//                 if (prevDiff > 0) {
//                     const zoom = curDiff - prevDiff;
//                     const x = (copy[0].clientX + copy[1].clientX) / 2;
//                     const y = (copy[0].clientY + copy[1].clientY) / 2;
//                     const { top, left } = (ev.currentTarget).getBoundingClientRect();

//                     handlePinch({ zoom : zoom, x: x - left, y: y - top });
//                 }
//                 setEvHistory(copy);
//                 setPrevDiff(curDiff);
//             }
//         }
//     }
// }

// useEffect(() => {
//     if(targetRef.current && wrapperRef.current){
//         targetRef.current.style.transformOrigin = 'center center';
//         // targetRef.current.style.transform = `translateX(${scale.x}px) translateY(${scale.y}px) scale(${scale.scale})`;
//         targetRef.current.style.transform = `scale(${scale.scale})`;

//     }
// }, [scale])