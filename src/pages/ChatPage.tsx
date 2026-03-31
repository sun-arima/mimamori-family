import { useState, useRef, useEffect } from 'react';
import PageHeader from '../components/PageHeader';
import { chatMessages as initialMessages, quickMessages, stamps, elderProfile, type ChatMessage } from '../data/dummyData';

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [input, setInput] = useState('');
  const [showStamps, setShowStamps] = useState(false);
  const [snackbar, setSnackbar] = useState<string | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = (text: string, type: 'text' | 'stamp' = 'text') => {
    if (!text.trim()) return;
    setMessages(prev => [...prev, {
      id: Date.now().toString(), sender: 'family', senderName: 'あなた', type, content: text,
      time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
    }]);
    setInput(''); setShowStamps(false);
    setSnackbar('送信しました'); setTimeout(() => setSnackbar(null), 2000);
  };

  const renderMessage = (msg: ChatMessage) => {
    const isFamily = msg.sender === 'family';
    const isSystem = msg.sender === 'system';

    // システムからの記録カード
    if (isSystem && msg.type === 'record_card' && msg.recordCards) {
      return (
        <div key={msg.id} className="flex flex-col items-center gap-1 my-2">
          {/* システムラベル */}
          <div className="flex items-center gap-1.5 mb-1">
            <span className="material-symbols-rounded" style={{ fontSize: 14, color: '#8896A6' }}>auto_awesome</span>
            <span className="text-[11px] font-medium" style={{ color: '#8896A6' }}>{msg.content}</span>
          </div>
          {/* 記録カード */}
          <div className="w-full rounded-[14px] overflow-hidden"
               style={{ background: '#fff', border: '1px solid #E0E0DD', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            {msg.recordCards.map((card, i) => (
              <div key={i} className="flex items-center gap-3" style={{ padding: '14px 18px' }}>
                <span className="text-[28px] leading-none shrink-0">{card.moodIcon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[14px] font-medium" style={{ color: '#5A6577' }}>{card.recordTime}</span>
                    <span className="text-[12px] rounded-full font-medium"
                          style={{ background: card.moodBgColor, color: card.moodColor, padding: '5px 14px' }}>
                      {card.moodLabel}
                    </span>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[11px]" style={{ color: '#8896A6' }}>心の状態スコア</p>
                  <p className="text-[18px] font-bold" style={{ color: card.moodColor }}>
                    {card.score}<span className="text-[12px] font-normal text-[#8896A6]">/100</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <span className="text-[11px]" style={{ color: '#8896A6' }}>{msg.time}</span>
        </div>
      );
    }

    // 通常メッセージ（家族 / 高齢者）
    return (
      <div key={msg.id} className={`flex ${isFamily ? 'justify-end' : 'justify-start'} items-end gap-2`}>
        {!isFamily && (
          <div className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[16px] shrink-0"
               style={{ background: '#D4EDE4' }}>
            {elderProfile.avatar}
          </div>
        )}
        <div className={`max-w-[65%] flex flex-col ${isFamily ? 'items-end' : 'items-start'}`}>
          {!isFamily && <span className="text-[12px] mb-0.5 ml-2" style={{ color: '#5A6577' }}>{msg.senderName}</span>}
          {msg.type === 'stamp' ? (
            <div className="text-[40px] py-1 px-2">{msg.content}</div>
          ) : (
            <div className="text-[14px]" style={{
              padding: '10px 16px',
              background: isFamily ? '#7BB5A0' : '#FFFFFF',
              color: isFamily ? '#fff' : '#2D3748',
              borderRadius: isFamily ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
              boxShadow: isFamily
                ? '0 1px 4px rgba(123,181,160,0.3)'
                : '0 1px 4px rgba(0,0,0,0.08)',
              border: isFamily ? 'none' : '1px solid #E8E8E5',
              lineHeight: 1.6,
            }}>
              {msg.content}
            </div>
          )}
          <span className="text-[11px] mt-0.5" style={{ color: '#8896A6' }}>{msg.time}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="page-enter flex flex-col h-full" style={{ background: '#FAFAF8' }}>
      <div className="px-4 shrink-0">
        <PageHeader title="家族交流" backTo="/home" />
      </div>

      {/* バナー */}
      <div className="py-2 px-4 mx-4 rounded-[12px]" style={{ background: '#D4EDE4' }}>
        <p className="text-[13px] text-center font-medium" style={{ color: '#1A3D30' }}>
          💬 記録が届いたら、気軽に声をかけてみましょう
        </p>
      </div>

      {/* メッセージエリア */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 hide-scrollbar">
        <div className="flex flex-col gap-3">
          {messages.map(renderMessage)}
        </div>
        <div ref={endRef} />
      </div>

      {snackbar && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 py-3 rounded-[12px] text-[15px] font-semibold z-50 elevation-3"
             style={{ background: '#2D3748', color: '#F0F2F5' }}>
          {snackbar}
        </div>
      )}

      {/* 入力エリア（下部固定） */}
      <div className="shrink-0 px-4" style={{ background: '#FFFFFF', borderTop: '1px solid #CDD5DE' }}>
        {/* 定型文 */}
        <div className="pt-3 pb-3">
          <div className="flex gap-3 overflow-x-auto hide-scrollbar">
            {quickMessages.map((msg, i) => (
              <button key={i} onClick={() => sendMessage(msg)}
                className="shrink-0 whitespace-nowrap rounded-full text-[14px] font-medium"
                style={{
                  background: '#D4EDE4', color: '#1A3D30',
                  padding: '10px 20px',
                  minHeight: 44,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}>
                {msg}
              </button>
            ))}
          </div>
        </div>

        {/* スタンプパネル */}
        {showStamps && (
          <div className="py-3" style={{ borderTop: '1px solid #CDD5DE', background: '#F5F5F2' }}>
            <div className="grid grid-cols-5 gap-2">
              {stamps.map((s, i) => (
                <button key={i} onClick={() => sendMessage(s, 'stamp')}
                  className="text-[28px] py-2 rounded-[12px] m3-state elevation-1" style={{ background: '#fff' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 入力バー */}
        <div className="flex items-center gap-2 py-2">
          <button onClick={() => setShowStamps(!showStamps)}
            className="w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0 m3-state"
            style={{ background: showStamps ? '#D4EDE4' : 'transparent' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 24, color: '#5A6577' }}>
              {showStamps ? 'keyboard' : 'mood'}
            </span>
          </button>
          <div className="flex-1 flex items-center rounded-[20px] px-4 h-[44px]" style={{ background: '#EFEFEC' }}>
            <input type="text" value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
              placeholder="メッセージを入力..."
              className="flex-1 bg-transparent text-[15px] outline-none" style={{ color: '#2D3748' }} />
          </div>
          <button onClick={() => sendMessage(input)} disabled={!input.trim()}
            className="w-[42px] h-[42px] rounded-full flex items-center justify-center shrink-0"
            style={{ background: input.trim() ? '#7BB5A0' : '#E0E0DD' }}>
            <span className="material-symbols-rounded" style={{ fontSize: 22, color: input.trim() ? '#fff' : '#8896A6' }}>send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
