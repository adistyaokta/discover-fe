import { create } from 'zustand';

export type Theme = 'dark' | 'light' | 'system';

export type AppState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isScrolling: boolean;
  setScrolling: (scrolling: boolean) => void;
};

export const useAppStore = create<AppState>((set) => ({
  theme: 'light',
  setTheme: (theme) => set({ theme }),
  isScrolling: false,
  setScrolling: (scrolling) => set({ isScrolling: scrolling })
}));
