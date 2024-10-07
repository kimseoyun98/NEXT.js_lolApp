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
      aria-label={darkMode ? 'Light mode' : 'Dark mode'}
      className="fixed bottom-8 right-8 p-4 bg-white dark:bg-gray-900 dark:text-white rounded-full shadow-lg flex items-center justify-center transition duration-200 ease-in-out"
    >
      {darkMode ? (
        <Moon className="transition-transform duration-200" />
      ) : (
        <Sun className="transition-transform duration-200" />
      )}
    </button>
  );
};

export default ThemeSwitchButton;
