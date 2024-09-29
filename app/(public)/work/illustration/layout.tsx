import { getIllust } from "@/apis/contents/get.api";
import Loading from "@/app/loading";
import { QUERY_KEY_ILLUST } from "@/constants";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";
import "../../../react-carousel.es.css";

export default async function IllustLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_ILLUST],
    queryFn: () => getIllust(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <div
          style={{
            height: "100%",
            minHeight: "calc(var(--vh, 1vh) * 100)",
            overflowY: "auto",
          }}
        >
          {children}
        </div>
      </HydrationBoundary>
    </Suspense>
  );
}
