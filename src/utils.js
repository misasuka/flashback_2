export const TOTAL_ROUND_EVENTS = 9;

export function shuffle(array) {
  const copied = [...array];
  for (let i = copied.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copied[i], copied[j]] = [copied[j], copied[i]];
  }
  return copied;
}

export function parseDateValue(dateString) {
  return new Date(dateString).getTime();
}

export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function compareEvents(a, b) {
  return parseDateValue(a.date) - parseDateValue(b.date);
}
