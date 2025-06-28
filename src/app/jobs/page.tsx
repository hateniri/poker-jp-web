import { Job, Store } from '@/types';
import Link from 'next/link';
import jobsData from '../../../data/jobs.json';
import storesData from '../../../data/stores.json';
import AdSpace from '@/components/AdSpace';

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
      <h1 className="text-5xl font-bold mb-4 text-center text-poker-gold neon-glow">
        ポーカーディーラー求人一覧
      </h1>
      <p className="text-center text-poker-silver mb-8">
        全国のポーカールームから{activeJobs.length}件の求人情報
      </p>
      
      {/* 広告スペース - ヘッダー下 */}
      <div className="mb-8 flex justify-center">
        <AdSpace variant="banner" slot="jobs-header" />
      </div>
      
      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          {activeJobs.map((job, index) => {
            const store = getStore(job.store_id);
            
            // 5件ごとに広告を挿入
            const showAd = index > 0 && index % 5 === 0;
            
            return (
              <div key={job.id}>
                {showAd && (
                  <div className="mb-6">
                    <AdSpace variant="horizontal" slot={`jobs-list-${index}`} />
                  </div>
                )}
                
                <div
                  className={`border-2 rounded-xl p-6 transition-all hover:scale-[1.02] ${
                    job.is_premium 
                      ? 'border-poker-gold bg-gradient-to-r from-poker-gold/10 to-poker-gold/5 casino-lights' 
                      : 'border-poker-gold/30 bg-poker-black/50 hover:border-poker-gold/60'
                  }`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      {job.is_premium && (
                        <div className="inline-block bg-poker-gold text-poker-black px-3 py-1 rounded-full text-sm font-bold mb-2">
                          <span className="suit-spade"></span> プレミアム
                        </div>
                      )}
                      
                      <h2 className="text-2xl font-bold mb-2 text-poker-white">{job.title}</h2>
                      
                      <Link href={`/store/${job.store_id}`} className="text-poker-gold hover:text-poker-white transition-colors">
                        <h3 className="text-lg mb-2 flex items-center gap-2">
                          <span className="suit-club"></span>
                          {store?.name}
                        </h3>
                      </Link>
                    </div>
                    
                    {job.is_dummy && (
                      <span className="bg-poker-red/20 text-poker-red px-3 py-1 rounded text-sm font-bold">
                        サンプル
                      </span>
                    )}
                  </div>
                  
                  <div className="grid sm:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-poker-silver">
                      <span className="text-poker-gold">📍</span>
                      <span>{job.location.prefecture} {job.location.city}</span>
                    </div>
                    <div className="flex items-center gap-2 text-poker-silver">
                      <span className="text-poker-gold">💰</span>
                      <span className="font-bold text-poker-white">
                        {job.salary.currency} {job.salary.min.toLocaleString()}〜{job.salary.max.toLocaleString()}円/{job.salary.unit}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-poker-silver">
                      <span className="text-poker-gold">⏰</span>
                      <span>{job.working_hours.days_per_week}</span>
                    </div>
                  </div>
                  
                  <p className="text-poker-white mb-4 line-clamp-3">{job.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-poker-silver">
                      掲載日: {new Date(job.posted_at).toLocaleDateString('ja-JP')}
                    </span>
                    <Link
                      href={`/jobs/${job.id}`}
                      className="bg-poker-red text-poker-white px-6 py-2 rounded-full hover:bg-poker-darkred font-bold chip-shadow transition-all hover:scale-105"
                    >
                      詳細を見る
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* サイドバー広告 */}
        <div className="hidden lg:block space-y-6 sticky top-4 h-fit">
          <AdSpace variant="square" slot="jobs-sidebar-1" />
          <AdSpace variant="square" slot="jobs-sidebar-2" />
        </div>
      </div>
      
      {activeJobs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-poker-silver">現在、募集中の求人はありません。</p>
        </div>
      )}
    </div>
  );
}