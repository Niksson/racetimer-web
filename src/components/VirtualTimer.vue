<script setup lang="ts">
import { useMachine } from '@xstate/vue';
import { timerMachine } from '../stateMachines/timerMachine';
import { formatDuration } from '../lib/durationFormat';

const emit = defineEmits<{
  'timer-stopped': [elapsedTimeMs: number]
}>()

const actor = useMachine(timerMachine)
actor.actorRef.subscribe({
  complete() {
    emit('timer-stopped', actor.snapshot.value.output!.elapsedTimeMs)
  }
})

function putHandsDown() {
  if (actor.snapshot.value.status === 'done')
    return
  actor.send({ type: 'handsDown' })
}

function raiseHandsUp() {
  if (actor.snapshot.value.status === 'done')
    return
  actor.send({ type: 'handsUp' })
}

</script>

<template>
  <div @touchstart.stop.prevent="putHandsDown" @touchend.stop.prevent="raiseHandsUp" class="timer"
    :class="`timer-${actor.snapshot.value.value}`">{{
      formatDuration(actor.snapshot.value.context.elapsedTimeMs) }}</div>
</template>