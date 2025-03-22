<script setup lang="ts">
import { useTemplateRef } from 'vue';
import PlayerView from './PlayerView.vue';
import TwoSideModal from './TwoSideModal.vue';
import type { Side } from '../models/Side';
import type { Penalty } from '../models/Penalty';
const scramble = "R' U' F U2 B2 D' R2 D R2 B2 U B2 D' B R' U2 F2 R2 B L F2 D2 U' R' U' F"
const scrambleModal = useTemplateRef('scramble-modal')
function openScrambleModal() {
  scrambleModal?.value?.modal?.showModal()
}

const penaltyModal = useTemplateRef('penalty-modal')
function togglePenalty(player: Side, penalty: Penalty | null) {

}
</script>

<template>
  <div id="timer-page" class="unselectable grid grid-rows-[1fr_auto_1fr] h-screen w-full">
    <PlayerView @scramble-clicked="openScrambleModal" :scramble="scramble" class="player2" />
    <div class="divider-custom">
      <div class="divider-content absolute w-full -top-5 flex justify-between">
        <button class="ml-8 w-24 text-xl h-10 btn btn-outline bg-base-100">PUZZLES</button>
        <button class="mr-8 w-24 text-xl h-10 btn btn-outline bg-base-100"
          @click="penaltyModal?.modal?.showModal()">PENALTY</button>
      </div>
    </div>
    <PlayerView @scramble-clicked="openScrambleModal" :scramble="scramble" />
    <TwoSideModal ref="scramble-modal">
      <template #modal-content>
        <div class="flex place-content-center">
          <scramble-display event="333" :scramble="scramble" />
        </div>
      </template>
    </TwoSideModal>
    <TwoSideModal ref="penalty-modal">
      <template #player2>
        <div class="flex flex-wrap justify-center gap-2">
          <button class="btn btn-success flex-1" @click="togglePenalty('player2', null)">OK</button>
          <button class="btn btn-warning flex-1" @click="togglePenalty('player2', '+2')">+2</button>
          <button class="btn btn-error flex-1" @click="togglePenalty('player2', 'DNF')">DNF</button>
        </div>
      </template>
      <template #player1>
        <div class="flex flex-wrap justify-center gap-2">
          <button class="btn btn-success flex-1" @click="togglePenalty('player1', null)">OK</button>
          <button class="btn btn-warning flex-1" @click="togglePenalty('player1', '+2')">+2</button>
          <button class="btn btn-error flex-1" @click="togglePenalty('player1', 'DNF')">DNF</button>
        </div>
      </template>
    </TwoSideModal>
  </div>
</template>