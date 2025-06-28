import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ポーカーディーラー求人・情報サイト",
  description: "日本のポーカーディーラー専門の求人情報と店舗・ディーラーレビューを掲載",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-gray-900 text-white">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="text-xl font-bold">ポーカーディーラー.jp</a>
              <div className="flex gap-6 items-center">
                <a href="/rooms" className="hover:text-gray-300">全国の店舗</a>
                <a href="/jobs" className="hover:text-gray-300">求人一覧</a>
                <a href="/salary" className="hover:text-gray-300">時給相場</a>
                <a href="/subscribe" className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-400">求人掲載（月額1万円）</a>
              </div>
            </div>
          </nav>
        </header>
        <main className="min-h-screen bg-gray-50">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-8 mt-12">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2024 ポーカーディーラー.jp - All rights reserved</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
