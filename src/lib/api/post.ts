import { useHttpGet, useHttpPost } from '@/app/http';
import type { IPostData, INewPost } from '@/app/type';

export async function getRecentPosts() {
  try {
    const response = await useHttpGet<IPostData[]>('/posts');
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
