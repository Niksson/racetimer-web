<script setup lang="ts">
import { useTemplateRef } from 'vue';
import StatsCollapse from './StatsCollapse.vue';
import VirtualTimer from './VirtualTimer.vue';
import type { StatsResult } from '../models/StatsResult';
const collapse = useTemplateRef('collapse')

defineProps<{
  scramble: string,
  id: string
}>()

const emit = defineEmits(['scramble-clicked'])

function onScrambleClick() {
  if (collapse?.value?.isOpen) return
  emit('scramble-clicked')
}

const dummySolves = [10353, 'DNF', 21021, 'DNF', 31123] as StatsResult[]

const dummyStats = {
  'avg5': 10353,
  'avg12': 10353,
  'avg25': 10353,
  'avg50': 10353,
  'avg100': 10353,
}
</script>

<template>
  <div :id="id" @click="collapse?.close()" class="flex gap-3 flex-col">
    <div class="score">0 : <span class="text-accent">0</span></div>
    <div class="grow flex flex-col justify-between relative">
      <div class="scramble" @click="onScrambleClick">{{ scramble }}</div>
      <VirtualTimer />
      <StatsCollapse :solves="dummySolves" :stats="dummyStats" ref="collapse" />
    </div>
  </div>
</template>