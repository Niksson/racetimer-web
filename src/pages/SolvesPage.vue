<script setup lang="ts">
import { toString } from '../models/Solve';
import { useRaceContext } from '../stores/raceContext';

const raceContext = useRaceContext();

</script>

<template>
  <div id="solves-page" class="grid grid-rows-[1fr_auto_1fr] h-svh w-full">
    <div v-if="raceContext.storeLoading" class="player2 flex items-center justify-center">Loading...</div>
    <div v-else class="player2 flex flex-col overflow-hidden">
      <div class="p-1 text-center text-lg font-semibold border-b-1 border-neutral-600">SOLVES</div>
      <ol class="grow solves-list list-inside list-decimal overflow-scroll">
        <li v-for="(round, idx) in raceContext.session?.completedRounds" :key="idx" class="solves-list-item border-b-1 p-1 border-neutral-600"><span
            class="mx-1 font-semibold">{{ toString(round.solves.player2!) }}</span> {{ round.scramble.player2 }}</li>
      </ol>
    </div>
    <div class="divider-custom">
      <div class="divider-content absolute w-full -top-5 flex justify-end">
        <RouterLink replace to="/" v-slot="{ navigate }">
          <button @click="navigate" class="mr-3 text-xl h-10 btn btn-outline bg-base-100">TIMER</button>
        </RouterLink>
      </div>
    </div>
    <div v-if="raceContext.storeLoading" class="flex items-center justify-center">Loading...</div>
    <div v-else class="flex flex-col overflow-hidden">
      <div class="p-1 text-center text-lg font-semibold border-b-1 border-neutral-600">SOLVES</div>
      <ol class="grow solves-list list-inside list-decimal overflow-scroll">
        <li v-for="(round, idx) in raceContext.session?.completedRounds" :key="idx" class="solves-list-item border-b-1 p-1 border-neutral-600"><span
            class="mx-1 font-semibold">{{ toString(round.solves.player1!) }}</span> {{ round.scramble.player1 }}</li>
      </ol>
    </div>
  </div>
</template>