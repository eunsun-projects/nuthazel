'use client'
import { useEffect } from "react";

export default function SetScreenSize() {

    useEffect(()=>{

        /** ============ set screensize =============== */
        function setScreenSize() {
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
        };

        // orientationchange 이벤트를 위한 resize 이벤트 트리거 함수
        function handleOrientationChange() {
            window.dispatchEvent(new Event("resize"));
        };

        /** ====== Generate a resize event if the device doesn't do it ====== */  
        window.addEventListener("orientationchange", handleOrientationChange, false);
        window.addEventListener('resize', setScreenSize);
        window.dispatchEvent(new Event("resize"))

        return () => {
            window.removeEventListener("orientationchange", handleOrientationChange, false);
            window.removeEventListener('resize', setScreenSize);
        };

    },[])

    return(
        <>
        </>
    )
}