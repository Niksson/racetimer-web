<script setup lang="ts">
import { useMachine } from '@xstate/vue';
import { timerMachine } from '../stateMachines/timerMachine';
import { formatDuration } from '../lib/durationFormat';

const emit = defineEmits<{
  'timer-stopped': [elapsedTimeMs: number]
}>()

const actor = useMachine(timerMachine)

function unblock() {
  actor.send({ type: 'unblock' })
}

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
  unblock
})
</script>

<template>
  <div @touchstart.stop.prevent="putHandsDown" @touchend.stop.prevent="raiseHandsUp" class="timer"
    :class="`timer-${actor.snapshot.value.value}`">{{
      formatDuration(actor.snapshot.value.context.elapsedTimeMs) }}</div>
</template>