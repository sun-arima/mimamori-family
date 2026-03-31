import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import { notifications as initialNotifications, type Notification } from '../data/dummyData';

const typeConfig = {
  normal: { icon: 'edit_note', bg: '#D4EDE4', color: '#1A3D30', label: '記録' },
  change: { icon: 'trending_up', bg: '#FDE8D0', color: '#3D2800', label: '変化あり' },
  alert:  { icon: 'warning', bg: '#FDDDD8', color: '#4A0E08', label: '要確認' },
};

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifications);
  const markRead = (id: string) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const handleTap = (notif: Notification) => { markRead(notif.id); if (notif.linkTo) navigate(notif.linkTo); };
  const grouped = notifs.reduce<Record<string, Notification[]>>((acc, n) => { (acc[n.date] = acc[n.date] || []).push(n); return acc; }, {});
  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <div className="page-enter pb-8">
      <PageHeader title="通知" rightElement={
        unreadCount > 0 ? (
          <span className="text-[12px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: '#C0392B', color: '#fff' }}>
            {unreadCount}
          </span>
        ) : undefined
      } />
      <div className="pt-2">
        {Object.entries(grouped).map(([date, items]) => (
          <div key={date} className="mb-5">
            <div className="flex items-center gap-3 py-2 mb-3">
              <div className="h-px flex-1" style={{ background: '#CDD5DE' }} />
              <span className="text-[13px] font-medium" style={{ color: '#5A6577' }}>{date}</span>
              <div className="h-px flex-1" style={{ background: '#CDD5DE' }} />
            </div>
            <div className="flex flex-col gap-4">
              {items.map(notif => {
                const cfg = typeConfig[notif.type];
                return (
                  <button key={notif.id} onClick={() => handleTap(notif)}
                    className={`w-full text-left m3-state rounded-[16px] ${notif.read ? 'opacity-50' : ''}`}>
                    <div className="m3-card-outlined rounded-[16px]">
                      <div className="flex items-start gap-3">
                        <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center shrink-0"
                             style={{ background: cfg.bg }}>
                          <span className="material-symbols-rounded" style={{ fontSize: 22, color: cfg.color }}>{cfg.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[11px] px-3 py-1 rounded-full font-semibold"
                                  style={{ background: cfg.bg, color: cfg.color }}>{cfg.label}</span>
                            <span className="text-[12px]" style={{ color: '#8896A6' }}>{notif.time}</span>
                            {!notif.read && <span className="w-[8px] h-[8px] rounded-full ml-auto shrink-0" style={{ background: '#7BB5A0' }} />}
                          </div>
                          <p className={`text-[15px] ${notif.read ? '' : 'font-bold'}`} style={{ color: '#2D3748' }}>
                            {notif.title}
                          </p>
                          <p className="text-[13px] mt-1 line-clamp-2" style={{ color: '#5A6577', lineHeight: 1.5 }}>
                            {notif.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
