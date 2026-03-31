import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { getFrequency, setFrequency as saveFrequency } from '../data/settingsStore';

type Frequency = 'every' | 'daily' | 'change';
const frequencies: { value: Frequency; label: string; desc: string; icon: string }[] = [
  { value: 'every',  label: '記録のたびに通知',       desc: '記録が追加されるたびにお知らせ',       icon: 'notifications_active' },
  { value: 'daily',  label: '1日1回まとめて通知',     desc: '毎日19:00にまとめてお知らせ',    icon: 'summarize' },
  { value: 'change', label: '変化があったときのみ通知', desc: '心の状態スコアが著しく低いことが続く場合・記録がされなかった場合',      icon: 'trending_up' },
];

export default function NotificationSettingsPage() {
  const [frequency, setFrequency] = useState<Frequency>(getFrequency());
  const [saved, setSaved] = useState(false);
  const handleSave = () => { saveFrequency(frequency); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="page-enter flex flex-col h-full">
      <PageHeader title="通知設定" backTo="/settings/sharing" />
      <div className="flex flex-col gap-5 pt-2 flex-1">
        <div>
          <h3 className="text-[17px] font-bold mb-3 px-1" style={{ color: '#2D3748' }}>通知頻度</h3>
          <div className="flex flex-col gap-3">
            {frequencies.map(f => {
              const sel = frequency === f.value;
              return (
                <button key={f.value} onClick={() => setFrequency(f.value)}
                  className={`w-full rounded-[16px] p-4 flex items-center gap-3 m3-state transition-all ${sel ? 'm3-card-elevated' : 'm3-card-outlined'}`}
                  style={{ outline: sel ? '2px solid #7BB5A0' : 'none' }}>
                  <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0"
                       style={{ background: sel ? '#D4EDE4' : '#E0E0DD' }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 24, color: sel ? '#1A3D30' : '#5A6577' }}>{f.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[15px] font-medium" style={{ color: sel ? '#7BB5A0' : '#2D3748' }}>{f.label}</p>
                    <p className="text-[13px] mt-0.5" style={{ color: '#5A6577' }}>{f.desc}</p>
                  </div>
                  {sel && (
                    <div className="w-[24px] h-[24px] rounded-full flex items-center justify-center shrink-0" style={{ background: '#7BB5A0' }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 16, color: '#fff' }}>check</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="m3-card rounded-[16px] flex items-start gap-3" style={{ background: '#FDE8D0' }}>
          <span className="material-symbols-rounded mt-[2px]" style={{ fontSize: 22, color: '#3D2800' }}>priority_high</span>
          <p className="text-[13px]" style={{ color: '#3D2800', lineHeight: 1.6 }}>
            <span className="font-bold">大きな変化が検知された場合の通知は、どの設定にしていても送信されます。</span>
            これはご本人の安全を確認するための重要な通知です。
          </p>
        </div>

        {/* スペーサー：ボタンを下に押す */}
        <div className="flex-1" />

        <div className="pb-6">
          <button onClick={handleSave}
            className="m3-btn-filled w-full"
            style={saved ? { background: '#D4EDE4', color: '#1A3D30' } : {}}>
            {saved ? (
              <span className="flex items-center gap-2">
                <span className="material-symbols-rounded" style={{ fontSize: 20 }}>check_circle</span>
                保存しました
              </span>
            ) : '設定を保存'}
          </button>
        </div>
      </div>
    </div>
  );
}
