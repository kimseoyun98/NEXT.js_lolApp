import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ThemeState = {
  darkMode: boolean; // 다크 모드 상태
  toggleDarkMode: () => void; // 다크 모드 토글 함수
};

export const useThemeStore = create<ThemeState>()(
  // 상태 타입을 generic으로 지정
  persist(
    (set) => ({
      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })), // 다크 모드 토글
    }),
    {
      name: 'theme-storage', // 로컬 스토리지에서 사용할 키
    }
  )
);
