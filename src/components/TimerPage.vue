<script setup lang="ts">
import { useTemplateRef } from 'vue';
import 'scramble-display';
import PlayerView from './PlayerView.vue';
import TwoSideModal from './TwoSideModal.vue';
import type { Side } from '../models/Side';
import type { Penalty } from '../models/Penalty';
import { puzzlesMap } from '../lib/puzzlesMap';

const sessionContextStore = useSessionContext()

import FullScreenModal from './FullScreenModal.vue';
import { useSessionContext } from '../stores/sessionContext';

const scrambleModal = useTemplateRef('scramble-modal')
function openScrambleModal() {
  scrambleModal?.value?.modal?.showModal()
}

const puzzlesModal = useTemplateRef('puzzles-modal')

const penaltyModal = useTemplateRef('penalty-modal')
function togglePenalty(player: Side, penalty: Penalty | null) { }

const emit = defineEmits<{
  'puzzle-selected': [eventId: string]
}>()
</script>

<template>
  <div id="timer-page" class="unselectable grid grid-rows-[1fr_auto_1fr] h-screen w-full">
    <PlayerView side="player2" @scramble-clicked="openScrambleModal" class="player2" />
    <div class="divider-custom">
      <div class="divider-content absolute w-full -top-5 flex justify-between">
        <button class="ml-8 w-24 text-xl h-10 btn btn-outline bg-base-100"
          @click="puzzlesModal?.modal?.showModal">PUZZLES</button>
        <button class="mr-8 w-24 text-xl h-10 btn btn-outline bg-base-100"
          @click="penaltyModal?.modal?.showModal">PENALTY</button>
      </div>
    </div>
    <PlayerView side="player1" @scramble-clicked="openScrambleModal" />
    <FullScreenModal ref="puzzles-modal">
      <div class="m-4 flex flex-wrap gap-3 justify-center items-center">
        <button @click="emit('puzzle-selected', key)" class="btn btn-primary px-3 grow"
          v-for="(value, key) in puzzlesMap" :key="key">{{ value }}</button>
      </div>
    </FullScreenModal>
    <TwoSideModal ref="scramble-modal">
      <template #modal-content>
        <div class="flex place-content-center">
          <div class="text-lg" v-if="!sessionContextStore.currentRound.scramble">Generating...</div>
          <scramble-display v-else event="333" :scramble="sessionContextStore.currentRound.scramble" />
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