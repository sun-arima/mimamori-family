import { useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { path: '/home', label: 'ホーム', icon: 'home', iconFilled: 'home' },
  { path: '/log', label: 'ログ', icon: 'monitoring', iconFilled: 'monitoring' },
  { path: '/report', label: '分析', icon: 'analytics', iconFilled: 'analytics' },
  { path: '/chat', label: '交流', icon: 'chat_bubble_outline', iconFilled: 'chat_bubble' },
  { path: '/settings/sharing', label: '設定', icon: 'settings', iconFilled: 'settings' },
];

export default function TabBar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className="z-50" style={{ background: '#FFFFFF', borderTop: '1px solid #CDD5DE' }}>
      <div className="flex items-stretch justify-around" style={{ height: 72 }}>
        {tabs.map(tab => {
          const isActive = location.pathname.startsWith(tab.path);
          return (
            <button
              key={tab.path}
              onClick={() => navigate(tab.path)}
              className="flex-1 flex flex-col items-center justify-center gap-1 m3-state"
            >
              <div className={`relative flex items-center justify-center rounded-full transition-all duration-200`}
                   style={{
                     width: 56, height: 32,
                     background: isActive ? '#D4EDE4' : 'transparent',
                   }}>
                <span className={`material-symbols-rounded ${isActive ? 'filled' : ''}`}
                      style={{ fontSize: 24, color: isActive ? '#1A3D30' : '#5A6577' }}>
                  {isActive ? tab.iconFilled : tab.icon}
                </span>
                {tab.badge && (
                  <span className="absolute -top-1 right-0 min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1 text-[11px] font-bold"
                        style={{ background: '#C0392B', color: '#fff' }}>
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[12px] font-medium" style={{ color: isActive ? '#1A3D30' : '#5A6577' }}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
