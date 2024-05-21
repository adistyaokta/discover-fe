import { useAuthStore } from '@/app/store/authStore';
import type { ICreateUserParam, ILoginParam } from '@/app/type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createAccount, getRecentPosts, signInAccount } from '../api';
import { QUERY_KEYS } from './queryKeys';

export const useLoginAccount = () => {
  const { login } = useAuthStore();
  return useMutation({
    mutationFn: ({ username, password }: ILoginParam) => signInAccount(username, password),
    onError: (error: Error) => {
      return error;
    },
    onSuccess: (data) => {
      login(data?.user, data?.token);
    }
  });
};

export const useCreateAccount = () => {
  return useMutation({
    mutationFn: ({ username, email, password }: ICreateUserParam) => createAccount(username, email, password),
    onError: (error: Error) => {
      return error;
    },
    onSuccess: (data) => {
      return data;
    }
  });
};

export const useGetRecentPost = () => {
  const { token } = useAuthStore();
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: () => getRecentPosts(token!)
  });
};
