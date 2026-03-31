import { useNavigate } from 'react-router-dom';
import { elderProfile, todayMood, todayMoodSummary, moodConfig } from '../data/dummyData';

// 脳トレダミーデータ
const brainData = {
  todayScore: 82,
  yesterdayScore: 78,
  weeklyAvg: 76,
  monthlyAvg: 74,
  streakDays: 12,
  totalSessions: 156,
  todayMinutes: 18,
  categories: [
    { name: '記憶力', score: 85, icon: '🧠', color: '#7BB5A0', prevScore: 80 },
    { name: '注意力', score: 78, icon: '👁️', color: '#6B8EBE', prevScore: 75 },
    { name: '計算力', score: 88, icon: '🔢', color: '#F4A261', prevScore: 82 },
    { name: '言語力', score: 72, icon: '📝', color: '#9B7FCB', prevScore: 74 },
    { name: '空間認識', score: 80, icon: '🧩', color: '#E0825E', prevScore: 78 },
  ],
};

const todayActivities = [
  { time: '09:00', name: '数字記憶チャレンジ', score: 85, duration: '5分', category: '記憶力', icon: '🧠' },
  { time: '10:30', name: '足し算フラッシュ', score: 92, duration: '4分', category: '計算力', icon: '🔢' },
  { time: '14:00', name: '単語しりとり', score: 68, duration: '6分', category: '言語力', icon: '📝' },
  { time: '16:00', name: '間違い探し', score: 80, duration: '3分', category: '注意力', icon: '👁️' },
];

const weeklyTrend = [
  { day: '月', score: 72 },
  { day: '火', score: 78 },
  { day: '水', score: 74 },
  { day: '木', score: 80 },
  { day: '金', score: 82 },
  { day: '土', score: 0 },
  { day: '日', score: 0 },
];

