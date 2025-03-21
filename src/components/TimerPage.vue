<script setup lang="ts">
import { useTemplateRef } from 'vue';
import PlayerView from './PlayerView.vue';
import TwoSideModal from './TwoSideModal.vue';
const scramble = "R' U' F U2 B2 D' R2 D R2 B2 U B2 D' B R' U2 F2 R2 B L F2 D2 U' R' U' F"
const scrambleModal = useTemplateRef('scramble-modal')
function openScrambleModal() {
  scrambleModal?.value?.modal?.showModal()
}
</script>

<template>
  <div id="timer-page" class="unselectable grid grid-rows-[1fr_auto_1fr] h-screen w-full">
    <PlayerView @scramble-clicked="openScrambleModal" :scramble="scramble" class="player2" />
    <div class="divider-custom">
      <div class="divider-content absolute w-full -top-5 flex justify-between">
        <button class="ml-8 w-24 text-xl h-10 btn btn-outline bg-base-100">PUZZLES</button>
        <button class="mr-8 w-24 text-xl h-10 btn btn-outline bg-base-100">PENALTY</button>
      </div>
    </div>
    <PlayerView @scramble-clicked="openScrambleModal" :scramble="scramble" />
    <TwoSideModal ref="scramble-modal">
      <template #player2>
        <div class="flex place-content-center">
          <scramble-display event="333" :scramble="scramble" />
        </div>
      </template>
      <template #player1>
        <div class="flex place-content-center">
          <scramble-display event="333" :scramble="scramble" />
        </div>
      </template>
    </TwoSideModal>
  </div>
</template>