import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type User = {
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
  login: (user: User, token: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (user: User, token: string) => Promise<void>;
};

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      login: async (user, token) => {
        try {
          set({
            user,
            token,
            isAuthenticated: true
          });
        } catch (error) {
          console.error('Failed to login', error);
        }
      },
      logout: async () => {
        try {
          set({
            user: null,
            token: null,
            isAuthenticated: false
          });
        } catch (error) {
          console.error('Failed to logout', error);
        }
      },
      signup: async (user, token) => {
        try {
          set({
            user,
            token,
            isAuthenticated: true
          });
        } catch (error) {
          console.error('Failed to register', error);
        }
      }
    }),
    {
      name: 'auth-store'
    }
  )
);
