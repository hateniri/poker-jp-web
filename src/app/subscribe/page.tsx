'use client';

import { useState } from 'react';

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [storeName, setStoreName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 本番環境ではここでStripe Checkoutへリダイレクト
    alert(`Stripe決済ページへリダイレクトします。\n店舗名: ${storeName}\nメール: ${email}`);
    
    // デモ用: Stripe Checkout URLの例
    const stripeCheckoutUrl = `https://checkout.stripe.com/pay/cs_test_xxx?prefilled_email=${encodeURIComponent(email)}`;
    
    // window.location.href = stripeCheckoutUrl;
    setLoading(false);
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
          <p>※ クレジットカード決済はStripeを使用します</p>
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
      </div>
    </div>
  );
}