<script setup lang="ts">
import type { ComputedStats } from '../models/StatsContext';
import { statsResultToString } from '../models/StatsResult';

defineProps<{
  stats: ComputedStats
  totalSolves: number,
  successfulSolves: number
}>()
</script>

<template>
  <ul class="text-left grid grid-flow-col grid-rows-3 gap-1">
    <li v-for="(value, key) in stats" :key="key">
      <span>{{ key }}: </span>
      <span v-if="!value">n/a</span>
      <span v-else>{{ statsResultToString(value) }}</span>
    </li>
    <li>
      <span>total: </span>
      <span>{{ successfulSolves }}/{{ totalSolves }}</span>
    </li>
  </ul>
</template>