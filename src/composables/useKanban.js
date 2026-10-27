import { ref, computed, watch } from 'vue'
import { loadState, saveState } from '../utils/storage'
import { useToast } from './useToast'
export const columns = [{id:'todo',title:'待办',subtitle:'把想法放在这里',color:'#8b94a7'},{id:'doing',title:'进行中',subtitle:'专注当下，一次一件',color:'#8172e8'},{id:'done',title:'已完成',subtitle:'每一步都值得被看见',color:'#46a58d'}]
export function demoTasks() {
  return [
    {title:'开启有条理的一天',description:'把脑海里的计划放到这里，留出空间，专注重要的事。',category:'生活',columnId:'todo',starred:true,urgent:false},
    {title:'整理本周的灵感',description:'好点子值得一个安放的位置。',category:'灵感',columnId:'todo',starred:false,urgent:false},
    {title:'设计我的专注时光',description:'留出 25 分钟，关掉干扰，推进一件小事。',category:'工作',columnId:'doing',starred:true,urgent:true},
    {title:'试试拖动任务卡片',description:'拖到另一列即可更新状态；也可以从卡片菜单中切换。',category:'入门指南',columnId:'doing',starred:false,urgent:false},
    {title:'为新的开始准备就绪',description:'你的看板已经准备好了，开始创造吧。',category:'入门指南',columnId:'done',starred:false,urgent:false}
  ].map((t,i)=>({...t,id:crypto.randomUUID(),createdAt:Date.now()-i*3600000}))
}
export function useKanban() {
  const toast=useToast(), tasks=ref(loadState() ?? demoTasks()), storageFailed=ref(false)
  function persist() { storageFailed.value=!saveState(tasks.value); if(storageFailed.value) toast.error('浏览器存储不可用，请先导出备份。') }
  watch(tasks,persist,{deep:true}); persist()
  function add(task) { tasks.value.unshift({...task,id:crypto.randomUUID(),createdAt:Date.now(),starred:false,urgent:false}); toast.success('add') }
  function toggle(id,flag) { if(!['starred','urgent'].includes(flag)) return; const t=tasks.value.find(t=>t.id===id); if(t) { t[flag]=!t[flag]; toast.success(flag==='starred'?'star':'urgent') } }
  function remove(id) { tasks.value=tasks.value.filter(t=>t.id!==id); toast.success('remove') }
  function move(id,columnId,index) { const t=tasks.value.find(t=>t.id===id); if(!t || !columns.some(c=>c.id===columnId)) return false; const changed=t.columnId!==columnId; t.columnId=columnId; if(Number.isInteger(index)) { tasks.value=tasks.value.filter(t=>t.id!==id); const peers=tasks.value.filter(t=>t.columnId===columnId); const before=peers[index]; const at=before?tasks.value.indexOf(before):tasks.value.length; tasks.value.splice(at,0,t) } if(changed) toast.success(columnId==='done'?'done':'move'); return changed && columnId==='done' }
  function reset() {tasks.value=[];toast.success('reset')}
  return {tasks,columns,storageFailed,existingCategories:computed(()=>[...new Set(tasks.value.map(t=>t.category).filter(Boolean))]),add,toggle,remove,move,reset}
}
