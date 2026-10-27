import { mount } from '@vue/test-utils'
import { it,expect } from 'vitest'
import TaskCard from '../src/components/TaskCard.vue'
const task={id:'a',title:'卡片测试',description:'任务细节',columnId:'todo',createdAt:Date.now(),starred:false,urgent:false,category:'工作'}
it('显示任务并可星标、标记紧急与删除',async()=>{const w=mount(TaskCard,{props:{task}});expect(w.text()).toContain(task.title);expect(w.attributes('draggable')).toBe('true');await w.get('[aria-label="星标任务"]').trigger('click');await w.get('[aria-label="标记紧急"]').trigger('click');await w.get('[aria-label="删除任务"]').trigger('click');expect(w.emitted('toggle')).toEqual([['a','starred'],['a','urgent']]);expect(w.emitted('remove')[0]).toEqual(['a'])})
it('通过菜单无拖拽完成任务',async()=>{const w=mount(TaskCard,{props:{task}});await w.get('[aria-label="更改任务状态"]').trigger('click');await w.findAll('.move-menu button')[2].trigger('click');expect(w.emitted('move')[0]).toEqual(['a','done'])})
