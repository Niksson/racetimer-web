<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronUp, ChevronDown } from 'lucide-vue-next'
import StatsList from './StatsList.vue'
import type { ComputedStats } from '../models/StatsContext'
import type { Solve } from '../models/Solve';

const { stats, solves, blocked } = defineProps<{
  stats: ComputedStats,
  solves: Solve[],
  blocked: boolean
}>()

const isOpen = ref(false)
function close() {
  if (isOpen.value)
    isOpen.value = false
}
function toggle() {
  if (blocked) return
  isOpen.value = !isOpen.value
}

defineExpose({
  close, isOpen
})

function collapseBeforeEnter(el: Element) {
  (el as HTMLElement).style.height = '0px'
}

function collapseEnter(el: Element) {
  (el as HTMLElement).style.height = el.scrollHeight + 'px'
}

function collapseLeave(el: Element) {
  const element = el as HTMLElement
  element.style.height = '0px';
  element.style.overflow = 'hidden';
}

const totalSolves = computed(() => solves.length)
const successfulSolves = computed(() => solves.filter(solve => solve.penalty !== 'DNF').length)

</script>

<template>
  <div id="stats-box" class="relative stats-collapse" :aria-expanded="isOpen">
    <div class="bg-base-300 p-3 invisible">STATS</div>
    <div class="bg-base-300 p-3 absolute bottom-0 left-0 w-full z-10" @touchend.stop="toggle">
      <div class="text-center font-bold">STATS
        <ChevronUp class="inline" v-if="!isOpen" />
        <ChevronDown class="inline" v-else />
      </div>
      <Transition name="stats-collapse" @before-enter="collapseBeforeEnter" @enter="collapseEnter"
        @leave="collapseLeave">
        <div @touchend.stop="close" v-if="isOpen">
          <div class=" divider my-1" />
          <StatsList :stats="stats" :successful-solves="successfulSolves" :total-solves="totalSolves" />
          <RouterLink to="/solves" custom v-slot="{ navigate }">
            <button @click.stop="navigate" class="w-full btn mt-2">SOLVES</button>
          </RouterLink>
        </div>
      </Transition>
    </div>
  </div>
</template>