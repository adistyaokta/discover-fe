import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { http } from '../http';

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  name: string;
};

type AuthStore = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<boolean>;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (username, password) => {
        try {
          const response = await http.post('/auth/login', { username, password });
          const { user, token } = response.data;
          set({
            user,
            token,
            isAuthenticated: true
          });
          return true;
        } catch (error) {
          console.error('Failed to login', error);
          return false;
        }
      },
      logout: async () => {
        try {
          set({
            user: null,
            token: null,
            isAuthenticated: false
          });
          localStorage.clear();
        } catch (error) {
          console.error('Failed to logout', error);
        }
      },
      signup: async (username, email, password) => {
        try {
          const response = await http.post('/users', { username, email, password });
          const { user, token } = response.data;
          set({
            user,
            token,
            isAuthenticated: true
          });
          return true;
        } catch (error) {
          console.error('Failed to register', error);
          return false;
        }
      }
    }),
    {
      name: 'auth-store'
    }
  )
);
