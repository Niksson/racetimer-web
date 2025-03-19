<script setup lang="ts">
import PWABadge from './components/PWABadge.vue'
import PlayerView from './components/PlayerView.vue';

</script>

<template>
  <div id="app-container" class="unselectable grid grid-rows-[1fr_auto_1fr] h-screen">
    <PlayerView side="player2" />
    <div class="divider-container">
      <div class="divider-content absolute w-full -top-5 flex justify-between">
        <button class="ml-8 w-24 text-xl h-10 btn btn-outline bg-base-100">PUZZLES</button>
        <button class="mr-8 w-24 text-xl h-10 btn btn-outline bg-base-100">PENALTY</button>
      </div>
    </div>
    <PlayerView side="player1" />
  </div>
  <PWABadge />
</template>