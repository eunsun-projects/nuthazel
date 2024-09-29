import GoogleAnalytics from "@/analytics/googleAnalytics";
import Footer from "@/components/footer";
import IfLandscape from "@/components/ifLandscape";
import Navbar from "@/components/navbar";
import NoMouse from "@/components/nomouse";
import SetScreenSize from "@/components/setscreensize";
import { AudioProvider } from "@/contexts/audiocontext";
import QueryProvider from "@/providers/query.provider";
import { Analytics } from "@vercel/analytics/react";
import localFont from "next/font/local";
import { basicMeta } from "./basicmeta";
import "./globals.css";

const pretendard = localFont({
  src: "../public/font/PretendardVariable.woff2",
  weight: "45 920",
  style: "normal",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata = basicMeta;

// test

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="kr" className={pretendard.className}>
      <body style={{ backgroundColor: "#eee7d1" }}>
        <QueryProvider>
          <AudioProvider>
            <SetScreenSize />
            <IfLandscape />
            <NoMouse />
            <Navbar />
            {children}
            <Footer />
          </AudioProvider>
        </QueryProvider>
        <GoogleAnalytics />
        <Analytics />
      </body>
    </html>
  );
}
