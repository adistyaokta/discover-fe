import { useHttpPost } from '@/app/http';
import type { AuthResponse } from '@/app/type';

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
    return Promise.reject(error.response?.data?.message || error.message || 'Login failed');
  }
}
