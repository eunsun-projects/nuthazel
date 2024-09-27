export const basicMeta = {
    title: 'nuthazel',
    description: "nuthazel's home",
    generator: 'Next.js',
    applicationName: 'nuthazel',
    referrer: 'origin-when-cross-origin',
    keywords: ['nuthazel', 'illust', 'toon'],
    authors: [{ name: 'nuthazel' }, { name: 'nuthazel', url: 'https://nuthazel.com' }],
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
        title: 'nuthazel',
        description: "nuthazel's home",
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

export const basicViewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
}