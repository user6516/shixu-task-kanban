import { ref } from 'vue'
import { toastMessages } from '../config/toastMessages'
const messages = ref<{ id: number; text: string; error: boolean }[]>([])
let next = 0
const timers = new Map<number, ReturnType<typeof setTimeout>>()
function remove(id: number) { clearTimeout(timers.get(id)); timers.delete(id); messages.value = messages.value.filter(m=>m.id!==id) }
function resume(id: number) { clearTimeout(timers.get(id)); timers.set(id, setTimeout(()=>remove(id), 4000)) }
function show(text: string, error=false) { const id=++next; messages.value.push({id,text,error}); resume(id) }
export function useToast() { return { messages, show, remove, resume, pause: (id:number)=>clearTimeout(timers.get(id)), clear: ()=>messages.value.forEach(m=>remove(m.id)), success: (kind:string)=>{ const pool=toastMessages[kind] || [kind]; show(pool[Math.floor(Math.random()*pool.length)]) }, error: (text:string)=>show(text,true) } }
