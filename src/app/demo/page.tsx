'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PlayingCard from '@/components/PlayingCard';
import PokerChip from '@/components/PokerChip';
import DealerButton from '@/components/DealerButton';
import PokerTable from '@/components/PokerTable';

export default function DemoPage() {
  const [chips, setChips] = useState(10000);
  const router = useRouter();

  const handleBet = (amount: number) => {
    if (chips >= amount) {
      setChips(chips - amount);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-poker-gold neon-glow">
        ポーカーUIコンポーネントデモ
      </h1>

      {/* Playing Cards Demo */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-poker-white flex items-center gap-2">
          <span className="suit-spade"></span>
          プレイングカード
        </h2>
        <div className="flex gap-4 justify-center flex-wrap">
          <PlayingCard suit="spade" rank="A" delay={0} />
          <PlayingCard suit="heart" rank="K" delay={100} />
          <PlayingCard suit="diamond" rank="Q" delay={200} />
          <PlayingCard suit="club" rank="J" delay={300} />
          <PlayingCard suit="heart" rank="10" delay={400} isFlipped={true} />
        </div>
      </section>

      {/* Poker Chips Demo */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-poker-white flex items-center gap-2">
          <span className="suit-diamond text-poker-red"></span>
          ポーカーチップ
        </h2>
        <div className="flex gap-4 justify-center items-center flex-wrap">
          <PokerChip value={100} color="white" onClick={() => handleBet(100)} />
          <PokerChip value={500} color="red" onClick={() => handleBet(500)} />
          <PokerChip value={1000} color="green" onClick={() => handleBet(1000)} />
          <PokerChip value={5000} color="black" onClick={() => handleBet(5000)} />
          <PokerChip value={10000} color="blue" onClick={() => handleBet(10000)} />
        </div>
        <p className="text-center mt-4 text-poker-gold text-xl">
          所持チップ: ¥{chips.toLocaleString()}
        </p>
      </section>

      {/* Dealer Buttons Demo */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-poker-white flex items-center gap-2">
          <span className="suit-heart text-poker-red"></span>
          ディーラーボタン
        </h2>
        <div className="flex gap-4 justify-center flex-wrap">
          <DealerButton text="ベット" variant="primary" icon="💰" />
          <DealerButton text="コール" variant="secondary" icon="✓" />
          <DealerButton text="レイズ" variant="gold" icon="⬆" size="lg" />
          <DealerButton text="フォールド" variant="primary" size="sm" />
          <DealerButton text="オールイン" variant="gold" className="casino-lights" icon="🎯" />
        </div>
      </section>

      {/* Poker Table Demo */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-poker-white flex items-center gap-2">
          <span className="suit-club"></span>
          ポーカーテーブル
        </h2>
        <PokerTable>
          <div className="text-center">
            <h3 className="text-3xl font-bold text-poker-gold mb-4 neon-glow">
              ポーカーディーラー.jp
            </h3>
            <p className="text-poker-white mb-6">
              日本最大級のポーカーディーラー専門求人サイト
            </p>
            <div className="flex gap-4 justify-center mb-6">
              <PlayingCard suit="heart" rank="A" />
              <PlayingCard suit="spade" rank="A" />
            </div>
            <DealerButton 
              text="今すぐ求人を探す" 
              variant="gold" 
              size="lg" 
              className="pulse-glow"
              onClick={() => router.push('/jobs')}
            />
          </div>
        </PokerTable>
      </section>

      {/* Animation Showcase */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-poker-white">
          アニメーション効果
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-poker-black/50 border-2 border-poker-gold/30 rounded-lg p-6 card-shadow">
            <h3 className="font-bold mb-3 text-poker-gold neon-flash">ネオンフラッシュ</h3>
            <p className="text-poker-silver">テキストが点滅します</p>
          </div>
          <div className="bg-poker-black/50 border-2 border-poker-red/30 rounded-lg p-6 pulse-glow">
            <h3 className="font-bold mb-3 text-poker-white">パルスグロー</h3>
            <p className="text-poker-silver">要素が脈動します</p>
          </div>
          <div className="bg-gradient-to-r from-poker-red via-poker-gold to-poker-green gradient-shift rounded-lg p-6 text-poker-black">
            <h3 className="font-bold mb-3">グラデーションシフト</h3>
            <p>背景が動きます</p>
          </div>
        </div>
      </section>
    </div>
  );
}