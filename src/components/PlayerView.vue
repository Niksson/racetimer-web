<script setup lang="ts">
import 'scramble-display'
import { useTemplateRef } from 'vue';
import StatsCollapse from './StatsCollapse.vue';
const collapse = useTemplateRef('collapse')

defineProps<{
  scramble: string
}>()

defineEmits(['scramble-clicked'])
</script>

<template>
  <div @click="collapse?.close()" class="flex gap-3 flex-col">
    <div class=" score">0 : <span class="text-accent">0</span></div>
    <div class="grow flex flex-col justify-between relative">
      <div class="scramble" @click="$emit('scramble-clicked')">{{ scramble }}</div>
      <div class="time">0.000</div>
      <StatsCollapse ref="collapse" />
    </div>
  </div>
</template>