import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { shareSettings, elderProfile } from '../data/dummyData';
import { setFrequency as saveFrequency, getFrequency } from '../data/settingsStore';

type Step = 'welcome' | 'sharing' | 'notification' | 'done';
type Frequency = 'every' | 'daily' | 'change';

const frequencies: { value: Frequency; label: string; desc: string; icon: string }[] = [
  { value: 'every',  label: '記録のたびに通知',       desc: '記録が追加されるたびにお知らせ',       icon: 'notifications_active' },
  { value: 'daily',  label: '1日1回まとめて通知',     desc: '毎日19:00にまとめてお知らせ',    icon: 'summarize' },
  { value: 'change', label: '変化があったときのみ通知', desc: '心の状態スコアが著しく低いことが続く場合・記録がされなかった場合',      icon: 'trending_up' },
];

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('welcome');
  const [frequency, setFrequency] = useState<Frequency>(getFrequency());

  // ── Welcome ──
  if (step === 'welcome') {
    return (
      <div className="page-enter flex flex-col h-full text-center" style={{ background: '#FAFAF8' }}>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="text-[72px] mb-5">🌿</div>
          <h1 className="text-[24px] font-bold" style={{ color: '#2D3748' }}>みまもりファミリー</h1>
          <p className="text-[15px] mt-3" style={{ color: '#5A6577', lineHeight: 1.7 }}>
            {elderProfile.relation}の日々の様子を<br />やさしく見守るアプリです
          </p>
          <p className="text-[13px] mt-5" style={{ color: '#8896A6', lineHeight: 1.6 }}>
            まずは共有設定と通知の設定を<br />確認しましょう
          </p>
        </div>
        {/* ボタン: フレーム下端から24px */}
        <div className="shrink-0 px-6" style={{ paddingBottom: 24 }}>
          <button onClick={() => setStep('sharing')} className="m3-btn-filled w-full">
            はじめる
          </button>
        </div>
      </div>
    );
  }

  // ── 共有設定 ──
  if (step === 'sharing') {
    const sharedCount = shareSettings.filter(s => s.shared).length;
    return (
      <div className="page-enter flex flex-col h-full" style={{ background: '#FAFAF8' }}>
        {/* ステップバー: Dynamic Island避けて下に配置 */}
        <div className="shrink-0 px-6" style={{ paddingTop: 48 }}>
          <div className="flex gap-2">
            <div className="flex-1 h-[4px] rounded-full" style={{ background: '#7BB5A0' }} />
            <div className="flex-1 h-[4px] rounded-full" style={{ background: '#CDD5DE' }} />
          </div>
          <p className="text-[12px] mt-2" style={{ color: '#8896A6' }}>ステップ 1 / 2</p>
        </div>

        {/* コンテンツ */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 pt-4">
          <h1 className="text-[20px] font-bold" style={{ color: '#2D3748' }}>共有設定の確認</h1>

          {/* 注記カード */}
          <div className="m3-card rounded-[16px] flex items-start gap-3" style={{ background: '#D4EDE4', marginTop: 16 }}>
            <div className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(26,61,48,0.15)' }}>
              <span className="material-symbols-rounded" style={{ fontSize: 20, color: '#1A3D30' }}>lock</span>
            </div>
            <div>
              <p className="text-[14px] font-bold" style={{ color: '#1A3D30' }}>共有範囲はご本人が設定しています</p>
              <p className="text-[12px] mt-1" style={{ color: '#1A3D30', opacity: 0.8, lineHeight: 1.5 }}>
                {elderProfile.relation}が設定した共有範囲に基づいて情報が共有されます。この設定は家族側からは変更できません。
              </p>
            </div>
          </div>

          {/* 共有項目プログレスバー */}
          <div className="m3-card" style={{ marginTop: 12 }}>
            <p className="text-[15px] font-bold" style={{ color: '#2D3748' }}>共有項目</p>
            <div className="w-full rounded-full h-[8px] overflow-hidden mt-2" style={{ background: '#E0E0DD' }}>
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${Math.round((sharedCount / shareSettings.length) * 100)}%`, background: '#7BB5A0' }} />
            </div>
            <p className="text-[12px] mt-1" style={{ color: '#5A6577' }}>{sharedCount} / {shareSettings.length} の項目が共有されています</p>
          </div>

          {/* Settings list */}
          <div className="m3-card p-0 overflow-hidden" style={{ marginTop: 12 }}>
            {shareSettings.map((setting, i) => (
              <div key={setting.id}
                   className={`flex items-center gap-3 px-4 py-4 ${i < shareSettings.length - 1 ? 'border-b' : ''} ${!setting.shared ? 'opacity-45' : ''}`}
                   style={{ borderColor: '#CDD5DE' }}>
                <div className="w-[30px] h-[30px] rounded-full flex items-center justify-center shrink-0"
                     style={{ background: setting.shared ? '#D4EDE4' : '#E0E0DD' }}>
                  <span className="material-symbols-rounded" style={{ fontSize: 16, color: setting.shared ? '#1A3D30' : '#8896A6' }}>
                    {setting.shared ? 'visibility' : 'lock'}
                  </span>
                </div>
                <p className="flex-1 min-w-0 text-[14px] font-medium" style={{ color: setting.shared ? '#2D3748' : '#5A6577' }}>{setting.label}</p>
                <span className="text-[11px] px-3 py-1 rounded-full font-semibold shrink-0"
                      style={{ background: setting.shared ? '#D4EDE4' : '#E0E0DD', color: setting.shared ? '#1A3D30' : '#5A6577' }}>
                  {setting.shared ? '共有' : '非共有'}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ボタン: フレーム下端から24px */}
        <div className="shrink-0 px-6" style={{ paddingBottom: 24, paddingTop: 16 }}>
          <button onClick={() => setStep('notification')} className="m3-btn-filled w-full">
            確認しました、次へ
          </button>
        </div>
      </div>
    );
  }

  // ── 通知設定 ──
  if (step === 'notification') {
    return (
      <div className="page-enter flex flex-col h-full" style={{ background: '#FAFAF8' }}>
        {/* ステップバー: Dynamic Island避けて下に配置 */}
        <div className="shrink-0 px-6" style={{ paddingTop: 48 }}>
          <div className="flex gap-2">
            <div className="flex-1 h-[4px] rounded-full" style={{ background: '#7BB5A0' }} />
            <div className="flex-1 h-[4px] rounded-full" style={{ background: '#7BB5A0' }} />
          </div>
          <p className="text-[12px] mt-2" style={{ color: '#8896A6' }}>ステップ 2 / 2</p>
        </div>

        {/* コンテンツ */}
        <div className="flex-1 min-h-0 overflow-y-auto px-6 pt-4">
          <h1 className="text-[20px] font-bold" style={{ color: '#2D3748' }}>通知の設定</h1>
          <p className="text-[13px] mt-1" style={{ color: '#5A6577', lineHeight: 1.5 }}>
            どのタイミングで通知を受け取りますか？
          </p>

          {/* 通知頻度カード: 間隔16px */}
          <div className="flex flex-col" style={{ gap: 16, marginTop: 16 }}>
            {frequencies.map(f => {
              const sel = frequency === f.value;
              return (
                <button key={f.value} onClick={() => setFrequency(f.value)}
                  className={`w-full rounded-[12px] p-4 flex items-center gap-3 m3-state transition-all ${sel ? 'm3-card-elevated' : 'm3-card-outlined'}`}
                  style={{ outline: sel ? '2px solid #7BB5A0' : 'none' }}>
                  <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0"
                       style={{ background: sel ? '#D4EDE4' : '#E0E0DD' }}>
                    <span className="material-symbols-rounded" style={{ fontSize: 22, color: sel ? '#1A3D30' : '#5A6577' }}>{f.icon}</span>
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[14px] font-medium" style={{ color: sel ? '#7BB5A0' : '#2D3748' }}>{f.label}</p>
                    <p className="text-[12px] mt-0.5" style={{ color: '#5A6577' }}>{f.desc}</p>
                  </div>
                  {sel && (
                    <div className="w-[22px] h-[22px] rounded-full flex items-center justify-center shrink-0" style={{ background: '#7BB5A0' }}>
                      <span className="material-symbols-rounded" style={{ fontSize: 14, color: '#fff' }}>check</span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* 注意カード: 間隔16px */}
          <div className="m3-card rounded-[12px] flex items-start gap-3 py-3" style={{ background: '#FDE8D0', marginTop: 16 }}>
            <span className="material-symbols-rounded mt-[2px]" style={{ fontSize: 18, color: '#3D2800' }}>info</span>
            <p className="text-[12px]" style={{ color: '#3D2800', lineHeight: 1.5 }}>
              大きな変化がある場合は、どの設定でも通知されます。
            </p>
          </div>
        </div>

        {/* ボタン: フレーム下端から24px */}
        <div className="shrink-0 px-6" style={{ paddingBottom: 24, paddingTop: 16 }}>
          <button onClick={() => { saveFrequency(frequency); setStep('done'); }} className="m3-btn-filled w-full">
            設定を完了する
          </button>
        </div>
      </div>
    );
  }

  // ── Done ──
  return (
    <div className="page-enter flex flex-col h-full text-center" style={{ background: '#FAFAF8' }}>
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-[72px] mb-5">✨</div>
        <h1 className="text-[24px] font-bold" style={{ color: '#2D3748' }}>設定が完了しました</h1>
        <p className="text-[15px] mt-3" style={{ color: '#5A6577', lineHeight: 1.7 }}>
          {elderProfile.relation}の様子を<br />やさしく見守っていきましょう
        </p>
      </div>
      <div className="shrink-0 px-6" style={{ paddingBottom: 24 }}>
        <button onClick={() => navigate('/home')} className="m3-btn-filled w-full">
          ホーム画面へ
        </button>
      </div>
    </div>
  );
}
