import CollaborationTemplate from "@/app/(public)/work/collaboration/_component/collaborationtemplate";
import { basicMeta, basicViewport } from "@/app/basicmeta";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default async function Collaboration() {
  return <CollaborationTemplate />;
}
