import { basicMeta, basicViewport } from "@/app/basicmeta";
import AboutTemplate from "./_component/abouttemplate";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function About() {
  return <AboutTemplate />;
}
