const fs = require('fs');
const path = require('path');

// ポーカールーム情報のサンプルデータを追加
// 実際の運用では、APIやスクレイピングで取得
const sampleNewStores = [
  {
    id: "store-002",
    name: "ポーカースタジアム大阪",
    description: "大阪駅直結。関西最大級のポーカールーム。毎日トーナメント開催。",
    location: {
      prefecture: "大阪府",
      city: "大阪市北区",
      address: "梅田1-2-3",
      access: "大阪駅直結"
    },
    contact: {
      phone: "06-1234-5678",
      email: "info@pokerstadium-osaka.jp",
      website: "https://pokerstadium-osaka.jp"
    },
    business_hours: {
      weekday: "18:00-04:00",
      weekend: "16:00-05:00",
      holidays: "定休日：なし"
    },
    features: [
      "毎日トーナメント開催",
      "初心者講習会あり",
      "プロディーラー在籍",
      "ドリンクバー完備"
    ],
    subscription: {
      status: "inactive",
      plan: "free",
      expires_at: null
    },
    ratings: {
      average: 4.3,
      count: 89
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "store-003",
    name: "ポーカーラウンジ名古屋",
    description: "栄駅徒歩5分。アットホームな雰囲気のポーカールーム。",
    location: {
      prefecture: "愛知県",
      city: "名古屋市中区",
      address: "栄3-4-5",
      access: "栄駅より徒歩5分"
    },
    contact: {
      phone: "052-1234-5678",
      email: "info@poker-nagoya.jp",
      website: "https://poker-nagoya.jp"
    },
    business_hours: {
      weekday: "19:00-03:00",
      weekend: "17:00-04:00",
      holidays: "定休日：火曜日"
    },
    features: [
      "女性割引あり",
      "学生割引あり",
      "個室完備",
      "駐車場あり"
    ],
    subscription: {
      status: "inactive",
      plan: "free",
      expires_at: null
    },
    ratings: {
      average: 4.6,
      count: 56
    },
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

// 時給データの更新（ランダムに微調整）
function updateSalaryData(jobs) {
  return jobs.map(job => {
    if (job.status === 'active') {
      // 時給を±50円の範囲でランダムに調整
      const adjustment = Math.floor(Math.random() * 101) - 50;
      job.salary.min = Math.max(1000, job.salary.min + adjustment);
      job.salary.max = Math.max(job.salary.min + 500, job.salary.max + adjustment);
    }
    return job;
  });
}

// メイン処理
async function updatePokerRoomData() {
  try {
    // 既存のデータを読み込み
    const storesPath = path.join(__dirname, '../data/stores.json');
    const jobsPath = path.join(__dirname, '../data/jobs.json');
    
    const storesData = JSON.parse(fs.readFileSync(storesPath, 'utf8'));
    const jobsData = JSON.parse(fs.readFileSync(jobsPath, 'utf8'));
    
    // 新しい店舗を追加（重複チェック）
    const existingIds = new Set(storesData.stores.map(s => s.id));
    const newStores = sampleNewStores.filter(store => !existingIds.has(store.id));
    
    if (newStores.length > 0) {
      storesData.stores.push(...newStores);
      console.log(`Added ${newStores.length} new stores`);
    }
    
    // 時給データを更新
    jobsData.jobs = updateSalaryData(jobsData.jobs);
    console.log('Updated salary data');
    
    // ファイルに書き込み
    fs.writeFileSync(storesPath, JSON.stringify(storesData, null, 2));
    fs.writeFileSync(jobsPath, JSON.stringify(jobsData, null, 2));
    
    console.log('Successfully updated poker room data');
  } catch (error) {
    console.error('Error updating poker room data:', error);
    process.exit(1);
  }
}

// 実行
updatePokerRoomData();