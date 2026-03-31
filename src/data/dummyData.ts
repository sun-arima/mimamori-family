// ── 型定義 ──
export type MoodLevel = 'great' | 'good' | 'neutral' | 'tired' | 'low';

export interface ElderProfile {
  name: string;
  relation: string;
  age: number;
  avatar: string;
}

export interface DailyRecord {
  id: string;
  time: string;
  mood: MoodLevel;
  moodLabel: string;
  score: number;
  summary: string;
}

export interface CalendarDay {
  day: number;
  mood: MoodLevel | null;
  recordCount: number;
}

export interface WeeklyScore {
  day: string;
  score: number;
  count: number;
}

export interface MonthlyScore {
  date: string;
  score: number;
  count: number;
}

export interface Notification {
  id: string;
  type: 'normal' | 'change' | 'alert';
  title: string;
  body: string;
  time: string;
  date: string;
  read: boolean;
  linkTo?: string;
}

export interface RecordCardData {
  recordTime: string;
  moodLabel: string;
  moodIcon: string;
  score: number;
  moodColor: string;
  moodBgColor: string;
}

export interface ChatMessage {
  id: string;
  sender: 'family' | 'elder' | 'system';
  senderName: string;
  type: 'text' | 'stamp' | 'record_card';
  content: string;
  time: string;
  recordCards?: RecordCardData[];
}

export interface ShareSetting {
  id: string;
  label: string;
  description: string;
  shared: boolean;
}

export interface AnalysisInsight {
  id: string;
  type: 'change' | 'advice' | 'hint';
  title: string;
  body: string;
  date?: string;
  icon: string;
}

// ── ダミーデータ ──

export const elderProfile: ElderProfile = {
  name: '田中 はなさん',
  relation: 'お母さん',
  age: 78,
  avatar: '👵',
};

export const moodConfig: Record<MoodLevel, { label: string; color: string; bgColor: string; icon: string }> = {
  great:  { label: 'とても良い',  color: '#5A9E85', bgColor: '#D4EDE4', icon: '😄' },
  good:   { label: 'おだやか',    color: '#7BB5A0', bgColor: '#E0F2EB', icon: '😊' },
  neutral:{ label: 'ふつう',      color: '#D4903A', bgColor: '#FDE8D0', icon: '😐' },
  tired:  { label: '少し疲れ気味', color: '#E0825E', bgColor: '#FDE0D0', icon: '😮‍💨' },
  low:    { label: '低調',        color: '#C0392B', bgColor: '#FDDDD8', icon: '😔' },
};

export const todayRecords: DailyRecord[] = [
  { id: '1', time: '08:30', mood: 'good',  moodLabel: 'おだやか',    score: 72, summary: '朝の散歩に行けて気持ちよかった' },
  { id: '2', time: '12:15', mood: 'good',  moodLabel: 'おだやか',    score: 68, summary: 'お昼ごはんをしっかり食べた' },
  { id: '3', time: '17:00', mood: 'tired', moodLabel: '少し疲れ気味', score: 45, summary: '少し疲れたけど夕方のテレビを楽しんだ' },
];

export const todayMood: MoodLevel = 'good';
export const todayMoodSummary = '朝から散歩に行って、気分は穏やか！';

export const calendarData: CalendarDay[] = [
  { day: 1,  mood: 'good',    recordCount: 2 },
  { day: 2,  mood: 'good',    recordCount: 3 },
  { day: 3,  mood: 'neutral', recordCount: 2 },
  { day: 4,  mood: null,      recordCount: 0 },
  { day: 5,  mood: 'great',   recordCount: 3 },
  { day: 6,  mood: 'neutral', recordCount: 1 },
  { day: 7,  mood: 'good',    recordCount: 2 },
  { day: 8,  mood: 'good',    recordCount: 3 },
  { day: 9,  mood: 'neutral', recordCount: 2 },
  { day: 10, mood: 'tired',   recordCount: 1 },
  { day: 11, mood: 'good',    recordCount: 2 },
  { day: 12, mood: null,      recordCount: 0 },
  { day: 13, mood: 'neutral', recordCount: 2 },
  { day: 14, mood: 'neutral', recordCount: 1 },
  { day: 15, mood: 'tired',   recordCount: 1 },
  { day: 16, mood: 'neutral', recordCount: 2 },
  { day: 17, mood: 'good',    recordCount: 3 },
  { day: 18, mood: 'good',    recordCount: 2 },
  { day: 19, mood: 'tired',   recordCount: 1 },
  { day: 20, mood: 'low',     recordCount: 1 },
  { day: 21, mood: 'tired',   recordCount: 1 },
  { day: 22, mood: 'neutral', recordCount: 2 },
  { day: 23, mood: 'good',    recordCount: 3 },
  { day: 24, mood: 'good',    recordCount: 2 },
];

