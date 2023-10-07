import {
  useMutation as reactuseMutation,
  UseMutationResult,
} from "@tanstack/react-query";

function useMutation<R, D>({
  service,
  onSuccess,
  onError,
}: {
  service: (data: D) => Promise<R>;
  onSuccess?: () => void;
  onError?: (error?: { message: string; name: string }) => void;
}): [UseMutationResult<R, unknown, D, unknown>] {
  const mutation = reactuseMutation({
    mutationFn: service,
    onSuccess,
    onError,
  });

  return [mutation];
}

export default useMutation;
