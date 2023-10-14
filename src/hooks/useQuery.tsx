import { useQuery as reactUseQuery } from "@tanstack/react-query";

function useQuery<R, F>({
  queryKey,
  service,
  autoStart = true,
}: {
  queryKey?: [keyof F, F[keyof F] | undefined];
  service: (filters?: F[keyof F]) => Promise<R>;
  autoStart?: boolean;
}): {
  isLoading: boolean;
  data: R | undefined;
  isSuccess: boolean;
  isError: boolean;
  error: any;
  refetch: () => void;
} {
  const { isLoading, data, refetch, isSuccess, isError, error } = reactUseQuery(
    {
      queryKey: [queryKey],
      queryFn: () => service(queryKey?.[1]),
      enabled: autoStart,
    },
  );

  return { isLoading, data, isSuccess, isError, error, refetch };
}

export default useQuery;
