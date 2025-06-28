import Link from 'next/link';
import jobsData from '../../data/jobs.json';
import storesData from '../../data/stores.json';
import dealersData from '../../data/dealers.json';

export default function Home() {
  const recentJobs = jobsData.jobs
    .filter(job => job.status === 'active')
    .slice(0, 3);
    
  const featuredStores = storesData.stores
    .filter(store => store.subscription.status === 'active')
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          日本最大級のポーカーディーラー専門サイト
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          ディーラー求人情報と店舗・ディーラーレビューを一箇所に
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/jobs"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold"
          >
            求人を探す
          </Link>
          <Link
            href="/subscribe"
            className="bg-yellow-500 text-black px-8 py-3 rounded-lg hover:bg-yellow-400 text-lg font-semibold"
          >
            求人を掲載する
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">最新の求人情報</h2>
          <Link href="/jobs" className="text-blue-600 hover:underline">
            すべて見る →
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {recentJobs.map((job) => {
            const store = storesData.stores.find(s => s.id === job.store_id);
            return (
              <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:border-blue-400 transition-colors">
                <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                <p className="text-gray-600 mb-2">{store?.name}</p>
                <p className="text-gray-700 mb-4">{job.salary.currency} {job.salary.min}〜{job.salary.max}円/{job.salary.unit}</p>
                <Link
                  href={`/jobs/${job.id}`}
                  className="text-blue-600 hover:underline"
                >
                  詳細を見る
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">注目の店舗</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {featuredStores.map((store) => (
            <Link
              key={store.id}
              href={`/store/${store.id}`}
              className="border border-gray-200 rounded-lg p-6 hover:border-blue-400 transition-colors"
            >
              <h3 className="text-lg font-semibold mb-2">{store.name}</h3>
              <p className="text-gray-600 mb-2">{store.location.prefecture} {store.location.city}</p>
              <div className="flex items-center">
                <span className="text-lg">⭐</span>
                <span className="font-semibold ml-1">{store.ratings.average}</span>
                <span className="text-gray-500 ml-2">({store.ratings.count}件)</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-12">
        <Link href="/rooms" className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg p-8 hover:from-blue-600 hover:to-blue-700 transition-all">
          <h2 className="text-2xl font-bold mb-3">全国のポーカールーム</h2>
          <p className="mb-4">エリア別に全国のポーカールームを検索。営業時間や特徴を一覧で確認できます。</p>
          <span className="inline-flex items-center">
            詳しく見る
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
        
        <Link href="/salary" className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg p-8 hover:from-green-600 hover:to-green-700 transition-all">
          <h2 className="text-2xl font-bold mb-3">本日の時給相場</h2>
          <p className="mb-4">リアルタイムで更新される全国の時給データ。エリア別の相場を確認できます。</p>
          <span className="inline-flex items-center">
            相場を確認
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </Link>
      </section>

      <section className="bg-gray-100 rounded-lg p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4">サイトの特徴</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">豊富な求人情報</h3>
            <p className="text-gray-700">
              全国のポーカールームからの最新求人情報を掲載。経験者から未経験者まで幅広く対応。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">信頼できるレビュー</h3>
            <p className="text-gray-700">
              実際に働いたディーラーやプレイヤーからのリアルな評価を確認できます。
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">簡単な求人掲載</h3>
            <p className="text-gray-700">
              月額1万円で求人を無制限に掲載可能。プレミアム表示で応募率アップ。
            </p>
          </div>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-bold mb-4">統計情報</h2>
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <div className="text-3xl font-bold text-blue-600">{jobsData.jobs.length}</div>
            <div className="text-gray-600">掲載求人数</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">{storesData.stores.length}</div>
            <div className="text-gray-600">登録店舗数</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">{dealersData.dealers.length}</div>
            <div className="text-gray-600">登録ディーラー数</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-600">300+</div>
            <div className="text-gray-600">レビュー数</div>
          </div>
        </div>
      </section>
    </div>
  );
}