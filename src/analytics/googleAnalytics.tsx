import Script from "next/script";

export default function GoogleAnalytics() {

    return (
        <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`} />
        <Script id="google-analytics">
            {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
        
                gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');
            `}
        </Script>
        </>
    )
}