// シンプルなグローバル設定ストア（プロトタイプ用）
type Frequency = 'every' | 'daily' | 'change';

const frequencyLabels: Record<Frequency, string> = {
  every: '記録のたびに通知',
  daily: '1日1回まとめて通知（毎日19:00）',
  change: '変化があったときのみ通知',
};

let _frequency: Frequency = 'daily';
const _listeners: Set<() => void> = new Set();

export function getFrequency(): Frequency {
  return _frequency;
}

export function getFrequencyLabel(): string {
  return frequencyLabels[_frequency];
}

export function setFrequency(f: Frequency) {
  _frequency = f;
  _listeners.forEach(fn => fn());
}

export function subscribe(fn: () => void) {
  _listeners.add(fn);
  return () => { _listeners.delete(fn); };
}
