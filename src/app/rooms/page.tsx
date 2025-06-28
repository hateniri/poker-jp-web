import { Store } from '@/types';
import Link from 'next/link';
import storesData from '../../../data/stores.json';
import AdSpace from '@/components/AdSpace';

interface AreaGroup {
  area: string;
  prefectures: string[];
  color: string;
  bgColor: string;
}

const areaGroups: AreaGroup[] = [
  { area: '関東', prefectures: ['東京都', '神奈川県', '千葉県', '埼玉県', '茨城県', '栃木県', '群馬県'], color: 'text-poker-red', bgColor: 'bg-red-950/20' },
  { area: '関西', prefectures: ['大阪府', '京都府', '兵庫県', '奈良県', '滋賀県', '和歌山県'], color: 'text-poker-green', bgColor: 'bg-green-950/20' },
  { area: '中部', prefectures: ['愛知県', '岐阜県', '静岡県', '三重県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県'], color: 'text-poker-gold', bgColor: 'bg-yellow-950/20' },
  { area: '北海道・東北', prefectures: ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'], color: 'text-blue-400', bgColor: 'bg-blue-950/20' },
  { area: '中国・四国', prefectures: ['鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県'], color: 'text-purple-400', bgColor: 'bg-purple-950/20' },
  { area: '九州・沖縄', prefectures: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'], color: 'text-orange-400', bgColor: 'bg-orange-950/20' },
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
      <div className="mb-12 text-center">
        <h1 className="text-5xl font-bold mb-4 text-poker-white">
          <span className="suit-spade mr-2"></span>
          全国のポーカールーム
          <span className="suit-club ml-2"></span>
        </h1>
        <div className="flex justify-center gap-8 text-poker-gold text-lg">
          <span className="flex items-center gap-2">
            <span className="text-2xl">🏢</span>
            登録店舗数: <span className="font-bold text-2xl">{totalStores}</span>
          </span>
          <span className="flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            プレミアム店舗: <span className="font-bold text-2xl">{activeStores}</span>
          </span>
        </div>
      </div>

      {/* 広告スペース - ヘッダー下 */}
      <div className="mb-8 flex justify-center">
        <AdSpace variant="banner" slot="rooms-header" />
      </div>

      <div className="grid gap-12">
        {areaGroups.map((areaGroup, areaIndex) => {
          const areaStores = getStoresByArea(areaGroup.area);
          
          if (areaStores.length === 0) return null;
          
          return (
            <div key={areaGroup.area} id={areaGroup.area.toLowerCase().replace('・', '')} className={`${areaGroup.bgColor} rounded-lg p-8 border-2 border-poker-gold/20`}>
              <h2 className={`text-3xl font-bold mb-6 ${areaGroup.color} flex items-center`}>
                <span className="suit-diamond mr-3"></span>
                {areaGroup.area}エリア
                <span className="text-poker-white text-lg ml-4">（{areaStores.length}店舗）</span>
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {areaStores.map((store) => (
                  <Link
                    key={store.id}
                    href={`/store/${store.id}`}
                    className="bg-poker-black/50 border-2 border-poker-gold/30 rounded-lg p-6 hover:border-poker-gold transition-all hover:scale-105 card-shadow group"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-bold text-xl text-poker-white group-hover:text-poker-gold transition-colors">
                        {store.name}
                      </h3>
                      {store.subscription.status === 'active' && (
                        <span className="bg-poker-gold text-poker-black text-xs px-3 py-1 rounded-full font-bold animate-pulse">
                          PREMIUM
                        </span>
                      )}
                    </div>
                    
                    <div className="space-y-2 text-poker-silver">
                      <p className="flex items-center gap-2">
                        <span className="text-poker-red">📍</span>
                        {store.location.prefecture} {store.location.city}
                      </p>
                      <p className="text-sm">{store.location.address}</p>
                      <p className="text-sm text-poker-gold">{store.location.access}</p>
                    </div>
                    
                    <p className="text-sm text-poker-white/80 my-4 line-clamp-2">
                      {store.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-poker-gold/20">
                      <div className="flex items-center gap-2">
                        <span className="text-poker-gold text-lg">🎰</span>
                        <span className="font-bold text-poker-white">{store.table_count}テーブル</span>
                        <span className="text-poker-silver text-sm">稼働中</span>
                      </div>
                      
                      <div className="text-sm text-poker-silver">
                        <span className="font-semibold">営業:</span>
                        <span className="ml-1 text-poker-gold">{store.business_hours.weekday}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {store.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs bg-poker-green/20 text-poker-green px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                      {store.features.length > 2 && (
                        <span className="text-xs text-poker-silver">
                          +{store.features.length - 2}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
              
              {/* エリアごとに広告を挿入（2つおきに） */}
              {areaIndex > 0 && areaIndex % 2 === 0 && (
                <div className="mt-8">
                  <AdSpace variant="horizontal" slot={`rooms-area-${areaIndex}`} className="max-w-full" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-16 text-center bg-gradient-to-r from-poker-darkred to-poker-darkgreen p-8 rounded-lg border-2 border-poker-gold">
        <h3 className="text-2xl font-bold text-poker-gold mb-4">
          <span className="suit-heart mr-2"></span>
          あなたの店舗も掲載しませんか？
          <span className="suit-diamond ml-2"></span>
        </h3>
        <p className="text-poker-white mb-6">月額10,000円で求人を無制限に掲載・プレミアム表示で集客力アップ！</p>
        <Link
          href="/subscribe"
          className="inline-block bg-poker-gold text-poker-black px-8 py-3 rounded-full font-bold text-lg hover:bg-yellow-400 transition-all hover:scale-110 chip-shadow"
        >
          今すぐ掲載を始める
        </Link>
      </div>
    </div>
  );
}