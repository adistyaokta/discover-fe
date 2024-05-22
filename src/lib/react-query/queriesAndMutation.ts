import { useAuthStore } from '@/app/store/authStore';
import type { ICreateUserParam, ILoginParam, INewPost } from '@/app/type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createAccount, createPost, getRecentPosts, signInAccount } from '../api';
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
  return useQuery({
    queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
    queryFn: getRecentPosts
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (post: INewPost) => createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      });
    }
  });
};
