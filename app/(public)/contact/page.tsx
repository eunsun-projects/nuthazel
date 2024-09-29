import { basicMeta, basicViewport } from "@/app/basicmeta";
import ContactTemplate from "./_component/contacttemplate";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function Contact() {
  return <ContactTemplate />;
}
