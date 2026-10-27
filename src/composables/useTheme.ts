import { ref } from 'vue'
import { applyTheme } from '../utils/cssVariables'
const allowed = ['light','dark','colorful']
function load() { try { return localStorage.getItem('shixu-theme') || 'light' } catch { return 'light' } }
const stored = load()
const theme = ref(allowed.includes(stored) ? stored : 'light')
applyTheme(theme.value)
export function useTheme() { return { theme, setTheme: (value:string)=>{ if (!allowed.includes(value)) return; theme.value=value; applyTheme(value); try { localStorage.setItem('shixu-theme',value) } catch {} }, preview: applyTheme, cancelPreview: ()=>applyTheme(theme.value), cycle: ()=>{ const value=allowed[(allowed.indexOf(theme.value)+1)%3]; theme.value=value; applyTheme(value); try {localStorage.setItem('shixu-theme',value)} catch {} } } }
