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
      onClick={toggleDarkMode}
      className="fixed bottom-8 right-8 size-12 bg-white dark:bg-slate-900 dark:text-white rounded-full shadow-md flex items-center justify-center"
    >
      {darkMode ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeSwitchButton;
