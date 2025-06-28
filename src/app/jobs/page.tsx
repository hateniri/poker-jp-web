import { Job, Store } from '@/types';
import Link from 'next/link';
import jobsData from '../../../data/jobs.json';
import storesData from '../../../data/stores.json';

export default function JobsPage() {
  const jobs = jobsData.jobs as Job[];
  const stores = storesData.stores as Store[];

  const activeJobs = jobs
    .filter(job => job.status === 'active')
    .sort((a, b) => {
      if (a.is_premium && !b.is_premium) return -1;
      if (!a.is_premium && b.is_premium) return 1;
      return new Date(b.posted_at).getTime() - new Date(a.posted_at).getTime();
    });

  const getStore = (storeId: string) => {
    return stores.find(store => store.id === storeId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">ポーカーディーラー求人一覧</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activeJobs.map((job) => {
          const store = getStore(job.store_id);
          return (
            <div
              key={job.id}
              className={`border rounded-lg p-6 ${
                job.is_premium ? 'border-yellow-400 bg-yellow-50' : 'border-gray-200'
              }`}
            >
              {job.is_premium && (
                <div className="inline-block bg-yellow-400 text-black px-2 py-1 rounded text-sm font-semibold mb-2">
                  プレミアム
                </div>
              )}
              
              <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
              
              <Link href={`/store/${job.store_id}`} className="text-blue-600 hover:underline">
                <h3 className="text-lg mb-2">{store?.name}</h3>
              </Link>
              
              <div className="text-gray-600 space-y-1 mb-4">
                <p>📍 {job.location.prefecture} {job.location.city}</p>
                <p>💰 {job.salary.currency} {job.salary.min}〜{job.salary.max}円/{job.salary.unit}</p>
                <p>⏰ {job.working_hours.days_per_week}</p>
              </div>
              
              <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  掲載日: {new Date(job.posted_at).toLocaleDateString('ja-JP')}
                </span>
                <Link
                  href={`/jobs/${job.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      
      {activeJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">現在、募集中の求人はありません。</p>
        </div>
      )}
    </div>
  );
}