export const weeklyScores: WeeklyScore[] = [
  { day: '月', score: 80, count: 3 },
  { day: '火', score: 60, count: 2 },
  { day: '水', score: 80, count: 3 },
  { day: '木', score: 40, count: 1 },
  { day: '金', score: 40, count: 1 },
  { day: '土', score: 60, count: 2 },
  { day: '日', score: 80, count: 3 },
];

export const monthlyScores: MonthlyScore[] = [
  { date: '3/1',  score: 80,  count: 2 },
  { date: '3/3',  score: 60,  count: 2 },
  { date: '3/5',  score: 100, count: 3 },
  { date: '3/7',  score: 80,  count: 2 },
  { date: '3/9',  score: 60,  count: 2 },
  { date: '3/11', score: 80,  count: 2 },
  { date: '3/13', score: 60,  count: 2 },
  { date: '3/15', score: 40,  count: 1 },
  { date: '3/17', score: 80,  count: 3 },
  { date: '3/19', score: 40,  count: 1 },
  { date: '3/20', score: 20,  count: 1 },
  { date: '3/21', score: 40,  count: 1 },
  { date: '3/22', score: 60,  count: 2 },
  { date: '3/23', score: 80,  count: 3 },
  { date: '3/24', score: 80,  count: 2 },
];

export const notifications: Notification[] = [
  { id: '1', type: 'normal', title: '記録が追加されました', body: 'お母さんが17:00に記録しました。「少し疲れたけど夕方のテレビを楽しんだ」', time: '17:05', date: '今日', read: false, linkTo: '/home' },
  { id: '2', type: 'normal', title: '記録が追加されました', body: 'お母さんが12:15に記録しました。「お昼ごはんをしっかり食べた」', time: '12:20', date: '今日', read: false, linkTo: '/home' },
  { id: '3', type: 'change', title: 'ご様子に少し変化があります', body: 'ここ3日ほど記録回数が減少しています。短いメッセージで様子を聞いてみるのもおすすめです。', time: '09:00', date: '今日', read: false, linkTo: '/report' },
  { id: '4', type: 'normal', title: '記録が追加されました', body: 'お母さんが08:30に記録しました。「朝の散歩に行けて気持ちよかった」', time: '08:35', date: '今日', read: true, linkTo: '/home' },
  { id: '5', type: 'normal', title: '今日の記録まとめ', body: '昨日は2件の記録がありました。全体的におだやかな一日でした。', time: '08:00', date: '昨日', read: true, linkTo: '/log' },
  { id: '6', type: 'alert', title: '記録がありませんでした', body: '3月12日は記録がありませんでした。お忙しかったのかもしれません。', time: '21:00', date: '3月12日', read: true, linkTo: '/log' },
  { id: '7', type: 'change', title: '気分の変化が見られます', body: '先週と比べて、お疲れの日が少し増えています。無理のない範囲で声をかけてみませんか？', time: '09:00', date: '3月16日', read: true, linkTo: '/report' },
];

