import { getLogInWithProvider } from "@/apis/auth/get.api";
import { QUERY_KEY_USER } from "@/constants";
import { OAuthResponse } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

interface LogInQueryProps {
  provider: string;
  isStart: boolean;
}

export function useLogInQuery({ provider, isStart }: LogInQueryProps) {
  return useQuery<OAuthResponse["data"]>({
    queryKey: [QUERY_KEY_USER, provider],
    queryFn: () => getLogInWithProvider(provider),
    enabled: !!provider && isStart,
  });
}
