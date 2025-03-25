<script setup lang="ts">
import { useTemplateRef } from 'vue';
import StatsCollapse from './StatsCollapse.vue';
import VirtualTimer from './VirtualTimer.vue';
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
</script>

<template>
  <div :id="id" @click="collapse?.close()" class="flex gap-3 flex-col">
    <div class="score">0 : <span class="text-accent">0</span></div>
    <div class="grow flex flex-col justify-between relative">
      <div class="scramble" @click="onScrambleClick">{{ scramble }}</div>
      <VirtualTimer />
      <StatsCollapse ref="collapse" />
    </div>
  </div>
</template>