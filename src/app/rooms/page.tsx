import { Store } from '@/types';
import Link from 'next/link';
import storesData from '../../../data/stores.json';

interface AreaGroup {
  area: string;
  prefectures: string[];
}

const areaGroups: AreaGroup[] = [
  { area: '関東', prefectures: ['東京都', '神奈川県', '千葉県', '埼玉県', '茨城県', '栃木県', '群馬県'] },
  { area: '関西', prefectures: ['大阪府', '京都府', '兵庫県', '奈良県', '滋賀県', '和歌山県'] },
  { area: '中部', prefectures: ['愛知県', '岐阜県', '静岡県', '三重県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県'] },
  { area: '北海道・東北', prefectures: ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'] },
  { area: '中国・四国', prefectures: ['鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県'] },
  { area: '九州・沖縄', prefectures: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'] },
];

export default function RoomsPage() {
  const stores = storesData.stores as Store[];
  
  const getStoresByArea = (area: string) => {
    const areaPrefectures = areaGroups.find(g => g.area === area)?.prefectures || [];
    return stores.filter(store => areaPrefectures.includes(store.location.prefecture));
  };

  const totalStores = stores.length;
  const activeStores = stores.filter(s => s.subscription.status === 'active').length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">全国のポーカールーム</h1>
        <div className="flex gap-4 text-gray-600">
          <span>登録店舗数: {totalStores}</span>
          <span>アクティブ店舗: {activeStores}</span>
          <span className="text-sm">最終更新: {new Date().toLocaleDateString('ja-JP')}</span>
        </div>
      </div>

      <div className="grid gap-8">
        {areaGroups.map((areaGroup) => {
          const areaStores = getStoresByArea(areaGroup.area);
          
          if (areaStores.length === 0) return null;
          
          return (
            <div key={areaGroup.area} className="border-b pb-8 last:border-b-0">
              <h2 className="text-2xl font-bold mb-4 text-blue-600">{areaGroup.area}</h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {areaStores.map((store) => (
                  <Link
                    key={store.id}
                    href={`/store/${store.id}`}
                    className="border rounded-lg p-4 hover:border-blue-400 transition-colors bg-white"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{store.name}</h3>
                      {store.subscription.status === 'active' && (
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          Premium
                        </span>
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-2">
                      {store.location.prefecture} {store.location.city}
                    </p>
                    
                    <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                      {store.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-yellow-500">⭐</span>
                        <span className="ml-1 font-semibold">{store.ratings.average}</span>
                        <span className="text-gray-500 text-sm ml-1">({store.ratings.count})</span>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        <span className="font-semibold">営業時間:</span>
                        <span className="ml-1">{store.business_hours.weekday}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {stores.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">現在、登録されている店舗はありません。</p>
        </div>
      )}
    </div>
  );
}