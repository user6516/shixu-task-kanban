import { effectScope,nextTick } from 'vue'
import { it,expect,beforeEach } from 'vitest'
import { useKanban } from '../src/composables/useKanban'
import { loadState,saveState } from '../src/utils/storage'
beforeEach(()=>localStorage.clear())
it('新增、移动、标记、删除后同步保存，清空后不恢复示例',async()=>{
  saveState([])
  const scope=effectScope();const board=scope.run(()=>useKanban())
  board.add({title:'实际工作',category:'自定义',columnId:'todo'})
  const id=board.tasks.value[0].id
  board.toggle(id,'starred');board.toggle(id,'urgent')
  expect(board.move(id,'done')).toBe(true)
  await nextTick()
  expect(loadState()[0]).toMatchObject({columnId:'done',starred:true,urgent:true})
  expect(board.existingCategories.value).toContain('自定义')
  expect(board.move(id,'invalid')).toBe(false)
  board.remove(id);await nextTick();expect(loadState()).toEqual([])
  board.add({title:'第二项',columnId:'todo'});board.reset();await nextTick()
  const nextScope=effectScope();expect(nextScope.run(()=>useKanban()).tasks.value).toEqual([])
  scope.stop();nextScope.stop()
})
