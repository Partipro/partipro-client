import { useQuery as reactUseQuery } from "@tanstack/react-query";

function useQuery<R, F>({
  queryKey,
  service,
}: {
  queryKey?: [keyof F, F[keyof F]];
  service: (filters?: F[keyof F]) => Promise<R>;
}): [boolean, R | undefined, any] {
  const { isLoading, data, error } = reactUseQuery({
    queryKey: [queryKey],
    queryFn: () => service(queryKey?.[1]),
  });

  return [isLoading, data, error];
}

export default useQuery;
