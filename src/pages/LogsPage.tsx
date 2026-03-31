import { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import PageHeader from '../components/PageHeader';
import { weeklyScores, monthlyScores } from '../data/dummyData';

// 週データを複数週分用意（ダミー）
const weeksData = [
  { label: '3/10 〜 3/16', data: [
    { day: '月', score: 60, count: 2 }, { day: '火', score: 40, count: 1 }, { day: '水', score: 80, count: 3 },
    { day: '木', score: 60, count: 2 }, { day: '金', score: 40, count: 1 }, { day: '土', score: 60, count: 2 }, { day: '日', score: 80, count: 2 },
  ]},
  { label: '3/17 〜 3/23', data: weeklyScores },
  { label: '3/24 〜 3/30', data: [
    { day: '月', score: 80, count: 3 }, { day: '火', score: 0, count: 0 }, { day: '水', score: 0, count: 0 },
    { day: '木', score: 0, count: 0 }, { day: '金', score: 0, count: 0 }, { day: '土', score: 0, count: 0 }, { day: '日', score: 0, count: 0 },
  ]},
];

const monthsData = [
  { label: '2月', data: monthlyScores.map(d => ({ ...d, score: Math.max(20, d.score - 10), date: d.date.replace('3/', '2/') })) },
  { label: '3月', data: monthlyScores },
];

export default function LogsPage() {
  const [range, setRange] = useState<'week' | 'month'>('week');
  const [weekIdx, setWeekIdx] = useState(1); // 現在の週（3/17〜3/23）
  const [monthIdx, setMonthIdx] = useState(1); // 現在の月（3月）

  const idx = range === 'week' ? weekIdx : monthIdx;
  const setIdx = range === 'week' ? setWeekIdx : setMonthIdx;
  const items = range === 'week' ? weeksData : monthsData;
  const current = items[idx];
  const data = current.data;
  const xKey = range === 'week' ? 'day' : 'date';

  const canPrev = idx > 0;
  const canNext = idx < items.length - 1;

  const avgScore = (data.reduce((s, d) => s + d.score, 0) / data.filter(d => d.score > 0).length || 0).toFixed(0);
  const avgCount = (data.reduce((s, d) => s + d.count, 0) / data.filter(d => d.count > 0).length || 0).toFixed(1);

  return (
    <div className="page-enter pb-8">
      <PageHeader title="ログ確認" />
      <div className="flex flex-col gap-4 pt-2">
        {/* 週/月 切り替え */}
        <div className="m3-segmented">
          <button className={range === 'week' ? 'active' : ''} onClick={() => setRange('week')}>1週間</button>
          <button className={range === 'month' ? 'active' : ''} onClick={() => setRange('month')}>1ヶ月</button>
        </div>

        {/* ← 期間ナビ → */}
        <div className="flex items-center justify-between">
          <button onClick={() => canPrev && setIdx(idx - 1)} disabled={!canPrev}
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center m3-state"
            style={{ opacity: canPrev ? 1 : 0.3 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 24, color: '#2D3748' }}>chevron_left</span>
          </button>
          <span className="text-[16px] font-bold" style={{ color: '#2D3748' }}>{current.label}</span>
          <button onClick={() => canNext && setIdx(idx + 1)} disabled={!canNext}
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center m3-state"
            style={{ opacity: canNext ? 1 : 0.3 }}>
            <span className="material-symbols-rounded" style={{ fontSize: 24, color: '#2D3748' }}>chevron_right</span>
          </button>
        </div>

        {/* Summary */}
        <div className="flex gap-3">
          <div className="m3-card flex-1 text-center">
            <p className="text-[12px]" style={{ color: '#5A6577' }}>平均 心の状態スコア</p>
            <p className="text-[36px] font-bold mt-1" style={{ color: '#7BB5A0' }}>{avgScore}</p>
            <p className="text-[13px]" style={{ color: '#5A6577' }}>/ 100点</p>
          </div>
          <div className="m3-card flex-1 text-center">
            <p className="text-[12px]" style={{ color: '#5A6577' }}>平均記録回数</p>
            <p className="text-[36px] font-bold mt-1" style={{ color: '#F4A261' }}>{avgCount}</p>
            <p className="text-[13px]" style={{ color: '#5A6577' }}>回 / 日</p>
          </div>
        </div>

        {/* Comparison */}
        {idx > 0 && (
          <div className="m3-card-outlined">
            <h3 className="text-[14px] font-bold mb-2" style={{ color: '#2D3748' }}>
              {range === 'week' ? '前週との比較' : '前月との比較'}
            </h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3">
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: '#7BB5A0' }}>trending_up</span>
                <span className="text-[14px]" style={{ color: '#5A6577' }}>心の状態スコア</span>
                <span className="text-[15px] font-bold ml-auto" style={{ color: '#7BB5A0' }}>+6</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: '#C0392B' }}>trending_down</span>
                <span className="text-[14px]" style={{ color: '#5A6577' }}>記録回数</span>
                <span className="text-[15px] font-bold ml-auto" style={{ color: '#C0392B' }}>-0.5</span>
              </div>
            </div>
          </div>
        )}

        {/* Score Chart */}
        <div className="m3-card">
          <h3 className="text-[14px] font-bold mb-3" style={{ color: '#2D3748' }}>心の状態スコアの推移</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={data} margin={{ top: 8, right: 4, bottom: 8, left: -20 }}>
              <defs>
                <linearGradient id="scoreGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7BB5A0" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#7BB5A0" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#CDD5DE" vertical={false} />
              <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#5A6577' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#5A6577' }} axisLine={false} tickLine={false} ticks={[0,25,50,75,100]} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #CDD5DE', fontSize: 12, background: '#fff', padding: '6px 10px' }}
                       formatter={(v: number) => [`${v} / 100`, '心の状態スコア']} />
              <Area type="monotone" dataKey="score" stroke="#7BB5A0" strokeWidth={2.5} fill="url(#scoreGrad)"
                    dot={{ r: 4, fill: '#7BB5A0', strokeWidth: 2, stroke: '#fff' }}
                    activeDot={{ r: 6, fill: '#7BB5A0', strokeWidth: 2, stroke: '#fff' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Count Chart */}
        <div className="m3-card">
          <h3 className="text-[14px] font-bold mb-3" style={{ color: '#2D3748' }}>記録回数の推移</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={data} margin={{ top: 8, right: 4, bottom: 8, left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#CDD5DE" vertical={false} />
              <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: '#5A6577' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#5A6577' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #CDD5DE', fontSize: 12, background: '#fff', padding: '6px 10px' }}
                       formatter={(v: number) => [`${v}回`, '記録回数']} />
              <Bar dataKey="count" fill="#FDE8D0" radius={[6, 6, 0, 0]} barSize={range === 'week' ? 28 : 14} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="m3-card-outlined flex items-start gap-3" style={{ background: '#F5F5F2' }}>
          <span className="material-symbols-rounded mt-[2px]" style={{ fontSize: 20, color: '#8896A6' }}>info</span>
          <p className="text-[13px]" style={{ color: '#5A6577' }}>
            心の状態スコアは、ご本人の共有設定がオンの場合のみ表示されます。
          </p>
        </div>
      </div>
    </div>
  );
}
