import { basicMeta, basicViewport } from "@/app/basicmeta";
import ContactPage from "@/app/contact/_component/contact";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function Contact() {
  return <ContactPage />;
}
