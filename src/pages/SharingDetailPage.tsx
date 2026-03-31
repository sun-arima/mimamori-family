import PageHeader from '../components/PageHeader';
import { shareSettings, elderProfile } from '../data/dummyData';

export default function SharingDetailPage() {
  const sharedCount = shareSettings.filter(s => s.shared).length;
  const pct = Math.round((sharedCount / shareSettings.length) * 100);

  return (
    <div className="page-enter pb-8">
      <PageHeader title="共有設定" backTo="/settings/sharing" />
      <div className="flex flex-col gap-4 pt-2">

        {/* 注記 */}
        <div className="m3-card rounded-[16px]" style={{ background: '#D4EDE4' }}>
          <div className="flex items-start gap-3">
            <div className="w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0" style={{ background: 'rgba(26,61,48,0.15)' }}>
              <span className="material-symbols-rounded" style={{ fontSize: 24, color: '#1A3D30' }}>lock</span>
            </div>
            <div>
              <p className="text-[16px] font-bold" style={{ color: '#1A3D30' }}>共有範囲はご本人が設定しています</p>
              <p className="text-[13px] mt-1" style={{ color: '#1A3D30', opacity: 0.8, lineHeight: 1.6 }}>
                {elderProfile.relation}が設定した共有範囲に基づいて情報が共有されます。この設定は家族側からは変更できません。
              </p>
            </div>
          </div>
        </div>

        {/* 共有項目バー */}
        <div className="m3-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[16px] font-bold" style={{ color: '#2D3748' }}>共有項目</span>
          </div>
          <div className="w-full rounded-full h-[8px] overflow-hidden" style={{ background: '#E0E0DD' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${pct}%`, background: '#7BB5A0' }} />
          </div>
          <p className="text-[13px] mt-1" style={{ color: '#5A6577' }}>{sharedCount} / {shareSettings.length} の項目が共有されています</p>
        </div>

        {/* 共有項目リスト */}
        <div className="m3-card p-0 overflow-hidden">
          {shareSettings.map((setting, i) => (
            <div key={setting.id}
                 className={`flex items-center gap-3 px-5 py-5 ${i < shareSettings.length - 1 ? 'border-b' : ''} ${!setting.shared ? 'opacity-45' : ''}`}
                 style={{ borderColor: '#CDD5DE' }}>
              <div className="w-[38px] h-[38px] rounded-full flex items-center justify-center shrink-0"
                   style={{ background: setting.shared ? '#D4EDE4' : '#E0E0DD' }}>
                <span className="material-symbols-rounded" style={{ fontSize: 20, color: setting.shared ? '#1A3D30' : '#8896A6' }}>
                  {setting.shared ? 'visibility' : 'lock'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[15px] font-medium" style={{ color: setting.shared ? '#2D3748' : '#5A6577' }}>{setting.label}</p>
                <p className="text-[12px] mt-[2px] truncate" style={{ color: '#8896A6' }}>{setting.description}</p>
              </div>
              <span className="text-[11px] px-3 py-1 rounded-full font-semibold shrink-0"
                    style={{ background: setting.shared ? '#D4EDE4' : '#E0E0DD', color: setting.shared ? '#1A3D30' : '#5A6577' }}>
                {setting.shared ? '共有中' : '非共有'}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