export default function HomePageBrain() {
  const navigate = useNavigate();
  const mood = moodConfig[todayMood];
  const scoreDiff = brainData.todayScore - brainData.yesterdayScore;

  return (
    <div className="page-enter pb-8">
      <div className="pt-6 pb-4">
        <p className="text-[14px]" style={{ color: '#5A6577' }}>認知症予防</p>
        <h1 className="text-[24px] font-bold mt-1" style={{ color: '#2D3748' }}>{elderProfile.relation}の脳トレ状況</h1>
      </div>

      <div className="flex flex-col gap-4">

        {/* ===== 今日のスコア ===== */}
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: '20px', background: 'linear-gradient(135deg, #E8EAF6 0%, #F3E5F5 100%)' }}>
            <div className="flex items-center gap-4">
              {/* スコアサークル */}
              <div className="shrink-0 relative" style={{ width: 88, height: 88 }}>
                <svg width={88} height={88} style={{ transform: 'rotate(-90deg)' }}>
                  <circle cx={44} cy={44} r={38} fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth={8} />
                  <circle cx={44} cy={44} r={38} fill="none" stroke="#7C4DFF" strokeWidth={8}
                    strokeDasharray={2 * Math.PI * 38} strokeDashoffset={2 * Math.PI * 38 * (1 - brainData.todayScore / 100)}
                    strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[24px] font-bold" style={{ color: '#2D3748' }}>{brainData.todayScore}</span>
                  <span className="text-[9px]" style={{ color: '#8896A6' }}>/ 100</span>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full" style={{ background: '#EDE7F6', color: '#5E35B1' }}>
                    🔥 {brainData.streakDays}日連続
                  </span>
                </div>
                <p className="text-[16px] font-bold" style={{ color: '#2D3748' }}>今日の脳トレスコア</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="material-symbols-rounded" style={{ fontSize: 16, color: scoreDiff >= 0 ? '#7BB5A0' : '#C0392B' }}>
                    {scoreDiff >= 0 ? 'trending_up' : 'trending_down'}
                  </span>
                  <span className="text-[13px] font-semibold" style={{ color: scoreDiff >= 0 ? '#7BB5A0' : '#C0392B' }}>
                    前日比 {scoreDiff >= 0 ? '+' : ''}{scoreDiff}点
                  </span>
                </div>
                <p className="text-[11px] mt-1" style={{ color: '#8896A6' }}>今日のトレーニング {brainData.todayMinutes}分</p>
              </div>
            </div>
          </div>

          {/* 心の状態 */}
          <div className="flex items-center justify-between" style={{ padding: '12px 20px', borderTop: '1px solid #F0F0ED' }}>
            <div className="flex items-center gap-2">
              <span className="text-[24px]">{mood.icon}</span>
              <div>
                <p className="text-[10px]" style={{ color: '#8896A6' }}>今日の調子</p>
                <p className="text-[14px] font-bold" style={{ color: mood.color }}>{mood.label}</p>
              </div>
            </div>
            <p className="text-[12px]" style={{ color: '#5A6577' }}>{todayMoodSummary}</p>
          </div>
        </div>

        {/* ===== 能力別レーダー（バー表示） ===== */}
        <div className="m3-card">
          <h2 className="text-[15px] font-bold mb-3" style={{ color: '#2D3748' }}>能力別スコア</h2>
          <div className="flex flex-col gap-3">
            {brainData.categories.map((cat) => {
              const diff = cat.score - cat.prevScore;
              return (
                <div key={cat.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px]">{cat.icon}</span>
                      <span className="text-[13px] font-medium" style={{ color: '#2D3748' }}>{cat.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold" style={{ color: cat.color }}>{cat.score}</span>
                      <span className="text-[11px]" style={{ color: diff >= 0 ? '#7BB5A0' : '#C0392B' }}>
                        {diff >= 0 ? '▲' : '▼'}{Math.abs(diff)}
                      </span>
                    </div>
                  </div>
                  <div className="w-full rounded-full h-[6px]" style={{ background: '#E0E0DD' }}>
                    <div className="h-full rounded-full" style={{ width: `${cat.score}%`, background: cat.color, transition: 'width 0.8s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== 今日のトレーニング履歴 ===== */}
        <div className="m3-card">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[15px] font-bold" style={{ color: '#2D3748' }}>今日のトレーニング</h2>
            <span className="text-[12px] font-semibold px-2 py-0.5 rounded" style={{ background: '#F0F0ED', color: '#5A6577' }}>
              {todayActivities.length}回
            </span>
          </div>
          {todayActivities.map((act, i) => (
            <div key={i} className="flex items-center gap-3" style={{
              padding: '10px 0',
              borderBottom: i < todayActivities.length - 1 ? '1px solid #F5F5F2' : 'none',
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: '#F5F5F2', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>{act.icon}</div>
              <div className="flex-1 min-w-0">
                <p className="text-[13px] font-medium" style={{ color: '#2D3748' }}>{act.name}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[11px]" style={{ color: '#8896A6' }}>{act.time}</span>
                  <span className="text-[11px]" style={{ color: '#8896A6' }}>・{act.duration}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[16px] font-bold" style={{ color: act.score >= 80 ? '#7BB5A0' : act.score >= 60 ? '#F4A261' : '#C0392B' }}>
                  {act.score}<span className="text-[11px] font-normal" style={{ color: '#8896A6' }}>/100</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ===== 週間推移 ===== */}
        <div className="m3-card-outlined">
          <h2 className="text-[15px] font-bold mb-2" style={{ color: '#2D3748' }}>今週の脳トレスコア</h2>
          <div className="flex items-end gap-1.5 mt-2" style={{ height: 80 }}>
            {weeklyTrend.map((d, i) => {
              const h = d.score > 0 ? (d.score / 100) * 100 : 0;
              const isToday = i === 4;
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                  {d.score > 0 && <span className="text-[9px] font-semibold" style={{ color: '#5A6577' }}>{d.score}</span>}
                  <div style={{ height: 50, display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                    <div style={{
                      width: '100%', height: `${h}%`,
                      background: d.score === 0 ? '#E0E0DD' : isToday ? '#7C4DFF' : '#D1C4E9',
                      borderRadius: '4px 4px 0 0',
                      minHeight: d.score > 0 ? 4 : 2,
                    }} />
                  </div>
                  <span className="text-[10px]" style={{ color: isToday ? '#7C4DFF' : '#8896A6', fontWeight: isToday ? 700 : 400 }}>{d.day}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] mt-2" style={{ color: '#8896A6' }}>週平均: {brainData.weeklyAvg}点 ・ 月平均: {brainData.monthlyAvg}点</p>
        </div>

        {/* 認知症予防チェック */}
        <div className="m3-card" style={{ background: '#EDE7F6' }}>
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-rounded" style={{ fontSize: 24, color: '#5E35B1' }}>psychology</span>
            <h2 className="text-[15px] font-bold" style={{ color: '#5E35B1' }}>認知症予防の取り組み</h2>
          </div>
          <div className="flex flex-col gap-1.5">
            {[
              { label: '毎日の脳トレ習慣', done: true },
              { label: '記憶力トレーニング', done: true },
              { label: '計算力トレーニング', done: true },
              { label: '社会的交流（チャット）', done: true },
              { label: '新しい活動への挑戦', done: false },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: item.done ? '#5E35B1' : '#CDD5DE' }}>
                  {item.done ? 'check_circle' : 'radio_button_unchecked'}
                </span>
                <span className="text-[13px]" style={{ color: item.done ? '#2D3748' : '#8896A6' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        <button onClick={() => navigate('/report')} className="m3-btn-filled w-full">
          <span className="material-symbols-rounded" style={{ fontSize: 22 }}>analytics</span>
          分析レポートを見る
        </button>
        <button onClick={() => navigate('/chat')} className="w-full m3-state rounded-[12px]"
                style={{ height: 48, background: '#FDE8D0', color: '#3D2800', fontSize: 15, fontWeight: 600, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 22 }}>chat</span>
          メッセージを送る
        </button>
      </div>
    </div>
  );
}
