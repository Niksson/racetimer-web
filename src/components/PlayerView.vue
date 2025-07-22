<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';
import StatsCollapse from './StatsCollapse.vue';
import VirtualTimer from './VirtualTimer.vue';
import { useRaceContext } from '../stores/raceContext';
import type { Side } from '../models/Side';
const collapse = useTemplateRef('collapse')

defineProps<{
  side: Side
}>()

const timerRef = useTemplateRef('timer')
const raceContext = useRaceContext()
watch(() => raceContext.roundStarted, (value) => {
  if(!value)
    timerRef.value?.unblock()
})

const emit = defineEmits(['scramble-clicked'])

function onScrambleClick() {
  console.log('scramble clicked')
  if (collapse?.value?.isOpen) return
  emit('scramble-clicked')
}

</script>

<template>
  <div :id="side" @touchend.stop.prevent="collapse?.close()" class="flex gap-3 flex-col">
    <div v-if="side === 'player1'" class="score"><span class="text-accent">{{raceContext.score.player1 }} </span> : {{
      raceContext.score.player2 }}
    </div>
    <div v-else class="score"><span class="text-accent">{{raceContext.score.player2 }} </span> : {{
      raceContext.score.player1 }}
    </div>
    <div class="grow flex flex-col justify-between relative">
      <div class="scramble mx-3 text-center">
        <span v-if="!raceContext.session!.generateScrambles" class="text-xl">Hand scramble</span>
        <span v-else-if="raceContext.scramblesGenerating" class="text-xl">Generating...</span>
        <span v-else :class="[raceContext.session!.selectedEvents[side].scrambleClasses]"
          @touchend="onScrambleClick">{{
            raceContext.currentRound.scramble[side] }}</span>
      </div>
      <VirtualTimer :prev-round-solve="raceContext.previousRound?.solves[side]"
        class="grow flex justify-center items-center" @timer-started="raceContext.roundStarted = true" @timer-stopped="(e) => raceContext.recordSolve(side, e)"
        ref="timer" />
      <StatsCollapse :blocked="raceContext.roundStarted" :solves="raceContext.session!.completedRounds.map(r => r.solves[side]!)"
        :stats="raceContext.session!.stats[side].computedStats" ref="collapse" />
    </div>
  </div>
</template>