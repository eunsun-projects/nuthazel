"use client"
import { Canvas } from '@react-three/fiber' //대문자 Canvas를 불러와라.
import { OrbitControls} from '@react-three/drei'
import Scene from './scene'
import { useState, useCallback, useEffect } from 'react'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import MushroomModal from '@/app/work/collaboration/_component/mushroommodal'

export default function CanvasComp ({ classification }) {
    const router = useRouter();
    const pathname = usePathname(); //해당 페이지 url
    const searchParams = useSearchParams(); //쿼리스트링

    const [modal, setModal] = useState(false);

    const createQueryString = useCallback((name, value) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(name, value);
    
        return params.toString();
    },[searchParams]);

    const handleClick = () => {
        // console.log('되냐')
        if(classification === 'main'){
            // console.log('main')
            router.push('/work/collaboration?num=screenxyz')
        }else{
            console.log('collabo')
            setModal(true)
            router.push(pathname + '?' + createQueryString('num', 'screenxyz'));
        }
    }

    useEffect(()=>{
        const num = searchParams.get('num');

        if(num === 'screenxyz'){
            setModal(true);
            router.push(pathname + '?' + createQueryString('num', 'screenxyz'));
        }
    },[searchParams])

    return(
        <>
        {modal && <MushroomModal setModalOpen = {setModal}/>}
        <div style={{height: '100%', width: '100%'}}>
            <Canvas>
                <Scene classification={classification} handleClick={handleClick}/>

                <OrbitControls 
                    // makeDefault
                    enableZoom={false}
                    enableRotate={classification === 'main' ? true : false}
                    enablePan={false}
                    target={[0, 0, 0]}
                    maxDistance={0}
                    minDistance={7}
                    // maxAzimuthAngle={0}
                    // minAzimuthAngle={0}
                    minPolarAngle={1.4}
                    maxPolarAngle={0}
                />
            </Canvas>
        </div>
        </>
    )
}