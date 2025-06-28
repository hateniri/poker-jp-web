import { Dealer, Store } from '@/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import dealersData from '../../../../data/dealers.json';
import storesData from '../../../../data/stores.json';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DealerPage({ params }: Props) {
  const { id } = await params;
  const dealers: Dealer[] = dealersData.dealers;
  const stores: Store[] = storesData.stores;

  const dealer = dealers.find(d => d.id === id);
  
  if (!dealer) {
    notFound();
  }

  const currentStore = dealer.current_store_id 
    ? stores.find(s => s.id === dealer.current_store_id)
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{dealer.display_name}</h1>
          <p className="text-gray-600 text-lg">本名: {dealer.name}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">プロフィール</h2>
              <p className="text-gray-700 mb-4">{dealer.profile.bio}</p>
              
              <div className="space-y-3">
                <div>
                  <span className="font-semibold">経験年数:</span>
                  <span className="ml-2">{dealer.profile.experience_years}年</span>
                </div>
                
                <div>
                  <span className="font-semibold">得意ゲーム:</span>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {dealer.profile.specialty.map((game, index) => (
                      <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                        {game}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="font-semibold">資格・認定:</span>
                  <ul className="mt-1 list-disc list-inside">
                    {dealer.profile.certifications.map((cert, index) => (
                      <li key={index} className="text-gray-700">{cert}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">勤務履歴</h2>
              <div className="space-y-4">
                {dealer.work_history.map((history, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h3 className="font-semibold">{history.store_name}</h3>
                    <p className="text-gray-600">{history.position}</p>
                    <p className="text-sm text-gray-500">
                      {history.period.start} 〜 {history.period.end || '現在'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-yellow-50 p-6 rounded-lg mb-6">
              <h2 className="text-xl font-semibold mb-4">評価</h2>
              <div className="text-center mb-4">
                <div className="text-3xl font-bold">{dealer.ratings.average}</div>
                <div className="text-gray-500">({dealer.ratings.count}件のレビュー)</div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>プロフェッショナリズム</span>
                  <span className="font-semibold">{dealer.ratings.breakdown.professionalism}</span>
                </div>
                <div className="flex justify-between">
                  <span>ゲーム管理</span>
                  <span className="font-semibold">{dealer.ratings.breakdown.game_management}</span>
                </div>
                <div className="flex justify-between">
                  <span>コミュニケーション</span>
                  <span className="font-semibold">{dealer.ratings.breakdown.communication}</span>
                </div>
                <div className="flex justify-between">
                  <span>公平性</span>
                  <span className="font-semibold">{dealer.ratings.breakdown.fairness}</span>
                </div>
              </div>
            </div>

            {currentStore && (
              <div className="bg-blue-50 p-6 rounded-lg mb-6">
                <h3 className="font-semibold mb-2">現在の勤務先</h3>
                <Link href={`/store/${currentStore.id}`} className="text-blue-600 hover:underline">
                  {currentStore.name}
                </Link>
              </div>
            )}

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-2">募集状況</h3>
              <p className="text-gray-700">
                {dealer.availability.status === 'employed' && '現在勤務中'}
                {dealer.availability.status === 'seeking' && '求職中'}
                {dealer.availability.status === 'unavailable' && '募集停止中'}
              </p>
              {dealer.availability.open_to_offers && (
                <p className="text-green-600 mt-1">オファー受付中</p>
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/review/new"
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 inline-block"
          >
            このディーラーのレビューを投稿
          </Link>
        </div>
      </div>
    </div>
  );
}