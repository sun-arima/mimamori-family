import { useNavigate } from 'react-router-dom';
import { elderProfile, todayMood, moodConfig } from '../data/dummyData';

// フレイル予防ダミーデータ
const frailData = {
  steps: 3420,
  stepsGoal: 5000,
  walkMinutes: 28,
  standUpCount: 6,
  mealCount: 3,
  waterCups: 5,
  sleepHours: 7.2,
  weeklyAvgSteps: 4100,
  streakDays: 5,
};

const activities = [
  { time: '06:45', label: '起床', icon: '🌅', detail: '睡眠7.2時間' },
  { time: '07:30', label: '朝食', icon: '🍚', detail: 'ご飯・味噌汁・卵焼き' },
  { time: '08:30', label: '散歩', icon: '🚶', detail: '公園まで往復 22分 / 1,850歩' },
  { time: '10:00', label: '立ち上がり体操', icon: '🧘', detail: 'スクワット10回・ストレッチ5分' },
  { time: '12:15', label: '昼食', icon: '🍱', detail: '焼き魚定食' },
  { time: '14:00', label: '買い物', icon: '🛒', detail: 'スーパーまで徒歩 15分 / 1,200歩' },
  { time: '17:00', label: '夕方の散歩', icon: '🌆', detail: '近所を一周 6分 / 370歩' },
];

function ProgressRing({ value, max, size = 64, stroke = 6, color = '#7BB5A0' }: { value: number; max: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const pct = Math.min(value / max, 1);
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#E0E0DD" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circumference} strokeDashoffset={circumference * (1 - pct)}
        strokeLinecap="round" style={{ transition: 'stroke-dashoffset 0.8s ease' }} />
    </svg>
  );
}

