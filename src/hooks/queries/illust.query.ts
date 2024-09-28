import { getIllust } from "@/apis/contents/get.api";
import { QUERY_KEY_ILLUST } from "@/constants/query.constant";
import { Illust } from "@/types/NutHazel.type";
import { useQuery } from "@tanstack/react-query";

export function useIllustQuery() {
  return useQuery<Illust[]>({
    queryKey: [QUERY_KEY_ILLUST],
    queryFn: getIllust,
  });
}
