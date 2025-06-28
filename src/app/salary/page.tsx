'use client';

import { useState, useEffect } from 'react';
import { Job } from '@/types';
import jobsData from '../../../data/jobs.json';

interface SalaryStats {
  area: string;
  average: number;
  min: number;
  max: number;
  count: number;
}

export default function SalaryPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState<'today' | 'week' | 'month'>('today');
  const [salaryStats, setSalaryStats] = useState<SalaryStats[]>([]);
  const jobs = jobsData.jobs as Job[];

  useEffect(() => {
    calculateSalaryStats();
  }, [selectedTimeframe]);

  const calculateSalaryStats = () => {
    const activeJobs = jobs.filter(job => job.status === 'active');
    
    // Group by prefecture
    const statsByArea = new Map<string, { salaries: number[], area: string }>();
    
    // エリアごとの都道府県マッピング
    const areaMapping: { [key: string]: string } = {
      '東京都': '関東',
      '神奈川県': '関東',
      '千葉県': '関東',
      '埼玉県': '関東',
      '大阪府': '関西',
      '京都府': '関西',
      '兵庫県': '関西',
      '愛知県': '中部',
      '福岡県': '九州',
      // 他の都道府県も追加可能
    };

    activeJobs.forEach(job => {
      const area = areaMapping[job.location.prefecture] || job.location.prefecture;
      if (!statsByArea.has(area)) {
        statsByArea.set(area, { salaries: [], area });
      }
      
      // 時給の平均値を計算（最小値と最大値の中間）
      const avgSalary = (job.salary.min + job.salary.max) / 2;
      statsByArea.get(area)!.salaries.push(avgSalary);
    });

    const stats: SalaryStats[] = Array.from(statsByArea.entries()).map(([area, data]) => {
      const salaries = data.salaries;
      const average = Math.round(salaries.reduce((a, b) => a + b, 0) / salaries.length);
      const min = Math.min(...salaries);
      const max = Math.max(...salaries);
      
      return {
        area,
        average,
        min,
        max,
        count: salaries.length
      };
    }).sort((a, b) => b.average - a.average);

    setSalaryStats(stats);
  };

  const getTimeframeLabel = () => {
    switch(selectedTimeframe) {
      case 'today': return '本日';
      case 'week': return '今週';
      case 'month': return '今月';
    }
  };

  const nationalAverage = salaryStats.length > 0
    ? Math.round(salaryStats.reduce((sum, stat) => sum + stat.average * stat.count, 0) / 
        salaryStats.reduce((sum, stat) => sum + stat.count, 0))
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">ポーカーディーラー時給相場</h1>
        <p className="text-gray-600">全国のポーカールームにおける時給データを集計しています</p>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">集計期間</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTimeframe('today')}
              className={`px-4 py-2 rounded ${
                selectedTimeframe === 'today' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-300'
              }`}
            >
              本日
            </button>
            <button
              onClick={() => setSelectedTimeframe('week')}
              className={`px-4 py-2 rounded ${
                selectedTimeframe === 'week' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-300'
              }`}
            >
              今週
            </button>
            <button
              onClick={() => setSelectedTimeframe('month')}
              className={`px-4 py-2 rounded ${
                selectedTimeframe === 'month' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white border border-gray-300'
              }`}
            >
              今月
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg">
          <div className="text-center mb-6">
            <p className="text-gray-600 mb-2">{getTimeframeLabel()}の全国平均時給</p>
            <p className="text-4xl font-bold text-blue-600">¥{nationalAverage.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">
              {salaryStats.reduce((sum, stat) => sum + stat.count, 0)}件の求人データより算出
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">エリア別時給相場</h3>
        <div className="grid gap-4">
          {salaryStats.map((stat, index) => (
            <div key={stat.area} className="bg-white border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-700">#{index + 1}</span>
                  <h4 className="text-lg font-semibold">{stat.area}</h4>
                </div>
                <span className="text-sm text-gray-500">{stat.count}件</span>
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">平均時給</p>
                  <p className="text-xl font-bold text-blue-600">¥{stat.average.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">最低時給</p>
                  <p className="text-lg font-semibold">¥{stat.min.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">最高時給</p>
                  <p className="text-lg font-semibold">¥{stat.max.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all"
                    style={{ width: `${(stat.average / 3000) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 rounded-lg p-6">
        <h3 className="font-semibold mb-2">データについて</h3>
        <ul className="text-sm text-gray-700 space-y-1">
          <li>• 掲載中の求人情報から自動集計しています</li>
          <li>• 時給は求人に記載された最低額と最高額の平均値を使用</li>
          <li>• エリア分類は都道府県を基準にしています</li>
          <li>• データは毎日自動更新されます</li>
        </ul>
      </div>
    </div>
  );
}