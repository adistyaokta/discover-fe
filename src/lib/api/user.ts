import { useHttpDelete, useHttpGet, useHttpPatch, useHttpPost } from '@/app/http';
import type { IUpdateProfileParam, IUser } from '@/app/type';

export async function getUserDetail(id: number) {
  try {
    const response = await useHttpGet<IUser>(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Unable to get post by author');
  }
}

export async function editUser({ id, user: updatedUser }: IUpdateProfileParam) {
  try {
    const response = await useHttpPatch(`/users/${id}`, updatedUser);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Unable to update data');
  }
}

export async function followUser(followedUserId: number) {
  try {
    const response = await useHttpPost(`/users/following/${followedUserId}`);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Unable to follow user');
  }
}

export async function unfollowUser(followedUserId: number) {
  try {
    const response = await useHttpDelete(`/users/following/${followedUserId}`);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Unable to follow user');
  }
}
