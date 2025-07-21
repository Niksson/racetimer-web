<script setup lang="ts">
import { ref } from 'vue';
import 'scramble-display';
import PlayerView from '../components/PlayerView.vue';
import TwoSideModal from '../components/TwoSideModal.vue';
import type { Side } from '../models/Side';
import type { Penalty } from '../models/Penalty';
import { useRaceContext } from '../stores/raceContext';
import AppMenu from '../components/AppMenu.vue';

const menuOpened = ref<boolean>(false)
const scrambleModalOpen = ref(false)
const penaltyModalOpen = ref(false)


const raceContext = useRaceContext()

function openScrambleModal() {
  if (raceContext.roundStarted) return
  scrambleModalOpen.value = true
}



function setPenalty(player: Side, penalty: Penalty | null) {
  raceContext.setPenalty(player, penalty)
  penaltyModalOpen.value = false
}



</script>

<template>
  <div class="drawer">
    <input id="menu-drawer" type="checkbox" class="drawer-toggle" v-model="menuOpened" />
    <div class="drawer-content">
      <div id="timer-page" class="grid grid-rows-[1fr_auto_1fr] h-svh w-full">
        <div v-if="raceContext.storeLoading" class="player2 flex items-center justify-center">Loading...</div>
        <PlayerView v-else side="player2" @scramble-clicked="openScrambleModal" class="player2" />
        <div class="divider-custom">
          <div class="divider-content absolute w-full -top-5 flex justify-between">
            <label for="menu-drawer" id="menu" class="ml-6 w-24 text-xs btn btn-outline bg-base-100"
              :class="{ 'hidden': raceContext.roundStarted }">MENU</label>
            <button :disabled="raceContext.roundStarted" id="penalty"
              class="mr-6 w-24 text-xs btn btn-outline bg-base-100" :class="{ 'hidden': raceContext.roundStarted }"
              @click="penaltyModalOpen = true">PENALTY</button>
          </div>
        </div>
        <div v-if="raceContext.storeLoading" class="flex items-center justify-center">Loading...</div>
        <PlayerView v-else side="player1" @scramble-clicked="openScrambleModal" />
        <TwoSideModal v-model="scrambleModalOpen" backdrop id="scrambleModal" v-if="!raceContext.storeLoading">
          <template #player2>
            <div class="flex place-content-center">
              <div class="text-lg" v-if="raceContext.scramblesGenerating">Generating...</div>
              <scramble-display v-else :event="raceContext.session!.selectedEvents.player2.eventId"
                :scramble="raceContext.currentRound.scramble.player2" />
            </div>
          </template>
          <template #player1>
            <div class="flex place-content-center">
              <div class="text-lg" v-if="raceContext.scramblesGenerating">Generating...</div>
              <scramble-display v-else :event="raceContext.session!.selectedEvents.player1.eventId"
                :scramble="raceContext.currentRound.scramble.player1" />
            </div>
          </template>
        </TwoSideModal>
        <TwoSideModal v-model="penaltyModalOpen" backdrop id="penaltyModal">
          <template #player2>
            <div class="flex flex-wrap justify-center gap-2">
              <button class="btn btn-success flex-1" @click="setPenalty('player2', null)">OK</button>
              <button class="btn btn-warning flex-1" @click="setPenalty('player2', '+2')">+2</button>
              <button class="btn btn-error flex-1" @click="setPenalty('player2', 'DNF')">DNF</button>
            </div>
          </template>
          <template #player1>
            <div class="flex flex-wrap justify-center gap-2">
              <button class="btn btn-success flex-1" @click="setPenalty('player1', null)">OK</button>
              <button class="btn btn-warning flex-1" @click="setPenalty('player1', '+2')">+2</button>
              <button class="btn btn-error flex-1" @click="setPenalty('player1', 'DNF')">DNF</button>
            </div>
          </template>
        </TwoSideModal>
      </div>
    </div>
    <AppMenu />
  </div>
</template>