<script setup lang="ts">
import { useMachine } from '@xstate/vue';
import { timerMachine } from '../stateMachines/timerMachine';
import { formatDuration } from '../lib/durationFormat';
import { computed } from 'vue';
import { toString, type Solve } from '../models/Solve';

const { prevRoundSolve } = defineProps<{
  prevRoundSolve?: Solve
}>()

const emit = defineEmits<{
  'timer-started': [],
  'timer-stopped': [elapsedTimeMs: number]
}>()

const actor = useMachine(timerMachine)

const isBusy = computed(() => {
  const state = actor.snapshot.value.value
  return state === 'waiting' || state === 'standby' || state === 'running-tick' || state === 'running-tock'
})

const showPrevRound = computed(() => {
  const state = actor.snapshot.value.value
  return prevRoundSolve && (state === 'ready' || state === 'waiting' || state === 'standby')
})

function unblock() {
  actor.send({ type: 'unblock' })
}

actor.actorRef.on('timer-started', () => {
  console.log('Timer started')
  emit('timer-started')
})

actor.actorRef.on('timer-stopped', (e) => {
  emit('timer-stopped', e.elapsedTimeMs)
})

function putHandsDown() {
  actor.send({ type: 'handsDown' })
}

function raiseHandsUp() {
  actor.send({ type: 'handsUp' })
}

defineExpose({
  unblock,
  isBusy
})
</script>

<template>
  <div @touchstart.prevent="putHandsDown" @touchend.prevent="raiseHandsUp" class="timer"
    :class="`timer-${actor.snapshot.value.value}`">
    <span v-if="!showPrevRound">{{
      formatDuration(actor.snapshot.value.context.elapsedTimeMs) }}</span>
    <span v-else>{{ toString(prevRoundSolve!) }}</span>
  </div>
</template>