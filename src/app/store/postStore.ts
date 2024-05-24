import { create } from 'zustand';
import { http } from '../http';
import type { IPostData } from '../type';

type PostStore = {
  posts: IPostData[] | null;
  loading: boolean;
  success: boolean;
  error: boolean;
  errorData: null;
  getPostData: (token: string) => Promise<void>;
};

const initialState = {
  posts: null,
  loading: false,
  success: false,
  error: false,
  errorData: null
};

export const usePostStore = create<PostStore>((set) => ({
  ...initialState,
  getPostData: async () => {
    set({ ...initialState, loading: true });
    const token = localStorage.getItem('token');
    try {
      console.log(token, 'tkn');
      const response = await http.get('/posts', {
        headers: { Authorization: `Bearer ${token}` }
      });
      set({ ...initialState, success: true, posts: response.data });
    } catch (err: any) {
      console.error('Error in data fetch: ', err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  }
}));
