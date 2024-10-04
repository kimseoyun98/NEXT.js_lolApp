'use client';
import { useThemeStore } from '@/utils/store/useThemeStore';
import { Moon, Sun } from 'lucide-react';
import React, { useEffect } from 'react';

const ThemeSwitchButton = () => {
  const { darkMode, toggleDarkMode } = useThemeStore(); // Zustand 스토어에서 상태 및 함수를 가져옴

  // 페이지가 로드될 때 다크 모드 적용
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
      {darkMode ? <Moon /> : <Sun />} {/* 다크 모드 상태에 따라 아이콘 변경 */}
    </button>
  );
};

export default ThemeSwitchButton;
