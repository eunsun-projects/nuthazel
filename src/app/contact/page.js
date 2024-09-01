import ContactPage from "@/app/contact/_component/contact"
import { basicMeta, basicViewport } from "@/app/basicmeta";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default function Contact(){
    return(
        <ContactPage/>
    )
}