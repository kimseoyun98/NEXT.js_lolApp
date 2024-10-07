'use client';

import './globals.css';
import { Nanum_Gothic } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { useEffect } from 'react';
import { useThemeStore } from '@/utils/store/useThemeStore';
import ThemeSwitchButton from '@/components/ThemeSwitch';
import { Metadata } from 'next';

const nanumGothic = Nanum_Gothic({
  weight: ['400', '800'],
  subsets: ['latin'],
  variable: '--font-nanum-gothic',
});

export const metadata: Metadata = {
  title: '리그오브레전드 정보 앱',
  description: '리그오브레전드 정보 앱입니다',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { darkMode } = useThemeStore();

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
        <div className="flex flex-col justify-center min-h-screen">
          <main>{children}</main>
        </div>
        <ThemeSwitchButton />
      </body>
    </html>
  );
}
