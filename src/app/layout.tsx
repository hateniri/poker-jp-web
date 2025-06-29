import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import AdManager from "@/components/AdManager";
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
  manifest: "/manifest.json",
  icons: {
    icon: "/spade-icon.svg",
    apple: "/spade-icon.svg",
  },
  themeColor: "#1a1a1a",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
  openGraph: {
    title: "ポーカーディーラー.jp - 日本最大級のポーカーディーラー専門求人サイト",
    description: "全国のポーカールームの求人情報を掲載。時給相場、店舗情報、ディーラー向けの情報が満載。",
    url: "https://poker-dealer.jp",
    siteName: "ポーカーディーラー.jp",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ポーカーディーラー.jp",
    description: "日本最大級のポーカーディーラー専門求人サイト",
  },
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
        <AdManager />
        <header className="poker-gradient border-b-4 border-poker-gold relative z-50">
          <Navigation />
        </header>
        
        <main className="min-h-screen relative">
          <div className="absolute inset-0 opacity-5 bg-repeat pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='10' y='40' font-size='30' fill='white'%3E♠%3C/text%3E%3Ctext x='60' y='40' font-size='30' fill='red'%3E♥%3C/text%3E%3Ctext x='10' y='80' font-size='30' fill='red'%3E♦%3C/text%3E%3Ctext x='60' y='80' font-size='30' fill='white'%3E♣%3C/text%3E%3C/svg%3E")`,
            backgroundSize: '100px 100px'
          }}></div>
          <div className="relative z-10">
            {children}
          </div>
        </main>
        
        <footer className="poker-gradient border-t-4 border-poker-gold text-poker-white py-12 mt-20 relative">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div>
                <h3 className="font-bold text-poker-gold mb-4">サービス</h3>
                <ul className="space-y-2">
                  <li><Link href="/jobs" className="hover:text-poker-gold">求人検索</Link></li>
                  <li><Link href="/rooms" className="hover:text-poker-gold">店舗一覧</Link></li>
                  <li><Link href="/salary" className="hover:text-poker-gold">時給相場</Link></li>
                  <li><Link href="/subscribe" className="hover:text-poker-gold">求人掲載</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-poker-gold mb-4">エリア</h3>
                <ul className="space-y-2">
                  <li><Link href="/rooms#kanto" className="hover:text-poker-gold">関東</Link></li>
                  <li><Link href="/rooms#kansai" className="hover:text-poker-gold">関西</Link></li>
                  <li><Link href="/rooms#chubu" className="hover:text-poker-gold">中部</Link></li>
                  <li><Link href="/rooms#kyushu" className="hover:text-poker-gold">九州</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-poker-gold mb-4">サポート</h3>
                <ul className="space-y-2">
                  <li><a href="https://github.com/hateniri/poker-jp-web/issues" target="_blank" rel="noopener noreferrer" className="hover:text-poker-gold">お問い合わせ</a></li>
                  <li><Link href="/review/new" className="hover:text-poker-gold">レビュー投稿</Link></li>
                  <li><Link href="/terms" className="hover:text-poker-gold">利用規約</Link></li>
                  <li><Link href="/privacy" className="hover:text-poker-gold">プライバシーポリシー</Link></li>
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