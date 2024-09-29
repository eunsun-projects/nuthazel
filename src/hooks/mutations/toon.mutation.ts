import { setToon } from "@/apis/contents/set.api";
import { QUERY_KEY_TOON } from "@/constants/query.constant";
import { Toon } from "@/types/NutHazel.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface ToonMutationProps {
  toon: FormData | Toon;
  method: "POST" | "DELETE";
}

export function useToonMutation() {
  const queryClient = useQueryClient();
  return useMutation<Toon[], Error, ToonMutationProps>({
    mutationFn: (toonPayload: ToonMutationProps) => setToon(toonPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_TOON] });
    },
  });
}
