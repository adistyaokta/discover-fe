import { useHttpGet } from '@/app/http';
import type { IUser } from '@/app/type';

export async function getUserDetail(id: number) {
  try {
    const response = await useHttpGet<IUser>(`/users/${id}`);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Unable to get post by author');
  }
}