export default function HomePageFrail() {
  const navigate = useNavigate();
  const mood = moodConfig[todayMood];
  const stepsPct = Math.round((frailData.steps / frailData.stepsGoal) * 100);

  return (
    <div className="page-enter pb-8">
      <div className="pt-6 pb-4">
        <p className="text-[14px]" style={{ color: '#5A6577' }}>フレイル予防</p>
        <h1 className="text-[24px] font-bold mt-1" style={{ color: '#2D3748' }}>{elderProfile.relation}の活動状況</h1>
      </div>

      <div className="flex flex-col gap-4">
        {/* ===== 今日のフレイル予防スコア ===== */}
        <div style={{ background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: '20px', background: 'linear-gradient(135deg, #E8F5E9 0%, #F1F8E9 100%)' }}>
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                <ProgressRing value={frailData.steps} max={frailData.stepsGoal} size={80} stroke={8} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[18px] font-bold" style={{ color: '#2D3748' }}>{stepsPct}%</span>
                  <span className="text-[9px]" style={{ color: '#8896A6' }}>達成</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full" style={{ background: '#D4EDE4', color: '#1A3D30' }}>
                    {frailData.streakDays}日連続
                  </span>
                  <span className="text-[28px] leading-none">{mood.icon}</span>
                </div>
                <p className="text-[22px] font-bold mt-1" style={{ color: '#2D3748' }}>
                  {frailData.steps.toLocaleString()}<span className="text-[14px] font-normal" style={{ color: '#8896A6' }}> 歩</span>
                </p>
                <p className="text-[12px] mt-0.5" style={{ color: '#5A6577' }}>目標 {frailData.stepsGoal.toLocaleString()} 歩</p>
              </div>
            </div>
          </div>

          {/* 3つの指標 */}
          <div className="flex" style={{ borderTop: '1px solid #F0F0ED' }}>
            {[
              { label: '歩行', value: `${frailData.walkMinutes}分`, icon: '🚶', color: '#7BB5A0' },
              { label: '食事', value: `${frailData.mealCount}回`, icon: '🍽️', color: '#F4A261' },
              { label: '睡眠', value: `${frailData.sleepHours}h`, icon: '😴', color: '#6B8EBE' },
            ].map((item, i) => (
              <div key={i} className="flex-1 text-center py-3" style={{ borderRight: i < 2 ? '1px solid #F0F0ED' : 'none' }}>
                <span className="text-[18px]">{item.icon}</span>
                <p className="text-[16px] font-bold mt-0.5" style={{ color: item.color }}>{item.value}</p>
                <p className="text-[10px]" style={{ color: '#8896A6' }}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 身体活動サマリー ===== */}
        <div className="m3-card">
          <h2 className="text-[15px] font-bold mb-2" style={{ color: '#2D3748' }}>身体活動のまとめ</h2>
          <div className="flex flex-col gap-2">
            {[
              { label: '立ち上がり回数', value: `${frailData.standUpCount}回`, target: '目標8回', pct: frailData.standUpCount/8, color: '#7BB5A0' },
              { label: '水分摂取', value: `${frailData.waterCups}杯`, target: '目標6杯', pct: frailData.waterCups/6, color: '#6B8EBE' },
              { label: '歩行時間', value: `${frailData.walkMinutes}分`, target: '目標30分', pct: frailData.walkMinutes/30, color: '#F4A261' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-[10px]" style={{ background: '#F5F5F2' }}>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-medium" style={{ color: '#2D3748' }}>{item.label}</span>
                    <span className="text-[14px] font-bold" style={{ color: item.color }}>{item.value}</span>
                  </div>
                  <div className="w-full rounded-full h-[5px] mt-1.5" style={{ background: '#E0E0DD' }}>
                    <div className="h-full rounded-full" style={{ width: `${Math.min(item.pct * 100, 100)}%`, background: item.color, transition: 'width 0.8s ease' }} />
                  </div>
                  <p className="text-[10px] mt-0.5" style={{ color: '#8896A6' }}>{item.target}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== 今日の活動タイムライン ===== */}
        <div className="m3-card">
          <h2 className="text-[15px] font-bold mb-3" style={{ color: '#2D3748' }}>今日の活動</h2>
          {activities.map((act, i) => (
            <div key={i} className="flex gap-3" style={{ paddingBottom: i < activities.length - 1 ? 12 : 0 }}>
              <div className="flex flex-col items-center">
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: '#F0F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 16,
                }}>{act.icon}</div>
                {i < activities.length - 1 && <div className="w-[2px] flex-1 my-1 rounded-full" style={{ background: '#E0E0DD' }} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[12px] font-semibold" style={{ color: '#5A6577', fontVariantNumeric: 'tabular-nums' }}>{act.time}</span>
                  <span className="text-[13px] font-bold" style={{ color: '#2D3748' }}>{act.label}</span>
                </div>
                <p className="text-[12px] mt-0.5" style={{ color: '#8896A6' }}>{act.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ===== 週間トレンド ===== */}
        <div className="m3-card-outlined">
          <h2 className="text-[15px] font-bold mb-2" style={{ color: '#2D3748' }}>今週の歩数推移</h2>
          <div className="flex items-end gap-1.5 mt-2" style={{ height: 80 }}>
            {['月','火','水','木','金','土','日'].map((d, i) => {
              const vals = [4200, 3800, 5100, 4500, 3420, 0, 0];
              const v = vals[i];
              const h = v > 0 ? (v / 5500) * 100 : 0;
              const isToday = i === 4;
              return (
                <div key={d} className="flex-1 flex flex-col items-center gap-1">
                  <div style={{ height: 60, display: 'flex', alignItems: 'flex-end', width: '100%' }}>
                    <div style={{
                      width: '100%', height: `${h}%`,
                      background: v === 0 ? '#E0E0DD' : isToday ? '#7BB5A0' : '#D4EDE4',
                      borderRadius: '4px 4px 0 0',
                      minHeight: v > 0 ? 4 : 2,
                    }} />
                  </div>
                  <span className="text-[10px]" style={{ color: isToday ? '#7BB5A0' : '#8896A6', fontWeight: isToday ? 700 : 400 }}>{d}</span>
                </div>
              );
            })}
          </div>
          <p className="text-[11px] mt-2" style={{ color: '#8896A6' }}>週平均: {frailData.weeklyAvgSteps.toLocaleString()} 歩/日</p>
        </div>

        {/* フレイル予防チェック */}
        <div className="m3-card" style={{ background: '#E8F5E9' }}>
          <div className="flex items-center gap-3 mb-2">
            <span className="material-symbols-rounded" style={{ fontSize: 24, color: '#2E7D32' }}>verified</span>
            <h2 className="text-[15px] font-bold" style={{ color: '#2E7D32' }}>フレイル予防の取り組み</h2>
          </div>
          <div className="flex flex-col gap-1.5">
            {[
              { label: '毎日の歩行習慣', done: true },
              { label: '3食の食事記録', done: true },
              { label: '立ち上がり体操', done: true },
              { label: '水分摂取の管理', done: frailData.waterCups >= 5 },
              { label: '十分な睡眠', done: frailData.sleepHours >= 7 },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="material-symbols-rounded" style={{ fontSize: 18, color: item.done ? '#2E7D32' : '#CDD5DE' }}>
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
