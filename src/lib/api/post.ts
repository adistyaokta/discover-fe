import { useHttpGet, useHttpPost, useHttpPostFile } from '@/app/http';
import type { IPostData, INewPost } from '@/app/type';

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

export async function getRandomPosts(count: number) {
  try {
    const response = await useHttpGet<IPostData[]>(`/posts/random/${count}`);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Unable to get data');
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
