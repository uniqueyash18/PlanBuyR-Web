"use client";

import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { postData } from '@/hooks/apiService';

interface UsePostDataOptions<TData, TError, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>;
  onError?: (error: TError, variables: TVariables) => void | Promise<void>;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void | Promise<void>;
}

const usePostData = <TData, TError = Error, TVariables = any>(
  endpoint: string,
  headers?: any,
  options?: UsePostDataOptions<TData, TError, TVariables>
): UseMutationResult<TData, TError, TVariables> & { isLoading: boolean } => {
  const mutation = useMutation<TData, TError, TVariables>({
    mutationFn: async (variables) => {
      const response = await postData(endpoint, variables,headers);
      return response as TData;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
    onSettled: options?.onSettled,
  });

  return {
    ...mutation,
    isLoading: mutation.isPending,
  };
};

export default usePostData; 