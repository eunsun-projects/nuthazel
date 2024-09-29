import { setCollabo } from "@/apis/contents/set.api";
import { QUERY_KEY_COLLABO } from "@/constants/query.constant";
import { Collabo } from "@/types/NutHazel.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CollaboMutationProps {
  collabo: FormData | Collabo;
  method: "POST" | "DELETE";
}

export function useCollaboMutation() {
  const queryClient = useQueryClient();
  return useMutation<Collabo[], Error, CollaboMutationProps>({
    mutationFn: (collaboPayload: CollaboMutationProps) => setCollabo(collaboPayload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_COLLABO] });
    },
  });
}
