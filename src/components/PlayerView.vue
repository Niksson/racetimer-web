<script setup lang="ts">
import { useTemplateRef } from 'vue';
import StatsCollapse from './StatsCollapse.vue';
import VirtualTimer from './VirtualTimer.vue';
import { useSessionContext } from '../stores/sessionContext';
import type { Side } from '../models/Side';
const collapse = useTemplateRef('collapse')

defineProps<{
  side: Side
}>()

const sessionContext = useSessionContext()

const emit = defineEmits(['scramble-clicked'])

function onScrambleClick() {
  if (collapse?.value?.isOpen) return
  emit('scramble-clicked')
}

const dummyStats = {
  'avg5': 10353,
  'avg12': 10353,
  'avg25': 10353,
  'avg50': 10353,
  'avg100': 10353,
}
</script>

<template>
  <div :id="side" @click="collapse?.close()" class="flex gap-3 flex-col">
    <div class="score">{{ sessionContext.playerContexts.player1.score }} : <span class="text-accent">{{
      sessionContext.playerContexts.player2.score }}</span>
    </div>
    <div class="grow flex flex-col justify-between relative">
      <div class="scramble" @click="onScrambleClick">
        <span v-if="sessionContext.roundContext.scramble">{{ sessionContext.roundContext.scramble }}</span>
        <span v-else>Generating...</span>
      </div>
      <VirtualTimer class="grow flex justify-center items-center"
        @timer-stopped="(e) => sessionContext.recordSolve(side, e)" />
      <StatsCollapse :solves="sessionContext.playerContexts[side].solves" :stats="dummyStats" ref="collapse" />
    </div>
  </div>
</template>