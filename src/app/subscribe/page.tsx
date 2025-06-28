'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import DealerButton from '@/components/DealerButton';
import PokerChip from '@/components/PokerChip';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [storeName, setStoreName] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeName,
          email,
          priceId: selectedPlan === 'monthly' 
            ? process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID
            : process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID,
        }),
      });

      if (!response.ok) {
        throw new Error('決済セッションの作成に失敗しました');
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      }
    } catch (err: any) {
      setError(err.message || '予期しないエラーが発生しました');
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-5xl font-bold text-center mb-6 text-poker-gold neon-glow">
        求人掲載プラン
      </h1>
      
      <p className="text-center text-xl text-poker-silver mb-12">
        日本最大級のポーカーディーラー専門求人サイトで優秀な人材を見つけよう
      </p>

      <div className="flex justify-center gap-4 mb-12">
        <PokerChip value={10000} color="red" className="chip-stack" />
        <PokerChip value={10000} color="green" className="chip-stack animation-delay-200" />
        <PokerChip value={10000} color="black" className="chip-stack animation-delay-400" />
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center mb-8">
          <div className="bg-poker-black/50 border-2 border-poker-gold/30 rounded-full p-1 flex">
            <button
              onClick={() => setSelectedPlan('monthly')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                selectedPlan === 'monthly' 
                  ? 'bg-poker-gold text-poker-black' 
                  : 'text-poker-silver hover:text-poker-white'
              }`}
            >
              月額プラン
            </button>
            <button
              onClick={() => setSelectedPlan('yearly')}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                selectedPlan === 'yearly' 
                  ? 'bg-poker-gold text-poker-black' 
                  : 'text-poker-silver hover:text-poker-white'
              }`}
            >
              年額プラン
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className={`bg-poker-black/50 border-4 rounded-xl p-8 transition-all ${
            selectedPlan === 'monthly' 
              ? 'border-poker-gold scale-105 casino-lights' 
              : 'border-poker-gold/30'
          }`}>
            <h2 className="text-3xl font-bold mb-4 text-poker-white flex items-center gap-2">
              <span className="suit-heart text-poker-red"></span>
              月額プラン
            </h2>
            <div className="mb-6">
              <span className="text-5xl font-bold text-poker-gold">¥10,000</span>
              <span className="text-poker-silver">/月</span>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-poker-green text-xl">✓</span>
                <span className="text-poker-white">求人掲載数無制限</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-poker-green text-xl">✓</span>
                <span className="text-poker-white">プレミアム表示</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-poker-green text-xl">✓</span>
                <span className="text-poker-white">応募者データ分析</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-poker-green text-xl">✓</span>
                <span className="text-poker-white">優先サポート</span>
              </li>
            </ul>
          </div>

          <div className={`bg-poker-black/50 border-4 rounded-xl p-8 transition-all relative ${
            selectedPlan === 'yearly' 
              ? 'border-poker-gold scale-105 casino-lights' 
              : 'border-poker-gold/30'
          }`}>
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-poker-red text-white px-4 py-1 rounded-full text-sm font-bold">
              2ヶ月分お得！
            </div>
            <h2 className="text-3xl font-bold mb-4 text-poker-white flex items-center gap-2">
              <span className="suit-diamond text-poker-red"></span>
              年額プラン
            </h2>
            <div className="mb-6">
              <span className="text-5xl font-bold text-poker-gold">¥100,000</span>
              <span className="text-poker-silver">/年</span>
              <p className="text-sm text-poker-green mt-2">月額換算 ¥8,333</p>
            </div>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-2">
                <span className="text-poker-green text-xl">✓</span>
                <span className="text-poker-white">月額プランの全機能</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-poker-gold text-xl">★</span>
                <span className="text-poker-white">年間レポート作成</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-poker-gold text-xl">★</span>
                <span className="text-poker-white">採用コンサルティング</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-poker-gold text-xl">★</span>
                <span className="text-poker-white">2ヶ月分無料</span>
              </li>
            </ul>
          </div>
        </div>

        {error && (
          <div className="bg-poker-red/20 border border-poker-red text-poker-red px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 bg-poker-black/50 border-2 border-poker-gold/30 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-poker-white mb-6">お申し込み情報</h3>
          
          <div>
            <label className="block text-poker-gold font-medium mb-2">店舗名</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-4 py-3 bg-poker-black/50 border-2 border-poker-gold/30 rounded-md text-poker-white placeholder-poker-silver focus:border-poker-gold outline-none"
              placeholder="ポーカールーム新宿"
              required
            />
          </div>

          <div>
            <label className="block text-poker-gold font-medium mb-2">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-poker-black/50 border-2 border-poker-gold/30 rounded-md text-poker-white placeholder-poker-silver focus:border-poker-gold outline-none"
              placeholder="info@example.com"
              required
            />
          </div>

          <DealerButton
            text={loading ? '処理中...' : 'Stripeで支払いを開始'}
            variant="gold"
            size="lg"
            className="w-full"
            icon="💳"
            type="submit"
            disabled={loading}
          />
        </form>

        <div className="mt-8 space-y-4 text-sm text-poker-silver">
          <p className="flex items-center gap-2">
            <span className="text-poker-green">✓</span>
            クレジットカード決済はStripeを使用します（安全・セキュア）
          </p>
          <p className="flex items-center gap-2">
            <span className="text-poker-green">✓</span>
            月額課金は自動更新されます
          </p>
          <p className="flex items-center gap-2">
            <span className="text-poker-green">✓</span>
            いつでもキャンセル可能です
          </p>
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-poker-darkgreen to-poker-green rounded-xl border-2 border-poker-gold/30">
          <h3 className="font-bold text-poker-gold mb-4 text-xl">決済後の流れ</h3>
          <ol className="list-decimal list-inside space-y-2 text-poker-white">
            <li>決済完了メールが届きます</li>
            <li>メール内の認証コードを確認</li>
            <li>GitHub IssueまたはGoogle Formから求人投稿</li>
            <li>投稿時に認証コードを入力</li>
            <li>承認後、サイトに求人が掲載されます</li>
          </ol>
        </div>

        <div className="mt-8 p-6 bg-poker-black/50 rounded-xl border-2 border-blue-500/30">
          <h3 className="font-bold text-blue-400 mb-4">テスト決済用カード番号</h3>
          <p className="text-sm text-poker-silver mb-2">開発環境では以下のテストカードをご利用ください：</p>
          <ul className="text-sm text-poker-silver space-y-1">
            <li>• カード番号: 4242 4242 4242 4242</li>
            <li>• 有効期限: 任意の未来の日付</li>
            <li>• CVC: 任意の3桁</li>
            <li>• 郵便番号: 任意の5桁</li>
          </ul>
        </div>
      </div>
      
      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
}