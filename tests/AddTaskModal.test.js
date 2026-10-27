import { mount } from '@vue/test-utils'
import { it,expect } from 'vitest'
import AddTaskModal from '../src/components/AddTaskModal.vue'
const props={columns:[{id:'todo',title:'待办'},{id:'doing',title:'进行中'}],existingCategories:['工作'],initialColumn:'doing'}
it('阻止空白标题并提交完整任务字段',async()=>{const w=mount(AddTaskModal,{props,global:{stubs:{teleport:true}}});await w.get('form').trigger('submit');expect(w.emitted('submit')).toBeUndefined();await w.get('input').setValue('  做一件事  ');await w.get('textarea').setValue('描述');await w.get('input[list]').setValue('工作');await w.get('form').trigger('submit');expect(w.emitted('submit')[0][0]).toEqual({title:'做一件事',description:'描述',category:'工作',columnId:'doing'});expect(w.get('datalist option').attributes('value')).toBe('工作');w.unmount()})
