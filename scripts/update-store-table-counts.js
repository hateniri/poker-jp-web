const fs = require('fs');
const path = require('path');

// 各店舗のテーブル数を設定
const tableCountUpdates = {
  "store-001": 12,
  "akihabara-ps": 30,
  "shibuya-guild": 18,
  "roppongi-flush": 15,
  "namba-pokerpro": 25,
  "umeda-royal": 10,
  "sakae-allin": 20,
  "tenjin-pokercity": 15,
  "susukino-deck": 8,
  "yokohama-straight": 18
};

function updateStoreTableCounts() {
  const storesPath = path.join(__dirname, '../data/stores.json');
  const storesData = JSON.parse(fs.readFileSync(storesPath, 'utf8'));
  
  // 各店舗のratingsをtable_countに変更
  storesData.stores = storesData.stores.map(store => {
    // ratingsプロパティを削除
    delete store.ratings;
    
    // table_countを追加
    store.table_count = tableCountUpdates[store.id] || 8;
    
    return store;
  });
  
  // ファイルに書き込み
  fs.writeFileSync(storesPath, JSON.stringify(storesData, null, 2));
  
  console.log('Updated all stores with table counts');
  console.log('Removed ratings, added table_count for each store');
}

// 実行
updateStoreTableCounts();