export const chatMessages: ChatMessage[] = [
  // システムが朝の記録を自動送信
  { id: '1', sender: 'system', senderName: 'みまもり', type: 'record_card', content: 'お母さんが記録しました', time: '08:35',
    recordCards: [
      { recordTime: '08:30', moodLabel: 'おだやか', moodIcon: '😊', score: 72, moodColor: '#7BB5A0', moodBgColor: '#E0F2EB' },
    ]},
  // 家族がそれを見て声かけ
  { id: '2', sender: 'family', senderName: 'あなた', type: 'text', content: 'お母さん、朝の散歩いいね☺️', time: '09:10' },
  // お母さんから返信
  { id: '3', sender: 'elder', senderName: 'お母さん', type: 'text', content: '公園の桜がきれいだったよ', time: '09:15' },
  { id: '3b', sender: 'family', senderName: 'あなた', type: 'stamp', content: '🌸', time: '09:16' },
  // システムが昼の記録を自動送信
  { id: '4', sender: 'system', senderName: 'みまもり', type: 'record_card', content: 'お母さんが記録しました', time: '12:20',
    recordCards: [
      { recordTime: '12:15', moodLabel: 'おだやか', moodIcon: '😊', score: 68, moodColor: '#7BB5A0', moodBgColor: '#E0F2EB' },
    ]},
  // 家族のリアクション
  { id: '5', sender: 'family', senderName: 'あなた', type: 'text', content: 'お昼もしっかり食べたんだね👍', time: '12:45' },
  // お母さんから返信
  { id: '5b', sender: 'elder', senderName: 'お母さん', type: 'text', content: 'うん、今日はお魚だったよ', time: '12:50' },
  // システムが夕方の記録を自動送信
  { id: '6', sender: 'system', senderName: 'みまもり', type: 'record_card', content: 'お母さんが記録しました', time: '17:05',
    recordCards: [
      { recordTime: '17:00', moodLabel: '少し疲れ気味', moodIcon: '😮‍💨', score: 45, moodColor: '#E0825E', moodBgColor: '#FDE0D0' },
    ]},
  // 家族が気遣い
  { id: '7', sender: 'family', senderName: 'あなた', type: 'text', content: '無理せず休んでね', time: '17:30' },
  // お母さんから返信
  { id: '8', sender: 'elder', senderName: 'お母さん', type: 'text', content: 'ありがとう、テレビ見てるよ', time: '17:35' },
  { id: '8b', sender: 'elder', senderName: 'お母さん', type: 'stamp', content: '😊', time: '17:36' },
];

export const quickMessages = [
  '今日もおつかれさま',
  '無理せず過ごしてね',
  'また話そうね',
  '天気がいいね☀️',
  '体調はどう？',
  'いつもありがとう',
];

export const stamps = ['😊', '🌸', '☀️', '🍵', '💪', '❤️', '👏', '🌈', '🎵'];

export const shareSettings: ShareSetting[] = [
  { id: '1', label: '今日の調子の要約', description: 'その日の全体的な気分の要約テキスト', shared: true },
  { id: '2', label: '心の状態スコア',   description: '100点満点の心の状態スコア', shared: true },
  { id: '3', label: '記録時刻',        description: '各記録が入力された時刻', shared: true },
  { id: '4', label: '記録回数',        description: '1日の記録の回数', shared: true },
  { id: '5', label: '記録本文の詳細',   description: '日記のようなテキスト内容', shared: false },
  { id: '6', label: '写真',            description: '記録に添付された写真', shared: false },
  { id: '7', label: '位置情報',        description: '記録時の位置情報', shared: false },
];

export const analysisInsights: AnalysisInsight[] = [
  { id: '1', type: 'change', title: 'ここ3日ほど記録回数が減っています',   body: '3月19日〜21日にかけて、1日1回の記録が続いています。普段は2〜3回記録されているので、少し変化が見られます。', date: '3月19日〜21日', icon: '📉' },
  { id: '2', type: 'change', title: '3月20日に心の状態スコアの低下がありました', body: 'スコアが20まで低下しました。前後の記録を見ると、外出が少なかった可能性があります。', date: '3月20日', icon: '📊' },
  { id: '3', type: 'advice', title: '短いメッセージで様子を聞いてみませんか', body: '直接的に「大丈夫？」と聞くより、「今日は暖かいね」など日常的な話題から始めると自然です。', icon: '💬' },
  { id: '4', type: 'hint',   title: '外出の減少が影響している可能性',       body: '記録の要約から、先週後半は外出の記述が減少しています。天候やお体の調子が関係しているかもしれません。', icon: '🔍' },
  { id: '5', type: 'advice', title: '一緒に散歩の計画を提案するのも◎',     body: '「今度の週末、一緒に散歩しない？」など、さりげない提案が良いかもしれません。', icon: '🚶' },
];
