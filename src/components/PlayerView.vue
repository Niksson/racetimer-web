<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';
import StatsCollapse from './StatsCollapse.vue';
import VirtualTimer from './VirtualTimer.vue';
import { useRaceContext } from '../stores/raceContext';
import type { Side } from '../models/Side';
import { last } from '../lib/helpers';
const collapse = useTemplateRef('collapse')

defineProps<{
  side: Side
}>()

const timerRef = useTemplateRef('timer')
const raceContext = useRaceContext()
watch(() => raceContext.currentRound.id, () => {
  timerRef.value?.unblock()
})

const emit = defineEmits(['scramble-clicked'])

function onScrambleClick() {
  if (collapse?.value?.isOpen) return
  emit('scramble-clicked')
}

</script>

<template>
  <div :id="side" @touchend.stop.prevent="collapse?.close()" class="flex gap-3 flex-col">
    <div class="score">{{ raceContext.score.player1 }} : <span class="text-accent">{{
      raceContext.score.player2 }}</span>
    </div>
    <div class="grow flex flex-col justify-between relative">
      <div class="mx-3 text-center">
        <span v-if="raceContext.currentRound.scramble" class="scramble" :class="[raceContext.eventContext.scrambleSize]"
          @touchend="onScrambleClick">{{
            raceContext.currentRound.scramble }}</span>
        <span v-else-if="!raceContext.eventContext.generateScramble" class="text-xl">Hand scramble</span>
        <span v-else class="text-xl">Generating...</span>
      </div>
      <VirtualTimer :prev-round-solve="last(raceContext.rounds)?.solves[side]"
        class="grow flex justify-center items-center" @timer-stopped="(e) => raceContext.recordSolve(side, e)"
        ref="timer" />
      <StatsCollapse :blocked="!!timerRef?.isBusy" :solves="raceContext.rounds.map(r => r.solves[side]!)"
        :stats="raceContext.stats[side].computedStats" ref="collapse" />
    </div>
  </div>
</template>