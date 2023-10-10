import { useQuery as reactUseQuery } from "@tanstack/react-query";

function useQuery<R, F>({
  queryKey,
  service,
}: {
  queryKey?: [keyof F, F[keyof F]];
  service: (filters?: F[keyof F]) => Promise<R>;
}): [boolean, R | undefined, boolean, boolean, any] {
  const { isLoading, data, isSuccess, isError, error } = reactUseQuery({
    queryKey: [queryKey],
    queryFn: () => service(queryKey?.[1]),
  });

  return [isLoading, data, isSuccess, isError, error];
}

export default useQuery;
