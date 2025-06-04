<script setup lang="ts">
import { useTemplateRef } from 'vue';
import 'scramble-display';
import PlayerView from '../components/PlayerView.vue';
import TwoSideModal from '../components/TwoSideModal.vue';
import type { Side } from '../models/Side';
import type { Penalty } from '../models/Penalty';
import { puzzlesMap } from '../lib/puzzlesMap';
import FullScreenModal from '../components/FullScreenModal.vue';
import { useRaceContext } from '../stores/raceContext';

const raceContext = useRaceContext()
const withScramble = Object.entries(puzzlesMap).filter(([_, value]) => value.generateScramble)
const withoutScramble = Object.entries(puzzlesMap).filter(([_, value]) => !value.generateScramble)

const scrambleModal = useTemplateRef('scramble-modal')
function openScrambleModal() {
  scrambleModal?.value?.modal?.showModal()
}

const puzzlesModal = useTemplateRef('puzzles-modal')
function onEventChoice(event: string) {
  raceContext.startNewRace(event)
  puzzlesModal?.value?.modal?.close()
}

const penaltyModal = useTemplateRef('penalty-modal')

function setPenalty(player: Side, penalty: Penalty | null) {
  raceContext.setPenalty(player, penalty)
  penaltyModal?.value?.modal?.close()
}

</script>

<template>
  <div id="timer-page">
    <PlayerView side="player2" @scramble-clicked="openScrambleModal" class="player2" />
    <div class="divider-custom">
      <div class="divider-content absolute w-full -top-5 flex justify-between">
        <button id="new-race" class="ml-8 w-32 text-lg h-10 btn btn-outline bg-base-100" @click="puzzlesModal?.modal?.showModal">NEW
          RACE</button>
        <button id="penalty" class="mr-8 w-32 text-lg h-10 btn btn-outline bg-base-100"
          @click="penaltyModal?.modal?.showModal">PENALTY</button>
      </div>
    </div>
    <PlayerView side="player1" @scramble-clicked="openScrambleModal" />
    <FullScreenModal ref="puzzles-modal">
      <div class="m-4 flex flex-wrap gap-3 place-items-center">
        <button @click="onEventChoice(key)" class="btn btn-primary px-3 grow" v-for="[key, value] in withScramble"
          :key="key">{{ value.displayName }}</button>
      </div>
      <div class="divider">Without random scramble</div>
      <div class="m-4 flex flex-wrap gap-3 place-items-center">
        <button @click="onEventChoice(key)" class="btn btn-primary px-3 grow" v-for="[key, value] in withoutScramble"
          :key="key">{{ value.displayName }}</button>
      </div>
    </FullScreenModal>
    <TwoSideModal ref="scramble-modal">
      <template #modal-content>
        <div class="flex place-content-center">
          <div class="text-lg" v-if="!raceContext.currentRound.scramble">Generating...</div>
          <scramble-display v-else :event="raceContext.eventContext.eventId"
            :scramble="raceContext.currentRound.scramble" />
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
</template>