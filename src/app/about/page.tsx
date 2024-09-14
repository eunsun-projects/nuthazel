import AboutPage from "@/app/about/_component/about";
import { basicMeta, basicViewport } from "@/app/basicmeta";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function About() {
  return <AboutPage />;
}
