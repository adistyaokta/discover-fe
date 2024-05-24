import { create } from 'zustand';

export type Theme = 'dark' | 'light' | 'system';

export type AppState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme })
}));
