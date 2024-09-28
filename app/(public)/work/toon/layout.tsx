import { getToon } from "@/apis/contents/get.api";
import Loading from "@/app/loading";
import { QUERY_KEY_TOON } from "@/constants";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";
import "../../react-carousel.es.css";

export default async function ToonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEY_TOON],
    queryFn: () => getToon(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydratedState}>
        <div
          id="toonbackground"
          style={{
            height: "calc(var(--vh, 1vh) * 100)",
            backgroundPosition: "center",
            backgroundImage:
              "url(/assets/toon/background/toon_wall_floor2.webp)",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >
          {children}
        </div>
      </HydrationBoundary>
    </Suspense>
  );
}
