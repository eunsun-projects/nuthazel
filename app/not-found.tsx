import styles from "@/styles/home.module.css";
import Link from "next/link";

export const metadata = {
  title: "page not found!",
  description: "page not found!",
  generator: "Next.js",
  applicationName: "nuthazel",
  referrer: "origin-when-cross-origin",
  keywords: ["nuthazel", "toon", "illust"],
  authors: [
    { name: "nuthazel" },
    { name: "nuthazel", url: "https://nuthazel.com" },
  ],
  creator: "nuthazel",
  publisher: "nuthazel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://nuthazel.com"),
  alternates: {
    canonical: "/",
    languages: {
      "ko-KR": "/",
    },
  },
  openGraph: {
    title: "page not found!",
    description: "page not found!",
    url: "https://nuthazel.com",
    siteName: "nuthazel",
    images: [
      {
        url: "/thumbnail800.png",
        width: 800,
        height: 600,
      },
    ],
    locale: "ko_KR",
    type: "website",
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
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/favicon.png",
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function NotFound() {
  return (
    <dialog className={styles.notfoundbox}>
      <img
        className={styles.notimg}
        src="/assets/goods/storedoor.webp"
        alt="storedoor"
      ></img>
      <p className={styles.notp}>Not Found</p>
      <p className={styles.notcon}>주소를 찾을 수 없습니다.</p>
      <Link href={"/"}>
        <p className={styles.notcon}>← return Home</p>
      </Link>
    </dialog>
  );
}
