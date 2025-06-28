# ポーカーディーラー求人・情報サイト

日本最大級のポーカーディーラー専門の求人情報と店舗・ディーラーレビューを掲載するプラットフォームです。

## 🎯 主な機能

- **求人掲載**: 月額10,000円のサブスクリプションで無制限に求人掲載可能
- **全国の店舗情報**: エリア別にポーカールームを検索
- **時給相場**: リアルタイムで更新される全国の時給データ
- **レビューシステム**: 店舗とディーラーの評価・レビュー
- **プレミアム表示**: 有料会員の求人は優先的に上位表示

## 🚀 セットアップ

### 必要な環境
- Node.js 18以上
- npm または yarn
- Stripeアカウント（決済処理用）

### インストール手順

1. リポジトリをクローン
```bash
git clone https://github.com/hateniri/poker-jp-web.git
cd poker-jp-web
```

2. 依存関係をインストール
```bash
npm install
```

3. 環境変数を設定
```bash
cp .env.local.example .env.local
```

`.env.local`ファイルを編集して、以下の値を設定：
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_PRICE_ID=price_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

4. 開発サーバーを起動
```bash
npm run dev
```

## 💳 Stripe設定

1. [Stripe Dashboard](https://dashboard.stripe.com)にログイン
2. 商品を作成：「ポーカーディーラー求人掲載プラン」（月額10,000円）
3. APIキーを取得して環境変数に設定
4. Webhookエンドポイントを設定：
   - エンドポイントURL: `https://your-domain.com/api/stripe/webhook`
   - イベント: `checkout.session.completed`, `customer.subscription.updated`, `customer.subscription.deleted`

## 📁 プロジェクト構造

```
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── stripe/        # Stripe API endpoints
│   │   ├── jobs/              # 求人一覧
│   │   ├── rooms/             # 全国の店舗
│   │   ├── salary/            # 時給相場
│   │   ├── store/[id]/        # 店舗詳細
│   │   ├── dealer/[id]/       # ディーラー詳細
│   │   ├── review/new/        # レビュー投稿
│   │   └── subscribe/         # サブスクリプション
│   └── types/                 # TypeScript型定義
├── data/                      # JSONデータファイル
├── scripts/                   # 自動更新スクリプト
└── .github/
    ├── workflows/             # GitHub Actions
    └── ISSUE_TEMPLATE/        # Issueテンプレート
```

## 🔄 データ更新

GitHub Actionsで毎日自動的にデータを更新：
- ポーカールーム情報の収集
- 時給データの更新

手動更新：
```bash
node scripts/update-poker-rooms.js
```

## 📝 求人投稿フロー

1. 店舗が月額プランに加入
2. Stripeで決済完了
3. 認証コードがメールで送信される
4. GitHub Issueから求人を投稿（認証コード必須）
5. 管理者が承認後、サイトに掲載

## 🛠️ 開発コマンド

```bash
# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start

# 型チェック
npm run type-check
```

## 🌐 デプロイ

Vercelでの自動デプロイ設定済み。`main`ブランチへのプッシュで自動デプロイされます。

### 環境変数の設定（Vercel）
Vercelのダッシュボードで以下の環境変数を設定：
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID`
- `STRIPE_WEBHOOK_SECRET`
- `NEXT_PUBLIC_BASE_URL`

## 📊 統計情報の自動集計

- 求人データから時給相場を自動計算
- エリア別の統計情報を表示
- 日次/週次/月次での集計切り替え

## 🤝 コントリビューション

1. Issueを作成して改善提案
2. フォークしてPull Request
3. フィードバックは[Issues](https://github.com/hateniri/poker-jp-web/issues)へ

## 📄 ライセンス

MIT License

---

開発者: [@hateniri](https://github.com/hateniri)
サポート: [Issues](https://github.com/hateniri/poker-jp-web/issues)