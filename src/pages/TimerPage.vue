<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import 'scramble-display';
import PlayerView from '../components/PlayerView.vue';
import TwoSideModal from '../components/TwoSideModal.vue';
import type { Side } from '../models/Side';
import type { Penalty } from '../models/Penalty';
import { eventsMap } from '../lib/eventsMap';
import FullScreenModal from '../components/FullScreenModal.vue';
import { useRaceContext } from '../stores/raceContext';
import RaceTimerLogo from '../components/RaceTimerLogo.vue';

const menuOpened = ref<boolean>(false)

const raceContext = useRaceContext()
const withScramble = Object.entries(eventsMap).filter(([_, value]) => value.generateScramble)
const withoutScramble = Object.entries(eventsMap).filter(([_, value]) => !value.generateScramble)

const scrambleModal = useTemplateRef('scramble-modal')
function openScrambleModal() {
  if (raceContext.roundStarted) return
  scrambleModal?.value?.modal?.showModal()
}

const puzzlesModal = useTemplateRef('puzzles-modal')
function onEventChoice(event: string) {
  raceContext.startNewSession({selectedEvents: { player1: event, player2: event }, generateScrambles: eventsMap[event].generateScramble })
  puzzlesModal?.value?.modal?.close()
}

const penaltyModal = useTemplateRef('penalty-modal')

function setPenalty(player: Side, penalty: Penalty | null) {
  raceContext.setPenalty(player, penalty)
  penaltyModal?.value?.modal?.close()
}

function onNewRace() {
  menuOpened.value = false
  puzzlesModal?.value?.modal?.showModal()
}

</script>

<template>
  <div class="drawer">
    <input id="menu-drawer" type="checkbox" class="drawer-toggle" v-model="menuOpened" />
    <div class="drawer-content">
      <div id="timer-page" class="grid grid-rows-[1fr_auto_1fr] h-svh w-full">
        <div v-if="raceContext.sessionLoading" class="player2 flex items-center justify-center">Loading...</div>
        <PlayerView v-else side="player2" @scramble-clicked="openScrambleModal" class="player2" />
        <div class="divider-custom">
          <div class="divider-content absolute w-full -top-5 flex justify-between">
            <label for="menu-drawer" id="menu" class="ml-6 w-24 text-xs btn btn-outline bg-base-100"
              :class="{ 'hidden': raceContext.roundStarted }">MENU</label>
            <button :disabled="raceContext.roundStarted" id="penalty"
              class="mr-6 w-24 text-xs btn btn-outline bg-base-100"
              :class="{ 'hidden': raceContext.roundStarted }"
              @click="penaltyModal?.modal?.showModal">PENALTY</button>
          </div>
        </div>
        <div v-if="raceContext.sessionLoading" class="flex items-center justify-center">Loading...</div>
        <PlayerView v-else side="player1" @scramble-clicked="openScrambleModal" />
        <FullScreenModal ref="puzzles-modal">
          <div class="m-4 flex flex-wrap gap-3 place-items-center">
            <button @click="onEventChoice(key)" class="btn btn-primary px-3 grow" v-for="[key, value] in withScramble"
              :key="key">{{ value.displayName }}</button>
          </div>
          <div class="divider">Without random scramble</div>
          <div class="m-4 flex flex-wrap gap-3 place-items-center">
            <button @click="onEventChoice(key)" class="btn btn-primary px-3 grow"
              v-for="[key, value] in withoutScramble" :key="key">{{ value.displayName }}</button>
          </div>
        </FullScreenModal>
        <TwoSideModal v-if="!raceContext.sessionLoading" ref="scramble-modal">
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
        <TwoSideModal ref="penalty-modal">
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
    <div class="drawer-side z-30">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay" @click="menuOpened = false"></label>
      <div class="menu bg-base-200 text-base-content h-svh w-64 p-4">
        <div class="mt-2 text-base-content flex justify-center items-center gap-2">
          <RaceTimerLogo class="w-14 h-full fill-base-content stroke-base-content" />
          <div class="font-bold text-xl">RaceTimer</div>
        </div>
        <div class="mt-6">
          <button id="new-race" class="w-full text-md btn btn-neutral" @click="onNewRace">NEW
            RACE</button>
        </div>
      </div>
    </div>
  </div>
</template>