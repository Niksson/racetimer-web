<script setup lang="ts">
import { ref } from 'vue'
import { ChevronUp, ChevronDown } from 'lucide-vue-next'

const collapseOpen = ref(false)
function close() {
  if (collapseOpen.value)
    collapseOpen.value = false
}
function open() {
  collapseOpen.value = true
}
function toggle() {
  collapseOpen.value = !collapseOpen.value
}

defineExpose({
  close, open, toggle
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

</script>

<template>
  <div id="stats-box" class="relative">
    <div class="bg-base-300 p-3 invisible">STATS</div>
    <div class="bg-base-300 p-3 absolute bottom-0 left-0 w-full z-10" @click.stop="toggle">
      <div class="text-center font-bold">STATS
        <ChevronUp class="inline" v-if="!collapseOpen" />
        <ChevronDown class="inline" v-else />
      </div>
      <Transition name="stats-collapse" @before-enter="collapseBeforeEnter" @enter="collapseEnter"
        @leave="collapseLeave">
        <div @click.stop="close" v-if="collapseOpen">
          <div class=" divider my-1" />
          <div class="mt-2 text-left grid grid-flow-col grid-rows-3 gap-1">
            <div>avg5</div>
            <div>avg12</div>
            <div>avg25</div>
            <div>avg50</div>
            <div>avg100</div>
            <div>solves: 0/0</div>
          </div>
          <button @click.stop="() => { }" class="w-full btn mt-2">SOLVES</button>
        </div>
      </Transition>
    </div>
  </div>
</template>