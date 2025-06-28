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
  title: "ポーカーディーラー求人・情報サイト | Poker Dealer JP",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-poker-black`}
      >
        <header className="poker-gradient border-b-4 border-poker-gold">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-2 text-2xl font-bold text-poker-white">
                <span className="text-poker-red suit-spade text-3xl"></span>
                <span className="text-poker-red suit-heart text-3xl"></span>
                <span>ポーカーディーラー.jp</span>
                <span className="text-poker-black suit-club text-3xl"></span>
                <span className="text-poker-red suit-diamond text-3xl"></span>
              </a>
              <div className="flex gap-6 items-center">
                <a href="/rooms" className="text-poker-white hover:text-poker-gold transition-colors font-semibold">
                  全国の店舗
                </a>
                <a href="/jobs" className="text-poker-white hover:text-poker-gold transition-colors font-semibold">
                  求人一覧
                </a>
                <a href="/salary" className="text-poker-white hover:text-poker-gold transition-colors font-semibold">
                  時給相場
                </a>
                <a href="/subscribe" className="bg-poker-gold text-poker-black px-6 py-2 rounded-full hover:bg-yellow-400 font-bold chip-shadow transition-all hover:scale-105">
                  求人掲載（月額1万円）
                </a>
              </div>
            </div>
          </nav>
        </header>
        
        <main className="min-h-screen">
          <div className="absolute inset-0 opacity-5 bg-repeat" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='40' font-size='30' fill='white'%3E♠%3C/text%3E%3Ctext x='60' y='40' font-size='30' fill='red'%3E♥%3C/text%3E%3Ctext x='10' y='80' font-size='30' fill='red'%3E♦%3C/text%3E%3Ctext x='60' y='80' font-size='30' fill='white'%3E♣%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}></div>
          <div className="relative z-10">
            {children}
          </div>
        </main>
        
        <footer className="poker-gradient border-t-4 border-poker-gold text-poker-white py-12 mt-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-poker-gold mb-4">サービス</h3>
                <ul className="space-y-2">
                  <li><a href="/jobs" className="hover:text-poker-gold">求人検索</a></li>
                  <li><a href="/rooms" className="hover:text-poker-gold">店舗一覧</a></li>
                  <li><a href="/salary" className="hover:text-poker-gold">時給相場</a></li>
                  <li><a href="/subscribe" className="hover:text-poker-gold">求人掲載</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-poker-gold mb-4">エリア</h3>
                <ul className="space-y-2">
                  <li><a href="/rooms#kanto" className="hover:text-poker-gold">関東</a></li>
                  <li><a href="/rooms#kansai" className="hover:text-poker-gold">関西</a></li>
                  <li><a href="/rooms#chubu" className="hover:text-poker-gold">中部</a></li>
                  <li><a href="/rooms#kyushu" className="hover:text-poker-gold">九州</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-poker-gold mb-4">サポート</h3>
                <ul className="space-y-2">
                  <li><a href="https://github.com/hateniri/poker-jp-web/issues" className="hover:text-poker-gold">お問い合わせ</a></li>
                  <li><a href="/review/new" className="hover:text-poker-gold">レビュー投稿</a></li>
                  <li><a href="/terms" className="hover:text-poker-gold">利用規約</a></li>
                  <li><a href="/privacy" className="hover:text-poker-gold">プライバシーポリシー</a></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-poker-gold mb-4">フォローする</h3>
                <p className="mb-4">最新情報をお届けします</p>
                <div className="flex gap-4">
                  <span className="text-2xl suit-spade"></span>
                  <span className="text-2xl suit-heart"></span>
                  <span className="text-2xl suit-diamond"></span>
                  <span className="text-2xl suit-club"></span>
                </div>
              </div>
            </div>
            <div className="text-center pt-8 border-t border-poker-darkred">
              <p>&copy; 2024 ポーカーディーラー.jp - All rights reserved</p>
              <p className="text-sm mt-2 text-poker-silver">日本最大級のポーカーディーラー専門求人サイト</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}