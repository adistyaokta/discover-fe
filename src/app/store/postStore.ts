import { create } from 'zustand';
import { http } from '../http';

type PostData = {
  id: number;
  caption: string;
  media: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
};

type PostStore = {
  post: PostData | null;
  loading: boolean;
  success: boolean;
  error: boolean;
  errorData: null;
  getPostData: () => Promise<void>;
};

const initialState = {
  post: null,
  loading: false,
  success: false,
  error: false,
  errorData: null
};

export const usePostStore = create<PostStore>((set) => ({
  ...initialState,
  getPostData: async () => {
    set({ ...initialState, loading: true });
    try {
      const response = await http.get('/posts');
      set({ ...initialState, success: true, post: response.data });
    } catch (err: any) {
      console.error('Error in data fetch: ', err);
      set({ ...initialState, error: true, errorData: err.message });
    }
  }
}));
