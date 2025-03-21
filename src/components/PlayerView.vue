<script setup lang="ts">
import { useTemplateRef } from 'vue';
import { type Side } from '../models/Side'
import StatsCollapse from './StatsCollapse.vue';
defineProps<{
  side: Side
}>()
const collapse = useTemplateRef('collapse')


</script>

<template>
  <div @click="collapse?.close()" class="flex gap-3 flex-col" :class="[side]">
    <div class="score">0 : <span class="text-accent">0</span></div>
    <div class="grow flex flex-col justify-between relative">
      <div class="scramble">R' U' F U2 B2 D' R2 D R2 B2 U B2 D' B R' U2 F2 R2 B L F2 D2 U' R' U' F</div>
      <div class="time">0.000</div>
      <StatsCollapse ref="collapse" />
    </div>
  </div>
</template>