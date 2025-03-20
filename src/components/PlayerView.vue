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
function toggleStats() {
  console.log('toggle stats')
  statsOpen.value = !statsOpen.value
}

function collapseBeforeEnter(el: Element) {
  console.log('beforeEnter ' + el.scrollHeight);
  (el as HTMLElement).style.height = '0px'
}

function collapseEnter(el: Element) {
  console.log('enter ' + el.scrollHeight);
  (el as HTMLElement).style.height = el.scrollHeight + 'px'
}

function collapseLeave(el: Element) {
  (el as HTMLElement).style.height = '0px';
  (el as HTMLElement).style.overflow = 'hidden';
}
</script>

<template>
  <div @click="closeOpenedStats" class="flex gap-3 flex-col" :class="[side]">
    <div class="score">0 : <span class="text-accent">0</span></div>
    <div class="grow flex flex-col justify-between relative">
      <div class="scramble">R' U' F U2 B2 D' R2 D R2 B2 U B2 D' B R' U2 F2 R2 B L F2 D2 U' R' U' F</div>
      <div class="time">0.000</div>
      <div id="stats-box" class="relative">
        <div class="bg-base-300 p-2 invisible">STATS</div>
        <div class="bg-base-300 p-2 absolute bottom-0 left-0 w-full z-10" @click.stop="toggleStats">
          <div class="text-center font-bold">STATS</div>
          <Transition name="stats-collapse" @before-enter="collapseBeforeEnter" @enter="collapseEnter"
            @leave="collapseLeave">
            <div @click.stop="closeOpenedStats" v-if="statsOpen" class="">
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
    </div>
  </div>
</template>