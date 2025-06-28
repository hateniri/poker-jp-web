'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/types';
import jobsData from '../../../data/jobs.json';
import PokerChip from '@/components/PokerChip';
import AdSpace from '@/components/AdSpace';

interface AreaSalaryStats {
  area: string;
  prefectures: string[];
  average: number;
  min: number;
  max: number;
  count: number;
  color: string;
}

const areaGroups = [
  { 
    area: '関東',
    prefectures: ['東京都', '神奈川県', '千葉県', '埼玉県', '茨城県', '栃木県', '群馬県'],
    color: 'red'
  },
  { 
    area: '関西',
    prefectures: ['大阪府', '京都府', '兵庫県', '奈良県', '滋賀県', '和歌山県'],
    color: 'green'
  },
  { 
    area: '中部',
    prefectures: ['愛知県', '岐阜県', '静岡県', '三重県', '新潟県', '富山県', '石川県', '福井県', '山梨県', '長野県'],
    color: 'black'
  },
  { 
    area: '北海道・東北',
    prefectures: ['北海道', '青森県', '岩手県', '宮城県', '秋田県', '山形県', '福島県'],
    color: 'blue'
  },
  { 
    area: '中国・四国',
    prefectures: ['鳥取県', '島根県', '岡山県', '広島県', '山口県', '徳島県', '香川県', '愛媛県', '高知県'],
    color: 'white'
  },
  { 
    area: '九州・沖縄',
    prefectures: ['福岡県', '佐賀県', '長崎県', '熊本県', '大分県', '宮崎県', '鹿児島県', '沖縄県'],
    color: 'red'
  }
];

