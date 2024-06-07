import axios from 'axios';
import type { BaseResponse, BaseGetAllResponse } from './http.type';
import type { GetParam } from '../type';

export const sleeper = (s: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, s * 1000);
  });
};

const getToken = () => {
  const local = localStorage.getItem('auth-store');
  const data = JSON.parse(local!);

  const token = data.state.token;
  return token;
};

export const http = axios.create({
  baseURL: `${import.meta.env.VITE_BE_SERVER}`,
  // timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const httpFile = axios.create({
  baseURL: `${import.meta.env.VITE_BE_SERVER}`,
  timeout: 3000,
  headers: { 'Content-Type': 'multipart/form-data' }
});

export const useHttpGet = async <T>(endpoint: string, params?: any) => {
  return http.get<any, BaseResponse<T>>(endpoint, { params });
};

export const useHttpFile = async (path: string) => {
  return http.get<any, File>(path, {
    responseType: 'blob'
  });
};

export const useHttpPostFile = async <T>(endpoint: string, body?: any) => {
  return http.post<any, T>(endpoint, body, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
};

export const useHttpGetAll = async <T>(endpoint: string, params?: GetParam) => {
  return http.get<any, BaseGetAllResponse<T>>(endpoint, { params });
};

export const useHttpPost = async <T>(endpoint: string, body?: any) => {
  return http.post<any, BaseResponse<T>>(endpoint, body);
};

export const useHttpPut = async <T>(endpoint: string, body?: any) => {
  return http.put<any, BaseResponse<T>>(endpoint, body);
};

export const useHttpPatch = async <T>(endpoint: string, body?: any) => {
  return http.patch<any, BaseResponse<T>>(endpoint, body);
};

export const useHttpDelete = async <T>(endpoint: string) => {
  return http.delete<any, BaseResponse<T>>(endpoint);
};
