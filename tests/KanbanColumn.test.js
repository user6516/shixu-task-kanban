import { mount } from '@vue/test-utils'
import { it,expect } from 'vitest'
import KanbanColumn from '../src/components/KanbanColumn.vue'
it('接收拖拽任务并发送目标列',async()=>{const w=mount(KanbanColumn,{props:{column:{id:'doing',title:'进行中',color:'purple'},taskList:[]}});expect(w.text()).toContain('00');await w.trigger('drop',{dataTransfer:{getData:()=> 'task-123'}});expect(w.emitted('move')[0]).toEqual(['task-123','doing'])})
