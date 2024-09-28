import { getCollabo } from "@/apis/contents/get.api";
import { QUERY_KEY_COLLABO } from "@/constants/query.constant";
import { Collabo } from "@/types/NutHazel.type";
import { useQuery } from "@tanstack/react-query";

export function useCollaboQuery() {
  return useQuery<Collabo[]>({
    queryKey: [QUERY_KEY_COLLABO],
    queryFn: getCollabo,
  });
}
