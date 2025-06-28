import { Job, Store } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import jobsData from '../../../../data/jobs.json';
import storesData from '../../../../data/stores.json';
import DealerButton from '@/components/DealerButton';
import AdSpace from '@/components/AdSpace';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const jobs = jobsData.jobs as Job[];
  const stores = storesData.stores as Store[];

  const job = jobs.find(j => j.id === id);
  
  if (!job || job.status !== 'active') {
    notFound();
  }

  const store = stores.find(s => s.id === job.store_id);
  
  if (!store) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Back link */}
        <Link 
          href="/jobs" 
          className="inline-flex items-center text-poker-gold hover:text-poker-white mb-6 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          求人一覧に戻る
        </Link>

        <div className="bg-poker-black/50 border-2 border-poker-gold/30 rounded-xl p-8 mb-8">
          {/* Premium badge */}
          {job.is_premium && (
            <div className="inline-block bg-poker-gold text-poker-black px-4 py-2 rounded-full text-sm font-bold mb-4 casino-lights">
              PREMIUM
            </div>
          )}

          {/* Job title */}
          <h1 className="text-4xl font-bold mb-4 text-poker-white">
            {job.title}
          </h1>

          {/* Store info */}
          <div className="mb-6">
            <Link 
              href={`/store/${store.id}`}
              className="text-poker-gold hover:text-poker-white text-xl font-semibold transition-colors"
            >
              {store.name}
            </Link>
            <p className="text-poker-silver mt-1">
              📍 {job.location.prefecture} {job.location.city} {job.location.address}
            </p>
          </div>

          {/* Salary highlight */}
          <div className="bg-gradient-to-r from-poker-darkgreen to-poker-green rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-poker-gold mb-2 flex items-center gap-2">
              <span className="text-3xl">💰</span>
              給与情報
            </h2>
            <div className="text-3xl font-bold text-poker-white">
              {job.salary.currency} {job.salary.min.toLocaleString()}〜{job.salary.max.toLocaleString()}円
            </div>
            <div className="text-poker-silver mt-1">
              {job.salary.unit} / {job.employment_type}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Job details */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-poker-gold flex items-center gap-2">
                <span className="suit-spade"></span>
                求人詳細
              </h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold text-poker-white mb-2">雇用形態</h3>
                  <p className="text-poker-silver">{job.employment_type}</p>
                </div>

                <div>
                  <h3 className="font-bold text-poker-white mb-2">勤務時間</h3>
                  <div className="space-y-2">
                    {job.working_hours.shifts.map((shift, index) => (
                      <div key={index} className="bg-poker-black/30 px-3 py-2 rounded text-poker-white">
                        {shift}
                      </div>
                    ))}
                    <p className="text-poker-silver text-sm mt-2">
                      {job.working_hours.days_per_week}
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-poker-white mb-2">応募条件</h3>
                  <ul className="space-y-2">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="text-poker-silver flex items-start gap-2">
                        <span className="text-poker-green text-sm mt-1">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-poker-gold flex items-center gap-2">
                <span className="suit-heart text-poker-red"></span>
                待遇・福利厚生
              </h2>
              
              <ul className="space-y-3">
                {job.benefits.map((benefit, index) => (
                  <li key={index} className="text-poker-white flex items-start gap-2">
                    <span className="text-poker-gold text-lg">♦</span>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Job description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-poker-gold flex items-center gap-2">
              <span className="suit-diamond text-poker-red"></span>
              仕事内容
            </h2>
            <div className="bg-poker-black/30 rounded-lg p-6">
              <p className="text-poker-white leading-relaxed">
                {job.description}
              </p>
            </div>
          </div>

          {/* Application section */}
          <div className="bg-gradient-to-r from-poker-darkred to-poker-darkgreen rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4 text-poker-gold">
              この求人に応募する
            </h2>
            <p className="text-poker-white mb-6">
              応募をご希望の方は、以下の連絡先までお問い合わせください
            </p>
            
            <div className="bg-poker-black/30 rounded-lg p-4 mb-6">
              <p className="text-poker-silver">
                <span className="font-bold text-poker-gold">連絡方法:</span> {job.contact.method}
              </p>
              <p className="text-poker-white text-lg">
                <span className="font-bold text-poker-gold">連絡先:</span> {job.contact.value}
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <DealerButton
                text="店舗詳細を見る"
                variant="secondary"
                icon="🏢"
                onClick={() => window.location.href = `/store/${store.id}`}
              />
              <DealerButton
                text="応募について問い合わせ"
                variant="gold"
                icon="📧"
                onClick={() => window.location.href = `mailto:${job.contact.value}?subject=${encodeURIComponent(`【${job.title}】応募について`)}`}
                className="pulse-glow"
              />
            </div>
          </div>
        </div>

        {/* 広告スペース - 求人詳細の下 */}
        <div className="mb-8 flex justify-center">
          <AdSpace variant="banner" slot={`job-detail-${id}`} />
        </div>

        {/* Store info */}
        <div className="bg-poker-black/50 border-2 border-poker-gold/30 rounded-xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-poker-gold flex items-center gap-2">
            <span className="suit-club"></span>
            {store.name} について
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-poker-white mb-3">基本情報</h3>
              <div className="space-y-2 text-poker-silver">
                <p className="flex items-center gap-2">
                  <span>🎰</span>
                  {store.table_count}テーブル稼働中
                </p>
                <p className="flex items-center gap-2">
                  <span>📍</span>
                  {store.location.access}
                </p>
                <p className="flex items-center gap-2">
                  <span>⏰</span>
                  {store.business_hours.weekday}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold text-poker-white mb-3">店舗特徴</h3>
              <div className="flex flex-wrap gap-2">
                {store.features.slice(0, 4).map((feature, index) => (
                  <span 
                    key={index} 
                    className="text-xs bg-poker-green/20 text-poker-green px-2 py-1 rounded"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <p className="text-poker-silver mt-4">
            {store.description}
          </p>
        </div>
      </div>
    </div>
  );
}