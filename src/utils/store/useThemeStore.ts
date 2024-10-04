import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

export const useThemeStore = create<ThemeState>()(
  // 상태 타입을 generic으로 지정
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'theme-storage',
    }
  )
);
