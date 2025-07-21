<template>
  <div class="drawer-side z-30 text-sm">
    <label for="menu-drawer" aria-label="close sidebar" class="drawer-overlay" @click="menuOpened = false"></label>
    <div class="flex flex-col bg-base-100 text-base-content h-svh w-64">
      <div class="mt-6 text-base-content flex justify-center items-center gap-2">
        <RaceTimerLogo class="w-14 h-full fill-base-content stroke-base-content" />
        <div class="font-bold text-xl">RaceTimer</div>
      </div>
      <div class="mt-6 mx-4 flex gap-2">
        <button id="new-race" class="text-md btn bg-base-200 flex-grow" @click="onNewRace">
          <Plus class="w-5 h-5" /> NEW RACE
        </button>
        <button id="quick-start" class="p-2.5 text-md btn bg-base-200" @click="onQuickStart">
          <Zap class="w-5 h-5" />
        </button>
      </div>
      <div v-if="storeLoading" class="bg-base-200 rounded-lg grow my-2 flex justify-center items-center">
        <span class="loading loading-spinner loading-xl" />
      </div>
      <ul v-else class="grow menu bg-base-200 w-60 m-2 rounded-lg overflow-scroll flex-nowrap">
        <li v-for="session in sessions" :key="session.id"
          class="my-1 pb-2 flex flex-row gap-1 flex-nowrap items-center border-b-1 border-b-base-content/30">
          <div class="w-full block" :class="{ 'menu-active': activeSession?.id === session.id }"
            @click="onSelectSession(session.id!)">
            <div class="grow flex flex-col w-full items-start">
              <div id="row-1" class="flex justify-between items-center w-full">
                <div v-if="getNameType(session) === 'player-names'">
                  <div class="font-semibold">{{ session.playerNames.player1 ?? 'Guest' }}</div>
                  <div>vs</div>
                  <div class="font-semibold">{{ session.playerNames.player2 ?? 'Guest' }}</div>
                </div>
                <div v-else-if="eventsAreSame(session)">
                  <div class="font-semibold">{{ session.selectedEvents.player1.displayName }}</div>
                </div>
                <div v-else>
                  <div class="font-semibold">{{ session.selectedEvents.player1.displayName }}</div>
                  <div>vs</div>
                  <div class="font-semibold">{{ session.selectedEvents.player2.displayName }}</div>
                </div>
                <button v-if="sessions.length > 1" @click.stop="onDeleteSession(session.id!)" class="p-0 btn btn-ghost">
                  <X class="w-4 h-4 text-error" />
                </button>
              </div>
              <div id="row-2" class="flex justify-between items-center w-full">
                <template v-if="eventsAreSame(session)">
                  <div class="col-span-1"><span class="cubing-icon"
                      :class="session.selectedEvents.player1.eventIcon"></span></div>
                </template>
                <template v-else>
                  <div class="text-xs"><span class="cubing-icon"
                      :class="session.selectedEvents.player1.eventIcon"></span> vs <span class="cubing-icon"
                      :class="session.selectedEvents.player2.eventIcon"></span></div>
                </template>
                <div class="text-xs self-end">{{ dayjs(session.createdDate).format('YYYY-MM-DD HH:mm') }}</div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <button class="btn bg-base-300 w-full">
        <Info class="w-4 h-4" />About
      </button>
    </div>
    <DaisyModal v-model="deleteDialog.isRevealed.value">
      <h3>Are you sure?</h3>
      <div class="modal-action">
        <button @click="deleteDialog.confirm" class="btn btn-error btn-sm">Yes, delete</button>
        <button @click="deleteDialog.cancel" class="btn btn-neutral btn-sm">Cancel</button>
      </div>
    </DaisyModal>
  </div>
</template>

<script setup lang="ts">
import { Plus, Zap, Info, X } from 'lucide-vue-next';
import RaceTimerLogo from '../components/RaceTimerLogo.vue';
import { ref } from 'vue';
import { useRaceContext } from '../stores/raceContext';
import dayjs from 'dayjs';
import { eventsAreSame, getNameType } from '../models/Session';
import { storeToRefs } from 'pinia';
import { useConfirmDialog } from '@vueuse/core';
import DaisyModal from './DaisyModal.vue';

const menuOpened = ref(false);

const deleteDialog = useConfirmDialog()

const { storeLoading, sessionMetaList: sessions, session: activeSession } = storeToRefs(useRaceContext());
const { selectSession, removeSession} = useRaceContext();

const emit = defineEmits<{
  newRace: []
  quickStart: []
  deleteSession: [sessionId: string]
}>();

function onNewRace() {
  menuOpened.value = false;
  emit('newRace');
}

function onQuickStart() {
  menuOpened.value = false;
  emit('quickStart');
}

function onSelectSession(sessionId: string) {
  if(sessionId === activeSession.value?.id) return
  menuOpened.value = false;
  selectSession(sessionId);
}

async function onDeleteSession(sessionId: string) {
  const { isCanceled } = await deleteDialog.reveal()
  if(isCanceled) return

  await removeSession(sessionId);
}

</script>