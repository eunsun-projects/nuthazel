'use client'
import styles from '@/app/page.module.css'
import { useEffect } from 'react'

export const metadata = {
    title : "error :(",
    description : "some error occured!",
    generator: 'Next.js',
    applicationName: 'nuthazel',
    referrer: 'origin-when-cross-origin',
    keywords: ['nuthazel', 'toon', 'illust'],
    authors: [{ name: 'Vanko' }, { name: 'Vanko', url: 'https://nuthazel.com' }],
    creator: 'nuthazel',
    publisher: 'nuthazel',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    metadataBase: new URL('https://nuthazel.com'),
    alternates: {
        canonical: '/',
        languages: {
            'ko-KR': '/',
        },
    },
    openGraph: {
        title : "error :(",
        description : "some error occured!",
        url: 'https://nuthazel.com',
        siteName: 'nuthazel',
        images: [
            {
                url: '/thumbnail800.png',
                width: 800,
                height: 600,
            },
        ],
        locale: 'ko_KR',
        type: 'website',
    },
    robots: {
        index: false,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: false,
            noimageindex: true,
        },
    },
    icons: {
        icon: '/favicon.png',
        shortcut: '/favicon.png',
        apple: '/favicon.png',
        other: {
            rel: 'apple-touch-icon-precomposed',
            url: '/favicon.png',
        },
    },
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
    viewportFit : "cover"
}

export default function GlobalError({error, reset}){

    const handleError = () => {
        reset();
    }

    useEffect(()=> {
        console.error(error);
    },[error])

    return(
        <div className={styles.notfoundbox}>
            <img className={styles.notimg} src='/assets/goods/storedoor.webp'></img>
            <p className={styles.notp}>Error</p>
            <p className={styles.notcon}>에러가 발생하였습니다.</p>
            <p className={styles.notcon} onClick={handleError}>← try again</p>
        </div>
    )
}