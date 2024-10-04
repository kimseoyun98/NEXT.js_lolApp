'use client';

import './globals.css';
import { Nanum_Gothic } from 'next/font/google';
import { Navbar } from '@/components/Navbar';
import { useEffect } from 'react';

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
  useEffect(() => {
    const userPreferredDarkMode = localStorage.getItem('darkMode') === 'true';
    if (userPreferredDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    // 현재 다크 모드 상태를 토글하고, 새로운 상태를 변수에 저장
    const darkModeEnabled = document.documentElement.classList.toggle('dark');
    // boolean 값을 문자열로 변환하여 로컬 스토리지에 저장
    localStorage.setItem('darkMode', String(darkModeEnabled)); // 또는 darkModeEnabled.toString() 사용 가능
  };

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
        <button onClick={toggleDarkMode}>다크 모드 전환</button>
        <main className="mt-20 p-6"> {children}</main>
      </body>
    </html>
  );
}
