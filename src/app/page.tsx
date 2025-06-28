'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import jobsData from '../../data/jobs.json';
import storesData from '../../data/stores.json';
import dealersData from '../../data/dealers.json';
import PlayingCard from '@/components/PlayingCard';
import PokerChip from '@/components/PokerChip';
import AdSpace from '@/components/AdSpace';

export default function Home() {
  const [showCards, setShowCards] = useState(false);

  useEffect(() => {
    setShowCards(true);
  }, []);
  const recentJobs = jobsData.jobs
    .filter(job => job.status === 'active')
    .slice(0, 3);
    
  const featuredStores = storesData.stores
    .filter(store => store.subscription.status === 'active')
    .slice(0, 3);

  // 実際の店舗から大型店をピックアップ（テーブル数順）
  const largeStores = storesData.stores
    .sort((a, b) => b.table_count - a.table_count)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-16 mb-16 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="text-[200px] font-bold text-poker-red dealer-spin">A♠</div>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 relative z-10">
          <span className="text-poker-red">日本最大級の</span>
          <br />
          <span className="text-poker-gold neon-glow">ポーカーディーラー</span>
          <br />
          <span className="text-poker-white">専門求人サイト</span>
        </h1>
        <p className="text-xl text-poker-silver mb-10">
          全国{storesData.stores.length}店舗のポーカールーム情報と求人を掲載
        </p>
        <div className="flex gap-6 justify-center">
          <Link
            href="/jobs"
            className="bg-poker-red text-white px-10 py-4 rounded-full hover:bg-poker-darkred text-xl font-bold card-shadow transition-all hover:scale-110 flex items-center gap-2 group"
          >
            <span className="suit-heart text-2xl group-hover:scale-125 transition-transform"></span>
            求人を探す
          </Link>
          <Link
            href="/subscribe"
            className="bg-poker-gold text-poker-black px-10 py-4 rounded-full hover:bg-yellow-400 text-xl font-bold chip-shadow transition-all hover:scale-110 flex items-center gap-2 casino-lights"
          >
            <span className="suit-diamond text-2xl"></span>
            求人を掲載する
          </Link>
        </div>
      </section>

      {/* Floating cards animation */}
      <div className="fixed top-20 left-10 z-0 opacity-20">
        {showCards && <PlayingCard suit="heart" rank="A" delay={500} className="transform rotate-12" />}
      </div>
      <div className="fixed top-40 right-20 z-0 opacity-20">
        {showCards && <PlayingCard suit="spade" rank="K" delay={800} className="transform -rotate-12" />}
      </div>
      <div className="fixed bottom-20 left-20 z-0 opacity-20">
        {showCards && <PlayingCard suit="diamond" rank="Q" delay={1100} className="transform rotate-6" />}
      </div>
      <div className="fixed bottom-40 right-10 z-0 opacity-20">
        {showCards && <PlayingCard suit="club" rank="J" delay={1400} className="transform -rotate-6" />}
      </div>

      <section className="grid md:grid-cols-2 gap-8 mb-16 relative z-10">
        <Link href="/rooms" className="felt-gradient rounded-xl p-10 hover:scale-105 transition-all card-shadow group">
          <h2 className="text-3xl font-bold mb-4 text-poker-white flex items-center gap-3">
            <span className="text-4xl suit-club"></span>
            全国のポーカールーム
          </h2>
          <p className="text-poker-white/90 mb-6">エリア別に全国のポーカールームを検索。営業時間や特徴を一覧で確認できます。</p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-poker-black/30 rounded p-3 text-center">
              <div className="text-2xl font-bold text-poker-gold">{storesData.stores.filter(s => s.location.prefecture === '東京都').length}</div>
              <div className="text-sm text-poker-white">東京</div>
            </div>
            <div className="bg-poker-black/30 rounded p-3 text-center">
              <div className="text-2xl font-bold text-poker-gold">{storesData.stores.filter(s => s.location.prefecture === '大阪府').length}</div>
              <div className="text-sm text-poker-white">大阪</div>
            </div>
            <div className="bg-poker-black/30 rounded p-3 text-center">
              <div className="text-2xl font-bold text-poker-gold">{storesData.stores.filter(s => s.location.prefecture === '愛知県').length}</div>
              <div className="text-sm text-poker-white">名古屋</div>
            </div>
          </div>
          <span className="inline-flex items-center text-poker-gold group-hover:text-poker-white font-bold">
            詳しく見る
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
        
        <Link href="/salary" className="bg-gradient-to-br from-poker-red to-poker-darkred rounded-xl p-10 hover:scale-105 transition-all card-shadow group">
          <h2 className="text-3xl font-bold mb-4 text-poker-white flex items-center gap-3">
            <span className="text-4xl suit-spade"></span>
            本日の時給相場
          </h2>
          <p className="text-poker-white/90 mb-6">リアルタイムで更新される全国の時給データ。エリア別の相場を確認できます。</p>
          <div className="bg-poker-black/30 rounded-lg p-4 mb-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-poker-gold mb-2">¥2,250</div>
              <div className="text-poker-white">全国平均時給</div>
            </div>
          </div>
          <span className="inline-flex items-center text-poker-gold group-hover:text-poker-white font-bold">
            相場を確認
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </section>

      {/* 広告スペース - ヒーローセクションの下 */}
      <div className="mb-12 flex justify-center">
        <AdSpace variant="banner" slot="home-hero-bottom" />
      </div>

      <section className="mb-16 relative z-10">
        <h2 className="text-4xl font-bold mb-8 text-center text-poker-white">
          <span className="suit-heart text-poker-red mr-3 neon-flash"></span>
          大型ポーカールーム
          <span className="suit-diamond text-poker-red ml-3 neon-flash"></span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {largeStores.map((store, index) => (
            <Link
              key={store.id}
              href={`/store/${store.id}`}
              className="bg-poker-black/50 border-2 border-poker-gold/30 rounded-lg p-6 hover:border-poker-gold transition-all hover:scale-105 card-shadow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 bg-poker-gold text-poker-black px-4 py-1 rounded-bl-lg font-bold group-hover:casino-lights">
                #{index + 1}
              </div>
              <h3 className="text-xl font-bold mb-3 text-poker-white">{store.name}</h3>
              <p className="text-poker-silver mb-2">{store.location.prefecture} {store.location.city}</p>
              <div className="flex items-center mb-4">
                <span className="text-2xl text-poker-gold">🎰</span>
                <span className="font-bold ml-1 text-2xl text-poker-white">{store.table_count}テーブル</span>
                <span className="text-poker-silver ml-2">稼働中</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {store.features.slice(0, 3).map((feature, idx) => (
                  <span key={idx} className="text-xs bg-poker-green/20 text-poker-green px-2 py-1 rounded">
                    {feature}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 広告スペース - 大型ポーカールームセクションの下 */}
      <div className="mb-12 flex justify-center">
        <AdSpace variant="horizontal" slot="home-stores-bottom" className="max-w-4xl w-full" />
      </div>

      <section className="mb-16 relative z-10">
        <div className="bg-gradient-to-r from-poker-darkgreen via-poker-black to-poker-darkred rounded-xl p-8 gradient-shift">
          <h2 className="text-3xl font-bold mb-8 text-center text-poker-gold">
            なぜポーカーディーラー.jpが選ばれるのか
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center group">
              <div className="text-5xl mb-4 group-hover:dealer-spin">♠</div>
              <h3 className="text-lg font-bold mb-2 text-poker-white">豊富な求人数</h3>
              <p className="text-poker-silver text-sm">
                全国のポーカールームから最新求人情報を掲載
              </p>
            </div>
            <div className="text-center group">
              <div className="text-5xl mb-4 text-poker-red group-hover:scale-125 transition-transform">♥</div>
              <h3 className="text-lg font-bold mb-2 text-poker-white">信頼の実績</h3>
              <p className="text-poker-silver text-sm">
                {storesData.stores.reduce((sum, s) => sum + s.table_count, 0)}テーブル全国で稼働中
              </p>
            </div>
            <div className="text-center group">
              <div className="text-5xl mb-4 text-poker-red group-hover:rotate-180 transition-transform">♦</div>
              <h3 className="text-lg font-bold mb-2 text-poker-white">簡単応募</h3>
              <p className="text-poker-silver text-sm">
                気になる求人にワンクリックで応募可能
              </p>
            </div>
            <div className="text-center group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">♣</div>
              <h3 className="text-lg font-bold mb-2 text-poker-white">完全無料</h3>
              <p className="text-poker-silver text-sm">
                求職者は全機能を無料で利用可能
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-8 text-poker-white">統計情報</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="bg-poker-black/50 border-2 border-poker-red/50 rounded-lg p-6 card-shadow">
            <div className="text-4xl font-bold text-poker-red mb-2">{jobsData.jobs.length}</div>
            <div className="text-poker-silver">掲載求人数</div>
          </div>
          <div className="bg-poker-black/50 border-2 border-poker-green/50 rounded-lg p-6 card-shadow">
            <div className="text-4xl font-bold text-poker-green mb-2">{storesData.stores.length}</div>
            <div className="text-poker-silver">登録店舗数</div>
          </div>
          <div className="bg-poker-black/50 border-2 border-poker-gold/50 rounded-lg p-6 card-shadow">
            <div className="text-4xl font-bold text-poker-gold mb-2">{dealersData.dealers.length}</div>
            <div className="text-poker-silver">登録ディーラー数</div>
          </div>
          <div className="bg-poker-black/50 border-2 border-blue-500/50 rounded-lg p-6 card-shadow">
            <div className="text-4xl font-bold text-blue-400 mb-2">1,500+</div>
            <div className="text-poker-silver">月間利用者数</div>
          </div>
        </div>
      </section>
    </div>
  );
}