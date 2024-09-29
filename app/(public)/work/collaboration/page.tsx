import { getCollabo } from "@/apis/contents/get.api";
import CollaborationTemplate from "@/app/(public)/work/collaboration/_component/collaborationtemplate";
import { basicMeta, basicViewport } from "@/app/basicmeta";
import { QUERY_KEY_COLLABO } from "@/constants";
import { Collabo } from "@/types/NutHazel.type";
import { QueryClient } from "@tanstack/react-query";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default async function Collaboration() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_COLLABO],
    queryFn: () => getCollabo(),
  });

  const collabo = queryClient.getQueryData<Collabo[]>([QUERY_KEY_COLLABO]);

  return collabo ? <CollaborationTemplate collabo={collabo} /> : null;
}
