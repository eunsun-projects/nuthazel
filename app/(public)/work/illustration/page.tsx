import IllustTemplate from "@/app/(public)/work/illustration/_component/illusttemplate";
import { basicMeta } from "@/app/basicmeta";

export const metadata = basicMeta;
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function IllustPage() {
  return <IllustTemplate />;
}
