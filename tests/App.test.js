import { mount } from '@vue/test-utils'
import { it,expect,vi } from 'vitest'
import App from '../src/App.vue'
import { saveState } from '../src/utils/storage'
it('卡片菜单流转任务后更新整个看板',async()=>{
  vi.stubGlobal('matchMedia',()=>({matches:true}))
  saveState([{id:'integration',title:'联动测试',description:'',category:'',columnId:'todo',starred:false,urgent:false,createdAt:Date.now()}])
  const w=mount(App,{global:{stubs:{teleport:true}}})
  await w.get('[aria-label="更改任务状态"]').trigger('click')
  await w.findAll('.move-menu button')[2].trigger('click')
  expect(w.get('.task-card').classes()).toContain('completed')
  w.unmount();vi.unstubAllGlobals()
})
