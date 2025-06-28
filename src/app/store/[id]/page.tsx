import { Store, Job, Dealer } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import storesData from '../../../../data/stores.json';
import jobsData from '../../../../data/jobs.json';
import dealersData from '../../../../data/dealers.json';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function StorePage({ params }: Props) {
  const { id } = await params;
  const stores = storesData.stores as Store[];
  const jobs = jobsData.jobs as Job[];
  const dealers = dealersData.dealers as Dealer[];

  const store = stores.find(s => s.id === id);
  
  if (!store) {
    notFound();
  }

  const storeJobs = jobs.filter(job => job.store_id === id && job.status === 'active');
  const storeDealers = dealers.filter(dealer => dealer.current_store_id === id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{store.name}</h1>
        <p className="text-gray-700 text-lg mb-4">{store.description}</p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">基本情報</h3>
            <div className="space-y-2 text-gray-700">
              <p>📍 {store.location.prefecture} {store.location.city}</p>
              <p>🏢 {store.location.address}</p>
              <p>🚶 {store.location.access}</p>
              <p>📞 {store.contact.phone}</p>
              <p>✉️ {store.contact.email}</p>
              {store.contact.website && (
                <p>🌐 <a href={store.contact.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">{store.contact.website}</a></p>
              )}
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold mb-2">営業時間</h3>
            <div className="space-y-2 text-gray-700">
              <p>平日: {store.business_hours.weekday}</p>
              <p>週末: {store.business_hours.weekend}</p>
              <p>{store.business_hours.holidays}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">特徴</h3>
          <div className="flex flex-wrap gap-2">
            {store.features.map((feature, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center mb-6">
          <div className="flex items-center">
            <span className="text-2xl">⭐</span>
            <span className="text-xl font-semibold ml-1">{store.ratings.average}</span>
            <span className="text-gray-500 ml-2">({store.ratings.count}件のレビュー)</span>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">募集中の求人</h2>
        {storeJobs.length > 0 ? (
          <div className="grid gap-4">
            {storeJobs.map((job) => (
              <div key={job.id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
                <div className="text-gray-600 space-y-1 mb-2">
                  <p>💰 {job.salary.currency} {job.salary.min}〜{job.salary.max}円/{job.salary.unit}</p>
                  <p>⏰ {job.working_hours.days_per_week}</p>
                </div>
                <p className="text-gray-700 mb-3">{job.description}</p>
                <Link
                  href={`/jobs/${job.id}`}
                  className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  詳細を見る
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">現在募集中の求人はありません。</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">在籍ディーラー</h2>
        {storeDealers.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {storeDealers.map((dealer) => (
              <Link
                key={dealer.id}
                href={`/dealer/${dealer.id}`}
                className="border border-gray-200 rounded-lg p-4 hover:border-blue-400 transition-colors"
              >
                <h3 className="text-lg font-semibold mb-2">{dealer.display_name}</h3>
                <p className="text-gray-600 mb-2">経験年数: {dealer.profile.experience_years}年</p>
                <div className="flex items-center">
                  <span className="text-lg">⭐</span>
                  <span className="font-semibold ml-1">{dealer.ratings.average}</span>
                  <span className="text-gray-500 ml-2">({dealer.ratings.count}件)</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">ディーラー情報はまだありません。</p>
        )}
      </div>

      <div className="text-center">
        <Link
          href="/review/new"
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 inline-block"
        >
          レビューを投稿する
        </Link>
      </div>
    </div>
  );
}