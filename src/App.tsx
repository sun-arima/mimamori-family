import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import TabBar from './components/TabBar';
import HomePage from './pages/HomePage';
import LogsPage from './pages/LogsPage';
import ReportPage from './pages/ReportPage';
import ChatPage from './pages/ChatPage';
import NotificationsPage from './pages/NotificationsPage';
import SharingSettingsPage from './pages/SharingSettingsPage';
import NotificationSettingsPage from './pages/NotificationSettingsPage';
import OnboardingPage from './pages/OnboardingPage';
import LockScreenPage from './pages/LockScreenPage';
import SharingDetailPage from './pages/SharingDetailPage';
import HomePageFrail from './pages/HomePageFrail';
import HomePageBrain from './pages/HomePageBrain';
import HomePageRaw from './pages/HomePageRaw';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/lockscreen" replace />} />
      <Route path="/lockscreen" element={<LockScreenPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/home/frail" element={<HomePageFrail />} />
      <Route path="/home/brain" element={<HomePageBrain />} />
      <Route path="/home/raw" element={<HomePageRaw />} />
      <Route path="/log" element={<LogsPage />} />
      <Route path="/report" element={<ReportPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/settings/sharing" element={<SharingSettingsPage />} />
      <Route path="/settings/sharing-detail" element={<SharingDetailPage />} />
      <Route path="/settings/notifications" element={<NotificationSettingsPage />} />
    </Routes>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center min-h-screen p-4" style={{ background: '#E8E8E5' }}>
      <div className="relative" style={{ width: 420, height: 880 }}>
        {/* Phone body */}
        <div className="absolute inset-0 rounded-[50px] bg-[#1a1a1a]"
             style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.3), inset 0 0 0 2px #333' }} />
        {/* Screen */}
        <div className="absolute rounded-[38px] overflow-hidden flex flex-col"
             style={{ top: 12, left: 12, right: 12, bottom: 12, background: '#FAFAF8' }}>
          {children}
        </div>
        {/* Dynamic Island */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[120px] h-[32px] bg-black rounded-full z-50" />
        {/* Home indicator */}
        <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 w-[130px] h-[5px] bg-[#666] rounded-full z-50" />
      </div>
    </div>
  );
}

function AppShell() {
  const location = useLocation();
  const navigate = useNavigate();

  const isLockScreen = location.pathname === '/lockscreen';
  const isOnboarding = location.pathname === '/onboarding';
  const isChat = location.pathname === '/chat';
  const hideChrome = isLockScreen || isOnboarding;
  const showHeader = !isLockScreen && !isOnboarding && !isChat;

  return (
    <PhoneFrame>
      {/* ロック画面はフルスクリーン */}
      {isLockScreen ? (
        <div className="flex-1 min-h-0 flex flex-col">
          <AppRoutes />
        </div>
      ) : (
        <>
          {/* iOS ステータスバー（細い）– Dynamic Island避け */}
          <div className="shrink-0 flex items-center justify-between px-7 pt-8 pb-0.5 z-50"
               style={{ background: showHeader ? '#7BB5A0' : '#FAFAF8' }}>
            <span className="text-[13px] font-semibold" style={{ color: showHeader ? '#fff' : '#2D3748' }}>9:41</span>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-rounded" style={{ fontSize: 15, color: showHeader ? '#fff' : '#2D3748' }}>signal_cellular_alt</span>
              <span className="material-symbols-rounded" style={{ fontSize: 15, color: showHeader ? '#fff' : '#2D3748' }}>wifi</span>
              <span className="material-symbols-rounded" style={{ fontSize: 15, color: showHeader ? '#fff' : '#2D3748' }}>battery_full</span>
            </div>
          </div>

          {/* アプリヘッダー（プライマリカラー + 通知ベル） */}
          {showHeader && (
            <div className="shrink-0 flex items-center justify-between px-5 pb-3 pt-1 z-40"
                 style={{ background: '#7BB5A0' }}>
              <div className="flex items-center gap-2">
                <span className="text-[18px]">🌿</span>
                <span className="text-[16px] font-bold" style={{ color: '#fff' }}>みまもり</span>
              </div>
              <button onClick={() => navigate('/notifications')} className="relative m3-state rounded-full"
                      style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-rounded" style={{ fontSize: 26, color: '#fff' }}>notifications</span>
                <span className="absolute rounded-full flex items-center justify-center text-[10px] font-bold"
                      style={{ top: 2, right: 0, minWidth: 18, height: 18, padding: '0 4px', background: '#C0392B', color: '#fff' }}>
                  3
                </span>
              </button>
            </div>
          )}

          {/* コンテンツ領域 – チャット画面は自身でスクロール管理するので overflow を切り替え */}
          <div className={`flex-1 min-h-0 overflow-x-hidden ${isChat ? 'flex flex-col overflow-hidden' : 'overflow-y-auto'}`}
               style={{ paddingLeft: isChat ? 0 : 16, paddingRight: isChat ? 0 : 16 }}>
            <AppRoutes />
          </div>

          {/* タブバー */}
          {!hideChrome && !isChat && (
            <div className="shrink-0">
              <TabBar />
            </div>
          )}
        </>
      )}
    </PhoneFrame>
  );
}

function App() {
  return (
    <BrowserRouter basename="/mimamori-family">
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
