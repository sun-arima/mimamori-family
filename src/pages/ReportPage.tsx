import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceArea, ReferenceLine } from 'recharts';
import PageHeader from '../components/PageHeader';
import { monthlyScores, analysisInsights } from '../data/dummyData';

// 50点以下の区間を特定
function getLowZones(data: typeof monthlyScores) {
  const zones: { start: string; end: string }[] = [];
  let zoneStart: string | null = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].score < 50) {
      if (!zoneStart) zoneStart = data[i].date;
    } else {
      if (zoneStart) {
        zones.push({ start: zoneStart, end: data[i - 1].date });
        zoneStart = null;
      }
    }
  }
  if (zoneStart) zones.push({ start: zoneStart, end: data[data.length - 1].date });
  return zones;
}

// カスタムドット
function CustomDot(props: any) {
  const { cx, cy, payload } = props;
  if (!cx || !cy) return null;
  const isLow = payload.score < 50;
  return (
    <circle cx={cx} cy={cy} r={isLow ? 5 : 3}
      fill={isLow ? '#C0392B' : '#7BB5A0'}
      stroke="#fff" strokeWidth={2} />
  );
}

export default function ReportPage() {
  const navigate = useNavigate();
  const lowZones = getLowZones(monthlyScores);

  const changes = analysisInsights.filter(i => i.type === 'change');
  const advicesAndHints = analysisInsights.filter(i => i.type === 'advice' || i.type === 'hint');

  return (
    <div className="page-enter pb-8">
      <PageHeader title="分析レポート" backTo="/home" />
      <div className="flex flex-col gap-4 pt-2">
        {/* 月タイトル */}
        <div className="px-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="material-symbols-rounded" style={{ fontSize: 22, color: '#7BB5A0' }}>calendar_month</span>
            <h2 className="text-[20px] font-bold" style={{ color: '#2D3748' }}>3月のレポート</h2>
          </div>
          <p className="text-[14px]" style={{ color: '#5A6577', lineHeight: 1.6 }}>
            過去1ヶ月の記録から、変化の傾向をお伝えします。
          </p>
          <p className="text-[12px] mt-1" style={{ color: '#8896A6' }}>
            ※ あくまで参考情報です。医療的な判断ではありません。
          </p>
        </div>

        {/* グラフカード */}
        <div className="m3-card-elevated rounded-[16px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[16px] font-bold" style={{ color: '#2D3748' }}>心の状態スコアの推移</h3>
            <span className="text-[12px] font-medium px-3 py-1 rounded-full" style={{ background: '#F5F5F2', color: '#5A6577' }}>3月</span>
          </div>

          {/* 凡例 */}
          <div className="flex items-center gap-4 mb-2">
            <div className="flex items-center gap-1.5">
              <div className="w-[10px] h-[10px] rounded-full" style={{ background: '#7BB5A0' }} />
              <span className="text-[11px]" style={{ color: '#5A6577' }}>通常</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-[10px] h-[10px] rounded-full" style={{ background: '#C0392B' }} />
              <span className="text-[11px]" style={{ color: '#5A6577' }}>50点未満</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-[10px] h-[3px]" style={{ background: '#C0392B', opacity: 0.15 }} />
              <span className="text-[11px]" style={{ color: '#5A6577' }}>注意エリア</span>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyScores} margin={{ top: 8, right: 4, bottom: 8, left: -20 }}>
              <defs>
                <linearGradient id="reportGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#7BB5A0" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#7BB5A0" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#CDD5DE" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#5A6577' }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#5A6577' }} axisLine={false} tickLine={false} ticks={[0, 25, 50, 75, 100]} />
              <ReferenceLine y={50} stroke="#C0392B" strokeDasharray="4 4" strokeOpacity={0.4} />
              {lowZones.map((zone, i) => (
                <ReferenceArea key={i} x1={zone.start} x2={zone.end} y1={0} y2={50}
                  fill="#C0392B" fillOpacity={0.08} stroke="#C0392B" strokeOpacity={0.15} strokeDasharray="3 3" />
              ))}
              <Tooltip
                contentStyle={{ borderRadius: 12, border: '1px solid #CDD5DE', fontSize: 13, background: '#fff', padding: '8px 12px' }}
                formatter={(v: number) => [`${v} / 100`, '心の状態スコア']}
                labelFormatter={(label: string) => `${label}`}
              />
              <Area type="monotone" dataKey="score" stroke="#7BB5A0" strokeWidth={2.5} fill="url(#reportGrad)"
                    dot={<CustomDot />}
                    activeDot={{ r: 6, fill: '#7BB5A0', strokeWidth: 2, stroke: '#fff' }} />
            </AreaChart>
          </ResponsiveContainer>

          {/* 警告サマリー */}
          <div className="mt-4 p-4 rounded-[12px] flex items-start gap-3" style={{ background: '#FDDDD8' }}>
            <span className="material-symbols-rounded mt-[2px]" style={{ fontSize: 22, color: '#C0392B' }}>warning</span>
            <div>
              <p className="text-[15px] font-bold" style={{ color: '#4A0E08' }}>3月15日〜21日にスコアが低下しています</p>
              <p className="text-[13px] mt-1" style={{ color: '#4A0E08', opacity: 0.8 }}>
                50点を下回る日が複数あり、3/20は20点（低調）まで低下。記録回数も減少しています。
              </p>
            </div>
          </div>
        </div>

        {/* ===== 変化カード（1枚にまとめ） ===== */}
        {changes.length > 0 && (
          <div style={{
            background: '#fff',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
          }}>
            {/* ヘッダー */}
            <div className="flex items-center gap-3" style={{ padding: '16px 20px 12px', borderBottom: '1px solid #F0F0ED' }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: '#FDDDD8',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18,
              }}>
                📉
              </div>
              <div>
                <span className="text-[12px] font-semibold" style={{
                  background: '#FDDDD8', color: '#4A0E08',
                  padding: '3px 10px', borderRadius: 20,
                }}>変化</span>
              </div>
            </div>

            {/* 変化項目リスト */}
            {changes.map((insight, i) => (
              <div key={insight.id} style={{
                padding: '16px 20px',
                borderBottom: i < changes.length - 1 ? '1px solid #F5F5F2' : 'none',
              }}>
                <div className="flex items-center gap-2 mb-1">
                  {insight.date && (
                    <span className="text-[12px] font-medium" style={{ color: '#8896A6' }}>{insight.date}</span>
                  )}
                </div>
                <p className="text-[15px] font-bold" style={{ color: '#2D3748' }}>{insight.title}</p>
                <p className="text-[13px] mt-1" style={{ color: '#5A6577', lineHeight: 1.6 }}>{insight.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* ===== アドバイスカード（アドバイス+ヒントを1枚に統合） ===== */}
        {advicesAndHints.length > 0 && (
          <div style={{
            background: '#fff',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
          }}>
            {/* ヘッダー */}
            <div className="flex items-center gap-3" style={{
              padding: '16px 20px 14px',
              borderBottom: '1px solid #F0F0ED',
              background: 'linear-gradient(135deg, #F0F7F4 0%, #F8FBF9 100%)',
            }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                background: '#D4EDE4',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 2px 6px rgba(123,181,160,0.2)',
              }}>
                <span className="material-symbols-rounded" style={{ fontSize: 22, color: '#1A3D30' }}>lightbulb</span>
              </div>
              <div>
                <p className="text-[15px] font-bold" style={{ color: '#2D3748' }}>アドバイス</p>
                <p className="text-[12px]" style={{ color: '#5A6577' }}>変化に対してできること</p>
              </div>
            </div>

            {/* 項目リスト */}
            {advicesAndHints.map((insight, i) => (
              <div key={insight.id} style={{
                padding: '16px 20px',
                borderBottom: i < advicesAndHints.length - 1 ? '1px solid #F5F5F2' : 'none',
              }}>
                <div className="flex items-start gap-3">
                  <div style={{
                    width: 28, height: 28, borderRadius: 8,
                    background: insight.type === 'hint' ? '#FDE8D0' : '#D4EDE4',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 14, flexShrink: 0, marginTop: 1,
                  }}>
                    {insight.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold" style={{ color: '#2D3748' }}>{insight.title}</p>
                    <p className="text-[13px] mt-1" style={{ color: '#5A6577', lineHeight: 1.6 }}>{insight.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button onClick={() => navigate('/chat')} className="m3-btn-filled w-full">
          <span className="material-symbols-rounded" style={{ fontSize: 22 }}>chat</span>
          メッセージを送る
        </button>

        <div className="m3-card-outlined flex items-start gap-3" style={{ background: '#F5F5F2' }}>
          <span className="material-symbols-rounded mt-[2px]" style={{ fontSize: 20, color: '#8896A6' }}>info</span>
          <p className="text-[13px]" style={{ color: '#5A6577' }}>
            この分析は記録データをもとにした参考情報です。気になることがあれば、かかりつけ医にご相談ください。
          </p>
        </div>
      </div>
    </div>
  );
}
