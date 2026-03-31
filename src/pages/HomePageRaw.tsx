import { useNavigate } from 'react-router-dom';
import {
  elderProfile, todayRecords, todayMood, todayMoodSummary,
  calendarData, moodConfig
} from '../data/dummyData';

// 記録に日記本文と写真を追加
const extendedRecords = [
  {
    ...todayRecords[0],
    diary: '朝の散歩に行けて気持ちよかった。公園の桜がもう咲き始めていて、写真を撮った。帰り道にパン屋さんに寄って、クロワッサンを買ってきた。',
    photos: ['🌸 桜の写真', '🥐 クロワッサン'],
  },
  {
    ...todayRecords[1],
    diary: 'お昼ごはんをしっかり食べた。今日は焼き魚定食にした。食後に少しテレビを見て休憩。午前中に友人の山田さんから電話があって、来週のお茶会の話をした。',
    photos: [],
  },
  {
    ...todayRecords[2],
    diary: '少し疲れたけど夕方のテレビを楽しんだ。買い物で少し歩きすぎたかもしれない。足が少しだるい。でもスーパーで新鮮な野菜が買えてよかった。明日はゆっくりしよう。',
    photos: ['🥬 野菜の写真'],
  },
];

export default function HomePageRaw() {
  const navigate = useNavigate();
  const mood = moodConfig[todayMood];
  const lastRecord = todayRecords[todayRecords.length - 1];
  const avgScore = Math.round(todayRecords.reduce((s, r) => s + r.score, 0) / todayRecords.length);

  return (
    <div className="page-enter pb-8">
      {/* Header */}
      <div className="pt-6 pb-5">
        <p className="text-[14px]" style={{ color: '#5A6577' }}>こんにちは</p>
        <h1 className="text-[24px] font-bold mt-1" style={{ color: '#2D3748' }}>
          {elderProfile.relation}の様子
        </h1>
        <p className="text-[12px] mt-1 px-2 py-0.5 rounded inline-block" style={{ background: '#FDE8D0', color: '#3D2800' }}>
          記録本文・写真あり
        </p>
      </div>

      <div className="flex flex-col gap-4">

        {/* ===== メインカード（元のホームと同じ構造） ===== */}
        <button onClick={() => navigate('/log')} className="w-full text-left m3-state rounded-[16px]">
          <div style={{
            background: '#fff', borderRadius: 16, overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
          }}>
            {/* 上段: アバター + 吹き出し + スコアサマリー */}
            <div style={{ padding: '20px 20px 16px' }}>
              <div className="flex items-start gap-3">
                <div className="shrink-0" style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: 'linear-gradient(135deg, #D4EDE4 0%, #B8DFD0 100%)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, boxShadow: '0 2px 8px rgba(123,181,160,0.25)',
                }}>
                  {elderProfile.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="relative">
                    <div style={{
                      position: 'absolute', left: -6, top: 14,
                      width: 0, height: 0,
                      borderTop: '6px solid transparent',
                      borderBottom: '6px solid transparent',
                      borderRight: '8px solid #F0F7F4',
                    }} />
                    <div style={{
                      padding: '12px 16px', background: '#F0F7F4',
                      borderRadius: '4px 16px 16px 16px', lineHeight: 1.6,
                    }}>
                      <p className="text-[14px] font-medium" style={{ color: '#2D3748' }}>
                        {todayMoodSummary}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* 今日の調子サマリー */}
              <div className="flex items-center justify-between mt-4" style={{
                padding: '12px 16px', background: '#FAFAF8', borderRadius: 12,
              }}>
                <div className="flex items-center gap-3">
                  <span className="text-[32px] leading-none">{mood.icon}</span>
                  <div>
                    <p className="text-[11px] font-medium" style={{ color: '#8896A6' }}>今日の調子</p>
                    <p className="text-[18px] font-bold" style={{ color: mood.color }}>{mood.label}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[11px] font-medium" style={{ color: '#8896A6' }}>心の状態スコア</p>
                  <p className="text-[24px] font-bold" style={{ color: '#2D3748' }}>
                    {avgScore}<span className="text-[14px] font-normal" style={{ color: '#8896A6' }}>/100</span>
                  </p>
                </div>
              </div>
            </div>

            {/* 下段: 今日の記録リスト */}
            <div style={{ borderTop: '1px solid #F0F0ED' }}>
              <div className="flex items-center justify-between" style={{ padding: '14px 20px 8px' }}>
                <h2 className="text-[15px] font-bold" style={{ color: '#2D3748' }}>今日の記録</h2>
                <div className="flex items-center gap-2">
                  <span style={{ fontSize: 12, fontWeight: 600, color: '#5A6577', background: '#F0F0ED', borderRadius: 6, padding: '3px 8px' }}>
                    {todayRecords.length}回
                  </span>
                  <span style={{ fontSize: 12, color: '#8896A6' }}>最終 {lastRecord.time}</span>
                </div>
              </div>

              {todayRecords.map((record, i) => {
                const rm = moodConfig[record.mood];
                const isLast = i === todayRecords.length - 1;
                return (
                  <div key={record.id} className="flex items-center" style={{
                    padding: '12px 20px',
                    borderBottom: isLast ? 'none' : '1px solid #F5F5F2',
                  }}>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#5A6577', width: 48, flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
                      {record.time}
                    </span>
                    <span className="text-[24px] leading-none shrink-0 mx-2">{rm.icon}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: rm.color, background: rm.bgColor, borderRadius: 20, padding: '4px 12px', flexShrink: 0 }}>
                      {record.moodLabel}
                    </span>
                    <div className="flex-1" />
                    <span style={{ fontSize: 18, fontWeight: 700, color: '#2D3748', flexShrink: 0, fontVariantNumeric: 'tabular-nums' }}>
                      {record.score}<span style={{ fontSize: 12, fontWeight: 400, color: '#8896A6' }}>/100</span>
                    </span>
                  </div>
                );
              })}

              <div style={{ padding: '12px 20px 16px', borderTop: '1px solid #F5F5F2', display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#7BB5A0' }}>詳しく見る</span>
                <span className="material-symbols-rounded" style={{ fontSize: 16, color: '#7BB5A0' }}>arrow_forward</span>
              </div>
            </div>
          </div>
        </button>

        {/* ===== 記録詳細（日記 + 写真） ===== */}
        {extendedRecords.map((record) => {
          const rm = moodConfig[record.mood];
          return (
            <div key={record.id} style={{
              background: '#fff', borderRadius: 16, overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              borderLeft: `4px solid ${rm.color}`,
            }}>
              {/* ヘッダー */}
              <div className="flex items-center justify-between" style={{ padding: '14px 16px 10px' }}>
                <div className="flex items-center gap-2">
                  <span className="text-[22px]">{rm.icon}</span>
                  <span className="text-[15px] font-bold" style={{ color: '#2D3748', fontVariantNumeric: 'tabular-nums' }}>{record.time}</span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                        style={{ background: rm.bgColor, color: rm.color }}>{record.moodLabel}</span>
                </div>
                <span className="text-[18px] font-bold" style={{ color: rm.color }}>
                  {record.score}<span className="text-[11px] font-normal" style={{ color: '#8896A6' }}>/100</span>
                </span>
              </div>

              {/* 日記本文 */}
              <div style={{ padding: '0 16px 12px' }}>
                <p className="text-[13px]" style={{ color: '#2D3748', lineHeight: 1.7 }}>{record.diary}</p>
              </div>

              {/* 写真 */}
              {record.photos.length > 0 && (
                <div style={{ padding: '0 16px 14px' }}>
                  <div className="flex gap-2">
                    {record.photos.map((photo, j) => (
                      <div key={j} style={{
                        flex: 1, height: 80, borderRadius: 10,
                        background: '#F0F7F4', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        border: '1px solid #E0E0DD',
                      }}>
                        <span className="text-[12px]" style={{ color: '#5A6577' }}>{photo}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* カレンダー */}
        <div className="m3-card">
          <h2 className="text-[15px] font-bold mb-3" style={{ color: '#2D3748' }}>3月の記録カレンダー</h2>
          <div className="grid grid-cols-7 gap-1">
            {['月','火','水','木','金','土','日'].map(d => (
              <div key={d} className="text-center text-[12px] py-1 font-medium" style={{ color: '#5A6577' }}>{d}</div>
            ))}
            {Array.from({ length: 5 }).map((_, i) => <div key={`e${i}`} className="h-[34px]" />)}
            {calendarData.map(day => {
              const isToday = day.day === 24;
              const m = day.mood ? moodConfig[day.mood] : null;
              return (
                <div key={day.day}
                     className="relative text-center h-[34px] flex items-center justify-center rounded-full text-[13px] font-medium"
                     style={{
                       background: m ? m.bgColor : 'transparent',
                       color: m ? '#2D3748' : '#8896A6',
                       outline: isToday ? '2px solid #7BB5A0' : 'none',
                       outlineOffset: 2,
                     }}>
                  {day.day}
                </div>
              );
            })}
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={`f${i}`} className="text-center h-[34px] flex items-center justify-center text-[13px]" style={{ color: '#CDD5DE' }}>
                {25 + i <= 31 ? 25 + i : ''}
              </div>
            ))}
          </div>
        </div>

        {/* ショートカット */}
        <button onClick={() => navigate('/report')} className="m3-btn-filled w-full">
          <span className="material-symbols-rounded" style={{ fontSize: 22 }}>analytics</span>
          分析レポートを見る
        </button>
        <button onClick={() => navigate('/chat')} className="w-full m3-state rounded-[12px]"
                style={{ height: 48, background: '#FDE8D0', color: '#3D2800', fontSize: 15, fontWeight: 600, border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 22 }}>chat</span>
          メッセージを送る
        </button>

        {/* 注記 */}
        <div className="m3-card-outlined flex items-start gap-3" style={{ background: '#F5F5F2' }}>
          <span className="material-symbols-rounded mt-[2px]" style={{ fontSize: 20, color: '#8896A6' }}>lock</span>
          <p className="text-[13px]" style={{ color: '#5A6577', lineHeight: 1.6 }}>
            表示されている情報は、ご本人が設定した共有範囲に基づいています。
            <button onClick={() => navigate('/settings/sharing')} style={{ color: '#7BB5A0' }} className="font-semibold ml-1">
              共有設定を確認
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