export default function SalaryPage() {
  const [selectedArea, setSelectedArea] = useState<string>('all');
  const [areaSalaryStats, setAreaSalaryStats] = useState<AreaSalaryStats[]>([]);
  const jobs = jobsData.jobs as Job[];

  useEffect(() => {
    calculateAreaSalaryStats();
  }, []);

  const calculateAreaSalaryStats = () => {
    const activeJobs = jobs.filter(job => job.status === 'active' && job.salary.unit === '時給');
    
    const stats: AreaSalaryStats[] = areaGroups.map(group => {
      const areaJobs = activeJobs.filter(job => 
        group.prefectures.includes(job.location.prefecture)
      );
      
      if (areaJobs.length === 0) {
        return {
          area: group.area,
          prefectures: group.prefectures,
          average: 0,
          min: 0,
          max: 0,
          count: 0,
          color: group.color
        };
      }
      
      const salaries = areaJobs.map(job => (job.salary.min + job.salary.max) / 2);
      const average = Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length);
      const minSalaries = areaJobs.map(job => job.salary.min);
      const maxSalaries = areaJobs.map(job => job.salary.max);
      
      return {
        area: group.area,
        prefectures: group.prefectures,
        average,
        min: Math.min(...minSalaries),
        max: Math.max(...maxSalaries),
        count: areaJobs.length,
        color: group.color
      };
    }).filter(stat => stat.count > 0)
      .sort((a, b) => b.average - a.average);

    setAreaSalaryStats(stats);
  };

  const nationalAverage = areaSalaryStats.length > 0
    ? Math.round(areaSalaryStats.reduce((sum, stat) => sum + stat.average * stat.count, 0) / 
        areaSalaryStats.reduce((sum, stat) => sum + stat.count, 0))
    : 0;

  const getSelectedAreaStats = () => {
    if (selectedArea === 'all') {
      return areaSalaryStats;
    }
    return areaSalaryStats.filter(stat => stat.area === selectedArea);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-poker-gold neon-glow">
          ポーカーディーラー時給相場
        </h1>
        <p className="text-poker-silver text-xl">
          全国のポーカールームにおける時給データをエリア別に集計
        </p>
      </div>

      {/* National Average Display */}
      <div className="bg-gradient-to-r from-poker-darkgreen to-poker-green rounded-xl p-8 mb-12 text-center">
        <h2 className="text-2xl font-bold text-poker-gold mb-4">全国平均時給</h2>
        <div className="flex justify-center items-center gap-4 mb-6">
          <PokerChip value={nationalAverage} color="black" className="scale-150" />
          <div className="text-5xl font-bold text-poker-white">
            ¥{nationalAverage.toLocaleString()}
          </div>
        </div>
        <p className="text-poker-silver">
          {areaSalaryStats.reduce((sum, stat) => sum + stat.count, 0)}件の求人データより算出
        </p>
      </div>

      {/* 広告スペース - 全国平均の下 */}
      <div className="mb-8 flex justify-center">
        <AdSpace variant="horizontal" slot="salary-header" className="max-w-4xl w-full" />
      </div>

      {/* Area Selector */}
      <div className="flex justify-center mb-8">
        <div className="bg-poker-black/50 border-2 border-poker-gold/30 rounded-full p-1 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedArea('all')}
            className={`px-4 py-2 rounded-full font-bold transition-all ${
              selectedArea === 'all' 
                ? 'bg-poker-gold text-poker-black' 
                : 'text-poker-silver hover:text-poker-white'
            }`}
          >
            全エリア
          </button>
          {areaSalaryStats.map(stat => (
            <button
              key={stat.area}
              onClick={() => setSelectedArea(stat.area)}
              className={`px-4 py-2 rounded-full font-bold transition-all ${
                selectedArea === stat.area 
                  ? 'bg-poker-gold text-poker-black' 
                  : 'text-poker-silver hover:text-poker-white'
              }`}
            >
              {stat.area}
            </button>
          ))}
        </div>
      </div>

      {/* Area Stats Grid */}
      <div className="grid gap-6 mb-12">
        {getSelectedAreaStats().map((stat, index) => (
          <div 
            key={stat.area} 
            className="bg-poker-black/50 border-2 border-poker-gold/30 rounded-xl p-6 hover:border-poker-gold transition-all card-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-poker-gold">
                  #{selectedArea === 'all' ? index + 1 : ''}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-poker-white flex items-center gap-2">
                    <span className="suit-spade"></span>
                    {stat.area}エリア
                  </h3>
                  <p className="text-poker-silver text-sm">
                    {stat.prefectures.filter(pref => 
                      jobs.some(job => job.location.prefecture === pref && job.status === 'active')
                    ).join('、')}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-poker-silver text-sm">求人数</p>
                <p className="text-2xl font-bold text-poker-gold">{stat.count}件</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-poker-black/30 rounded-lg p-4 text-center">
                <p className="text-poker-silver mb-2">平均時給</p>
                <p className="text-3xl font-bold text-poker-gold">
                  ¥{stat.average.toLocaleString()}
                </p>
              </div>
              <div className="bg-poker-black/30 rounded-lg p-4 text-center">
                <p className="text-poker-silver mb-2">最低時給</p>
                <p className="text-2xl font-bold text-poker-white">
                  ¥{stat.min.toLocaleString()}
                </p>
              </div>
              <div className="bg-poker-black/30 rounded-lg p-4 text-center">
                <p className="text-poker-silver mb-2">最高時給</p>
                <p className="text-2xl font-bold text-poker-white">
                  ¥{stat.max.toLocaleString()}
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="bg-poker-black/30 rounded-full h-4 overflow-hidden">
                <div 
                  className="h-4 rounded-full transition-all duration-1000 bg-gradient-to-r from-poker-red to-poker-gold"
                  style={{ width: `${(stat.average / 5000) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-poker-silver mt-1">
                <span>¥0</span>
                <span>¥5,000</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Visual Comparison */}
      {selectedArea === 'all' && areaSalaryStats.length > 0 && (
        <div className="bg-poker-black/50 border-2 border-poker-gold/30 rounded-xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-poker-gold mb-6 text-center">
            エリア別時給比較
          </h3>
          <div className="flex justify-center items-end gap-4 h-64">
            {areaSalaryStats.map((stat, index) => (
              <div key={stat.area} className="flex flex-col items-center">
                <div className="relative">
                  <div 
                    className="w-20 bg-gradient-to-t from-poker-red to-poker-gold rounded-t transition-all duration-1000"
                    style={{ 
                      height: `${(stat.average / 5000) * 240}px`,
                      minHeight: '40px'
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-poker-gold font-bold">
                      ¥{stat.average}
                    </div>
                  </div>
                </div>
                <div className="text-poker-white text-sm mt-2 text-center">
                  {stat.area.split('・')[0]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Data Information */}
      <div className="bg-gradient-to-r from-poker-darkred to-poker-darkgreen rounded-xl p-6">
        <h3 className="font-bold text-poker-gold mb-3 text-xl">データについて</h3>
        <ul className="text-poker-white space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-poker-gold">♦</span>
            掲載中の求人情報から自動集計しています
          </li>
          <li className="flex items-start gap-2">
            <span className="text-poker-gold">♦</span>
            時給は求人に記載された最低額と最高額の平均値を使用
          </li>
          <li className="flex items-start gap-2">
            <span className="text-poker-gold">♦</span>
            エリア分類は都道府県を基準にしています
          </li>
          <li className="flex items-start gap-2">
            <span className="text-poker-gold">♦</span>
            サンプル求人も含まれているため、実際の相場と異なる場合があります
          </li>
        </ul>
      </div>

      <style jsx>{`
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
}