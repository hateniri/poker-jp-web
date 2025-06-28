'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DealerButton from '@/components/DealerButton';

export default function NewReviewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    type: 'store',
    targetId: '',
    reviewerName: '',
    rating: 5,
    comment: '',
    professionalism: 5,
    gameManagement: 5,
    communication: 5,
    fairness: 5,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // GitHub Issue作成用のテンプレート
    const issueTitle = `新規レビュー: ${formData.type === 'store' ? '店舗' : 'ディーラー'} - ${formData.reviewerName}`;
    const issueBody = `
## レビュー情報

- **種類**: ${formData.type === 'store' ? '店舗' : 'ディーラー'}
- **対象ID**: ${formData.targetId}
- **投稿者名**: ${formData.reviewerName}
- **総合評価**: ${formData.rating}/5
- **コメント**: 
${formData.comment}

${formData.type === 'dealer' ? `
### 詳細評価
- プロフェッショナリズム: ${formData.professionalism}/5
- ゲーム管理: ${formData.gameManagement}/5
- コミュニケーション: ${formData.communication}/5
- 公平性: ${formData.fairness}/5
` : ''}

---
このレビューは自動的に処理され、承認後にサイトに反映されます。
`;

    // GitHub Issueを作成するためのURL
    const githubIssueUrl = `https://github.com/hateniri/poker-jp-web/issues/new?title=${encodeURIComponent(issueTitle)}&body=${encodeURIComponent(issueBody)}&labels=review`;
    
    // 新しいタブでGitHub Issueを開く
    window.open(githubIssueUrl, '_blank');
    
    // フォームをリセット
    alert('GitHub Issueが開きました。レビューを送信してください。');
    router.push('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">レビューを投稿</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">レビュー対象</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              <option value="store">店舗</option>
              <option value="dealer">ディーラー</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {formData.type === 'store' ? '店舗ID' : 'ディーラーID'}
            </label>
            <input
              type="text"
              value={formData.targetId}
              onChange={(e) => setFormData({ ...formData, targetId: e.target.value })}
              placeholder={formData.type === 'store' ? 'store-001' : 'dealer-001'}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">お名前（ニックネーム可）</label>
            <input
              type="text"
              value={formData.reviewerName}
              onChange={(e) => setFormData({ ...formData, reviewerName: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">総合評価</label>
            <select
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            >
              {[5, 4, 3, 2, 1].map((num) => (
                <option key={num} value={num}>
                  {'⭐'.repeat(num)} ({num})
                </option>
              ))}
            </select>
          </div>

          {formData.type === 'dealer' && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-md">
              <h3 className="font-semibold">詳細評価</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">プロフェッショナリズム</label>
                <select
                  value={formData.professionalism}
                  onChange={(e) => setFormData({ ...formData, professionalism: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">ゲーム管理</label>
                <select
                  value={formData.gameManagement}
                  onChange={(e) => setFormData({ ...formData, gameManagement: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">コミュニケーション</label>
                <select
                  value={formData.communication}
                  onChange={(e) => setFormData({ ...formData, communication: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">公平性</label>
                <select
                  value={formData.fairness}
                  onChange={(e) => setFormData({ ...formData, fairness: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  {[5, 4, 3, 2, 1].map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">コメント</label>
            <textarea
              value={formData.comment}
              onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="体験や感想を詳しくお聞かせください"
              required
            />
          </div>

          <div className="flex gap-4">
            <DealerButton
              text="GitHub Issueで投稿"
              variant="secondary"
              size="lg"
              className="flex-1"
              type="submit"
              icon="📝"
            />
            <DealerButton
              text="キャンセル"
              variant="primary"
              size="lg"
              onClick={() => router.back()}
            />
          </div>
        </form>

        <div className="mt-8 p-4 bg-blue-50 rounded-md">
          <p className="text-sm text-blue-800">
            注意: レビューの投稿にはGitHubアカウントが必要です。
            投稿されたレビューは審査後にサイトに反映されます。
          </p>
        </div>
      </div>
    </div>
  );
}