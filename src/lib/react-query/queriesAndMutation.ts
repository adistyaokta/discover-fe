import { useAuthStore } from '@/app/store/authStore';
import type { ICreateUserParam, ILoginParam, INewPost, IPostImage, IUpdateProfileParam } from '@/app/type';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createAccount,
  createPost,
  deletePost,
  // editPost,
  editUser,
  getPostByAuthor,
  getPostDetail,
  // getRandomPosts,
  getRecentPosts,
  getUserDetail,
  likeUnlikePost,
  searchPosts,
  signInAccount,
  uploadImage
} from '../api';
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

export const useGetUserDetail = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: () => getUserDetail(id)
  });
};

export const useGetPostByAuthor = (authorId: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POSTS_BY_CREATOR],
    queryFn: () => getPostByAuthor(authorId)
  });
};

// export const useGetRandomPosts = (count: number) => {
//   return useQuery({
//     refetchInterval: 30000,
//     queryKey: [QUERY_KEYS.GET_RANDOM_POSTS],
//     queryFn: () => getRandomPosts(count)
//   });
// };

export const useGetPostDetail = (id: number) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_POST_DETAIL],
    queryFn: () => getPostDetail(id)
  });
};

export const useSearchPosts = (searchTerm: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.SEARCH_POSTS, searchTerm],
    queryFn: () => searchPosts(searchTerm),
    enabled: !!searchTerm
  });
};

// export const useEditPost = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (param: IUpdatePostParam) => editPost(param),
//     onSuccess: (data) => {
//       return data;
//     },
//     onError: (data) => {
//       return data;
//     }
//   });
// };

export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number | string) => deletePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      });
    },
    onError: (data) => {
      return data;
    }
  });
};

export const useLikeUnlikePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => likeUnlikePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS]
      });
    },
    onError: (data) => {
      return data;
    }
  });
};

export const useUploadImage = () => {
  return useMutation({
    mutationFn: ({ image, folder }: IPostImage) => uploadImage(image, folder),
    onError: (error: Error) => {
      return error;
    },
    onSuccess: (data) => {
      return data;
    }
  });
};

export const useEditUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (param: IUpdateProfileParam) => editUser(param),
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CURRENT_USER]
      });

      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_POSTS_BY_CREATOR]
      });

      return data;
    },
    onError: (error: any) => {
      return error;
    }
  });
};
