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
import AppMenu from '../components/AppMenu.vue';
import type { SessionCreationOptions } from '../models/SessionCreationOptions';
import { defaultSessionCreationOptions } from '../models/Session';
import EventSelector from '../components/EventSelector.vue';

const menuOpened = ref<boolean>(false)

const raceContext = useRaceContext()
const withScramble = Object.entries(eventsMap).filter(([_, value]) => value.generateScramble)
const withoutScramble = Object.entries(eventsMap).filter(([_, value]) => !value.generateScramble)

const scrambleModal = useTemplateRef('scramble-modal')
function openScrambleModal() {
  if (raceContext.roundStarted) return
  scrambleModal?.value?.modal?.showModal()
}

const quickStartModal = useTemplateRef('quick-start-modal')

function onQuickStart() {
  menuOpened.value = false
  quickStartModal?.value?.modal?.showModal()
}

function onQuickStartEventChosen(event: string) {
  raceContext.startNewSession({
    ...defaultSessionCreationOptions,
    selectedEvents: { player1: event, player2: event },
    generateScrambles: eventsMap[event].generateScramble
  })
  quickStartModal?.value?.modal?.close()
}

const penaltyModal = useTemplateRef('penalty-modal')

function setPenalty(player: Side, penalty: Penalty | null) {
  raceContext.setPenalty(player, penalty)
  penaltyModal?.value?.modal?.close()
}

const newRaceModal = useTemplateRef('new-race-modal')
const sessionCreationOptions = ref<SessionCreationOptions>(defaultSessionCreationOptions)

function onNewRace() {
  menuOpened.value = false
  newRaceModal?.value?.modal?.showModal()
}

function onNewRaceConfirmed() {
  raceContext.startNewSession(sessionCreationOptions.value)
  newRaceModal?.value?.modal?.close()
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
              @click="penaltyModal?.modal?.showModal">PENALTY</button>
          </div>
        </div>
        <div v-if="raceContext.storeLoading" class="flex items-center justify-center">Loading...</div>
        <PlayerView v-else side="player1" @scramble-clicked="openScrambleModal" />
        <FullScreenModal id="quickStartModal" ref="quick-start-modal">
          <div class="m-4 flex flex-wrap gap-3 place-items-center">
            <button @click="onQuickStartEventChosen(key)" class="btn btn-primary px-3 grow"
              v-for="[key, value] in withScramble" :key="key"><span class="cubing-icon" :class="value.eventIcon" />{{ value.displayName }}</button>
          </div>
          <div class="divider">Without random scramble</div>
          <div class="m-4 flex flex-wrap gap-3 place-items-center">
            <button @click="onQuickStartEventChosen(key)" class="btn btn-primary px-3 grow"
              v-for="[key, value] in withoutScramble" :key="key"><span class="cubing-icon" :class="value.eventIcon" />{{ value.displayName }}</button>
          </div>
        </FullScreenModal>
        <FullScreenModal id="newRaceModal" ref="new-race-modal">
          <h3>New Race</h3>
          <div class="mt-2">
            <div class="flex justify-around">
              <EventSelector side="player1" v-model="sessionCreationOptions.selectedEvents.player1" class="py-8 sm:w-36 md:w-44 w-24"
                :events="Object.values(eventsMap)" :generate-scramble="true" />
              <div class="divider divider-horizontal text-sm">vs</div>
              <EventSelector side="player2" v-model="sessionCreationOptions.selectedEvents.player2" class="py-8 sm:w-36 md:w-44 w-24"
                :events="Object.values(eventsMap)" :generate-scramble="true" />
            </div>
            <fieldset class="fieldset mt-2">
              <label class="lable">
                <input type="checkbox" v-model="sessionCreationOptions.generateScrambles" class="checkbox mr-1" />
                Generate scrambles
              </label>
              <label class="label">Player 1</label>
              <input type="text" v-model="sessionCreationOptions.playerNames.player1"
                class="input w-full" placeholder="Name (Optional)" />
              <label class="label">Player 2</label>
              <input type="text" v-model="sessionCreationOptions.playerNames.player2"
                class="input w-full" placeholder="Name (Optional)" />
            </fieldset>
            <div class="modal-action">
              <button class="btn" @click="onNewRaceConfirmed">Confirm</button>
              <button class="btn" @click="newRaceModal?.modal?.close()">Cancel</button>
            </div>
          </div>
        </FullScreenModal>
        <TwoSideModal id="scrambleModal" v-if="!raceContext.storeLoading" ref="scramble-modal">
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
        <TwoSideModal id="penaltyModal" ref="penalty-modal">
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
    <AppMenu @new-race="onNewRace" @quick-start="onQuickStart" />
  </div>
</template>