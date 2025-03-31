<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';
import StatsCollapse from './StatsCollapse.vue';
import VirtualTimer from './VirtualTimer.vue';
import { useSessionContext } from '../stores/sessionContext';
import type { Side } from '../models/Side';
const collapse = useTemplateRef('collapse')

defineProps<{
  side: Side
}>()

const timerRef = useTemplateRef('timer')
const sessionContext = useSessionContext()
watch(() => sessionContext.currentRound.id, () => {
  timerRef.value?.unblock()
})

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
    <div class="score">{{ sessionContext.score.player1 }} : <span class="text-accent">{{
      sessionContext.score.player2 }}</span>
    </div>
    <div class="grow flex flex-col justify-between relative">
      <div class="mx-3 text-center">
        <span v-if="sessionContext.currentRound.scramble" :class="[sessionContext.eventContext.scrambleSize]"
          @click="onScrambleClick">{{
            sessionContext.currentRound.scramble }}</span>
        <span v-else-if="!sessionContext.eventContext.generateScramble" class="text-xl">Hand scramble</span>
        <span v-else class="text-xl">Generating...</span>
      </div>
      <VirtualTimer class="grow flex justify-center items-center"
        @timer-stopped="(e) => sessionContext.recordSolve(side, e)" ref="timer" />
      <StatsCollapse :blocked="timerRef?.isBusy ?? false" :solves="sessionContext.rounds.map(r => r.solves[side]!)"
        :stats="dummyStats" ref="collapse" />
    </div>
  </div>
</template>