import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { IUser } from '../type';

type AuthStore = {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isDemo?: boolean;
  login: (user: IUser, token: string) => Promise<void>;
  logout: () => Promise<void>;
  signup: (user: IUser, token: string) => Promise<void>;
  updateUser: (user: IUser) => Promise<void>;
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
      },
      updateUser: async (updatedUserData) => {
        try {
          set({
            user: updatedUserData
          });
        } catch (error) {
          console.error('Failed to update profile', error);
        }
      }
    }),
    {
      name: 'auth-store'
    }
  )
);
