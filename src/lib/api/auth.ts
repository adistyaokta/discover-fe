import { useHttpPost, useHttpPostFile } from '@/app/http';
import type { AuthResponse, FileResponse } from '@/app/type';

export async function signInAccount(username: string, password: string) {
  try {
    const response = await useHttpPost<AuthResponse>('/auth/login', { username, password });
    const { user, accessToken: token } = response.data;

    return { user, token };
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Login failed');
  }
}

export async function createAccount(username: string, email: string, password: string) {
  try {
    const response = await useHttpPost<AuthResponse>('/users', { username, email, password });
    const { user, accessToken: token } = response.data;

    return { user, token };
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Failed to register.');
  }
}

export async function uploadImage(image: File) {
  const formData = new FormData();
  formData.append('image', image);

  try {
    const response = await useHttpPostFile<FileResponse>('/images/upload', formData);
    const { filePath, data, message } = response.data;

    return { filePath, data, message };
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || 'Failed to upload image');
  }
}
