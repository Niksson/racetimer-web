<template>
  <div class="drawer-side z-30">
    <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay" @click="menuOpened = false"></label>
    <div class="menu bg-base-200 text-base-content h-svh w-64 p-4">
      <div class="mt-2 text-base-content flex justify-center items-center gap-2">
        <RaceTimerLogo class="w-14 h-full fill-base-content stroke-base-content" />
        <div class="font-bold text-xl">RaceTimer</div>
      </div>
      <div class="mt-6 flex gap-2">
        <button id="new-race" class="text-md btn btn-neutral flex-grow" @click="onNewRace">
          <Plus /> NEW RACE
        </button>
        <button id="quick-start" class="p-2.5 text-md btn btn-neutral" @click="onQuickStart">
          <Zap />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus, Zap } from 'lucide-vue-next';
import RaceTimerLogo from '../components/RaceTimerLogo.vue';
import { ref } from 'vue';

const menuOpened = ref(false);

const emit = defineEmits(['newRace', 'quickStart']);

function onNewRace() {
  menuOpened.value = false;
  emit('newRace');
}

function onQuickStart() {
  menuOpened.value = false;
  emit('quickStart');
}
</script>