'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function SubscribeSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionId) {
      // セッション情報を確認（オプション）
      verifySession();
    } else {
      setError('セッションIDが見つかりません');
      setLoading(false);
    }
  }, [sessionId]);

  const verifySession = async () => {
    try {
      // ここでセッション情報を確認できます
      setLoading(false);
    } catch (err) {
      setError('セッションの確認に失敗しました');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-gray-600">確認中...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
          <Link href="/subscribe" className="text-blue-600 hover:underline">
            申込みページに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold mb-4">決済が完了しました！</h1>
          <p className="text-gray-600">プレミアムプランへようこそ</p>
        </div>

        <div className="bg-green-50 border border-green-400 text-green-700 px-6 py-4 rounded-lg mb-8">
          <p className="font-semibold mb-2">✅ 月額10,000円のサブスクリプションが開始されました</p>
          <p className="text-sm">ご登録のメールアドレスに確認メールをお送りしました。</p>
        </div>

        <div className="bg-white border rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">次のステップ</h2>
          <ol className="space-y-4">
            <li className="flex">
              <span className="font-bold text-blue-600 mr-3">1.</span>
              <div>
                <p className="font-semibold">確認メールをチェック</p>
                <p className="text-sm text-gray-600">登録メールアドレスに認証コードが記載されたメールが届きます</p>
              </div>
            </li>
            <li className="flex">
              <span className="font-bold text-blue-600 mr-3">2.</span>
              <div>
                <p className="font-semibold">求人を投稿</p>
                <p className="text-sm text-gray-600">
                  <a href="https://github.com/hateniri/poker-jp-web/issues/new" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    GitHub Issue
                  </a>
                  から求人情報を投稿してください
                </p>
              </div>
            </li>
            <li className="flex">
              <span className="font-bold text-blue-600 mr-3">3.</span>
              <div>
                <p className="font-semibold">認証コードを入力</p>
                <p className="text-sm text-gray-600">投稿時にメールで受け取った認証コードを入力します</p>
              </div>
            </li>
            <li className="flex">
              <span className="font-bold text-blue-600 mr-3">4.</span>
              <div>
                <p className="font-semibold">公開</p>
                <p className="text-sm text-gray-600">承認後、求人がサイトに掲載されます</p>
              </div>
            </li>
          </ol>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="font-semibold mb-2">プレミアムプラン特典</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✓ 求人を無制限に掲載</li>
            <li>✓ プレミアム表示で上位掲載</li>
            <li>✓ 店舗詳細ページの作成</li>
            <li>✓ ディーラーからの応募を優先受信</li>
            <li>✓ レビュー・評価機能の利用</li>
          </ul>
        </div>

        <div className="text-center space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            トップページへ
          </Link>
          <p className="text-sm text-gray-600">
            ご不明な点がございましたら、サポートまでお問い合わせください
          </p>
        </div>
      </div>
    </div>
  );
}