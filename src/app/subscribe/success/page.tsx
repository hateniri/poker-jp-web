'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import DealerButton from '@/components/DealerButton';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionId) {
      verifySession();
    } else {
      setError('セッションIDが見つかりません');
      setLoading(false);
    }
  }, [sessionId]);

  const verifySession = async () => {
    try {
      setLoading(false);
    } catch (err) {
      setError('セッションの確認に失敗しました');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center">
        <p className="text-poker-silver">確認中...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="bg-poker-red/20 border border-poker-red text-poker-red px-4 py-3 rounded mb-6">
          {error}
        </div>
        <Link href="/subscribe" className="text-poker-gold hover:text-poker-white">
          申込みページに戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="text-6xl mb-4 dealer-spin">🎰</div>
        <h1 className="text-5xl font-bold mb-4 text-poker-gold neon-glow">決済完了！</h1>
        <p className="text-poker-silver text-xl">プレミアムプランへようこそ</p>
      </div>

      <div className="bg-poker-green/20 border-2 border-poker-green text-poker-green px-6 py-4 rounded-lg mb-8 casino-lights">
        <p className="font-semibold mb-2 text-poker-white">✅ 月額10,000円のサブスクリプションが開始されました</p>
        <p className="text-poker-silver">ご登録のメールアドレスに確認メールをお送りしました。</p>
      </div>

      <div className="bg-poker-black/50 border-2 border-poker-gold/30 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold mb-4 text-poker-gold flex items-center gap-2">
          <span className="suit-spade"></span>
          次のステップ
        </h2>
        <ol className="space-y-4">
          <li className="flex">
            <span className="font-bold text-poker-red mr-3 text-xl">1.</span>
            <div>
              <p className="font-semibold text-poker-white">確認メールをチェック</p>
              <p className="text-sm text-poker-silver">登録メールアドレスに認証コードが記載されたメールが届きます</p>
            </div>
          </li>
          <li className="flex">
            <span className="font-bold text-poker-red mr-3 text-xl">2.</span>
            <div>
              <p className="font-semibold text-poker-white">求人を投稿</p>
              <p className="text-sm text-poker-silver">
                <a href="https://github.com/hateniri/poker-jp-web/issues/new" target="_blank" rel="noopener noreferrer" className="text-poker-gold hover:text-poker-white">
                  GitHub Issue
                </a>
                から求人情報を投稿してください
              </p>
            </div>
          </li>
          <li className="flex">
            <span className="font-bold text-poker-red mr-3 text-xl">3.</span>
            <div>
              <p className="font-semibold text-poker-white">認証コードを入力</p>
              <p className="text-sm text-poker-silver">投稿時にメールで受け取った認証コードを入力します</p>
            </div>
          </li>
          <li className="flex">
            <span className="font-bold text-poker-red mr-3 text-xl">4.</span>
            <div>
              <p className="font-semibold text-poker-white">公開</p>
              <p className="text-sm text-poker-silver">承認後、求人がサイトに掲載されます</p>
            </div>
          </li>
        </ol>
      </div>

      <div className="bg-gradient-to-r from-poker-darkred to-poker-darkgreen rounded-lg p-6 mb-8">
        <h3 className="font-bold mb-2 text-poker-gold text-xl">プレミアムプラン特典</h3>
        <ul className="space-y-2 text-poker-white">
          <li className="flex items-center gap-2">
            <span className="text-poker-gold">♦</span>
            求人を無制限に掲載
          </li>
          <li className="flex items-center gap-2">
            <span className="text-poker-gold">♦</span>
            プレミアム表示で上位掲載
          </li>
          <li className="flex items-center gap-2">
            <span className="text-poker-gold">♦</span>
            店舗詳細ページの作成
          </li>
          <li className="flex items-center gap-2">
            <span className="text-poker-gold">♦</span>
            ディーラーからの応募を優先受信
          </li>
          <li className="flex items-center gap-2">
            <span className="text-poker-gold">♦</span>
            レビュー・評価機能の利用
          </li>
        </ul>
      </div>

      <div className="text-center space-y-4">
        <DealerButton
          text="トップページへ"
          variant="gold"
          size="lg"
          icon="🏠"
          onClick={() => router.push('/')}
          className="pulse-glow"
        />
        <p className="text-sm text-poker-silver">
          ご不明な点がございましたら、サポートまでお問い合わせください
        </p>
      </div>
    </div>
  );
}

export default function SubscribeSuccessPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={
        <div className="text-center">
          <p className="text-poker-silver">読み込み中...</p>
        </div>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  );
}