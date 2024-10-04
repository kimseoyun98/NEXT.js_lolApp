'use client';

import './globals.css';
import { Nanum_Gothic } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { useEffect } from 'react';
import { useThemeStore } from '@/utils/store/useThemeStore';
import ThemeSwitchButton from '@/components/ThemeSwitch';

const nanumGothic = Nanum_Gothic({
  weight: ['400', '800'],
  subsets: ['latin'],
  variable: '--font-nanum-gothic',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkMode } = useThemeStore(); // Zustand 스토어에서 다크 모드 상태 가져오기

  // 다크 모드에 따라 클래스 토글
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <html lang="ko">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Nanum+Gothic:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${nanumGothic.variable} antialiased`}>
        <Navbar />
        <main className="mt-20 p-6">{children}</main>
        <div className="fixed bottom-5 right-5"></div>
        <ThemeSwitchButton />
      </body>
    </html>
  );
}
