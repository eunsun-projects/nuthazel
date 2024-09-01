'use client'
import styles from '@/app/page.module.css'
import { usePathname } from 'next/navigation'
import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Footer(){
    const footRef = useRef();
    const pathname = usePathname();
    // console.log(pathname)

    // useEffect(()=>{
    //     if(pathname){
    //         footRef.current.style.display = 'none'
    //     }
    // })
    return(
        <div ref={footRef} className={styles.footer} 
            style={{
                backgroundColor : pathname !== '/' && 'transparent', display:'flex', justifyContent:'space-between',
                display: (pathname === '/about' || pathname === '/goods' || pathname === '/work/collaboration') && 'none',
                color: (pathname === '/' || pathname === '/contact' ? '#eee7d1' : '#40403d')
            }}>
            <p>©2024.nuthazel</p>
            <Link href={'https://www.instagram.com/bdn._.toon/'} target='_blanc'>
                <div
                    style={{
                        display:'flex',
                        color: (pathname === '/' || pathname === '/contact' ? '#eee7d1' : '#40403d')
                    }}
                >
                    <div className={styles.cong} style={{
                        borderColor: (pathname === '/' || pathname === '/contact' ? '#eee7d1' : '#40403d')
                    }}>i</div>
                    <div className={styles.cong} style={{
                        borderColor: (pathname === '/' || pathname === '/contact' ? '#eee7d1' : '#40403d')
                    }}>n</div>
                    <div className={styles.cong} style={{
                        borderColor: (pathname === '/' || pathname === '/contact' ? '#eee7d1' : '#40403d')
                    }}>s</div>
                    <div className={styles.cong} style={{
                        borderColor: (pathname === '/' || pathname === '/contact' ? '#eee7d1' : '#40403d')
                    }}>t</div>
                    <div className={styles.cong} style={{
                        borderColor: (pathname === '/' || pathname === '/contact' ? '#eee7d1' : '#40403d')
                    }}>a</div>
                </div>
            </Link>
        </div>
    )
}