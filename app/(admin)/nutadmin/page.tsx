import { postUserServer } from "@/apis/auth/post.api";
import { getCollabo, getIllust, getToon } from "@/apis/contents/get.api";
import { basicMeta, basicViewport } from "@/app/basicmeta";
import Loading from "@/app/loading";
import {
  QUERY_KEY_COLLABO,
  QUERY_KEY_ILLUST,
  QUERY_KEY_TOON,
  QUERY_KEY_USER,
} from "@/constants";
import { getUserFromHeaders } from "@/utils/common/getUserFromHeaders";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import AdminLoginSequence from "./_component/adminloginsequence";

export const metadata = basicMeta;
export const viewport = basicViewport;

export default async function NutAdminPage() {
  const userId = getUserFromHeaders();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_USER],
    queryFn: () => postUserServer(userId),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_ILLUST],
    queryFn: () => getIllust(),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_TOON],
    queryFn: () => getToon(),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_COLLABO],
    queryFn: () => getCollabo(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <AdminLoginSequence />
      </HydrationBoundary>
    </Suspense>
  );
}
