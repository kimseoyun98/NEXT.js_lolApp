import "./globals.css";
import { Nanum_Gothic } from "next/font/google";
import { Navbar } from "@/components/Navbar";

const nanumGothic = Nanum_Gothic({
  weight: ["400", "800"],
  subsets: ["latin"],
  variable: "--font-nanum-gothic",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <main className="mt-20 p-6"> {children}</main>
      </body>
    </html>
  );
}
