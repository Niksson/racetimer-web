<script setup lang="ts">
import { ref } from 'vue';
import { type Side } from '../models/Side'
defineProps<{
  side: Side
}>()
const statsOpen = ref(false)
function closeOpenedStats() {
  if (statsOpen.value)
    statsOpen.value = false
}
function openStats() {
  console.log('open stats')
  statsOpen.value = true
}

function collapseBeforeEnter(el: Element) {
  (el as HTMLElement).style.height = '0px'
}

function collapseEnter(el: Element) {
  (el as HTMLElement).style.height = el.scrollHeight + 'px'
}

function collapseLeave(el: Element) {
  (el as HTMLElement).style.height = el.scrollHeight + 'px'
}

function collapseAfterLeave(el: Element) {
  (el as HTMLElement).style.height = ''
}
</script>

<template>
  <div @click="closeOpenedStats" class="flex gap-3 flex-col" :class="[side]">
    <div class="score">0 : <span class="text-accent">0</span></div>
    <div class="grow flex flex-col justify-between relative">
      <div class="scramble">R' U' F U2 B2 D' R2 D R2 B2 U B2 D' B R' U2 F2 R2 B L F2 D2 U' R' U' F</div>
      <div class="time">0.000</div>
      <div id="stats-box" class="relative">
        <div class="bg-base-300 rounded-t-(--radius-box) p-2 invisible" @click.stop="openStats">STATS</div>
        <div class="bg-base-300 rounded-t-(--radius-box) p-2 absolute bottom-0 left-0 w-full z-10"
          @click.stop="openStats">
          <Transition name="stats-collapse" mode="out-in" @before-enter="collapseBeforeEnter" @enter="collapseEnter"
            @leave="collapseLeave" @after-leave="collapseAfterLeave">
            <div v-if="!statsOpen" class="text-center">STATS</div>
            <div @click.stop="closeOpenedStats" v-else>
              <button @click.stop="() => { }" class="w-full btn">SOLVES</button>
              <div class="mt-2 text-left grid grid-flow-col grid-rows-3 gap-1">
                <div>avg5</div>
                <div>avg12</div>
                <div>avg25</div>
                <div>avg50</div>
                <div>avg100</div>
                <div>solves: 0/0</div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>