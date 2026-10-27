<script setup>
import { Sprout, Plus } from 'lucide-vue-next'
defineProps({title:{default:'给下一步留一点空间'},hint:{default:'拖动任务到这里，或添加一个新任务'}})
defineEmits(['action'])
</script>
<template><div class="empty"><Sprout :size="32" :stroke-width="1.2"/><p>{{title}}</p><span>{{hint}}</span><button @click="$emit('action')"><Plus :size="14"/>新增任务</button></div></template>
<style scoped>.empty{padding:45px 12px;text-align:center;color:var(--faint);border:1px dashed var(--line);border-radius:12px}.empty>svg{margin:auto;color:var(--accent);opacity:.5}p{font-size:12px;color:var(--muted);margin:14px 0 7px}span{font-size:10px}button{display:flex;align-items:center;gap:4px;margin:18px auto 0;background:none;border:0;color:var(--accent);font-size:11px}</style>
