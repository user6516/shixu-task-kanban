export function formatRelativeTime(value: number) { const days = Math.floor((Date.now()-value)/86400000); return days <= 0 ? '今天' : days === 1 ? '昨天' : `${days} 天前` }
export function formatDateTime(value: number) { return new Date(value).toLocaleString('zh-CN') }
