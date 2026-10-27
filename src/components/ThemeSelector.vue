<script setup>
import { Palette, Check } from 'lucide-vue-next'
import { ref, onMounted, onUnmounted } from 'vue'
import { useTheme } from '../composables/useTheme'
import { themes } from '../config/themes'
const themeWrap=ref(null), open=ref(false), {theme,setTheme,preview,cancelPreview}=useTheme()
function close() {open.value=false;cancelPreview()}
function outside(e){if(!themeWrap.value?.contains(e.target))close()}
onMounted(()=>document.addEventListener('pointerdown',outside))
onUnmounted(()=>document.removeEventListener('pointerdown',outside))
</script>
<template><div ref="themeWrap" class="theme-wrap" @keydown.esc="close"><button class="icon-btn" title="切换主题" aria-label="切换主题" :aria-expanded="open" @click="open=!open"><Palette :size="19"/></button><div v-if="open" class="theme-menu" @mousedown.prevent @mouseleave="cancelPreview"><span class="menu-label">选择一种心情</span><button v-for="item in themes" :key="item.id" @mouseenter="preview(item.id)" @focus="preview(item.id)" @click="setTheme(item.id);close()"><i :style="{background:item.color}"></i>{{item.name}}<Check v-if="theme===item.id" :size="15"/></button></div></div></template>
<style scoped>.theme-wrap{position:relative}.theme-menu{position:absolute;right:0;top:44px;width:168px;padding:9px;background:var(--card);box-shadow:var(--shadow);border:1px solid var(--line);border-radius:14px;z-index:30}.menu-label{display:block;font-size:11px;padding:7px 9px;color:var(--muted)}.theme-menu button{display:flex;align-items:center;gap:10px;width:100%;border:0;background:none;padding:10px;border-radius:8px;color:var(--text)}.theme-menu button:hover{background:var(--surface)}i{width:17px;height:17px;border-radius:50%;border:1px solid var(--line)}svg{margin-left:auto}</style>
