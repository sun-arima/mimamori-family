import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { shareSettings } from '../data/dummyData';
import { getFrequencyLabel, subscribe } from '../data/settingsStore';

export default function SharingSettingsPage() {
  const navigate = useNavigate();
  const sharedCount = shareSettings.filter(s => s.shared).length;
  const [freqLabel, setFreqLabel] = useState(getFrequencyLabel());
  useEffect(() => subscribe(() => setFreqLabel(getFrequencyLabel())), []);

  return (
    <div className="page-enter pb-8">
      <PageHeader title="設定" />
      <div className="flex flex-col gap-4 pt-2">

        {/* 通知設定 */}
        <button onClick={() => navigate('/settings/notifications')}
                className="m3-card w-full flex items-center gap-3 m3-state">
          <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0" style={{ background: '#FDE8D0' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 22, color: '#3D2800' }}>notifications</span>
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-[15px] font-medium" style={{ color: '#2D3748' }}>通知設定</p>
            <p className="text-[12px] mt-0.5 truncate" style={{ color: '#8896A6' }}>{freqLabel}</p>
          </div>
          <span className="material-symbols-rounded shrink-0" style={{ fontSize: 22, color: '#8896A6' }}>chevron_right</span>
        </button>

        {/* 共有設定 */}
        <button onClick={() => navigate('/settings/sharing-detail')}
                className="m3-card w-full flex items-center gap-3 m3-state">
          <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0" style={{ background: '#D4EDE4' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 22, color: '#1A3D30' }}>share</span>
          </div>
          <div className="flex-1 text-left min-w-0">
            <p className="text-[15px] font-medium" style={{ color: '#2D3748' }}>共有設定</p>
            <p className="text-[12px] mt-0.5" style={{ color: '#8896A6', lineHeight: 1.4 }}>
              {shareSettings.filter(s => s.shared).map(s => s.label).join('・')}
            </p>
          </div>
          <span className="material-symbols-rounded shrink-0" style={{ fontSize: 22, color: '#8896A6' }}>chevron_right</span>
        </button>

      </div>
    </div>
  );
}
