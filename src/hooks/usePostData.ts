"use client";

import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';
import { getItem, postData } from '@/hooks/apiService';

const LIVE_URL = process.env.NEXT_PUBLIC_API_URL;

const axiosInstance = axios.create({
  baseURL: LIVE_URL,
});

axiosInstance.interceptors.request.use(config => {
  const modifiedConfig = { ...config };
  const userData = getItem('userData');
  if (userData) {
    modifiedConfig.headers.authorization = `Bearer ${userData.token}`;
  }
  return modifiedConfig;
});

axiosInstance.interceptors.request.use(config => {
  console.log('Final Request URL:', `${LIVE_URL}${config.url}`);
  console.log('Request Data:', config.data);
  console.log('Request Headers:', config.headers);
  return config;
});

axiosInstance.interceptors.response.use(
  async function (response) {
    console.log(response, 'api ressss');
    return response;
  },
  function (error) {
    console.log(error, 'api eroorrrr');
    if (error?.response?.status === 401) {
      return Promise.reject(
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        'Unauthorized',
      );
    }

    return Promise.reject(
      error?.response?.data?.message || 
      error?.response?.data?.error?.message ||
      error?.response?.data?.error || 
      'Server Error'
    );
  },
);

interface MutationData {}

interface UsePostDataOptions<TData, TError, TVariables> {
  onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>;
  onError?: (error: TError, variables: TVariables) => void | Promise<void>;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void | Promise<void>;
}

const usePostData = <TData, TError = Error, TVariables = any>(
  endpoint: string,
  options?: UsePostDataOptions<TData, TError, TVariables>
): UseMutationResult<TData, TError, TVariables> & { isLoading: boolean } => {
  const mutation = useMutation<TData, TError, TVariables>({
    mutationFn: async (variables) => {
      const headers = variables instanceof FormData 
        ? { 'Content-Type': 'multipart/form-data' }
        : undefined;
      const response = await postData(endpoint, variables, headers);
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