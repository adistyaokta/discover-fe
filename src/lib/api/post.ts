import { useHttpDelete, useHttpGet, useHttpPost } from '@/app/http';
import type { ILikePost, INewPost, IPostData } from '@/app/type';

export async function getRecentPosts() {
  try {
    const response = await useHttpGet<IPostData[]>('/posts/recent');
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Unable to get data');
  }
}

export async function createPost(post: INewPost) {
  try {
    const response = await useHttpPost('/posts', post);

    return response;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Unable to get data');
  }
}

export async function getPostByAuthor(authorId: number) {
  try {
    const response = await useHttpGet<IPostData[]>(`/posts/author/${authorId}`);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Unable to get data');
  }
}

// export async function getRandomPosts(count: number) {
//   try {
//     const response = await useHttpGet<IPostData[]>(`/posts/random/${count}`);
//     return response.data;
//   } catch (error: any) {
//     return Promise.reject(error.response?.data?.message || error.message || 'Unable to get data');
//   }
// }

export async function searchPosts(s: string) {
  try {
    const response = await useHttpGet<IPostData[]>('/posts/trending', {
      s
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPostDetail(id: number) {
  try {
    const response = await useHttpGet<IPostData>(`/posts/${id}`);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Unable to get post detail');
  }
}

export async function deletePost(id: string | number) {
  try {
    const response = await useHttpDelete<IPostData>(`/posts/${id}`);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response.data.message);
  }
}

export async function likeUnlikePost(postId: number) {
  try {
    const response = await useHttpPost<ILikePost>(`/posts/${postId}/like`);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response.data.message);
  }
}
