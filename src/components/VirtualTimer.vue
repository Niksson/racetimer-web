<script setup lang="ts">
import { useMachine } from '@xstate/vue';
import { timerMachine } from '../stateMachines/timerMachine';
import { formatDuration } from '../lib/durationFormat';
import { watch } from 'vue';

const props = defineProps<{
  blocked: boolean
}>()

const emit = defineEmits<{
  'timer-stopped': [elapsedTimeMs: number]
}>()

const actor = useMachine(timerMachine)

watch(() => props.blocked, (newValue, oldValue) => {
  if (oldValue === true && newValue === false)
    actor.send({ type: 'unblock' })
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

</script>

<template>
  <div @touchstart.stop.prevent="putHandsDown" @touchend.stop.prevent="raiseHandsUp" class="timer"
    :class="`timer-${actor.snapshot.value.value}`">{{
      formatDuration(actor.snapshot.value.context.elapsedTimeMs) }}</div>
</template>