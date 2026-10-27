<script setup>
import { ref,watch,onUnmounted } from 'vue'
const props=defineProps({visible:Boolean,effect:{default:'confetti'},duration:{default:1800}}),emit=defineEmits(['complete'])
const canvas=ref(null);let frame=0
watch(()=>props.visible,async value=>{if(!value)return;if(matchMedia('(prefers-reduced-motion: reduce)').matches){emit('complete');return}const c=canvas.value;if(!c)return;cancelAnimationFrame(frame);c.width=innerWidth;c.height=innerHeight;const ctx=c.getContext('2d');const pieces=Array.from({length:90},()=>({x:c.width/2,y:c.height*.4,vx:(Math.random()-.5)*16,vy:-Math.random()*13-3,r:Math.random()*6+3,color:['#9c8bd8','#e8ba69','#80b9a2','#e6a599'][Math.floor(Math.random()*4)],angle:Math.random()*6}));const start=performance.now();function draw(now){ctx.clearRect(0,0,c.width,c.height);for(const p of pieces){p.x+=p.vx;p.vy+=.21;p.y+=p.vy;p.angle+=.08;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.angle);ctx.fillStyle=p.color;ctx.globalAlpha=Math.max(0,1-(now-start)/props.duration);ctx.fillRect(-p.r/2,-p.r/2,p.r,p.r*.6);ctx.restore()}if(now-start<props.duration)frame=requestAnimationFrame(draw);else{ctx.clearRect(0,0,c.width,c.height);emit('complete')}}frame=requestAnimationFrame(draw)})
onUnmounted(()=>cancelAnimationFrame(frame))
</script>
<template><Teleport to="body"><canvas ref="canvas" class="celebration" aria-hidden="true"/></Teleport></template>
<style scoped>.celebration{position:fixed;inset:0;width:100%;height:100%;pointer-events:none;z-index:90}</style>
