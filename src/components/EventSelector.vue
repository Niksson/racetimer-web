<template>
  <details class="dropdown" :class="{'dropdown-end': side === 'player2'}" ref="selectorDropDown">
    <summary v-bind="$attrs" class="btn">
      <template v-if="!selectedEvent">
        <div>???</div>
      </template>
      <template v-else>
        <div><span class="cubing-icon text-xl" :class="selectedEvent.eventIcon" /></div>
        <div class="text-xs">{{ selectedEvent.displayName }}</div>
        <ChevronDown class="w-5 h-5" />
      </template>
    </summary>
    <ul class="dropdown-content menu bg-base-300 mt-1 w-60 max-h-40 flex-nowrap overflow-scroll">
      <li v-for="event in events" :key="event.eventId">
        <button class="gap-3" @click="(e) => onSelect(e, event.eventId)">
          <div><span class="cubing-icon" :class="event.eventIcon" /></div>
          <div class="text-md">{{ event.displayName }}</div>
          <Check v-if="model === event.eventId" class="w-4 h-4" />
        </button>
      </li>
    </ul>
  </details>
</template>

<script setup lang="ts">
import { ChevronDown, Check } from 'lucide-vue-next';
import { eventsMap } from '../lib/eventsMap';
import { computed, ref } from 'vue';
import type { Side } from '../models/Side';

defineOptions({
  inheritAttrs: false
});

const {side} = defineProps<{
  side: Side
}>();

const selectorDropDown = ref<HTMLDetailsElement | null>(null);
function onSelect(event: any, cubingEventId: string) {
  model.value = cubingEventId;
  console.log(selectorDropDown.value)
  if(selectorDropDown.value) {
    selectorDropDown.value.open = false;

  }
}

// We have left the 'generateScramble' options for Quick Start
// but we don't need to use them in the EventSelector
const events = Object.values(eventsMap).filter(e => e.generateScramble);

const model = defineModel<string>();

const selectedEvent = computed(() => {
  if (!model.value) return undefined;
  return eventsMap[model.value]
})

</script>