export const STORAGE_KEY = 'shixu-kanban-v1'
export const validTask = t => t && typeof t.id === 'string' && typeof t.title === 'string' && t.title.trim() && ['todo','doing','done'].includes(t.columnId) && Number.isFinite(t.createdAt)
export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw === null) return null
    const data = JSON.parse(raw)
    if (!Array.isArray(data) || !data.every(validTask) || new Set(data.map(t=>t.id)).size !== data.length) return null
    return data.map(t=>({...t, description: String(t.description || ''), category: String(t.category || ''), starred: !!t.starred, urgent: !!t.urgent}))
  } catch { return null }
}
export function saveState(tasks) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)); return true } catch { return false }
}
