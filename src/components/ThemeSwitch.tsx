'use client';
import { useThemeStore } from '@/utils/store/useThemeStore';
import { Moon, Sun } from 'lucide-react';
import React, { useEffect } from 'react';

const ThemeSwitchButton = () => {
  const { darkMode, toggleDarkMode } = useThemeStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={toggleDarkMode} // 버튼 클릭 시 다크 모드 토글
      className="fixed bottom-4 right-4 size-12 bg-white dark:bg-slate-900 dark:text-white rounded-full shadow-md flex items-center justify-center"
    >
      {darkMode ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeSwitchButton;
