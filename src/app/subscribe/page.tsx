'use client';

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [storeName, setStoreName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Stripe Checkoutセッションを作成
      const response = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          storeName,
          email,
        }),
      });

      if (!response.ok) {
        throw new Error('決済セッションの作成に失敗しました');
      }

      const { url } = await response.json();

      // Stripe Checkoutページへリダイレクト
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
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">求人掲載プラン</h1>
        
        <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">プレミアムプラン</h2>
          <div className="text-4xl font-bold mb-4">
            月額 <span className="text-yellow-600">¥10,000</span>
          </div>
          
          <ul className="space-y-3 mb-6">
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>求人を無制限に掲載可能</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>プレミアム表示で上位掲載</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>店舗情報の詳細ページ作成</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>ディーラーからの応募を優先受信</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>レビュー・評価機能</span>
            </li>
            <li className="flex items-start">
              <span className="text-green-600 mr-2">✓</span>
              <span>いつでも解約可能</span>
            </li>
          </ul>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">店舗名</label>
            <input
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="ポーカールーム新宿"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="info@example.com"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-black py-3 rounded-md hover:bg-yellow-400 font-semibold disabled:opacity-50"
          >
            {loading ? '処理中...' : 'Stripeで支払いを開始'}
          </button>
        </form>

        <div className="mt-8 space-y-4 text-sm text-gray-600">
          <p>※ クレジットカード決済はStripeを使用します（安全・セキュア）</p>
          <p>※ 月額課金は自動更新されます</p>
          <p>※ いつでもキャンセル可能です</p>
        </div>

        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-2">決済後の流れ</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>決済完了メールが届きます</li>
            <li>メール内の認証コードを確認</li>
            <li>GitHub IssueまたはGoogle Formから求人投稿</li>
            <li>投稿時に認証コードを入力</li>
            <li>承認後、サイトに求人が掲載されます</li>
          </ol>
        </div>

        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">テスト決済用カード番号</h3>
          <p className="text-sm text-gray-700 mb-2">開発環境では以下のテストカードをご利用ください：</p>
          <ul className="text-sm text-gray-700 space-y-1">
            <li>• カード番号: 4242 4242 4242 4242</li>
            <li>• 有効期限: 任意の未来の日付</li>
            <li>• CVC: 任意の3桁</li>
            <li>• 郵便番号: 任意の5桁</li>
          </ul>
        </div>
      </div>
    </div>
  );
}