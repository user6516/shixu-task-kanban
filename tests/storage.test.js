import { beforeEach,describe,it,expect } from 'vitest'
import { loadState,saveState,STORAGE_KEY } from '../src/utils/storage'
const task={id:'1',title:'测试',columnId:'todo',createdAt:1000}
beforeEach(()=>localStorage.clear())
describe('任务持久化',()=>{
  it('区分首次使用和已清空的看板',()=>{expect(loadState()).toBeNull();saveState([]);expect(loadState()).toEqual([])})
  it('恢复任务与标记',()=>{saveState([{...task,starred:true,urgent:true,category:'工作'}]);expect(loadState()[0]).toMatchObject({title:'测试',starred:true,urgent:true,category:'工作'})})
  it.each(['broken','{}','[{}]',JSON.stringify([{...task,columnId:'oops'}]),JSON.stringify([task,task])])('损坏的数据安全降级: %s',raw=>{localStorage.setItem(STORAGE_KEY,raw);expect(loadState()).toBeNull()})
})
