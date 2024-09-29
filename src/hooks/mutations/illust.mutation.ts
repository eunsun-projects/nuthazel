import { setIllust } from "@/apis/contents/set.api";
import { QUERY_KEY_ILLUST } from "@/constants/query.constant";
import { Illust } from "@/types/NutHazel.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface IllustMutationProps {
  illust: FormData | Illust;
  method: "POST" | "DELETE";
}

export function useIllustMutation() {
  const queryClient = useQueryClient();
  return useMutation<Illust[], Error, IllustMutationProps>({
    mutationFn: (illustPayload: IllustMutationProps) => setIllust(illustPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_ILLUST] });
    },
  });
}
