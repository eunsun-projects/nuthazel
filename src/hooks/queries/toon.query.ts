import { getToon } from "@/apis/contents/get.api";
import { QUERY_KEY_TOON } from "@/constants/query.constant";
import { Toon } from "@/types/NutHazel.type";
import { useQuery } from "@tanstack/react-query";

export function useToonQuery() {
  return useQuery<Toon[]>({
    queryKey: [QUERY_KEY_TOON],
    queryFn: getToon,
  });
}
