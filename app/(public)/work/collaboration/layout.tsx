import { getCollabo } from "@/apis/contents/get.api";
import Loading from "@/app/loading";
import SetScreenSize from "@/components/setscreensize";
import { QUERY_KEY_COLLABO } from "@/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

export default async function CollaborationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_COLLABO],
    queryFn: () => getCollabo(),
  });

  const dehydratedState = dehydrate(queryClient);
  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <SetScreenSize />
        <div
          style={{
            height: "calc(var(--vh, 1vh) * 100)",
            backgroundColor: "#916b4d",
          }}
        >
          {children}
        </div>
      </HydrationBoundary>
    </Suspense>
  );
}
