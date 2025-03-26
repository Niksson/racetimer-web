<script setup lang="ts">
import { ref } from 'vue'
import { ChevronUp, ChevronDown } from 'lucide-vue-next'
import StatsList from './StatsList.vue'

const isOpen = ref(false)
function close() {
  if (isOpen.value)
    isOpen.value = false
}
function toggle() {
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
  (el as HTMLElement).style.height = '0px';
  (el as HTMLElement).style.overflow = 'hidden';
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
  <div id="stats-box" class="relative">
    <div class="bg-base-300 p-3 invisible">STATS</div>
    <div class="bg-base-300 p-3 absolute bottom-0 left-0 w-full z-10" @click.stop="toggle">
      <div class="text-center font-bold">STATS
        <ChevronUp class="inline" v-if="!isOpen" />
        <ChevronDown class="inline" v-else />
      </div>
      <Transition name="stats-collapse" @before-enter="collapseBeforeEnter" @enter="collapseEnter"
        @leave="collapseLeave">
        <div @click.stop="close" v-if="isOpen">
          <div class=" divider my-1" />
          <StatsList :stats="dummyStats" :successful-solves="5" :total-solves="6" />
          <RouterLink to="/solves" custom v-slot="{ navigate }">
            <button @click.stop="navigate" class="w-full btn mt-2">SOLVES</button>
          </RouterLink>
        </div>
      </Transition>
    </div>
  </div>
</template>