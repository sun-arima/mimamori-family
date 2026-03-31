import { useNavigate } from 'react-router-dom';

export default function LockScreenPage() {
  const navigate = useNavigate();
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
  const weekday = weekdays[now.getDay()];

  return (
    <div className="flex flex-col h-full" style={{
      background: 'linear-gradient(180deg, #ddeaf4 0%, #b8d8ec 12%, #7aaed4 28%, #3a6f9f 50%, #1b3a5c 75%, #0a1628 100%)',
      color: '#fff',
    }}>
      {/* 上部：日付と時刻 */}
      <div className="flex flex-col items-center pb-8" style={{ paddingTop: 100 }}>
        <p className="text-[15px] font-medium tracking-wide" style={{ opacity: 0.7 }}>
          {month}月{day}日 {weekday}曜日
        </p>
        <p className="text-[80px] font-extralight leading-none mt-1" style={{ letterSpacing: -3 }}>
          9:41
        </p>
      </div>

      {/* 中央スペーサー */}
      <div className="flex-1" />

      {/* 通知カード（iOS風） */}
      <div className="px-6 pb-6">
        <button
          onClick={() => navigate('/report')}
          className="w-full text-left m3-state rounded-[24px]"
        >
          <div className="rounded-[24px]" style={{
            background: 'rgba(255, 255, 255, 0.22)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            padding: '16px 18px',
          }}>
            {/* アプリアイコン + アプリ名 + 時刻 */}
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-[28px] h-[28px] rounded-[7px] flex items-center justify-center"
                   style={{ background: 'rgba(123, 181, 160, 0.9)' }}>
                <span className="text-[14px]">🌿</span>
              </div>
              <span className="text-[13px] font-semibold" style={{ opacity: 0.95 }}>みまもりファミリー</span>
              <span className="text-[13px] ml-auto" style={{ opacity: 0.5 }}>9:00</span>
            </div>

            {/* タグ + タイトル */}
            <div className="flex items-center gap-2 mb-1">
              <span style={{
                fontSize: 11, fontWeight: 700, color: '#fff',
                background: '#E04040', borderRadius: 6,
                padding: '3px 8px', letterSpacing: 0.5,
              }}>異変あり</span>
            </div>
            <p className="text-[16px] font-bold leading-snug">
              ご様子に少し変化があります
            </p>

            {/* 本文 */}
            <p className="text-[14px] mt-1.5" style={{ opacity: 0.85, lineHeight: 1.6 }}>
              ここ3日ほど記録回数が減少しています。短いメッセージで様子を聞いてみるのもおすすめです。
            </p>

            {/* 詳細を確認ボタン */}
            <div className="mt-4 w-full rounded-[14px] flex items-center justify-center gap-2"
                 style={{ background: 'rgba(255,255,255,0.25)', padding: '12px 0' }}>
              <span className="text-[14px] font-bold" style={{ color: '#fff' }}>今すぐ確認</span>
              <span className="material-symbols-rounded" style={{ fontSize: 18, color: '#fff' }}>arrow_forward</span>
            </div>
          </div>
        </button>
      </div>

      {/* 下部：フラッシュライト & カメラ + ヒント */}
      <div className="shrink-0 pb-6">
        {/* ヒントテキスト */}
        <div className="flex items-center justify-center gap-2 mb-5" style={{ opacity: 0.4 }}>
          <span className="material-symbols-rounded" style={{ fontSize: 14 }}>swipe_up</span>
          <span className="text-[12px]">上にスワイプしてロック解除</span>
        </div>
        {/* 下部ボタン */}
        <div className="flex items-center justify-between px-12">
          <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center"
               style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 22, color: '#fff' }}>flashlight_on</span>
          </div>
          <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center"
               style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 22, color: '#fff' }}>photo_camera</span>
          </div>
        </div>
      </div>
    </div>
  );
}
